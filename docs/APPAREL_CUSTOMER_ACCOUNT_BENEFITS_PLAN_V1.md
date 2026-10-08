# AeroVista Apparel — Customer Account Benefits Plan v1

**Status:** Implementation plan  
**Application:** apparel.aerovista.us  
**Identity baseline:** Accepted live through Account → handoff → HttpOnly relying-app session → identity.describe() → identity.can(aerovista.member) → logout/native revoke  
**Commerce baseline:** Legacy Store/Square/webhook/fulfillment path remains production authority while Commerce v1 is normalized  
**Goal:** Make signing in materially useful to customers without creating a second identity, profile, catalog, payment, or fulfillment authority.

**Phase 0 data/API contract:** [APPAREL_CUSTOMER_ACCOUNT_DATA_CONTRACT_V1.md](APPAREL_CUSTOMER_ACCOUNT_DATA_CONTRACT_V1.md)

---

## 1. Product outcome

A signed-in shopper should immediately gain useful, persistent value that an anonymous shopper does not have.

The first customer-facing account surface is **My AeroVista Closet**, with four primary areas:

1. **Orders** — purchases, payment/fulfillment state, tracking, and order-linked support.
2. **Saved** — wishlist / saved pieces / return-later intent.
3. **Fit** — Apparel-specific sizes and fit preferences.
4. **Benefits** — active member benefits, private drops, early access, and eligible offers.

Later additions include restock alerts, owned-item history, personalized matching, private collections, member pricing or promotions, client/VIP/team-specific access, and order-linked support workflows.

Public browsing, product discovery, sizes, imagery, prices, and public checkout eligibility remain public unless a specific protected benefit requires identity.

---

## 2. Architectural rules

### Shared authority

- **Account** owns authentication and the human profile doorway.
- **Identity Gateway + governed grants** resolve canonical identity and capabilities.
- **App Adapter** is the relying-app integration seam.
- **Apparel** owns presentation, local enforcement, saved shopping preferences, fit preferences, and Closet UX.
- **Shared Store / Commerce backend** owns catalog projection, Square mapping, checkout policy, promotions, order orchestration, and the normalized Commerce v1 order ledger.
- **Square** remains authority for catalog existence, base retail price, payment, and refund.
- **Printful** remains fulfillment execution authority.

### No second identity system

Apparel must not create local passwords, a second user/profile authority, frontend role truth, independent order-payment truth, or a local SKU/Square variation authority.

Apparel-owned customer records may reference the canonical identity_id.

### Baseline access

Basic signed-in Apparel account access uses the already-governed **aerovista.member** capability.

Do not create a redundant apparel.account.access grant.

Use apparel.* capabilities only for differentiated privileges.

---

## 3. Target signed-in experience

### Header

Anonymous:

    Account

Authenticated:

    <Name> · Closet <owned count> · Saved <count> · Orders <active count>

On mobile this may collapse to the name/avatar plus a compact account drawer.

### Account hub

Recommended first-level navigation:

    My AeroVista
    ├── Orders
    ├── Closet
    ├── Saved
    ├── Fit
    └── Benefits

The hub should feel like part of the spatial store, not like a generic SaaS dashboard.

### First-login state

A new member with no orders or saved items should see useful onboarding rather than an empty administrative screen:

- Save pieces you like.
- Add your usual fit.
- Your orders and tracking will appear here.
- Member drops and benefits appear here when available.

---

## 4. Data ownership model

### Apparel-owned customer data

Recommended application-specific records:

    apparel_saved_items
    apparel_fit_preferences
    apparel_restock_subscriptions
    apparel_customer_preferences

All records reference canonical identity_id.

### Commerce-owned customer data

Commerce v1 owns normalized order linkage:

    av_order_id
    av_identity_id
    square_order_id
    square_payment_id
    items
    variation_ids
    amounts
    payment_status
    fulfillment_status
    tracking
    timestamps

Apparel reads a customer-safe projection. It does not mutate payment truth.

### Account/Profile-owned data

Global/shared profile data remains with Account/Profile, including name, avatar, canonical email, and approved shared contact/profile fields.

Apparel should link users back to Account for global profile edits rather than cloning those fields into Apparel.

---

## 5. Phase 0 — Contract reconciliation and foundation

### Goal

Bring source-of-truth documentation and runtime assumptions into agreement before adding customer features.

### Work

- Update APPAREL_INTEGRATION_CONTRACT_V1.md sections 3 and 19 to reflect the Identity acceptance that is now live.
- Preserve aerovista.member as the baseline authenticated capability.
- Define the customer-safe Apparel account payload contract.
- Define whether each customer-benefit API belongs in shared Commerce v1 or behind the Apparel auth/BFF boundary.
- Define canonical identity_id propagation into Commerce v1 checkout/order correlation.
- Add feature flags for each new benefit so partial rollout can fail closed.

