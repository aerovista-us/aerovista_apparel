# AeroVista Store — Space Design Plan

The storefront is a place first and a catalog second. Every layout decision should answer: **where would this product physically live in a well-merchandised AeroVista store?**

## Core spatial rules

### Apparel lives on walls
- Hoodies, sweatshirts, long sleeves, tees and jackets are shown **hung, full-length and front-facing**.
- Apparel is not presented as folded stacks, floating catalog tiles or table piles.
- Wall rails should feel architectural and restrained: dark wall, silver/graphite rail, controlled spacing, minimal signage.
- Garments need enough negative space to read individually. Avoid filling every inch of a wall.

### Headwear owns a shelf
- Hats are displayed face-forward on dedicated shelving.
- Keep the current open shelf treatment: several hats visible at once with room between silhouettes.
- Hats should not be mixed into apparel rails or object cases unless there is a deliberate editorial reason.

### Objects and editions use display surfaces
- Playing cards, collectible objects, gift cards and future limited editions belong on a table, plinth or glass case.
- Do not place clothing on these surfaces simply to fill empty space.
- Empty display space is acceptable and preferable to incorrect merchandising.

## Store zones

### Apex Wall
Signature AeroVista / Apex pieces. This is the strongest branded wall and should read first when the customer enters.

### Architect Wall
Architect apparel grouped as a coherent sub-collection rather than scattered throughout the room.

### Studio Wall
Core AeroVista and division-created pieces. This wall can rotate more frequently and show the breadth of the ecosystem.

### Headwear
A dedicated shelf presentation. This should remain visually clean and easy to scan.

### Objects & Editions
Collectible and non-apparel releases. The Apex Relic playing-card deck is the first anchor item.

## Mobile design

Mobile must **not collapse into a normal ecommerce grid**.

The phone experience is a narrower walk through the same store:
1. Enter through the storefront.
2. See an atmospheric interior view.
3. Move vertically through named retail areas.
4. Swipe horizontally along hanging wall rails.
5. Browse headwear on a shelf.
6. Reach objects on a dedicated display surface.

On mobile, the customer should still feel that each item has a physical location.

## Customer-facing language

Avoid language that exposes the implementation or makes the experience feel like a software demo.

Do not show terms such as:
- fixture
- module
- component
- slot
- prototype inventory
- fixture map
- merchandising tool
- live product modules

Prefer retail language:
- wall
- shelf
- display
- collection
- pieces
- inside AeroVista
- explore the walls
- select a piece
- objects & editions

Internal code may continue using technical names where useful, but those terms should not leak into the customer experience.

## Image treatment

- Transparent or clean-background product imagery is preferred.
- Apparel images should preserve the full garment silhouette.
- `object-fit: contain` is the default for in-store presentation.
- Do not crop sleeves, hems, hat brims or important artwork when the item is being shown in the room.
- Product detail drawers can use larger imagery and alternate views.

## Restraint

AeroVista should feel premium, not crowded. A physical boutique does not need to display the entire warehouse at once. As inventory grows, add or rotate walls and rooms rather than shrinking everything until it becomes a catalog grid.
