# Session Notes — 2026-08-30

These notes preserve the implementation details and decisions that are most likely to matter in future AeroVista Apparel work.

## Repository and deployment

- This repository is the prototype and intended future replacement for `gear.aerovista.us`.
- Canonical repository: `https://github.com/aerovista-us/aerovista_apparel`.
- Local checkout: `F:\aerovista_apparel`.
- Production branch: `main`.
- The `feature/canonical-product-galleries` branch was fast-forwarded to the same revision as `main` at the end of this work.
- Public production storefront: `https://apparel.aerovista.us`.
- Vercel deploys automatically from GitHub. Preview deployments may be protected by Vercel authentication; the custom production domain is public.

## Product and image authority

- Product commerce identity remains catalog-first. Canonical IDs, variation IDs, prices and availability come from the Gear catalog; spatial files only decide presentation and placement.
- Canonical product galleries live under `public/products/<canonical-product-id>/` in this repository.
- Catalog image paths beginning with `/store/products/` are rebased to the local `public/products/` galleries by `src/commerce/catalog.js`.
- `src/data/merchandising.js` selects the showroom assortment and contains presentation-only overrides.
- `src/data/fixtures.js` is the desktop spatial placement plan.
- The latest store export used during this work was `F:\aerovista-store\store\square_products_latest.json`.
- The deployed Gear catalog did not yet contain three sticker products that were present in the latest local store export. Explicit presentation-only fallbacks were added for those products so their committed galleries can appear in the showroom. These fallbacks deliberately contain no Square identity, variation or checkout capability and remain unavailable until the live catalog reconnects them.
- Manually approved editorial photographs that are not yet in the Gear export are registered in `productGalleryAdditions` within `src/data/merchandising.js`. This keeps gallery additions separate from the current-room assortment.
- When duplicate image files are deleted, remove their entries from the corresponding `manifest.json`; otherwise the manifest will advertise broken gallery assets. The deployment audit checks that every manifest entry resolves to a file.

## Current showroom

- The flagship currently displays 25 pieces:
  - eight tees, outerwear and bottoms
  - seven hoodies
  - five hats
  - five Objects & Editions products
- Wall apparel and hats now use normalized fixture scales to avoid unintended size gradients across a row.
- The center table contains:
  - Apex Relic playing cards
  - Pattern can cooler
  - Apex Draft sticker
  - BillyGoat sticker
  - Holographic Goat sticker
- The table includes a shuffle control that cycles through authored sticker arrangements. A future iteration can add direct drag/sort behavior once pointer, touch and keyboard interaction are designed together.

## Spatial calibration

- Exterior and interior environment art use a registered `1672 × 941` design plane.
- The exterior logo is a child of `.exterior-image`, not a viewport overlay. This keeps it attached to the upper wall through responsive crops and the entrance transition.
- The upper sign occupies the wall band at approximately `left: 14.23%`, `top: 17.11%`, `width: 71.53%`, `height: 12.97%`.
- Merchandise, architecture and camera transforms must continue to share the same scene plane. Viewport-fixed product placement breaks the physical-location illusion during resizing and camera moves.
- Dark product photography benefits from restrained brightness/contact-shadow adjustments, but items should retain believable differences in physical size.
- Equal fixture dimensions do not guarantee equal visible garment size: square exports with internal padding render much smaller than tightly cropped portrait exports. Desktop wall products use a presentation-only `stageScale` to normalize the optical garment bounds while leaving product-detail images untouched.

## Commerce host routing

- `gear.aerovista.us` hosts the legacy catalog and commerce API.
- `apparel.aerovista.us` hosts the prototype room and should not probe same-origin Gear API paths.
- `src/commerce/client.js` therefore uses first-party catalog/bootstrap paths only on the Gear hostname. The prototype reads the public Gear catalog and skips protected bootstrap requests unless an explicit commerce API base is configured.
- Checkout remains fail-closed: a product without a verified live variation cannot be placed in the bag for checkout.

## Verification completed

