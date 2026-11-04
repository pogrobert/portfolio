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
  demo: DemoKind
  link?: { label: string; href: string }
  // Jobs and companies go under Work on the home page; things built on the side
  // (open source, libraries) under Side projects.
  kind: 'work' | 'side'
  // Credit shown under the hero, for artwork that isn't Robert's.
  credit?: string
  // For a job made of several projects: shown in order instead of the highlights.
  timeline?: { when: string; title: string; text: string }[]
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
    demo: 'meerlume',
    link: { label: 'meerlume.com', href: 'https://meerlume.com' },
    kind: 'work',
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
      'I lead product, design and engineering on a team of four, and wrote 149 of our first 168 issues.',
    ],
    demo: 'stamplyn',
    link: { label: 'stamplyn.com', href: 'https://stamplyn.com' },
    kind: 'work',
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
    demo: 'softr',
    kind: 'work',
  },
  {
    slug: 'goya',
    name: 'Goya',
    tagline: 'My first job, where the fundamentals were forged.',
    role: 'Full-stack developer',
    period: '2021–2022',
    summary:
      'Goya was a Yerevan company that started as a school for software engineering and later opened an outsourcing team. I took its course, finished as the best student in my class, and was offered a job. It was my first, and where the fundamentals were forged. Goya has since closed.',
    highlights: [],
    timeline: [
      {
        when: '2020',
        title: 'The course',
        text: 'I took Goya’s software engineering course from early to late 2020 and finished as the best student in my class. When Goya started doing client work, I was offered a job on the team.',
      },
      {
        when: '2021',
        title: 'A fitness app',
        text: 'My first project: the web app for a US fitness company, in React and Redux.',
      },
      {
        when: 'Mid 2021',
        title: 'A rescue',
        text: 'Another client project had fallen behind, so I was brought in to build it fast. It shipped, and the client was happy with it.',
      },
      {
        when: 'Late 2021',
        title: 'Test automation',
        text: 'When the fitness project ended, I spent a month on QA automation, writing end-to-end tests for cross-platform mobile apps.',
      },
      {
        when: 'Late 2021 – early 2022',
        title: 'Smart greenhouses',
        text: 'A mobile app for managing smart greenhouses: live sensor readings, and controls for things like fans and windows. I evaluated Flutter and React Native for it and chose Flutter. Today I’d pick React Native.',
      },
      {
        when: 'Mar – Nov 2022',
        title: 'A marketplace platform',
        text: 'Full-stack and backend-heavy: the API, plus two front ends, a CRM and the web app itself. I worked on it until I left for Softr.',
      },
    ],
    demo: 'goya',
    kind: 'work',
    credit: 'A nod to the name: Francisco de Goya, The Forge, c. 1815–20. The Frick Collection.',
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
    demo: 'surfaces',
    kind: 'side',
  },
]

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug)
}
