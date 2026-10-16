import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';

import '@fontsource-variable/inter';
import '@fontsource-variable/jetbrains-mono';

import './styles/index.css';
import { App } from './App';

const container = document.getElementById('root');

if (!container) {
  throw new Error('Root element #root not found in index.html');
}

const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

// `npm run build` prerenders the page into #root (scripts/prerender.mjs), so
// the production build hydrates that static markup. Dev serves an empty root
// and renders from scratch.
if (container.hasChildNodes()) {
  hydrateRoot(container, app);
} else {
  createRoot(container).render(app);
}