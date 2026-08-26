# AeroVista Apparel — Commerce Integration

## Goal

Keep the spatial storefront responsible for presentation and physical placement while AeroVista Commerce remains authoritative for product identity, variants, availability, price, checkout, orders, and fulfillment.

## Current production-safe strategy

The frontend defaults to `legacy` commerce mode because Gear's existing `/api/square/*` purchase path is the protected live production path. The additive `/v1` API remains available behind a frontend mode switch for the later controlled production rollout.

### Legacy mode

- Catalog: published Gear `square_products_latest.json`
- Bootstrap: `GET /api/square/bootstrap`
- Checkout: `POST /api/square/checkout`
- Price submitted by the browser is never authoritative; checkout is resolved by Square variation identity on the backend.

### V1 mode

- Catalog: `GET /v1/storefront/aerovista-apparel/catalog`
- Quote: `POST /v1/cart/quote`
- Checkout: `POST /v1/checkout/session`
- Status: `GET /v1/checkout/{sessionId}`

Switch with `VITE_COMMERCE_MODE=v1` only after the existing production `/v1` release gates are approved.

## Spatial/commercial separation

`src/data/products.js` remains the presentation registry: local imagery, collection presentation, accents, and fallback copy.

`src/data/fixtures.js` remains the physical-space registry: which wall/shelf/table a product occupies and its visual position/scale.

`src/commerce/catalog.js` matches presentation products to the published commerce catalog and hydrates only commerce-owned fields such as price, size choices, availability, product ID, and variant identity.

`src/commerce/client.js` owns catalog loading and checkout handoff. The React scene does not know or care whether the active backend adapter is legacy or `/v1`.

## Matching safety

The catalog hydrator prefers exact IDs, explicit aliases, exact image basenames, and exact normalized product names. Fuzzy matching requires multiple meaningful shared tokens. Ambiguous matches fail closed: the product remains a visible showroom preview but cannot be added to the live checkout bag.

This prevents a visually similar item from being charged as the wrong Square variation.

## Preview-host limitation

The current production backend CORS defaults do not include `https://aerovistaapparel.vercel.app`. The Vercel preview can still exercise the spatial UI and public catalog hydration, but live legacy checkout should not be considered verified there until one of these controlled choices is made:

1. approve the Vercel preview origin in the backend allowlist for testing; or
2. test checkout on the canonical `gear.aerovista.us` origin; or
3. add an approved same-origin proxy/rewrite for the preview environment.

The preferred production end state is the spatial frontend on the canonical Gear/Apparel hostname so checkout remains same-origin.

## Deployment discipline

Vercel is on the Hobby tier. Integration work should be accumulated and reviewed off `main`. Promote one meaningful batch only after catalog binding, cart identity, checkout payloads, mobile behavior, and the visual pass are reviewed together.
