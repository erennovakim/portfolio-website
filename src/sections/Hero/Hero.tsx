import { Button } from '../../components/Button/Button';
import { Motif } from '../../components/Motif/Motif';
import { site } from '../../lib/site';
import styles from './Hero.module.css';

export function Hero() {
  return (
    <section className={styles.hero} id="home" aria-labelledby="hero-name">
      <Motif kind="sprig" style={{ top: '18%', left: '4%' }} width={110} />
      <Motif
        kind="stem"
        style={{ bottom: '12%', right: '5%', transform: 'scaleX(-1)' }}
        width={96}
      />

      <div className={`container ${styles.inner}`}>
        <h1 className={styles.name} id="hero-name">
          {site.name}
        </h1>

        <p className={styles.tagline}>
          <span>Product designer driven by research,</span>
          <span className={styles.taglineAccent}>with a background in development.</span>
        </p>

        <div className={styles.actions}>
          <Button to="/#work">See selected works</Button>
          <Button href={`mailto:${site.email}`} variant="secondary">
            Get in touch
          </Button>
        </div>

        <aside className={styles.postcard} aria-label="Current focus">
          <img
            className={styles.portrait}
            src="/placeholders/portrait.svg"
            alt=""
            width={104}
            height={120}
          />
          <div>
            <p className={styles.postcardTitle}>Right now</p>
            <ul className={styles.postcardList}>
              <li>Designing PeterPlate, a campus dining ecosystem at UC Irvine.</li>
              <li>Studying Informatics, graduating June 2027.</li>
              <li>Based in {site.location}.</li>
            </ul>
          </div>
        </aside>
      </div>
    </section>
  );
}
