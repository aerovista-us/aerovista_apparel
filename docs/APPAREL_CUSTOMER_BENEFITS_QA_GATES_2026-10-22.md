# Apparel customer benefits — remaining integration acceptance (2026-10-22)

Status: QA plan / no production release authorization.

## Verified baseline (see APPAREL_FLAGSHIP_HANDOFF.md sections 0A–0D)
- Isolated Commerce schema 0007 applied. Signed HMAC service call to `POST /v1/internal/account/orders/query` returned HTTP 200 and empty orders for two QA identities; empty arrays are **not** cross-identity paid-order proof.
- Disposable Saved Pieces Postgres migration, independent identity isolation and custom-format database restore passed.
- Production customer features remain default-off. Existing public browse, Square checkout, Gear, and Printful must not change.
- Vercel production SHA is unresolved due to connector authorization.

## Executed source regressions — 2026-10-22 (NXCore)
- Tested the existing isolated Commerce sandbox source at `/srv/Collab/mini.shops/AV-PNW.com/aerovista-commerce-sandbox` via a disposable container with that source mounted read-only; no production checkout, database, or customer feature flags were changed.
- Account/order suite: `python -m pytest -q tests/test_v1_account_orders.py` => **18 passed** (one nonfatal pytest cache warning caused by read-only mount).
- Complete Commerce v1 targeted regression: `python -m pytest -q -p no:cacheprovider tests/test_v1_*.py` => **64 passed in 2.36s**. Runtime container provisioned pytest ephemerally; host Python and production API image were not mutated.
- QA-local file fingerprints: `tests/test_v1_account_orders.py` SHA-256 `ba7564ac95e242ba4194c8c1f5461aac6e86d5be8e3f960ba6f9388bb3f26ccf`; `commerce_v1/checkout.py` SHA-256 `af47a7f8b12a1ece8346f9faf5c9a91f89800c5148d00906481691539481cd4d`. These fingerprints identify inspected local files, **not a Git commit SHA**; reconcile them against canonical repository HEAD before claiming exact-source revision parity.
- Remaining: provider-real Square sandbox paid-order proof, BFF session bridge, browser tests, and Vercel production SHA. These regression tests do not close those gates.

## Existing Commerce regression coverage — inspected on NXCore, October 22
- The Commerce sandbox source already contains `tests/test_v1_account_orders.py`, with tests for signed service HMAC denial, stale/bad signatures, public identity injection denial, identity-bound checkout, idempotency key replay/swap rejection, verified-payment projection, per-identity read isolation, partial tenders, currency mismatch, refund and out-of-order event handling, and cross-store authorization denial.
- These are **code tests with a mocked Square payment-link provider and crafted signed webhook fixture**; they must not be labeled a live Square sandbox transaction or a complete Apparel browser-to-Commerce flow.
- **Avoid duplicate engineering:** run the existing exact-head Commerce suite first, report its results, then add only missing E2E coverage for actual Square sandbox payment evidence and authenticated Apparel BFF identity/session-to-order requests. The current sandbox ledger having no paid QA order is not a failed existing code test.
- NXCore /srv/ACOS and the Commerce sandbox deployment paths inspected in this pass are not Git worktrees. Do not edit or git-merge those running copies directly. Use a clean version-controlled worktree and guarded promotion.

## Next test slice — controlled paid order / negative identity isolation
1. Record exact Git SHAs for Apparel UI, Commerce API, ACOS/apparel-auth and the QA database schema, with environment names and sanitized feature flags.
2. In an isolated Square sandbox and Commerce QA ledger only, create a controlled identity A order through the normal checkout/session linkage, then deliver a **verified** Square payment event through the supported webhook pathway. No fabricated paid flags or manual ledger writes count as acceptance.
3. Use valid service HMAC for identity A: assert exactly the expected order appears, with Square event/payment provenance and correct canonical identity linkage. Query identity B with another valid signed request: assert A's order does not appear. Query no identity, malformed identity, invalid/expired signature and unsigned request: assert fail-closed responses. Do not log service secrets, tokens, signatures, raw customer PII, or payment details.
4. Verify idempotent webhook replay and customer-order projection do not create duplicates or reveal another identity's details. Reconcile order counts and ledger fingerprints before/after.
5. Exercise rollback by restoring a separate QA database from the pretest backup, not overwriting production or the original QA evidence. Record counts and cleanup.

## Next test slice — Apparel BFF identity-to-Commerce bridge
- Resolve canonical principal **server-side** through the existing authenticated apparel-auth/App Adapter session; never accept an identity ID, capability, amount, order owner or paid status from the browser.
- Enforce registered order-history capability (verify actual registry ID; proposed names in the older contract are not automatically granted). For ordinary basic member views, explicitly document approved access policy before deployment.
- Sign Commerce internal requests only in the server environment, with short-lived timestamp, method, exact path, raw body and documented HMAC canonicalization.
- Validate origin/CSRF for mutations, exact session binding, revoked/logout sessions, cross-account swaps, unauthenticated denial and Commerce outage behavior. Prevent response caching/leakage across identities.
- Verify logged-in A -> orders A only; logged-in B -> orders B only; logged-out A -> protected denial; public storefront and existing Square checkout still work throughout.

## Next test slice — Saved Pieces HTTP/browser acceptance
- Reuse isolated state store and two legitimate QA sessions. Prove add -> reload -> read -> deduplicate -> remove, independent connection read, and A/B non-disclosure across authenticated HTTP.
- Negative cases: missing/invalid CSRF, disallowed Origin, unauthenticated request, revoked session, client-provided foreign identity, duplicate write/race and DB outage.
- Provision production state database, approved secrets, backup/restore and rollback runbook separately. Do not enable feature from a disposable DB result.

## Release controls
- Capture exact deployed Vercel SHA and runtime SHA before any release claim. If connector permissions remain 403, use an authorized independent deployment/runtime inspection; no inferred parity.
- Stage one feature at a time behind default-off flags, QA on desktop and mobile, watch error rates and audit data, retain immediate off-switch and recovery artifacts.
- Go/no-go must include scoped source/test evidence, sanitized command/results and any explicitly deferred test. Only a full gate may update the handoff to production-accepted.
