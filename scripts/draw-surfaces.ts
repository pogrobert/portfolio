// Draws the Surfaces pictures on the site with Surfaces itself. The same input always
// draws the same bytes, so the files are written once and kept; run this again only to
// change a picture.
//
//   node scripts/draw-surfaces.ts
import { mkdirSync, writeFileSync } from 'node:fs'
import { createBrand, generate, toSvg } from '@pogrobert/surfaces'

// The card's picture: a mezzotint still life of a bottle, a cup and a bowl, in the
// Harbour blue its own site opens on.
const painting = generate({
  style: 'mezzotint',
  shape: 'vessels',
  // Sets the vessels in the middle of the ledge.
  seed: 'surfaces-2',
  color: '#0078bf',
  // The one frame every painting on the site shares, three wide to two tall.
  width: 1200,
  height: 800,
  // No words go over it: the label beside it and the caption under it carry them.
  areas: [],
  theme: 'light',
  // The finest grain it draws, so the still life reads cleanly at card size.
  grain: 'smooth',
})
writeFileSync('public/images/surfaces/still-life-with-vessels.svg', toSvg(painting))

// The case study's examples: six posts' covers, each in its own style and all from one
// amber, the way a blog's list of posts would look. Each title is its post's seed, so it
// draws its own picture. A post cover keeps no place for words by default (its words sit
// beside it), so the examples ask for one at the foot: the art keeps clear of it, and the
// scene says where it is and which ink reads there. They follow the reader's theme like
// the rest of the site: an SVG drawn with theme "auto" holds both and switches with the
// system setting, even inside an <img>.
const brand = createBrand({ name: 'meerlume.com', color: '#f59e0b', theme: 'auto' })
const examples = [
  { style: 'stencil', title: 'How we cut our build time in half' },
  { style: 'riso', title: 'Dark mode, finally' },
  // Hills under a ringed sun, one of the subjects the page names.
  { style: 'linocut', shape: 'landscape', title: 'A week without meetings' },
  { style: 'papercut', shape: 'rainbow', title: 'What we learned shipping v2' },
  { style: 'engraving', title: 'Why we moved to Postgres' },
  { style: 'endpaper', title: 'Faster search, fewer clicks' },
] as const

// Where each title goes, as fractions of the cover, and the ink that reads there in each
// theme: the page reads this to set the title over the picture in its own font. The auto
// scene's ink is a CSS variable inside the SVG, which the page's text can't see, so each
// theme's ink comes from drawing that theme alone.
const round = (n: number) => Math.round(n * 10000) / 10000
mkdirSync('public/images/surfaces/examples', { recursive: true })
const covers = examples.map(({ title, ...look }) => {
  const input = { ...brand.input('post', { title }), ...look, areas: [{ place: 'bottom-left', size: 'md' }] }
  const scene = generate(input)
  const area = scene.areas[0]
  if (!area) throw new Error(`${look.style} kept no place for the title`)
  const ink = (theme: 'light' | 'dark') => generate({ ...input, theme }).areas[0]!.ink
  writeFileSync(`public/images/surfaces/examples/${look.style}.svg`, toSvg(scene))
  return {
    style: look.style,
    title,
    x: round(area.x / input.width),
    y: round(area.y / input.height),
    width: round(area.width / input.width),
    height: round(area.height / input.height),
    ink: { light: ink('light'), dark: ink('dark') },
  }
})
writeFileSync('src/content/surfaces-examples.json', `${JSON.stringify(covers, null, 2)}\n`)
