import type { CSSProperties, ReactElement } from 'react';
import styles from './Motif.module.css';

type MotifKind = 'sprig' | 'stem' | 'seed';

interface MotifProps {
  kind?: MotifKind;
  style?: CSSProperties;
  width?: number;
}

const leaf = 'M0 0c14-11 36-8 47 5-13 12-35 10-47-5z';

function Sprig() {
  return (
    <g fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
      <path d="M60 4C44 60 72 118 50 176c-14 38 6 74-4 116" />
      <g fill="none">
        <path d={leaf} transform="translate(60 40) rotate(-24)" />
        <path d={leaf} transform="translate(56 66) rotate(150) scale(-1 1)" />
        <path d={leaf} transform="translate(64 104) rotate(-14)" />
        <path d={leaf} transform="translate(52 136) rotate(158) scale(-1 1)" />
        <path d={leaf} transform="translate(56 182) rotate(-30)" />
        <path d={leaf} transform="translate(48 220) rotate(146) scale(-1 1)" />
      </g>
    </g>
  );
}

function Stem() {
  return (
    <g fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
      <path d="M62 0c-18 74 16 132-6 208" />
      <path d="M60 52c-22-6-34-22-38-44" />
      <path d="M62 96c20-8 30-26 32-50" />
      <path d="M58 150c-22-4-36-20-42-42" />
      <circle cx="62" cy="196" r="7" />
    </g>
  );
}

function Seed() {
  return (
    <g fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
      <circle cx="60" cy="60" r="26" />
      <path d="M60 34c14 10 14 42 0 52-14-10-14-42 0-52z" />
      <path d="M60 86v46" />
      <path d={leaf} transform="translate(60 104) rotate(-18)" />
      <path d={leaf} transform="translate(58 126) rotate(160) scale(-1 1)" />
    </g>
  );
}

const shapes: Record<MotifKind, { node: ReactElement; viewBox: string }> = {
  sprig: { node: <Sprig />, viewBox: '0 0 120 300' },
  stem: { node: <Stem />, viewBox: '0 0 120 210' },
  seed: { node: <Seed />, viewBox: '0 0 120 150' },
};

export function Motif({ kind = 'sprig', style, width = 120 }: MotifProps) {
  const shape = shapes[kind];

  return (
    <svg
      className={styles.motif}
      style={style}
      width={width}
      viewBox={shape.viewBox}
      aria-hidden="true"
      focusable="false"
    >
      {shape.node}
    </svg>
  );
}
