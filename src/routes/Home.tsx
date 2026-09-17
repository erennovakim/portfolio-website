import { About } from '../sections/About/About';
import { Hero } from '../sections/Hero/Hero';
import { Resume } from '../sections/Resume/Resume';
import { Work } from '../sections/Work/Work';
import { useDocumentTitle } from '../lib/useDocumentTitle';

export function Home() {
  useDocumentTitle();

  return (
    <>
      <Hero />
      <Work />
      <About />
      <Resume />
    </>
  );
}
