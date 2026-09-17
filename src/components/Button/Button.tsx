import type { AnchorHTMLAttributes, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import styles from './Button.module.css';

type Variant = 'primary' | 'secondary' | 'ghost' | 'onDark';

interface BaseProps {
  variant?: Variant;
  children: ReactNode;
  className?: string;
}

interface LinkProps extends BaseProps {
  to: string;
  href?: never;
}

interface AnchorProps
  extends BaseProps,
    Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'className' | 'children'> {
  href: string;
  to?: never;
}

type ButtonProps = LinkProps | AnchorProps;

export function Button(props: ButtonProps) {
  const { variant = 'primary', children, className } = props;
  const classes = [styles.button, styles[variant], className].filter(Boolean).join(' ');

  if ('to' in props && props.to) {
    return (
      <Link to={props.to} className={classes}>
        {children}
      </Link>
    );
  }

  const { variant: _variant, className: _className, children: _children, ...anchorProps } =
    props as AnchorProps;

  return (
    <a {...anchorProps} className={classes}>
      {children}
    </a>
  );
}
