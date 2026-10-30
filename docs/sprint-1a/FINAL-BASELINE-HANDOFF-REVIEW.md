# Sprint 1A FINAL Baseline — Repository Handoff (Review Only)

**Status:** Documentation staging; NOT a complete baseline import and NOT authorization to resume implementation.
**Source:** Tech Lead-provided `CommerceFlow-Sprint1A-FINAL-Design-Baseline(1).zip` (47 files, package root `CommerceFlow-Sprint1A-FINAL/`). This staging note does not substitute for those original artifacts.
**Target:** `develop` via Draft PR; no backend/frontend code changes.

## Source authority and precedence
The original package README identifies these as the primary reading order:
1. `04-Architecture/Accepted-Design-Baseline-v1.0-FINAL.md` — approved decisions and implementation gates.
2. `04-Architecture/Sprint1A-Design-Signoff-v1.0-FINAL.pdf`.
3. `01-Requirements/CommerceFlow-SRS-v1.1-REVIEW.docx` **together with** `01-Requirements/SRS-Approved-Design-Addendum-v1.0-FINAL.docx`.
4. `05-API/openapi-v1.0-DESIGN-BASELINE.yaml` — OpenAPI 3.1 design contract.
5. `04-Architecture/Final-QA-Report-v1.0.md`.

Historical DRAFT/REVIEW files remain for traceability, not independent final approval. Diagram PDF/draw.io export parity remains unverified. Design tests are specifications, not executed tests.

## Sprint 1B alignment findings
- **CSRF:** OpenAPI `servers: [{url: /api/v1}]` plus path `/auth/csrf` resolves to **GET /api/v1/auth/csrf**, consistent with CR-01. Avoid treating relative OpenAPI paths as conflicting routes.
- **Registration:** FINAL OpenAPI uses `fullName` rather than Gemini's proposed `firstName`/`lastName`/`phone`; FINAL password policy is 12–128 characters, not Gemini's proposed minimum of 8. Agents must inspect the actual authoritative schema before coding.
- **D3:** Spring Security + Spring Session JDBC, PostgreSQL, HttpOnly cookie, Secure on production HTTPS, same-origin routing, CSRF enforcement, session rotation on login and invalidation on logout.
- **Legacy frontend:** `src/controllers/feature/auth/authSaga.tsx` currently fetches a user list and compares email/password client-side, then writes `localStorage.setItem('access_token', user.id)`. This requires security review; **CR-03 remains ON HOLD** and is NOT approved for implementation.
- **CR-02:** Tech Lead APPROVED removing the nonfunctional Forgotten Password link (`src/view/components/layout/LoginModal/index.tsx` currently links to `/`); approval is a design decision, not permission to change code in this documentation PR.
- **Database:** Existing `backend/src/main/resources/db/migration/V1__create_commerceflow_schema.sql` creates only the `commerceflow` namespace; do not infer that authentication tables already exist.
- **Scope:** D1 and D2 concern checkout/payment, not new Sprint 1B implementation scope.

## Release gate / unresolved work
1. Import the **original, unmodified** FINAL package files into the repository, preserving folder names and file statuses. This Draft PR currently contains only this alignment/handoff note, **not the 47 source artifacts**.
2. Review full OpenAPI, SRS/addendum, ERD and D1–D3 against existing code. Resolve conflicts through explicit Change Requests.
3. Update Gemini design specification to match the FINAL API contract; no frontend implementation authorized yet.
4. Keep Codex blocked until the authoritative files are available in its workspace and Tech Lead approves resumption.
5. No code changes, merge or deployment under this PR.

## Change-control register
| ID | Decision | Implementation |
| --- | --- | --- |
| CR-01 | Approved: full CSRF route `GET /api/v1/auth/csrf` | Respect OpenAPI server prefix |
| CR-02 | Approved: remove broken Forgotten Password link | Not part of this PR |
| CR-03 | On hold pending code + FINAL baseline comparison | **Do not implement** |
