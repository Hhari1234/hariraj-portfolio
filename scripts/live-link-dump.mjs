import { chromium } from 'playwright';

const url = process.env.LAYOUT_URL || 'https://hariraj-portfolio-1.vercel.app';
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 1200 } });
await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
await page.waitForTimeout(3000);

const links = await page.evaluate(() =>
  [...document.querySelectorAll('a[href]')].map((a) => ({
    href: a.getAttribute('href'),
    text: (a.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 40),
  })),
);

console.log('EXTERNAL LINKS RENDERED ON LIVE SITE:');
const seen = new Set();
for (const l of links) {
  if (!/^https?:/.test(l.href)) continue;
  const key = `${l.href}|${l.text}`;
  if (seen.has(key)) continue;
  seen.add(key);
  console.log(`  ${l.href}   [${l.text}]`);
}

await browser.close();
