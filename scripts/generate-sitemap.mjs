/**
 * Generates dist/sitemap.xml at build time (run automatically by `npm run build`).
 *
 * The URL list is the single source of truth for indexable pages — add a route
 * here only when a page has its own canonical URL returning HTTP 200. Today the
 * site is a single page, so the sitemap contains exactly one canonical URL:
 * the HTTPS non-www root, matching the <link rel="canonical"> in index.html.
 */
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const SITE_URL = 'https://simonstha.com.np';

/** Indexable routes — canonical, 200-returning URLs only. No placeholders. */
const ROUTES = [
  { path: '/', changefreq: 'monthly', priority: '1.0' },
];

const lastmod = new Date().toISOString().slice(0, 10);

const entries = ROUTES.map(
  (route) => `  <url>
    <loc>${SITE_URL}${route.path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`,
).join('\n');

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</urlset>
`;

const distDir = path.resolve(process.cwd(), 'dist');
await mkdir(distDir, { recursive: true });
await writeFile(path.join(distDir, 'sitemap.xml'), sitemap, 'utf8');

console.log(`dist/sitemap.xml  ${ROUTES.length} url(s)  lastmod ${lastmod}`);