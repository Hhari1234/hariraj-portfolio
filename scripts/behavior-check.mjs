import { chromium } from 'playwright';

const url = process.env.LAYOUT_URL || 'http://127.0.0.1:4173';
const browser = await chromium.launch({ headless: true });
const results = [];
const check = (name, pass, detail) => {
  results.push({ name, pass, detail });
  console.log(`${pass ? 'PASS' : 'FAIL'}  ${name}  ${detail ?? ""}`);
};

/** Wait until window.scrollY stops changing (smooth scrolling has settled). */
async function settle(page, timeout = 6000) {
  const start = Date.now();
  let last = -1;
  let stable = 0;
  while (Date.now() - start < timeout) {
    const y = await page.evaluate(() => Math.round(window.scrollY));
    if (y === last) {
      stable++;
      if (stable >= 4) return y;
    } else {
      stable = 0;
      last = y;
    }
    await page.waitForTimeout(100);
  }
  return last;
}

/* ---------- desktop behaviour ---------- */
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(url, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(1200);

  // scroll progress bar
  const sp = await page.evaluate(() => {
    const el = document.querySelector(".scroll-progress");
    const cs = getComputedStyle(el);
    return { h: Math.round(el.getBoundingClientRect().height), top: Math.round(el.getBoundingClientRect().top), bg: cs.backgroundColor, transform: cs.transform };
  });
  check("scroll-progress is a 2px line at the very top", sp.h === 2 && sp.top === 0, JSON.stringify(sp));

  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2));
  await page.waitForTimeout(400);
  const sp2 = await page.evaluate(() => {
    const el = document.querySelector(".scroll-progress");
    const b = el.getBoundingClientRect();
    return { w: Math.round(b.width), transform: getComputedStyle(el).transform };
  });
  check("scroll-progress grows with scroll", sp2.w > 100, `width=${sp2.w} transform=${sp2.transform}`);

  // back to top
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(500);
  const bt0 = await page.evaluate(() => {
    const el = document.querySelector(".back-to-top");
    const b = el.getBoundingClientRect();
    return { w: Math.round(b.width), h: Math.round(b.height), opacity: getComputedStyle(el).opacity };
  });
  check("back-to-top hidden at scroll 0", bt0.opacity === "0", JSON.stringify(bt0));

  await page.evaluate(() => window.scrollTo(0, 1200));
  await page.waitForTimeout(500);
  const bt1 = await page.evaluate(() => {
    const el = document.querySelector(".back-to-top");
    const b = el.getBoundingClientRect();
    const cs = getComputedStyle(el);
    return { w: Math.round(b.width), h: Math.round(b.height), opacity: cs.opacity, pos: cs.position, radius: cs.borderRadius, bottomGap: Math.round(innerHeight - b.bottom), rightGap: Math.round(innerWidth - b.right) };
  });
  check("back-to-top appears after 600px, 48x48, bottom-6 right-6, round", bt1.opacity === "1" && bt1.w === 48 && bt1.h === 48 && bt1.pos === "fixed" && bt1.bottomGap === 24 && bt1.rightGap === 24 && bt1.radius === "9999px", JSON.stringify(bt1));

  await page.click(".back-to-top");
  await page.waitForTimeout(1200);
  const scrolled = await page.evaluate(() => Math.round(window.scrollY));
  check("back-to-top scrolls to 0", scrolled < 50, `scrollY=${scrolled}`);

  // active section highlight
  await page.evaluate(() => document.querySelector("#skills").scrollIntoView());
  await settle(page);
  await page.waitForTimeout(400);
  const active = await page.evaluate(() => {
    const a = document.querySelector('header nav .nav-links a[aria-current="true"]');
    if (!a) return null;
    const cs = getComputedStyle(a);
    const bar = a.querySelector("span");
    const bb = bar ? bar.getBoundingClientRect() : null;
    return { label: a.textContent.trim(), color: cs.color, barH: bb ? Math.round(bb.height) : 0, barBg: bar ? getComputedStyle(bar).backgroundColor : null };
  });
  const gold = "rgb(232, 194, 122)";
  check("active nav link is gold with 2px gold underline", active && active.color === gold && active.barH === 2 && active.barBg === gold, JSON.stringify(active));

  // contact form validation
  await page.evaluate(() => document.querySelector("#contact").scrollIntoView());
  await page.waitForTimeout(600);
  await page.click('#contact button[type="submit"]');
  await page.waitForTimeout(400);
  const errs = await page.evaluate(() => [...document.querySelectorAll("#contact [role=alert]")].map((e) => e.textContent.trim()));
  check("contact form shows inline validation errors", errs.length >= 3, JSON.stringify(errs));

  await page.fill("#name", "Test User");
  await page.fill("#email", "not-an-email");
  await page.fill("#message", "Hello there, this is a test message.");
  await page.click('#contact button[type="submit"]');
  await page.waitForTimeout(400);
  const errs2 = await page.evaluate(() => [...document.querySelectorAll("#contact [role=alert]")].map((e) => e.textContent.trim()));
  check("invalid email is rejected", errs2.some((e) => /email/i.test(e)), JSON.stringify(errs2));

  // copy button
  const copyLabel = await page.evaluate(() => {
    const btn = [...document.querySelectorAll("#contact button")].find((b) => /copy/i.test(b.textContent));
    return btn ? btn.textContent.trim() : null;
  });
  check("contact rows have copy buttons", copyLabel !== null, `label="${copyLabel}"`);

  await page.close();
}

