import { useEffect, useState } from 'react';

/**
 * Tracks which section occupies the reading position so the nav can mark it
 * as current. Uses a band near the top of the viewport rather than plain
 * intersection, which keeps short sections from stealing the active state.
 */
export function useScrollSpy(ids: readonly string[], enabled: boolean) {
  const [active, setActive] = useState<string>(ids[0] ?? '');

  useEffect(() => {
    if (!enabled) return;

    const read = () => {
      const line = window.innerHeight * 0.35;
      let current = ids[0] ?? '';

      ids.forEach((id) => {
        const node = document.getElementById(id);
        if (node && node.getBoundingClientRect().top <= line) {
          current = id;
        }
      });

      const atBottom =
        window.innerHeight + window.scrollY >= document.body.scrollHeight - 2;
      if (atBottom) {
        current = ids[ids.length - 1] ?? current;
      }

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
