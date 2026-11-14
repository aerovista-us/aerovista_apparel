# November 14 catalog quality queue — 41 primary-image-field findings

**Source:** `aerovista-us/store/store/square_products_latest.json` on main (static exported feed, not live Square API).

The Nov 12 historical data-quality gate reported **41 findings**. A fresh read of the current checked-in Gear catalog on Nov 14 found **exactly 41 product records without a primary `image` field**: **33 visible** and **8 hidden**. All 115 have description text and a numeric price (product or variation). These observations are consistent with the earlier 41 count but do not independently reproduce the exact historical quality validator or prove 41 broken customer pages.

- Full 41-row work queue: [PRIMARY_IMAGE_REVIEW_41_20261114.csv](PRIMARY_IMAGE_REVIEW_41_20261114.csv).
- Priority: visible 33 → test the storefront's actual media source, local artwork, editor gallery and fallback. Hidden 8 → quarantine/review; not an urgent published visual defect.
- **Do not** automatically copy October staging `/store/products/*` paths into Gear; the November 12 reconciliation found numerous 404s for those destination paths.
- Actual rendered image status cannot be certified without a live browser/image-origin read-back after the NXCore connector is restored.
- Each row closes only with either: (a) approved primary/card/detail image and 200/alt/fallback proof at its intended destination, or (b) documented nonbuyable/hidden/editorial exclusion.
- No Square catalog, Printful product or public storefront was edited in this audit.

Other release gates remain distinct: current live Square/Printful variation verification, catalog provider mapping, shipping margin and paid-to-fulfillment acceptance.
