/**
 * Generates the static image assets for the portfolio:
 *
 *   public/images/projects/*.webp   — project screenshots (max 1400w)
 *   public/images/og.png            — 1200x630 social share card
 *   public/favicon-32.png           — rasterised favicon (32x32)
 *   public/apple-touch-icon.png     — Apple touch icon (180x180)
 *
 * Source screenshots live in C:\temp\shots (captured with Playwright).
 * Run with: npm run generate:assets
 */
import { mkdir, access } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const SHOTS_DIR = 'C:/temp/shots';
const PUBLIC_DIR = path.resolve(process.cwd(), 'public');

// Current site palette (src/styles/index.css @theme): light canvas, dark type,
// violet→cyan accent. Keep these in sync when the design tokens change.
const INK = '#f4f4f1';
const PAPER = '#16181d';
const DIM = '#4b4f58';
const FAINT = '#7a7e88';
const ACCENT = '#7c3aed';

const PROJECT_IDS = [
  'nismita-craft-studio',
  'daju-bhai-grill-udyog',
  'trust-nepal-suppliers',
  'lachi-by-pradhan',
  'trust-nepal-technologies',
];

/** Stylised "S" monogram — two stacked arcs, shared by favicon and OG card. */
const MONOGRAM_S = 'M41 23 A9 9 0 1 0 32 32 A9 9 0 1 1 23 41';

async function buildProjectShots() {
  const outDir = path.join(PUBLIC_DIR, 'images', 'projects');
  await mkdir(outDir, { recursive: true });

  try {
    await access(path.join(SHOTS_DIR, `${PROJECT_IDS[0]}.png`));
  } catch {
    console.log(`projects/*.webp  skipped — source screenshots not found in ${SHOTS_DIR}`);
    return;
  }

  for (const id of PROJECT_IDS) {
    const src = path.join(SHOTS_DIR, `${id}.png`);
    const out = path.join(outDir, `${id}.webp`);
    const info = await sharp(src)
      .resize({ width: 1400, withoutEnlargement: true })
      .webp({ quality: 80, effort: 5 })
      .toFile(out);
    console.log(`projects/${id}.webp  ${info.width}x${info.height}  ${info.size}b`);
  }
}

/** Hero portrait: source photo -> 900w WebP (reproducible, source kept out of public/). */
async function buildPortrait() {
  const src = path.resolve(process.cwd(), 'scripts', 'source', 'simon-shrestha-portrait.jpg');
  const out = path.join(PUBLIC_DIR, 'images', 'projects', 'simon-shrestha-portrait.webp');
  try {
    const info = await sharp(src)
      .resize({ width: 900, withoutEnlargement: true })
      .webp({ quality: 80, effort: 5 })
      .toFile(out);
    console.log(`projects/simon-shrestha-portrait.webp  ${info.width}x${info.height}  ${info.size}b`);
  } catch (error) {
    console.log(`projects/simon-shrestha-portrait.webp  skipped — ${error.message}`);
  }
}

function buildOgSvg() {
  return Buffer.from(`
  <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
    <rect width="1200" height="630" fill="${INK}"/>
    <rect x="36" y="36" width="1128" height="558" fill="none" stroke="${PAPER}" stroke-opacity="0.14"/>

    <text x="88" y="150" fill="${FAINT}" font-family="'JetBrains Mono', Consolas, monospace"
      font-size="21" letter-spacing="6">FULL-STACK DEVELOPER &#183; NEPAL</text>

    <text x="84" y="300" fill="${PAPER}" font-family="Georgia, 'Times New Roman', serif"
      font-size="102">Simon Shrestha</text>

    <text x="88" y="352" fill="${DIM}" font-family="Georgia, 'Times New Roman', serif"
      font-size="40" font-style="italic">also known as Simon Stha</text>

    <rect x="88" y="382" width="148" height="6" fill="${ACCENT}"/>

    <text x="88" y="430" fill="${DIM}" font-family="Georgia, 'Times New Roman', serif"
      font-size="42" font-style="italic">Building useful software for real businesses.</text>

    <text x="88" y="545" fill="${ACCENT}" font-family="'JetBrains Mono', Consolas, monospace"
      font-size="24" letter-spacing="4">simonstha.com.np</text>

    <g transform="translate(1000,88)">
      <rect width="96" height="96" rx="20" fill="${ACCENT}"/>
      <g transform="translate(16,16) scale(1)">
        <path d="${MONOGRAM_S}" fill="none" stroke="${INK}" stroke-width="7" stroke-linecap="round"/>
      </g>
    </g>
  </svg>`);
}

function buildIconSvg(size) {
  return Buffer.from(`
  <svg width="${size}" height="${size}" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
    <rect width="64" height="64" rx="14" fill="${ACCENT}"/>
    <path d="${MONOGRAM_S}" fill="none" stroke="${INK}" stroke-width="7" stroke-linecap="round"/>
  </svg>`);
}

async function buildSocialAndIcons() {
  const imagesDir = path.join(PUBLIC_DIR, 'images');
  await mkdir(imagesDir, { recursive: true });

  const og = await sharp(buildOgSvg()).png().toFile(path.join(imagesDir, 'og.png'));
  console.log(`images/og.png  ${og.width}x${og.height}  ${og.size}b`);

  const icon32 = await sharp(buildIconSvg(64))
    .resize(32, 32)
    .png()
    .toFile(path.join(PUBLIC_DIR, 'favicon-32.png'));
  console.log(`favicon-32.png  ${icon32.width}x${icon32.height}`);

  const touch = await sharp(buildIconSvg(64))
    .resize(180, 180)
    .png()
    .toFile(path.join(PUBLIC_DIR, 'apple-touch-icon.png'));
  console.log(`apple-touch-icon.png  ${touch.width}x${touch.height}`);
}

try {
  await buildProjectShots();
  await buildPortrait();
  await buildSocialAndIcons();
  console.log('done.');
} catch (error) {
  console.error('generate:assets failed:', error);
  process.exit(1);
}
