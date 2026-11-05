import type { CSSProperties } from 'react'

// Company marks that sit next to a case study's title. Their pieces arrive one after
// another once, on page load: a CSS animation, so it runs even while the page is still
// busy. Reduced motion keeps only the fade.
//
// Offsets are in each mark's own viewBox units (CSS px on an SVG element are user
// units), so a larger viewBox needs larger numbers for the same on-screen distance.
const enter =
  '[animation:piece-in_500ms_var(--ease-out)_backwards] motion-reduce:[animation:fade-in_300ms_var(--ease-out)_backwards]'

function piece(x: number, y: number, delay: number): CSSProperties {
  return { '--piece-x': `${x}px`, '--piece-y': `${y}px`, animationDelay: `${delay}ms` } as CSSProperties
}

// Softr's mark: a wide bar over a circle and a rounded square.
export function SoftrMark({ className }: { className?: string }) {
  return (
    <svg viewBox="-4.5 -3.5 40 40" aria-hidden="true" className={className}>
      <rect
        x="1"
        y="2"
        width="29"
        height="13"
        rx="4.5"
        fill="#fcb500"
        className={enter}
        style={piece(0, -6, 100)}
      />
      <circle
        cx="7.5"
        cy="24.5"
        r="6.5"
        fill="#f53878"
        className={enter}
        style={piece(-6, 0, 160)}
      />
      <rect
        x="17"
        y="18"
        width="13"
        height="13"
        rx="4"
        fill="#386af5"
        className={enter}
        style={piece(6, 0, 220)}
      />
    </svg>
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
// the near-black dark background. The bubbles arrive one after the other, like two
// sides of a conversation.
export function MeerlumeMark({ className }: { className?: string }) {
  return (
    <svg viewBox="-6 -6 524 524" aria-hidden="true" className={className}>
      <path d={meerlume.tile} fill="#09090b" stroke="var(--line)" strokeWidth="12" className={enter} />
      <path
        d={meerlume.back}
        fill="#fff"
        className={enter}
        style={piece(-40, 0, 120)}
      />
      <g
        className={enter}
        style={piece(40, 0, 220)}
      >
        <path d={meerlume.keyline} fill="#09090b" />
        <path d={meerlume.front} fill="#f59e0b" />
      </g>
    </svg>
  )
}

// Goya's mark: a ring with a dot above it and a tail curving below, like a "g". The
// ring takes the text color so it stays visible in dark mode; the green is Goya's.
const goyaGreen = '#12c990'

export function GoyaMark({ className }: { className?: string }) {
  return (
    <svg viewBox="-12 -12 206 334" aria-hidden="true" className={className}>
      <circle
        cx="91"
        cy="123"
        r="68.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="37"
        className={enter}
        style={piece(0, -36, 100)}
      />
      <circle
        cx="163"
        cy="19"
        r="16"
        fill={goyaGreen}
        className={enter}
        style={piece(30, -30, 180)}
      />
      <path
        d="M66 284 Q118 306 152 257"
        fill="none"
        stroke={goyaGreen}
        strokeWidth="32"
        strokeLinecap="round"
        className={enter}
        style={piece(-36, 0, 260)}
      />
    </svg>
  )
}
