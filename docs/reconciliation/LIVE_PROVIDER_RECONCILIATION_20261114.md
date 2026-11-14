# Live Square and selected Printful reconciliation — November 14, 2026

Direct provider read-back: Square production Catalog API and selected Printful synced products through authorized NXCore Commerce credentials. No Square or Printful write.

- Square: 141 ITEM records / 662 variations.
- Gear: 115 products, 611 variation IDs.
- Curated Apparel: 5 products, 24 variation IDs; Mount Sled one variation.
- All 636 IDs exist in Square. 635/636 match a populated Square price exactly. The sole exception is the hidden Consultation example service with no Square price; it is not public retail.
- The same 14 unmatched Square-only items remain, 26 variations total. See LIVE_SQUARE_ONLY_REVIEW_20261114.json.
- Relevant Printful cohort: 14 synced products, including all 24 curated Apparel variation IDs plus Mount Sled, exact external_id matches. Other selected candidates: RidgeLine Cuffed Beanie 2/2, Shadow Scale Camo Beanie 3/3, AV Owl 1/1, Bubble-free stickers 2/2, What's Next? 4/4, and a separate owl 1/1 (duplicate remains under review).
- Printful scope limitation: only selected relevant synced-product names were checked, not every Gear variation.
- No publication of unapproved records until artwork, shipping, margin, destination and checkout acceptance.
- Complete 636-row CSV has live Square cents and exact verification flags, plus limited Printful cohort flags. No real payment or fulfillment.
- Image quality queue is separate: 41 missing primary image fields, not necessarily broken displayed images.
- Console production is still the older editor; source parity and isolated staging are separate gates.
