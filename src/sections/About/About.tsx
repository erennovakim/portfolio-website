import { Motif } from '../../components/Motif/Motif';
import { SectionHeading } from '../../components/SectionHeading/SectionHeading';
import styles from './About.module.css';

const honors = [
  'Regents Scholarship',
  "Dean's Honor List",
  'Invited to the Campuswide Honors Collegium',
];

export function About() {
  return (
    <section className={styles.section} id="about" aria-labelledby="about-heading">
      <Motif kind="sprig" style={{ top: '14%', left: '2%' }} width={100} />

      <div className="container">
        <SectionHeading
          id="about-heading"
          title="About"
          lede="How a developer background changed the way I design."
        />

        <div className={styles.layout}>
          <div className={styles.prose}>
            <p>
              I started out building products and moved toward the people using them. On
              PeterPlate I spent my first months as a software developer, writing the frontend and
              backend in TypeScript, tRPC and ShadCN, before taking the designer seat on the same
              team. Knowing what a decision costs to build changed how I make them.
            </p>

            <p className={styles.pullquote}>
              Research is the part of design that keeps you honest.
            </p>

            <p>
              Every project here began with people rather than a brief. I run interviews and
              usability tests, map the journey, and keep revising until the design answers a
              friction point someone actually described to me. For Ēkyu that meant designing
              alongside a hearing-impaired collaborator. For Cosi it meant learning how housemates
              really negotiate chores before proposing a single screen.
            </p>

            <p>
              I also teach what I learn. As workshops coordinator at Design at UCI, I research and
              run sessions on design thinking, accessibility and Figma for new and experienced
              designers, including at hackathons and external events.
            </p>
          </div>

          <aside className={styles.aside}>
            <img
              className={styles.portrait}
              src="/placeholders/portrait-wide.svg"
              alt=""
              width={420}
              height={336}
            />

            <div>
              <p className={styles.schoolName}>University of California, Irvine</p>
              <p className={styles.degree}>
                B.S. Informatics, minor in Information &amp; Computer Science. Expected June 2027.
              </p>
            </div>

            <div className={styles.divider} aria-hidden="true" />

            <ul className={styles.honors}>
              {honors.map((honor) => (
                <li key={honor} className={styles.honor}>
                  <span className={styles.dot} aria-hidden="true" />
                  <span>{honor}</span>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </div>
    </section>
  );
}
