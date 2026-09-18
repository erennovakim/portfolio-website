import { Button } from '../../components/Button/Button';
import { Cloud } from '../../components/Cloud/Cloud';
import { DownloadIcon, EnvelopeIcon } from '../../components/icons';
import { site } from '../../lib/site';
import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <Cloud kind="corner" fill="white" placement="footerCorner" flip />

      <div className="container">
        <div className={styles.layout}>
          <div>
            <h2 className={styles.title} id="contact-heading">
              Let’s Build Together!
            </h2>
            <p className={styles.lede}>
              I’m looking for product design internships and full-time roles.
            </p>

            <div className={styles.actions}>
              <Button href={`mailto:${site.email}`} variant="onDark">
                Email Me
                <EnvelopeIcon />
              </Button>
              <Button href={site.resume} variant="onDark" download>
                Download Resume
                <DownloadIcon />
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
              <span className={styles.contactLabel}>Based In</span>
              <span className={styles.contactLink}>{site.location}</span>
            </div>
          </div>
        </div>

        <div className={styles.baseline}>
          <span>© {new Date().getFullYear()} {site.name}</span>
          <a className={styles.topLink} href="/#home">
            Back To Top
          </a>
        </div>
      </div>
    </footer>
  );
}