### Acceptance

- Contract, handoff, source, and deployed runtime describe the same Identity behavior.
- No new user/profile authority exists.
- No feature infers identity from email alone.

---

## 6. Phase 1 — My Orders

### Why first

Orders are the clearest immediate reason to sign in and align directly with the Commerce v1 normalization work already needed.

### Backend

Add a customer-safe Commerce v1 order projection:

    GET /v1/account/orders
    GET /v1/account/orders/:avOrderId

The server derives identity from the trusted relying-app session. The browser does not send an arbitrary identityId.

Recommended response fields:

    av_order_id
    created_at
    items[]
    subtotal
    discount
    shipping
    tax
    total
    currency
    payment_status
    fulfillment_status
    tracking[]
    customer_safe_status_message

Do not expose provider secrets, raw webhook payloads, internal reconciliation notes, or unrelated customer identity data.

### Checkout linkage

Signed-in flow:

    Apparel session
       ↓
    canonical identityId
       ↓
    Commerce checkout context
       ↓
    Square checkout/session
       ↓
    verified Square webhook
       ↓
    normalized order with av_identity_id

Anonymous checkout must continue to work.

Do not auto-claim historical orders solely by matching email.

### UI

Build Orders inside My AeroVista:

- active orders first;
- recent completed orders;
- item thumbnails;
- payment state;
- fulfillment state;
- tracking;
- Get help with this order.

### Acceptance

- authenticated user sees only their orders;
- anonymous request is denied;
- another identity cannot enumerate or request another order by ID;
- Square redirect alone never creates Paid state;
- webhook/reconciliation remains payment truth;
- fulfillment status comes from accepted commerce/fulfillment state.

---

## 7. Phase 2 — Saved Pieces / My Closet

### Goal

Give customers a reason to return before and after purchase.

### Data model

Recommended Apparel-owned table:

    apparel_saved_items
    - id
    - identity_id
    - product_id
    - variation_id nullable
    - created_at
    - updated_at
    UNIQUE(identity_id, product_id, variation_id)

Product and variation IDs must reference accepted shared catalog identity. Do not store a second authoritative product name or price.

### API

    GET    /api/account/saved
    POST   /api/account/saved
    DELETE /api/account/saved/:savedId

Mutation requirements:

- trusted relying-app session;
- CSRF;
- exact Apparel origin;
- catalog identity validation.

### Closet model

Separate:

- **Saved** = customer intent/wishlist.
- **Owned** = derived from verified paid-order history.

Never mark an item Owned because the browser reached a Square return URL.

### UI

Product drawer:

    ♡ Save
    ✓ Saved

My AeroVista:

    Closet
      Owned
      Saved

### Acceptance

- saved state survives logout/login;
- one user cannot see another user's saved items;
- deleted/hidden catalog products remain historically safe but cannot become buyable through Saved;
- owned state derives only from verified commerce history.

---

## 8. Phase 3 — My Fit

### Goal

Reduce repeat-purchase friction and make Apparel feel personalized.

### Ownership

Fit preferences are Apparel-specific application data, not global Account role/profile truth.

Recommended model:

    apparel_fit_preferences
    - identity_id
    - garment_type
    - preferred_size
    - fit_preference
    - optional_notes
    - updated_at
    UNIQUE(identity_id, garment_type)

Initial garment types:

    tee
    hoodie
    jogger
    pants
    dress
    outerwear
    headwear
    footwear

Initial fit preferences:

    fitted
    standard
    relaxed
    oversized

Do not initially store detailed body measurements unless a real customer need justifies the additional privacy burden.

### API

    GET /api/account/fit
    PUT /api/account/fit/:garmentType

### UX

Example product hint:

    Your usual hoodie size: M

This is guidance, not a guarantee. Product-specific sizing remains catalog/product content.

### Acceptance

- fit preference never changes authorization;
- fit data is not copied into global role/profile fields;
- unsupported catalog sizes do not become selectable just because they are a saved preference;
- user can clear preferences.

---

## 9. Phase 4 — Member Benefits

### Goal

Turn membership into visible value while keeping benefit decisions server-authoritative.

### Benefits API

    GET /api/account/benefits

Return customer-safe evaluated benefits such as early access, private-drop eligibility, or approved member privileges.

The browser displays the result; it does not decide eligibility.

### Capability strategy

Use aerovista.member for ordinary member-level experience.

