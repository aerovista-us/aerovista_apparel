# AeroVista Apparel — Women's Studio + After Dark, November 12 2026

## Intent / boundaries

This is a flagship-only merchandising update, not a global Square import or new payment provider.

- Keep Men's room, existing Women's six-piece composition, prior Drops and Sticker Box pricing unchanged.
- Add the AeroVista Arrow Women's Racerback Cropped Tank — Follow Your Path to the Women's Nocturne edit, on a separate central foreground plinth and in the mobile shopping edit.
- Add AeroVista After Dark as a routed room at ?space=afterdark and fourth doorway in Drops.
- Four verified products: Midnight Signal Hoodie, Neon Velocity Hoodie, Haunted Mixtape Vol. 1 Hoodie, Ghost Frequency Beanie.
- Desktop uses magenta/cyan architecture, two mannequin forms, a central rail and a physical beanie shelf; mobile retains accessible product cards.
- Existing account, saved items, drawer, bag and Square checkout remain shared.

## Product identities

src/data/flagshipSquareEditions.json contains five exact Square Item IDs and 24 variation IDs, checked against live Square and Printful external IDs.

- Cropped tank: $32, S–2XL, Printful sync product 489903432
- Midnight Signal Hoodie: $58, S–3XL, Printful 487847636
- Neon Velocity Hoodie: $58, S–3XL, Printful 487848945
- Haunted Mixtape Vol. 1 Hoodie: $58, S–3XL, Printful 487890626
- Ghost Frequency Beanie: $38, one size, Printful 487849486

Images were converted from actual Square product images and stored locally in public/products. Haunted Mixtape has a transparent showroom image alongside the original white-background hero.

The additional products are included only when the storefront hostname is apparel.aerovista.us. Gear's shared catalog and other storefront destinations are untouched. An item already in an upstream catalog is not duplicated.

## Commerce backend

Production checkout variation map was augmented from 216 unchanged existing keys to 240 keys using 24 exact Square variation IDs. No Default__Size mapping overrides or Square writes.

NXCore:
- /srv/Collab/mini.shops/AV-PNW.com/av_storefront/backend/_data/square-releases/apparel-editions-sku-map-20261112.json
- /srv/Collab/mini.shops/AV-PNW.com/av_storefront/backend/docker-compose.editions-20261112.yml

The new override is layered onto docker-compose.yml and docker-compose.sticker-v1.yml. The commerce image is still av-store-api:apparel-mount-sled-20261106. A backup of the original live 216-key map and container inspect is stored under _data/square-releases. Roll back by recreating the service without only the editions override. Do not substitute the unrelated 672-entry generated SKU map.

## Lumina pricing

The Lumina mid-weight hoodie price was already reconciled from $34–$40 to $58 across six sizes in aerovista-us/store PR #13, and verified in the Gear feed, Apparel drawer, and NXCore checkout; do not reapply it here.

## Acceptance

- Vite build, 1440px and 390px direct routes, image loading, desktop room composition, zero page errors/overflow.
- Connected product drawers and Square-verified checkout line items for new products; same shared bag.
- Production Vercel READY and canonical-host browser check before considering Released.
- No paid order executed.

Other Square-only products (owl, bubble-free stickers, What's Next? and others) remain in the catalog publication queue pending separate review.
