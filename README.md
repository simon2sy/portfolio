# simonstha.com.np — Simon Shrestha (Simon Stha)

Editorial portfolio for Simon Shrestha, also known as Simon Stha ([@simon2sy](https://github.com/simon2sy)) — React + Vite + TypeScript + Tailwind CSS v4, built to deploy on Cloudflare Pages at `https://simonstha.com.np/`.

## Sections

- **Hero** — typographic identity (no avatar), availability signal, core facts
- **01 Selected work** — 5 verified live projects with real screenshots, highlights and tech tags ([nismita.com.np](https://nismita.com.np), [dajubaighrailudyog.com.np](https://dajubaighrailudyog.com.np), [trustnepal.com.np](https://trustnepal.com.np), [lachi.com.np](https://lachi.com.np), [trustnepaltechnologies.com.np](https://trustnepaltechnologies.com.np))
- **02 About** — narrative + sticky facts ledger
- **03 Toolbox** — stack evidenced by the live projects/repos
- **04 GitHub** — repositories fetched live from the unauthenticated GitHub API (30-min localStorage cache, loading/error/empty states)
- **05 Contact / footer** — GitHub-first CTA; email + LinkedIn appear automatically once added to the data file

## Tech

- Vite + React 19 + TypeScript (strict)
- Tailwind CSS v4 (`@tailwindcss/vite`, `@theme` tokens in `src/styles/index.css`)
- framer-motion (`Reveal` scroll fades, `prefers-reduced-motion` respected)
- lucide-react icons; GitHub mark as inline SVG (`src/components/GithubMark.tsx`)
- Self-hosted fonts via Fontsource: Inter (text), JetBrains Mono (metadata)
- **Prerendered HTML**: `scripts/prerender.mjs` renders `<App />` into `dist/index.html` with `react-dom/server` at build time; `src/main.tsx` hydrates that markup in production and falls back to `createRoot` in dev
- **Cloudflare Pages advanced mode**: `public/_worker.js` handles canonical redirects, real 404s and response headers

## Develop

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # tsc -b && vite build → sitemap.xml → prerender → dist/
npm run preview    # serve the production build
```

## SEO

Everything indexable lives on the single canonical URL `https://simonstha.com.np/`:

- **Metadata** — title, meta description, canonical, Open Graph, Twitter card and `theme-color` are hand-maintained in `index.html`. Update them together when copy changes.
- **Structured data** — one JSON-LD `@graph` in `index.html` with `ProfilePage` + `WebSite` (preferred name "Simon Shrestha", `alternateName` "Simon Stha") + `Person` (`name` "Simon Shrestha", `alternateName` "Simon Stha", `sameAs` for GitHub/Facebook/Instagram). Keep it in sync with visible content; never add claims the page doesn't show.
- **Sitemap** — `scripts/generate-sitemap.mjs` writes `dist/sitemap.xml` during `npm run build` from its `ROUTES` list (canonical, HTTP-200 URLs only — no placeholders). `public/sitemap.xml` intentionally does not exist; the file is generated.
- **robots.txt** — `public/robots.txt` allows everything and points at the sitemap.
- **404s** — `public/404.html` (branded, `noindex`) makes Cloudflare Pages return a real `404` for unknown paths. Without a top-level `404.html`, Pages assumes an SPA and serves the homepage with `200` (a soft 404).
- **Redirects** — `public/_worker.js` (Pages advanced mode) issues `301`s: `http://simonstha.com.np` → `https://`, `www.simonstha.com.np` → apex (single hop), `/index.html` → `/`. It also sets HSTS plus caching/security headers on every response. `localhost` and `*.pages.dev` previews are intentionally left untouched.
- **Rendering** — the build prerenders the full page (hero, projects, about, stack) into static HTML, so crawlers and first paint never depend on client JS. The GitHub section loads live data client-side as progressive enhancement.
- **After deploying** — submit `https://simonstha.com.np/sitemap.xml` in Google Search Console and request indexing for the homepage.

### Assets

Project screenshots, the OG card, favicon variants and the hero portrait are generated into `public/` by:

```bash
npm run generate:assets   # sharp: PNG screenshots → 1400px WebP, portrait → WebP, SVG OG card → PNG
```

- Source screenshots live in `C:\temp\shots` on the original machine (the script skips them gracefully when the folder is absent); generated `public/images/**` files are committed so a fresh clone builds without them.
- The portrait source is `scripts/source/simon-shrestha-portrait.jpg` → `public/images/projects/simon-shrestha-portrait.webp`.
- The palette constants at the top of `scripts/generate-assets.mjs` mirror `src/styles/index.css` `@theme` — update them together when the design tokens change.

### Content

Everything copyable lives in `src/data/`:

- `profile.ts` — name, hero copy, about, availability, links (set `email` / `linkedin` to unlock those buttons)
- `projects.ts` — project entries (title, copy, highlights, tech, live/repo URLs, screenshot, grid span)
- `stack.ts` — toolbox groups

## Deploy — Cloudflare Pages

1. Push the repo to GitHub.
2. Cloudflare dashboard → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
3. Build settings:
   - Framework preset: **Vite**
   - Build command: `npm run build`
   - Build output directory: `dist`
4. Deploy. You get a `*.pages.dev` URL.
5. **Custom domain** → add `simonstha.com.np` (and `www`) → follow the DNS prompts (CNAME to the pages.dev host or the automatic DNS record option on a Cloudflare-managed zone).
6. HTTPS is provisioned automatically; the canonical URL in `index.html`, the generated `sitemap.xml` and `robots.txt` is already `https://simonstha.com.np/`.
7. `public/_worker.js` deploys as Pages advanced mode — it performs the HTTP→HTTPS and www→apex `301`s and serves the custom `404.html`, so no dashboard redirect rules are required (a zone-level www redirect, if one exists, simply fires first).

Caching/security headers ship from both `public/_headers` and the worker (hashed assets immutable, HTML revalidated, `X-Frame-Options`/`nosniff`/`Referrer-Policy`/HSTS).

### Alternative: Wrangler CLI

```bash
npm run build
npx wrangler pages deploy dist --project-name simonstha-portfolio
```

Local end-to-end check of the worker (404s, redirects, headers):

```bash
npx wrangler pages dev dist --port 8788
```

## Notes

- The GitHub section uses the unauthenticated API (60 requests/hour/IP); results are cached for 30 minutes in `localStorage`, with a graceful error state linking to the profile.
- `og.png` (1200×630) is referenced by the meta tags in `index.html` — regenerate it via `generate:assets` if the copy or palette changes.
- Dev serves an empty `#root` (`createRoot`); the built `dist/index.html` is prerendered and hydrated (`hydrateRoot`). If hydration warnings appear in production, check that SSR and client render the same content (React versions stay in lockstep via `package-lock.json`).
