import styles from './Tag.module.css';

interface TagListProps {
  items: readonly string[];
  label: string;
}

export function TagList({ items, label }: TagListProps) {
  return (
    <ul className={styles.tagList} aria-label={label}>
      {items.map((item) => (
        <li key={item} className={styles.tag}>
          {item}
        </li>
      ))}
    </ul>
  );
}
