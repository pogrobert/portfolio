import { Link } from '@tanstack/react-router'
import { site } from '../content/site'
import { ThemeSwitch } from './ThemeSwitch'

// Header, content and footer share one column width on every page.
const column = 'mx-auto max-w-2xl px-4 sm:px-6'

export function SiteHeader() {
  return (
    <header className={`${column} flex flex-wrap items-center justify-between gap-4 py-7`}>
      <Link to="/" className="font-semibold no-underline">
        {site.name}
      </Link>
      <nav aria-label="Main" className="flex flex-wrap gap-6 text-sm">
        <Link to="/" hash="work" className="no-underline">
          Work
        </Link>
        <Link to="/" hash="experience" className="no-underline">
          Experience
        </Link>
        <a href={`mailto:${site.email}`} className="no-underline">
          Email
        </a>
      </nav>
    </header>
  )
}

export function SiteFooter() {
  return (
    <footer className={`${column} flex flex-wrap items-center justify-between gap-6 pb-16 text-sm`}>
      <div className="flex flex-wrap gap-6">
        <a href={`mailto:${site.email}`}>{site.email}</a>
        <a href={site.links.github}>GitHub</a>
        <a href={site.links.linkedin}>LinkedIn</a>
        <a href={site.links.x}>X</a>
      </div>
      <ThemeSwitch />
    </footer>
  )
}
