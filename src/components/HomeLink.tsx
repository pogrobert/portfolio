import { Link, useLocation, useRouter } from '@tanstack/react-router'
import { useLayoutEffect, type ReactNode } from 'react'

// The history entry of the home page last shown, so a page opened from it can link back
// to that entry instead of opening the home page anew: the visitor lands where they were.
let homeIndex: number | null = null

// Called by the home page. Only while the address is still the home page's: leaving it,
// the page renders once more with the next page's address before it unmounts.
export function useRememberHome() {
  const index = useLocation({ select: (location) => (location.pathname === '/' ? location.state.__TSR_index : null) })
  useLayoutEffect(() => {
    if (index !== null) homeIndex = index
  }, [index])
}

// A link back to the home page. Opened from the home page (the entry right after it), it
// goes back in history, which restores the scroll position; opened any other way, as from
// a shared link, it opens the home page.
export function HomeLink({ className, children }: { className?: string; children: ReactNode }) {
  const router = useRouter()
  const index = useLocation({ select: (location) => location.state.__TSR_index })
  return (
    <Link
      to="/"
      className={className}
      onClick={(event) => {
        const plain = event.button === 0 && !(event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
        if (plain && homeIndex !== null && index === homeIndex + 1) {
          event.preventDefault()
          router.history.back()
        }
      }}
    >
      {children}
    </Link>
  )
}
