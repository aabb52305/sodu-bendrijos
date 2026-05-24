import { chromium } from 'playwright';
const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
await page.waitForTimeout(2000);
// Capture the full hero section height
const heroH = await page.evaluate(() => document.getElementById('hero')?.offsetHeight ?? 900);
console.log('Hero section height:', heroH);
await page.screenshot({ path: 'screenshots/hero-full.png', clip: { x: 0, y: 0, width: 1440, height: heroH } });
// Also check what text content is in hero
const heroText = await page.evaluate(() => document.getElementById('hero')?.innerText);
console.log('Hero text:', heroText);
await browser.close();
