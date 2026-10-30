# CommerceFlow — Sprint 1A Final Design Review

**Review version:** 1.0 | **Date:** 2026-10-29 | **Status:** CONDITIONAL REVIEW — Tech Lead sign-off required

**Baseline:** Sprint 1A Documentation Review v8; System Design v0.4 and Checkout Policy v1.0 are approved. This review proposes implementation-level choices; it does not supersede prior approvals or authorize coding.

## Executive assessment

**Recommendation: CONDITIONAL PASS for architecture direction; HOLD on Sprint 1A FINAL and Sprint 1B implementation until decisions D1-D4 and diagram review are signed off.** The 10 business-table boundary is preserved. Session and idempotency storage are infrastructure.

## D1 — Checkout recovery and idempotency (RECOMMEND APPROVAL)

- Use a customer-scoped `checkout_idempotency` infrastructure table with unique `(user_id, idempotency_key)` and states `IN_PROGRESS`, `COMPLETED`, and `RETRYABLE_FAILURE`. Keep completed records at least 24 hours; document that expired keys do not guarantee deduplication.
- Reserve the key transactionally before work. Use a database-enforced lease and fencing token / generation number so an expired worker cannot commit after a new owner takes over. Any recovery process must check the committed order and terminal idempotency record before retrying.
- In a **single PostgreSQL transaction**, conditionally decrement stock, create order and immutable snapshots, clear purchased cart lines, and persist the completed replay response. If transaction rolls back, none of these business effects persist.
- For a completed retry, look up the stored key before reading the current cart. Compare explicit request fields against saved canonical values; replay original status and body. The initial cart snapshot remains authoritative; a new checkout requires a new key.
- **Critical design caveat:** because the cart is implicit in the API request, the server cannot prove that a retry intended the same cart if only the shipping address is sent. Define the key as binding the first accepted cart snapshot and make this explicit in API and UX. Reject changed explicit fields with 409.
- Require deterministic product lock order, atomic conditional stock updates, and compatible admin inventory updates. Test a worker crash before commit and after commit-before-response.

## D2 — Mock payment failure policy (RECOMMEND APPROVAL)

- Mock payment is **deterministic per idempotency key** for a given test scenario; no real provider or card data is involved.
- Treat a simulated **decline** as a terminal failure: persist a replayable failure outcome, with no order, inventory decrement or cart clear. Repeating the same key replays the failure; customer must use a new key for a new attempt.
- Treat a genuine transient **service error** as retryable, without order or stock changes; recovery under the same key is allowed only after the prior lease expires and a new owner acquires the fencing token. Never reroll a simulated decline into success under the same key.
- Explicitly distinguish `PAYMENT_DECLINED` (terminal) from `PAYMENT_TEMPORARILY_UNAVAILABLE` (retryable) in OpenAPI, SRS and tests. Avoid persisting sensitive payment data.

## D3 — Session, CSRF and deployment (RECOMMEND APPROVAL)

- Keep Spring Security + Spring Session JDBC, server-side session cookie `HttpOnly`, `Secure` in production, `SameSite=Lax` where compatible, explicit cookie Path and session expiration, logout invalidation, session rotation on login.
- Prefer a **same-origin browser topology** (React and API served under one public origin through a reverse proxy). Avoid credentialed cross-origin CORS in MVP. Local development may proxy `/api` to backend.
- `GET /auth/csrf` obtains a token through an authenticated or anonymous session as appropriate; the frontend reads the token from the JSON response and sends `X-CSRF-TOKEN` on all state-changing requests. The CSRF token is not an authentication credential and should not be stored as a long-lived localStorage secret.
- Verify login/logout CSRF handling, token refresh after login/logout, origin/referrer checks where appropriate, cookie domain/path, session fixation protection, and 401/403 distinctions with integration tests.
- `SameSite` is defense in depth, not a substitute for CSRF validation. Do not claim production security without a deployed HTTPS test.

## D4 — UML / ERD / API semantic release gate (REQUIRES VERIFICATION)

- Use **canonical** SRS v1.1, OpenAPI v0.4 and Checkout Sequence v1.4; mark older checkout sequence files superseded.
- ERD must show 10 business tables with constraints, plus separately grouped Spring Session and checkout idempotency infrastructure tables. Validate FK names, unique indexes, monetary precision, immutable order snapshots and order status transitions.
- Checkout sequence must show reservation and replay before cart access, explicit mismatch, 409 in-progress, atomic order/inventory transaction, post-commit replay and guarded cancel/restock; recovery must show fencing and commit detection.
- Login sequence must show CSRF bootstrap, session rotation, login and logout invalidation. Class diagram should respect modular monolith boundaries and not conflate DTOs with persisted entities.
- Re-export each diagram from its **actual `.drawio` source** and visually inspect every PDF page. Existing illustrative PDFs are not proof of exact parity with `.drawio`.
- Audit the OpenAPI status/body/error examples against SRS and test IDs. Structural validation alone does not prove semantic correctness.

## Required test gates (PLANNED — not executed)

| ID | Scenario | Acceptance criterion |
|---|---|---|
| REV-01 | Retry completed checkout after cart cleared | Original order/status/body; stock decremented once |
| REV-02 | Same key, different shipping fields | 409 mismatch; no side effects |
| REV-03 | Same key concurrent requests | Exactly one owner; other 409; no duplicate |
| REV-04 | Crash before atomic commit | No partial order/stock mutation; safe recovery |
| REV-05 | Crash after commit, before HTTP reply | Replay committed order |
| REV-06 | Lease takeover with stale worker | Fencing prevents stale worker commit |
| REV-07 | Mock decline and replay | Same terminal failure; no order/stock change |
| REV-08 | Transient mock service failure | Controlled retry; no duplicate |
| REV-09 | Two buyers for stock=1 | Exactly one confirmed order |
| REV-10 | Concurrent cancellation | CONFIRMED -> CANCELLED once; stock restored once |
| REV-11 | Admin stock edit during checkout | No lost update or negative stock |
| REV-12 | CSRF/session security | Missing token 403; unauthenticated 401; admin role 403; logout invalidates session |

## Agent work packets — only after sign-off

**Codex (documentation-only PR first):** align SRS, OpenAPI, ADR-006, ERD constraints and acceptance tests with approved D1-D3; add an architecture review checklist; do not implement auth, checkout or migrations yet. Use `docs/sprint-1a-system-design` -> PR into `develop`; never push directly to `master`.

**Gemini (design-only):** check UI/UX for retry, duplicate submission, terminal decline and transient retry, plus accessible error states; produce annotated UI specifications, not a coded frontend. Do not claim user tests were run.

**Assistant:** review Codex diff, cross-check SRS/API/UML/ERD/test traceability, inspect rendered PDFs, report blocking issues and prepare Tech Lead sign-off. No claim of tool delegation or GitHub commit in this review.

## Sign-off record

- D1 Recovery/idempotency: **PROPOSED**
- D2 Mock payment outcomes: **PROPOSED**
- D3 CSRF/session deployment: **PROPOSED**
- D4 Diagram semantic and visual QA: **OPEN**
- Sprint 1A FINAL: **NOT YET APPROVED**
- Sprint 1B coding: **NOT AUTHORIZED BY THIS REVIEW**

**Tech Lead decision requested:** Approve D1-D3 as the implementation baseline and authorize completion of D4 documentation QA, or request changes.
