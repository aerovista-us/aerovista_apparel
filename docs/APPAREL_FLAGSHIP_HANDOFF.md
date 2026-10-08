# AeroVista Apparel Flagship — Living Handoff

**Status:** active living handoff  
**Canonical location:** `aerovista-us/aerovista_apparel/docs/APPAREL_FLAGSHIP_HANDOFF.md`  
**Last reconciled:** 2026-10-07 America/Los_Angeles  
**Update rule:** every accepted production change, authority change, runtime promotion, or closed/open gate that affects Apparel must update this file in the same work cycle. Do not treat this as a historical report.

---

## 1. Purpose

This handoff is the operating checkpoint for the AeroVista Apparel flagship program. It is intended to let another operator resume work without reconstructing the thread from chat history.

It records:

- current production truth;
- authority boundaries;
- exact accepted evidence;
- current Git/runtime anchors;
- deployment and rollback-sensitive facts;
- unresolved gates;
- the next action queue;
- documentation drift that still requires correction;
- downstream-store boundaries;
- the running change log.

When this file conflicts with verified runtime or provider state, runtime/provider state wins and this file must be corrected immediately.

---

## 2. Source precedence

Use this order when facts disagree:

1. verified production runtime and provider state;
2. Square catalog/payment state;
3. deployed Store/Commerce backend evidence;
4. current Git source and integration contracts;
5. current Notion project summaries;
6. this handoff;
7. older plans, audits, notes, screenshots, and historical reports.

The handoff is a coordination SOT, not a replacement for the owning authority.

---

## 3. Current canonical anchors

### Apparel

- Repo: `aerovista-us/aerovista_apparel`
- Production host: `https://apparel.aerovista.us`
- Current `main`: `13d0d03bdc35fe7083f30d9598d9d7138ea8c225`
- Latest accepted documentation merge: **Add living Apparel flagship handoff**
- Current integration contract: `docs/APPAREL_INTEGRATION_CONTRACT_V1.md`
- Runtime/public role: flagship presentation/storefront; public browse remains available.

### Shared Store / Gear commerce

- Repo: `aerovista-us/store`
- Gear host: `https://gear.aerovista.us`
- Shared API origin: `https://api.aerovista.us`
- Current `main`: `34351d81b83928896f6287a8951f851f1b70fab0`
- Gear API proxy Worker: `gear-api-proxy`
- Existing production route: `gear.aerovista.us/api/* -> gear-api-proxy`
- Route is intentionally managed outside routine Wrangler deploys.
- Current accepted deployment flow: Wrangler 4 `versions upload` -> `versions deploy` at 100% traffic.
- Current accepted Worker version: `be777901-d1be-4d24-b747-8225ea527106`
- GitHub-hosted runner may receive Cloudflare HTTP 403 on the public probe; that specific condition is a warning, not proof of runtime failure. NXCore is the accepted edge-admitted external probe.

### Identity / App Adapter platform

