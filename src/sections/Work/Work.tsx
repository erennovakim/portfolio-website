import { Cloud } from '../../components/Cloud/Cloud';
import { WorkCard } from '../../components/WorkCard/WorkCard';
import { work } from '../../lib/work';
import styles from './Work.module.css';

export function Work() {
  return (
    <section className="section section--washed" id="work" aria-labelledby="work-heading">
      <Cloud kind="bank" fill="reveal" placement="workRight" flip />
      <Cloud kind="corner" fill="reveal" placement="workCorner" />

      <div className="container container-wide">
        <h2 className="visually-hidden" id="work-heading">
          Works
        </h2>

        <div className={styles.grid}>
          {work.map((entry) => (
            <WorkCard key={entry.meta.slug} meta={entry.meta} />
          ))}
        </div>
      </div>
    </section>
  );
}
