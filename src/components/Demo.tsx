import { useLayoutEffect, type ReactNode } from 'react'
import type { DemoKind } from '../content/projects'

type DemoProps = { kind: DemoKind }

type Painting = {
  src: string
  width: number
  height: number
  // What the painting shows. Wherever it appears, the caption or label next to it gives the
  // artist and title, so the alt text doesn't repeat them.
  alt: string
  // Who painted it, and when they lived, for the wall label on a home page card.
  artist: string
  lifespan: string
  // Its title and date: the credit is the artist and this, wherever the painting appears.
  work: ReactNode
  // What it's made of, for the wall label.
  medium: string
  // Where it hangs, for the credit on a case study page. Left out where it's not wanted.
  museum?: string
  // A short nod to why this painting, ahead of its credit on the case study page.
  nod: string
}

// Each project is pictured with a public-domain painting that winks at its name, until
// Surfaces is published and can draw covers instead.
export const paintings: Record<DemoKind, Painting> = {
  // Meer is sea, lume is light: the painter of light on the sea, who was Armenian.
  meerlume: {
    src: '/images/aivazovsky-the-ninth-wave.webp',
    width: 1200,
    height: 807,
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
    width: 1200,
    height: 804,
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
  // 1.8 times as wide as it's tall; this detail is cropped to the shape of the other three
  // paintings, so the cards on the home page match, and the caption says it's a detail.
  softr: {
    src: '/images/van-doesburg-counter-composition-xvi.webp',
    width: 1200,
    height: 823,
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
    width: 1200,
    height: 832,
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

// The painting's credit: who painted it, its title and its date.
export function Credit({ painting }: { painting: Painting }) {
  return (
    <>
      {painting.artist}, {painting.work}
    </>
  )
}

// A span of years as written, "2021–2022" or an open-ended "2026–". Screen readers drop
// the dash, so an open end gets a hidden "present".
export function Period({ period }: { period: string }) {
  if (!period.endsWith('–')) return <>{period}</>
  return (
    <>
      {period}
      <span className="sr-only"> present</span>
    </>
  )
}

// A project's painting, hung on a wall, for the bio's hover previews, with its credit
// under it. The height is set and the width follows from the width and height
// attributes, so the painting has its size before the lazy image loads; on a narrow
// screen a wide painting is cropped at the sides rather than squashed.
export function Demo({ kind }: DemoProps) {
  const painting = paintings[kind]
  return (
    <div className="flex h-60 items-center justify-center overflow-hidden rounded-2xl border border-line bg-wall">
      <img
        src={painting.src}
        width={painting.width}
        height={painting.height}
        loading="lazy"
        alt={painting.alt}
        data-painting=""
        className="h-[82%] w-auto max-w-[86%] object-cover shadow-[0_6px_18px_rgba(0,0,0,0.25)] [view-transition-class:painting]"
      />
    </div>
  )
}

// A project's painting on its home page card: hung on the page itself, no wall, with the
// card's wall label beside it. The paintings are all about 3:2 landscape, so at one
// height they come out nearly the same size, and the label sits the same distance from
// each. It's at most 15rem tall, or narrower where the width runs out, keeping its shape.
// Sized by width with the height from the width and height attributes, it has its size
// before the lazy image loads.
//
// Page transitions carry this painting into the case study's (see styles.css): both are
// the same image, so it moves and scales without changing shape.
export function HungPainting({ kind }: DemoProps) {
  const painting = paintings[kind]
  return (
    <img
      src={painting.src}
      width={painting.width}
      height={painting.height}
      loading="lazy"
      // The card's wall label already credits it, and the card links by the project's name.
      alt=""
      data-painting=""
      style={{ maxWidth: `min(100%, calc(15rem * ${painting.width} / ${painting.height}))` }}
      className="h-auto w-full shadow-[0_10px_24px_rgba(0,0,0,0.18),0_2px_4px_rgba(0,0,0,0.12)] [view-transition-class:painting]"
    />
  )
}

// The case study painting a visitor just left, so the home page can carry it back to its
// card, whether they went back with the site's link or the browser's back button. Noted
// as the page goes, and only good for a moment.
let left: { kind: DemoKind; at: number } | null = null

export function paintingJustLeft(): DemoKind | null {
  return left && performance.now() - left.at < 1000 ? left.kind : null
}

// The painting at the top of a case study, under its title: no wall, hung on the page
// itself as wide as the text, with a nod to why it was chosen and its credit under it
// like a museum label. A painting that isn't clearly wide (a portrait or a square)
// is narrowed to what makes it 28rem tall and centered, or it would fill the screen; sized
// by width, it keeps its shape on a narrow screen too.
const narrowed = (p: Painting) => (p.width >= p.height * 1.2 ? undefined : `calc(28rem * ${p.width} / ${p.height})`)

export function PaintingFigure({ kind }: { kind: DemoKind }) {
  const painting = paintings[kind]
  useLayoutEffect(
    () => () => {
      left = { kind, at: performance.now() }
    },
    [kind],
  )
  return (
    <figure className="mt-8 mb-8">
      <img
        src={painting.src}
        width={painting.width}
        height={painting.height}
        fetchPriority="high"
        alt={painting.alt}
        data-painting=""
        style={{ viewTransitionName: `painting-${kind}`, maxWidth: narrowed(painting) }}
        className="mx-auto h-auto w-full shadow-[0_10px_30px_rgba(0,0,0,0.22)] [view-transition-class:painting]"
      />
      <figcaption className="mt-3 font-mono text-xs text-muted">
        {painting.nod}: <Credit painting={painting} />.{painting.museum && ` ${painting.museum}.`}
      </figcaption>
    </figure>
  )
}
