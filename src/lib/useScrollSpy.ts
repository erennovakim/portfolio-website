import { useEffect, useState } from 'react';

/**
 * Marks the section that currently contains a probe 40% down the viewport,
 * matching the mockup spy so short stacked sections do not steal the highlight.
 */
export function useScrollSpy(ids: readonly string[], enabled: boolean) {
  const [active, setActive] = useState('');

  useEffect(() => {
    if (!enabled) return;

    const read = () => {
      const probe = window.innerHeight * 0.4;
      let current = '';

      ids.forEach((id) => {
        const node = document.getElementById(id);
        if (!node) return;
        const rect = node.getBoundingClientRect();
        if (rect.top <= probe && rect.bottom > probe) current = id;
      });

      setActive(current);
    };

    read();
    window.addEventListener('scroll', read, { passive: true });
    window.addEventListener('resize', read);
    return () => {
      window.removeEventListener('scroll', read);
      window.removeEventListener('resize', read);
    };
  }, [ids, enabled]);

  return enabled ? active : '';
}
