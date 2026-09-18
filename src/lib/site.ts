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
