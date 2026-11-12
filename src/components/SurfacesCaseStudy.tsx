import type { Project } from '../content/projects'
import examples from '../content/surfaces-examples.json'
import { CaseStudyHeader, Section } from './CaseStudySections'

export function SurfacesCaseStudy({ project }: { project: Project }) {
  return (
    <>
      <CaseStudyHeader project={project}>
        Surfaces is an open-source library that draws the pictures a site needs again and again: post covers,
        link previews, headers for X and LinkedIn. You give it one color, and it draws them with code, in
        thirty styles. There’s no image model and no API key, and the same title always gets the same picture.
        I made it to give Meerlume’s blog posts, changelog articles and similar pages covers of their own, and
        now it draws all of them, from the <a href="https://meerlume.com/blog">blog</a> to the{' '}
        <a href="https://meerlume.com/changelog">changelog</a>.
      </CaseStudyHeader>

      <div className="mt-16 flex flex-col gap-16">
        <Section title="Why code, not a model">
          <p>
            An image model can make a nice cover, but one at a time. You prompt it, pick a result, save the file,
            and try to match the last one. With Surfaces there’s nothing to make: a new post gets its cover as
            soon as it has a title, and it matches the rest.
          </p>
          <p>
            Surfaces starts from a seed, usually the post’s title or slug, so the same input always gives the same
            picture, down to the byte, on the server and in the browser. That was harder than it sounds.
            JavaScript lets each engine work out math like <code className="font-mono text-[0.9375rem]">Math.sin</code> and{' '}
            <code className="font-mono text-[0.9375rem]">Math.pow</code> its own way, so Safari and Chrome can give slightly different answers. The
            drawing code only uses math every engine gets exactly right: adding, subtracting, multiplying,
            dividing, square roots and rounding. A test fails if anything else shows up.
          </p>
        </Section>

        <Section title="Every seed has to look good">
          <p>
            Any title should give a picture worth keeping. So you choose the look with words, not numbers: the
            style, calm or bold, how much grain, and where the title goes. I tuned what each word does by eye,
            style by style.
          </p>
          <p>
            Each style also draws its own subjects. Linocut carves hills under a sun, a sprig or waves. Terrazzo
            makes a tile, a slab or a floor. Mezzotint draws a still life, like the one at the top of this page.
          </p>
          <StyleExamples />
        </Section>

        <Section title="The words stay yours">
          <p>
            The pictures are art, and the words on them are set by your page, in your site’s font. Each picture
            leaves a quiet spot for the title, and Surfaces checks the art under it. If the words are easy to read,
            it adds nothing. If they aren’t, it adds a soft glow around the letters, just strong enough to make them
            clear, instead of a box or a blur behind them.
          </p>
        </Section>

        <Section title="Made for coding agents">
          <p>
            I expect most people to use Surfaces through a coding agent, so I wrote the API for agents first. There
            are only a few ways to do each thing, every choice is a word from a short list, and every error says how
            to fix it. It also comes with notes for agents, an <code className="font-mono text-[0.9375rem]">llms.txt</code> and a schema of every
            option.
          </p>
          <p>In code, a site sets up its brand once, then asks it for each picture:</p>
          <pre className="overflow-x-auto rounded-lg border border-line px-4 py-3 font-mono text-[0.8125rem] leading-relaxed text-fg">
            <code>{brandSample}</code>
          </pre>
          <p>
            Or one command does the setup: <code className="font-mono text-[0.9375rem]">npx @pogrobert/surfaces init</code> reads the site’s styles,
            fonts and logo, picks a look and says why, then writes the brand, and on Next.js the link preview too.
            Nothing leaves your computer.
          </p>
        </Section>
      </div>
    </>
  )
}

const brandSample = `const brand = createBrand({ name: 'meerlume.com', color: '#f59e0b' })
brand.cover({ title })
brand.og({ title })`

// Six posts' covers, each in its own style and all from one amber, drawn by
// scripts/draw-surfaces.ts with the title set where each scene keeps a place for it, in
// the ink it says reads there. The title is the page's own text, in the site's font,
// sized with the cover (cqw) so it fills its place the same at every width. Two in a
// row where there's room, one on a phone, so the titles stay large enough to read.
function StyleExamples() {
  return (
    <figure className="my-4">
      <div className="grid gap-x-4 gap-y-5 sm:grid-cols-2">
        {examples.map((cover) => (
          <div key={cover.style}>
            <div className="relative @container shadow-painting">
              <img
                src={`/images/surfaces/examples/${cover.style}.svg`}
                width={1600}
                height={900}
                loading="lazy"
                // The title over it and the style under it say what it is.
                alt=""
                className="block h-auto w-full"
              />
              <span
                className="absolute flex items-end text-[5cqw] leading-[1.1] font-semibold tracking-tight text-balance"
                style={{
                  left: `${cover.x * 100}%`,
                  top: `${cover.y * 100}%`,
                  width: `${cover.width * 100}%`,
                  height: `${cover.height * 100}%`,
                  // The covers follow the system theme, as the site does, and so does the ink.
                  color: `light-dark(${cover.ink.light}, ${cover.ink.dark})`,
                }}
              >
                {cover.title}
              </span>
            </div>
            <p className="mt-2 font-mono text-xs text-muted capitalize">{cover.style}</p>
          </div>
        ))}
      </div>
      <figcaption className="mt-4 font-mono text-xs text-muted">
        Six made-up posts, each in one of the thirty styles, all from one amber. The titles are set by the
        page, in its own font.
      </figcaption>
    </figure>
  )
}
