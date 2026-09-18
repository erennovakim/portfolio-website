import { Button } from '../../components/Button/Button';
import { Cloud } from '../../components/Cloud/Cloud';
import { DownloadIcon } from '../../components/icons';
import {
  educationItems,
  peterplateCluster,
  projectItems,
  skillGroups,
  workItems,
  type ResumeItem,
} from '../../lib/resume';
import { site } from '../../lib/site';
import styles from './Resume.module.css';

function ResumeDetails({ item, nested = false }: { item: ResumeItem; nested?: boolean }) {
  return (
    <details className={`${styles.item} ${nested ? styles.nested : ''}`}>
      <summary>
        <span className={styles.summary}>
          {item.org ? <span className={styles.org}>{item.org}</span> : null}
          <span className={styles.meta}>{item.meta}</span>
        </span>
        <span className={styles.chevron} aria-hidden="true" />
      </summary>
      <ul className={styles.points}>
        {item.points.map((point) => (
          <li key={point}>{point}</li>
        ))}
      </ul>
    </details>
  );
}

export function Resume() {
  return (
    <section className="section" id="resume" aria-labelledby="resume-heading">
      <Cloud kind="bank" fill="white" placement="resumeLeft" />
      <Cloud kind="corner" fill="white" placement="resumeCorner" flip />

      <div className={`container container-wide ${styles.inner}`}>
        <div className={`haze ${styles.haze}`} aria-hidden="true" />
        <h2 className="visually-hidden" id="resume-heading">
          Resume
        </h2>

        <div className={styles.group}>
          <h3 className={styles.groupLabel} id="resume-experience">
            Experience
          </h3>

          <h4 className={styles.subhead} id="resume-projects">
            Projects
          </h4>
          <div className={styles.list}>
            <div className={styles.cluster}>
              <p className={styles.org}>{peterplateCluster.org}</p>
              {peterplateCluster.roles.map((role) => (
                <ResumeDetails key={role.meta} item={role} nested />
              ))}
            </div>
            {projectItems.map((item) => (
              <ResumeDetails key={item.org} item={item} />
            ))}
          </div>

          <h4 className={styles.subhead} id="resume-work">
            Work
          </h4>
          <div className={styles.list}>
            {workItems.map((item) => (
              <ResumeDetails key={item.org} item={item} />
            ))}
          </div>

          <div className={styles.experienceFooter}>
            <Button href={site.resume} download variant="onDark">
              Download Resume
              <DownloadIcon />
            </Button>
          </div>
        </div>

        <div className={styles.group}>
          <h3 className={styles.groupLabel} id="resume-education">
            Education
          </h3>
          <div className={styles.list}>
            {educationItems.map((item) => (
              <ResumeDetails key={item.org} item={item} />
            ))}
          </div>
        </div>

        <div className={styles.group}>
          <h3 className={styles.groupLabel} id="resume-skills">
            Skills
          </h3>
          <div className={styles.skills}>
            {skillGroups.map((group) => (
              <div className={styles.skillGroup} key={group.id}>
                <h4 className={styles.skillLabel}>{group.label}</h4>
                <ul className={styles.skillList}>
                  {group.items.map((item) => (
                    <li className={styles.skill} key={item}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
