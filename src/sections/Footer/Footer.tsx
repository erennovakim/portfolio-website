import { Button } from '../../components/Button/Button';
import { site } from '../../lib/site';
import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <svg
        className={styles.motif}
        width="180"
        viewBox="0 0 120 300"
        aria-hidden="true"
        focusable="false"
      >
        <g fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
          <path d="M60 4C44 60 72 118 50 176c-14 38 6 74-4 116" />
          <path d="M0 0c14-11 36-8 47 5-13 12-35 10-47-5z" transform="translate(60 46) rotate(-24)" />
          <path
            d="M0 0c14-11 36-8 47 5-13 12-35 10-47-5z"
            transform="translate(56 92) rotate(150) scale(-1 1)"
          />
          <path d="M0 0c14-11 36-8 47 5-13 12-35 10-47-5z" transform="translate(60 150) rotate(-16)" />
        </g>
      </svg>

      <div className="container">
        <div className={styles.layout}>
          <div>
            <h2 className={styles.title} id="contact-heading">
              Let’s build something people can actually use.
            </h2>
            <p className={styles.lede}>
              I’m open to product design internships and collaborations for 2026 and 2027.
            </p>

            <div className={styles.actions}>
              <Button href={`mailto:${site.email}`} variant="onDark">
                Email me
              </Button>
              <Button href={site.resume} variant="onDark" download>
                Download resume
              </Button>
            </div>
          </div>

          <div className={styles.contact}>
            <div className={styles.contactRow}>
              <span className={styles.contactLabel}>Email</span>
              <a className={styles.contactLink} href={`mailto:${site.email}`}>
                {site.email}
              </a>
            </div>

            <div className={styles.contactRow}>
              <span className={styles.contactLabel}>LinkedIn</span>
              <a
                className={styles.contactLink}
                href={site.linkedin}
                target="_blank"
                rel="noreferrer"
              >
                linkedin.com/in/eren-kim
              </a>
            </div>

            <div className={styles.contactRow}>
              <span className={styles.contactLabel}>Based in</span>
              <span className={styles.contactLink}>{site.location}</span>
            </div>
          </div>
        </div>

        <div className={styles.baseline}>
          <span>© {new Date().getFullYear()} {site.name}</span>
          <a className={styles.topLink} href="#home">
            Back to top
          </a>
        </div>
      </div>
    </footer>
  );
}
