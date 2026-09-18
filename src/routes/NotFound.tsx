import { Button } from '../components/Button/Button';
import { useDocumentTitle } from '../lib/useDocumentTitle';
import styles from './NotFound.module.css';

export function NotFound() {
  useDocumentTitle('Page not found');

  return (
    <section className={`container ${styles.wrapper}`}>
      <h1>This page moved, or never existed.</h1>
      <p className="lede">Head back to the portfolio and pick up from the selected works.</p>
      <Button to="/#work">See selected works</Button>
    </section>
  );
}
