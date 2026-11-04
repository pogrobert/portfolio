import type { CSSProperties } from 'react'

// Company marks that sit next to a case study's title. Their pieces arrive one after
// another on page load, a CSS animation so it runs even while the page is still busy,
// and spread a touch on hover. Reduced motion keeps only the fade.
//
// Offsets are in each mark's own viewBox units (CSS px on an SVG element are user
// units), so a larger viewBox needs larger numbers for the same on-screen distance.
const enter =
  '[animation:piece-in_500ms_var(--ease-out)_backwards] motion-reduce:[animation:fade-in_300ms_var(--ease-out)_backwards]'
const hover = 'transition-[translate] duration-200 ease-[ease]'

function piece(x: number, y: number, delay: number): CSSProperties {
  return { '--piece-x': `${x}px`, '--piece-y': `${y}px`, animationDelay: `${delay}ms` } as CSSProperties
}

// Softr's mark: a wide bar over a circle and a rounded square.
export function SoftrMark({ className }: { className?: string }) {
  return (
    <svg viewBox="-4.5 -3.5 40 40" aria-hidden="true" className={`group/mark ${className ?? ''}`}>
      <rect
        x="1"
        y="2"
        width="29"
        height="13"
        rx="4.5"
        fill="#fcb500"
        className={`${enter} ${hover} motion-safe:group-hover/mark:-translate-y-[1.5px]`}
        style={piece(0, -6, 100)}
      />
      <circle
        cx="7.5"
        cy="24.5"
        r="6.5"
        fill="#f53878"
        className={`${enter} ${hover} motion-safe:group-hover/mark:-translate-x-[1.5px] motion-safe:group-hover/mark:translate-y-[1px]`}
        style={piece(-6, 0, 160)}
      />
      <rect
        x="17"
        y="18"
        width="13"
        height="13"
        rx="4"
        fill="#386af5"
        className={`${enter} ${hover} motion-safe:group-hover/mark:translate-x-[1.5px] motion-safe:group-hover/mark:translate-y-[1px]`}
        style={piece(6, 0, 220)}
      />
    </svg>
  )
}

// Goya's mark: a ring with a dot above it and a tail curving below, like a "g". The
// ring takes the text color so it stays visible in dark mode; the green is Goya's.
const goyaGreen = '#12c990'

export function GoyaMark({ className }: { className?: string }) {
  return (
    <svg viewBox="-12 -12 206 334" aria-hidden="true" className={`group/mark ${className ?? ''}`}>
      <circle
        cx="91"
        cy="123"
        r="68.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="37"
        className={`${enter} ${hover}`}
        style={piece(0, -36, 100)}
      />
      <circle
        cx="163"
        cy="19"
        r="16"
        fill={goyaGreen}
        className={`${enter} ${hover} motion-safe:group-hover/mark:translate-x-[10px] motion-safe:group-hover/mark:-translate-y-[10px]`}
        style={piece(30, -30, 180)}
      />
      <path
        d="M66 284 Q118 306 152 257"
        fill="none"
        stroke={goyaGreen}
        strokeWidth="32"
        strokeLinecap="round"
        className={`${enter} ${hover} motion-safe:group-hover/mark:translate-y-[10px]`}
        style={piece(-36, 0, 260)}
      />
    </svg>
  )
}