Only register new capabilities when they represent a real differentiated privilege, for example:

    apparel.member.pricing
    apparel.private_drop.access
    apparel.order.history.read
    apparel.support.manage
    apparel.catalog.manage
    apparel.order.manage
    apparel.admin

Do not create capabilities for ordinary UI state such as saving a wishlist item unless governance actually requires it.

### Promotions

Member pricing and account-linked promotion must be enforced by shared Commerce, not Apparel JavaScript.

Required flow:

    identity
      ↓
    benefit eligibility
      ↓
    server quote
      ↓
    approved promotion
      ↓
    Square checkout
      ↓
    verified payment
      ↓
    redemption finalized

### Acceptance

- editing browser payload cannot grant a benefit;
- capability/entitlement removal takes effect on the next server decision;
- no promotion is consumed merely by opening checkout;
- no stacked discount unless explicitly permitted.

---

## 10. Phase 5 — Restock alerts

### Goal

Convert saved intent into useful return engagement.

### Data model

    apparel_restock_subscriptions
    - id
    - identity_id
    - product_id
    - variation_id
    - status
    - created_at
    - notified_at nullable

### UX

When a selected variation is unavailable:

    Notify me when M is back

Authenticated users get one-click subscription.

Anonymous users may be prompted to sign in/create an Account rather than creating a second email-only identity path.

### Delivery

Notification transport should use an approved shared notification/email service rather than Apparel sending mail directly from browser code.

### Acceptance

- alert tied to canonical identity;
- no duplicate active subscription;
- hidden/discontinued product suppresses alert;
- customer can unsubscribe;
- no notification claims stock unless the accepted commerce/catalog projection says the variant is available.

---

## 11. Phase 6 — Order-linked support

### Goal

Make customer service materially easier.

Order detail action:

    Get help with this order

Support request automatically binds:

- canonical identity;
- av_order_id;
- safe item/order summary;
- issue category;
- customer message.

Do not require the customer to paste Square IDs or tracking IDs.

Reserve apparel.support.manage for staff-side access if that capability is later registered.

---

## 12. Phase 7 — Private collections and early drops

### Goal

Use Identity for experiences anonymous storefronts cannot provide.

Examples:

- 24-hour member preview;
- invitation-only collection;
- client/team collection;
- event-specific merchandise;
- creator/VIP release;
- purchase-history-based access where explicitly designed.

Public product discovery and protected collection access are separate concepts.

A private collection must be denied server-side when capability/entitlement is absent. Hiding a route or button is not security.

---

## 13. Phase 8 — Personalized recommendations

Do this after Orders + Saved + Fit produce real signals.

Start simple:

    owned item
    + saved categories
    + preferred fit
    + current catalog availability
    = deterministic recommendation candidates

Do not begin with opaque behavioral tracking.

Useful first examples:

- Works with pieces you own.
- Available in your usual size.
- You saved two pieces from this collection.
- New item in a collection you bought from.

Recommendation data must never override current catalog availability or price.

---

## 14. API boundary proposal

### Public

    GET catalog
    GET product
    GET public collections
    POST checkout (anonymous allowed)

### Authenticated Apparel-owned

    GET    /api/account/summary
    GET    /api/account/saved
    POST   /api/account/saved
    DELETE /api/account/saved/:id
    GET    /api/account/fit
    PUT    /api/account/fit/:garmentType
    GET    /api/account/benefits
    POST   /api/account/restock
    DELETE /api/account/restock/:id

### Authenticated Commerce-owned

    GET /v1/account/orders
    GET /v1/account/orders/:avOrderId

### Suggested account summary

Return a deliberately small projection for header/hub rendering:

- authenticated;
- customer-safe display name;
- owned count;
- saved count;
- active order count;
- small fit summary;
- benefit count.

The header should not need to call several services independently.

---

## 15. UI delivery order

### Release A — Account shell

- Account control on all rooms;
- My AeroVista drawer/page;
- authenticated name;
- correct sign-in/sign-out;
- empty states for Orders / Saved / Fit / Benefits.

### Release B — Orders

- order list;
- order detail;
- tracking;
- support entry.

### Release C — Saved + Closet

- Save control on product detail;
- Saved grid;
- Owned grid from verified order history;
- account header counts.

### Release D — Fit

- fit editor;
- usual-size hint;
- product compatibility handling.

### Release E — Benefits

- evaluated benefits;
- early/private drops;
- member pricing/promotion only after Commerce enforcement exists.

### Release F — Alerts

- restock subscriptions;
- approved notification delivery.

---

## 16. Security acceptance matrix

Every authenticated feature must prove:

