import { chromium } from 'playwright';
const url = process.env.LAYOUT_URL || 'http://127.0.0.1:4173';
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto(url, { waitUntil: "domcontentloaded" });
await page.waitForTimeout(800);

const r = await page.evaluate(() => {
  const host = document.createElement("div");
  host.style.color = "rgb(1, 2, 3)";
  document.body.appendChild(host);

  const test = (cls) => {
    const el = document.createElement("span");
    el.className = cls;
    el.textContent = "x";
    host.appendChild(el);
    const cs = getComputedStyle(el);
    const out = { color: cs.color, borderColor: cs.borderTopColor, bg: cs.backgroundColor };
    el.remove();
    return out;
  };

  const res = {
    "text-text-muted": test("text-text-muted"),
    "text-muted": test("text-muted"),
    "text-text-faint": test("text-text-faint"),
    "text-subtle": test("text-subtle"),
    "text-text": test("text-text"),
    "text-gold": test("text-gold"),
    "border-border": test("border border-border"),
    "border-line": test("border border-line"),
    "bg-surface": test("bg-surface"),
    "bg-surface-2": test("bg-surface-2"),
    "bg-gold/10": test("bg-gold/10"),
    "text-teal": test("text-teal"),
  };
  host.remove();
  return res;
});

for (const [k, v] of Object.entries(r)) {
  console.log(`${k.padEnd(18)} color=${v.color.padEnd(24)} border=${v.borderColor.padEnd(24)} bg=${v.bg}`);
}
await browser.close();
