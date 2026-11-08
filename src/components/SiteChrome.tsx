import { site } from '../content/site'
import { ThemeSwitch } from './ThemeSwitch'

// Same column width as the page content. Case studies end on their own content, so only
// the home and About pages render the footer, as part of the page: it comes and goes with
// its page. Deciding from the address instead hid it as soon as a link was clicked, before
// the page transition's snapshot, so the page got shorter and shifted. A theme picked
// here still applies on the case studies: it's set in <head> before the page paints.
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
