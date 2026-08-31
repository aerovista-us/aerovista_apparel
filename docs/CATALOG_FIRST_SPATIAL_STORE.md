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

The flagship room currently presents 25 canonical products: eight tees/outerwear pieces, seven hoodies, five hats and five Objects & Editions pieces. `src/data/merchandising.js` is the authoritative room list; `src/data/fixtures.js` assigns each selected ID to a physical location.

The Objects & Editions table contains the Apex Relic deck, Pattern can cooler, Apex Draft sticker, BillyGoat sticker and Holographic Goat sticker. Its sticker positions can be shuffled without moving their underlying product identity.

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

If a room product is temporarily absent from the deployed legacy export but its canonical gallery is already committed, the room may show an explicitly presentation-only fallback. That fallback contains no Square item, variation, price or checkout identity and therefore remains unavailable until the live catalog reconnects it.

If a checkout line is missing its canonical product ID, cart key, or Square variation ID, checkout is blocked before the request is sent.

## Migration path

Legacy mode continues to use the current Gear commerce contract first. The frontend adapter can later switch to Commerce V1 without changing the spatial merchandising model because both paths use canonical product/variant identity.
