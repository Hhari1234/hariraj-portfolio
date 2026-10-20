import { chromium } from 'playwright';

const widths = [360, 390, 768, 1024, 1280, 1440, 1920];
const url = process.env.LAYOUT_URL || 'http://127.0.0.1:4173';

for (const width of widths) {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width, height: 1200 }, deviceScaleFactor: 1 });

  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForTimeout(1200);

  const result = await page.evaluate(({ width: vw }) => {
    const summarizeText = (text) => (text || '').replace(/\s+/g, ' ').trim();
    const nav = document.querySelector('header');
    const navRect = nav ? nav.getBoundingClientRect() : { bottom: 0 };
    const navBottom = navRect.bottom || 0;
    const bodyOverflow = document.documentElement.scrollWidth > window.innerWidth;

    const nodes = [...document.querySelectorAll('section p, section h1, section h2, section h3, section li')];
    const details = nodes.map((el) => {
      const rect = el.getBoundingClientRect();
      const text = summarizeText(el.textContent || '');
      const lines = Math.max(1, Math.round((el.scrollHeight || rect.height) / parseFloat(getComputedStyle(el).lineHeight || '24')));
      const charsPerLine = text.length ? (text.length / lines) : 0;
      const narrow = (el.tagName === 'P' || el.tagName === 'LI' || el.tagName === 'H1' || el.tagName === 'H2' || el.tagName === 'H3') && vw >= 768 && rect.width < 280;
      const overlap = rect.top < navBottom && rect.bottom > 0;

      return {
        tag: el.tagName,
        text: text.slice(0, 140),
        width: Math.round(rect.width),
        charsPerLine: Number(charsPerLine.toFixed(1)),
        lines,
        narrow,
        overlap,
      };
    });

    return {
      width: vw,
      bodyOverflow,
      navBottom,
      details,
      narrowCount: details.filter((d) => d.narrow).length,
      overlapCount: details.filter((d) => d.overlap).length,
    };
  }, { width });

  console.log(`VIEWPORT ${width}px`);
  console.log(JSON.stringify(result, null, 2));
  console.log('---');

  await browser.close();
}