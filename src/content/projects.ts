export type Slug = 'stamplyn' | 'meerlume' | 'softr' | 'goya' | 'surfaces'

export type Project = {
  // Also the key of the project's painting, mark and case study page.
  slug: Slug
  name: string
  // One line for the home page list.
  tagline: string
  // The role and years, as the home page card shows them.
  role: string
  period: string
  // On the case study page, where there's room: the team after the role, and the months
  // in place of the years.
  team?: string
  dates?: string
  // The page description for search engines and link previews. A case study with its own
  // page opens with a longer text of its own.
  summary: string
  // The project's own site first, then anything else worth a link, like a package.
  links?: { label: string; href: string }[]
  // Jobs and companies go under Work on the home page; things built on the side
  // (open source, libraries) under Side projects.
  kind: 'work' | 'side'
  // For a job made of several projects, on a case study without a page of its own.
  timeline?: { title: string; text: string }[]
}

// Newest first: Stamplyn started after Meerlume, in late September 2026.
export const projects: Project[] = [
  {
    slug: 'stamplyn',
    name: 'Stamplyn',
    tagline: 'Collect a stamp from every landmark you visit.',
    role: 'Co-founder',
    period: '2026–',
    dates: 'Sep 2026 – present',
    summary:
      'A travel app where you collect a stamp from every landmark you visit, by being there, and follow your friends’ stamps. Built with Expo and React Native, for iPhone and Android.',
    links: [{ label: 'stamplyn.com', href: 'https://stamplyn.com' }],
    kind: 'work',
  },
  {
    slug: 'meerlume',
    name: 'Meerlume',
    tagline: 'Describe the business, get a chatbot on five channels.',
    role: 'Co-founder',
    period: '2026–',
    dates: 'Mar 2026 – present',
    summary:
      'A no-code builder that turns a plain description of a business into a chatbot for WhatsApp, Instagram, Messenger, Telegram and the web. A model builds the bot; no model writes its replies.',
    links: [{ label: 'meerlume.com', href: 'https://meerlume.com' }],
    kind: 'work',
  },
  {
    slug: 'softr',
    name: 'Softr',
    tagline: 'The hardest blocks on a no-code platform with 1M+ users.',
    role: 'Front-end engineer',
    period: '2022–2026',
    team: 'blocks team',
    dates: 'Dec 2022 – Jan 2026',
    summary:
      'Three years on the blocks team during a redesign of every block: Conditional Form and its condition engine, Comments, the new account blocks, and every other block along the way.',
    links: [{ label: 'softr.io', href: 'https://www.softr.io' }],
    kind: 'work',
  },
  {
    slug: 'goya',
    name: 'Goya',
    tagline: 'My first job, building apps for clients.',
    role: 'Full-stack developer',
    period: '2021–2022',
    dates: 'Feb 2021 – Nov 2022',
    summary:
      'Goya was a Yerevan company that started as a school for software engineering and later opened an outsourcing team. I took its course, and it gave me my first job. Goya has since closed.',
    timeline: [
      {
        title: 'The course',
        text: 'I took Goya’s software engineering course from early to late 2020 and finished as the best student in my class. Goya was already doing client work by then, and offered me a job on the team as soon as the course ended.',
      },
      {
        title: 'A fitness app',
        text: 'My first project: the front end of the web app for one of the biggest US at-home fitness companies, known for its streaming workout programs, built with React and Redux. It’s where I learned React properly: breaking a screen into small components, passing data down through props, keeping shared state in one Redux store instead of scattered across the app, and understanding when and why a component re-renders. Those fundamentals are what I still build on.',
      },
      {
        title: 'Smart greenhouses',
        text: 'After a month of QA automation, writing end-to-end tests for a mobile fitness app, I moved on to building a mobile app myself: one for managing smart greenhouses, with live sensor readings and controls for things like fans and windows. I chose Flutter over React Native. At the time, Flutter compiled to native code and drew its own interface, while React Native still passed everything between JavaScript and native code over a bridge, so Flutter apps usually ran smoother, especially in animations; React Native only replaced the bridge with its New Architecture in 2024. Flutter was also overtaking React Native in developer surveys, and before Apple’s Liquid Glass redesign, an interface Flutter drew itself looked at home on both iPhone and Android. Today I’d pick React Native, which renders the platform’s own components, so apps look and feel native.',
      },
      {
        title: 'A marketplace platform',
        text: 'A US marketplace app connecting consumers with local and online businesses, built inside a partner agency’s team. I owned the CRM, an admin panel built with React Admin, and worked across the web app and the Express and MongoDB backend: my first real backend work, from API endpoints to how the data was stored. Over time I became the person the team came to with questions about any part of it. I worked on it until I left for Softr.',
      },
    ],
    kind: 'work',
  },
  {
    slug: 'surfaces',
    name: 'Surfaces',
    tagline: 'Covers and link previews for a whole site, drawn by code.',
    role: 'Author',
    period: '2026',
    dates: 'Nov 2026',
    summary:
      'An open-source library that draws the pictures a site repeats, from post covers to link previews, from one brand color. Thirty styles, no image model and no API key, and the same title always gets the same picture.',
    links: [
      { label: 'surfaces.pogrobert.com', href: 'https://surfaces.pogrobert.com' },
      { label: 'npm', href: 'https://www.npmjs.com/package/@pogrobert/surfaces' },
      { label: 'GitHub', href: 'https://github.com/pogrobert/surfaces' },
    ],
    kind: 'side',
  },
]

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug)
}