/* ---------- mobile menu behaviour ---------- */
{
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await page.goto(url, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(1200);

  const hidden = await page.evaluate(() => {
    const ul = document.querySelector("header .nav-links");
    return { display: getComputedStyle(ul).display, links: ul.querySelectorAll("a").length };
  });
  check("desktop nav links hidden below 1024px", hidden.display === "none", JSON.stringify(hidden));

  await page.click('header button[aria-label="Open menu"]');
  await page.waitForTimeout(500);
  const opened = await page.evaluate(() => {
    const menu = document.querySelector("header .fixed");
    const link = menu ? [...menu.querySelectorAll("a")].find((a) => a.textContent.trim() === "About") : null;
    const cs = link ? getComputedStyle(link) : null;
    const mb = menu ? menu.getBoundingClientRect() : null;
    return {
      inlineOverflow: document.body.getAttribute("style") || "(none)",
      computedOverflow: getComputedStyle(document.body).overflow,
      linkFont: cs ? cs.fontFamily : null,
      linkSize: cs ? cs.fontSize : null,
      menuRect: mb ? { w: Math.round(mb.width), h: Math.round(mb.height) } : null,
      menuCount: document.querySelectorAll("header .fixed").length,
    };
  });
  check("mobile menu opens full-screen", opened.menuRect && opened.menuRect.w === 390 && opened.menuRect.h >= 700, JSON.stringify(opened));
  check("mobile menu locks body scroll", /hidden/.test(opened.computedOverflow) || /overflow:\s*hidden/.test(opened.inlineOverflow), `inline="${opened.inlineOverflow}" computed="${opened.computedOverflow}"`);
  check("mobile menu links use the serif display font", /Instrument Serif/i.test(opened.linkFont || ""), `font=${opened.linkFont} size=${opened.linkSize}`);

  await page.keyboard.press("Escape");
  await page.waitForTimeout(400);
  const closedByEsc = await page.evaluate(() => ({
    overflow: getComputedStyle(document.body).overflow,
    inline: document.body.getAttribute("style") || "(none)",
    menuOpen: document.querySelector('header button[aria-label="Close menu"]') !== null,
  }));
  check("Escape closes the mobile menu and unlocks scroll", !closedByEsc.menuOpen && !/hidden/.test(closedByEsc.overflow), JSON.stringify(closedByEsc));

  await page.click('header button[aria-label="Open menu"]');
  await page.waitForTimeout(400);
  await page.click('header .fixed a[href="#projects"]');
  await settle(page);
  await page.waitForTimeout(500);
  const closedByClick = await page.evaluate(() => ({
    overflow: getComputedStyle(document.body).overflow,
    menuOpen: document.querySelector('header button[aria-label="Close menu"]') !== null,
    y: Math.round(window.scrollY),
    projectsTop: Math.round(document.querySelector("#projects").getBoundingClientRect().top),
  }));
  check("clicking a menu link closes the menu and scrolls to the section", !closedByClick.menuOpen && !/hidden/.test(closedByClick.overflow) && Math.abs(closedByClick.projectsTop - 72) < 20, JSON.stringify(closedByClick));

  await page.close();
}

await browser.close();
const failed = results.filter((r) => !r.pass);
console.log(`\n${results.length - failed.length}/${results.length} checks passed`);
if (failed.length) {
  console.log("FAILED: " + failed.map((f) => f.name).join("; "));
  process.exit(1);
}
