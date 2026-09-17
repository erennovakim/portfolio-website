import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Router-driven scrolling: a hash lands on its section, a plain route lands
 * at the top. Without this, returning from a case study to /#work leaves the
 * reader wherever the previous page was.
 */
export function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const node = document.getElementById(hash.slice(1));
      if (node) {
        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        node.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
        return;
      }
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname, hash]);

  return null;
}
