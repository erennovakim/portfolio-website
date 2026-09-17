import { useEffect, useRef, useState } from 'react';

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Single entry point for scroll-triggered motion. Everything animated on
 * entry goes through here, so richer interaction work later is an additive
 * change rather than a hunt through components.
 */
export function useReveal<T extends HTMLElement>(delay = 0) {
  const ref = useRef<T>(null);
  const [revealed, setRevealed] = useState(() => prefersReducedMotion());

  useEffect(() => {
    const node = ref.current;
    if (!node || prefersReducedMotion()) {
      setRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            window.setTimeout(() => setRevealed(true), delay);
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.15 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [delay]);

  return { ref, revealed };
}
