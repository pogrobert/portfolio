import { createFileRoute, notFound } from '@tanstack/react-router'
import type { ComponentType } from 'react'
import { CaseStudyHeader } from '../../components/CaseStudySections'
import { HomeLink } from '../../components/HomeLink'
import { MeerlumeCaseStudy } from '../../components/MeerlumeCaseStudy'
import { SoftrCaseStudy } from '../../components/SoftrCaseStudy'
import { StamplynCaseStudy } from '../../components/StamplynCaseStudy'
import { SurfacesCaseStudy } from '../../components/SurfacesCaseStudy'
import { getProject, type Project, type Slug } from '../../content/projects'
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
          { property: 'og:image', content: `${site.url}/previews/${loaderData.slug}.jpg` },
        ]
      : [],
  }),
  component: CaseStudyPage,
})

// Case studies with their own page; the rest share CaseStudy below.
const pages: Partial<Record<Slug, ComponentType<{ project: Project }>>> = {
  softr: SoftrCaseStudy,
  meerlume: MeerlumeCaseStudy,
  stamplyn: StamplynCaseStudy,
  surfaces: SurfacesCaseStudy,
}

function CaseStudyPage() {
  const project = Route.useLoaderData()
  const Page = pages[project.slug] ?? CaseStudy
  return (
    <main className="mx-auto max-w-2xl px-4 pt-16 pb-24 sm:px-6 sm:pt-24">
      <nav aria-label="Site">
        <HomeLink className="text-sm text-muted no-underline hover:text-fg">{site.name}</HomeLink>
      </nav>
      {/* An article, so reader views know where the case study starts and ends: the name
          link above it is navigation. */}
      <article>
        <Page project={project} />
      </article>
    </main>
  )
}

// A job made of several projects, told in order.
function CaseStudy({ project }: { project: Project }) {
  return (
    <>
      <CaseStudyHeader project={project}>{project.summary}</CaseStudyHeader>
      {project.timeline && (
        <ol className="mt-12 flex flex-col gap-8">
          {project.timeline.map((step) => (
            <li key={step.title}>
              <h2 className="font-semibold">{step.title}</h2>
              <p className="mt-1 text-body">{step.text}</p>
            </li>
          ))}
        </ol>
      )}
    </>
  )
}
