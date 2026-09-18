import { useEffect, useState, type CSSProperties } from 'react';
import styles from './PolaroidScatter.module.css';

const frames = [
  { tilt: '-11deg', hide: '58%', w: '13.2rem' },
  { tilt: '8deg', hide: '54%', w: '11.4rem' },
  { tilt: '-6deg', hide: '60%', w: '12.1rem' },
  { tilt: '13deg', hide: '56%', w: '10.6rem' },
  { tilt: '-14deg', hide: '62%', w: '11.8rem' },
  { tilt: '7deg', hide: '55%', w: '12.6rem' },
];

function countForWidth(width: number) {
  if (width < 520) return 2;
  if (width < 720) return 3;
  if (width < 980) return 4;
  if (width < 1240) return 5;
  return 6;
}

function isCoarse() {
  return window.matchMedia('(hover: none), (max-width: 860px)').matches;
}

export function PolaroidScatter() {
  const [count, setCount] = useState(6);
  const [raised, setRaised] = useState<number | null>(null);

  useEffect(() => {
    const layout = () => {
      const n = countForWidth(window.innerWidth);
      setCount(n);
      setRaised((current) => (current !== null && current >= n ? null : current));
    };

    layout();
    window.addEventListener('resize', layout);
    return () => window.removeEventListener('resize', layout);
  }, []);

  return (
    <div
      className={styles.scatter}
      style={{ ['--n' as string]: String(count) }}
      data-count={count}
      aria-hidden="true"
      onClick={(event) => {
        if (!isCoarse()) return;
        const card = (event.target as HTMLElement).closest('[data-polaroid]');
        if (!card) return;
        const index = Number(card.getAttribute('data-polaroid'));
        if (index >= count) return;
        setRaised((current) => (current === index ? null : index));
      }}
    >
      {frames.map((frame, index) => (
        <figure
          key={index}
          data-polaroid={index}
          className={`${styles.polaroid} ${raised === index ? styles.raised : ''}`}
          hidden={index >= count}
          style={
            {
              '--i': index,
              '--tilt': frame.tilt,
              '--hide': frame.hide,
              '--w': frame.w,
            } as CSSProperties
          }
        >
          <div className={styles.window} />
          <figcaption className={styles.caption}>photo to come</figcaption>
        </figure>
      ))}
    </div>
  );
}
