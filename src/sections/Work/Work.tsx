import { Motif } from '../../components/Motif/Motif';
import { Reveal } from '../../components/Reveal/Reveal';
import { SectionHeading } from '../../components/SectionHeading/SectionHeading';
import { WorkCard } from '../../components/WorkCard/WorkCard';
import { work } from '../../lib/work';
import styles from './Work.module.css';

export function Work() {
  return (
    <section className={styles.section} id="work" aria-labelledby="work-heading">
      <Motif kind="seed" style={{ top: '6%', right: '2%' }} width={92} />

      <div className="container">
        <SectionHeading
          id="work-heading"
          title="Selected works"
          lede="Four projects where research shaped what got built, from campus dining to assistive audio."
        />

        <div className={styles.grid}>
          {work.map((entry, index) => (
            <Reveal key={entry.meta.slug} delay={index * 70}>
              <WorkCard meta={entry.meta} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
