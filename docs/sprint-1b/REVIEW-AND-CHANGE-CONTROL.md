# Sprint 1B — Review Gates and Change Control

## Branch ownership
- Codex: `feature/sprint-1b-auth-backend`
- Gemini: `feature/sprint-1b-auth-ui` (only after UI implementation scope is approved)
- Review/docs: `docs/*`
- All PRs target `develop`. Tech Lead alone merges `develop` into `master`.

## Review gates before merging into develop
1. Scope traced to approved FR-01–FR-05, SRS, UML and API.
2. Architecture and migration review; no unapproved design deviation.
3. Relevant unit/integration/security/E2E tests with verifiable execution evidence.
4. CI checks green; blocker/critical defects resolved.
5. Documentation, contract and implementation synchronized.
6. Reviewer checks diff for secrets, insecure session/cookie settings and accidental scope creep.
7. Merge only after all gates pass; do not assert tests passed if not run.

## Change Request template
- Baseline/current design:
- Proposed change:
- Reason and alternatives:
- Benefits:
- Downsides and risks:
- Impacts on SRS/UML/API/DB/security/UI/tests:
- Recommendation:
- Tech Lead decision: **Pending / Approved / Rejected / Revise**

No implementation of proposed deviations before Tech Lead approval.

## Sprint sign-off
After integration, Tech Lead manually verifies the running `develop` build and may request fixes. Only Tech Lead approves and merges release PR `develop` → `master`.

## Known outstanding design documentation
Sprint 1A canonical draw.io/PDF visual parity and complete SRS/OpenAPI/UML publication require separate verification; do not claim that all source documents have been merged.
