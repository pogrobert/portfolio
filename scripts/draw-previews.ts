// Draws every page's link preview (og:image), 1200 by 630: stencil steps in terracotta on
// a dark ground, drawn by Surfaces, with the page's words set at the bottom left in the site's font.
// The files are written once and kept; run this again when a page or its words change.
//
//   node scripts/draw-previews.ts            writes public/previews/<page>.jpg
//   node scripts/draw-previews.ts light <dir> a light set somewhere else, to compare
import { execFileSync } from 'node:child_process'
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { createBrand, toSvg } from '@pogrobert/surfaces'
import { Resvg } from '@resvg/resvg-js'
import wawoff2 from 'wawoff2'
import { projects } from '../src/content/projects.ts'
import { site } from '../src/content/site.ts'

const theme = process.argv[2] === 'light' ? 'light' : 'dark'
const out = process.argv[3] ?? 'public/previews'

const brand = createBrand({ name: 'pogrobert.com', color: '#c2410c', theme, style: 'stencil', shape: 'steps' })

// The renderer reads TrueType files, and the fonts ship as WOFF2, which is TrueType
// compressed: they're unpacked into a folder that's removed at the end.
const scratch = mkdtempSync(join(tmpdir(), 'previews-'))
const fontFiles: string[] = []
for (const weight of [400, 600]) {
  const packed = readFileSync(
    `node_modules/@fontsource/atkinson-hyperlegible-next/files/atkinson-hyperlegible-next-latin-${weight}-normal.woff2`,
  )
  const file = join(scratch, `atkinson-${weight}.ttf`)
  writeFileSync(file, await wawoff2.decompress(packed))
  fontFiles.push(file)
}

// A page's words, from the bottom up: who it's by (case studies only), the role and
// years, then the name, which may run to two lines.
type Words = { name: string[]; role: string; by?: string }
const pages: Record<string, Words> = {
  home: { name: ['Robert', 'Poghosyan'], role: site.title },
  ...Object.fromEntries(
    projects.map((p) => [p.slug, { name: [p.name], role: `${p.role}, ${p.period}`, by: site.name }]),
  ),
}

const escape = (text: string) => text.replace(/&/g, '&amp;').replace(/</g, '&lt;')

mkdirSync(out, { recursive: true })
for (const [page, words] of Object.entries(pages)) {
  const scene = brand.og({ title: words.name.join(' '), id: page, text: 'bottom-left' })
  const area = scene.areas[0]
  if (!area) throw new Error(`${page} kept no place for its words`)
  // The art is its own nested drawing, in its own units; the words are in the preview's
  // pixels, stacked up from the foot of the place the art keeps clear.
  let y = area.y + area.height
  const lines: string[] = []
  const line = (text: string, size: number, weight: number, opacity: number, gap: number) => {
    lines.push(
      `<text x="${area.x}" y="${y}" font-family="Atkinson Hyperlegible Next" font-size="${size}" font-weight="${weight}" fill="${area.ink}" fill-opacity="${opacity}"${weight === 600 ? ' letter-spacing="-0.8"' : ''}>${escape(text)}</text>`,
    )
    y -= size + gap
  }
  if (words.by) line(words.by, 28, 400, 0.6, 22)
  line(words.role, 36, 400, 0.78, 16)
  for (const name of [...words.name].reverse()) line(name, 78, 600, 1, 4)
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">${toSvg(scene)}${lines.join('')}</svg>`
  const png = new Resvg(svg, {
    font: { fontFiles, loadSystemFonts: false, defaultFontFamily: 'Atkinson Hyperlegible Next' },
  })
    .render()
    .asPng()
  // A grainy picture is over a megabyte as a PNG and about a tenth of that as a JPEG,
  // which every app that shows link previews reads. sips is macOS's own converter.
  const file = join(scratch, `${page}.png`)
  writeFileSync(file, png)
  execFileSync('sips', ['-s', 'format', 'jpeg', '-s', 'formatOptions', '85', file, '--out', `${out}/${page}.jpg`], {
    stdio: 'ignore',
  })
  console.log(page, `${Math.round(readFileSync(`${out}/${page}.jpg`).length / 1024)} KB`)
}
rmSync(scratch, { recursive: true })
