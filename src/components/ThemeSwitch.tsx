import { useEffect, useRef, useState } from 'react'

type Theme = 'system' | 'light' | 'dark'

const options: { value: Theme; label: string }[] = [
  { value: 'system', label: 'System' },
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
]

const storageKey = 'theme'

// Which theme fade is running, if any. While a View Transition runs, clicks reach the
// page root instead of the element under the pointer, so the switch passes a click
// mid-fade on to the button it landed on (see ThemeSwitch). A counter, not a flag: a
// fade cut short by a newer one finishes later and mustn't clear the newer one.
let fade = 0
let fading = 0

// Runs in <head> before the page paints, so a saved choice never flashes the other theme.
export const themeScript = `try{var t=localStorage.getItem('${storageKey}');if(t==='light'||t==='dark')document.documentElement.dataset.theme=t}catch(e){}`

function applyTheme(theme: Theme) {
  const root = document.documentElement
  try {
    if (theme === 'system') localStorage.removeItem(storageKey)
    else localStorage.setItem(storageKey, theme)
  } catch {
    // Storage can be blocked (private windows); the choice then lasts for this page only.
  }
  const update = () => {
    if (theme === 'system') delete root.dataset.theme
    else root.dataset.theme = theme
  }
  // A short crossfade instead of every color jumping at once; instant where View
  // Transition types aren't supported, reduced motion is on, or the page isn't visible
  // (a hidden page never draws the frame a transition waits for).
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const visible = document.visibilityState === 'visible'
  if (!reduce && visible && CSS.supports('selector(:active-view-transition-type(a))')) {
    const id = ++fade
    fading = id
    document.startViewTransition({ update, types: ['theme'] }).finished.finally(() => {
      if (fading === id) fading = 0
    })
  } else update()
}

export function ThemeSwitch() {
  // Prerendered HTML can't know the saved choice, so it starts as System and syncs on mount.
  const [theme, setTheme] = useState<Theme>('system')
  const group = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const saved = document.documentElement.dataset.theme
    if (saved === 'light' || saved === 'dark') setTheme(saved)
  }, [])

  useEffect(() => {
    const relay = (event: MouseEvent) => {
      // Only clicks the fade sent to the root; a click on a button reached it already.
      if (!fading || event.target !== document.documentElement || !group.current) return
      for (const button of group.current.querySelectorAll('button')) {
        const r = button.getBoundingClientRect()
        if (event.clientX >= r.left && event.clientX <= r.right && event.clientY >= r.top && event.clientY <= r.bottom) {
          button.click()
          return
        }
      }
    }
    document.addEventListener('click', relay)
    return () => document.removeEventListener('click', relay)
  }, [])

  return (
    <div ref={group} role="group" aria-label="Color theme" className="flex gap-1 rounded-full border border-line p-0.5">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          aria-pressed={theme === option.value}
          onClick={() => {
            setTheme(option.value)
            applyTheme(option.value)
          }}
          className="min-h-8 rounded-full px-3 text-[0.8125rem] text-muted [transition:color_150ms_ease,background-color_150ms_ease,scale_160ms_var(--ease-out)] hover:text-fg motion-safe:active:scale-[0.97] aria-pressed:bg-tile aria-pressed:text-fg aria-pressed:shadow-sm aria-pressed:ring-1 aria-pressed:ring-muted"
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}
