# Sprint 1B backend authentication

Implemented against `docs/sprint-1a/final-baseline/README.md`, the accepted D3
decision, the SRS plus approved addendum, the physical ERD specification, and
`05-API/openapi-v1.0-DESIGN-BASELINE.yaml`. OpenAPI's `/api/v1` server prefix
combines with `/auth/csrf` to give **GET /api/v1/auth/csrf**. D1/D2 checkout and
payment work is not included. CR-02 frontend link removal and CR-03 frontend
authentication changes are not included; existing frontend files are unchanged.

## API and browser sequence

| Method/path | Input | Successful response |
| --- | --- | --- |
| GET `/api/v1/auth/csrf` | Anonymous or authenticated session | 200 `{ "headerName": "X-CSRF-TOKEN", "token": "..." }` and session cookie |
| POST `/api/v1/auth/register` | `email`, `password` (12–128 characters), `fullName` (1–150 characters) | 201 UserProfile; does not log in |
| POST `/api/v1/auth/login` | `email`, `password` | 200 UserProfile; rotates session ID and clears previous CSRF token |
| GET `/api/v1/auth/me` | Authenticated session cookie | 200 UserProfile |
| POST `/api/v1/auth/logout` | Authenticated session cookie and CSRF header | 204, deletes server-side session and expires cookie |

UserProfile contains only UUID `id`, normalized `email`, `fullName`, and
`roles` (`CUSTOMER`, `ADMIN`). Registration cannot assign roles: unknown JSON
properties are rejected. Email is stripped/lowercased with Locale.ROOT and
protected by a normalized database unique index, including concurrent requests.
Passwords and password hashes are never returned in profiles or stored in the
session principal. Request DTO string representations redact their contents.

For state-changing requests, retain the cookie from bootstrap and send the
returned token in `X-CSRF-TOKEN`. Obtain a **new** token after login and logout.
Missing, invalid, stale, or another session's token returns 403. Query/form
tokens cannot replace the required header. GET bootstrap does not require
authentication. State-changing anonymous protected requests
with valid CSRF return 401; without valid CSRF they return 403 before
authentication/authorization. GET `/auth/me` without authentication returns 401.

Failures use `application/problem+json` with `type`, `title`, `status`, safe
`detail`, `instance`, and a stable application `code`. Registration validation
returns 400 with an `errors` map of field names/messages (never rejected values),
duplicate email returns 409, bad credentials return a generic 401, and denied
roles/CSRF return 403. Invalid JSON/unknown properties return 400. Login failures
do not distinguish nonexistent, incorrect-password, or disabled accounts.

## Security and deployment

- PBKDF2-HMAC-SHA256 with random 16-byte salt, 600,000 iterations, 256-bit hash;
  supports the full password length without bcrypt's 72-byte truncation.
- Spring Security authenticates through a database UserDetailsService;
  Spring Session JDBC persists the security context. No JWT or localStorage
  auth tokens. Password/hash fields are absent from serialized principals.
- Cookie: `SESSION`, HttpOnly, SameSite=Lax, Path=/, Secure by default. Explicit
  `SESSION_COOKIE_SECURE=false` is for trusted local HTTP development only.
  Inactivity timeout is 30 minutes; the cookie is a browser-session cookie.
- Login rotates the existing bootstrap session ID. Logout invalidates the
  persisted session; old IDs and CSRF tokens cannot be reused.
- `/api/v1/admin/**` requires ADMIN; `/api/v1/account/**`, `/api/v1/cart/**`,
  and `/api/v1/orders/**` require CUSTOMER. Both roles can access `/auth/me`.
  These are authorization boundaries, not implementations of deferred APIs.
  Health endpoints remain public; form login, HTTP Basic, and default logout
  processing are disabled in favor of the JSON API.
- Production must serve frontend and `/api` on the same HTTPS origin behind
  the approved reverse proxy. No credentialed cross-origin CORS is enabled.
  The frontend proxy/integration remains separate work. Do not expose this
  service as a replacement for production authentication until that work and
  staging HTTPS/cookie verification are complete.
- Never enable request-body/credential logging or place passwords in command
  arguments, repository files, or CI secrets for integration tests. Tests use
  isolated PostgreSQL containers and disposable test-only credentials.
- Registration/authentication rejection events contain no supplied field values.
  Hibernate's raw SQL exception logger is disabled because constraint details
  can echo submitted email or other sensitive values; API errors remain safe.

## Database migrations

- V1 is unchanged: reserves `commerceflow` schema.
- V2 creates only approved authentication business tables `users`, `roles`,
  `user_roles`; normalized email uniqueness; UUID user IDs; account state and
  timestamps; CUSTOMER/ADMIN role metadata. It creates no admin identity.
- V3 creates separate `spring_session` and `spring_session_attributes`
  infrastructure tables, indexes, and cascading attribute deletion, using
  Spring Session's PostgreSQL layout. Principal name supports full email length.
