# CR-04 / CR-05 authentication contract revision — PROPOSED

This is a separate contract review for the implementation authorized on
[PR #10](https://github.com/lamkhai0604/ecommerce-project/pull/10#issuecomment-6529350343).
It is not FINAL, not a deployment, and not permission to merge PR #10.
The Sprint 1A FINAL artifact is unchanged. `1.1.0-auth-PROPOSED` denotes a
contract-document revision, not a promise of backward-compatible semantics;
runtime URLs remain `/api/v1`.

Review `openapi-v1.1-auth-PROPOSED.yaml` alongside PR #10 corrections.

- CR-04: exact duplicate-email classification; CSRF_INVALID versus ACCESS_DENIED;
  safe INTERNAL_ERROR/SERVICE_UNAVAILABLE; login schema 400 versus credential 401;
  required code; retained errors map; optional fieldErrors/requestId and header.
- CR-05: registration fullName 1–50 Unicode code points, normalized email max 254
  code points, password 12–128 code points. Counting is after existing email
  strip/lowercase normalization; no new fullName/password normalization.
- Login email normalization/format/254 bound align with registration; required
  password is a non-null string, not a reapplication of creation-length rules.
- Independent CUSTOMER/ADMIN roles; deliberate dual-role assignment only.
- Occurrence URNs/request IDs are opaque; no sensitive path/query reflection.
- Existing invalid Conflict Response Object keys are removed in the proposed
  copy only; the INSUFFICIENT_INVENTORY example is reconciled to D2's
  INSUFFICIENT_STOCK. No future commerce code is implemented by this revision.

## Compatibility and adoption gate

Inventory actual consumers and generated clients before merge/release. Specific
403 codes replace legacy FORBIDDEN; consumers must retain a generic safe denial
fallback for that legacy code, never guess CSRF from text or routes. Unknown codes,
non-JSON responses, and transport failures require a safe fallback. No runtime
compatibility switch, legacy alias, automatic mutation retry or frontend source
change is introduced. If an actual consumer requires exact old behavior, obtain
an explicit transition/versioning decision before cutover.

Missing/null login fields now produce 400 instead of PR #10's former 401. Unknown
integrity failures no longer masquerade as email 409. Required code/new outcomes
and metadata require regenerated clients/fixtures and explicit acceptance.
Optional extension fields do not guarantee compatibility with strict validators.

Gemini owns PR #12 UI/UX document alignment (including field counters, error
names, feedback and recovery). CR-03 remains on hold; CR-02 link removal is not
performed here. No consumer/staging/browser sign-off is claimed.

## Review checklist

- [ ] Tech Lead/architecture approve this revision as the next authoritative contract.
- [ ] Consumer inventory and legacy/unknown-code fallback verified.
- [ ] Gemini documentation and CR-05 Unicode counting aligned.
- [ ] Backend outputs, schemas and code/status mapping match test evidence.
- [ ] Controlled publication/authority links approved; FINAL source not silently replaced.
- [ ] Actual HTTPS/proxy and browser integration gates separately satisfied.
