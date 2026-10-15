# simonstha.com.np — Simon Shrestha

Editorial dark portfolio for Simon Shrestha ([@simon2sy](https://github.com/simon2sy)) — React + Vite + TypeScript + Tailwind CSS v4, built to deploy on Cloudflare Pages at `https://simonstha.com.np/`.

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
- Self-hosted fonts via Fontsource: Instrument Serif (display), Inter (text), JetBrains Mono (metadata)

## Develop

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # tsc -b && vite build → dist/
npm run preview    # serve the production build
```

### Assets

Project screenshots, the OG card and favicon variants are generated into `public/` by:

```bash
npm run generate:assets   # sharp: PNG screenshots → 1400px WebP, SVG OG card → PNG
```

Source screenshots live in `C:\temp\shots` on the original machine; the generated `public/images/**` files are committed so a fresh clone builds without them.

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
5. **Custom domain** → add `simonstha.com.np` (and `www`) → follow the DNS prompts (CNAME to the pages.dev host, or use the automatic DNS record option on a Cloudflare-managed zone).
6. HTTPS is provisioned automatically; the canonical URL in `index.html`, `sitemap.xml` and `robots.txt` is already `https://simonstha.com.np/`.

Caching/security headers ship from `public/_headers` (hashed assets immutable, HTML no-cache, security headers incl. COEP/CORP for the self-hosted images).

### Alternative: Wrangler CLI

```bash
npm run build
npx wrangler pages deploy dist --project-name simonstha-portfolio
```

## Notes

- The GitHub section uses the unauthenticated API (60 requests/hour/IP); results are cached for 30 minutes in `localStorage`, with a graceful error state linking to the profile.
- `og.png` (1200×630) is referenced by the meta tags in `index.html` — regenerate it via `generate-assets` if the copy changes.
