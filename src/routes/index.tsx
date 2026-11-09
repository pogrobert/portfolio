import { Link, createFileRoute } from '@tanstack/react-router'
import { useLayoutEffect } from 'react'
import { HungPainting, paintingJustLeft, paintings, Period } from '../components/Demo'
import { useRememberHome } from '../components/HomeLink'
import { Mention } from '../components/Mention'
import { projects, type Project } from '../content/projects'
import { site } from '../content/site'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  useRememberHome()
  useCarryPaintingHome()
  return (
    <>
      <main id="content" className="mx-auto max-w-2xl px-4 pt-16 pb-24 sm:px-6 sm:pt-24">
        {/* Sized to the name, not the page: on the way to and from the About page it moves
            into the name there (see styles.css), and a full-width box would squash the text. */}
        <h1 data-site-name="" className="w-fit font-semibold">
          {site.name}
        </h1>
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
            , which turns a plain description of how a business works into a chatbot for messaging apps, and{' '}
            <Mention slug="stamplyn" preview="stamplyn">
              Stamplyn
            </Mention>
            , a travel app where you collect a stamp from every landmark you visit.
          </div>
          <div>
            Before that, I spent three years on the blocks team at{' '}
            <Mention slug="softr" preview="softr">
              Softr
            </Mention>{' '}
            and started out at{' '}
            <Mention slug="goya" preview="goya">
              Goya
            </Mention>
            . <Link to="/about">More about me</Link>
          </div>
          <div>
            You can find me on <a href={site.links.github}>GitHub</a>, <a href={site.links.linkedin}>LinkedIn</a> and{' '}
            <a href={site.links.x}>X</a>, or write to <a href={`mailto:${site.email}`}>{site.email}</a>.
          </div>
        </div>

        <ProjectList title="Work" items={projects.filter((p) => p.kind === 'work')} />
        <ProjectList title="Side projects" items={projects.filter((p) => p.kind === 'side')} />
      </main>
    </>
  )
}

// Each project appears once, linking to its case study. Work is jobs and companies; side
// projects are built on the side.
function ProjectList({ title, items }: { title: string; items: Project[] }) {
  if (items.length === 0) return null
  return (
    <section className="mt-20">
      <h2 className="mb-8 text-muted">{title}</h2>
      <div className="flex flex-col gap-16">
        {items.map((project) => {
          const painting = paintings[project.demo]
          return (
            <div key={project.slug}>
              {/* Each card is a painting hung on the page with a wall label beside it, as in
                  a museum: the project, then the painting's own details under a rule, level
                  with the foot of the painting. On a phone the label goes under it. The hover
                  tint bleeds 12px past the card, so the painting and label stay aligned with
                  the heading. It's a layer behind the card that fades in while growing from
                  just inside it, opacity and scale only; reduced motion keeps the fade. */}
              <Link
                to="/work/$slug"
                params={{ slug: project.slug }}
                data-slug={project.slug}
                // Named by the project alone, and described by its role and tagline: read whole,
                // the card would start with the painting and name it twice.
                aria-labelledby={`${project.slug}-name`}
                aria-describedby={`${project.slug}-role ${project.slug}-tagline`}
                onClick={(event) => {
                  openedFromCard = project.slug
                  carryPainting(event.currentTarget, `painting-${project.demo}`)
                }}
                className="relative isolate -m-3 grid gap-x-8 gap-y-4 rounded-2xl p-3 no-underline before:absolute before:inset-0 before:-z-10 before:rounded-[inherit] before:bg-fg/4 before:opacity-0 before:transition-[opacity,scale] before:duration-150 before:ease-out before:content-[''] hover:before:scale-100 hover:before:opacity-100 motion-safe:before:scale-[0.98] sm:grid-cols-[minmax(0,1fr)_14rem] sm:items-end"
              >
                <HungPainting kind={project.demo} />
                <div className="flex flex-col gap-2.5">
                  <div>
                    <h3 id={`${project.slug}-name`} className="font-medium">
                      {project.name}
                    </h3>
                    <p id={`${project.slug}-role`} className="text-sm text-muted tabular-nums">
                      {project.role}, <Period period={project.period} />
                    </p>
                  </div>
                  <p id={`${project.slug}-tagline`} className="text-sm text-body">
                    {project.tagline}
                  </p>
                  <p className="border-t border-line pt-2.5 font-mono text-[0.6875rem] leading-relaxed text-muted">
                    {painting.artist} ({painting.lifespan})
                    <br />
                    {painting.work}
                    <br />
                    {painting.medium}
                  </p>
                </div>
              </Link>
            </div>
          )
        })}
      </div>
    </section>
  )
}

// The card a case study was last opened from. Coming back from that case study, the
// painting goes home to its card, which is where the visitor lands. Opened any other way,
// from the bio or a shared link, the card may be far off screen, so the painting doesn't
// fly there: the home page just fades in.
let openedFromCard: string | null = null

// Names the card's painting on arrival, set on the image directly rather than as a React
// prop: when that card is opened again the address changes first, and React would clear
// the name before the page transition takes its snapshot.
function useCarryPaintingHome() {
  useLayoutEffect(() => {
    const slug = openedFromCard
    openedFromCard = null
    const project = projects.find((p) => p.slug === slug)
    const card = document.querySelector<HTMLElement>(`a[data-slug="${slug}"]`)
    if (project && card && slug === paintingJustLeft()) carryPainting(card, `painting-${project.demo}`)
  }, [])
}

// Only the card being opened carries its painting into the case study: with every card
// named, the others would animate as loose layers over the next page.
function carryPainting(card: HTMLElement, name: string) {
  for (const painting of document.querySelectorAll<HTMLElement>('[data-painting]')) {
    painting.style.viewTransitionName = ''
  }
  const painting = card.querySelector<HTMLElement>('[data-painting]')
  if (painting) painting.style.viewTransitionName = name
}
