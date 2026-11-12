// Draws the site's icon with Surfaces: a sfumato, a long-exposure blur of the link
// previews' terracotta and its partner color. Only the top of the drawing is used, where
// the color is: the rest is the dark ground. The files are written once and kept; run
// this again only to change the icon.
//
//   node scripts/draw-favicon.ts    writes public/favicon.png and public/apple-touch-icon.png
import { writeFileSync } from 'node:fs'
import { generate } from '@pogrobert/surfaces'
import { toPng } from '@pogrobert/surfaces/png'
import { Resvg } from '@resvg/resvg-js'

const size = 512
// How much of the drawing's height the icon shows, from the top, pulled to a square.
const shown = 910 / 1600
const scene = generate({
  style: 'sfumato',
  // Draws a pale streak across the top with a band of violet under it.
  seed: 'pogrobert',
  color: '#c2410c',
  width: size,
  height: size,
  areas: [],
  theme: 'dark',
  // The finest grain, since the icon is seen at sixteen pixels.
  grain: 'smooth',
})
const art = Buffer.from(await toPng(scene)).toString('base64')

// The picture at a size, with its corners rounded or left square.
const icon = (width: number, round: boolean) =>
  new Resvg(
    `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 ${size} ${size}">` +
      `<clipPath id="tile"><rect width="${size}" height="${size}" rx="${round ? size * 0.24 : 0}"/></clipPath>` +
      `<g clip-path="url(#tile)"><image width="${size}" height="${size}" transform="scale(1 ${1 / shown})" xlink:href="data:image/png;base64,${art}"/></g></svg>`,
    { fitTo: { mode: 'width', value: width } },
  )
    .render()
    .asPng()

// The tab's icon is a rounded tile. A phone's home screen rounds the corners itself, and
// fills any see-through ones with black, so that one is left square.
writeFileSync('public/favicon.png', icon(96, true))
writeFileSync('public/apple-touch-icon.png', icon(180, false))
