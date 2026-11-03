import { Link, createFileRoute } from '@tanstack/react-router'
import { Demo } from '../components/Demo'
import { LocalTime } from '../components/LocalTime'
import { projects, type Project } from '../content/projects'
import { experience } from '../content/site'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return (
    <main id="content" className="mx-auto max-w-2xl px-4 pt-16 pb-24 sm:px-6 sm:pt-20">
      <p className="font-mono text-[13px] text-muted">
        <LocalTime /> · open to senior roles
      </p>
      <h1 className="mt-4 text-[32px] leading-tight font-semibold tracking-tight text-balance">
        I build products end to end, from the first sketch to billing and deploys.
      </h1>
      <p className="mt-6 text-body">
        Senior product engineer. Co-founder of <a href="#meerlume">Meerlume</a> and{' '}
        <a href="#stamplyn">Stamplyn</a>, author of <a href="#surfaces">Surfaces</a>. Before that, three years
        on the blocks team at <a href="#softr">Softr</a>, a no-code platform with over a million users.
      </p>

      <section id="work" className="mt-22 scroll-mt-8">
        <h2 className="mb-6 font-mono text-[13px] font-medium text-muted">Selected work</h2>
        <div className="flex flex-col gap-14">
          {projects.map((project) => (
            <WorkItem key={project.slug} project={project} />
          ))}
        </div>
      </section>

      <section id="experience" className="mt-24 scroll-mt-8">
        <h2 className="mb-4 font-mono text-[13px] font-medium text-muted">Experience</h2>
        <ul className="border-b border-line">
          {experience.map((item) => (
            <li
              key={item.org}
              className="flex flex-wrap justify-between gap-2 border-t border-line py-3.5"
            >
              <span>
                {item.org} · {item.role}
              </span>
              <span className="font-mono text-[13px] text-muted">{item.period}</span>
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}

function WorkItem({ project }: { project: Project }) {
  const meta = (
    <div className="flex flex-wrap items-baseline justify-between gap-2">
      <h3 className="text-lg font-semibold">{project.name}</h3>
      <span className="font-mono text-[13px] text-muted">
        {project.role} · {project.period}
      </span>
    </div>
  )

  return (
    <article id={project.slug} className="flex scroll-mt-8 flex-col gap-3.5">
      {project.caseStudy ? (
        <Link
          to="/work/$slug"
          params={{ slug: project.slug }}
          className="group flex flex-col gap-3.5 no-underline"
        >
          <div className="transition-transform duration-300 group-hover:-translate-y-0.5">
            <Demo kind={project.demo} />
          </div>
          {meta}
        </Link>
      ) : (
        <>
          <Demo kind={project.demo} />
          {meta}
        </>
      )}
      <p className="text-body">{project.summary}</p>
    </article>
  )
}