- ACOS repo: `aerovista-us/ACOS`
- Current ACOS `main`: `53a12be17513759b3dc90d32de1d8b690921dae2` — Apparel App Adapter onboarding merged
- App Adapter package: `@aerovista-us/app-adapter`
- App Adapter source version: **0.4.0**
- Package path: `packages/aerocore-app-adapter`
- App Adapter SOT: `packages/aerocore-app-adapter/SOT.json`
- Canonical onboarding: `docs/APP_ONBOARDING_RECIPE.md`
- Session security contract: `docs/ACCOUNT_SESSION_SECURITY_V1.md`
- Content access contract: `docs/CONTENT_ACCESS_CONTROL_V1.md`
- Identity runtime ledger: `docs/IDENTITY_ACCESS_RUNTIME_STATUS.md`
- Identity Gateway repo: `aerovista-us/identity-gateway`
- Public broker: `https://identity-api.aerovista.us`
- Local broker port on NXCore: 3110
- Runtime secret store: `/etc/acos-secrets/identity-gateway.env`
- Identity Gateway runtime is live on ACOS commit `53a12be17513759b3dc90d32de1d8b690921dae2`; guarded deploy passed 9 files / 64 tests, local/public health, unauthenticated broker rejection, and AVCC connectivity.
- Pre-Apparel Gateway rollback commit: `d1689f472229fe06524b606d217d81202f07675b`
- New relying-app service source: `services/apparel-auth`, target `https://apparel-auth.aerovista.us`, local port 3150.
- `apparel-auth` is now running locally on **127.0.0.1:3160** from merged ACOS source `20162d39a3a25c4baa54846811683807ee21fd03`.
- `IDGW_SERVICE_SECRET_APPAREL` was provisioned on both sides and Identity Gateway was guarded-reloaded at `53a12be17513759b3dc90d32de1d8b690921dae2`.
- Local and public health both return `{"ok":true,"service":"apparel-auth","version":"0.1.0"}`.
- Broker-auth acceptance passed through the bridge's own callback path: valid transaction state + intentionally invalid handoff code returned `404 code_not_found`, proving the Apparel HMAC was accepted before the code lookup failed closed.
- Cloudflare ingress is live and validated for `apparel-auth.aerovista.us -> http://127.0.0.1:3160`; cloudflared restarted active.
- **Public DNS is the remaining ingress blocker.** The intended `apparel-auth.aerovista.us` record does not yet exist in the `aerovista.us` zone.

**Important:** the standalone Identity Gateway `STATUS.md` is older than the October ACOS Identity runtime ledger. Prefer newer accepted runtime/source evidence when they disagree.

---

## 4. Authority model

The operating rule is:

> Account proves authentication. Identity Gateway and governed grants resolve identity/capability. App Adapter transports that result and owns no authority. Apparel presents the storefront and enforces local policy. Store/Commerce maps variants and checkout policy. Square is commercial truth for catalog, base retail price, payment, and refund. Printful executes fulfillment.

### Ownership table

| Concern | Authority |
| --- | --- |
| Login/account creation | AeroVista Account |
| Human profile surface | AeroVista Account / Profile Contract |
| Canonical identity | AVCC Identity |
| Live identity/capability broker | Identity Gateway |
| Grant administration | governed AVCC/Identity access administration |
| App integration seam | App Adapter |
| Public Apparel presentation | Apparel |
| Product/variation projection and checkout orchestration | Store/Commerce backend |
| Catalog existence/base retail price/payment/refund | Square |
| Normalized future order ledger | Commerce v1 |
| Fulfillment execution | Printful |

### Hard boundaries

Apparel must not create:

- another authentication system;
- another password/user database;
- another profile authority;
- browser-held service secrets;
- frontend role authority;
- Apparel-owned Square SKU/variation authority;
- client-supplied base price authority;
- payment truth from redirect/success-page state.

---

## 5. Flagship storefront state

### Visual/storefront work already accepted

The flagship customer-facing room has already advanced through:

- entrance/door correction;
- readable directory;
- hidden bag count until non-zero;
- hanging rail visibility through 761–900px;
- shorter phone hero;
- larger Women's bays;
- hat shelf below bottoms;
- off-camera image lazy-loading;
- local WebP hero work;
- Men’s Gallery;
- Entry Gallery;
- Women’s Studio;
- Place Line;
- Further Edit;
- responsive production review around desktop, ~820px, and ~390px.

Raw masters and `public/products/_inbox/` remain unpublished.

Cindy has not been migrated.

### Catalog projection

October 4 Square-derived projection:

- 115 product records in the projection;
- 611 total variants;
- 585 visible variants;
- 585 server `variationId` mappings;
- 26 unmapped variants are intentionally hidden;
- visible mapping gaps: **0**;
- price mismatches: **0**;
- malformed variation entries: **0**;
- extra variation entries: **0**.

Public Gear JSON and the mounted API projection differ at file-hash/formatting level but are semantically equivalent for product IDs, variation IDs, variant records, and product summaries.

The workbook/export is intake evidence only. `square_products_latest.json` is a curated storefront projection. Neither replaces Square authority.

---

## 6. Checkout production acceptance — CLOSED

