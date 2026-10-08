# AeroVista Apparel — Customer Account Data Contract v1

**Status:** Phase 0 foundation contract
**Application:** `apparel.aerovista.us`
**Purpose:** Define customer-safe account data, API ownership, canonical identity propagation, and rollout controls for My AeroVista features.

## 1. Core rule

The browser never supplies identity authority.

Every authenticated customer request resolves the canonical AeroVista identity from the trusted Apparel relying-app session:

```text
Browser
  ↓
Apparel HttpOnly relying-app session
  ↓
App Adapter
  ↓
identity.describe()
  ↓
canonical identity_id
```

Any browser-supplied `identityId`, email, role, or account label is non-authoritative and must not be used to select protected customer data.

## 2. Account summary contract

The My AeroVista header/hub may consume one compact customer-safe summary endpoint:

```http
GET /api/account/summary
```

Suggested response shape:

```json
{
  "authenticated": true,
  "identity": {
    "displayName": "Customer-safe display name",
    "avatarUrl": null
  },
  "counts": {
    "owned": 0,
    "saved": 0,
    "activeOrders": 0
  },
  "fit": {
    "hoodie": "M"
  },
  "benefitCount": 0
}
```

Rules:

- `displayName` and avatar are projections from the approved shared profile contract.
- Counts are derived from their owning systems; the summary endpoint does not become a second data authority.
- Omit fields that are unavailable rather than inventing defaults that imply false state.
- Do not expose email unless a specific UI need requires it.
- Do not expose global role, internal service role, raw grant rows, provider identifiers, session tokens, Square IDs, raw webhook data, or internal audit metadata.

## 3. API ownership

### Apparel auth/BFF owns application-specific customer state

These endpoints belong behind the Apparel authenticated boundary because Apparel owns the underlying preference state:

```http
GET    /api/account/summary
GET    /api/account/saved
POST   /api/account/saved
DELETE /api/account/saved/:id
GET    /api/account/fit
PUT    /api/account/fit/:garmentType
GET    /api/account/benefits
POST   /api/account/restock
DELETE /api/account/restock/:id
```

The Apparel BFF may aggregate customer-safe projections from Commerce/Profile but does not become their source of truth.

### Commerce v1 owns order projections and commercial benefit enforcement

These belong in shared Commerce because the underlying truth is commerce-owned:

```http
GET /v1/account/orders
GET /v1/account/orders/:avOrderId
```

Future monetary member benefits, quotes, promotion redemption, and order/payment state also remain Commerce-owned.

### Account/Profile owns global profile mutation

Global name/avatar/contact/profile edits continue through approved Account/Profile interfaces. Apparel may link there; it must not create a duplicate profile editor with independent persistence.

## 4. Canonical identity propagation into checkout

### Anonymous checkout

Anonymous checkout remains supported.

```text
browser cart
  ↓
shared Commerce checkout
  ↓
Square
```

No identity is invented.

### Authenticated checkout

For a signed-in user:

```text
Apparel relying-app session
  ↓
server resolves canonical identity_id
  ↓
checkout request to Commerce carries trusted identity context
  ↓
Commerce creates checkout correlation
  ↓
verified Square webhook/payment event
  ↓
normalized order stores av_identity_id
```

The browser must not be able to substitute `av_identity_id`.

## 5. Order correlation rules

Commerce v1 should normalize at least:

```text
av_order_id
av_identity_id nullable
square_order_id
square_payment_id nullable until verified
checkout/session correlation id
items
variation_ids
amounts
payment_status
fulfillment_status
tracking
timestamps
```

Rules:

- An authenticated checkout may attach the canonical `av_identity_id`.
- An anonymous checkout keeps `av_identity_id = null` unless a separately governed claim flow is later designed.
- Do not claim anonymous historical orders solely by matching email.
- Browser return URLs never set payment state.
- Verified provider events and reconciliation remain payment truth.
- Ownership for My Orders is checked by `av_identity_id`, not email.

## 6. Baseline authorization

Basic My AeroVista account access uses:

```text
aerovista.member
```

This covers ordinary signed-in member account access.

New `apparel.*` capabilities are introduced only when a real differentiated privilege exists.

Examples that may later become canonical:

```text
apparel.member.pricing
apparel.private_drop.access
apparel.order.history.read
apparel.support.manage
apparel.catalog.manage
apparel.order.manage
apparel.admin
```

Until registered, proposed names are documentation only and must not be treated as authoritative grants.

## 7. Mutation protection

All Apparel-owned customer mutations require:

- valid relying-app session;
- canonical identity resolved server-side;
- exact allowed storefront origin;
- CSRF;
- object ownership validation;
- catalog identity validation where product/variation references are involved.

Foreign-origin, missing-CSRF, revoked-session, or identity-resolution failures deny the mutation.

## 8. Failure behavior

Public shopping remains available if optional account-benefit services are unavailable.

Protected account features fail closed.

Examples:

- Account summary unavailable → show a restrained signed-in fallback, not fabricated counts.
- Saved service unavailable → disable Save mutation and preserve public product browsing.
- Commerce order service unavailable → show Orders unavailable, never an empty list that implies no orders.
- Identity failure → do not expose customer-private data.
- Catalog mismatch → saved historical entry may remain visible, but commercial action revalidates against current catalog.

## 9. Feature flags

Initial flags:

```text
APPAREL_ACCOUNT_HUB
APPAREL_ACCOUNT_ORDERS
APPAREL_ACCOUNT_SAVED
APPAREL_ACCOUNT_FIT
APPAREL_ACCOUNT_BENEFITS
APPAREL_RESTOCK_ALERTS
```

Rules:

- flags control release exposure, not authorization;
- disabling a feature must not delete customer data;
- server endpoints still enforce identity/ownership even when the UI flag is off;
- rollout may progress internal QA → controlled production identity → small canary → all members.

## 10. Privacy

Phase 0 defaults:

- no detailed body measurements;
- no duplicate password/user store;
- no hidden behavioral profile;
- no email-only shadow identity for restock alerts;
- saved items, fit preferences, and alerts are user-deletable/revocable;
- account summary exposes minimum necessary data.

## 11. First implementation target

Phase 1 should implement:

```text
GET /api/account/summary
My AeroVista shell
read-only My Orders contract
Saved Pieces persistence
```

My Orders may initially return an explicit unavailable/not-integrated state until Commerce v1 order correlation is accepted; it must not fabricate order history from browser-local state.

## 12. Acceptance

Phase 0 is complete when:

- Integration Contract matches the accepted live Identity runtime.
- `aerovista.member` is documented as baseline account access.
- account summary payload is defined.
- API ownership is defined.
- canonical `identity_id` checkout/order propagation is defined.
- feature flags are defined.
- no duplicate identity/profile/order/payment authority is introduced.
