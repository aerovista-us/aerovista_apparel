# AeroVista Apparel — cart controls and live browser-tab synchronization

## Changes
- Adds + / − controls for ordinary merchandise quantities in the bag. Bounds 1–50 per line; reducing 1 to 0 removes that line.
- Adds Clear bag; clears local browser cart storage as well as React state.
- Sticker-bundle lines remain atomic: their quantities cannot be changed separately; the existing Remove entire bundle control is retained.
- A second tab on the same origin automatically receives cart changes via the standard localStorage storage event.
- Avoids re-broadcast loops by suppressing the write effect for changes received from another tab.
- Persisted snapshots still contain only product ID, Square variation ID, quantity and bundle ID, and are rebuilt against live catalog prices.
- Fixes an edge case where saving more than 80 lines silently discarded surplus lines; an oversize snapshot now fails closed.

## QA
- node --test tests/cartPersistence.test.mjs: 9 passing tests covering old and new cases.
- Vite production build succeeded.
- Playwright browser at 1440×900 and 390×900:
  - add Idaho After Dark tee ($32.99)
  - change quantity to 2 and verify $65.98 and automatic second-tab quantity 2
  - decrease quantity from second tab, verify first tab changes to 1
  - Clear bag in second tab, verify first tab empties and localStorage key disappears
  - reload first tab; bag remains empty
  - no page errors
- No backend/Square/Printful changes and no paid orders.

## Boundaries
- Cart remains browser-local, not linked across different devices or profiles.
- Customer checkout totals remain authoritative at NXCore/Square. The front-end subtotal is a preview.
- Bundle lines remain immutable; adjust bundle contents in Sticker Box before adding to bag.
