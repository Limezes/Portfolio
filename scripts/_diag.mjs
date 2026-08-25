import { chromium } from 'playwright';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
const root = dirname(fileURLToPath(import.meta.url)) + '/..';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
await page.goto('file://' + join('/Users/lime/Documents/work/case', 'index.html'));
await page.waitForTimeout(1500);
await page.screenshot({ path: '/tmp/hero.png' });
// measure stats layout
const info = await page.evaluate(() => {
  const s = document.querySelector('.hero__stats');
  const rects = [...s.children].map(c => { const r = c.getBoundingClientRect(); return {x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width)}; });
  const r = s.getBoundingClientRect();
  return { container: {x:Math.round(r.x), y:Math.round(r.y), w:Math.round(r.width)}, items: rects };
});
console.log(JSON.stringify(info, null, 2));
await browser.close();
