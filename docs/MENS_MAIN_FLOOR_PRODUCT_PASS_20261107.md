# Men's Main Floor — curated product pass (2026-11-07)

User-approved direction from annotated screenshot: retain existing boutique architecture and racks, add only one floor product in the back-right aisle, and make four one-for-one display replacements.

## Main Floor adjustments

| Placement | Out | In |
|---|---|---|
| Left upper rail, third tee | Architect Field Issue Tee (Black) | AV-07 Grid Pocket Tee (Slate Gray) |
| Left lower rail, last slot | Men's Ghost Shorts | Glyph Field Long Sleeve (Archive Grid) |
| Right upper hoodie rail, second | Architect Built Different Hoodie (Black) | Founders Mark Full-Zip Hoodie |
| Left hat shelf, second | Apex Camo Flexfit Hat | Retro Orbit A Trucker Hat (Gray) |
| Back-right floor pocket | Empty floor space | Shadow Camo Duffle Bag |

Other racks, center table, central hero wall, shoes, and fixtures are unchanged. Displaced items remain in canonical Square catalog and their corresponding Drops / other edits.

## Duffle image and commerce

- Canonical Square product: `shadow-camo-duffle-bag`, variant `Z36AYQUQWKMUPEJJQH7UQIOU` ($120.00).
- Printful sync product: `477915935`, Printful variant `12021`. Sync external ID matches the Square variation.
- Image archive: `public/products/duffle-bag/` (17 supplied 2000px PNGs).
- Floor-stage hero: `public/products/duffle-bag/01-stage.webp`, derived losslessly in identity (visual asset converted and cropped, not redrawn) from `duffle-bag-left-front-6aeff31c50d98.png`, 1200 x 943.
- Primary stage shot and selected alternate angles available in the normalized product gallery.
- No Square price edits or Printful writes. Checkout remains backend-controlled and existing Square variation IDs are used directly.

## Layout

- `src/data/fixtures.js`: `back-right-floor-duffel` `floor-display` fixture. Position 58.9%, 57.8%, 12.8% width, 18.2% height, relative to the 1672×941 room stage; appears to the right of the central table and behind front footwear. Views: main floor only.
- `src/duffel-floor.css`: floor contact shadow, no hanging rail, slight tilt, product tooltip on hover/focus.
- `src/data/merchandising.js`: canonical gallery metadata and consistent mobile merchandise edit.
- Glyph Field scene selects `10-front-03.webp` hanger view to avoid tiny lifestyle model; detail drawer still retains the model images.

## Release gates

- Production build `npm run build` passes.
- Desktop: verify four swaps, floor-image loaded, product details/variant checkout readiness, no overlap with central table or front shoe display at 1440×900.
- Mobile: retain responsive product lists, add duffel to Objects & Editions mobile zone, avoid overflow.
- Verify Vercel deployment SHA and live host via automated browser, without submitting a paid transaction.
