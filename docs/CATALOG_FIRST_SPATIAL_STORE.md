# AeroVista Spatial Store — Catalog-First Merchandise Model

## Decision

The spatial storefront does not create product identities.

A product must already exist as a visible AeroVista commerce-catalog product before it can be placed on a wall, shelf, or display surface. Spatial code controls presentation only.

## Runtime authority

The legacy production source is `square_products_latest.json`, the same catalog source used by the current Gear storefront.

The catalog owns:

- canonical product ID
- product name and description
- visibility
- category and source collection
- Square item ID
- variant size/color
- merchant SKU
- variant price
- Square variation ID

The spatial storefront owns:

- which catalog products are selected for the room
- wall / shelf / table assignment
- x/y anchor
- scale and tilt
- display short name and restrained visual accent
- authored camera/navigation behavior

It does not own price, sizes, Square IDs, SKU identity, or checkout identity.

## First-room assortment

The first flagship room is intentionally curated to 20 catalog-backed products from the current 2026-08-25 export. All 20 are marked `visible` and contain Square variation IDs.

### Apex / Shadow wall

- `aerovista-apex-vintage-tee`
- `aerovista-apex-signal-sweatshirt`
- `aerovista-apex-glitch-tee-black`
- `aerovista-shadow-pattern-hoodie`
- `aerovista-shadow-pattern-long-sleeve-tee`
- `shadow-wear-ghost-ridge`
- `aerovista-apex-pattern-bomber-jacket`

### Architect / Studio wall

- `architect-field-issue-tee-black`
- `architect-field-issue-tee-ash`
- `architect-built-different-hoodie-black`
- `drafted-a-premium-sweatshirt`
- `aerovista-core-hoodie`
- `aerovista-division-hoodie`
- `aerovista-the-blue-witness-urban-hoodie-black`

### Headwear

- `aerovista-premium-embroidered-hat-black-cap-with-signature-apex-mark`
- `aerovista-apex-camo-flexfit-hat`
- `glitch-orbit-logo-black`
- `aerovista-apex-mesh-trucker-cap`
- `docklife-drip-osprey-rope-cap`

### Objects & Editions

- `aerovista-apex-relic-playing-cards`

## Interaction identity flow

```text
square_products_latest.json
        ↓
visible catalog product
        ↓
canonical product ID placed in fixtures.js
        ↓
shopper selects exact size / format
        ↓
exact catalog variation selected
        ↓
bag stores product ID + Square variation ID
        ↓
current /api/square/checkout
        ↓
backend validates identity and authoritative price
        ↓
Square
```

## Variant-price rule

The top-level product price is only a starting/minimum display price. Once a shopper selects a variant, the drawer and bag display that variant's catalog price.

This matters because some AeroVista products have size-dependent prices.

## Fail-closed behavior

If the catalog is unavailable, merchandise is not reconstructed from stale hardcoded product records.

If a selected catalog product has no currently usable variation, it is unavailable for bag/checkout.

If a checkout line is missing its canonical product ID, cart key, or Square variation ID, checkout is blocked before the request is sent.

## Migration path

Legacy mode continues to use the current Gear commerce contract first. The frontend adapter can later switch to Commerce V1 without changing the spatial merchandising model because both paths use canonical product/variant identity.
