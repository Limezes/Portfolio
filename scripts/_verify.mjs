/* Временный скрипт верификации: снимает главную RU/EN и ловит ошибки консоли. */
import { chromium } from 'playwright';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = dirname(fileURLToPath(import.meta.url)) + '/..';
const url = 'file://' + join(root, 'index.html');

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });

const errors = [];
page.on('console', (m) => { if (m.type() === 'error') errors.push('console: ' + m.text()); });
page.on('pageerror', (e) => errors.push('pageerror: ' + e.message));
page.on('requestfailed', (r) => errors.push('requestfailed: ' + r.url()));

await page.goto(url, { waitUntil: 'load' });
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(1800); // reveal-анимации

await page.screenshot({ path: '/tmp/lime-ru.png', fullPage: true });

await page.click('#langSwitch [data-lang="en"]');
await page.waitForTimeout(400);
await page.screenshot({ path: '/tmp/lime-en.png', fullPage: true });

console.log('lang:', await page.evaluate(() => document.documentElement.lang));
console.log('title:', await page.title());
console.log('errors:', errors.length ? JSON.stringify(errors, null, 2) : 'none');

await browser.close();