The earlier October blockers are closed.

### Price reconciliation

Accepted live mappings:

- Ridgeline Tee S:
  - product: `aerovista-ridgeline-tee`
  - cart key: `Default__S`
  - Square variation: `CYMAIUALBD5E65AY64AE33CS`
  - authoritative base price: **3299 cents / $32.99**
- Shadow Pants M:
  - product: `shadow-pants`
  - cart key: `Default__M`
  - Square variation: `AADW36VFWTN37URWPN6EHEXT`
  - authoritative base price: **5200 cents / $52.00**

The prior stale $46 Shadow Pants server price is resolved.

### Live CORS acceptance

NXCore proved:

- `OPTIONS https://gear.aerovista.us/api/square/checkout`
  - Origin: `https://apparel.aerovista.us`
  - HTTP 204
  - exact `Access-Control-Allow-Origin: https://apparel.aerovista.us`
  - allowed methods/headers present
- `GET https://gear.aerovista.us/api/square/bootstrap`
  - HTTP 200
  - exact Apparel origin admitted.

### Live checkout-link smoke

Both live calls returned HTTP 200, Apparel CORS, and `ok: true`:

- Ridgeline S -> Square-hosted checkout URL
- Shadow Pants M -> Square-hosted checkout URL

No payment was submitted and no fulfillment was triggered.

### Worker deploy corrections that produced the accepted state

Store PR sequence:

- #5 — fail closed if Cloudflare deploy token is missing; add post-deploy verification;
- #6 — pass Cloudflare account ID;
- #7 — stop routine CI from mutating the existing route;
- #8 — move to current Wrangler 4;
- #9 — explicitly upload and promote Worker versions;
- #10 — make the CORS probe edge-aware for GitHub-hosted-runner 403 behavior.

The Cloudflare CI token is account-scoped with Workers Scripts write authority; routine deploy does not require route or DNS mutation.

---

## 7. Commerce state

### Current production reference

Gear + the legacy Store API remain the current production commerce reference.

The legacy backend already:

- creates Square-hosted checkout;
- receives verified Square webhooks;
- persists operational order data;
- creates fulfillment jobs;
- runs fulfillment/reconcile workers.

Commerce v1 is a normalization/versioning program around that existing behavior. It is not a greenfield order system.

### Commerce-v1 acceptance still open

Apparel is **not** yet Commerce-v1 integrated.

Remaining proof includes:

- normalized `av_order_id` ledger;
- Square order/payment correlation;
- signature/payment amount/currency verification;
- idempotency and replay handling;
- duplicate-event handling;
- promotion-redemption lifecycle;
- fulfillment release rules;
- durable reconciliation/audit;
- authenticated identity linkage where applicable;
- fail-closed contradictory payment states.

Do not start Commerce-v1 migration until the Apparel Identity/App Adapter proof is established unless a specific commerce blocker requires earlier work.

---

## 8. Cindy boundary

Cindy remains a downstream regression/reference store, not the flagship migration target.

Current Cindy evidence includes:

- 5 products;
- 36 variants;
- CORS;
- server SKU/Square variation mapping;
- Square-hosted checkout creation;
- Printful mappings;
- $68 offer including shipping/tax.

Not proven:

- a Cindy paid-order end-to-end webhook/fulfillment run;
- the shared flagship promotion engine;
- live shared enforcement of Cindy Connect Hoodies.

Approved Cindy Connect Hoodies requirement:

- $25 off each distinct qualifying style;
- one order only;
- max discount $125;
- no stacking.

Do not redesign or migrate Cindy unless a customer-facing issue requires it or Cindy is deliberately selected as a regression consumer for a shared platform capability.

---

## 9. Identity/App Adapter phase — CURRENT

### Standing

Identity/App Adapter is the current active phase. The **platform source slice is accepted and merged**, while production relying-app acceptance is still open.

Completed in ACOS source:

