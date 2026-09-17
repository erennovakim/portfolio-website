import { MDXProvider } from '@mdx-js/react';
import { Link, useParams } from 'react-router-dom';
import { mdxComponents } from '../components/mdx/blocks';
import { TagList } from '../components/Tag/TagList';
import { findWork, nextWork } from '../lib/work';
import { useDocumentTitle } from '../lib/useDocumentTitle';
import { NotFound } from './NotFound';
import styles from './CaseStudy.module.css';
import prose from './prose.module.css';

function BackLink() {
  return (
    <Link className={styles.back} to="/#work">
      <svg width="16" height="12" viewBox="0 0 16 12" aria-hidden="true">
        <path
          d="M6 1L1 6l5 5M1 6h14"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      Back to selected works
    </Link>
  );
}

export function CaseStudy() {
  const { slug } = useParams();
  const entry = findWork(slug);

  useDocumentTitle(entry?.meta.title);

  if (!entry) {
    return <NotFound />;
  }

  const { meta, Content } = entry;
  const upcoming = nextWork(meta.slug);

  return (
    <article>
      <header className={styles.header}>
        <div className="container">
          <BackLink />

          <h1 className={styles.title}>{meta.title}</h1>
          <p className={styles.subtitle}>{meta.subtitle}</p>

          <div className={styles.metaGrid}>
            <div>
              <p className={styles.metaLabel}>Role</p>
              <p className={styles.metaValue}>{meta.role}</p>
            </div>
            <div>
              <p className={styles.metaLabel}>Team</p>
              <p className={styles.metaValue}>{meta.context}</p>
            </div>
            <div>
              <p className={styles.metaLabel}>Timeframe</p>
              <p className={styles.metaValue}>{meta.timeframe}</p>
            </div>
            <div>
              <p className={styles.metaLabel}>Focus</p>
              <TagList items={meta.tags} label={`Skills used on ${meta.title}`} />
            </div>
          </div>

          <div className={styles.coverFrame}>
            <img className={styles.cover} src={meta.cover} alt={meta.coverAlt} />
          </div>
        </div>
      </header>

      <div className={styles.body}>
        <div className="container">
          {meta.inProgress ? (
            <p className={styles.draftNotice}>
              This case study is still being written. The structure below shows how the finished
              story will be laid out.
            </p>
          ) : null}

          <div className={prose.prose}>
            <MDXProvider components={mdxComponents}>
              <Content />
            </MDXProvider>
          </div>

          <div className={styles.next}>
            <Link className={styles.nextLink} to={`/work/${upcoming.meta.slug}`}>
              <p className={styles.nextLabel}>Next project</p>
              <p className={styles.nextTitle}>{upcoming.meta.title}</p>
            </Link>
            <BackLink />
          </div>
        </div>
      </div>
    </article>
  );
}
