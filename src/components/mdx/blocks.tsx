import type { ReactNode } from 'react';
import styles from './mdx.module.css';

interface FigureProps {
  src: string;
  alt: string;
  caption?: string;
}

export function Figure({ src, alt, caption }: FigureProps) {
  return (
    <figure className={styles.figure}>
      <img className={styles.figureImage} src={src} alt={alt} loading="lazy" />
      {caption ? <figcaption className={styles.caption}>{caption}</figcaption> : null}
    </figure>
  );
}

interface GalleryProps {
  items: FigureProps[];
}

export function Gallery({ items }: GalleryProps) {
  return (
    <div className={styles.gallery}>
      {items.map((item) => (
        <figure className={styles.galleryItem} key={item.src}>
          <img className={styles.figureImage} src={item.src} alt={item.alt} loading="lazy" />
          {item.caption ? <figcaption className={styles.caption}>{item.caption}</figcaption> : null}
        </figure>
      ))}
    </div>
  );
}

interface PanelProps {
  title?: string;
  children: ReactNode;
}

export function SideBySide({ children }: { children: ReactNode }) {
  return <div className={styles.sideBySide}>{children}</div>;
}

export function Panel({ title, children }: PanelProps) {
  return (
    <div className={styles.panel}>
      {title ? <h3 className={styles.panelTitle}>{title}</h3> : null}
      {children}
    </div>
  );
}

interface PullquoteProps {
  children: ReactNode;
  from?: string;
}

export function Pullquote({ children, from }: PullquoteProps) {
  return (
    <blockquote className={styles.pullquote}>
      <p className={styles.pullquoteText}>{children}</p>
      {from ? <p className={styles.attribution}>{from}</p> : null}
    </blockquote>
  );
}

interface StatItem {
  value: string;
  label: string;
}

export function Stats({ items }: { items: StatItem[] }) {
  return (
    <div className={styles.statRow}>
      {items.map((item) => (
        <div className={styles.stat} key={item.label}>
          <p className={styles.statValue}>{item.value}</p>
          <p className={styles.statLabel}>{item.label}</p>
        </div>
      ))}
    </div>
  );
}

interface NoteProps {
  title?: string;
  children: ReactNode;
}

export function Note({ title, children }: NoteProps) {
  return (
    <aside className={styles.note}>
      {title ? <h3 className={styles.noteTitle}>{title}</h3> : null}
      {children}
    </aside>
  );
}

export const mdxComponents = {
  Figure,
  Gallery,
  SideBySide,
  Panel,
  Pullquote,
  Stats,
  Note,
};
