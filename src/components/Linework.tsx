import type { ReactNode } from 'react'

// Line drawings of Softr blocks for the margins of the Softr case study. Pure
// decoration, drawn in the current text color and filled with the page background
// so they work in both themes and hide whatever they overlap.

function Drawing({ viewBox, className, children }: { viewBox: string; className?: string; children: ReactNode }) {
  return (
    <svg
      viewBox={viewBox}
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

// Conditional Form: step two of three, with a field shown because of a condition.
export function FormLinework({ className }: { className?: string }) {
  return (
    <Drawing viewBox="0 0 200 222" className={className}>
      <rect x="0.5" y="0.5" width="199" height="221" rx="12" />
      <path d="M16 20 H66 M74 20 H126" strokeWidth="3" />
      <path d="M134 20 H184" strokeWidth="3" opacity="0.35" />
      <path d="M16 44 H58" strokeWidth="2" />
      <rect x="16" y="54" width="168" height="28" rx="6" />
      <path d="M26 68 H84" />
      <rect x="16" y="92" width="92" height="18" rx="5" strokeDasharray="3 3" />
      <path d="M24 101 H100" opacity="0.6" />
      <path d="M16 126 H52" strokeWidth="2" />
      <rect x="16" y="136" width="168" height="28" rx="6" />
      <path d="M26 150 H48" />
      <rect x="16" y="180" width="64" height="26" rx="6" />
      <path d="M30 193 H66" />
    </Drawing>
  )
}

// Comments: the Item Details block with the comments drawer slid open over it.
export function CommentsLinework({ className }: { className?: string }) {
  return (
    <Drawing viewBox="0 0 222 202" className={className}>
      <rect x="0.5" y="0.5" width="150" height="201" rx="12" />
      <rect x="14" y="14" width="122" height="70" rx="6" />
      <path d="M22 76 L52 46 L72 66 L88 52 L128 76" fill="none" />
      <path d="M14 102 H100" strokeWidth="2" />
      <path d="M14 118 H136 M14 130 H118" />
      <rect x="14" y="152" width="58" height="22" rx="6" />
      <path d="M26 163 H60" />
      <rect x="96.5" y="16.5" width="125" height="185" rx="12" />
      <path d="M110 36 H152" strokeWidth="2" />
      <circle cx="117" cy="60" r="7" />
      <path d="M130 56 H204 M130 66 H184" />
      <circle cx="117" cy="94" r="7" />
      <path d="M130 90 H198 M130 100 H170" />
      <circle cx="117" cy="128" r="7" />
      <path d="M130 124 H202 M130 134 H160" />
      <rect x="108" y="170" width="102" height="20" rx="10" />
      <circle cx="199" cy="180" r="4" />
    </Drawing>
  )
}

// User Accounts: a sign-in card with the "forgot password" link under the fields.
export function AccountsLinework({ className }: { className?: string }) {
  return (
    <Drawing viewBox="0 0 180 202" className={className}>
      <rect x="0.5" y="0.5" width="179" height="201" rx="12" />
      <circle cx="90" cy="36" r="16" />
      <circle cx="90" cy="31" r="5" />
      <path d="M81 45 C81 39 99 39 99 45" fill="none" />
      <path d="M62 66 H118" strokeWidth="2" />
      <rect x="16" y="80" width="148" height="26" rx="6" />
      <path d="M26 93 H84" />
      <rect x="16" y="114" width="148" height="26" rx="6" />
      <g fill="currentColor" stroke="none">
        <circle cx="30" cy="127" r="2" />
        <circle cx="40" cy="127" r="2" />
        <circle cx="50" cy="127" r="2" />
        <circle cx="60" cy="127" r="2" />
        <circle cx="70" cy="127" r="2" />
      </g>
      <path d="M108 152 H164" strokeDasharray="2 3" />
      <rect x="16" y="166" width="148" height="24" rx="6" />
      <path d="M70 178 H110" />
    </Drawing>
  )
}

// Every other block: a page's blocks as thin slabs stacked in isometric view, with
// one pulled out of its slot like it's being dragged to a new place.
const width = 160 // block width, along the page
const depth = 100 // block depth, into the page
const thickness = 12
const gap = 46 // vertical space between blocks
const count = 4
const pulled = 1 // which block, from the top, is mid-drag
const pull = 44 // how far it's dragged out, along the width

// Isometric projection: x runs down-right, y down-left, z straight up.
const cos = Math.cos(Math.PI / 6)
const origin = { x: depth * cos + 8, y: 8 + (count - 1) * gap }

type Point = readonly [number, number]

function point(x: number, y: number, z: number): Point {
  return [origin.x + (x - y) * cos, origin.y + (x + y) / 2 - z]
}

function line(...ps: Point[]) {
  return 'M' + ps.map((p) => p.map((n) => n.toFixed(1)).join(' ')).join(' L')
}

function slab(z: number, shift = 0) {
  const [a, b, c, d] = [point(shift, 0, z), point(shift + width, 0, z), point(shift + width, depth, z), point(shift, depth, z)]
  const down = (p: Point): Point => [p[0], p[1] + thickness]
  return [line(a, b, c, d, a), line(b, down(b), down(c), down(d), d), line(c, down(c))].join(' ')
}

function outline(z: number) {
  return line(point(0, 0, z), point(width, 0, z), point(width, depth, z), point(0, depth, z), point(0, 0, z))
}

const levels = Array.from({ length: count }, (_, i) => (count - 1 - i) * gap)
const [right] = point(width + pull, 0, 0)
const [, bottom] = point(width, depth, 0)
const stackViewBox = `0 0 ${Math.ceil(right + 16)} ${Math.ceil(bottom + thickness + 8)}`

// Slabs overlap on screen, so they're drawn bottom-up: each hides the lines below it.
export function BlocksLinework({ className }: { className?: string }) {
  return (
    <Drawing viewBox={stackViewBox} className={className}>
      {levels
        .map((z, i) => ({ z, isPulled: i === pulled }))
        .reverse()
        .map(({ z, isPulled }) =>
          isPulled ? (
            <g key={z}>
              <path d={outline(z)} fill="none" strokeDasharray="3 4" opacity="0.6" />
              <path d={slab(z, pull)} />
            </g>
          ) : (
            <path key={z} d={slab(z)} />
          ),
        )}
    </Drawing>
  )
}
