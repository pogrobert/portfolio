import type { ComponentType, ReactNode } from 'react'
import type { Slug } from '../content/projects'

// Company marks that sit next to a case study's title. They're still: the case study's
// painting moves in as the page opens, and a moving mark beside it would compete with it.

// A mark is sized by its height alone and takes its shape from its viewBox, so one that
// isn't square (Goya's) sits beside a title the same way as the rest.
function Mark({ className, viewBox, children }: { className?: string; viewBox: string; children: ReactNode }) {
  const [, , width, height] = viewBox.split(' ')
  return (
    <svg
      aria-hidden="true"
      viewBox={viewBox}
      className={`inline-block shrink-0 overflow-visible ${className ?? ''}`}
      style={{ aspectRatio: `${width} / ${height}` }}
    >
      {children}
    </svg>
  )
}

// Softr's mark: a wide bar over a circle and a rounded square.
const softrBox = '-4.5 -3.5 40 40'

export function SoftrMark({ className }: { className?: string }) {
  return (
    <Mark className={className} viewBox={softrBox}>
      <rect x="1" y="2" width="29" height="13" rx="4.5" fill="#fcb500" />
      <circle cx="7.5" cy="24.5" r="6.5" fill="#f53878" />
      <rect x="17" y="18" width="13" height="13" rx="4" fill="#386af5" />
    </Mark>
  )
}

// Meerlume's mark: an ink tile with two chat bubbles, white behind and amber in front.
// An ink keyline around the amber bubble separates the two where they overlap. Paths
// from Meerlume's Logo.tsx, on its 512 grid.
const meerlume = {
  tile: 'M224 0L288 0C366.4 0 405.6 0 435.6 15.3C461.9 28.7 483.3 50.1 496.7 76.4C512 106.4 512 145.6 512 224L512 288C512 366.4 512 405.6 496.7 435.6C483.3 461.9 461.9 483.3 435.6 496.7C405.6 512 366.4 512 288 512L224 512C145.6 512 106.4 512 76.4 496.7C50.1 483.3 28.7 461.9 15.3 435.6C0 405.6 0 366.4 0 288L0 224C0 145.6 0 106.4 15.3 76.4C28.7 50.1 50.1 28.7 76.4 15.3C106.4 0 145.6 0 224 0Z',
  back: 'M180 92L216 92C238.3 92 249.5 92 258.6 94.8C279 101 295 117 301.2 137.4C304 146.5 304 157.7 304 180C304 202.3 304 213.5 301.2 222.6C295 243 279 259 258.6 265.2C249.5 268 238.3 268 216 268L180 268C157.7 268 146.5 268 137.4 265.2C117 259 101 243 94.8 222.6C92 213.5 92 202.3 92 180C92 157.7 92 146.5 94.8 137.4C101 117 117 101 137.4 94.8C146.5 92 157.7 92 180 92Z',
  keyline:
    'M296 230L332 230C354.3 230 365.5 230 374.7 232.3C402.8 239.2 424.8 261.2 431.7 289.3C434 298.5 434 309.7 434 332C434 354.3 434 365.5 431.7 374.7C424.8 402.8 402.8 424.8 374.7 431.7C365.5 434 354.3 434 332 434L296 434C273.7 434 262.5 434 253.3 431.7C225.2 424.8 203.2 402.8 196.3 374.7C194 365.5 194 354.3 194 332C194 309.7 194 298.5 196.3 289.3C203.2 261.2 225.2 239.2 253.3 232.3C262.5 230 273.7 230 296 230Z',
  front:
    'M296 244L332 244C354.3 244 365.5 244 374.6 246.8C395 253 411 269 417.2 289.4C420 298.5 420 309.7 420 332C420 354.3 420 365.5 417.2 374.6C411 395 395 411 374.6 417.2C365.5 420 354.3 420 332 420L296 420C273.7 420 262.5 420 253.4 417.2C233 411 217 395 210.8 374.6C208 365.5 208 354.3 208 332C208 309.7 208 298.5 210.8 289.4C217 269 233 253 253.4 246.8C262.5 244 273.7 244 296 244Z',
}

// The tile is ink in both themes, as on meerlume.com; a hairline keeps its edge on
// the near-black dark background.
const meerlumeBox = '-6 -6 524 524'

export function MeerlumeMark({ className }: { className?: string }) {
  return (
    <Mark className={className} viewBox={meerlumeBox}>
      <path d={meerlume.tile} fill="#09090b" stroke="var(--line)" strokeWidth="12" />
      <path d={meerlume.back} fill="#fff" />
      <path d={meerlume.keyline} fill="#09090b" />
      <path d={meerlume.front} fill="#f59e0b" />
    </Mark>
  )
}

