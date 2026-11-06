# Portfolio

My personal site: the products I've built and the companies I've worked at, one page each.

Built with [TanStack Start](https://tanstack.com/start), React and Tailwind CSS. Every page is prerendered at build time and served from Cloudflare Workers.

## Running it

Needs Node 24 or newer and pnpm.

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm typecheck
pnpm build        # prerendered pages in dist/client
pnpm preview      # the built site, locally
pnpm deploy       # build, then deploy to Cloudflare with Wrangler
```

## Where things are

- `src/content/projects.ts`: every project, with its tagline, role, dates and summary. The home page list and the case study pages read from it.
- `src/content/site.ts`: name, links and contact details.
- `src/routes/`: the home page, the About page, and `work/$slug.tsx` for the case studies.
- `src/components/`: a case study with a layout of its own has a component here (`SoftrCaseStudy.tsx`, `MeerlumeCaseStudy.tsx`, `StamplynCaseStudy.tsx`), along with the line drawings beside its sections and the company marks beside its title.
- `public/images/`: pictures on the case study pages.

Colours are defined once per theme in `src/styles.css`, so every part of the site follows light and dark mode.

## Licence

The code is yours to read and learn from. The writing, the drawings and the product images are mine or belong to the companies they come from, so please don't reuse them.
