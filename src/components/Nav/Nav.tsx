import { Link, useLocation } from 'react-router-dom';
import { navLeft, navRight, navSheet, site, spySectionIds } from '../../lib/site';
import { useScrollSpy } from '../../lib/useScrollSpy';
import { useEffect, useRef, useState } from 'react';
import styles from './Nav.module.css';

type NavItem = (typeof navSheet)[number];

export function Nav() {
  const { pathname, hash } = useLocation();
  const isHome = pathname === '/';
  const active = useScrollSpy(spySectionIds, isHome);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [behind, setBehind] = useState<'sky' | 'overlay'>('sky');
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const apply = () => {
      setScrolled(window.scrollY > 24);

      const toggle = toggleRef.current;
      const washed = Array.from(document.querySelectorAll('.section--washed'));
      if (!toggle || washed.length === 0) {
        setBehind('sky');
        return;
      }
      const box = toggle.getBoundingClientRect();
      const midpoint = box.top + box.height / 2;
      const overWash = washed.some((section) => {
        const rect = section.getBoundingClientRect();
        return rect.top <= midpoint && rect.bottom >= midpoint;
      });
      setBehind(overWash ? 'overlay' : 'sky');
    };

    apply();
    window.addEventListener('scroll', apply, { passive: true });
    window.addEventListener('resize', apply);
    return () => {
      window.removeEventListener('scroll', apply);
      window.removeEventListener('resize', apply);
    };
  }, []);

  useEffect(() => {
    const close = () => setOpen(false);
    window.addEventListener('scroll', close, { passive: true });
    return () => window.removeEventListener('scroll', close);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname, hash]);

  const isCurrent = (id: string) => isHome && active === id;

  const itemLink = (item: NavItem, className: string) => {
    if (item.kind === 'mail') {
      return (
        <a className={className} href={`mailto:${site.email}`} onClick={() => setOpen(false)}>
          {item.label}
        </a>
      );
    }

    return (
      <Link
        to={`/#${item.id}`}
        className={`${className} ${isCurrent(item.id) ? styles.current : ''}`}
        aria-current={isCurrent(item.id) ? 'true' : undefined}
        onClick={() => setOpen(false)}
      >
        {item.label}
      </Link>
    );
  };

  return (
    <header
      className={styles.wrapper}
      data-scrolled={scrolled || !isHome ? 'true' : 'false'}
      data-behind={!isHome ? 'overlay' : behind}
    >
      <nav className={styles.pill} aria-label="Primary">
        <ul className={styles.list}>
          {navLeft.map((item) => (
            <li key={item.label}>{itemLink(item, styles.link)}</li>
          ))}
        </ul>

        <Link to="/#home" className={styles.wordmark}>
          {site.name}
        </Link>

        <ul className={styles.list}>
          {navRight.map((item) => (
            <li key={item.id}>{itemLink(item, styles.link)}</li>
          ))}
        </ul>
      </nav>

      <button
        ref={toggleRef}
        type="button"
        className={styles.toggle}
        aria-expanded={open}
        aria-controls="nav-sheet"
        onClick={() => setOpen((value) => !value)}
      >
        <span className={`${styles.toggleBars} ${open ? styles.toggleOpen : ''}`} aria-hidden="true" />
        <span className="visually-hidden">{open ? 'Close menu' : 'Menu'}</span>
      </button>

      <div className={`${styles.sheet} ${open ? styles.sheetOpen : ''}`} id="nav-sheet" hidden={!open}>
        <ul className={styles.sheetList}>
          {navSheet.map((item) => (
            <li key={item.label}>{itemLink(item, styles.sheetLink)}</li>
          ))}
        </ul>
      </div>
    </header>
  );
}