// Goya's mark: a ring with a dot above it and a tail curving below, like a "g". The
// ring takes the text color so it stays visible in dark mode; the green is Goya's.
const goyaGreen = '#12c990'
const goyaBox = '-12 -12 206 334'

export function GoyaMark({ className }: { className?: string }) {
  return (
    <Mark className={className} viewBox={goyaBox}>
      <circle cx="91" cy="123" r="68.5" fill="none" stroke="currentColor" strokeWidth="37" />
      <circle cx="163" cy="19" r="16" fill={goyaGreen} />
      <path d="M66 284 Q118 306 152 257" fill="none" stroke={goyaGreen} strokeWidth="32" strokeLinecap="round" />
    </Mark>
  )
}

// Stamplyn's app icon: a stamp on a lime tile, with its corner peeled back.
const stamplyn = {
  stamp:
    'M212,236.23l0,-24.23l24.23,0c0,28.02 22.75,50.77 50.77,50.77c28.02,0 50.77,-22.75 50.77,-50.77l48.46,0c0,28.02 22.75,50.77 50.77,50.77c28.02,0 50.77,-22.75 50.77,-50.77l48.46,0c0,28.02 22.75,50.77 50.77,50.77c28.02,0 50.77,-22.75 50.77,-50.77l48.46,0c0,28.02 22.75,50.77 50.77,50.77c28.02,0 50.77,-22.75 50.77,-50.77l24.23,0l0,24.23c-28.02,0 -50.77,22.75 -50.77,50.77c0,28.02 22.75,50.77 50.77,50.77l0,48.46c-28.02,0 -50.77,22.75 -50.77,50.77c0,28.02 22.75,50.77 50.77,50.77l0,48.46c-19.25,0 -36.01,10.74 -44.62,26.54l-204.61,-0l0,204.61c-15.8,8.61 -26.54,25.37 -26.54,44.62l-48.46,0c0,-28.02 -22.75,-50.77 -50.77,-50.77c-28.02,0 -50.77,22.75 -50.77,50.77l-48.46,0c0,-28.02 -22.75,-50.77 -50.77,-50.77c-28.02,0 -50.77,22.75 -50.77,50.77l-24.23,0l0,-24.23c28.02,0 50.77,-22.75 50.77,-50.77c0,-28.02 -22.75,-50.77 -50.77,-50.77l0,-48.46c28.02,0 50.77,-22.75 50.77,-50.77c0,-28.02 -22.75,-50.77 -50.77,-50.77l0,-48.46c28.02,0 50.77,-22.75 50.77,-50.77c0,-28.02 -22.75,-50.77 -50.77,-50.77l0,-48.46c28.02,0 50.77,-22.75 50.77,-50.77c0,-28.02 -22.75,-50.77 -50.77,-50.77Zm362.31,158.08c-25.47,0 -46.15,20.68 -46.15,46.15c0,25.47 20.68,46.15 46.15,46.15c25.47,0 46.15,-20.68 46.15,-46.15c0,-25.47 -20.68,-46.15 -46.15,-46.15Zm11.54,34.62c7,0 12.69,5.69 12.69,12.69c0,7 -5.69,12.69 -12.69,12.69c-7,0 -12.69,-5.69 -12.69,-12.69c0,-7 5.69,-12.69 12.69,-12.69Zm-168.47,-34.62c-25.47,0 -46.15,20.68 -46.15,46.15c0,25.47 20.68,46.15 46.15,46.15c25.47,0 46.15,-20.68 46.15,-46.15c0,-25.47 -20.68,-46.15 -46.15,-46.15Zm11.54,34.62c7,0 12.69,5.69 12.69,12.69c0,7 -5.69,12.69 -12.69,12.69c-7,0 -12.69,-5.69 -12.69,-12.69c0,-7 5.69,-12.69 12.69,-12.69Z',
  corner: 'M592.77 592.77H812L592.77 812Z',
}

const stamplynBox = '0 0 1024 1024'

export function StamplynMark({ className }: { className?: string }) {
  return (
    <Mark className={className} viewBox={stamplynBox}>
      <rect width="1024" height="1024" rx="230" fill="#C6F24E" />
      <path d={stamplyn.stamp} fill="#1B1B1F" fillRule="evenodd" />
      <path d={stamplyn.corner} fill="#1B1B1F" />
    </Mark>
  )
}

// Each project's mark.
export const marks: Record<Slug, ComponentType<{ className?: string }>> = {
  meerlume: MeerlumeMark,
  stamplyn: StamplynMark,
  softr: SoftrMark,
  goya: GoyaMark,
}
