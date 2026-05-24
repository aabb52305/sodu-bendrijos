import { chromium } from 'playwright';
import { mkdir } from 'fs/promises';

const SHOTS_DIR = './screenshots';
await mkdir(SHOTS_DIR, { recursive: true });

const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();

// Hero
await page.goto('http://localhost:3000', { waitUntil: 'networkidle', timeout: 30000 });
await page.waitForTimeout(1500); // let Framer Motion entrance animations run
await page.screenshot({ path: `${SHOTS_DIR}/01-hero.png`, fullPage: false });
console.log('✓ Hero');

// Scroll to FirstVisualMoment
await page.evaluate(() => document.getElementById('first-visual')?.scrollIntoView({ behavior: 'instant' }));
await page.waitForTimeout(800);
await page.screenshot({ path: `${SHOTS_DIR}/02-first-visual.png`, fullPage: false });
console.log('✓ FirstVisualMoment');

// Scroll to Origin
await page.evaluate(() => document.getElementById('origin')?.scrollIntoView({ behavior: 'instant' }));
await page.waitForTimeout(800);
await page.screenshot({ path: `${SHOTS_DIR}/03-origin.png`, fullPage: false });
console.log('✓ Origin');

// Scroll to TransitionMoment
await page.evaluate(() => document.getElementById('transition')?.scrollIntoView({ behavior: 'instant' }));
await page.waitForTimeout(2500); // wait for auto-slider animation
await page.screenshot({ path: `${SHOTS_DIR}/04-transition.png`, fullPage: false });
console.log('✓ Transition');

// Scroll to Maps
await page.evaluate(() => document.getElementById('maps')?.scrollIntoView({ behavior: 'instant' }));
await page.waitForTimeout(800);
await page.screenshot({ path: `${SHOTS_DIR}/05-maps.png`, fullPage: false });
console.log('✓ Maps');

// Scroll to Escapism
await page.evaluate(() => document.getElementById('escapism')?.scrollIntoView({ behavior: 'instant' }));
await page.waitForTimeout(800);
await page.screenshot({ path: `${SHOTS_DIR}/06-escapism.png`, fullPage: false });
console.log('✓ Escapism');

// Scroll to DIY
await page.evaluate(() => document.getElementById('diy')?.scrollIntoView({ behavior: 'instant' }));
await page.waitForTimeout(800);
await page.screenshot({ path: `${SHOTS_DIR}/07-diy.png`, fullPage: false });
console.log('✓ DIY');

// Scroll to Social — first subsection
await page.evaluate(() => document.getElementById('social')?.scrollIntoView({ behavior: 'instant' }));
await page.waitForTimeout(800);
await page.screenshot({ path: `${SHOTS_DIR}/08-social.png`, fullPage: false });
console.log('✓ Social');

// Scroll to Symbolism
await page.evaluate(() => document.getElementById('symbolism')?.scrollIntoView({ behavior: 'instant' }));
await page.waitForTimeout(800);
await page.screenshot({ path: `${SHOTS_DIR}/09-symbolism.png`, fullPage: false });
console.log('✓ Symbolism');

// Scroll to Final
await page.evaluate(() => document.getElementById('final')?.scrollIntoView({ behavior: 'instant' }));
await page.waitForTimeout(2000);
await page.screenshot({ path: `${SHOTS_DIR}/10-final.png`, fullPage: false });
console.log('✓ Final');

// Check for console errors
const errors = [];
page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); });
if (errors.length) console.error('Console errors:', errors);
else console.log('✓ No console errors');

await browser.close();
console.log(`\nAll screenshots saved to ${SHOTS_DIR}/`);
