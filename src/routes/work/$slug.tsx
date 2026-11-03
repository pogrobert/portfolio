import { Link, createFileRoute, notFound } from '@tanstack/react-router'
import { Demo } from '../../components/Demo'
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

function CaseStudyPage() {
  const project = Route.useLoaderData()
  return (
    <main id="content" className="mx-auto max-w-2xl px-4 pt-10 pb-24 sm:px-6">
      <Link to="/" hash={project.slug} className="text-sm text-muted no-underline hover:text-fg">
        ← All work
      </Link>
      {project.slug === 'softr' ? <SoftrCaseStudy /> : <CaseStudy project={project} />}
    </main>
  )
}

function CaseStudy({ project }: { project: Project }) {
  return (
    <>
      <p className="mt-8 font-mono text-[13px] text-muted">
        {project.role} · {project.period}
      </p>
      <h1 className="mt-2 text-4xl font-semibold tracking-tight">{project.name}</h1>
      <p className="mt-5 text-lg text-body">{project.summary}</p>
      <div className="mt-8">
        <Demo kind={project.demo} size="hero" />
      </div>
      <ul className="mt-10 flex flex-col gap-3 border-l border-line pl-5 text-body">
        {project.highlights.map((h) => (
          <li key={h}>{h}</li>
        ))}
      </ul>
      <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-5">
        <p className="font-mono text-[13px] text-muted">{project.stack.join(' · ')}</p>
        {project.link && <a href={project.link.href}>{project.link.label} ↗</a>}
      </div>
    </>
  )
}
