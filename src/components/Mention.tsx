import { Link } from '@tanstack/react-router'
import type { ReactNode } from 'react'
import type { DemoKind } from '../content/projects'
import { Demo } from './Demo'

// Goya, the company, is pictured with a painting by the artist it shares a name with.
export const goyaCredit = (
  <>
    Francisco de Goya, <cite>The Forge</cite>, c. 1815–20
  </>
)

type MentionProps = {
  children: ReactNode
  // A case study to link to; mentions without one are plain text.
  slug?: string
  // Shown in a small card above the name on hover or keyboard focus.
  preview?: DemoKind
  // Full-size text under the half-size preview.
  caption?: ReactNode
}

// A name in running text with a hover preview. The preview holds block elements,
// so a Mention can't sit inside a <p>; the bio uses divs.
export function Mention({ children, slug, preview, caption }: MentionProps) {
  return (
    <span className="group relative inline-block">
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
        <span
          aria-hidden="true"
          className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 hidden w-64 -translate-x-1/2 translate-y-1 opacity-0 transition duration-200 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100 pointer-fine:block"
        >
          <span className="block overflow-hidden rounded-2xl bg-bg p-1 shadow-xl ring-1 ring-line">
            <span className="block [zoom:0.5]">
              <Demo kind={preview} />
            </span>
            {caption && <span className="block px-2 pt-1.5 pb-1 font-mono text-[11px] text-muted">{caption}</span>}
          </span>
        </span>
      )}
    </span>
  )
}
