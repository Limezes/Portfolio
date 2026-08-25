/* Временная проверка: скрины ключевых секций главной страницы (RU + EN). */
import { chromium } from 'playwright';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { mkdir } from 'node:fs/promises';

const root = dirname(fileURLToPath(import.meta.url)) + '/..';
const out = '/tmp/lime-check';
await mkdir(out, { recursive: true });
const W = 1280, H = 800;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const browser = await chromium.launch();
async function cap(lang, target, name) {
  const page = await browser.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 1 });
  await page.goto('file://' + join(root, 'index.html'), { waitUntil: 'domcontentloaded' });
  await page.evaluate(() => { document.documentElement.style.scrollBehavior = 'auto'; });
  if (lang === 'en') {
    await page.evaluate(() => { try { localStorage.setItem('lime-lang', 'en'); } catch (e) {} });
    await page.reload({ waitUntil: 'domcontentloaded' });
  }
  await page.evaluate(() => document.fonts.ready);
  if (target) {
    await page.evaluate((sel) => {
      const el = document.querySelector(sel);
      if (el) { const t = el.getBoundingClientRect().top + window.scrollY - 70; window.scrollTo(0, Math.max(t, 0)); }
    }, target);
  }
  await sleep(1800);
  await page.screenshot({ path: join(out, name + '.png'), clip: { x: 0, y: 0, width: W, height: H } });
  await page.close();
}
await cap('ru', null, 'ru-hero');
await cap('ru', '#works', 'ru-works');
await cap('ru', '#about', 'ru-about');
await cap('ru', '#reviews', 'ru-reviews');
await cap('ru', '#contact', 'ru-footer');
await cap('en', null, 'en-hero');
console.log('done');
await browser.close();
