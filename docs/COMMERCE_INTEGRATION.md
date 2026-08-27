# AeroVista Apparel — Commerce Integration

## Goal

The new spatial storefront is a presentation layer for the existing AeroVista commerce system. It must never invent a product identity, price, size, SKU, or Square variation.

## Catalog-first rule

The current production catalog (`square_products_latest.json`) is the merchandise source of truth, just as it is for the existing Gear storefront.

A product can enter the spatial room only by its canonical catalog ID. `src/data/fixtures.js` and `src/data/merchandising.js` contain placement/presentation data keyed by those IDs; they contain no checkout identity.

See `CATALOG_FIRST_SPATIAL_STORE.md` for the first-room assortment and identity flow.

## Current production-safe strategy

The frontend defaults to `legacy` mode because Gear's `/api/square/*` contract is the current protected production path. Commerce V1 remains an additive future cutover.

### Legacy mode

- Catalog: `square_products_latest.json`
- Readiness: `GET /api/square/bootstrap`
- Checkout: `POST /api/square/checkout`
- Bag identity: canonical `productId` + compatibility cart key + exact Square `variationId`
- Browser price is display-only; the backend remains authoritative.

### V1 mode

- Catalog: `GET /v1/storefront/aerovista-apparel/catalog`
- Quote: `POST /v1/cart/quote`
- Checkout: `POST /v1/checkout/session`
- Status: `GET /v1/checkout/{sessionId}`

Switch with `VITE_COMMERCE_MODE=v1` only after the existing production V1 release gates are approved.

## Data ownership

### Commerce catalog owns

- product identity
- visibility
- names/descriptions
- source collection/category
- Square item ID
- variants
- sizes/colors
- prices
- merchant SKUs
- Square variation IDs

### Spatial merchandising owns

- room selection
- wall/shelf/table assignment
- position
- scale
- tilt
- display short name
- restrained visual accent
- camera/navigation behavior

## Variant price behavior

The product-level price is treated as a starting/minimum price. Once a size/format is selected, the product drawer and bag display the selected variant's catalog price.

## Same-origin production routing

The intended public hostname is `apparel.aerovista.us`.

The companion infrastructure change in `aerovista-us/store` stages a Cloudflare edge so the browser can use same-origin:

- `/square_products_latest.json`
- `/api/*`
- future `/v1/*`

This avoids granting temporary Vercel preview hosts direct production API trust.

## Preview behavior

A Vercel preview may load the catalog through Gear or the public GitHub catalog fallback. Live checkout is not considered verified from the preview hostname because the current production API intentionally restricts allowed origins.

## Deployment discipline

Vercel is on the Hobby tier. Accumulate integration work off `main`, validate the complete batch, and promote only meaningful checkpoints.
