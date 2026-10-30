# CommerceFlow — Checkout Design Synchronization v1.3

**Status:** DESIGN REVIEW — approved policy, proposed implementation details.  
**Scope:** SRS, OpenAPI, Physical ERD, Sequence Diagrams, Test Strategy, ADR-006.  
**No implementation changes.**

## Approved requirements (binding)

- Completed idempotency records are retained for at least 24 hours.
- The same authenticated customer, key and identical explicit checkout request must replay the previously recorded result without duplicating the order or decrementing stock again.
- Reuse of a key with changed explicit request fields returns HTTP 409.
- Concurrent in-progress requests with the same key cannot both process; the second returns HTTP 409 and may retry.
- Only `CONFIRMED` orders can transition to `CANCELLED`; inventory restoration occurs once, atomically.

## Clarifications applied to OpenAPI v0.4

1. A successful retry preserves the original **201 Created** status and original order representation. Earlier documentation suggested HTTP 200 for replay; that ambiguity is corrected in the new OpenAPI review file.
2. The checkout request body contains the shipping address but **not cart items**. The original validated cart snapshot must therefore be persisted at first processing; the server must not compare a retry to a cart that was cleared after successful checkout.
3. A retry with changed explicit address data is a mismatch; changing the cart after the first request does not redefine the original request. A new checkout must use a new key.
4. The original mock payment outcome must not change unpredictably during crash recovery. Exact failure replay/retry policy is **not yet approved**.
5. The `checkout_idempotency` table is an infrastructure table, not one of the ten business tables. It requires a reviewed Flyway migration in a future implementation sprint.

## Proposed implementation design (not yet approved)

- Unique key `(user_id, idempotency_key)`, stored canonical explicit request, immutable validated cart snapshot, state, order ID, response and expiry.
- Stable ordering of product inventory updates and conditional stock decrement to prevent overselling.
- One transaction for order, stock, cart mutation, and successful idempotency completion; a separate short-lived reservation/lease may be needed before transaction.
- Crash recovery must inspect durable order/result state before attempting a retry.
- A cancellation transition must be guarded by `WHERE order_status = 'CONFIRMED'`, with stock restoration conditioned on one successful transition.

## Cross-document change register

| Artifact | Required final revision | Status |
|---|---|---|
| SRS | Clarify retry, order cancellation, and stock restoration in FR-11 / FR-16 / NFR-03 | Pending canonical rewrite |
| Physical ERD | Document `checkout_idempotency` infrastructure table separately from 10 business tables | Proposed supplement exists |
| Checkout Sequence | Add replay, mismatch, concurrent key and cancellation alternatives | Pending diagram revision |
| OpenAPI | Replay status, key conflict semantics and error descriptions | Updated to v0.4 REVIEW |
| Test Strategy | Add TC-IDEMP, TC-CANCEL, TC-INV and crash tests | Test-case supplement exists |
| ADR-006 | Link approved policy to proposed recovery mechanism | Existing ADR + supplement |

## Open questions before FINAL

1. For mock-payment failure, should the same key replay a terminal failure or allow a controlled retry? 
2. Which deterministic failure injection mechanism is available only in nonproduction tests?
3. How are interrupted `IN_PROGRESS` leases recovered without double-committing?
4. What is the precise CSRF cookie/header bootstrap contract in the selected frontend deployment?

## QA evidence

OpenAPI YAML syntax, local `$ref` resolution, diagram XML well-formedness and ZIP CRC are checked by the build script. These are structural checks, not proof that the architecture is implemented or that every PDF visually matches its editable diagram.