- Hibernate validates, Flyway owns DDL, and Spring Session schema auto-init is
  disabled. No other business tables or existing migration changes are included.

### Operator-only admin provisioning

There is no public admin-registration/provisioning endpoint and no seeded admin
password. A trusted operator first creates a normal account through registration,
verifies the owner's identity out of band, and records the exact user UUID.
Using an authorized PostgreSQL connection and psql's `account_id` variable,
review the target identity before executing this transaction:

```sql
BEGIN;
SELECT id, email, account_status FROM commerceflow.users
WHERE id = :'account_id'::uuid FOR UPDATE;
-- Proceed only after confirming the intended ACTIVE identity.
INSERT INTO commerceflow.user_roles (user_id, role_id)
SELECT u.id, r.id FROM commerceflow.users u CROSS JOIN commerceflow.roles r
WHERE u.id = :'account_id'::uuid AND u.account_status = 'ACTIVE' AND r.name = 'ADMIN'
ON CONFLICT DO NOTHING;
DELETE FROM commerceflow.spring_session
WHERE principal_name = (SELECT email FROM commerceflow.users WHERE id = :'account_id'::uuid);
COMMIT;
```

Use operator-managed authentication (for example a protected `.pgpass`); do not
put database passwords in command history. Role/account-state changes affect
new logins; revoke existing sessions in the same administrative transaction
when changing authorization or disabling an account. Role snapshots otherwise
remain valid until logout/expiry. No runtime administration API is added here.

## Requirement-to-test mapping

Run from `backend/` with JDK 21 and Docker: `./mvnw clean verify`.

| Requirement | Automated evidence |
| --- | --- |
| FR-01 registration, normalization, validation, uniqueness, CUSTOMER-only | `AuthServiceTest`; `AuthenticationIntegrationTest.registrationNormalizesEmailHashesPasswordAndAssignsCustomerOnly`, `invalidRegistrationAndPrivilegeInjectionAreRejectedSafely`, `concurrentNormalizedRegistrationsCannotCreateDuplicates` |
| FR-02 session login and fixation prevention | `loginRotatesSessionRefreshesCsrfAndPersistsAuthenticationInPostgres`, `failedLoginDoesNotAuthenticateOrDiscloseAccountExistence`, `disabledAccountsCannotLogin`, `expiredJdbcSessionCannotAccessAuthenticatedEndpoints` |
| FR-03 adaptive hashing and safe logging | `AuthServiceTest.passwordEncoderUsesSaltAndSupportsLongUnicodePasswords`, `credentialRequestsDoNotExposePasswordsInToString`, registration/hash/session assertions, `submittedPasswordsAreNotWrittenToLogs` |
| FR-04 server-side CUSTOMER/ADMIN roles | `customerAndAdminAuthorizationAreEnforcedByRealSessions` (test-only role probes; no deferred admin APIs added) |
| FR-05 logout invalidation and replay rejection | `logoutDeletesJdbcSessionExpiresCookieAndPreventsReplay` |
| D3 CSRF and cookies | `missingInvalidAndCrossSessionCsrfAreRejectedForAllAuthWrites`, `csrfProtectionAlsoCoversPutPatchAndDelete`, login refresh assertions, `ProductionCookieIntegrationTest.productionSessionCookieIsSecureHttpOnlyLaxAndRootScoped` |
| Safe structured errors | Validation/login/CSRF/RBAC integration assertions for HTTP status, Problem Details media type/fields, and secret exclusion |
| Foundation regressions | Existing `ApplicationIntegrationTest` (health, Actuator, Flyway) and `HealthControllerTest` |

Authentication integration tests use real HTTP, cookies, and PostgreSQL—not
mock authenticated principals—and fail if Docker is unavailable. The
production-cookie test verifies the emitted Secure cookie but is not a real
HTTPS reverse-proxy/staging test. The foundation health MVC slice intentionally
excludes default security auto-configuration; real health access is also
verified through the secured full application integration tests.

### Manual verification and remaining release gates

1. Follow README local database/startup instructions; keep a private cookie jar.
2. Bootstrap CSRF, register a new customer, confirm `/auth/me` is still 401.
3. Log in with that cookie/token, confirm a changed SESSION cookie and the
   profile from `/auth/me`; refresh CSRF before the next POST.
4. Confirm missing/stale CSRF gives 403; then log out using the fresh token.
   Replaying the old authenticated cookie against `/auth/me` must give 401.
5. Verify Secure/HttpOnly/SameSite/Path and session rotation under actual staging
   HTTPS/reverse-proxy conditions before security release. Frontend integration,
   browser E2E, production cookie transport, and operational hardening are not
   claimed verified by these backend tests.

No unresolved architecture/API/schema Change Request is introduced by this
implementation. CR-02/CR-03 frontend work remains outside this PR.
