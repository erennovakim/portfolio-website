import { Button } from '../../components/Button/Button';
import { Motif } from '../../components/Motif/Motif';
import { Reveal } from '../../components/Reveal/Reveal';
import { SectionHeading } from '../../components/SectionHeading/SectionHeading';
import { skillGroups, timeline } from '../../lib/resume';
import { site } from '../../lib/site';
import styles from './Resume.module.css';

export function Resume() {
  return (
    <section className={styles.section} id="resume" aria-labelledby="resume-heading">
      <Motif kind="stem" style={{ top: '10%', right: '3%' }} width={96} />

      <div className="container">
        <SectionHeading
          id="resume-heading"
          title="Resume"
          lede="Education, projects and work, in the order they happened."
          action={
            <Button href={site.resume} download>
              Download resume
            </Button>
          }
        />

        {timeline.map((group) => (
          <div className={styles.group} key={group.id}>
            <h3 className={styles.groupLabel} id={`resume-${group.id}`}>
              {group.label}
            </h3>

            <ol className={styles.rail} aria-labelledby={`resume-${group.id}`}>
              {group.entries.map((entry) => (
                <li className={styles.entry} key={`${entry.org}-${entry.role}-${entry.timeframe}`}>
                  <span className={styles.node} aria-hidden="true" />

                  <div className={styles.entryHead}>
                    <h4 className={styles.role}>{entry.role}</h4>
                    <span className={styles.timeframe}>{entry.timeframe}</span>
                  </div>

                  <p className={styles.org}>{entry.org}</p>

                  <ul className={styles.points}>
                    {entry.points.map((point) => (
                      <li className={styles.point} key={point}>
                        <span className={styles.pointMark} aria-hidden="true" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          </div>
        ))}

        <div className={styles.skills}>
          {skillGroups.map((group, index) => (
            <Reveal key={group.id} className={styles.skillGroup} delay={index * 80}>
              <h3 className={styles.skillLabel}>{group.label}</h3>
              <p className={styles.skillDescription}>{group.description}</p>
              <ul className={styles.skillList}>
                {group.items.map((item) => (
                  <li className={styles.skill} key={item}>
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>

        <div className={styles.footnote}>
          <p className={styles.footnoteText}>
            Want the one-page version to pass along? Take the PDF.
          </p>
          <Button href={site.resume} download>
            Download resume
          </Button>
        </div>
      </div>
    </section>
  );
}
