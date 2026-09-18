export interface ResumeItem {
  org?: string;
  meta: string;
  points: string[];
}

export interface ResumeCluster {
  org: string;
  roles: ResumeItem[];
}

export const peterplateCluster: ResumeCluster = {
  org: 'PeterPlate',
  roles: [
    {
      meta: 'UI/UX Designer, January 2026 - Present',
      points: [
        'Apply design thinking and journey mapping to build a 0-to-1 web and mobile interface for a campus dining ecosystem.',
        'Conduct user interviews and usability testing to validate needs, then refine high-fidelity Figma prototypes with accessibility in mind.',
        'Work with developers in Agile and Scrum to produce design specs, prioritise deliverables, and keep Figma handoff technically feasible across touchpoints.',
      ],
    },
    {
      meta: 'Software Developer, October 2025 - January 2026',
      points: [
        'Built frontend and backend components with TypeScript, Tailwind CSS, tRPC procedures and ShadCN, working with designers to meet design requirements and responsive UI standards.',
      ],
    },
  ],
};

export const projectItems: ResumeItem[] = [
  {
    org: 'Ēkyu',
    meta: 'UI/UX Designer, April 2026',
    points: [
      'Placed top 10 of more than 400 participants with an integrated hardware and software solution for selective noise cancellation, including a full case study written in a 40-hour sprint.',
      'Designed a mobile controller app and a physical gesture system, with custom icons and brand identity carrying across both.',
      'Interviewed a hearing-impaired collaborator and confirmed design choices with them to ground inclusive features in research.',
    ],
  },
  {
    org: 'Cosi',
    meta: 'UI/UX Designer, January 2026 - March 2026',
    points: [
      'Designed an app that improves household dynamics through conflict-neutral communication flows and task management that makes each person’s contribution visible.',
      'Ran user research to build personas and flows addressing friction points people described, then tested the proposed solutions.',
      'Built the branding and design system in Figma so high-fidelity prototypes stayed consistent.',
    ],
  },
];

export const workItems: ResumeItem[] = [
  {
    org: 'Design at UCI',
    meta: 'Workshops Coordinator, April 2026 - Present',
    points: [
      'Research, create and present workshops on design trends, design thinking methods and tools like Figma, for new and experienced designers.',
      'Host external workshops at hackathons and other events, using research insights to tailor the content to each audience.',
    ],
  },
  {
    org: 'UCI Office of Research',
    meta: 'Research Engagement and Compliance Assistant, July 2025 - Present',
    points: [
      'Manage compliance documentation by distributing required forms, running systematic follow-up communication, and joining team synchronisation meetings.',
      'Led a data cleanup across more than 2,000 records, improving database efficiency and consistency.',
      'Synthesise complex research information into short, actionable summaries and compile financial interest review packets for committee evaluation.',
    ],
  },
  {
    org: 'Palisades Charter High School',
    meta: 'Student Union Organizer, May 2022 - June 2023',
    points: [
      'Led more than 50 club members organising fundraising and community service projects, and oversaw club finances.',
      'Acted as liaison between the student body and school administration to secure funding and keep activities aligned with school policy.',
    ],
  },
];

export const educationItems: ResumeItem[] = [
  {
    org: 'University of California, Irvine',
    meta: 'B.S. Informatics, minor in Information and Computer Science, Expected June 2027',
    points: [
      'Regents Scholarship',
      'Dean’s Honor List',
      'Invited to the Campuswide Honors Collegium',
    ],
  },
];

export interface SkillGroup {
  id: string;
  label: string;
  items: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    id: 'technical',
    label: 'Technical Tools',
    items: [
      'Figma',
      'Framer',
      'Cursor',
      'Claude Code',
      'React',
      'TypeScript',
      'Python',
      'C++',
      'Java',
      'HTML',
      'CSS',
      'UnitTest',
      'GTest',
    ],
  },
  {
    id: 'design',
    label: 'Design And UX',
    items: [
      'High-fidelity prototyping',
      'Wireframing',
      'UI design',
      'Inclusive and accessible design (WCAG)',
      'Branding and design systems',
      'Design thinking',
      'Journey mapping',
      'User interviews',
      'Usability testing',
      'Case study writing',
      'Persona development',
      'Information architecture',
    ],
  },
  {
    id: 'collaboration',
    label: 'Working With People',
    items: [
      'Cross-functional collaboration',
      'Agile and Scrum delivery',
      'Developer handoff',
      'Workshop facilitation',
      'Public speaking',
      'Research synthesis',
      'Stakeholder communication',
      'Team leadership',
    ],
  },
];
