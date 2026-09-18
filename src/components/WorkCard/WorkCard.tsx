import { Link } from 'react-router-dom';
import { ArrowUpRightIcon } from '../icons';
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
        {meta.inProgress ? <span className={styles.badge}>Case Study In Progress</span> : null}
      </div>

      <div className={styles.head}>
        <h3 className={styles.title}>{meta.title}</h3>
        <p className={styles.role}>{meta.role}</p>
      </div>

      <div className={styles.body}>
        <p className={styles.meta}>{meta.timeframe}</p>
        <p className={styles.summary}>{meta.summary}</p>
        <div className={styles.tags}>
          <TagList items={meta.tags} label={`Skills used on ${meta.title}`} />
        </div>
        <div className={styles.footer}>
          <span className={styles.cta}>
            View Case Study
            <ArrowUpRightIcon />
          </span>
        </div>
      </div>
    </Link>
  );
}
