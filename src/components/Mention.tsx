import { Link } from '@tanstack/react-router'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import type { DemoKind } from '../content/projects'
import { Credit, Demo, paintings } from './Demo'

type MentionProps = {
  children: ReactNode
  // A case study to link to; mentions without one are plain text.
  slug?: string
  // Shown in a small card above the name on hover or keyboard focus, with the
  // painting's credit under it at full size.
  preview?: DemoKind
}

// Shown on hover or keyboard focus, with a fine pointer only. starting: is the style it fades
// in from when it starts being displayed; closing fades back to the resting style above,
// and display switches off when that fade ends (transition-discrete).
const shown =
  'pointer-fine:group-hover:block pointer-fine:group-focus-within:block group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100 group-focus-within:opacity-100 group-focus-within:translate-y-0 group-focus-within:scale-100 group-focus-within:delay-0 starting:opacity-0 motion-safe:starting:translate-y-1 motion-safe:starting:scale-[0.97]'

// Once one preview has been open, the next opens at once: someone moving from name to
// name is reading previews, not passing by. 300ms is Radix Tooltip's skip window.
let lastClosed = 0
const skipWindow = 300

// A name in running text with a hover preview. The preview holds block elements,
// so a Mention can't sit inside a <p>; the bio uses divs.
export function Mention({ children, slug, preview }: MentionProps) {
  const [instant, setInstant] = useState(false)
  // Escape closes an open preview until the pointer or focus comes back (WCAG 1.4.13). It's
  // heard on the whole page: a preview opened by the pointer doesn't have keyboard focus.
  const [dismissed, setDismissed] = useState(false)
  const root = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && root.current?.matches(':hover, :focus-within')) setDismissed(true)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])
  return (
    <span
      ref={root}
      className="group relative inline-block"
      onPointerEnter={() => {
        setDismissed(false)
        setInstant(performance.now() - lastClosed < skipWindow)
      }}
      onPointerLeave={() => {
        lastClosed = performance.now()
        setInstant(false)
      }}
      onFocus={() => setDismissed(false)}
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
        //
        // Closed, a preview isn't displayed at all, so it can't widen the page; it fades in from
        // its starting style when shown. The 8px under it is padding rather than a margin, so
        // the pointer can move onto the preview without crossing a gap that would close it.
        <span
          aria-hidden="true"
          className={`absolute bottom-full left-1/2 z-10 hidden w-64 origin-bottom -translate-x-1/2 pb-2 opacity-0 transition-[opacity,translate,scale,display] transition-discrete motion-safe:translate-y-1 motion-safe:scale-[0.97] ${dismissed ? '' : shown} ${instant || dismissed ? 'duration-0' : 'duration-200 group-hover:delay-300'}`}
        >
          <span className="block overflow-hidden rounded-2xl bg-bg p-1 shadow-xl ring-1 ring-line">
            <span className="block [zoom:0.5]">
              <Demo kind={preview} />
            </span>
            <span className="block px-2 pt-1.5 pb-1 font-mono text-[0.6875rem] text-muted">
              <Credit painting={paintings[preview]} />
            </span>
          </span>
        </span>
      )}
    </span>
  )
}
