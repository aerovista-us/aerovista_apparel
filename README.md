# AeroVista Apparel — Guided Spatial Storefront

A React/Vite storefront prototype that treats ecommerce as a **place to enter and explore**, not a product grid wearing a 3D skin.

The current build uses a lightweight 2.5D spatial illusion: authored exterior/interior environments, real product photography, physical retail placement, perspective, focus shifts, gallery lighting and responsive mobile store zones. The commerce interface remains normal React/HTML so product details, sizes, bag behavior and future checkout stay fast and accessible.

## Experience

1. Arrive outside the AeroVista storefront.
2. Click the front door and cross the threshold through a push-in transition.
3. Enter a dark premium boutique with a visible central aisle, wall bays, deeper rooms and object displays.
4. Approach merchandise directly in the room. Focus shifts bring the selected area forward and quiet the surrounding space.
5. Select a piece to open product details, sizes and bag controls.
6. On mobile, move vertically through the same flagship as a guided walk: apparel walls, headwear and objects remain distinct physical areas rather than collapsing into a generic grid.

## Retail rules

The store follows physical merchandising logic:

- tees, hoodies, sweatshirts, long sleeves and jackets hang on wall rails
- hats live on dedicated shelves
- cards, prints, accessories and collectibles belong on display surfaces or in cases
- hero pieces may receive an isolated display treatment
- inventory is curated into the room rather than forcing every SKU onto one screen

## System boundaries

The implementation keeps three concerns separate:

- `src/data/products.js` — product identity and commerce data
- `src/data/fixtures.js` — physical placement in the desktop room
- `public/products/` — real product photography / artwork
- `public/store/` — replaceable environment art

The environment can become more sophisticated without forcing product data or checkout behavior to be rewritten.

## Product imagery

For the cleanest in-room result, use transparent PNG or WebP assets that are tightly cropped around the item. Product assets should use consistent lowercase kebab-case filenames under `public/products/`.

Example:

```js
{
  id: 'apex-pattern-hoodie',
  name: 'AeroVista Apex Pattern Hoodie',
  type: 'hoodie',
  collection: 'Apex',
  image: asset('products/apex-pattern-hoodie.png'),
  sizes: ['S','M','L','XL','2XL']
}
```

## Desktop placement

`src/data/fixtures.js` defines where products are physically merchandised. Apparel remains on wall systems; headwear and objects use their own display types.

The same product can appear in multiple areas without duplicating its product record.

## Mobile

Mobile is treated as **another camera into the same store**, not a fallback catalog.

- vertical scrolling moves deeper through the flagship
- horizontal swiping moves along a wall or shelf
- apparel stays hung and full-length
- headwear keeps its shelf treatment
- collectible objects retain their own display area
- collection controls act as wayfinding

## Spatial direction

The long-term design philosophy is documented in:

[`docs/SPATIAL_COMMERCE_PHILOSOPHY.md`](docs/SPATIAL_COMMERCE_PHILOSOPHY.md)

The working concept is **Guided Spatial Commerce**: spatial discovery plus conventional commerce clarity.

The roadmap intentionally escalates immersion in stages:

1. illusion-first 2.5D — current
2. authored camera zones / navigable store areas
3. selective React Three Fiber for room shell, lighting or hero objects
4. optional full spatial mode only after performance and mobile testing

The default experience should never require game controls to shop.

## Run locally

```bash
npm install
npm run dev
```

Build:

```bash
npm run build
```

## Primary assets

- `public/store/exterior.svg` — cinematic storefront threshold
- `public/store/interior.svg` — boutique architecture and depth shell
- `public/asset-overrides.css` — spatial illusion / focus layer
- `public/products/` — production merchandise imagery

The environment remains intentionally replaceable. We can move from authored vectors to high-fidelity renders or selective WebGL without giving up the modular product system.
