import type { ReactNode } from 'react'
import { HeadContent, Link, Outlet, Scripts, createRootRoute } from '@tanstack/react-router'
import { RouteFocus } from '../components/RouteFocus'
import { site } from '../content/site'
import appCss from '../styles.css?url'
import monoFont from '@fontsource-variable/atkinson-hyperlegible-mono/files/atkinson-hyperlegible-mono-latin-wght-normal.woff2?url'
import sansFont from '@fontsource-variable/atkinson-hyperlegible-next/files/atkinson-hyperlegible-next-latin-wght-normal.woff2?url'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: `${site.name} · ${site.title}` },
      { name: 'description', content: site.description },
      // Reader views (Safari's, Firefox's) show this as the byline.
      { name: 'author', content: site.name },
      { property: 'og:site_name', content: site.name },
      { property: 'og:type', content: 'website' },
      { property: 'og:title', content: `${site.name} · ${site.title}` },
      { property: 'og:description', content: site.description },
      // The link preview: every page has one, drawn by scripts/draw-previews.ts. This is the
      // home page's, which the About page shares; a case study names its own.
      { property: 'og:image', content: `${site.url}/previews/home.jpg` },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'theme-color', content: '#fbfbfa', media: '(prefers-color-scheme: light)' },
      { name: 'theme-color', content: '#0b0b0a', media: '(prefers-color-scheme: dark)' },
    ],
    links: [
      // Preloaded so the first paint already has them: found only through the
      // stylesheet, they arrive after it and swap in over the fallback font.
      { rel: 'preload', href: sansFont, as: 'font', type: 'font/woff2', crossOrigin: 'anonymous' },
      { rel: 'preload', href: monoFont, as: 'font', type: 'font/woff2', crossOrigin: 'anonymous' },
      { rel: 'stylesheet', href: appCss },
      { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' },
    ],
  }),
  component: RootComponent,
  notFoundComponent: NotFound,
})

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  )
}

function NotFound() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-24 sm:px-6">
      <h1 className="text-2xl font-semibold">Nothing here.</h1>
      <p className="mt-3 text-body">
        That page doesn’t exist. <Link to="/">Back to the work</Link>.
      </p>
    </main>
  )
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      {/* No "skip to content" link: every page starts with its content, with at most the one
          link home ahead of it, so there's nothing for it to skip. */}
      <body className="font-sans leading-relaxed">
        {children}
        <RouteFocus />
        <Scripts />
      </body>
    </html>
  )
}
