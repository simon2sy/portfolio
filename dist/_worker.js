/**
 * Cloudflare Pages advanced-mode worker (served from dist/_worker.js).
 *
 * Responsibilities (repo-owned, so they never depend on dashboard settings):
 *   1. 301 http://simonstha.com.np  -> https://simonstha.com.np
 *   2. 301 www.simonstha.com.np    -> https://simonstha.com.np  (canonical host)
 *   3. 301 /index.html             -> /  (no duplicate copy of the homepage)
 *   4. True 404 status + branded public/404.html for unknown paths.
 *      Without this, Pages assumes an SPA (no top-level 404.html was
 *      deployed historically) and returns 200 + the homepage — a soft 404.
 *   5. Consistent caching + security headers on every response.
 *
 * Redirect rules only match the production domain, so localhost and
 * *.pages.dev preview deployments keep working untouched.
 */

const APEX_HOST = 'simonstha.com.np';

function redirectTo(location) {
  return new Response(null, { status: 301, headers: { Location: location } });
}

function canonicalHost(url) {
  // Single hop: canonical protocol + host, preserving path and query.
  if (url.hostname === `www.${APEX_HOST}`) {
    url.protocol = 'https:';
    url.hostname = APEX_HOST;
    return url.href;
  }
  if (url.protocol === 'http:' && url.hostname === APEX_HOST) {
    url.protocol = 'https:';
    return url.href;
  }
  return null;
}

function withHeaders(response, pathname) {
  const headers = new Headers(response.headers);

  if (/^\/(assets|images)\//.test(pathname)) {
    // Content-hashed bundles and generated images are immutable.
    headers.set('Cache-Control', 'public, max-age=31536000, immutable');
  } else {
    // HTML, robots.txt and sitemap.xml must revalidate on every request.
    headers.set('Cache-Control', 'public, max-age=0, must-revalidate');
  }

  headers.set('X-Frame-Options', 'DENY');
  headers.set('X-Content-Type-Options', 'nosniff');
  headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  headers.set('Strict-Transport-Security', 'max-age=31536000');

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    const canonical = canonicalHost(url);
    if (canonical) {
      return redirectTo(canonical);
    }

    // The homepage lives at / only.
    if (url.pathname === '/index.html') {
      url.pathname = '/';
      return redirectTo(url.href);
    }

    let response = await env.ASSETS.fetch(request);

    // Unknown path -> serve the branded 404 page with a real 404 status.
    if (response.status === 404) {
      const notFound = await env.ASSETS.fetch(new URL('/404.html', url.origin));
      if (notFound.ok) {
        response = new Response(notFound.body, {
          status: 404,
          headers: notFound.headers,
        });
      }
    }

    return withHeaders(response, url.pathname);
  },
};