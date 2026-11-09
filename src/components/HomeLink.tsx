import { Link, useLocation, useRouter } from '@tanstack/react-router'
import type { ReactNode } from 'react'

declare module '@tanstack/react-router' {
  interface HistoryState {
    fromHome?: boolean
  }
}

// What every link on the home page to another page of the site passes as its `state`. The
// router keeps it in the history entry the link opens, so a page knows it was opened from
// the home page: the entry before its own is the home page, as the visitor left it. Kept
// in the browser's history, it holds after a reload too.
export const fromHome = { fromHome: true }

// A link back to the home page. On a page opened from the home page, it goes back in
// history, which restores the scroll position; opened any other way, as from a shared
// link, it opens the home page.
//
// With carryName, it's the site name the home page's title moves into on a page
// transition (see styles.css). Only the About page uses it: on a case study the painting
// moves, and one moving thing is enough.
export function HomeLink({
  className,
  carryName,
  children,
}: {
  className?: string
  carryName?: boolean
  children: ReactNode
}) {
  const router = useRouter()
  const openedFromHome = useLocation({ select: (location) => location.state.fromHome === true })
  return (
    <Link
      to="/"
      data-site-name={carryName ? '' : undefined}
      className={className}
      onClick={(event) => {
        const plain = event.button === 0 && !(event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
        if (plain && openedFromHome) {
          event.preventDefault()
          router.history.back()
        }
      }}
    >
      {children}
    </Link>
  )
}
