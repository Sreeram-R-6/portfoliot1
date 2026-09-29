import { chromium } from "@playwright/test";
import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";

const browser = await chromium.launch({ channel: "chrome", headless: true });
const results = [];
const wait = async (page) => {
  await page.locator(".site-loader").waitFor({ state: "hidden" });
  await page.waitForTimeout(1600);
};
const scroll = (page, top) => page.evaluate((top) => document.getElementById("scroll-container").dispatchEvent(new CustomEvent("portfolio:scrollto", { detail: { top } })), top);
const position = (page) => page.evaluate(() => document.getElementById("scroll-container").scrollTop);
try {
  for (const width of [320, 375, 768, 1280, 1440, 1920]) {
    for (const [port, route, count] of [[3000, "/", 11], [3002, "/qa-stress/three", 3], [3002, "/qa-stress/twenty", 20]]) {
      const context = await browser.newContext({ viewport: { width, height: 900 } });
      const page = await context.newPage();
      const errors = [];
      page.on("pageerror", (error) => errors.push(error.message));
      await page.goto(`http://localhost:${port}${route}`);
      await wait(page);
      await page.keyboard.press("Tab");
      await scroll(page, 1000);
      await page.waitForTimeout(1400);
      const before = await position(page);
      // Use an actual internal link, so this exercises the cover and history code.
      const link = page.locator('a[href="/work"]').first();
      await link.evaluate((element) => element.click());
      await page.waitForURL(`http://localhost:${port}/work`);
      await wait(page);
      await scroll(page, 350);
      await page.waitForTimeout(800);
      const work = await position(page);
      await page.goBack();
      await wait(page);
      const back = await position(page);
      assert.ok(Math.abs(back - before) <= 2, `${count}/${width}: back ${before} -> ${back}`);
      await page.goForward();
      await wait(page);
      const forward = await position(page);
      assert.ok(Math.abs(forward - work) <= 2, `${count}/${width}: forward ${work} -> ${forward}`);
      await page.goBack();
      await wait(page);
      await page.reload();
      await wait(page);
      const reload = await position(page);
      assert.ok(Math.abs(reload - before) <= 2, `${count}/${width}: reload ${before} -> ${reload}`);
      assert.deepEqual(errors, [], `${count}/${width}: runtime errors`);
      results.push({ port, route, count, width, before, back, work, forward, reload, errors });
      console.log(`PASS navigation ${count} projects ${width}`);
      await context.close();
    }
  }
  await mkdir(".cache/qa/navigation", { recursive: true });
  await writeFile(".cache/qa/navigation/results.json", JSON.stringify(results, null, 2));
} finally { await browser.close(); }
