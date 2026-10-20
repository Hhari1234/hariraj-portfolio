import { chromium } from 'playwright';
const url = process.env.LAYOUT_URL || 'http://127.0.0.1:4173';
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto(url, { waitUntil: "domcontentloaded" });
await page.waitForTimeout(1000);

const r = await page.evaluate(() => {
  const probe = document.createElement("span");
  probe.className = "text-gold";
  probe.textContent = "x";
  document.body.appendChild(probe);
  const ref = getComputedStyle(probe).color;
  probe.remove();

  const links = [...document.querySelectorAll("header nav .nav-links a")].map((a) => {
    const cs = getComputedStyle(a);
    return {
      label: a.textContent.trim(),
      color: cs.color,
      cls: a.className,
      transition: cs.transition,
      opacity: cs.opacity,
      filter: cs.filter,
      active: a.getAttribute("aria-current"),
    };
  });
  return { ref, links, goldVar: getComputedStyle(document.documentElement).getPropertyValue("--color-gold") };
});
console.log("reference .text-gold computed color:", r.ref);
console.log("--color-gold variable:", r.goldVar);
for (const l of r.links) console.log(`  ${l.label.padEnd(15)} color=${l.color} opacity=${l.opacity} filter=${l.filter} active=${l.active}`);
console.log("\nclasses of active link:", r.links.find((l) => l.active)?.cls);
await browser.close();
