import { chromium } from 'playwright';

const url = process.env.LAYOUT_URL || 'http://127.0.0.1:4173';
const width = Number(process.env.VIEWPORT || 1440);
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width, height: 1000 } });
await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
await page.waitForTimeout(1500);

const out = await page.evaluate(() => {
  const sum = (t) => (t || '').replace(/\s+/g, ' ').trim();
  const srgb = (c) => (c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));
  const lum = ([r, g, b]) => 0.2126 * srgb(r / 255) + 0.7152 * srgb(g / 255) + 0.0722 * srgb(b / 255);
  const ratio = (a, b) => {
    const [l1, l2] = [lum(a), lum(b)].sort((x, y) => y - x);
    return Number(((l1 + 0.05) / (l2 + 0.05)).toFixed(2));
  };
  const parse = (c) => (c.match(/[\d.]+/g) || []).map(Number);

  const bg = parse(getComputedStyle(document.body).backgroundColor);
  const contrast = {};
  for (const [name, sel] of [
    ["text", "--color-text"],
    ["muted", "--color-muted"],
    ["gold", "--color-gold"],
    ["subtle", "--color-subtle"],
  ]) {
    const probe = document.createElement("div");
    probe.style.color = `var(${sel})`;
    document.body.appendChild(probe);
    contrast[name] = ratio(parse(getComputedStyle(probe).color), bg);
    probe.remove();
  }

  const sections = [...document.querySelectorAll("section[id]")].map((s) => {
    const b = s.getBoundingClientRect();
    const cs = getComputedStyle(s);
    const grid = s.querySelector(".grid");
    const cols = grid ? getComputedStyle(grid).gridTemplateColumns : null;
    const cardHeads = s.querySelectorAll(".card-head").length;
    const iconSlots = s.querySelectorAll(".card-icon").length;
    const chips = s.querySelectorAll(".tech-chip").length;
    const items = s.querySelectorAll("li").length;
    const h2 = s.querySelector("h2");
    const eyebrow = s.querySelector(".section-label");
    return {
      id: s.id,
      top: Math.round(b.top + window.scrollY),
      h: Math.round(b.height),
      padTop: cs.paddingTop,
      padBottom: cs.paddingBottom,
      bg: cs.backgroundColor,
      borderTop: cs.borderTopWidth,
      cols,
      cardHeads,
      iconSlots,
      chips,
      items,
      h2: sum(h2?.textContent).slice(0, 60),
      h2w: h2 ? Math.round(h2.getBoundingClientRect().width) : 0,
      eyebrow: sum(eyebrow?.textContent),
      scrollMT: cs.scrollMarginTop,
    };
  });

  const hero = document.querySelector("#home");
  const h1 = hero.querySelector("h1");
  const h1b = h1.getBoundingClientRect();
  const portrait = hero.querySelector("img");
  const pb = portrait.getBoundingClientRect();
  const nav = document.querySelector("header");
  const navB = nav.getBoundingClientRect();
  const heroTop = hero.getBoundingClientRect().top;

  return {
    contrast,
    sections,
    h1: {
      w: Math.round(h1b.width),
      h: Math.round(h1b.height),
      font: getComputedStyle(h1).fontFamily,
      weight: getComputedStyle(h1).fontWeight,
      ls: getComputedStyle(h1).letterSpacing,
      lh: getComputedStyle(h1).lineHeight,
      size: getComputedStyle(h1).fontSize,
      text: sum(h1.textContent),
    },
    portrait: {
      w: Math.round(pb.width),
      h: Math.round(pb.height),
      top: Math.round(pb.top),
      objectFit: getComputedStyle(portrait).objectFit,
    },
    heroNavGap: Math.round(h1b.top - navB.bottom),
    heroTop,
    footer: (() => {
      const f = document.querySelector("footer");
      const fb = f.getBoundingClientRect();
      return { h: Math.round(fb.height), borderTop: getComputedStyle(f).borderTopWidth, links: f.querySelectorAll("a").length };
    })(),
  };
});

console.log(`VIEWPORT ${width}px   url=${url}`);
console.log(`\nCONTRAST vs --bg #07080B (WCAG AA needs 4.5 body / 3.0 large):`);
for (const [k, v] of Object.entries(out.contrast)) {
  console.log(`  ${k.padEnd(7)} ratio ${v}  ${v >= 4.5 ? "AA-normal PASS" : v >= 3 ? "AA-large only" : "FAIL"}`);
}
console.log(`\nH1: ${out.h1.text}`);
console.log(`  size=${out.h1.size} weight=${out.h1.weight} line-height=${out.h1.lh} letter-spacing=${out.h1.ls}`);
console.log(`  font=${out.h1.font}`);
console.log(`  box=${out.h1.w}x${out.h1.h}`);
console.log(`  gap between navbar bottom and H1 top: ${out.heroNavGap}px (must be > 0)`);
console.log(`\nHERO PORTRAIT: ${out.portrait.w}x${out.portrait.h} object-fit=${out.portrait.objectFit} top=${out.portrait.top}`);
console.log(`FOOTER: h=${out.footer.h} border-top=${out.footer.borderTop} links=${out.footer.links}`);
console.log(`\nSECTIONS:`);
for (const s of out.sections) {
  console.log(`\n  #${s.id}  y=${s.top} h=${s.h}  padding=${s.padTop}/${s.padBottom}  bg=${s.bg}  border-top=${s.borderTop}`);
  console.log(`    scroll-margin-top=${s.scrollMT}  eyebrow="${s.eyebrow}"  h2(${s.h2w}px)="${s.h2}"`);
  console.log(`    grid-cols=${s.cols}`);
  console.log(`    card-heads=${s.cardHeads} icon-slots=${s.iconSlots} chips=${s.chips} li=${s.items}`);
}

await browser.close();
