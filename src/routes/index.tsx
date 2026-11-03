import { Link, createFileRoute } from '@tanstack/react-router'
import { Demo } from '../components/Demo'
import { Logo } from '../components/Logo'
import { Mention, goyaCredit } from '../components/Mention'
import { projects } from '../content/projects'
import { experience, site } from '../content/site'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return (
    <main id="content" className="mx-auto max-w-2xl px-4 pt-16 pb-24 sm:px-6 sm:pt-24">
      <h1 className="font-semibold">{site.name}</h1>
      <p className="text-muted">{site.title}</p>

      {/* Divs, not <p>: a Mention's hover preview holds block elements. */}
      <div className="mt-8 flex flex-col gap-4 text-body">
        <div>
          Hi, I’m Robert, a product engineer from Yerevan, Armenia. I love the craft of building products, and the
          hard work of keeping them simple.
        </div>
        <div>
          I co-founded{' '}
          <Mention slug="meerlume" preview="meerlume">
            Meerlume
          </Mention>
          , which turns a plain description of how a business works into a WhatsApp or Telegram bot, and{' '}
          <Mention slug="stamplyn" preview="stamplyn">
            Stamplyn
          </Mention>
          , a travel app where you collect a stamp from every landmark you visit. On the side I’m building{' '}
          <Mention slug="surfaces" preview="surfaces">
            Surfaces
          </Mention>
          .
        </div>
        <div>
          Before that, I spent three years on the blocks team at{' '}
          <Mention slug="softr" preview="softr">
            Softr
          </Mention>{' '}
          and started out at{' '}
          <Mention preview="goya" caption={goyaCredit}>
            Goya
          </Mention>
          . <Link to="/about">More about me</Link>
        </div>
        <div>
          You can find me on <a href={site.links.github}>GitHub</a>, <a href={site.links.linkedin}>LinkedIn</a> and{' '}
          <a href={site.links.x}>X</a>, or write to <a href={`mailto:${site.email}`}>{site.email}</a>.
        </div>
      </div>

      <section id="work" className="mt-20 scroll-mt-8">
        <h2 className="mb-6 text-muted">Projects</h2>
        <div className="flex flex-col gap-12">
          {projects
            .filter((p) => p.caseStudy)
            .map((project) => (
              <Link
                key={project.slug}
                id={project.slug}
                to="/work/$slug"
                params={{ slug: project.slug }}
                className="group flex scroll-mt-8 flex-col gap-3 no-underline"
              >
                <div className="transition-transform duration-300 group-hover:-translate-y-0.5">
                  <Demo kind={project.demo} />
                </div>
                <div>
                  <h3 className="font-medium">{project.name}</h3>
                  <p className="text-muted">{project.tagline}</p>
                </div>
              </Link>
            ))}
        </div>
      </section>

      <section id="experience" className="mt-20 scroll-mt-8">
        <h2 className="mb-4 text-muted">Experience</h2>
        <ul className="flex flex-col gap-3">
          {experience.map((item) => (
            <li key={item.org} className="flex items-baseline gap-3">
              <Logo kind={item.logo} />
              <span className="min-w-0 flex-1">
                {item.org} <span className="text-muted">· {item.role}</span>
              </span>
              <span className="font-mono text-[13px] text-muted">{item.period}</span>
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}
