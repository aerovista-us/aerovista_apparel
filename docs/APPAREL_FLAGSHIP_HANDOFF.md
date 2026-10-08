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
- Current `main`: `1fae29e4e21dba36f52acd34c37d801f49f88d0e`
- Latest accepted documentation merge: **Record flagship checkout production acceptance**
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
- Current observed ACOS `main`: `bb5d7122e45fc744c65cb913d6d97d5e2c200d8a`
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

The Apparel integration contract requires App Adapter, but Apparel currently has:

- no `@aerovista-us/app-adapter` dependency;
- no Account login/registration handoff implementation;
- no server-side handoff exchange;
- no Apparel secure app session;
- no `identity.describe()` proof;
- no `identity.can()` proof;
- no protected-content server gate;
- no Apparel logout/revoke proof.

Therefore Identity/App Adapter is the current active phase.

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

### Proposed relying-app id

Use **`apparel`** unless registry or existing naming rules require another canonical id.

Do not treat that id as accepted until checked against the handoff-client registry and broker allowlist.

### Provisioning requirements

For the chosen canonical app id:

1. register the relying-app/client origin;
2. add the id to Identity Gateway `HANDOFF_BROKER_SERVICES`;
3. provision the same `IDGW_SERVICE_SECRET_<ID>` on:
   - Identity Gateway runtime secret store;
   - Apparel server runtime secret store;
4. never expose that secret to Vite/browser variables;
5. deploy Identity Gateway only through the guarded root-owned promotion path;
6. keep Account/Identity authority centralized.

### Capability plan

Current names in the Apparel integration contract are **proposals until Registry registration**:

- `apparel.account.access`
- `apparel.order.create`
- `apparel.order.read`
- `apparel.order.history.read`
- `apparel.promotion.use`
- `apparel.member.pricing`
- `apparel.support.manage`
- `apparel.catalog.manage`
- `apparel.order.manage`
- `apparel.admin`

First proof should use the minimum required capability, not register the entire namespace at once.

Recommended first protected capability candidate: `apparel.order.history.read` or a narrower member/account read capability, depending on Registry conventions discovered during implementation.

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
| Account login start | redirects to central Account with correct app id/state/return | open |
| Account registration start | same handoff contract | open |
| Callback state validation | invalid/replayed state rejected | open |
| Handoff exchange | one-time code exchanged server-side only | open |
| Secure local session | HttpOnly + Secure; no raw native token in JS/localStorage | open |
| `identity.describe()` | canonical identity descriptor returned | open |
| `identity.can()` | live capability decision enforced server-side | open |
| Protected content | payload withheld on deny | open |
| Missing capability | 403/fail closed | open |
| Invalid/expired identity | deny | open |
| Handoff replay | deny | open |
| Stale predecessor | not treated as replacement session | open |
| Logout | app-held relying session revoked/terminated | open |
| Revocation | subsequent protected request denied | open |
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

1. **Canonical-id discovery**
   - inspect handoff client registry and Identity Gateway broker allowlist;
   - confirm whether `apparel` is unused and valid.
2. **Consumer shape**
   - add a minimal server boundary to Apparel;
   - consume `@aerovista-us/app-adapter` v0.4.0;
   - add browser login/registration entry points;
   - add same-origin callback endpoint;
   - store only a secure app session/cookie in the browser.
3. **Platform registration**
   - register relying app/origin;
   - add broker allowlist entry;
   - provision `IDGW_SERVICE_SECRET_APPAREL` both sides.
4. **First live identity proof**
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

**Proceed with Phase A1 now:** inspect the current handoff-client registry, Identity Gateway `HANDOFF_BROKER_SERVICES`, and a proven App Adapter consumer such as Workstation Portal or Rack. Choose the canonical Apparel app id and the minimum server shape before changing Apparel production.

---

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
- confirmed Apparel currently has no App Adapter/identity implementation;
- set Identity/App Adapter proof as the active phase.

---

## 17. Resume command

When resuming work, start here:

> Read `docs/APPAREL_FLAGSHIP_HANDOFF.md`, verify the current Git/runtime anchors have not drifted, then execute the first open item in **Next Action Queue**. Update the handoff before ending the work cycle.
