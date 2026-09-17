import type { ReactNode } from 'react';
import styles from './SectionHeading.module.css';

interface SectionHeadingProps {
  id: string;
  title: ReactNode;
  lede?: ReactNode;
  action?: ReactNode;
}

export function SectionHeading({ id, title, lede, action }: SectionHeadingProps) {
  return (
    <div className={styles.heading}>
      <div className={styles.text}>
        <div className={styles.rule} aria-hidden="true" />
        <h2 id={id}>{title}</h2>
        {lede ? <p className={styles.lede}>{lede}</p> : null}
      </div>
      {action ? <div className={styles.action}>{action}</div> : null}
    </div>
  );
}
