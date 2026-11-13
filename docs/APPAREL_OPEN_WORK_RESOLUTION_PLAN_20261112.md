# AeroVista Apparel — Comprehensive Open-Work Audit and Resolution Plan

**Audit:** November 12, 2026 (23:00 America/Los_Angeles; NXCore logs November 13 UTC)
**Scope:** AeroVista flagship site, shared Store/Commerce API, Square/Printful, Catalog Console, authenticated Account/Saved/Orders, release infrastructure, and relevant GitHub PRs.
**Contract:** This is an evidence-based plan, not authorization for a paid transaction, catalog-wide promotion, or production infrastructure cutover.

## Executive outcome

The customer-facing site is operational, but the full commerce program **is not yet certified**. The canonical Apparel site returns HTTP 200, and the Commerce API is healthy. Seven rooms (Men's, Women's, NorthLine, Shadow Wear, EchoVerse, Architect, After Dark) passed desktop 1440px and mobile 390px browser smoke with no observed JavaScript errors, failed staged-image requests, or page horizontal overflow. The checkout API retains all 240 production SKU mappings and the refund/cancel-protected checkout return logic. Both reconcile and fulfillment worker containers are running, which alone does not prove order delivery.

The top blocking dependencies are **a paid Square-to-Printful proof**, **Catalog Console runtime/source parity**, and **catalog release integrity**. GitHub [Catalog Console issue #21](https://github.com/aerovista-us/aerovista-catalog-console/issues/21) and [Apparel issue #30](https://github.com/aerovista-us/aerovista_apparel/issues/30) remain open.

## Evidence snapshot

| Surface | Verified state |
|---|---|
| Apparel production before this docs-only release | PR #40; main SHA a4a994fc |
| Commerce production | av-store-api:apparel-verified-return-refunds-20261112, healthy |
| Checkout mapping | 240 runtime entries |
| Shared Gear catalog | 115 records / 611 variants; original projectedAt 2026-10-04; meta.count incorrectly says 85 |
| Square catalog Nov 12 reconciliation | 141 ITEM objects; 20 items missing from *shared Gear* feed |
| Apparel-specific product distribution | 5 Women's/After Dark items + Mount Sled sticker distributed independently of Gear; 14 Square-only items remain to classify |
| Sticker single / bundle contract | 13 backend allowlisted variations and 13 frontend surcharge entries; old 12/13 discrepancy superseded |
| Shared-feed publish gate | 41 existing data-quality findings; separate older staging source may have inaccessible media paths |
| Visible Gear product imagery | 33 of 106 visible product records lack a primary image field; 31 have no same-ID local product folder; these counts do not prove broken pages |
| Catalog Console live container | av-catalog-console:store-editor-20261017; canonical source and production UI differ |
| Apparel account service | apparel-auth container healthy; Saved and My Orders production feature gates remain separate |
| Checkout transaction | No real paid Square card → webhook → Printful job acceptance has been performed |

**Status definitions:** F = confirmed inconsistency/failure; B = blocked by prerequisite; U = unverified gate; P = pending work; D = deliberately deferred. Completed past fixes are separately recorded below.

## P0 — blocking work

| ID | Status | Finding | Required resolution and acceptance |
|---|---|---|---|
| A01 | U | **Real payment-to-fulfillment not certified.** A genuine purchase, webhook, internal order, and exactly-one Printful fulfillment chain have not been observed end to end. | Run the no-money/staging matrix first. Then request *separate explicit approval* for one controlled purchase/fulfillment or cancellation/refund. Preserve Square order/payment, signed webhook, internal job state, Printful decision and receipt evidence. Do not manufacture a paid transaction. |
| A02 | B/F | **Catalog Console P0 parity blocker.** Its old October runtime has image-pull endpoints and UI missing from canonical main. The Console issue reports 114/114 canonical tests and 96/104 host checkout tests. A naïve replacement would remove working image management. | Port October image workflow/UI to canonical with tests, preserve catalog version/identity privacy, mount and back up persistent state, stage authenticated SSO/break-glass acceptance, rehearse rollback, then promote a pinned image. Close [Console #21](https://github.com/aerovista-us/aerovista-catalog-console/issues/21) only with production evidence. |
| A03 | B/U | **Apparel catalog/checkout parity not fully accepted.** [Issue #30](https://github.com/aerovista-us/aerovista_apparel/issues/30) depends on A02. Old 12/13 sticker count has been resolved, but catalog-wide variation, picture, provider and fulfillment parity has not. | Verify every buyable published variant against current Square ID, price, Printful ID, destination, images, promotions and checkout totals. Attach machine-readable matrix, no-payment orders, and eventual fulfillment proof to the issue. |
| A04 | U | Webhook retries, duplicate events, rejected/partial Printful orders and payment-versus-shipment state separation lack full failure acceptance. | Staged duplicate/replay/outage tests must produce exactly one Printful job, safe retries, immutable payment history and recoverable failure states. |
| A05 | B | **Production backend/source drift.** Commerce production is assembled via multiple NXCore Docker overlays and a 240-entry mounted variation map, distinct from older/generated repository maps. | Consolidate deployed code, Compose, map, migration, image digest and rollback into clean canonical source. Test rebuilt images and mapping equality before changing deployment strategy; never blindly redeploy host-side dirty files. |

## P1 — catalog and merchandising integrity

| ID | Status | Finding | Required resolution and acceptance |
|---|---|---|---|
| A06 | F/P | Shared catalog is old and metadata inconsistent: 115 actual records, meta.count 85, Oct 4 projection. Some new Apparel products only exist in frontend overlays. | Establish versioned Square→Console→store-destination publishing; accurate record counts/timestamps, approvals, atomic swaps and post-publish readback. |
| A07 | F/P | 41 pre-publish data-quality findings still remain. A newer staging catalog has different image paths, some 404 on Gear. | Produce a 41-row repair/waiver list. Validate media origins, descriptions, IDs and price fields; do not overwrite working public feed with inaccessible staging art. |
| A08 | P | 33 visible shared-feed products lack primary image fields, 31 lacking matching local folders. | Check actual image manifest/card/gallery URLs and store destinations individually; repair art or quarantine an intentionally editorial, unpublished, or unavailable item. No zero-image buyable page. |
| A09 | P | **14 Square-only items** still need disposition after six approved flagship-only additions. Potential candidates: AV Owl sticker, Bubble-free stickers, What's Next? sticker, RidgeLine Cuffed Beanie, Shadow Scale Camo Beanie. Other records include ambiguous Owl/Burst Lens and nonapparel services/tests. | Classify item purpose and destination, verify exact Square+Printful variation mapping, cost/shipping/margin, live images, and room. Explicitly exclude internal services/test products from automatic publication. |
| A10 | P | Five curated Square editions are frontend JSON additions; Mount Sled is inserted via backend sticker contract. | Migrate these to governed, versioned Apparel distribution manifest; verify provider changes on every publication and deduplicate when shared feed catches up. |
| A11 | U | Shared feed has 611 variation records vs 240 explicit runtime SKU keys; fallback may cover others, but not globally proven. | Report exact coverage of every *visible sellable* variation through the checkout resolver. Each must resolve to an authorized Square object and amount or fail closed. |
| A12 | U | Shipping-paid gross-to-net profitability is only modeled in examples; special fulfillment zones and mixed carts unverified. | Compare Printful quotes and costs by size, quantity, shipping zone and mixed bundle; include processor fee/refund reserves, enforce documented profit floor and promotion stacking rules. |
| A13 | P | Product drawer selects first matching available variant by size, not a full color+size+option tuple. **Currently inspected visible Gear variants had no duplicated size across colors**, so this is a *forward compatibility risk*, not a reproduced customer failure. | Implement full option-group selector with an intentionally ambiguous test fixture and exact provider variation IDs. |
| A14 | P | Catalog/room/variant/Printful/artwork/checkout state is split across independent files and services. | Single product release contract: approved Square item and variations, Printful external IDs, image manifest and checksums, room/fixture and destination, retail and margin, rollback and validation. |

## P1/P2 — account, support, release quality and deferred features

| ID | Status | Finding | Required resolution and acceptance |
|---|---|---|---|
| A15 | B | **Saved Pieces** passed isolated two-identity persistence and DB restore tests in October, but authenticated HTTP/CSRF/origin and production-state activation are still gated. | Deploy reviewed current ACOS apparel-auth source to isolated staging, create dedicated state DB/backup, test two canonical identities, logout/revoke/CSRF/origin, canary flag and rollback before public Saved. |
| A16 | B | **My Orders** / Commerce v1 identity-linked order history not production certified. | Signed Apparel-to-Commerce query with meaningful paid/canceled/refunded seeded QA order and cross-user denial. Enable UI only after privacy and reconciliation acceptance. |
| A17 | B/D | Commerce v1 Gear/Horizon/NorthLine cutover PR #3 is draft. | Keep old shared checkout as production reference until staged old-store regression and identity/fulfillment contracts are green; never migrate all stores by default. |
| A18 | U | Some destructive live auth replay/stale-session/expiry/gateway failure tests remain deferred. | Use controlled QA identities (not real customer/founder sessions); validate 401/403, CSRF, expiry, revoke, replay, and continued public browsing. |
| A19 | P | Checkout intent records expire logically at 30 days; scheduled purge and privacy-safe observability/alerts unverified. | Add retention job, checkout outcome counters, correlation and error monitoring without logging raw checkout tokens or payment PII. |
| A20 | P | Shopper support for paid-but-unfulfilled, pending, expired return, refund and failed Printful job is incomplete. | Separate payment and fulfillment state in Account/receipt/support views, allow safe recheck and never treat a success URL as proof. |
| A21 | P | Draft accessibility polish PR #26 has not been reconciled with November room/checkout changes. | Rebase/cherry-pick valid 44px target, contrast, focus, keyboard/reduced-motion fixes; run mobile 320/390/820 and desktop/screen-reader checks. |
| A22 | P | Apparel GitHub build workflow runs install and build but does not require existing 14 cart/return unit tests, commerce contract suite or browser smoke. | Add deterministic CI gates, asset-path/manifest checks and canonical Vercel postdeploy confirmation; protect release. |
| A23 | P | About 823 product artwork files / 198MB local product assets; no documented performance budget/field metrics. | Measure actual per-route bytes, LCP/CLS, responsiveness and mobile memory, then right-size thumbnails/caching without touching print masters. |
| A24 | P | **Seven older open PRs require disposition:** Apparel #5, #24, #25, #26; Commerce #3; Store #3 and #12. | Per-PR diff to current main and production; keep, rebase, cherry-pick or close as superseded, documenting reasoning. Do not merge stale October branches wholesale. |
| A25 | F/P | Living handoff header still says last reconciled Oct 16; newer November releases and fixed Shadow Pants/Lumina/sticker holds are mixed with historical blockers. | Rewrite current snapshot and evidence table, list exact production SHAs, Docker overlays, Vercel aliases and current gates; clearly label superseded history. |
| A26 | D | Bag is intentionally local to browser profile, not account/device synced. | Reassess only after customer-state/privacy acceptance; not a present bug. |
| A27 | D | Seasonal BOGO vs percentage discount and Black Friday margin contract not accepted for live deployment. | Approve explicit destination/promo economics, shipping-paid margin, stacking and provider redemption state; no offer by implication. |
| A28 | P | Repo still has GitHub Pages deploy workflow though Vercel is canonical. | Decide whether Pages is preview-only, deconflict branch/deploy signals and make canonical Vercel SHA the production source of truth. |

## Completed work that should not be treated as an open failure

- **Lumina $34/$37/$40 discrepancy closed:** Gear feed and Apparel/Commerce now show **$58 for all six sizes** (Store PR #13). Reopen only with new Square drift evidence.
- **Men's Gallery pass closed:** duffel placed on back-right floor, four merchandise swaps, user-selected shoe 3/4 images, and 25 per-slot visual calibrations deployed.
- **Women's/After Dark pass closed:** cropped racerback tank added to Women's Studio, four After Dark new editions and two guest tees in dedicated spatial room.
- **Cart usability closed:** 30-day browser-local bag persistence, quantity adjustment, clear bag, cross-tab sync, atomic sticker bundle safety.
- **Checkout return code closed:** opaque reference bound to Square link/order, full completed-payment check, refund/cancel fail-closed logic and most recent cart-mutation race fix deployed (Apparel #40; Commerce #8/#9).
- **No-money checkout regression passed:** After Dark hoodie $58; three Mount Sled stickers $21 after $7.50 discount; Gear legacy tee $32.99; Apparel-only bundle rejected on Gear.
- **Historical test-harness failure closed:** a checkout mock test failed from /tmp because SKU map path was relative; rerunning in production application directory /app passed all four.
- **Historical 12/13 sticker allowlist discrepancy closed:** 13/13 now aligned.
- **Observed seven-room display:** no staged broken images or horizontal overflow in the tested widths; this does not waive catalog-wide image or accessibility work.

## Sequential resolution plan and completion contracts

### Train 0 — Freeze evidence and reconcile authority
**IDs:** A05, A24, A25 and inventory of A22.
**Owner:** Nexus release engineer + compliance.
**Actions:** Pin source SHAs, container image digests, Compose overlays and mounted SKU map, Square nonsecret catalog, Gear projection, Console backups, Vercel deployment. Review the seven old PRs. Correct the living handoff and update the open issue evidence.
**Accepted only when:** a clean checkout can reproduce the running build/config with known backup and rollback; historical statuses are not falsely current.

### Train 1 — No-payment commerce certification
**IDs:** A01, A04, A11, A12, A19, A20.
**Owner:** Commerce/payment + fulfillment operator.
**Actions:** Generate full sellable variant report; test standard item, size/color combinations, sticker 1/3/5, mixed carts, backend profit floor, Gear isolation, invalid IDs, refunds, cancellations, Square/Printful outage, webhook replay, order/fulfillment idempotency. Add checkout intent retention and trace logs.
**Accepted only when:** exact price and provider identity, privacy, no duplicate jobs, and recovery proof all pass without money transferred.
**Separate approval needed:** a low-value, actual paid test with webhook and Printful acceptance/rejection plus deliberate refund/shipping handling. No paid test is authorized by this document.

### Train 2 — Catalog Console parity and production control
**IDs:** A02, A03, A06, A07, A14.
**Owner:** Catalog Console + identity/SSO engineer.
**Actions:** Port live image-pull workflow, preserve canonical identities/ETag/distribution, persistent state volumes, backup/restore, authenticated founder/admin tests and production rollback. Compare full UI, not just health endpoint.
**Accepted only when:** canonical 114/114 and host parity suite green, staging image/SSO and routing tests green, pinned release promoted and Console #21 closed with evidence.

### Train 3 — Governed merchandise catalog and distribution
**IDs:** A03, A06–A14.
**Owner:** Merchandising/catalog + fulfillment/margin.
**Actions:** Reconcile 141 Square items, 115 shared feed records, six Apparel-only editions and 14 unclassified records; resolve 41 gate findings, missing images and full visible variant identity. Publish only approved items in small batches by destination and room. Move adhoc frontend additions into versioned distribution.
**Accepted only when:** canonical Square prices, Printful mapping/ship cost, images, checkout draft and publication manifest match for all buyable items; close Apparel #30.

### Train 4 — Customer benefits behind independent gates
**IDs:** A15–A18 and later A26.
**Owner:** AeroCore identity, Commerce and QA.
**Actions:** Saved customer-state DB and two-identity HTTP canary, signed My Orders queries with seeded verified payment data, CSRF/session and cross-user denial. Gradually enable Saved → My Orders → Fit/Benefits; preserve anonymous shopping.
**Accepted only when:** no cross-identity disclosure, restore/revoke/browser pass, no guest checkout regression.

### Train 5 — Experience and commercial expansion
**IDs:** A21–A24, A27, A28.
**Owner:** Design/frontend + growth.
**Actions:** Rebase accessibility fixes; CI tests and performance budgets; clean up older PRs and Pages/Vercel signals; evaluate BOGO/Black Friday from real margin, shipping and provider discount behavior.
**Accepted only when:** keyboard/mobile/reduced-motion and performance tests pass; no ungoverned commercial promotion is active.

## First actions without founder input or payment

1. Snapshot and reconcile all production source/deployment overlays; update living Apparel handoff and GitHub issue #30 with the November evidence.
2. Add existing cart/checkout tests to CI; make backend SKU map tests portable across working directories.
3. Generate the full Square→Gear/Apparel→Printful variation matrix and the 41-finding product-quality repair queue.
4. Resolve/close superseded PRs with an explicit rationale; avoid unreviewed merges.
5. Bring image-management parity to canonical Catalog Console staging and rehearse its state restore.
6. Add checkout-intent purge, privacy-safe status monitoring, and webhook duplicate/failure acceptance tests.
7. Prepare the real-payment certification checklist separately for explicit founder approval.

## Certification dashboard

| Gate | Status | Evidence required to close |
|---|---|---|
| Room presentation | Smoke passed | Deeper accessible/mobile and full asset coverage |
| Catalog authority | OPEN | Every saleable variation mapped, current price/image and publication parity |
| Catalog Console deployment | BLOCKED | Runtime/canonical image + UI parity, SSO, persisted state, restore and rollback |
| Nonpayment checkout arithmetic | Partial pass | Every visible variation, shipping zones and profit floors |
| Payment return safety | Code/mocks passed | Genuine completed Square payment readback |
| Paid-to-fulfillment | NOT VERIFIED | Signed provider webhook → reconciled order → exactly-one Printful job |
| Saved/My Orders | BLOCKED/DEFAULT-OFF | Authenticated state + two-user privacy and backup/readback |
| Release documentation / CI | OPEN | Canonical SHAs, CI gates and signed acceptance manifest |

## Explicit decisions required later

- **Founder:** whether to authorize a real purchase, the maximum charge, shipping/recipient, and refund/fulfillment treatment. Do not charge a card without that separate approval.
- **Catalog owner:** decide which of the 14 remaining Square-only items should actually be published and where.
- **Release owner:** approve Console promotion after source/UI parity and recovery evidence.
- **Account owner:** select first customer feature to enable after gated tests.
- **Growth:** approve any BOGO or 20%-off promotion only after a full shipping-funded profit model.

## Open GitHub references at audit time

- Apparel [issue #30](https://github.com/aerovista-us/aerovista_apparel/issues/30), open PRs [#5](https://github.com/aerovista-us/aerovista_apparel/pull/5), [#24](https://github.com/aerovista-us/aerovista_apparel/pull/24), [#25](https://github.com/aerovista-us/aerovista_apparel/pull/25), [#26](https://github.com/aerovista-us/aerovista_apparel/pull/26).
- Catalog Console [issue #21](https://github.com/aerovista-us/aerovista-catalog-console/issues/21).
- Commerce open draft [PR #3](https://github.com/aerovista-us/aerovista-commerce-api/pull/3); deployed [#8](https://github.com/aerovista-us/aerovista-commerce-api/pull/8), [#9](https://github.com/aerovista-us/aerovista-commerce-api/pull/9).
- Store open drafts [#3](https://github.com/aerovista-us/store/pull/3), [#12](https://github.com/aerovista-us/store/pull/12); price correction [#13](https://github.com/aerovista-us/store/pull/13).

## Audit boundaries

This combined review checked the user thread's releases, source, relevant handoff/docs, open PRs/issues, direct Square reconciliation captured November 12, NXCore runtime and read-only live browser smoke. It did not execute every historical file, all 611 variants, authenticated multiuser transactions, all delivery ZIP codes, or a paid-card/Printful order. Therefore those portions remain explicitly unverified rather than guessed passed or failed.
