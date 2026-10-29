# Sprint 1A → Sprint 1B Implementation Gates

## Required before authentication implementation
1. Confirm frontend/backend same-origin routing plan for development and production.
2. Confirm session JDBC schema/migration ownership and local PostgreSQL configuration.
3. Specify the session cookie flags for local HTTP vs production HTTPS.
4. Write contract tests for CSRF bootstrap, login, session rotation, logout, and RBAC.
5. Confirm admin provisioning through a safe bootstrap process; no public admin registration and no hardcoded credentials.

## Authentication acceptance criteria
- Registration normalizes and uniquely validates email; password hashes use a modern adaptive algorithm.
- Login establishes a server-side session and rotates session identifier.
- CSRF is enforced on POST/PUT/PATCH/DELETE and login/logout; token refreshed as required.
- Logout invalidates session; old session cannot access protected routes.
- Customer cannot access admin APIs (403); anonymous protected requests return 401.
- No authentication token is stored in localStorage.
- Secrets and sensitive request bodies are excluded from logs.
- Tests use real PostgreSQL via Testcontainers for session persistence.

## Deferred until checkout implementation
- Idempotency reservation, canonical payload and first cart snapshot.
- Lease acquisition, expiry and fencing generation; crash recovery.
- Atomic stock decrement and order/snapshot/cart/idempotency commit.
- Replayable mock-payment outcomes; once-only cancellation stock restoration.
- Deterministic concurrency tests and fault-injection tests.

## Explicit nonclaims
These criteria are planned acceptance tests, not tests already executed. Do not merge implementation until CI is green and review is complete.
