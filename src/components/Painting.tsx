import { useLayoutEffect, type ReactNode } from 'react'
import type { Slug } from '../content/projects'

type Painting = {
  src: string
  // What the painting shows. Wherever it appears, the caption or label next to it gives the
  // artist and title, so the alt text doesn't repeat them.
  alt: string
  // Who painted it, and when they lived, for the wall label on a home page card.
  artist: string
  lifespan: string
  // Its title and date: the credit is the artist and this, wherever the painting appears.
  // Surfaces' picture has none, so its label and credit name only the artist.
  work?: ReactNode
  // What it's made of, for the wall label.
  medium: string
  // Where it hangs, for the credit on a case study page. Left out where it's not wanted.
  museum?: string
  // A short nod to why this painting, ahead of its credit on the case study page.
  nod: string
}

// Each project is pictured with a public-domain painting that winks at its name, and
// Surfaces with a picture it drew itself.
export const paintings: Record<Slug, Painting> = {
  // A mezzotint still life drawn by the library, labelled like the paintings beside it.
  // scripts/draw-surfaces.ts draws the file, in the one frame they all share.
  surfaces: {
    src: '/images/surfaces/still-life-with-vessels.svg',
    alt: 'A bottle, a cup and a bowl on a ledge, lit from the side in the dark',
    artist: 'Surfaces',
    lifespan: '2026–',
    medium: 'Mezzotint, drawn by code',
    nod: 'Drawn by itself',
  },
  // Meer is sea, lume is light: the painter of light on the sea, who was Armenian.
  meerlume: {
    src: '/images/aivazovsky-the-ninth-wave.webp',
    alt: 'Survivors clinging to a mast as the sun breaks through a storm at sea',
    artist: 'Ivan Aivazovsky',
    lifespan: '1817–1900',
    work: (
      <>
        <cite>The Ninth Wave</cite>, 1850
      </>
    ),
    medium: 'Oil on canvas',
    nod: 'A nod to the name',
  },
  // From a series collecting one landmark from 36 places, and Fuji is one of the app's
  // stamps: here it sits small in the distance, framed by stacks of timber.
  stamplyn: {
    src: '/images/hokusai-honjo-tatekawa.webp',
    alt: 'Workers stack and saw lumber beside a canal, with tall bundles of timber and Mount Fuji small in the distance',
    artist: 'Katsushika Hokusai',
    lifespan: '1760–1849',
    work: (
      <>
        <cite>The Timberyard at Honjo</cite>, <span aria-hidden="true">c. 1830–32</span>
        <span className="sr-only">circa 1830 to 1832</span>
      </>
    ),
    medium: 'Woodblock print',
    nod: 'A nod to the landmarks',
  },
  // Blocks of color in a De Stijl grid, tilted 45° so they seem to move. The painting is
  // 1.8 times as wide as it's tall; the file is a detail cropped to about the shape of the
  // other three, and the caption says it's a detail.
  softr: {
    src: '/images/van-doesburg-counter-composition-xvi.webp',
    alt: 'Blue, yellow, red, black and gray rectangles in a grid of black bars, tilted 45 degrees',
    artist: 'Theo van Doesburg',
    lifespan: '1883–1931',
    work: (
      <>
        <cite>Counter-Composition XVI in Dissonances</cite> (detail), 1925
      </>
    ),
    medium: 'Oil on canvas',
    museum: 'Kunstmuseum Den Haag',
    nod: 'A nod to the blocks',
  },
  // The company shares a name with the painter, and this is one of his tapestry cartoons:
  // paintings made to order for the royal tapestry factory, the client work that started
  // his career.
  goya: {
    src: '/images/goya-the-parasol.webp',
    alt: 'A young woman in a yellow skirt sits with a small dog in her lap while a young man holds a green parasol over her',
    artist: 'Francisco de Goya',
    lifespan: '1746–1828',
    work: (
      <>
        <cite>The Parasol</cite>, 1777
      </>
    ),
    medium: 'Oil on canvas',
    museum: 'Museo del Prado',
    nod: 'A nod to the name',
  },
}

