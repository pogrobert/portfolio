import type { ComponentType, ReactNode } from 'react'
import type { Project } from '../content/projects'
import { marks } from './Marks'
import { PaintingFigure } from './Painting'
import { Period } from './Period'

// The top of every case study: the mark beside the title, the role and dates, the
// painting as the cover, then the summary and the project's own links.
export function CaseStudyHeader({ project, children }: { project: Project; children: ReactNode }) {
  const Mark = marks[project.slug]
  return (
    <>
      <h1 className="mt-8 flex items-center gap-3 text-4xl font-semibold tracking-tight">
        <Mark className="h-10 w-auto" />
        {project.name}
      </h1>
      <p className="mt-3 font-mono text-[0.8125rem] text-muted">
        {project.role}
        {project.team && `, ${project.team}`} · {project.dates ?? <Period period={project.period} />}
      </p>
      <PaintingFigure slug={project.slug} />
      <p className="mt-5 text-lg text-body">{children}</p>
      {project.links && (
        <p className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
          {project.links.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label} <span aria-hidden="true">↗</span>
            </a>
          ))}
        </p>
      )}
    </>
  )
}

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
