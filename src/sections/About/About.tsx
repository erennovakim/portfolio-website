import { Cloud } from '../../components/Cloud/Cloud';
import styles from './About.module.css';

export function About() {
  return (
    <section className="section section--washed" id="about" aria-labelledby="about-heading">
      <Cloud kind="bank" fill="reveal" placement="aboutLeft" />
      <Cloud kind="corner" fill="reveal" placement="aboutRight" flip />

      <div className={`container container-wide ${styles.inner}`}>
        <div className={styles.layout}>
          <div>
            <div className={styles.heading}>
              <div className={styles.headingText}>
                <h2 id="about-heading">About</h2>
              </div>
            </div>

            <div className={styles.prose}>
              <p>
                I started out building products and moved toward the people using them. On
                PeterPlate I spent my first months as a software developer, writing the frontend and
                backend in TypeScript, tRPC and ShadCN, before taking the designer seat on the same
                team. Knowing what a decision costs to build changed how I make them.
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
          </div>
        </div>
      </div>
    </section>
  );
}
