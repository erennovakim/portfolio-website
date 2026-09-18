import { Cloud } from '../../components/Cloud/Cloud';
import styles from './Hero.module.css';

export function Hero() {
  return (
    <section className={`section ${styles.hero}`} id="home" aria-labelledby="hero-name">
      <Cloud kind="bank" fill="white" placement="heroLeft" />
      <Cloud kind="bank" fill="white" placement="heroRight" flip />

      <div className={`container ${styles.inner}`}>
        <div className={`haze ${styles.haze}`} aria-hidden="true" />

        <p className={styles.kicker}>Hi, I'm Eren.</p>
        <h1 className={styles.title} id="hero-name">
          Designing human
          <br />
          experiences, <em>thoughtfully</em>.
        </h1>
        <p className={styles.sub}>
          I'm a product designer who combines research with my background in development to make
          design decisions that are purposeful and feasible.
        </p>
      </div>
    </section>
  );
}