- canonical relying-app id `apparel` registered with Account;
- callback origin fixed to `https://apparel-auth.aerovista.us`;
- public launch URL remains `https://apparel.aerovista.us`;
- Identity Gateway broker admits `apparel`;
- dedicated `IDGW_SERVICE_SECRET_APPAREL` runtime variable is wired through Gateway Compose;
- `services/apparel-auth` consumes `@aerovista-us/app-adapter` server-side;
- transaction-bound login-state cookies prevent concurrent-login collisions;
- native session remains HttpOnly + Secure + SameSite=Lax;
- `identity.describe()` is used for authenticated identity context;
- first protected proof route calls live capability evaluation using candidate `apparel.account.access`;
- local logout completes before best-effort remote revoke so an Identity outage cannot trap the browser in a false logout wait.

Source acceptance evidence:

- Apparel handoff registration: 4/4;
- `apparel-auth` policy: 4/4;
- Identity Gateway full suite: 9 files / 64 tests;
- AVCC backend full suite: 50 files / 532 tests;
- container image build + local `/health` smoke: pass;
- final Codex re-review on PR #99: no major issues.

Production still open:

- provision the same new `IDGW_SERVICE_SECRET_APPAREL` into Gateway + `apparel-auth`;
- start `apparel-auth` on 127.0.0.1:3150;
- publish `apparel-auth.aerovista.us` through the existing Cloudflare Tunnel;
- prove live Account handoff, `identity.describe()`, capability deny/allow, logout/revoke, replay/stale-session behavior;
- only after auth-bridge health is accepted, release the held storefront Account UI.

Held frontend source:

- Apparel PR #5, branch `feat/apparel-identity-client-20261007`;
- clean Vite production build passes;
- review findings for failed-logout state and missing Women's Studio Account control were corrected;
- **do not merge/deploy before the auth bridge is live and healthy**.

### Existing platform capability to consume

App Adapter v0.4.0 already supports:

- Account login redirect;
- Account registration redirect;
- one-time callback/state validation;
- same-origin relying-app handoff exchange;
- Identity Gateway HMAC signing;
- session resolve/revoke;
- `identity.describe(sessionToken)`;
- `identity.can(...)`;
- `content.canView(...)`;
- browser-safe auth helpers;
- generic registered-service calls.

Do not fork or reimplement these contracts inside Apparel.

### Mandatory Apparel runtime pattern

```text
Browser
  -> Apparel public/login UI
  -> Account login/registration
  -> Apparel callback
  -> Apparel server exchanges one-time handoff code
  -> secure HttpOnly Apparel app session
  -> server-side App Adapter
  -> Identity Gateway
  -> identity.describe()
  -> identity.can()/content.canView()
  -> protected Apparel action/content
```

### Canonical relying-app id

**`apparel` is accepted.**

Discovery proved the id was unused before onboarding. ACOS PR #99 registered it in the Account handoff-client authority and added it to the Identity Gateway built-in broker allowlist.

### Provisioning requirements

Current state:

1. relying-app/client origin — **DONE in source**;
2. Identity Gateway broker allowlist — **DONE and live**;
3. dedicated `IDGW_SERVICE_SECRET_APPAREL` variable — **DONE in source; runtime value pending local root provisioning**;
4. browser secret exposure — **none; frontend is browser-safe only**;
5. Identity Gateway guarded deployment — **DONE at `53a12be...`**;
6. Account/Identity authority remains centralized — **preserved**;
7. `apparel-auth` service deployment — **pending secret install**;
8. Cloudflare ingress/DNS — **pending healthy local service**.

### Capability plan

Baseline authenticated Apparel account access now uses the existing governed **`aerovista.member`** foundation grant. This avoids creating a redundant app-local capability merely to prove that a verified AeroVista account may access its basic Apparel account surface.

Reserve `apparel.*` capabilities for differentiated privileges only, for example:

- `apparel.order.history.read`
- `apparel.promotion.use`
- `apparel.member.pricing`
- `apparel.support.manage`
- `apparel.catalog.manage`
- `apparel.order.manage`
- `apparel.admin`

Those names remain proposals until explicitly registered through the governed grant-definition path.

### Content policy rule

Public:

