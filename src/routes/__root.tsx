import type { ReactNode } from 'react'
import { HeadContent, Link, Outlet, Scripts, createRootRoute } from '@tanstack/react-router'
import { MotionConfig } from 'motion/react'
import { SiteFooter, SiteHeader } from '../components/SiteChrome'
import { themeScript } from '../components/ThemeSwitch'
import { site } from '../content/site'
import appCss from '../styles.css?url'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: `${site.name} · ${site.title}` },
      { name: 'description', content: site.description },
      { property: 'og:site_name', content: site.name },
      { property: 'og:type', content: 'website' },
      { property: 'og:title', content: `${site.name} · ${site.title}` },
      { property: 'og:description', content: site.description },
      { name: 'twitter:card', content: 'summary' },
      { name: 'theme-color', content: '#fbfbfa', media: '(prefers-color-scheme: light)' },
      { name: 'theme-color', content: '#0b0b0a', media: '(prefers-color-scheme: dark)' },
    ],
    links: [
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
    // The theme script sets data-theme on <html> before React hydrates.
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <HeadContent />
      </head>
      <body className="font-sans leading-relaxed">
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-10 focus:rounded-md focus:bg-fg focus:px-3 focus:py-2 focus:text-bg"
        >
          Skip to content
        </a>
        <MotionConfig reducedMotion="user">
          <SiteHeader />
          {children}
          <SiteFooter />
        </MotionConfig>
        <Scripts />
      </body>
    </html>
  )
}
