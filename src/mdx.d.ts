declare module '*.mdx' {
  import type { ReactElement } from 'react';
  import type { MDXProps } from 'mdx/types';
  import type { WorkFrontmatter } from './lib/work';

  export const frontmatter: WorkFrontmatter;
  export default function MDXContent(props: MDXProps): ReactElement;
}
