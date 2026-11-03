import type { LogoKind } from '../components/Logo'

export const site = {
  name: 'Robert Poghosyan',
  title: 'Senior Product Engineer',
  url: 'https://poghosyan.sh',
  email: 'robert@poghosyan.sh',
  description:
    'Robert Poghosyan is a senior product engineer in Yerevan. Co-founder of Meerlume and Stamplyn, author of Surfaces, previously on the blocks team at Softr.',
  links: {
    github: 'https://github.com/pogrobert',
    x: 'https://x.com/pogrobert',
    linkedin: 'https://linkedin.com/in/robertpoghosyan1',
  },
}

export const experience: { org: string; role: string; period: string; logo: LogoKind }[] = [
  { org: 'Meerlume', role: 'Co-founder & full-stack engineer', period: '2026–', logo: 'meerlume' },
  { org: 'Stamplyn', role: 'Co-founder & lead engineer', period: '2026–', logo: 'stamplyn' },
  { org: 'Softr', role: 'Front-end engineer', period: '2022–2026', logo: 'softr' },
  { org: 'Goya', role: 'Full-stack developer', period: '2021–2022', logo: 'goya' },
  { org: 'American University of Armenia', role: 'BS Computer Science', period: '2018–2022', logo: 'aua' },
]
