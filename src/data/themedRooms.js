// Spatial presentation belongs here; Square catalog and price authority do not.
// Every product ID is resolved against the normalized live catalog, never duplicated.
export const themedRooms = Object.freeze({
  northline: {
    id: 'northline', eyebrow: 'THE INLAND NORTHWEST', name: 'NorthLine',
    heading: 'Built for the ridgeline.', subheading: 'Lake country. Powder mornings. After-dark miles.',
    note: 'An Alpine gallery that follows the seasons, not the algorithm.',
    art: 'northline', layout: 'alpine', accent: '#9ecce4', orientation: 'landscape',
    sections: [
      { id: 'ridgeline', label: 'THE RIDGE', note: 'Wear the geography.', productIds: ['aerovista-ridgeline-tee','aerovista-blue-divide-tee','aerovista-moonline-tee','aerovista-source-code-tee'] },
      { id: 'powder', label: 'POWDER & NIGHT', note: 'Mountain light after the sun is gone.', productIds: ['aerovista-powderline-tee','aerovista-idaho-after-dark-tee','powder-peaks-v2-premium-pullover-hoodie-black','aerovista-moonline-hat','aerovista-blue-divide-sticker','powder-peaks-8-ball-sticker-black-white-ink','mount-sled-sticker'] },
    ],
  },
  shadow: {
    id: 'shadow', eyebrow: 'DROP 001 · SHADOW WEAR', name: 'Shadow Wear',
    heading: 'Disappear in plain sight.', subheading: 'Ghost Ridge / tactical silhouettes / quiet geometry.',
    note: 'A low-light industrial collection for the edges of the map.',
    art: 'shadow', layout: 'vault', accent: '#b9c2cc', orientation: 'portrait',
    sections: [
      { id: 'ghost-ridge', label: 'GHOST RIDGE', note: 'The signature capsule.', productIds: ['shadow-wear-ghost-ridge','shadow-wear','aerovista-shadow-pattern-hoodie'] },
      { id: 'afterimage', label: 'AFTERIMAGE', note: 'Utility layers and carry.', productIds: ['shadow-wear-tactical-bomber-jacket-summit-edition','shadow-pants','men-s-ghost-shorts','shadow-wear-case-for-samsung','aerovista-shadow-pattern-long-sleeve-tee','aerovista-shadowwear-desk-mat'] },
    ],
  },
  echoverse: {
    id: 'echoverse', eyebrow: 'DROP 002 · ECHOVERSE AUDIO', name: 'EchoVerse',
    heading: 'Wear the frequency.', subheading: 'Frost Circuit / Signal Dial / audio afterimage.',
    note: 'A signal chamber built around music, light and distortion.',
    art: 'echoverse', layout: 'signal', accent: '#be9ff5', orientation: 'portrait',
    sections: [
      { id: 'frost', label: 'FROST CIRCUIT', note: 'Cold light. Warm signal.', productIds: ['echoverse-frost-circuit-pullover-hoodie','echoverse-frost-circuit-tee'] },
      { id: 'signal', label: 'SIGNAL DIAL', note: 'Stay tuned.', productIds: ['echoverse-signal-dial-chest-emblem-hoodie'] },
    ],
  },
  architect: {
    id: 'architect', eyebrow: 'DROP 003 · ARCHITECT / NEXUS', name: 'Architect / Nexus',
    heading: 'Form follows intention.', subheading: 'Blueprint lines / engineered details / clean cuts.',
    note: 'The design lab: systems and silhouettes in the same language.',
    art: 'architect', layout: 'blueprint', accent: '#e1bd80', orientation: 'landscape',
    sections: [
      { id: 'field', label: 'FIELD ISSUE', note: 'Tested in the real world.', productIds: ['architect-built-different-hoodie-black','architect-field-issue-tee-black','architect-field-issue-tee-ash'] },
      { id: 'system', label: 'CIRCUIT BLOOM', note: 'Designed, built, iterated.', productIds: ['circuit-bloom-nexus-techworks-pullover-hoodie','aerovista-apex-signal-sweatshirt','drafted-a-premium-sweatshirt','aerovista-apex-pattern-hoodie'] },
    ],
  },
})
export const dropRoomIds = Object.freeze(['shadow','echoverse','architect'])
export function roomProductIds(room) {
  return [...new Set(room.sections.flatMap(section => section.productIds))]
}
