import { chromium } from 'playwright';

const urls = [
  ["CodeForge AI - live demo", "https://codeforge-frontend-s5xw.onrender.com/dashboard"],
  ["CodeForge AI - repository", "https://github.com/Hhari1234/codeforge-ai"],
  ["AI Code Reviewer - repository", "https://github.com/Hhari1234/ai-code-reviewer"],
  ["House Hunt - live demo", "https://househunt-jqh9.onrender.com/"],
  ["House Hunt - repository", "https://github.com/Hhari1234/househunt"],
  ["Weather Forecasting - live demo", "https://weather-app-82sb.onrender.com/"],
  ["Weather Forecasting - repository", "https://github.com/Hhari1234/Weather-app"],
  ["WasteScan - repository", "https://github.com/Hhari1234/smartdustbin"],
  ["GitHub profile", "https://github.com/Hhari1234"],
  ["LinkedIn profile", "https://www.linkedin.com/in/hariraj-k-63735b261/"],
  ["Cert 1 - Oracle University", "https://drive.google.com/file/d/1re0f2pX5F3McsKSxzBeiXgFXO6dYpi_w/view"],
  ["Cert 2 - Azure AI Fundamentals", "https://drive.google.com/file/d/1BxqxMV5yEyyspM6OxpUXoFsRQopC_wDU/view"],
  ["Cert 3 - MERN Full Stack", "https://drive.google.com/file/d/1HFWc7Y7CugeETDrByot6o-62wl0OeeIY/view"],
  ["Cert 4 - VIT Data Science", "https://drive.google.com/file/d/1s8aXfhNNh_eBb-feca4_PQcwrpAm7DJm/view"],
  ["Portfolio (canonical)", "https://hariraj-portfolio-1.vercel.app"],
  ["Portfolio (resume link, stale)", "https://hariraj-portfolio-3hvj.vercel.app/"],
];

const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({ userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0 Safari/537.36" });

for (const [label, url] of urls) {
  const page = await ctx.newPage();
  let note = "";
  try {
    const resp = await page.goto(url, { waitUntil: "domcontentloaded", timeout: 45000 });
    await page.waitForTimeout(1500);
    const status = resp ? resp.status() : 0;
    const finalUrl = page.url();
    const title = await page.title();
    const body = (await page.evaluate(() => document.body?.innerText || "")).slice(0, 400).replace(/\s+/g, " ");

    // Detect access walls. Only count a wall when the page actually blocks the
    // content - a "Sign in" link in a site nav is not a wall.
    const lower = (title + " " + body).toLowerCase();
    let wall = "";
    if (/request access|you need access|access denied|not found|404|restricted|forbidden|sign in to continue|to continue viewing/.test(lower)) {
      wall = "ACCESS-WALL";
    }
    if (/accounts\.google\.com/.test(page.url())) wall = "GOOGLE-AUTH-REDIRRECT";
    // Hosted services that always bounce anonymous clients to a sign-in page
    if (wall === "" && /linkedin\.com\/authwall|linkedin\.com\/login/.test(page.url())) {
      wall = "LOGIN-WALL (host bot-wall)";
    }

    note = `HTTP ${status} | final=${finalUrl}\n      title="${title}"\n      access=${wall || "none"} | text="${body.slice(0, 180)}"`;
    console.log(`${wall ? "WARN" : "OK  "} ${label}\n      ${url}\n      ${note}\n`);
  } catch (e) {
    console.log(`ERR  ${label}\n      ${url}\n      ERROR: ${e.message.split("\n")[0]}\n`);
  }
  await page.close();
}

await browser.close();
