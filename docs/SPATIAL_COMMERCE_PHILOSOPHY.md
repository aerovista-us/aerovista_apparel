# AeroVista Apparel — Spatial Commerce Philosophy

## Working concept: Guided Spatial Commerce

The AeroVista store should feel like a place before it feels like a website, but it should never make shopping harder just to prove that it is immersive.

The goal is not to build a video game with a checkout button. The goal is to make the customer feel that they crossed a threshold, entered a real branded environment, moved through distinct areas, approached merchandise, and picked something up — while preserving the speed, accessibility, product clarity, and mobile usability of normal commerce.

This creates a hybrid model:

**spatial discovery + conventional commerce clarity**.

## Research that informed the direction

### Elfoslav / 3d-virtual-store
A React Three Fiber / Three.js experiment built as a walkable store with shelves, pointer-lock movement, product highlighting, lighting, shadows, SSAO and bloom.

Useful lesson: real 3D space becomes convincing when lighting, product interaction, and the relationship between the user and the shelf are treated as one system.

Caution for AeroVista: WASD/pointer-lock interaction reads as a game and is a poor default for phones or casual shoppers.

https://github.com/Elfoslav/3d-virtual-store

### Elite Showroom
A React Three Fiber showroom that uses tailored camera stages rather than unrestricted roaming. The user moves between deliberately composed views, with stage-specific overlays and controlled transitions.

Useful lesson: luxury experiences benefit from authored camera positions and intentional composition more than unrestricted first-person movement.

https://github.com/naveed-gung/Elite-Showroom

### Suburbia Skateboards
An interactive 3D commerce experience using React Three Fiber and GSAP, combining product interaction with scroll-linked animation and a normal commerce architecture.

Useful lesson: 3D is strongest when it creates memorable product moments instead of replacing every normal store interaction.

https://github.com/wistant/suburbia

### Build Your World
A 2026 ecommerce concept that intentionally separates an interactive 3D discovery layer from practical product and checkout layers. Product hotspots open standard HTML interfaces outside the 3D canvas.

Useful lesson: keep discovery immersive and keep transaction interfaces readable, accessible and maintainable.

https://www.thecoolmoon.com/work/build-your-world-3d-printed-ecommertce-site

### VEIL
A luxury streetwear concept using React Three Fiber, GSAP, Lenis, editorial typography, ambient particles, film grain, horizontal lookbooks and scroll-driven collection reveals.

Useful lesson: fashion immersion is as much about atmosphere, pacing and editorial motion as polygon count.

https://d-lab.codes/experiments/veil

## Core design rules

### 1. The customer enters; they do not simply load a catalog
The exterior is a threshold. Entering the door should always produce a perceptible transition in scale, light and spatial context.

### 2. The store uses authored viewpoints
AeroVista should favor guided views over unrestricted first-person movement.

Examples:
- exterior
- entry aisle
- Apex wall
- Architect wall
- Studio wall
- headwear
- objects / editions
- future rooms

A view can be a true 3D camera position, a 2.5D transform, or a responsive mobile section. The conceptual model remains the same.

### 3. Merchandise follows physical retail logic
- Tees, hoodies, sweatshirts and jackets hang from rails or wall systems.
- Hats sit on dedicated shelves or headwear fixtures.
- Playing cards, prints, accessories and collectibles sit on tables, cases or plinths.
- Hero pieces may occupy a mannequin or isolated display bay.
- Inventory is curated into the space. Not every SKU has to be visible at once.

### 4. Depth must have consequences
A spatial scene should communicate foreground, middle ground and background.

We create that through:
- perspective convergence
- scale differences
- occlusion
- lighting pools
- shadow
- atmospheric dimming
- surface reflection
- focus transitions
- movement between zones

If every product has equal size, brightness and visual priority, the room collapses back into a flat product grid.

### 5. Interaction should feel like approaching an object
Hover, focus or touch should create a small spatial response:
- the selected area comes forward
- distant merchandise quiets slightly
- the room darkens around the focus point
- the selected product receives a stronger shadow / light response
- product information appears only after intent

This is the web equivalent of walking toward a rack and reaching for a garment.

### 6. Customer language must remain retail language
Internal concepts such as `fixture`, `module`, `slot`, `scene graph`, `hotspot`, `component`, or `debug map` should not appear in customer-facing copy.

Customer vocabulary should sound like a physical store:
- Apex Wall
- Headwear
- Objects & Editions
- Studio
- Archive
- Explore
- Take a closer look
- Select a piece

### 7. Mobile is another camera, not a fallback website
Mobile should not abandon the store metaphor and become a grid.

A phone naturally supports a guided walk:
- vertical movement = moving deeper through the store
- horizontal swiping = moving along a wall or shelf
- sticky collection controls = wayfinding
- touch focus = approaching a product

The mobile experience can be more controlled than desktop while still representing the same physical place.

### 8. Commerce UI stays HTML-first
Product details, size selection, bag and checkout should remain standard React/HTML interfaces even if the store eventually becomes fully WebGL.

This keeps:
- accessibility
- SEO
- responsive behavior
- product-data integration
- checkout reliability
- analytics

separate from the rendering technology used for the room.

## Technology philosophy

### Phase A — illusion-first 2.5D
Current direction.

Use authored SVG/photographic environments, layered React merchandise, perspective transforms, depth-of-field style focus changes, lighting, shadows and transitions.

Advantages:
- fast
- easy to merchandise
- works on GitHub Pages
- real product PNGs stay crisp
- minimal GPU cost
- excellent mobile fallback

### Phase B — camera zones
Add explicit spatial locations to the store model.

A zone can define:
- camera / viewport framing
- neighboring zones
- visible merchandise
- lighting state
- background / environment state
- transition behavior

This gives the customer a sense of walking between areas without requiring game controls.

### Phase C — selective WebGL
Introduce React Three Fiber where it earns its cost.

Good candidates:
- the physical room shell
- one hero product
- reflective display plinths
- lighting and shadow
- subtle camera movement
- optional product rotation

HTML product panels remain outside the canvas.

### Phase D — optional full spatial mode
Only after performance testing.

A complete R3F room could use:
- GLTF / GLB environment
- Drei
- compressed geometry
- LOD
- texture atlases
- progressive loading / Suspense
- instancing for repeated architecture
- postprocessing kept deliberately restrained

Full free-roam should be optional, not the default shopping requirement.

## Performance rule

Immersion has a performance budget.

Research from a production R3F shopping environment describes an initial scene running around 12 FPS before Draco compression, instancing, LOD and texture atlasing improved the same environment dramatically. The lesson is important: spatial commerce should be designed around performance from the beginning rather than optimized after the scene becomes heavy.

For AeroVista, a product should become more immersive only when the visual or interaction benefit justifies the rendering cost.

## The AeroVista test

Every future change should pass five questions:

1. Does this make the customer feel more physically present?
2. Does the merchandise still behave like merchandise in a real store?
3. Is the interaction immediately understandable without instructions?
4. Does mobile still feel like the same place?
5. Can the customer still inspect and buy a product without fighting the experience?

If a feature is technically impressive but fails those questions, it does not belong in the flagship store.
