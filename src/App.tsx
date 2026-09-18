import { Outlet } from 'react-router-dom';
import { Nav } from './components/Nav/Nav';
import { Footer } from './sections/Footer/Footer';
import { ScrollManager } from './lib/ScrollManager';

export function App() {
  return (
    <>
      <div className="backdrop" aria-hidden="true" />
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <ScrollManager />
      <Nav />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
