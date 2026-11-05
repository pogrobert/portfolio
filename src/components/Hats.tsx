import type { ReactNode } from 'react'

// Line drawings of hats, one for each job on the Meerlume page, in the same style as
// the Softr drawings (Linework.tsx): one line weight, details at half strength, filled
// with the page background so they work in both themes. They hold still.

const text = 0.5

type Props = { className?: string }

function Hat({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 200 150"
      aria-hidden="true"
      className={className}
      fill="var(--bg)"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </svg>
  )
}

// Product: a captain's cap.
export function CaptainHat({ className }: Props) {
  return (
    <Hat className={className}>
      <path d="M56 60 Q60 78 64 92 H136 Q140 78 144 60 Z" />
      <ellipse cx="100" cy="58" rx="54" ry="12" />
      <path d="M62 82 H138" />
      <path d="M64 88 Q100 93 136 88" />
      <circle cx="100" cy="71" r="5" />
      <path d="M97 71 H103 M100 68 V74" opacity={text} />
      <path d="M60 92 Q100 98 140 92 Q124 106 100 107 Q76 106 60 92 Z" />
      <path d="M76 99 Q100 103 124 99" opacity={text} />
    </Hat>
  )
}

// Engineering: a hard hat, with a reflective stripe.
export function HardHat({ className }: Props) {
  const stripe = 'M55.6 82 Q100 74 144.4 82 L145.4 90 Q100 82 54.6 90 Z'
  return (
    <Hat className={className}>
      <path d="M38 104 Q100 96 162 104 Q166 110 150 112 Q100 116 50 112 Q34 110 38 104 Z" />
      <path d="M52 104 C52 62 76 40 100 40 C124 40 148 62 148 104 Z" />
      <path d={stripe} />
      <path d="M92 41 Q88 72 90 104 M108 41 Q112 72 110 104" />
      <path d="M100 40 V104" opacity={text} />
    </Hat>
  )
}

// DevOps: a firefighter's helmet from the side, with its long back brim and a shield
// on the front.
export function FireHelmet({ className }: Props) {
  const shield = 'M47 54 Q58 48 69 54 L68 74 Q58 83 48 74 Z'
  return (
    <Hat className={className}>
      <path d="M30 101 Q64 97 102 102 Q142 107 166 124 Q174 131 165 133 Q134 123 100 117 Q58 112 30 101 Z" />
      <path d="M42 102 C42 64 64 44 92 44 C120 44 140 64 142 104 Z" />
      <path d="M80 46 C100 38 128 48 140 78" />
      <path d="M84 50 C102 44 124 52 134 76" opacity={text} />
      <path d={shield} />
    </Hat>
  )
}

// Design: a beret.
export function Beret({ className }: Props) {
  return (
    <Hat className={className}>
      <path d="M64 100 C80 110 122 110 140 100 L140 106 C122 116 80 116 64 106 Z" />
      <path d="M44 94 C40 74 78 58 112 60 C146 62 168 78 158 94 C150 108 54 110 44 94 Z" />
      <path d="M106 60.5 Q107 52 112 49" />
      <path d="M62 84 Q90 74 128 76" opacity={text} />
    </Hat>
  )
}

// Marketing: a showman's top hat, with a sparkle.
export function TopHat({ className }: Props) {
  return (
    <Hat className={className}>
      <ellipse cx="100" cy="104" rx="56" ry="11" />
      <path d="M71 32 Q77 66 76 102 A24 5 0 0 0 124 102 Q123 66 129 32 Z" />
      <path d="M76.4 86 Q100 92 123.6 86 L124 97 Q100 103 76 97 Z" />
      <ellipse cx="100" cy="32" rx="29" ry="6" />
      <g>
        <path d="M140 30 L148 22" />
        <path d="M144 42 H155" />
        <path d="M134 19 L136 10" />
      </g>
    </Hat>
  )
}

// The business side: a bowler.
export function BowlerHat({ className }: Props) {
  const band = 'M60.5 86 Q100 94 139.5 86 L140 98 Q100 106 60 98 Z'
  return (
    <Hat className={className}>
      <path d="M60 98 C58 58 78 42 100 42 C122 42 142 58 140 98 Z" />
      <path d={band} />
      <path d="M38 100 Q42 90 56 95 Q100 108 144 95 Q158 90 162 100 Q150 114 100 115 Q50 114 38 100 Z" />
      <path d="M80 50 Q72 60 70 76" opacity={text} />
    </Hat>
  )
}