- storefront rooms;
- product browsing;
- imagery;
- sizes;
- displayed prices;
- public collections/policies.

Authenticated/protected:

- saved profile information;
- order history;
- member benefits;
- account-linked discounts;
- private collections;
- administrative/support tools.

Browser gating is UX only. Protected payloads must be withheld server-side until the capability check passes.

---

## 10. Identity acceptance matrix for Apparel

Apparel is not called Identity-integrated until all rows have production evidence.

| Gate | Required result | State |
| --- | --- | --- |
| Account login start | redirects to central Account with correct app id/state/return | **accepted live** |
| Account registration start | same handoff contract | open |
| Callback state validation | invalid/replayed state rejected | open |
| Handoff exchange | one-time code exchanged server-side only | **accepted live** |
| Secure local session | HttpOnly + Secure; no raw native token in JS/localStorage | **accepted live** |
| `identity.describe()` | canonical identity descriptor returned | **accepted live** |
| `identity.can()` | live `aerovista.member` decision enforced server-side | **accepted live** |
| Protected content | payload withheld on deny | unauthenticated deny accepted; authenticated allow accepted |
| Missing capability | 403/fail closed | open |
| Invalid/expired identity | deny | open |
| Handoff replay | deny | **current-source regression accepted; live destructive replay deferred to controlled QA identity** |
| Stale predecessor | not treated as replacement session | **current-source regression accepted; live destructive test deferred to controlled QA identity** |
| Logout | app-held relying session revoked/terminated | open |
| Revocation | subsequent protected request denied | **source regression accepted; live logout/revoke observation pending current browser session** |
| Identity/Gateway outage | protected operation fails closed; public browse remains | open |

---

## 11. Known identity/security caveats

- The dedicated Identity Gateway `STATUS.md` from August still records a Firebase service-account rotation security gate. Reconcile against the newer ACOS runtime/security work before claiming it remains open or closed.
- Account Session Security v1 source was accepted before later October Identity work; source acceptance and production promotion must not be conflated.
- Real customer identities are production evidence, not QA fixtures. Do not mutate customer grants/profile/session state for testing.
- Use controlled test identities for deny/revoke/replay acceptance.
- The browser never receives Identity Gateway/AVCC service secrets.
- Roles select experience; capabilities authorize protected actions.

---

## 12. Deployment/runtime cautions

### NXCore Store worktree

The operational Store checkout at:

`/srv/Collab/mini.shops/AV-PNW.com/av_storefront`

has historically contained dirty operational changes. Do not reset, pull, or switch it casually.

Prefer:

- GitHub branches/PRs for source changes;
- clean deploy worktrees for guarded promotions;
- mounted runtime-file inspection for production evidence.

### Cloudflare

The Gear Worker route exists and should not be re-created by routine CI.

Routine code promotion:

1. upload version;
2. deploy version at 100%;
3. leave route intact;
4. verify from an edge-admitted host.

### Secrets

Never print, commit, or place in browser code:

- Identity Gateway service secrets;
- AVCC service/HMAC secrets;
- Square access tokens;
- Square webhook secrets;
- Printful secrets;
- Cloudflare API tokens;
- administrative credentials.

---

## 13. Documentation drift still to clean

- `docs/APPAREL_INTEGRATION_CONTRACT_V1.md` still contains the historical Shadow Pants $46 hold example in the authority section even though the runtime hold is closed. Preserve the invariant, but update the example to past tense/current accepted state.
- Any Store status document that still presents August catalog counts or “Worker deploy skipped” as current must be relabeled historical or updated.
- Keep the Apparel/Store sibling integration-contract copies byte-aligned when the contract changes.
- Notion was updated on 2026-10-07 to reflect checkout acceptance and the next Identity/App Adapter phase.

---

## 14. Next Action Queue

### Phase A — Apparel Identity/App Adapter proof

1. **Canonical-id discovery — DONE**
   - `apparel` confirmed available and registered.
