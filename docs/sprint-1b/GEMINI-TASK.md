# Sprint 1B — Gemini UI/UX Brief

Status: **Design handoff only; no implementation authorized by this document**.

## Scope
Produce responsive React/TypeScript-compatible UI specifications for Login, Register, session expiry, unauthorized access, validation errors and loading states. Respect the existing frontend design system and component structure after inspecting the repository.

## Constraints
- Session cookie authentication only; never store credentials or tokens in localStorage.
- GET /api/v1/auth/csrf before state-changing auth requests; send X-CSRF-TOKEN per API contract.
- Keep login/register flows aligned with approved SRS and backend API contract.
- Clear, accessible field labels, keyboard focus, status messages, password visibility control and safe generic authentication errors.
- Do not add social login, forgot-password workflow, guest cart, new API routes, or change authorization flows without Tech Lead approval.
- Avoid displaying raw backend stack traces or sensitive error details.

## Deliverables
1. Screen/state inventory and user flows.
2. Component inventory, mobile/desktop responsive layout notes.
3. Error/loading/empty/expired-session behavior.
4. Accessibility checklist and UI acceptance tests.
5. Design-to-API mapping for each action.
6. Open Change Requests for any deviation from the approved baseline.

## Review criteria
Consistency with existing UI, API correctness, accessibility, predictable session behavior, no unsupported features, and clear handoff to Codex.
