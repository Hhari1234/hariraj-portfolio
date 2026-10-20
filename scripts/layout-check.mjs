import { chromium } from 'playwright';
import fs from 'fs';

const ALL_WIDTHS = [360, 390, 768, 1024, 1280, 1440, 1920];
const DETAIL_WIDTHS = [1440, 1280, 1024, 768, 390];
const url = process.env.LAYOUT_URL || 'http://127.0.0.1:4173';

const browser = await chromium.launch({ headless: true });
const out = [];

for (const width of ALL_WIDTHS) {
  const page = await browser.newPage({ viewport: { width, height: 1200 }, deviceScaleFactor: 1 });
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForTimeout(1500);

  const r = await page.evaluate(({ width: vw, detail }) => {
    const sum = (t) => (t || '').replace(/\s+/g, ' ').trim();
    const nav = document.querySelector('header');
    const navRect = nav ? nav.getBoundingClientRect() : { bottom: 0 };
    const navBottom = navRect.bottom || 0;

    // ---------- text metrics ----------
    const nodes = [...document.querySelectorAll('section p, section h1, section h2, section h3, section li')];
    const text = nodes.map((el) => {
      const rect = el.getBoundingClientRect();
      const s = sum(el.textContent);
      const lh = parseFloat(getComputedStyle(el).lineHeight) || 24;
      const lines = Math.max(1, Math.round((el.scrollHeight || rect.height) / lh));
      return {
        tag: el.tagName,
        w: Math.round(rect.width),
        cpl: s.length ? Number((s.length / lines).toFixed(1)) : 0,
        lines,
        narrow: vw >= 768 && rect.width < 280,
        overlap: rect.top < navBottom && rect.bottom > 0,
        txt: s.slice(0, 90),
      };
    });

    const narrow = text.filter((t) => t.narrow).sort((a, b) => a.w - b.w);

    // ---------- a) nav overlap ----------
    const navEl = document.querySelector('header nav') || document.querySelector('nav');
    const navKids = navEl ? [...navEl.children] : [];
    const navRects = navKids.map((el) => {
      const b = el.getBoundingClientRect();
      return {
        tag: el.tagName,
        label: sum(el.textContent).slice(0, 24) || el.getAttribute('aria-label') || el.className.toString().slice(0, 30),
        x: Math.round(b.x), y: Math.round(b.y), w: Math.round(b.width), h: Math.round(b.height),
      };
    });
    // leaf interactive elements inside the nav (what the user actually sees)
    const leaves = navEl
      ? [...navEl.querySelectorAll('a, button')].filter((el) => {
          const b = el.getBoundingClientRect();
          return b.width > 0 && b.height > 0 && getComputedStyle(el).visibility !== 'hidden';
        })
      : [];
    const leafRects = leaves.map((el) => {
      const b = el.getBoundingClientRect();
      return {
        label: sum(el.textContent).slice(0, 18) || el.getAttribute('aria-label') || '?',
        x: Math.round(b.x), y: Math.round(b.y), w: Math.round(b.width), h: Math.round(b.height),
      };
    });
    const navOverlaps = [];
    for (let i = 0; i < leafRects.length; i++) {
      for (let j = i + 1; j < leafRects.length; j++) {
        const a = leafRects[i], b = leafRects[j];
        const ox = Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x);
        const oy = Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y);
        if (ox > 0 && oy > 0) navOverlaps.push({ a: a.label, b: b.label, ox: Math.round(ox), oy: Math.round(oy) });
      }
    }
    // baseline consistency of nav links
    const navTops = [...new Set(leafRects.map((n) => n.y))];

    // ---------- b) card overflow ----------
    const cardEls = [...document.querySelectorAll('.card, .stat-card')];
    const cardViolations = [];
    for (const card of cardEls) {
      const cb = card.getBoundingClientRect();
      const walker = document.createTreeWalker(card, NodeFilter.SHOW_TEXT);
      let t;
      while ((t = walker.nextNode())) {
        const s = sum(t.nodeValue);
        if (!s) continue;
        const range = document.createRange();
        range.selectNodeContents(t);
        for (const b of range.getClientRects()) {
          if (b.width === 0 && b.height === 0) continue;
          const overRight = b.right - (cb.right + 1);
          const overLeft = (cb.left - 1) - b.left;
          const overBottom = b.bottom - (cb.bottom + 1);
          const overTop = (cb.top - 1) - b.top;
          if (overRight > 1 || overLeft > 1 || overBottom > 1 || overTop > 1) {
            cardViolations.push({
              card: sum(card.textContent).slice(0, 40),
              text: s.slice(0, 50),
              over: `r${Math.round(overRight)} l${Math.round(overLeft)} b${Math.round(overBottom)} t${Math.round(overTop)}`,
            });
          }
        }
      }
    }

    // ---------- c) icon boxes > 64px ----------
    const iconBoxes = [];
    for (const el of document.querySelectorAll('div, span, a, button')) {
      const b = el.getBoundingClientRect();
      if (b.width <= 64) continue;
      const kids = [...el.children];
      if (kids.length === 0) continue;
      const onlySvg = kids.every((k) => k.tagName.toLowerCase() === 'svg');
      if (!onlySvg) continue;
      if (sum(el.textContent).length > 0) continue; // has real text -> not a pure icon box
      const cs = getComputedStyle(el);
      iconBoxes.push({
        w: Math.round(b.width), h: Math.round(b.height),
        w100: cs.width, cls: el.className.toString().slice(0, 60),
      });
    }

    // ---------- d) fixed elements ----------
    const fixed = [];
    for (const el of document.querySelectorAll('body *')) {
      const cs = getComputedStyle(el);
      if (cs.position !== 'fixed') continue;
      const b = el.getBoundingClientRect();
      fixed.push({
        tag: el.tagName,
        cls: el.className.toString().slice(0, 50),
        w: Math.round(b.width), h: Math.round(b.height),
        x: Math.round(b.x), y: Math.round(b.y),
        isNav: el.tagName === 'HEADER' || !!el.closest('header'),
      });
    }

    // ---------- section header / scroll-margin ----------
    const secs = [...document.querySelectorAll('section[id]')].map((s) => {
      const cs = getComputedStyle(s);
      const head = s.querySelector('.section-header');
      const hb = head ? head.getBoundingClientRect() : null;
      return {
        id: s.id,
        scrollMarginTop: cs.scrollMarginTop,
        headerBottom: hb ? Math.round(hb.bottom) : null,
        firstCardTop: (() => {
          const c = s.querySelector('.card, .stat-card, article, ul');
          return c ? Math.round(c.getBoundingClientRect().top) : null;
        })(),
      };
    });

    return {
      vw,
      detail,
      bodyOverflow: document.documentElement.scrollWidth > window.innerWidth,
      docScrollWidth: document.documentElement.scrollWidth,
      innerWidth: window.innerWidth,
      navBottom: Math.round(navBottom),
      text,
      narrowCount: narrow.length,
      narrow5: narrow.slice(0, 5),
      navRects,
      leafRects,
      navOverlaps,
      navTops,
      cardViolations,
      iconBoxes,
      fixed,
      secs,
    };
  }, { width, detail: DETAIL_WIDTHS.includes(width) });

  out.push(r);
  await page.close();
}
await browser.close();

