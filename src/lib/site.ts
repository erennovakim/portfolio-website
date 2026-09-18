export const site = {
  name: 'Eren Nova Kim',
  shortName: 'Eren Kim',
  role: 'Product Designer',
  email: 'eren.novakim@gmail.com',
  linkedin: 'https://www.linkedin.com/in/eren-kim',
  resume: '/Eren Kim-Resume.pdf',
  location: 'Irvine, California',
} as const;

export const sections = [
  { id: 'home', label: 'Home' },
  { id: 'work', label: 'Works' },
  { id: 'about', label: 'About' },
  { id: 'resume', label: 'Resume' },
] as const;

export type SectionId = (typeof sections)[number]['id'];

export const spySectionIds = ['work', 'about', 'resume'] as const;

export const navLeft = [
  { kind: 'mail' as const, label: 'Let’s Connect' },
  { kind: 'hash' as const, id: 'work' as const, label: 'Works' },
];

export const navRight = [
  { kind: 'hash' as const, id: 'about' as const, label: 'About' },
  { kind: 'hash' as const, id: 'resume' as const, label: 'Resume' },
];

export const navSheet = [...navLeft, ...navRight];
