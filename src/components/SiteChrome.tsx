import { Link } from '@tanstack/react-router'
import { site } from '../content/site'

export function SiteHeader() {
  return (
    <header className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-4 py-7 sm:px-6">
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
          {site.email}
        </a>
      </nav>
    </header>
  )
}

export function SiteFooter() {
  return (
    <footer className="mx-auto flex max-w-2xl flex-wrap gap-6 px-4 pb-16 text-sm sm:px-6">
      <a href={`mailto:${site.email}`}>{site.email}</a>
      <a href={site.links.github}>GitHub</a>
      <a href={site.links.linkedin}>LinkedIn</a>
      <a href={site.links.x}>X</a>
    </footer>
  )
}
