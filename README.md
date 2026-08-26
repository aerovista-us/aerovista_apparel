# AeroVista Apparel — Physical Storefront Prototype

A React/Vite prototype for an AeroVista storefront that behaves like a physical boutique instead of a conventional product grid.

## Experience

1. Land outside the AeroVista storefront.
2. Click the front door for a push-in / walk-through transition.
3. Enter a full-room boutique scene.
4. Merchandise is placed on reusable physical **fixtures** — racks, mannequin, center table, hat shelf, and objects case.
5. Click the actual product object in the room to open its product drawer.
6. Choose a size/format and add it to the prototype bag.
7. On mobile, the room remains visible and the same inventory becomes a conventional browse grid below it.

## Why the fixture system matters

The room and inventory are intentionally separate.

- `src/data/products.js` = **what the merchandise is**
- `src/data/fixtures.js` = **where it is merchandised**
- `public/products/` = real product photography
- `public/store/` = replaceable environment art

That means a real apparel image can replace a placeholder without changing the room or commerce components.

### Product example

```js
{
  id: 'shadow-bomber',
  name: 'Shadow Wear Bomber',
  type: 'bomber',
  price: 139,
  collection: 'Shadow Wear',
  image: '/products/shadow-bomber.webp',
  sizes: ['S','M','L','XL','2XL']
}
```

For the cleanest in-room result, use a **transparent PNG or WebP**, tightly cropped around the garment.

### Fixture example

```js
{
  id: 'right-wall-rack',
  type: 'wall-rack',
  position: { x: 72, y: 27, w: 25, h: 38 },
  slots: [
    { productId: 'shadow-bomber', x: 32, y: 42, scale: 1.24, tilt: 1 }
  ]
}
```

The fixture position is relative to the full room. Slot coordinates are relative to that fixture. The same product can appear in multiple fixtures without duplicating product data.

## Current reusable fixture types

- `wall-rack`
- `hero-mannequin`
- `table-stack`
- `hat-shelf`
- `accessories-case`

The **layers icon** in the desktop store header toggles the fixture map. It is a prototype merchandising aid and is off by default for customers.

## Add a real item

1. Export a transparent product image, e.g. `shadow-bomber.webp`.
2. Put it in `public/products/`.
3. Set `image: '/products/shadow-bomber.webp'` in `src/data/products.js`.
4. Add or adjust a fixture slot in `src/data/fixtures.js`.
5. Reload. The real product now appears in the physical store position and remains clickable.

## Run locally

```bash
npm install
npm run dev
```

Build:

```bash
npm run build
```

## Prototype assets

- `public/store/exterior.svg` — self-contained storefront exterior
- `public/store/interior.svg` — self-contained boutique interior
- `public/products/apex-relic.svg` — live real-art example in the modular product system

The included environment vectors keep the repository self-contained. They are prototype art and can be replaced later by photography, rendered scenes, or higher-fidelity media without rewriting inventory, fixture, bag, or product-detail behavior.
