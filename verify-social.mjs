import { chromium } from 'playwright';
const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });

// Sodų šventės (SubFullQuote)
await page.evaluate(() => document.getElementById('social')?.scrollIntoView({ behavior: 'instant' }));
await page.waitForTimeout(1000);
await page.screenshot({ path: 'screenshots/social-01-sventos.png' });

// Scroll to Kaimynai (SubCentered)
await page.evaluate(() => window.scrollBy({ top: 900, behavior: 'instant' }));
await page.waitForTimeout(800);
await page.screenshot({ path: 'screenshots/social-02-kaimynai.png' });

// Scroll to Šeima (SubLeftNum)
await page.evaluate(() => window.scrollBy({ top: 900, behavior: 'instant' }));
await page.waitForTimeout(800);
await page.screenshot({ path: 'screenshots/social-03-seima.png' });

// Scroll to Darbas (SubRightLine)
await page.evaluate(() => window.scrollBy({ top: 900, behavior: 'instant' }));
await page.waitForTimeout(800);
await page.screenshot({ path: 'screenshots/social-04-darbas.png' });

// Scroll to Laisvė (SubFullCenter)
await page.evaluate(() => window.scrollBy({ top: 1100, behavior: 'instant' }));
await page.waitForTimeout(1000);
await page.screenshot({ path: 'screenshots/social-05-laisve.png' });

await browser.close();
console.log('done');
