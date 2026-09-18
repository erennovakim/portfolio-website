import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { sections, site } from '../../lib/site';
import { useScrollSpy } from '../../lib/useScrollSpy';
import styles from './Nav.module.css';

const ids = sections.map((section) => section.id);
const [leftLinks, rightLinks] = [sections.slice(0, 2), sections.slice(2)];

export function Nav() {
  const { pathname, hash } = useLocation();
  const isHome = pathname === '/';
  const active = useScrollSpy(ids, isHome);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname, hash]);

  const isCurrent = (id: string) => isHome && active === id;

  const renderLinks = (items: typeof sections | typeof leftLinks) =>
    items.map((section) => (
      <li key={section.id}>
        <Link
          to={`/#${section.id}`}
          className={`${styles.link} ${isCurrent(section.id) ? styles.current : ''}`}
          aria-current={isCurrent(section.id) ? 'true' : undefined}
        >
          {section.label}
        </Link>
      </li>
    ));

  return (
    <header className={styles.wrapper}>
      <nav
        className={`${styles.pill} ${scrolled ? styles.scrolled : ''}`}
        aria-label="Primary"
      >
        <ul className={styles.list}>{renderLinks(leftLinks)}</ul>

        <Link to="/#home" className={styles.wordmark}>
          {site.name}
        </Link>

        <ul className={styles.list}>{renderLinks(rightLinks)}</ul>

        <button
          type="button"
          className={styles.toggle}
          aria-expanded={open}
          aria-controls="nav-sheet"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="visually-hidden">{open ? 'Close menu' : 'Open menu'}</span>
          <svg width="18" height="14" viewBox="0 0 18 14" aria-hidden="true">
            {open ? (
              <g stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                <path d="M3 2l12 10M15 2L3 12" />
              </g>
            ) : (
              <g stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                <path d="M1 2h16M1 7h16M1 12h16" />
              </g>
            )}
          </svg>
        </button>

        {open ? (
          <div className={styles.sheet} id="nav-sheet">
            <ul className={styles.sheetList}>
              {sections.map((section) => (
                <li key={section.id}>
                  <Link
                    to={`/#${section.id}`}
                    className={styles.sheetLink}
                    aria-current={isCurrent(section.id) ? 'true' : undefined}
                  >
                    {section.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </nav>
    </header>
  );
}
