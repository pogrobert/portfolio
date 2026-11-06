import type { ReactNode } from 'react'

// Line drawings for the Stamplyn page, one per section, in the same style as the hats
// (Hats.tsx) and the Softr drawings: one line weight, details at half strength, filled
// with the page background so they work in both themes. They hold still.

const text = 0.5

type Props = { className?: string }

function Drawing({ className, children }: { className?: string; children: ReactNode }) {
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

// A stamp's outline: a rectangle with round bites along every edge. Going round it
// clockwise, an arc with sweep 0 bites inward.
export function perforated(x: number, y: number, w: number, h: number, r: number, across: number, down: number) {
  const parts = [`M${x} ${y}`]
  const bite = (fromX: number, fromY: number, toX: number, toY: number) =>
    parts.push(`L${fromX} ${fromY}`, `A${r} ${r} 0 0 0 ${toX} ${toY}`)
  for (let i = 0; i < across; i++) {
    const cx = x + (w / across) * (i + 0.5)
    bite(cx - r, y, cx + r, y)
  }
  parts.push(`L${x + w} ${y}`)
  for (let i = 0; i < down; i++) {
    const cy = y + (h / down) * (i + 0.5)
    bite(x + w, cy - r, x + w, cy + r)
  }
  parts.push(`L${x + w} ${y + h}`)
  for (let i = across - 1; i >= 0; i--) {
    const cx = x + (w / across) * (i + 0.5)
    bite(cx + r, y + h, cx - r, y + h)
  }
  parts.push(`L${x} ${y + h}`)
  for (let i = down - 1; i >= 0; i--) {
    const cy = y + (h / down) * (i + 0.5)
    bite(x, cy + r, x, cy - r)
  }
  parts.push('Z')
  return parts.join(' ')
}

// The pivot: a boarding pass, with a stamp pressed over it.
export function BoardingPassLinework({ className }: Props) {
  return (
    <Drawing className={className}>
      <g transform="rotate(-6 100 72)">
        <rect x="28" y="38" width="134" height="66" rx="6" />
        <path d="M124 38 V104" strokeDasharray="3 4" opacity={text} />
        <path d="M40 52 H82 M40 62 H68" opacity={text} />
        <path d="M40 82 H60 M76 82 H100" />
        <path d="M64 82 l4 -3 l-4 -3" fill="none" opacity={text} />
        <path d="M132 54 H152 M132 64 H148" opacity={text} />
      </g>
      <path d="M58 104 q6 -4 12 0 t12 0 t12 0 M58 112 q6 -4 12 0 t12 0 t12 0" fill="none" opacity={text} />
      <circle cx="128" cy="100" r="24" />
      <circle cx="128" cy="100" r="18" fill="none" strokeDasharray="2 3" opacity={text} />
      <path d="M120 100 l5 5 l10 -10" fill="none" />
    </Drawing>
  )
}

// Leading the team: a stack of issue cards, each a brief for an agent.
export function IssuesLinework({ className }: Props) {
  return (
    <Drawing className={className}>
      <rect x="62" y="26" width="96" height="62" rx="6" transform="rotate(6 110 57)" />
      <rect x="52" y="36" width="100" height="64" rx="6" transform="rotate(-3 102 68)" />
      <rect x="44" y="52" width="104" height="68" rx="6" />
      <rect x="56" y="66" width="9" height="9" rx="2" />
      <path d="M58 70.5 l2 2 l3.5 -4" fill="none" />
      <path d="M72 70.5 H124" />
      <path d="M56 88 H134 M56 98 H120 M56 108 H96" opacity={text} />
      <path d="M164 28 V40 M158 34 H170" />
      <path d="M176 48 V54 M173 51 H179" opacity={text} />
    </Drawing>
  )
}

// The map: a country, its landmarks as dots, and a pin on one of them.
export function MapLinework({ className }: Props) {
  const dots = [
    [62, 78],
    [78, 62],
    [92, 98],
    [128, 54],
    [140, 82],
    [124, 102],
    [72, 96],
    [150, 66],
  ]
  return (
    <Drawing className={className}>
      <path d="M38 72 C44 50 68 40 86 46 C102 30 132 32 142 48 C162 50 172 72 160 90 C166 108 142 122 120 114 C102 126 74 122 62 108 C42 106 32 90 38 72 Z" />
      <path d="M62 78 Q74 68 78 62 M92 98 Q104 92 108 86" fill="none" strokeDasharray="2 3" opacity={text} />
      {dots.map(([cx, cy]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="2" fill="currentColor" stroke="none" opacity={text} />
      ))}
      <ellipse cx="108" cy="88" rx="8" ry="2" fill="none" opacity={text} />
      <path d="M108 87 C101 76 96 69 96 62 A12 12 0 0 1 120 62 C120 69 115 76 108 87 Z" />
      <circle cx="108" cy="62" r="4" />
    </Drawing>
  )
}

// The illustrations: a perforated stamp with a landmark drawn on it.
export function StampLinework({ className }: Props) {
  return (
    <Drawing className={className}>
      <path d={perforated(58, 18, 84, 112, 3, 7, 9)} />
      <rect x="68" y="28" width="64" height="68" />
      <circle cx="120" cy="42" r="5" fill="none" opacity={text} />
      <path d="M68 90 Q86 84 100 88 T132 86" fill="none" opacity={text} />
      <rect x="86" y="70" width="28" height="20" />
      <path d="M92 70 V90 M100 70 V90 M108 70 V90" opacity={text} />
      <path d="M88 70 A12 12 0 0 1 112 70" />
      <path d="M100 58 V53" />
      <path d="M82 90 H118" />
      <path d="M72 108 H108 M72 116 H94" opacity={text} />
    </Drawing>
  )
}

// Feeling native: a phone answering a tap, with a buzz on either side.
export function TapLinework({ className }: Props) {
  return (
    <Drawing className={className}>
      <rect x="70" y="12" width="60" height="126" rx="12" />
      <rect x="90" y="19" width="20" height="5" rx="2.5" opacity={text} />
      <rect x="78" y="36" width="44" height="30" rx="4" opacity={text} />
      <path d="M78 76 H118 M78 84 H106" opacity={text} />
      <circle cx="100" cy="108" r="15" fill="none" opacity={text} />
      <circle cx="100" cy="108" r="9" fill="none" />
      <circle cx="100" cy="108" r="3" fill="currentColor" stroke="none" />
      <path d="M62 52 L58 56 L62 60 L58 64 L62 68" fill="none" />
      <path d="M138 52 L142 56 L138 60 L142 64 L138 68" fill="none" />
      <path d="M52 56 L50 58 L52 60 M148 56 L150 58 L148 60" fill="none" opacity={text} />
    </Drawing>
  )
}
