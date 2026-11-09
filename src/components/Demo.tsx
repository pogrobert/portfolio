import { useLayoutEffect, type ReactNode } from 'react'
import type { DemoKind } from '../content/projects'

type DemoProps = { kind: DemoKind }

type Painting = {
  src: string
  width: number
  height: number
  alt: string
  // Shown next to the painting wherever it appears.
  credit: ReactNode
  // Where it hangs, for the credit on a case study page.
  museum: string
  // A short nod to why this painting, ahead of its credit on the case study page.
  nod: string
  // A slim frame in a muted shade that suits the painting, as a border class: 2px on a
  // card, 4px on the larger case study cover. A border, not an outline: it sits inside the
  // image's box, so a page transition's snapshot of the painting includes it exactly.
  frame: string
}

// Each project is pictured with a public-domain painting that winks at its name, until
// Surfaces is published and can draw covers instead.
export const paintings: Record<DemoKind, Painting> = {
  // Meer is sea, lume is light: the painter of light on the sea, who was Armenian.
  meerlume: {
    src: '/images/aivazovsky-the-ninth-wave.webp',
    width: 1200,
    height: 807,
    alt: 'Ivan Aivazovsky, The Ninth Wave: survivors clinging to a mast as the sun breaks through a storm at sea',
    credit: (
      <>
        Ivan Aivazovsky, <cite>The Ninth Wave</cite>, 1850
      </>
    ),
    museum: 'State Russian Museum',
    nod: 'Sea and light',
    frame: 'border-[#8f7440]',
  },
  // From a series collecting one landmark from 36 places, and Fuji is one of the app's
  // stamps: it sits small in the distance, under the wave.
  stamplyn: {
    src: '/images/hokusai-great-wave.webp',
    width: 1000,
    height: 684,
    alt: 'Katsushika Hokusai, The Great Wave off Kanagawa: a huge wave curling over three boats, with Mount Fuji small in the distance',
    credit: (
      <>
        Katsushika Hokusai, <cite>The Great Wave off Kanagawa</cite>, c. 1830–32
      </>
    ),
    museum: 'The Metropolitan Museum of Art',
    nod: 'One landmark, thirty-six views',
    frame: 'border-[#2c3440]',
  },
  // Softr's blocks, and its yellow, pink and blue logo, in Mondrian's colored planes.
  softr: {
    src: '/images/mondrian-composition-1921.webp',
    width: 900,
    height: 898,
    alt: 'Piet Mondrian, Composition with Large Red Plane, Yellow, Black, Gray and Blue: colored rectangles divided by black lines',
    credit: (
      <>
        Piet Mondrian, <cite>Composition with Large Red Plane, Yellow, Black, Gray and Blue</cite>, 1921
      </>
    ),
    museum: 'Kunstmuseum Den Haag',
    nod: 'Built from blocks',
    frame: 'border-[#d9d6cf]',
  },
  // The company shares a name with the painter.
  goya: {
    src: '/images/goya-the-forge.jpg',
    width: 624,
    height: 900,
    alt: 'Francisco de Goya, The Forge: three men hammering glowing iron on an anvil',
    credit: (
      <>
        Francisco de Goya, <cite>The Forge</cite>, c. 1815–20
      </>
    ),
    museum: 'The Frick Collection',
    nod: 'A nod to the name',
    frame: 'border-[#5e4c36]',
  },
}

// A project's painting, framed and hung on a wall, for the home page's cards and the bio's
// hover previews. Its credit shows in the previews and on the case study page. The height
// is set and the width follows from the width and height attributes, so the frame has
// its size before the lazy image loads; on a narrow screen a wide painting is cropped at
// the sides rather than squashed.
//
// Page transitions carry the painting itself, not the wall: it keeps its shape between a
// card and a case study, so it moves and scales cleanly (see styles.css).
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
        className={`h-[82%] w-auto max-w-[86%] object-cover shadow-[0_6px_18px_rgba(0,0,0,0.25)] border-2 [view-transition-class:painting] ${painting.frame}`}
      />
    </div>
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
// like a museum label. A painting that isn't clearly wide (a portrait, Mondrian's square)
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
        className={`mx-auto h-auto w-full shadow-[0_10px_30px_rgba(0,0,0,0.22)] border-4 [view-transition-class:painting] ${painting.frame}`}
      />
      <figcaption className="mt-3 font-mono text-xs text-muted">
        {painting.nod}: {painting.credit}. {painting.museum}.
      </figcaption>
    </figure>
  )
}
