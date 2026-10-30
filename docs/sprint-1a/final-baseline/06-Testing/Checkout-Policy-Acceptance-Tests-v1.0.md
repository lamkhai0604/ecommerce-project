# CommerceFlow — Checkout Policy Acceptance Tests

**Status:** Planned, not executed.

| ID | Given / When | Expected result |
|---|---|---|
| TC-IDEMP-001 | Completed checkout, retry same customer/key/payload | Original order returned; no additional order or stock change |
| TC-IDEMP-002 | Same customer/key, different payload or cart fingerprint | 409 IDEMPOTENCY_PAYLOAD_MISMATCH |
| TC-IDEMP-003 | Two concurrent requests with same customer/key | One processed; other 409 IDEMPOTENCY_IN_PROGRESS |
| TC-IDEMP-004 | Completed key younger than 24 hours | Replay record still available |
| TC-CONC-001 | Two customers purchase final unit concurrently | Exactly one order; stock never negative |
| TC-ORDER-003 | Mock payment fails | No order, inventory decrement, or cart clearing |
| TC-CANCEL-001 | Admin cancels CONFIRMED order | Status CANCELLED; stock restored once atomically |
| TC-CANCEL-002 | Admin repeats cancellation | 409; no additional stock restoration |
| TC-CANCEL-003 | Admin cancels SHIPPED/DELIVERED order | 409; no stock change |
| TC-ORDER-005 | Failure after stock decrement before commit | All transactional changes rolled back |

Tests must be automated when the corresponding feature is implemented and linked to CI evidence.
