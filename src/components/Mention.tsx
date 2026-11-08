import { Link } from '@tanstack/react-router'
import { useState, type ReactNode } from 'react'
import type { DemoKind } from '../content/projects'
import { Demo, paintings } from './Demo'

type MentionProps = {
  children: ReactNode
  // A case study to link to; mentions without one are plain text.
  slug?: string
  // Shown in a small card above the name on hover or keyboard focus, with the
  // painting's credit under it at full size.
  preview?: DemoKind
}

// Once one preview has been open, the next opens at once: someone moving from name to
// name is reading previews, not passing by. 300ms is Radix Tooltip's skip window.
let lastClosed = 0
const skipWindow = 300

// A name in running text with a hover preview. The preview holds block elements,
// so a Mention can't sit inside a <p>; the bio uses divs.
export function Mention({ children, slug, preview }: MentionProps) {
  const [instant, setInstant] = useState(false)
  return (
    <span
      className="group relative inline-block"
      onPointerEnter={() => setInstant(performance.now() - lastClosed < skipWindow)}
      onPointerLeave={() => {
        lastClosed = performance.now()
        setInstant(false)
      }}
    >
      {slug ? (
        // Bold already marks the name; the underline appears on hover.
        <Link to="/work/$slug" params={{ slug }} className="font-medium text-fg no-underline hover:underline">
          {children}
        </Link>
      ) : (
        <span className="font-medium text-fg">{children}</span>
      )}
      {preview && (
        // Hover previews are a mouse nicety: touch screens and screen readers get the link alone.
        // They open after a short wait, so reading past a name doesn't flash one open, and close
        // at once; keyboard focus opens them straight away. Reduced motion keeps only the fade.
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 hidden w-64 origin-bottom -translate-x-1/2 opacity-0 transition-[opacity,translate,scale] motion-safe:translate-y-1 motion-safe:scale-[0.97] group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:scale-100 group-focus-within:opacity-100 group-focus-within:delay-0 pointer-fine:block ${instant ? 'duration-0' : 'duration-200 group-hover:delay-300'}`}
        >
          <span className="block overflow-hidden rounded-2xl bg-bg p-1 shadow-xl ring-1 ring-line">
            <span className="block [zoom:0.5]">
              <Demo kind={preview} />
            </span>
            <span className="block px-2 pt-1.5 pb-1 font-mono text-[11px] text-muted">{paintings[preview].credit}</span>
          </span>
        </span>
      )}
    </span>
  )
}
