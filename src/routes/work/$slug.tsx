import { Link, createFileRoute, notFound } from '@tanstack/react-router'
import type { ComponentType } from 'react'
import { Demo } from '../../components/Demo'
import { GoyaMark } from '../../components/Marks'
import { MeerlumeCaseStudy } from '../../components/MeerlumeCaseStudy'
import { SoftrCaseStudy } from '../../components/SoftrCaseStudy'
import { getProject, type Project } from '../../content/projects'
import { site } from '../../content/site'

export const Route = createFileRoute('/work/$slug')({
  loader: ({ params }) => {
    const project = getProject(params.slug)
    if (!project) throw notFound()
    return project
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.name} · ${site.name}` },
          { name: 'description', content: loaderData.summary },
          { property: 'og:title', content: `${loaderData.name} · ${site.name}` },
          { property: 'og:description', content: loaderData.summary },
        ]
      : [],
  }),
  component: CaseStudyPage,
})

// Case studies with their own layout; the rest share CaseStudy below.
const pages: Partial<Record<string, ComponentType>> = { softr: SoftrCaseStudy, meerlume: MeerlumeCaseStudy }

function CaseStudyPage() {
  const project = Route.useLoaderData()
  const Page = pages[project.slug]
  return (
    <main id="content" className="mx-auto max-w-2xl px-4 pt-16 pb-24 sm:px-6 sm:pt-24">
      <Link to="/" hash={project.slug} className="text-sm text-muted no-underline hover:text-fg">
        ← {site.name}
      </Link>
      {Page ? <Page /> : <CaseStudy project={project} />}
    </main>
  )
}

// Former employers get their mark beside the title, like Softr's on its own page.
const marks: Partial<Record<string, ComponentType<{ className?: string }>>> = { goya: GoyaMark }

function CaseStudy({ project }: { project: Project }) {
  const Mark = marks[project.slug]
  return (
    <>
      <h1 className="mt-8 flex items-center gap-3 text-4xl font-semibold tracking-tight">
        {Mark && <Mark className="h-10 w-auto" />}
        {project.name}
      </h1>
      <p className="mt-3 font-mono text-[13px] text-muted">
        {project.role} · {project.period}
      </p>
      <p className="mt-5 text-lg text-body">{project.summary}</p>
      {project.link && (
        <p className="mt-4">
          <a href={project.link.href}>{project.link.label} ↗</a>
        </p>
      )}
      <figure className="mt-8">
        <Demo kind={project.demo} size="hero" />
        {project.credit && <figcaption className="mt-2 font-mono text-xs text-muted">{project.credit}</figcaption>}
      </figure>
      {project.timeline ? (
        <ol className="mt-12 flex flex-col gap-8">
          {project.timeline.map((step) => (
            <li key={step.title}>
              <h2 className="font-semibold">{step.title}</h2>
              <p className="mt-1 text-body">{step.text}</p>
            </li>
          ))}
        </ol>
      ) : (
        <ul className="mt-10 flex flex-col gap-3 border-l border-line pl-5 text-body">
          {project.highlights.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>
      )}
    </>
  )
}
