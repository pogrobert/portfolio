export type LogoKind = 'meerlume' | 'stamplyn' | 'surfaces' | 'softr' | 'goya' | 'aua'

// Small marks that sit inline with text, sized to the current font size.
export function Logo({ kind }: { kind: LogoKind }) {
  const box = 'inline-block size-[1em] shrink-0 align-[-0.125em]'
  switch (kind) {
    case 'meerlume':
      return <img src="/logos/meerlume.png" alt="" width={16} height={16} className={`${box} rounded-[0.25em]`} />
    case 'stamplyn':
      return <img src="/logos/stamplyn.svg" alt="" width={16} height={16} className={box} />
    case 'goya':
      return <img src="/logos/goya.jpg" alt="" width={16} height={16} className={`${box} rounded-[0.2em]`} />
    case 'surfaces':
      return (
        <span
          aria-hidden="true"
          className={`${box} rounded-[0.25em]`}
          style={{ background: 'radial-gradient(circle at 70% 35%, #a5a0ff 0, #635bff 35%, #1a1840 100%)' }}
        />
      )
    case 'softr':
      // Softr's three shapes: a wide bar over a circle and a rounded square.
      return (
        <svg viewBox="0.5 1.5 30 30" aria-hidden="true" className={box}>
          <rect x="1" y="2" width="29" height="13" rx="4.5" fill="#fcb500" />
          <circle cx="7.5" cy="24.5" r="6.5" fill="#f53878" />
          <rect x="17" y="18" width="13" height="13" rx="4" fill="#386af5" />
        </svg>
      )
    case 'aua':
      return (
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className={`${box} text-muted`}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M2 9l10-5 10 5-10 5-10-5z" />
          <path d="M6 11v5c3 2 9 2 12 0v-5" />
        </svg>
      )
  }
}
