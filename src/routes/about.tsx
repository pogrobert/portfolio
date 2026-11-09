import { createFileRoute } from '@tanstack/react-router'
import { HomeLink } from '../components/HomeLink'
import { Mention } from '../components/Mention'
import { SiteFooter } from '../components/SiteChrome'
import { site } from '../content/site'

export const Route = createFileRoute('/about')({
  head: () => ({
    meta: [
      { title: `About · ${site.name}` },
      { property: 'og:title', content: `About · ${site.name}` },
    ],
  }),
  component: About,
})

function About() {
  return (
    <>
      <main id="content" className="mx-auto max-w-2xl px-4 pt-16 pb-24 sm:px-6 sm:pt-24">
        <HomeLink carryName className="inline-block text-sm text-muted no-underline hover:text-fg">
          {site.name}
        </HomeLink>
        {/* An article, so reader views pick up the text and leave the name link out. */}
        <article>
          <h1 className="mt-8 font-semibold">About</h1>

          {/* Divs, not <p>: a Mention's hover preview holds block elements. */}
          <div className="mt-4 flex flex-col gap-4 text-body">
            <div>Hi, I’m Robert, a product engineer from Yerevan, Armenia.</div>
            <div>
              I love building products: the craft of it, the design decisions, the small details that make something
              feel smooth. Most of the work is keeping things simple, which is always harder than it looks. I care a lot
              about getting things right, and I’m happy to iterate until they are.
            </div>
            <div>
              I’ve been building things since I was 10 or 11, when I made my first websites with Wix. Years later I
              decided to make it my job and studied computer science at the{' '}
              <a href="https://aua.am/">American University of Armenia</a>.
            </div>
            <div>
              I started my career at{' '}
              <Mention slug="goya" preview="goya">
                Goya
              </Mention>
              , which began as a school for software engineering. I took its course, finished as the best student in
              my class, and joined its new outsourcing team, building web and mobile apps for clients with React,
              Flutter and Node. Then I joined{' '}
              <Mention slug="softr" preview="softr">
                Softr
              </Mention>
              , a no-code platform with over a million users, and spent three years on its blocks team during a
              redesign of every block. There I built Conditional Form and the condition engine behind it, took Comments
              from idea to production, and worked on every other block along the way.
            </div>
            <div>
              Now that LLMs make writing code faster than ever, I get to spend more of my time on the bigger picture:
              UX, interface details and product decisions. Earlier this year I left
              Softr to start something of my own and co-founded{' '}
              <Mention slug="meerlume" preview="meerlume">
                Meerlume
              </Mention>
              , which turns a plain description of how a business works into a chatbot for WhatsApp, Instagram, Messenger, Telegram and the web. I built
              most of the product, and I’m responsible for how it looks, feels and works.
            </div>
            <div>
              Since late September I’ve also been working on{' '}
              <Mention slug="stamplyn" preview="stamplyn">
                Stamplyn
              </Mention>
              , a travel app where you book trips and collect a stamp from every landmark you visit. I co-founded it
              and lead product, design and engineering on a team of four.
            </div>
            <div>
              You can find me on <a href={site.links.github}>GitHub</a>, <a href={site.links.linkedin}>LinkedIn</a> and{' '}
              <a href={site.links.x}>X</a>, or write to <a href={`mailto:${site.email}`}>{site.email}</a>.
            </div>
          </div>
        </article>
      </main>
      <SiteFooter />
    </>
  )
}
