import { useId, type CSSProperties, type ReactNode } from 'react'

// Line drawings of Softr blocks, modeled on how the real blocks look in Softr's docs.
// One line weight throughout: containers at full strength, "text" at half. Each is
// filled with the page background, so it works in both themes and hides what it
// overlaps. On hover of the nearest `group` (the drawing itself, on the case study)
// each one acts out what the block does.
//
// Motion follows Emil Kowalski's rules: CSS transitions on transform and opacity only,
// strong ease-in-out for things moving on screen, ease-out for fades, small staggers,
// and movement dropped for reduced motion (fades stay).

const move = 'transition-[translate] duration-450 ease-in-out'
const fade = 'transition-opacity duration-200 ease-out'
const fadeMove = 'transition-[opacity,translate] duration-300 ease-out'
const lineGrow = 'origin-left [transform-box:fill-box] transition-[scale] duration-300 ease-out'
const text = 0.5

type Props = { className?: string }

function Drawing({
  viewBox,
  className,
  style,
  children,
}: {
  viewBox: string
  className?: string
  style?: CSSProperties
  children: ReactNode
}) {
  return (
    <svg
      viewBox={viewBox}
      aria-hidden="true"
      className={className}
      style={style}
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

function delay(ms: number): CSSProperties {
  return { transitionDelay: `${ms}ms` }
}

// A field row as Softr's form editor draws it: a small type icon, then the name.
function Field({ x, y, length }: { x: number; y: number; length: number }) {
  return (
    <>
      <rect x={x} y={y - 2.5} width="5" height="5" rx="1.5" />
      <path d={`M${x + 10} ${y} H${x + 10 + length}`} opacity={text} />
    </>
  )
}

// Conditional Form, one step at a time: on hover step one slides out, step two slides
// in, and the progress bar fills from a third to two thirds.
export function FormLinework({ className }: Props) {
  const clip = useId()
  return (
    <Drawing viewBox="0 0 200 150" className={className}>
      <clipPath id={clip}>
        <rect x="10" y="6" width="180" height="138" rx="10" />
      </clipPath>
      <rect x="10" y="6" width="180" height="138" rx="10" />
      <path d="M24 22 H176" opacity="0.3" />
      <path d="M24 22 H176" strokeWidth="1.5" className={`${lineGrow} scale-x-[0.33] motion-safe:group-hover:scale-x-[0.66]`} />
      <g clipPath={`url(#${clip})`}>
        <g className={`${move} motion-safe:group-hover:-translate-x-[170px]`}>
          <path d="M24 40 H66" />
          <Field x={24} y={60} length={92} />
          <Field x={24} y={78} length={70} />
          <Field x={24} y={96} length={84} />
          <rect x="24" y="114" width="44" height="18" rx="6" />
          <path d="M194 40 H230" />
          <Field x={194} y={60} length={64} />
          <rect x="194" y="70" width="152" height="18" rx="5" />
          <path d="M202 79 H240" opacity={text} />
          <rect x="194" y="114" width="44" height="18" rx="6" />
        </g>
      </g>
    </Drawing>
  )
}

function Comment({ y, name, body }: { y: number; name: number; body: number }) {
  return (
    <>
      <circle cx="26" cy={y} r="6" />
      <path d={`M38 ${y - 4} H${38 + name}`} />
      <path d={`M38 ${y + 4} H${38 + body}`} opacity={text} />
    </>
  )
}

// Posting a comment: on hover the input empties, the new comment slides
// in on top, and the others move down to make room.
export function CommentsLinework({ className }: Props) {
  return (
    <Drawing viewBox="0 0 200 170" className={className}>
      <rect x="8" y="6" width="184" height="158" rx="10" />
      <path d="M20 22 H58" />
      <rect x="20" y="30" width="160" height="16" rx="8" />
      <path d="M30 38 H112" className={`${lineGrow} motion-safe:group-hover:scale-x-0`} />
      <g
        className={`opacity-0 ${fadeMove} motion-safe:-translate-x-[8px] group-hover:translate-x-0 group-hover:opacity-100`}
        style={delay(200)}
      >
        <Comment y={68} name={40} body={110} />
      </g>
      <g className={`${move} motion-safe:-translate-y-[28px] group-hover:translate-y-0`} style={delay(120)}>
        <Comment y={96} name={30} body={96} />
        <Comment y={124} name={44} body={120} />
        <Comment y={152} name={26} body={80} />
      </g>
    </Drawing>
  )
}

// The profile header from Account Settings: on hover the avatar lifts, an edit
// badge pops in, and the cover drifts behind it.
export function AccountsLinework({ className }: Props) {
  const clip = useId()
  return (
    <Drawing viewBox="0 0 190 130" className={className}>
      <clipPath id={clip}>
        <rect x="4" y="4" width="182" height="60" rx="10" />
      </clipPath>
      <rect x="4" y="4" width="182" height="60" rx="10" />
      <g clipPath={`url(#${clip})`}>
        <path
          d="M40 64 L76 4 M84 64 L120 4 M128 64 L164 4 M172 64 L208 4"
          opacity="0.35"
          className="transition-[translate] duration-700 ease-in-out motion-safe:group-hover:-translate-x-[14px]"
        />
      </g>
      <g className={`${move} motion-safe:group-hover:-translate-y-[4px]`}>
        <circle cx="40" cy="66" r="20" />
        <circle cx="40" cy="60" r="6.5" />
        <path d="M28 79 C28 71 52 71 52 79" fill="none" />
        <g
          className="origin-center [transform-box:fill-box] opacity-0 motion-safe:scale-90 transition-[opacity,scale] duration-200 ease-out group-hover:opacity-100 group-hover:scale-100"
          style={delay(150)}
        >
          <circle cx="56" cy="80" r="7" />
          <path d="M53 81 h6 v-3 h-1.5 l-1 -1.2 h-1 l-1 1.2 H53 z" strokeWidth="0.8" fill="none" />
        </g>
      </g>
      <path d="M70 84 H140" />
      <path d="M70 94 H116" opacity={text} />
      <path d="M16 116 H174" opacity="0.3" />
    </Drawing>
  )
}

// Every other block: a page's blocks as slabs stacked in isometric view, each with a
// block on top (Calendar, Charts, List, Grid). On hover they fan out, one after
// another, so each block can be seen.
const width = 160 // block width, along the page
const depth = 100 // block depth, into the page
const thickness = 8
const gap = 46 // vertical space between blocks
const margin = 48 // room to fan out into
const count = 4

// Isometric projection: x runs down-right, y down-left, z straight up.
const cos = Math.cos(Math.PI / 6)
const origin = { x: depth * cos + 8 + margin, y: 8 + margin + (count - 1) * gap }

type Point = readonly [number, number]

function point(x: number, y: number, z: number): Point {
  return [origin.x + (x - y) * cos, origin.y + (x + y) / 2 - z]
}

function line(...ps: Point[]) {
  return 'M' + ps.map((p) => p.map((n) => n.toFixed(1)).join(' ')).join(' L')
}

function slab(z: number) {
  const [a, b, c, d] = [point(0, 0, z), point(width, 0, z), point(width, depth, z), point(0, depth, z)]
  const down = (p: Point): Point => [p[0], p[1] + thickness]
  return [line(a, b, c, d, a), line(b, down(b), down(c), down(d), d), line(c, down(c))].join(' ')
}

// Maps flat drawing coordinates (u along the width, v into the depth) onto a slab's top.
function topFace(z: number) {
  const [x, y] = point(0, 0, z)
  return `matrix(${cos} 0.5 ${-cos} 0.5 ${x} ${y})`
}

function CalendarTop() {
  const cols = Array.from({ length: 6 }, (_, i) => 12 + ((i + 1) * 136) / 7)
  return (
    <>
      <path d="M12 12 H44" />
      <rect x="12" y="22" width="136" height="68" rx="3" />
      <path d={[39, 56, 73].map((v) => `M12 ${v} H148`).join(' ')} opacity={text} />
      <path d={cols.map((u) => `M${u.toFixed(1)} 22 V90`).join(' ')} opacity={text} />
      <g fill="currentColor" stroke="none" opacity="0.6">
        <rect x="53" y="27" width="35" height="4" rx="2" />
        <rect x="92" y="61" width="35" height="4" rx="2" />
      </g>
    </>
  )
}

function ChartsTop() {
  const bars = [12, 16, 15, 21, 25, 30, 36, 42]
  return (
    <>
      {[12, 49, 86, 123].map((u) => (
        <rect key={u} x={u} y="10" width="25" height="14" rx="3" />
      ))}
      <rect x="12" y="32" width="88" height="58" rx="3" />
      <g fill="currentColor" stroke="none" opacity="0.6">
        {bars.map((h, i) => (
          <rect key={i} x={20 + i * 9.5} y={84 - h} width="5" height={h} rx="1.5" />
        ))}
      </g>
      <rect x="108" y="32" width="40" height="58" rx="3" />
      <circle cx="128" cy="61" r="12" />
      <circle cx="128" cy="61" r="6" />
    </>
  )
}

function ListTop() {
  return (
    <>
      <path d="M12 12 H52" />
      {[24, 46, 68].map((v) => (
        <g key={v}>
          <circle cx="20" cy={v + 8} r="6" />
          <path d={`M32 ${v + 5} H76`} />
          <path d={`M32 ${v + 11} H62`} opacity={text} />
          <rect x="120" y={v + 3} width="28" height="10" rx="5" />
        </g>
      ))}
    </>
  )
}

function GridTop() {
  return (
    <>
      {[12, 59, 106].flatMap((u) =>
        [10, 52].map((v) => (
          <g key={`${u}-${v}`}>
            <rect x={u} y={v} width="42" height="38" rx="3" />
            <rect x={u + 4} y={v + 4} width="34" height="16" rx="2" opacity={text} />
            <path d={`M${u + 4} ${v + 27} H${u + 28}`} />
          </g>
        )),
      )}
    </>
  )
}

// Top to bottom. The fan-out offsets are written out in full so Tailwind can see them.
const layers = [
  { top: CalendarTop, fan: 'motion-safe:group-hover:-translate-x-[20px] motion-safe:group-hover:-translate-y-[42px]' },
  { top: ChartsTop, fan: 'motion-safe:group-hover:translate-x-[36px] motion-safe:group-hover:-translate-y-[14px]' },
  { top: ListTop, fan: 'motion-safe:group-hover:-translate-x-[36px] motion-safe:group-hover:translate-y-[14px]' },
  { top: GridTop, fan: 'motion-safe:group-hover:translate-x-[20px] motion-safe:group-hover:translate-y-[42px]' },
]

const [right] = point(width, 0, 0)
const [, bottom] = point(width, depth, 0)
const stackWidth = Math.ceil(right + 8 + margin)
const stackHeight = Math.ceil(bottom + thickness + 8 + margin)
const stackViewBox = `0 0 ${stackWidth} ${stackHeight}`
// Where it lines up with text beside it, the drawing is lifted by its top padding (the
// room to fan out into), so the stack itself starts level with the text.
const lift = `0 -${(((8 + margin) / stackHeight) * 100).toFixed(2)}%`

// Slabs overlap on screen, so they're drawn bottom-up: each hides the lines below it.
// Strokes on the slanted tops would stretch with the projection, so they stay 1px.
export function BlocksLinework({ className, lifted }: Props & { lifted?: boolean }) {
  return (
    <Drawing
      viewBox={stackViewBox}
      className={`${className ?? ''} [&_*]:[vector-effect:non-scaling-stroke]`}
      style={lifted ? { translate: lift } : undefined}
    >
      {layers
        .map((layer, i) => ({ ...layer, i, z: (count - 1 - i) * gap }))
        .reverse()
        .map(({ top: Top, fan, i, z }) => (
          <g key={z} className={`${move} ${fan}`} style={delay(i * 40)}>
            <path d={slab(z)} />
            <g transform={topFace(z)}>
              <Top />
            </g>
          </g>
        ))}
    </Drawing>
  )
}