const lines = [];
const push = (s) => lines.push(s);

push(`LAYOUT CHECK  url=${url}`);
push(`widths: ${ALL_WIDTHS.join(', ')}   detailed checks: ${DETAIL_WIDTHS.join(', ')}`);
push('='.repeat(100));

let totalViolations = 0;

for (const r of out) {
  push('');
  push(`=== VIEWPORT ${r.vw}px ===`);
  push(`horizontal overflow: ${r.bodyOverflow ? 'YES (scrollWidth ' + r.docScrollWidth + ' > innerWidth ' + r.innerWidth + ')' : 'NO'}`);
  push(`elements overlapping fixed navbar at scroll 0: ${r.text.filter((t) => t.overlap).length}`);

  push('--- text metrics: tag | width | chars/line | lines | narrow(<280px @>=768) | overlaps-nav | text ---');
  for (const t of r.text) {
    push(`${t.tag} | ${t.w} | ${t.cpl} | ${t.lines} | ${t.narrow ? 'NARROW' : '-'} | ${t.overlap ? 'OVERLAP' : '-'} | ${t.txt}`);
  }
  push(`narrowCount (>=768px): ${r.narrowCount}`);
  push('5 narrowest:');
  for (const n of r.narrow5) push(`  ${n.tag} ${n.w}px  "${n.txt}"`);

  if (r.detail) {
    push('--- (a) NAV OVERLAP: direct children of nav ---');
    for (const n of r.navRects) push(`  ${n.tag} x=${n.x} y=${n.y} w=${n.w} h=${n.h} "${n.label}"`);
    push('  leaf links/buttons inside nav:');
    for (const n of r.leafRects) push(`    x=${n.x} y=${n.y} w=${n.w} h=${n.h} "${n.label}"`);
    push(`  distinct vertical tops: ${r.navTops.join(', ')}`);
    if (r.navOverlaps.length === 0) push('  VIOLATIONS: none');
    else for (const o of r.navOverlaps) push(`  VIOLATION: "${o.a}" overlaps "${o.b}" by ${o.ox}x${o.oy}px`);

    push('--- (b) CARD OVERFLOW: text inside card bounds ---');
    if (r.cardViolations.length === 0) push('  VIOLATIONS: none');
    else for (const v of r.cardViolations) push(`  VIOLATION: card="${v.card}" text="${v.text}" overflow ${v.over}`);

    push('--- (c) ICON BOXES wider than 64px containing only svg ---');
    if (r.iconBoxes.length === 0) push('  VIOLATIONS: none');
    else for (const i of r.iconBoxes) push(`  VIOLATION: ${i.w}x${i.h} computed-width:${i.w100} class="${i.cls}"`);

    push('--- (d) FIXED ELEMENTS ---');
    let wideFixed = 0;
    for (const f of r.fixed) {
      const bad = f.w > 80 && !f.isNav;
      if (bad) wideFixed++;
      push(`  ${f.tag} ${f.w}x${f.h} at (${f.x},${f.y}) ${f.isNav ? '[navbar - exempt]' : bad ? 'VIOLATION: wider than 80px' : ''} class="${f.cls}"`);
    }
    if (wideFixed) push(`  VIOLATIONS: ${wideFixed} fixed element(s) wider than 80px`);

    push('--- section scroll-margin-top / header spacing ---');
    for (const s of r.secs) {
      push(`  #${s.id} scroll-margin-top=${s.scrollMarginTop} headerBottom=${s.headerBottom} firstCardTop=${s.firstCardTop}`);
    }
  }
}

const v = (r) =>
  (r.navOverlaps?.length || 0) + (r.cardViolations?.length || 0) + (r.iconBoxes?.length || 0) +
  (r.fixed?.filter((f) => f.w > 80 && !f.isNav).length || 0);
for (const r of out) totalViolations += v(r);

push('');
push('='.repeat(100));
push(`TOTAL VIOLATIONS (nav overlap + card overflow + icon boxes + wide fixed): ${totalViolations}`);

fs.writeFileSync('layout-check-output.txt', lines.join('\n'), 'utf8');
console.log(lines.join('\n'));
console.log('\n[written to layout-check-output.txt]');
