import { site } from '../content/site'
import { ThemeSwitch } from './ThemeSwitch'

// Same column width as the page content.
export function SiteFooter() {
  return (
    <footer className="mx-auto flex max-w-2xl flex-wrap items-center justify-between gap-6 px-4 pb-16 text-sm text-muted sm:px-6">
      <a href={`mailto:${site.email}`} className="no-underline hover:text-fg">
        {site.email}
      </a>
      <ThemeSwitch />
    </footer>
  )
}