- Production Vite build passes.
- Desktop verification found one mounted exterior logo, 25 room products and five products on the center table.
- The sticker shuffle changes the authored table positions.
- Product detail galleries open for presentation-only sticker items and correctly show them as unavailable.
- Final production verification at `https://apparel.aerovista.us` returned HTTP 200 with no failed network requests, console errors or page errors.
- Existing Vite build warnings concern legacy non-module/layered CSS loading and unresolved public asset URLs at build time; the assets are intentionally resolved from `public/` at runtime.

## Design backlog

1. Add a dedicated Women's room after the catalog has enough products to make it feel intentionally merchandised.
2. Prefer one wall per major line before creating a separate room for every line.
3. Consider a third, higher headwear row only after its room perspective and mobile equivalent are designed together.
4. Expand the sticker table into direct canvas-style sorting with accessible touch, pointer and keyboard controls.
5. Continue adding rooms or rotating walls as inventory grows instead of shrinking merchandise into a dense catalog grid.

## Entry Gallery addition — 2026-08-31

- A new `feature/entry-gallery` branch adds the orientation room between the storefront and the merchandise showroom.
- The space sequence is now `Outside → Entry Gallery → Men's Gallery`. Leaving the Men's Gallery returns to the Entry Gallery; leaving the Entry Gallery returns outside.
- The former general showroom is now identified as the Men's Gallery. Its catalog, fixtures, product drawers, bag and checkout behavior are unchanged.
- The physical directory names four destinations:
  - Men's Gallery — open and interactive
  - Women's Studio — opening soon
  - Collections Hall — opening soon
  - Objects & Editions — on view inside the current gallery
- The right-hand architectural threshold and the Men's Gallery directory row both open the current showroom. Unfinished rooms are visible but deliberately non-interactive.
- `public/store/entry-gallery-v1.webp` is a new project-owned raster environment generated from the existing showroom's visual language. It contains the architecture, lighting and mannequins only; directory copy and room statuses remain accessible HTML.
- `src/entry-gallery.css` calibrates the interface to the new scene and provides a compact mobile directory treatment.
- Future room work should extend the `space` state rather than adding more booleans. Dedicated URL/history routing becomes worthwhile when a second merchandise room opens.

## Women's Studio addition — 2026-08-31

- The foyer's left doorway and directory listing now open a complete Women's Studio; both Women's and Men's rooms return to the shared Entry Gallery.
- The opening assortment contains six catalog-backed products: the Apex Pattern Skater Dress, Apex Pattern one-piece swimsuit, white Wave Mark zip hoodie, women-modeled Summit bomber, Shadow pants and Shadow Pattern hoodie.
- Women-specific items remain out of the Men's Gallery. `womenStudioProductIds` defines the separate room assortment while shared unisex product records continue to use the same commerce identity.
- `buildCatalogProducts()` now returns `womenStudioProducts` alongside `showroomProducts`, preserving live variation, price, availability, bag and checkout behavior in both rooms.
- `public/store/womens-studio-v1.webp` is the studio's generated architectural shell. The six empty display bays, central editorial frame and room perspective are registered to the same `1672 × 941` scene plane used throughout the store.
- The central editorial frame uses the approved local swimsuit model image, while every sellable display bay remains a real product button with accessible product details.
- Desktop visitors approach merchandise in the room; mobile visitors receive a compact architectural view followed by a touch-sized two-column opening edit.
- Screenshot calibration replaced the near-bay dress and swimsuit hero images with transparent product-focused exports. This removes the swimsuit's rectangular black backdrop and keeps all six pieces visually seated inside their illuminated niches.
- The Nocturne refinement replaces the central rectangular swimsuit poster with two transparent catalog model layers, allowing the illuminated back-wall frame to remain visible around the figures.
- Vespera Moonscript and Night Ranger Bear now anchor the Studio's darker apparel story in place of the generic Shadow pants and Shadow Pattern hoodie displays. A restrained violet-and-champagne light treatment warms the existing architectural shell without changing it.
- The six bay products now use a mirrored depth scale: near, middle and far fixtures share matching dimensions across both walls. Vespera uses its full-front hoodie hero rather than a folded-detail image, and the two transparent editorial models are enlarged and bottom-anchored so their source-image crop terminates at the frame edge instead of floating above it.