2. **Consumer shape — SOURCE ACCEPTED**
   - dedicated server bridge `services/apparel-auth`;
   - App Adapter v0.4.0 consumed server-side;
   - browser UI prepared separately in held Apparel PR #5;
   - secure native session remains server/HttpOnly only.
3. **Platform registration — LIVE EXCEPT DNS**
   - relying app/origin registered;
   - broker allowlist deployed live;
   - dedicated shared secret provisioned on Gateway + Apparel bridge;
   - Identity Gateway reloaded successfully and passed guarded acceptance;
   - `apparel-auth` live locally on 127.0.0.1:3160;
   - bridge HMAC admission proven through controlled invalid-handoff test;
   - Cloudflare ingress active;
   - **public `aerovista.us` DNS record still required**.
4. **First live identity proof — NEXT AFTER DNS**
   - Account login;
   - callback/handoff;
   - `identity.describe()`;
   - render authenticated user/account state.
5. **First capability proof**
   - register one minimum Apparel capability;
   - `identity.can()`;
   - deny without grant;
   - allow with controlled grant.
6. **Protected content proof**
   - server-side `content.canView()` before payload load;
   - browser lock/hide mirrors the server decision.
7. **Session integrity**
   - logout/revoke;
   - replay;
   - stale predecessor;
   - invalid session;
   - gateway unavailable fail-closed.
8. **Documentation/runtime acceptance**
   - update this handoff;
   - update Apparel integration contract if behavior changed;
   - update Notion;
   - record exact commits/runtime evidence.

### Phase B — Commerce v1

Start only after Phase A identity acceptance unless a blocker forces earlier work.

### Phase C — Cindy regression

Regression only. No broad migration.

---

## 15. Immediate next decision

The live human login, `identity.describe()`, and `identity.can(aerovista.member)` gates are accepted.

Next:

1. prove browser logout clears the relying-app cookie even if remote revoke is slow;
2. observe the native session revoke request at Identity Gateway;
3. prove a replayed/consumed handoff transaction is rejected;
4. prove stale/predecessor session behavior fails closed and is not silently rebound to a replacement session;
5. update this handoff and Notion with the final Identity acceptance matrix;
6. release the held storefront Account UI PR #5 when Vercel can accept another production deployment.

The storefront Account UI PR #5 remains held only by the Vercel daily deployment quota, not by Identity backend readiness. The backend identity chain is already accepted independently of that UI release.

## 16. Running change log

### 2026-10-07 — checkout acceptance

- reconciled Square projection and server map;
- closed Shadow Pants stale-price hold;
- proved 585 visible mapped variants with zero visible gaps/price mismatches;
- repaired Gear Worker deployment;
- promoted Worker at 100%;
- proved Apparel-origin CORS live from NXCore;
- generated successful Ridgeline S and Shadow Pants M Square checkout links;
- updated Apparel docs and Notion;
- no payment/fulfillment executed.

### 2026-10-07 — handoff established

- created this living handoff;
- identified App Adapter v0.4.0 as the required existing integration seam;
- set Identity/App Adapter proof as the active phase.

### 2026-10-07 — Live human Account handoff accepted

- completed a real central Account sign-in through `apparel-auth.aerovista.us`;
- live `/api/session` returned `authenticated: true` with the canonical identity descriptor;
- live protected account route returned `allowed: true` using `authorization: identity.can`;
- baseline capability is the governed `aerovista.member` grant;
- this proves the production chain Account -> one-time handoff -> secure Apparel session -> App Adapter -> Identity Gateway -> `identity.describe()` -> `identity.can()`;
- no new role, user database, or browser-side authorization authority was introduced;
- remaining identity gates are logout/revoke, handoff replay, stale predecessor/replacement handling, invalid/expired session, and gateway-unavailable fail-closed behavior;
- do not use the live founder identity as a destructive QA fixture for revoke/suspend testing.

### 2026-10-07 — Apparel auth runtime locally accepted

