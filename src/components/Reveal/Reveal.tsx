import type { ElementType, ReactNode } from 'react';
import { useReveal } from '../../lib/useReveal';
import styles from './Reveal.module.css';

interface RevealProps {
  children: ReactNode;
  as?: ElementType;
  delay?: number;
  className?: string;
}

export function Reveal({ children, as: Tag = 'div', delay = 0, className }: RevealProps) {
  const { ref, revealed } = useReveal<HTMLElement>(delay);
  const classes = [styles.reveal, revealed ? styles.revealed : '', className]
    .filter(Boolean)
    .join(' ');

  return (
    <Tag ref={ref} className={classes}>
      {children}
    </Tag>
  );
}
