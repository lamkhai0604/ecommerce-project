# Sprint 1A — Cross-Document Synchronization v1.4

**Status:** Review. No implementation changes.

## Completed in this package
- Rewrote canonical SRS v1.1 with FR-11, FR-16, NFR-03, CP-01 through CP-06 and 10 business table boundary.
- Added editable Checkout Sequence v1.4 with replay, mismatch, concurrent duplicate, cart snapshot, atomic commit, rollback, recovery and cancellation branches.
- Preserved OpenAPI v0.4 REVIEW; replay keeps original 201 result.
- Added PDF render of new sequence and generated SRS PDF from DOCX.

## Consistency rules
- A retry compares explicit request fields, not a cart that may have been cleared.
- Existing successful key replays original response, without new order or inventory mutation.
- Inventory decrement and order confirmation are atomic.
- Only guarded CONFIRMED-to-CANCELLED transition restores stock, once.
- checkout_idempotency is infrastructure, not an eleventh business table.

## Open design decisions (do not mark approved)
1. Terminal mock-payment failure replay vs controlled retry.
2. Lease expiry, crash recovery and retry takeover for IN_PROGRESS.
3. Exact CSRF bootstrap and cookie topology for production deployment.
4. Full native draw.io export and semantic review of *other* diagrams; prior diagram PDFs are illustrative and not verified pixel-identical exports.

## Release gate
The package is REVIEW, not FINAL, until open design decisions and all diagram semantic QA are resolved.
