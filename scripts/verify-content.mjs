import { chromium } from 'playwright';

const url = process.env.LAYOUT_URL || 'http://127.0.0.1:4173';
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 1200 } });
await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
await page.waitForTimeout(1500);

const out = await page.evaluate(() => {
  const sum = (t) => (t || '').replace(/\s+/g, ' ').trim();

  const stats = [...document.querySelectorAll('#about .stat-card')].map((c) => {
    const v = c.querySelector('.stat-value');
    const l = c.querySelector('.stat-label');
    const s = c.querySelector('div:last-child');
    return { value: sum(v?.textContent), label: sum(l?.textContent), sub: sum(s?.textContent) };
  });

  const iconSlots = [...document.querySelectorAll('.card-icon')].map((e) => {
    const b = e.getBoundingClientRect();
    return { w: Math.round(b.width), h: Math.round(b.height) };
  });

  const heads = [...document.querySelectorAll('.card-head')].length;
  const textBlocks = [...document.querySelectorAll('.card-text')].map((e) => {
    const b = e.getBoundingClientRect();
    return { w: Math.round(b.width), text: sum(e.textContent).slice(0, 40) };
  });

  const chips = [...document.querySelectorAll('#skills .tech-chip')].length;

  const sections = [...document.querySelectorAll('section[id]')].map((s) => s.id);
  const navOrder = [...document.querySelectorAll('header nav .nav-links a')].map((a) => sum(a.textContent));

  return { stats, iconSlots, heads, textBlocks, chips, sections, navOrder };
});

console.log('ABOUT STAT CARDS:');
for (const s of out.stats) console.log(`  value="${s.value}"  label="${s.label}"  sub="${s.sub}"`);
console.log(`\nCARD ICON SLOTS (${out.iconSlots.length}):`, JSON.stringify(out.iconSlots));
console.log(`\n.card-head count: ${out.heads}`);
console.log(`CARD TEXT BLOCK WIDTHS:`);
for (const t of out.textBlocks) console.log(`  ${t.w}px  "${t.text}"`);
console.log(`\nSKILLS CHIPS: ${out.chips}`);
console.log(`\nSECTION ORDER IN DOM: ${out.sections.join(' > ')}`);
console.log(`NAV ORDER: ${out.navOrder.join(' > ')}`);

await browser.close();
