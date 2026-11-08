import { Link, createFileRoute } from '@tanstack/react-router'
import { useLayoutEffect } from 'react'
import { Demo, paintingJustLeft } from '../components/Demo'
import { useRememberHome } from '../components/HomeLink'
import { Mention } from '../components/Mention'
import { SiteFooter } from '../components/SiteChrome'
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
      <SiteFooter />
    </>
  )
}

// Each project appears once: its card carries the years, and links to its
// case study. Work is jobs and companies; side projects are built on the side.
function ProjectList({ title, items }: { title: string; items: Project[] }) {
  if (items.length === 0) return null
  return (
    <section className="mt-20">
      <h2 className="mb-6 text-muted">{title}</h2>
      <div className="flex flex-col gap-12">
        {items.map((project) => (
          <div key={project.slug}>
            {/* The hover tint bleeds 12px past the card, so the painting and text stay
                aligned with the heading; its corners follow the painting's, 12px out. Below
                the text it bleeds 20px, since a line of text has its own space under it. It's
                a layer behind the card that fades in while growing from just inside it,
                opacity and scale only; reduced motion keeps the fade. */}
            <Link
              to="/work/$slug"
              params={{ slug: project.slug }}
              data-slug={project.slug}
              onClick={(event) => {
                openedFromCard = project.slug
                carryPainting(event.currentTarget, `painting-${project.demo}`)
              }}
              className="relative isolate -m-3 -mb-5 flex flex-col gap-3 rounded-[1.75rem] p-3 pb-5 no-underline before:absolute before:inset-0 before:-z-10 before:rounded-[inherit] before:bg-fg/4 before:opacity-0 before:transition-[opacity,scale] before:duration-150 before:ease-out before:content-[''] motion-safe:before:scale-[0.98] hover:before:scale-100 hover:before:opacity-100"
            >
              <Demo kind={project.demo} />
              <div>
                <h3 className="font-medium">{project.name}</h3>
                <p className="text-muted">{project.tagline}</p>
                <p className="mt-1 text-sm text-muted tabular-nums">{project.period}</p>
              </div>
            </Link>
          </div>
        ))}
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
