// Draws the rattle cursors in src/assets/cursors/ (used by src/styles/cursor.css).
//
//   node scripts/cursors.mjs
//
// One drawing, three states (idle, shake: over something clickable, jingle: while pressed), each
// in a day palette (light and dark themes) and a dim amber night palette. 32×32 is the largest
// size every browser accepts for a cursor. The hotspot is (5, 5): the top-left edge of the head.
import { writeFileSync } from 'node:fs'

const OUT = new URL('../src/assets/cursors/', import.meta.url)

const PALETTES = {
  day: {
    outline: '#5b2440',
    ball: ['#ffe3ec', '#f7a6c2', '#de779d'],
    ballJingle: ['#fff2f6', '#ff92ba', '#e9669a'],
    heart: '#ffffff',
    shine: '#ffffff',
    shineOpacity: 0.8,
    handle: ['#d3f5e7', '#8fd5b8', '#5db592'],
    collar: ['#fff0b8', '#f5cf6b', '#dcaa3c'],
    ring: '#b9a3f0',
    shake: '#f7a6c2',
    spark: '#ffd65c',
  },
  night: {
    outline: '#1a1209',
    ball: ['#dca06c', '#c27a48', '#94562f'],
    ballJingle: ['#ecb57f', '#d68a52', '#a8633a'],
    heart: '#e3bb85',
    shine: '#ecc791',
    shineOpacity: 0.55,
    handle: ['#ab9467', '#8f7a52', '#66563a'],
    collar: ['#d6ad6a', '#b98d4a', '#8c6a35'],
    ring: '#8c9152',
    shake: '#d9874f',
    spark: '#d9a85c',
  },
}

/** Motion arcs either side of the head, on a circle of r=10.4 around it. */
const SHAKE_ARCS = 'M16.2 1.99A10.4 10.4 0 0 1 20.27 6.28M1.99 16.2A10.4 10.4 0 0 0 6.28 20.27'
const HEART =
  'M11 14.6c-2.9-1.9-3.9-3.4-3.9-4.7 0-1.1.9-1.9 1.9-1.9.8 0 1.5.4 2 1.1.5-.7 1.2-1.1 2-1.1 1 0 1.9.8 1.9 1.9 0 1.3-1 2.8-3.9 4.7Z'
/** The ambient backdrop's sparkle: centred on (12, 12), radius 10.5. */
const SPARKLE =
  'M12 1.5c.7 6.1 4.4 9.8 10.5 10.5-6.1.7-9.8 4.4-10.5 10.5-.7-6.1-4.4-9.8-10.5-10.5C7.6 11.3 11.3 7.6 12 1.5Z'

const num = (value) => +value.toFixed(3)

function sparkle(cx, cy, radius, p) {
  const k = radius / 10.5
  return `<path transform="translate(${num(cx - 12 * k)} ${num(cy - 12 * k)}) scale(${num(k)})" d="${SPARKLE}" fill="${p.spark}" stroke="${p.outline}" stroke-width="${num(1.1 / k)}" stroke-linejoin="round"/>`
}

function rattle(p, state) {
  const ball = state === 'jingle' ? p.ballJingle : p.ball
  const parts = [
    `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">`,
    `<defs>`,
    `<radialGradient id="ball" cx=".4" cy=".34" r=".72" fx=".3" fy=".24"><stop offset="0" stop-color="${ball[0]}"/><stop offset=".5" stop-color="${ball[1]}"/><stop offset="1" stop-color="${ball[2]}"/></radialGradient>`,
    `<linearGradient id="handle"><stop offset="0" stop-color="${p.handle[1]}"/><stop offset=".35" stop-color="${p.handle[0]}"/><stop offset="1" stop-color="${p.handle[2]}"/></linearGradient>`,
    `<linearGradient id="collar"><stop offset="0" stop-color="${p.collar[1]}"/><stop offset=".35" stop-color="${p.collar[0]}"/><stop offset="1" stop-color="${p.collar[2]}"/></linearGradient>`,
    `</defs>`,
  ]
  if (state !== 'idle') {
    parts.push(
      `<path d="${SHAKE_ARCS}" fill="none" stroke="${p.outline}" stroke-width="3.4" stroke-linecap="round"/>`,
      `<path d="${SHAKE_ARCS}" fill="none" stroke="${p.shake}" stroke-width="1.6" stroke-linecap="round"/>`,
    )
  }
  if (state === 'jingle') {
    parts.push(sparkle(26.6, 5.4, 3.9, p), sparkle(5.4, 26.6, 3.2, p))
  }
  parts.push(
    // Ring, handle and collar, drawn along the handle's own axis (pointing down-right).
    `<g transform="translate(11 11) rotate(-45)" stroke="${p.outline}">`,
    `<circle cy="21.2" r="3" fill="none" stroke-width="4.6"/>`,
    `<circle cy="21.2" r="3" fill="none" stroke="${p.ring}" stroke-width="2.1"/>`,
    `<rect x="-2.2" y="4" width="4.4" height="14.6" rx="2.2" fill="url(#handle)" stroke-width="1.4"/>`,
    `<rect x="-3.6" y="8.2" width="7.2" height="3.2" rx="1.5" fill="url(#collar)" stroke-width="1.4"/>`,
    `</g>`,
    `<circle cx="11" cy="11" r="8" fill="url(#ball)" stroke="${p.outline}" stroke-width="1.6"/>`,
    `<path transform="translate(.6 .5)" d="${HEART}" fill="${p.heart}"/>`,
    `<ellipse cx="7.3" cy="7.1" rx="2.5" ry="1.3" transform="rotate(-45 7.3 7.1)" fill="${p.shine}" opacity="${p.shineOpacity}"/>`,
    `<circle cx="10.4" cy="5.3" r=".7" fill="${p.shine}" opacity="${p.shineOpacity}"/>`,
    `</svg>`,
  )
  return `${parts.join('\n')}\n`
}

for (const [name, palette] of Object.entries(PALETTES)) {
  for (const state of ['idle', 'shake', 'jingle']) {
    const file = ['rattle', state === 'idle' ? '' : state, name === 'night' ? 'night' : '']
      .filter(Boolean)
      .join('-')
    writeFileSync(new URL(`${file}.svg`, OUT), rattle(palette, state))
  }
}
