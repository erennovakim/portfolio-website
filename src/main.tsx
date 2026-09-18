import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { App } from './App';
import { CaseStudy } from './routes/CaseStudy';
import { Home } from './routes/Home';
import { NotFound } from './routes/NotFound';
import './styles/tokens.css';
import './styles/base.css';
import './styles/typography.css';

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/work/:slug', element: <CaseStudy /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
