/* Скрины демо-сайтов для коллажей портфолио (dev-time).
   Запуск: npm run shots
   12 JPEG в images/shots/ — по 3 на каждый кейс (лёгкие, для коллажей). */
import { chromium } from 'playwright';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { mkdir } from 'node:fs/promises';

const root = dirname(fileURLToPath(import.meta.url)) + '/..';
const outDir = join(root, 'images', 'shots');
const W = 1280;
const H = 800;
const Q = 85; // качество JPEG

const shots = [
  { file: 'nimbus-hero.jpg',     url: 'cases/startup/index.html', scroll: null },
  { file: 'nimbus-features.jpg', url: 'cases/startup/index.html', scroll: '#features' },
  { file: 'nimbus-pricing.jpg',  url: 'cases/startup/index.html', scroll: '#pricing' },
  { file: 'kilo-hero.jpg',       url: 'cases/shop/index.html',    scroll: null },
  { file: 'kilo-catalog.jpg',    url: 'cases/shop/index.html',    scroll: '#catalog' },
  { file: 'kilo-features.jpg',   url: 'cases/shop/index.html',    scroll: '#features' },
  { file: 'pulse-hero.jpg',      url: 'cases/fitness/index.html', scroll: null },
  { file: 'pulse-schedule.jpg',  url: 'cases/fitness/index.html', scroll: '#schedule' },
  { file: 'pulse-pricing.jpg',   url: 'cases/fitness/index.html', scroll: '#pricing' },
  { file: 'bot-hero.jpg',        url: 'cases/bot/index.html',     scroll: null },
  { file: 'bot-features.jpg',    url: 'cases/bot/index.html',     scroll: '#features' },
  { file: 'bot-pricing.jpg',     url: 'cases/bot/index.html',     scroll: '#pricing' },
];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const byUrl = new Map();
for (const s of shots) {
  if (!byUrl.has(s.url)) byUrl.set(s.url, []);
  byUrl.get(s.url).push(s);
}

const browser = await chromium.launch();
await mkdir(outDir, { recursive: true });

for (const [rel, list] of byUrl) {
  const page = await browser.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 1 });
  await page.goto('file://' + join(root, rel), { waitUntil: 'domcontentloaded' });
  await page.evaluate(() => { document.documentElement.style.scrollBehavior = 'auto'; });
  await page.evaluate(() => document.fonts.ready);

  for (const s of list) {
    if (s.scroll) {
      await page.evaluate((sel) => {
        const el = document.querySelector(sel);
        if (!el) return;
        const top = el.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo(0, Math.max(top, 0));
      }, s.scroll);
    } else {
      await page.evaluate(() => window.scrollTo(0, 0));
    }
    await sleep(1700); // reveal-анимации + шрифты
    await page.screenshot({ path: join(outDir, s.file), type: 'jpeg', quality: Q, clip: { x: 0, y: 0, width: W, height: H } });
    console.log('  ✓ ' + s.file);
  }
  await page.close();
}

await browser.close();
console.log('Done: ' + shots.length + ' screenshots -> images/shots/');
