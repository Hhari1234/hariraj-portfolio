import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const widths = [390, 768, 1440, 1920];
const url = process.env.LAYOUT_URL || 'http://127.0.0.1:4173';

const screenshotDir = 'screenshots';
if (!fs.existsSync(screenshotDir)) {
  fs.mkdirSync(screenshotDir, { recursive: true });
}

for (const width of widths) {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ 
    viewport: { width, height: 1200 }, 
    deviceScaleFactor: 1 
  });

  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForTimeout(1200);

  // Take full page screenshot
  await page.screenshot({ 
    path: path.join(screenshotDir, `viewport-${width}.png`), 
    fullPage: true 
  });

  console.log(`Screenshot saved: screenshots/viewport-${width}.png`);

  await browser.close();
}