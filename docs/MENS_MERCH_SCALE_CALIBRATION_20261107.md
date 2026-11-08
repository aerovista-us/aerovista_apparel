# Men's Gallery visual sizing calibration — 2026-11-07

The Men's Main Floor is a spatial storefront: merchandise should look like real goods hanging on rails, resting on shelves, sitting on the central table, and placed on the floor. A 2000px square source image can have very different transparent margins and garment proportions from a 394x509 portrait image, even if both are placed in a 76x96 CSS button.

## Source of truth

- `src/data/fixtures.js`: per-slot `visualScale`, placement, tilt, rotation. Only scene presentation, not product dimensions or price.
- `src/main.jsx`: MerchItem forwards `--visual-scale` to CSS. Physical stage images request eager loading; product galleries remain unchanged.
- `src/mens-merch-proportions.css`: desktop-only image transforms, leaving click targets and fixture positions stable.
- `src/data/merchandising.js`: product identity and image selection. Avoid changing these values for sizing alone.

## Calibration principle

Treat products within the same physical bay as comparable objects while preserving the fact that a duffel is larger than a cap. Use visible alpha silhouettes rather than raw image pixel sizes. The 25 Main Floor pieces are calibrated independently, with explicit per-slot values. These do not automatically modify the NorthLine/Shadow/EchoVerse/Architect drop layouts or mobile card images.

At desktop width 1440px, aim for consistent apparent visual heights within tee, outerwear, and hoodie racks, consistent cap widths, consistent shoe widths, and a larger but grounded duffel. Keep natural variation between item types; equalize *perceived size*, not bounding-box equality. Maintain rail spacing and unobstructed interactive hit targets. Do not scale an entire rail to compensate for poorly cropped art.

## Verification

- Production Vite build passed. At preview desktop widths 1920, 1440, and 1024px, all 25 fixture pieces resolved to image assets, no overlapping fixture *hitboxes*, no page horizontal overflow, and zero uncaught errors. Full-load/decode screenshots inspected at 1440px.
- Mobile 390px: retains existing mobile arrangement and 42 mobile pieces, with zero overflow and uncaught JS errors.
- Shoe card selected on the calibrated stage and original product drawer still opened successfully.
- No Square, Printful, prices, variants, merch room selection, or order flow changes.

When adding future merchandise, measure the visible product crop against the peers on its fixture and supply a new `visualScale` only when needed. Avoid coupling scaling to live catalog identities.
