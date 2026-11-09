import type { ComponentType, ReactNode } from 'react'

// A section can have a line drawing of its subject in the page margin, alternating
// sides. It only shows where the screen is wide enough to have a margin, and plays when
// the drawing itself is hovered (it's its own hover group), not the text beside it.
export function Section({
  title,
  art: Art,
  side,
  link,
  heading: Heading = 'h2',
  children,
}: {
  title: string
  art?: ComponentType<{ className?: string }>
  side?: 'left' | 'right'
  link?: { label: string; href: string }
  // h3 when the sections sit under a heading of their own.
  heading?: 'h2' | 'h3'
  children: ReactNode
}) {
  const place = side === 'right' ? 'left-full ml-16' : 'right-full mr-16'
  return (
    <section>
      <Heading className="text-xl font-semibold tracking-tight">{title}</Heading>
      {/* The drawing lines up with the text, not the title above it. */}
      <div className="relative mt-3">
        {/* Plain text becomes a paragraph, so it reads as one in reader views too. */}
        <div className="flex flex-col gap-3 text-body">
          {typeof children === 'string' ? <p>{children}</p> : children}
        </div>
        {link && (
          <a href={link.href} className="mt-3 inline-block text-sm text-muted hover:text-fg">
            {link.label}
            {/* Several sections link to the same docs; this tells their links apart. */}
            <span className="sr-only">: {title}</span> <span aria-hidden="true">↗</span>
          </a>
        )}
        {Art && (
          <Art
            className={`group absolute top-1 hidden w-48 text-muted opacity-70 min-[1240px]:block ${place}`}
          />
        )}
      </div>
    </section>
  )
}

export function Note({ title, children }: { title: string; children: string }) {
  return (
    <div className="border-t border-line pt-4">
      <h3 className="font-semibold">{title}</h3>
      <p className="mt-2 text-[0.9375rem] text-body">{children}</p>
    </div>
  )
}
