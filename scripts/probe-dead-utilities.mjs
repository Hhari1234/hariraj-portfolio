import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const url = process.env.LAYOUT_URL || 'http://127.0.0.1:4173';

function walk(dir) {
  const out = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...walk(p));
    else if (/\.(tsx?|css)$/.test(e.name)) out.push(p);
  }
  return out;
}

const files = walk("src");
const classes = new Set();
for (const f of files) {
  const txt = fs.readFileSync(f, "utf8");
  for (const m of txt.matchAll(/["'`]([^"'`]*\b(?:text|border|bg|fill|stroke|ring|outline|decoration)-[a-z0-9][a-z0-9/[\]._-]*)["'`]/g)) {
    for (const c of m[1].split(/\s+/)) {
      if (/^(text|border|bg|fill|stroke|ring|outline|decoration)-/.test(c)) classes.add(c);
    }
  }
}

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
await page.goto(url, { waitUntil: "domcontentloaded" });
await page.waitForTimeout(600);

const res = await page.evaluate((list) => {
  const host = document.createElement("div");
  host.style.color = "rgb(1, 2, 3)";
  document.body.appendChild(host);
  const out = {};
  for (const cls of list) {
    const el = document.createElement("span");
    el.className = cls;
    el.textContent = "x";
    host.appendChild(el);
    const cs = getComputedStyle(el);
    out[cls] = { color: cs.color, border: cs.borderTopColor, bg: cs.backgroundColor, outline: cs.outlineColor, ring: cs.boxShadow };
    el.remove();
  }
  host.remove();
  return out;
}, [...classes]);

const broken = [];
for (const [cls, v] of Object.entries(res)) {
  const noColor = v.color === "rgb(1, 2, 3)";
  const noBorder = v.border === "rgb(1, 2, 3)";
  const noBg = v.bg === "rgba(0, 0, 0, 0)";
  if (noColor && noBorder && noBg) broken.push(cls);
}

console.log(`Scanned ${classes.size} colour-ish utility classes in src/`);
console.log(`\nCLASSES THAT GENERATE NO CSS (silently dead):`);
for (const c of broken.sort()) console.log(`  ${c}`);
console.log(`\n${broken.length} dead classes`);

await browser.close();
