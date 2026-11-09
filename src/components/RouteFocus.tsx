import { useRouter } from '@tanstack/react-router'
import { useEffect } from 'react'

// Moving between pages swaps the content without a page load, so the browser leaves focus
// where it was, on an element that's gone, and a screen reader doesn't hear about the new
// page. After each move to another page, focus goes to the new page's title, which a screen
// reader then reads. Coming back home, it goes to the card or link the visitor left from
// instead, so they carry on where they were. The first load is left to the browser.
//
// Safari draws the keyboard focus ring on focus moved by script even after a tap, so the ring
// only shows if the last input was a key press: after a tap or click the focus is quiet.
let keyboard = false

function quiet(target: HTMLElement) {
  target.setAttribute('data-quiet-focus', '')
  target.addEventListener('blur', () => target.removeAttribute('data-quiet-focus'), { once: true })
}

export function RouteFocus() {
  const router = useRouter()
  useEffect(() => {
    const onKey = () => (keyboard = true)
    const onPointer = () => (keyboard = false)
    document.addEventListener('keydown', onKey, true)
    document.addEventListener('pointerdown', onPointer, true)
    return () => {
      document.removeEventListener('keydown', onKey, true)
      document.removeEventListener('pointerdown', onPointer, true)
    }
  }, [])
  useEffect(
    () =>
      router.subscribe('onResolved', ({ fromLocation, toLocation, pathChanged }) => {
        if (!fromLocation || !pathChanged) return
        // After the new page is on screen (page transitions update it a frame later).
        requestAnimationFrame(() =>
          requestAnimationFrame(() => {
            const from = fromLocation.pathname
            let target: HTMLElement | null = null
            if (toLocation.pathname === '/') {
              if (from.startsWith('/work/')) {
                target = document.querySelector(`a[data-slug="${CSS.escape(from.slice('/work/'.length))}"]`)
              } else if (from === '/about') {
                target = document.querySelector('main a[href="/about"]')
              }
            }
            if (!target) {
              target = document.querySelector('main h1')
              // A title isn't focusable by itself; -1 lets script focus it without adding
              // it to the tab order.
              target?.setAttribute('tabindex', '-1')
            }
            if (!target) return
            if (!keyboard) quiet(target)
            target.focus({ preventScroll: true })
          }),
        )
      }),
    [router],
  )
  return null
}
