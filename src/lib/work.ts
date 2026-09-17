import type { ComponentType } from 'react';
import type { MDXProps } from 'mdx/types';

export interface WorkFrontmatter {
  slug: string;
  title: string;
  subtitle: string;
  summary: string;
  role: string;
  timeframe: string;
  context: string;
  tags: string[];
  cover: string;
  coverAlt: string;
  order: number;
  /** Marks a case study whose written content is still a draft. */
  inProgress?: boolean;
}

export interface WorkEntry {
  meta: WorkFrontmatter;
  Content: ComponentType<MDXProps>;
}

interface WorkModule {
  frontmatter: WorkFrontmatter;
  default: ComponentType<MDXProps>;
}

const REQUIRED_FIELDS: Array<keyof WorkFrontmatter> = [
  'slug',
  'title',
  'subtitle',
  'summary',
  'role',
  'timeframe',
  'context',
  'tags',
  'cover',
  'coverAlt',
  'order',
];

const modules = import.meta.glob<WorkModule>('../content/work/*.mdx', { eager: true });

export const work: WorkEntry[] = Object.entries(modules)
  .map(([path, mod]) => {
    const meta = mod.frontmatter;

    if (!meta) {
      throw new Error(`${path} is missing frontmatter.`);
    }

    const missing = REQUIRED_FIELDS.filter((field) => meta[field] === undefined);
    if (missing.length > 0) {
      throw new Error(`${path} is missing frontmatter fields: ${missing.join(', ')}.`);
    }

    return { meta, Content: mod.default };
  })
  .sort((a, b) => a.meta.order - b.meta.order);

export function findWork(slug: string | undefined): WorkEntry | undefined {
  return work.find((entry) => entry.meta.slug === slug);
}

export function nextWork(slug: string): WorkEntry {
  const index = work.findIndex((entry) => entry.meta.slug === slug);
  return work[(index + 1) % work.length];
}
