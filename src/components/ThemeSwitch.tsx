import { useEffect, useState } from 'react'

type Theme = 'system' | 'light' | 'dark'

const options: { value: Theme; label: string }[] = [
  { value: 'system', label: 'System' },
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
]

const storageKey = 'theme'

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
  if (theme === 'system') delete root.dataset.theme
  else root.dataset.theme = theme
}

export function ThemeSwitch() {
  // Prerendered HTML can't know the saved choice, so it starts as System and syncs on mount.
  const [theme, setTheme] = useState<Theme>('system')

  useEffect(() => {
    const saved = document.documentElement.dataset.theme
    if (saved === 'light' || saved === 'dark') setTheme(saved)
  }, [])

  return (
    <div role="group" aria-label="Color theme" className="flex gap-1 rounded-full border border-line p-0.5">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          aria-pressed={theme === option.value}
          onClick={() => {
            setTheme(option.value)
            applyTheme(option.value)
          }}
          className="min-h-8 rounded-full px-3 text-[13px] text-muted transition-colors hover:text-fg aria-pressed:bg-tile aria-pressed:text-fg aria-pressed:shadow-sm"
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}
