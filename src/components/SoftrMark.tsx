import type { CSSProperties } from 'react'

// Softr's mark: a wide bar over a circle and a rounded square. The pieces arrive one
// after another on page load, a CSS animation so it runs even while the page is still
// busy, and spread a touch on hover. Reduced motion keeps only the fade.
const enter =
  '[animation:piece-in_500ms_var(--ease-out)_backwards] motion-reduce:[animation:fade-in_300ms_var(--ease-out)_backwards]'
const hover = 'transition-[translate] duration-200 ease-[ease]'

function piece(x: number, y: number, delay: number): CSSProperties {
  return { '--piece-x': `${x}px`, '--piece-y': `${y}px`, animationDelay: `${delay}ms` } as CSSProperties
}

export function SoftrMark({ className }: { className?: string }) {
  return (
    <svg viewBox="-4.5 -3.5 40 40" aria-hidden="true" className={`group/mark ${className ?? ''}`}>
      <rect
        x="1"
        y="2"
        width="29"
        height="13"
        rx="4.5"
        fill="#fcb500"
        className={`${enter} ${hover} motion-safe:group-hover/mark:-translate-y-[1.5px]`}
        style={piece(0, -6, 100)}
      />
      <circle
        cx="7.5"
        cy="24.5"
        r="6.5"
        fill="#f53878"
        className={`${enter} ${hover} motion-safe:group-hover/mark:-translate-x-[1.5px] motion-safe:group-hover/mark:translate-y-[1px]`}
        style={piece(-6, 0, 160)}
      />
      <rect
        x="17"
        y="18"
        width="13"
        height="13"
        rx="4"
        fill="#386af5"
        className={`${enter} ${hover} motion-safe:group-hover/mark:translate-x-[1.5px] motion-safe:group-hover/mark:translate-y-[1px]`}
        style={piece(6, 0, 220)}
      />
    </svg>
  )
}
