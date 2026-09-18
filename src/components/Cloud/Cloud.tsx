import styles from './Cloud.module.css';

type CloudKind = 'bank' | 'corner' | 'crest';
type CloudFill = 'white' | 'reveal';
type CloudPlacement =
  | 'heroLeft'
  | 'heroRight'
  | 'workRight'
  | 'workCorner'
  | 'aboutLeft'
  | 'aboutRight'
  | 'resumeLeft'
  | 'resumeCorner'
  | 'footerCorner';

interface CloudProps {
  kind: CloudKind;
  fill: CloudFill;
  placement: CloudPlacement;
  flip?: boolean;
}

const kindClass: Record<CloudKind, string> = {
  bank: styles.bank,
  corner: styles.corner,
  crest: styles.crest,
};

const fillClass: Record<CloudFill, string> = {
  white: styles.white,
  reveal: styles.reveal,
};

const placementClass: Record<CloudPlacement, string> = {
  heroLeft: styles.atHeroLeft,
  heroRight: styles.atHeroRight,
  workRight: styles.atWorkRight,
  workCorner: styles.atWorkCorner,
  aboutLeft: styles.atAboutLeft,
  aboutRight: styles.atAboutRight,
  resumeLeft: styles.atResumeLeft,
  resumeCorner: styles.atResumeCorner,
  footerCorner: styles.atFooterCorner,
};

export function Cloud({ kind, fill, placement, flip = false }: CloudProps) {
  const className = [
    styles.cloud,
    styles.float,
    kindClass[kind],
    fillClass[fill],
    placementClass[placement],
    flip ? styles.flip : '',
  ]
    .filter(Boolean)
    .join(' ');

  return <span className={className} aria-hidden="true" />;
}
