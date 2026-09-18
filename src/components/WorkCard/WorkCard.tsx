import { Link } from 'react-router-dom';
import { TagList } from '../Tag/TagList';
import type { WorkFrontmatter } from '../../lib/work';
import styles from './WorkCard.module.css';

interface WorkCardProps {
  meta: WorkFrontmatter;
}

export function WorkCard({ meta }: WorkCardProps) {
  return (
    <Link className={styles.card} to={`/work/${meta.slug}`}>
      <div className={styles.coverFrame}>
        <img className={styles.cover} src={meta.cover} alt={meta.coverAlt} loading="lazy" />
        {meta.inProgress ? <span className={styles.badge}>Case study in progress</span> : null}
      </div>

      <div className={styles.body}>
        <div>
          <h3 className={styles.title}>{meta.title}</h3>
          <p className={styles.meta}>
            <span>{meta.role}</span>
            <span className={styles.metaDivider} aria-hidden="true" />
            <span>{meta.timeframe}</span>
          </p>
        </div>

        <p className={styles.summary}>{meta.summary}</p>

        <TagList items={meta.tags} label={`Skills used on ${meta.title}`} />

        <div className={styles.footer}>
          <span className={styles.cta}>Read case study</span>
        </div>
      </div>
    </Link>
  );
}
