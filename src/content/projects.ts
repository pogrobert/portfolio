export type DemoKind = 'meerlume' | 'stamplyn' | 'surfaces' | 'softr' | 'goya'

export type Project = {
  slug: string
  name: string
  // One line for the home page list.
  tagline: string
  role: string
  period: string
  summary: string
  highlights: string[]
  stack: string[]
  demo: DemoKind
  link?: { label: string; href: string }
  // Projects without a case study are listed on the home page only.
  caseStudy: boolean
}

export const projects: Project[] = [
  {
    slug: 'meerlume',
    name: 'Meerlume',
    tagline: 'Plain words in, a WhatsApp or Telegram bot out.',
    role: 'Co-founder',
    period: '2026–',
    summary:
      'Describe a business workflow in plain words and get a WhatsApp or Telegram bot. A deterministic runtime runs the generated flows without calling the LLM, so bots stay cheap and predictable.',
    highlights: [
      'Three-panel builder: conversation, flow canvas and live preview, in React Router with server rendering.',
      'A Gemini pipeline turns a plain-language description into flow JSON and bot metadata once, at setup.',
      'A stateless runtime engine executes those flows without calling the model again.',
      'Owner inbox with inline approve and decline, Telegram and WhatsApp messaging, and 100+ starter templates.',
      'Fastify and Neon PostgreSQL backend on Cloudflare and Railway; Paddle subscription billing.',
      'Approved Meta Tech Provider for the WhatsApp Business Platform. Launched publicly in August 2026.',
    ],
    stack: ['React Router', 'Fastify', 'PostgreSQL', 'Gemini', 'Cloudflare', 'Paddle'],
    demo: 'meerlume',
    link: { label: 'meerlume.com', href: 'https://meerlume.com' },
    caseStudy: true,
  },
  {
    slug: 'stamplyn',
    name: 'Stamplyn',
    tagline: 'Book the trip, then collect a stamp from every landmark.',
    role: 'Co-founder & lead engineer',
    period: '2026–',
    summary:
      'A travel app for booking stays and flights, planning trips with AI, and collecting a stamp from every landmark you visit. Expo and React Native, with live prices and Stripe payments.',
    highlights: [
      'Hotel and flight search with live prices from a travel partner, booked in the app and paid through Stripe.',
      'Describe the trip you have in mind and get plans built from real flights and stays.',
      'A passport that fills with a stamp from every landmark you visit.',
      'I lead engineering on a team of three, and wrote 149 of our first 168 issues.',
    ],
    stack: ['Expo', 'React Native', 'Supabase', 'Stripe'],
    demo: 'stamplyn',
    link: { label: 'stamplyn.com', href: 'https://stamplyn.com' },
    caseStudy: true,
  },
  {
    slug: 'surfaces',
    name: 'Surfaces',
    tagline: 'Covers and backgrounds generated from a seed.',
    role: 'Open source',
    period: '2026',
    summary:
      'Covers and backgrounds generated from a seed. Fifteen styles, and the same seed always draws the same image, down to the byte.',
    highlights: [
      'Fifteen styles, from halftone and riso to glass and chrome, each tuned for blog covers, changelogs, heroes and link previews.',
      'Renders to SVG, PNG and Open Graph images, with React and DOM bindings.',
      'Deterministic: 9,000 contact-sheet tiles render byte-identical in the browser and in Node.',
    ],
    stack: ['TypeScript', 'SVG', 'Node'],
    demo: 'surfaces',
    caseStudy: true,
  },
  {
    slug: 'softr',
    name: 'Softr',
    tagline: 'Some of the most complex blocks on a no-code platform with 1M+ users.',
    role: 'Front-end engineer',
    period: '2022–2026',
    summary:
      'Three years on the blocks team during a redesign of every block: Conditional Form and its condition engine, Comments, the new account blocks, and nearly every other block along the way.',
    highlights: [],
    stack: ['React', 'TypeScript', 'Design systems', 'WCAG'],
    demo: 'softr',
    caseStudy: true,
  },
  {
    slug: 'goya',
    name: 'Goya',
    tagline: 'My first job, where the fundamentals were forged.',
    role: 'Full-stack developer',
    period: '2021–2022',
    summary:
      'My first job, and where the fundamentals were forged: web and mobile apps with React, Next.js, Flutter and Node, CMS interfaces and REST APIs, and end-to-end tests for cross-platform mobile apps. The company has since closed, so its namesake stands in.',
    highlights: [],
    stack: ['React', 'Next.js', 'Flutter', 'Node'],
    demo: 'goya',
    caseStudy: false,
  },
]

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug && p.caseStudy)
}
