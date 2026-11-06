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
  timeline?: { title: string; text: string }[]
}

export const projects: Project[] = [
  {
    slug: 'meerlume',
    name: 'Meerlume',
    tagline: 'Describe the business, get a chatbot on five channels.',
    role: 'Co-founder',
    period: '2026–',
    summary:
      'A no-code builder that turns a plain description of a business into a chatbot for WhatsApp, Instagram, Messenger, Telegram and the web. A model builds the bot; no model writes its replies.',
    // The case study has its own page (MeerlumeCaseStudy).
    highlights: [],
    demo: 'meerlume',
    link: { label: 'meerlume.com', href: 'https://meerlume.com' },
    kind: 'work',
  },
  {
    slug: 'stamplyn',
    name: 'Stamplyn',
    tagline: 'Collect a stamp from every landmark you visit.',
    role: 'Co-founder',
    period: '2026–',
    summary:
      'A travel app where you collect a stamp from every landmark you visit, by being there, and follow your friends’ stamps. Built with Expo and React Native, for iPhone and Android.',
    // The case study has its own page (StamplynCaseStudy).
    highlights: [],
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
      'Goya was a Yerevan company that started as a school for software engineering and later opened an outsourcing team. I took its course and was offered a job: my first, and where the fundamentals were forged. Goya has since closed.',
    highlights: [],
    timeline: [
      {
        title: 'The course',
        text: 'I took Goya’s software engineering course from early to late 2020 and finished as the best student in my class. When Goya started doing client work, I was offered a job on the team.',
      },
      {
        title: 'A fitness app',
        text: 'My first project: the front end of the web app for one of the biggest US at-home fitness companies, known for its streaming workout programs. React and Redux.',
      },
      {
        title: 'A rescue',
        text: 'A client website in React had fallen a few weeks behind. I took it over, worked overtime and finished it within a month. It launched, and the client was happy with the result.',
      },
      {
        title: 'Smart greenhouses',
        text: 'After a month of QA automation, writing end-to-end tests for cross-platform mobile apps, I moved on to building one: an app for managing smart greenhouses, with live sensor readings and controls for things like fans and windows. I evaluated Flutter and React Native and chose Flutter. Today I’d pick React Native, which renders the platform’s own components, so apps look and feel native.',
      },
      {
        title: 'A marketplace platform',
        text: 'A US marketplace app connecting consumers with local and online businesses, built inside a partner agency’s team. I owned the CRM and worked across the Express and MongoDB backend and the web app, and became the person the team came to with questions about any part of it. I worked on it until I left for Softr.',
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
