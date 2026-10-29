# Sprint 1B — Codex Implementation Brief

Status: **Approved scope; implementation not started**. Target branch: `feature/sprint-1b-auth-backend` from `develop`. Submit PR to `develop`, never `master`.

## Objective
Implement FR-01 through FR-05 (registration, login, password hashing, role-based authorization, logout) under the Sprint 1A design baseline. Do not implement checkout, product admin, or new payment features.

## Architecture constraints
- Java 21, existing Spring Boot backend, PostgreSQL + Flyway.
- Spring Security + Spring Session JDBC; server-side sessions, not JWT/localStorage.
- Same-origin browser/API assumption; CSRF token bootstrap via GET /api/v1/auth/csrf, token submitted as X-CSRF-TOKEN for state-changing requests including login/logout.
- HttpOnly session cookie, Secure in HTTPS production, appropriate SameSite; session rotation on login and invalidation on logout.
- Normalized unique email; adaptive password hash; public registration creates CUSTOMER only.
- ADMIN must be provisioned securely without hardcoded credentials or publicly accessible admin registration.
- Preserve established endpoint contract if available. If contract is ambiguous, raise a Change Request before modifying routes, schemas, or flows.
- Existing code and dependencies must be inspected before editing; prefer minimal changes.

## Deliverables
1. Authentication domain, persistence, services and REST controllers.
2. Flyway migrations for user/role mappings and Spring Session JDBC schema as needed, without altering approved business schema unexpectedly.
3. Spring Security configuration, session and CSRF integration.
4. Validation, consistent Problem Details errors and sanitized logging.
5. JUnit 5 unit tests, Spring Boot integration tests using PostgreSQL Testcontainers, security and authorization tests.
6. README with run/test commands and manual verification steps.

## Acceptance tests
- Registration: valid customer succeeds, duplicate normalized email rejected, invalid password/email rejected.
- Login: correct password establishes session and rotates session identifier; wrong credentials rejected without leaking account existence.
- Session: authenticated request works; logout invalidates session; prior session cannot be reused.
- CSRF: token bootstrap works; missing/invalid token on state-changing endpoint rejected (403); valid token accepted.
- RBAC: anonymous protected request returns 401; customer on admin endpoint returns 403; admin provisioning cannot be invoked publicly.
- Security: password never stored in plaintext; no auth tokens in localStorage; no secrets in logs.
- CI: relevant tests green; do not report success without run logs.

## Change control
Any deviation from approved SRS, UML, API, DB schema, security model or flow must be proposed **before implementation** with current design, proposed change, rationale, pros/cons, impact, recommendation and Tech Lead decision. Do not silently alter baseline.

## PR gate
Include requirement-to-test mapping, migrations review, test output and security notes. No merge until reviewer verifies evidence and CI status.