- provisioned `IDGW_SERVICE_SECRET_APPAREL` on Gateway + Apparel bridge without exposing the value;
- guarded-reloaded Identity Gateway `53a12be...`; local/public health, unauthenticated broker rejection, and AVCC connectivity all passed;
- corrected an NXCore port collision: host 3150 was already serving mag-auth, so Apparel auth was moved to host **3160** while keeping container port 3150;
- merged the host-port correction as ACOS PR #103;
- merged baseline capability correction as ACOS PR #105 / `20162d39a3a25c4baa54846811683807ee21fd03`;
- deployed `apparel-auth` from exact SHA `20162d39...`;
- local and public health identify `service=apparel-auth`;
- exact Apparel CORS + credentialed anonymous session passes;
- protected route denies unauthenticated access with 401;
- foreign-origin logout denies with 403;
- valid login-state + fake handoff code returns `404 code_not_found`, proving HMAC broker admission;
- basic protected account access now uses existing governed `aerovista.member` rather than creating redundant `apparel.account.access`;
- Cloudflare ingress and correct `aerovista.us` DNS are live;
- storefront Account UI remains in Apparel PR #5 at head `789f267...`; production build passes locally;
- Vercel rejected the refreshed PR preview because the project exceeded 100 deployments/day on the free tier, so production UI promotion is temporarily rate-limited;
- Codex review quota is exhausted for a fresh review of PR #5, but its application code was previously reviewed clean at `cd8d287...`; the only later change was merging current handoff documentation.

### 2026-10-07 — replay/stale-session regression acceptance

Current ACOS `main` was checked in a clean checkout with targeted Identity/App Adapter security suites:

- AVCC backend: `cross_domain_handoff.test.js`, `identity_session_mint.test.js`, and `public_profile.test.js` — **3 files / 62 tests passed**;
- Identity Gateway: `handoff.test.js` and `broker.test.js` — **2 files / 36 tests passed**;
- consumed handoff replay returns/propagates `code_already_consumed`;
- revoked sessions resolve unauthenticated;
- stale predecessor recovery succeeds only through the valid generation/replacement path;
- reuse of an already-consumed predecessor returns `409 session_replacement_conflict`;
- authorization network/malformed/timeout paths fail closed rather than treating ambiguity as allowed.

These are current-source acceptance gates. Destructive live replay/stale-session mutation against a real customer/founder session remains intentionally deferred to a controlled QA identity.

### 2026-10-07 — live human Account handoff accepted

- completed a real central Account sign-in through `https://apparel-auth.aerovista.us/login`;
- returned through the public Apparel auth callback successfully;
- `GET /api/session` in the same browser returned `authenticated: true`, proving the live relying-app session and `identity.describe()` path;
- `GET /api/protected/account` returned `allowed: true`, proving live server-side `identity.can(aerovista.member)`;
- anonymous protected access had already been proven to return 401 fail-closed;
- next acceptance gates are logout/local cookie termination, native revoke observation, replay rejection, and stale/predecessor-session behavior.

### 2026-10-07 — Identity/App Adapter source accepted

- accepted canonical relying-app id `apparel`;
- merged ACOS PR #99 as `53a12be17513759b3dc90d32de1d8b690921dae2`;
- added Account handoff registration, Gateway broker admission, dedicated Apparel secret wiring, and `services/apparel-auth`;
- corrected three review findings before merge: Gateway secret forwarding, concurrent login-state isolation, and local-logout completion before remote revoke;
- source acceptance: Apparel handoff 4/4, auth policy 4/4, Identity Gateway 64/64, AVCC backend 532/532, image/health smoke pass;
- guarded-deployed Identity Gateway commit `53a12be...`; local/public health and AVCC connectivity pass;
- rollback commit recorded as `d1689f472229fe06524b606d217d81202f07675b`;
- staged local secret installer and guarded `apparel-auth` deploy helper;
- prepared held Apparel PR #5 for Account UI; build passes and review findings are fixed;
- runtime auth bridge remains blocked only on local root secret provisioning.

---

## 17. Resume command

When resuming work, start here:

> Read `docs/APPAREL_FLAGSHIP_HANDOFF.md`, verify the current Git/runtime anchors have not drifted, then execute the first open item in **Next Action Queue**. Update the handoff before ending the work cycle.