| Gate | Required result |
| --- | --- |
| Anonymous request | denied for customer-private data |
| Valid session | resolves canonical identity |
| Capability where required | live server decision |
| Cross-account object ID | denied |
| Foreign Origin mutation | denied |
| Missing/invalid CSRF | denied |
| Revoked session | denied |
| Logout | local session cleared + native revoke |
| Identity service outage | protected action fails closed |
| Catalog drift | commercial action fails closed |
| Browser payload tampering | cannot change price, benefit, or payment state |

The accepted Identity/App Adapter regression suite remains a release gate.

---

## 17. Privacy and retention

Initial privacy posture:

- no body measurements in v1;
- no hidden behavioral profile;
- no local password database;
- no duplicate global profile;
- saved items and fit preferences deletable by customer;
- restock subscriptions revocable;
- order/payment history retention follows Commerce/provider/legal requirements;
- customer-safe APIs expose only necessary fields.

---

## 18. Observability

Add structured product events without recording secrets:

    apparel.account.open
    apparel.saved.add
    apparel.saved.remove
    apparel.fit.update
    apparel.order.view
    apparel.benefit.view
    apparel.restock.subscribe
    apparel.restock.unsubscribe

Separate analytics events from authorization/audit events.

Sensitive administrative mutations continue to use the governed audit ledger.

---

## 19. Rollout controls

Use independent feature flags:

    APPAREL_ACCOUNT_HUB
    APPAREL_ACCOUNT_ORDERS
    APPAREL_ACCOUNT_SAVED
    APPAREL_ACCOUNT_FIT
    APPAREL_ACCOUNT_BENEFITS
    APPAREL_RESTOCK_ALERTS

Recommended rollout:

    internal QA
    → founder/test identity
    → small production canary
    → all authenticated members

Public browsing must remain usable if an optional account-benefit service is unavailable.

---

## 20. Delivery milestones

### Milestone 1 — Customer account foundation

Complete when:

- contract reconciled;
- PR #5 Account controls promoted;
- My AeroVista shell available;
- header summary endpoint defined;
- no second identity/profile authority introduced.

### Milestone 2 — Orders

Complete when:

- authenticated checkout correlates identityId;
- normalized Commerce order projection exists;
- order list/detail are customer-safe;
- authorization isolation is proven;
- tracking/support entry works.

### Milestone 3 — Closet

Complete when:

- Saved persists by canonical identity;
- Owned derives from verified paid orders;
- header counts work;
- hidden/stale catalog objects cannot be repurchased incorrectly.

### Milestone 4 — Fit

Complete when:

- fit preferences persist;
- customer can edit/clear;
- product UI gives safe fit hints;
- no effect on authorization or catalog truth.

### Milestone 5 — Benefits

Complete when:

- benefit evaluation is server-authoritative;
- at least one real customer benefit is visible;
- monetary benefit is enforced by Commerce/Square;
- capability/entitlement revocation takes effect live.

### Milestone 6 — Engagement

Complete when:

- restock alerts work;
- support is order-linked;
- early/private collection access can be governed;
- recommendation layer uses only accepted customer/catalog signals.

---

## 21. Recommended first implementation slice

Build these together as the first shippable customer-value release:

    My AeroVista shell
    + account summary
    + My Orders read-only
    + Save / Saved Pieces

Why:

- immediately explains why login exists;
- uses the Identity work already accepted;
- advances necessary Commerce v1 order normalization;
- Saved Pieces is low-risk and independent of payment mutation;
- establishes UI/data patterns Fit, Benefits, and Alerts will reuse.

Do not make member pricing the first benefit. It couples Identity, promotion policy, checkout, Square, and redemption before the account experience itself has proved useful.

---

## 22. Execution order from current state

1. Reconcile the Integration Contract to the accepted Identity runtime.
2. Release Account UI PR #5 when Vercel accepts production deployment again.
3. Build My AeroVista shell + compact account summary.
4. Normalize authenticated order linkage in Commerce v1.
5. Ship read-only My Orders.
6. Ship Saved Pieces + Closet/Owned derivation.
7. Ship Fit preferences.
8. Ship Benefits evaluation with one non-monetary benefit first, preferably early access/private drop.
9. Add Commerce-enforced member promotion/pricing only after promotion redemption is production-proven.
10. Add restock alerts and order-linked support.
11. Add deterministic personalized recommendations after real customer signals exist.

---

## 23. Definition of success

Logging in should answer the customer question:

> What do I get for having an AeroVista account?

The visible answer should become:

    My orders.
    My saved pieces.
    My closet.
    My fit.
    My member access.
    My alerts.
    Better support.
    Less friction next time.

Identity remains infrastructure. **The customer benefit is continuity.**
