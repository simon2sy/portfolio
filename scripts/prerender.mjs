/**
 * Prerenders the app into dist/index.html after `vite build`
 * (run automatically by `npm run build`).
 *
 * The site is a single route, so the whole <App /> tree is rendered to static
 * HTML with react-dom/server and injected into <div id="root">. Crawlers (and
 * first paint) then get the real content — hero, projects, about, stack —
 * without waiting for JavaScript. src/main.tsx hydrates this markup in the
 * production build and falls back to createRoot in dev (empty root).
 *
 * No new dependencies: Vite loads the TSX sources, react-dom/server renders.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';

// Must be set before anything imports React so the SSR build uses the same
// production runtime as the client bundle (identical markup => clean hydration).
process.env.NODE_ENV = 'production';

const { createServer } = await import('vite');
const { renderToString } = await import('react-dom/server');
const { createElement } = await import('react');

const ROOT_MARKER = '<div id="root"></div>';
const distHtml = path.resolve(process.cwd(), 'dist', 'index.html');

const vite = await createServer({
  server: { middlewareMode: true },
  appType: 'custom',
  logLevel: 'error',
});

try {
  const { App } = await vite.ssrLoadModule('/src/App.tsx');
  const markup = renderToString(createElement(App));

  const html = readFileSync(distHtml, 'utf8');
  if (!html.includes(ROOT_MARKER)) {
    throw new Error(
      `Prerender marker not found in dist/index.html — expected ${ROOT_MARKER}`,
    );
  }
  writeFileSync(distHtml, html.replace(ROOT_MARKER, `<div id="root">${markup}</div>`), 'utf8');
  console.log(`prerendered dist/index.html  (${markup.length} chars of static HTML)`);
} finally {
  await vite.close();
}