// Every painting is shown in one frame, three wide to two tall, so they all come out the
// same size wherever they hang. The files are 1200 wide and between 800 and 832 tall: the
// frame trims the difference off the top and bottom (16px each at most, of The Parasol)
// in the browser, so no file is cropped or saved again. A new painting needs to be close
// to 3:2 to begin with, or be cropped to a detail first, as the Van Doesburg was.
const frame = { width: 1200, height: 800, className: 'aspect-3/2 object-cover' }

// The painting's credit: who painted it, its title and its date.
export function Credit({ painting }: { painting: Painting }) {
  return (
    <>
      {painting.artist}
      {painting.work && <>, {painting.work}</>}
    </>
  )
}

// Starts loading a painting ahead of its hover preview. The preview's image is lazy and
// not displayed until the preview opens, so by itself it would only start loading then,
// and the preview would open on an empty wall. Asked for when the pointer or focus
// reaches the name, it has the preview's opening delay as a head start; and the case
// study the name links to shows the same file.
const preloaded = new Set<Slug>()

export function preloadPainting(slug: Slug) {
  if (preloaded.has(slug)) return
  preloaded.add(slug)
  new Image().src = paintings[slug].src
}

// A project's painting, hung on a wall, for the bio's hover previews, with its credit
// under it. The height is set and the width follows from the frame, so the painting has
// its size before the lazy image loads.
export function PaintingPreview({ slug }: { slug: Slug }) {
  const painting = paintings[slug]
  return (
    <div className="flex h-60 items-center justify-center overflow-hidden rounded-2xl border border-line bg-wall">
      <img
        src={painting.src}
        width={frame.width}
        height={frame.height}
        loading="lazy"
        alt={painting.alt}
        data-painting=""
        className={`h-[82%] w-auto max-w-[86%] shadow-painting [view-transition-class:painting] ${frame.className}`}
      />
    </div>
  )
}

// A project's painting on its home page card: hung on the page itself, no wall, with the
// card's wall label beside it. In the one frame, the paintings are all the same size, and
// the label sits the same distance from each. It's at most 15rem tall (22.5rem wide), or
// narrower where the width runs out, keeping its shape. Sized by width with the height
// from the frame, it has its size before the lazy image loads.
//
// Page transitions carry this painting into the case study's (see styles.css): both are
// the same image in the same frame, so it moves and scales without changing shape.
//
// The first card's painting is on screen when the home page opens, or nearly, so it's
// eager: it loads with the page instead of waiting for the layout to say it's in view.
export function HungPainting({ slug, eager }: { slug: Slug; eager?: boolean }) {
  const painting = paintings[slug]
  return (
    <img
      src={painting.src}
      width={frame.width}
      height={frame.height}
      loading={eager ? 'eager' : 'lazy'}
      fetchPriority={eager ? 'high' : undefined}
      // The card's wall label already credits it, and the card links by the project's name.
      alt=""
      data-painting=""
      className={`h-auto w-full max-w-[min(100%,22.5rem)] shadow-painting [view-transition-class:painting] ${frame.className}`}
    />
  )
}

// The case study painting a visitor just left, so the home page can carry it back to its
// card, whether they went back with the site's link or the browser's back button. Noted
// as the page goes, and only good for a moment.
let left: { slug: Slug; at: number } | null = null

export function paintingJustLeft(): Slug | null {
  return left && performance.now() - left.at < 1000 ? left.slug : null
}

// The painting at the top of a case study, under its title: no wall, hung on the page
// itself as wide as the text, with a nod to why it was chosen and its credit under it
// like a museum label. Sized by width, it keeps its shape on a narrow screen too.
export function PaintingFigure({ slug }: { slug: Slug }) {
  const painting = paintings[slug]
  useLayoutEffect(
    () => () => {
      left = { slug, at: performance.now() }
    },
    [slug],
  )
  return (
    <figure className="mt-8 mb-8">
      <img
        src={painting.src}
        width={frame.width}
        height={frame.height}
        fetchPriority="high"
        alt={painting.alt}
        data-painting=""
        style={{ viewTransitionName: `painting-${slug}` }}
        className={`h-auto w-full shadow-painting [view-transition-class:painting] ${frame.className}`}
      />
      <figcaption className="mt-3 font-mono text-xs text-muted">
        {painting.nod}: <Credit painting={painting} />.{painting.museum && ` ${painting.museum}.`}
      </figcaption>
    </figure>
  )
}
