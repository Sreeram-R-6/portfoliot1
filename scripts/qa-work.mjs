import { chromium } from "@playwright/test";
import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";

const base = process.env.QA_URL || "http://localhost:3000";
const browser = await chromium.launch({ channel: "chrome", headless: true });
const results = [];
try {
  for (const path of ["/work", "/work/thuzhayan", "/work/drone-gcs", "/qa-stress/maximum?view=work", "/qa-stress/maximum?view=detail", "/qa-stress/empty?view=work"])
    for (const width of [320, 375, 768, 1280, 1440, 1920]) {
      const context = await browser.newContext({ viewport: { width, height: 900 } });
      const page = await context.newPage();
      const errors = [];
      page.on("pageerror", (error) => errors.push(error.message));
      page.on("console", (message) => {
        if (["error", "warning"].includes(message.type()) && !message.text().includes("THREE.Clock: This module has been deprecated")) errors.push(message.text());
      });
      const response = await page.goto(base + path);
      assert.equal(response.status(), 200);
      await page.locator(".site-loader").waitFor({ state: "hidden" });
      await page.keyboard.press("Tab");
      await page.evaluate(() => document.fonts.ready);
      for (const landmark of [".work-main", "[data-section=footer]"]) {
        await page.locator(landmark).evaluate((element) => {
          const scroller = document.getElementById("scroll-container");
          scroller.dispatchEvent(new CustomEvent("portfolio:scrollto", { detail: { top: scroller.scrollTop + element.getBoundingClientRect().top - 80 } }));
        });
        await page.waitForTimeout(800);
        const measured = await page.locator(landmark).evaluate((element) => {
          const text = [...element.querySelectorAll("h1,h2,p,dt,dd,li")].filter((node) => {
            const rect = node.getBoundingClientRect();
            return !node.closest("[inert]") && !node.classList.contains("sr-only") && rect.width && rect.height && rect.bottom > 0 && rect.top < innerHeight && getComputedStyle(node).visibility !== "hidden";
          });
          const clipped = text.filter((node) => ["hidden", "clip"].includes(getComputedStyle(node).overflowY) && node.scrollHeight > node.clientHeight + 2).map((node) => node.textContent.slice(0, 40));
          const overlaps = [];
          for (let i = 0; i < text.length; i++) for (let j = i + 1; j < text.length; j++) {
            const a = text[i], b = text[j];
            if (a.contains(b) || b.contains(a)) continue;
            const ar = a.getBoundingClientRect(), br = b.getBoundingClientRect();
            if (Math.min(ar.right, br.right) - Math.max(ar.left, br.left) > 2 && Math.min(ar.bottom, br.bottom) - Math.max(ar.top, br.top) > 2) overlaps.push([a.textContent.slice(0, 30), b.textContent.slice(0, 30)]);
          }
          return { overflow: document.documentElement.scrollWidth > innerWidth || document.getElementById("scroll-container").scrollWidth > innerWidth, clipped, overlaps };
        });
        assert.deepEqual(measured, { overflow: false, clipped: [], overlaps: [] }, `${path}/${width}/${landmark}`);
      }
      assert.equal(await page.locator(".pin-spacer").count(), 0);
      assert.deepEqual(errors, [], `${path}/${width}: console`);
      results.push({ path, width, errors: 0 });
      console.log(`PASS ${path} ${width}`);
      await context.close();
    }
  await mkdir(".cache/qa/work", { recursive: true });
  await writeFile(".cache/qa/work/results.json", JSON.stringify(results, null, 2));
  console.log(`PASS ${results.length} work route configurations`);
} finally { await browser.close(); }
