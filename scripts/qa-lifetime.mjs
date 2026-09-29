import { chromium } from "@playwright/test";
import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";

const browser = await chromium.launch({ channel: "chrome", headless: true });
const results = [];
try {
  // Run serially: simultaneous WebGL suites can exhaust the machine's GPU.
  for (const port of [3000, 3002]) {
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await context.newPage();
    const client = await context.newCDPSession(page);
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (message) => {
      if (["error", "warning"].includes(message.type()) && !message.text().includes("THREE.Clock: This module has been deprecated")) errors.push(message.text());
    });
    await page.goto(`http://localhost:${port}/`);
    await page.locator(".site-loader").waitFor({ state: "hidden" });
    await page.keyboard.press("Tab");
    await page.waitForTimeout(1500);
    const cycle = async () => {
      for (const top of [4350, 6800, 11800]) {
        await page.evaluate((top) => document.getElementById("scroll-container").dispatchEvent(new CustomEvent("portfolio:scrollto", { detail: { top } })), top);
        await page.waitForTimeout(700);
      }
      await page.locator('a[href="/work"]').first().evaluate((element) => element.click());
      await page.waitForURL("**/work");
      await page.waitForTimeout(1500);
      const work = await page.evaluate(() => window.__portfolioMotion.read());
      assert.equal(work.triggers.length, 0, "Old route pins survived");
      await page.locator('a[href="/"]').first().evaluate((element) => element.click());
      await page.waitForURL(`http://localhost:${port}/`);
      await page.waitForTimeout(1500);
    };
    const sample = async () => {
      await client.send("HeapProfiler.collectGarbage");
      await page.waitForTimeout(300);
      await client.send("HeapProfiler.collectGarbage");
      return {
        dom: await client.send("Memory.getDOMCounters"),
        heap: await client.send("Runtime.getHeapUsage"),
        motion: await page.evaluate(() => window.__portfolioMotion.read()),
      };
    };
    // The second warm cycle fills bounded route/image caches and the last frame.
    await cycle();
    await cycle();
    const samples = [await sample()];
    for (let index = 0; index < 3; index++) {
      await cycle();
      samples.push(await sample());
    }
    const first = samples[0].dom;
    for (const current of samples) {
      assert.ok(current.dom.nodes <= first.nodes + 3, `Detached route growth on ${port}: ${first.nodes} -> ${current.dom.nodes}`);
      assert.ok(current.dom.jsEventListeners <= first.jsEventListeners + 2, `Listener growth on ${port}`);
      assert.equal(current.motion.tickerListeners, 1);
      assert.equal(current.motion.triggers.length, 4);
      assert.equal(new Set(current.motion.triggers.map((trigger) => trigger.id)).size, 4);
    }
    assert.deepEqual(errors, []);
    results.push({ port, samples, errors });
    console.log(`PASS lifetime ${port}: bounded DOM/listeners, four pins, one ticker`);
    await context.close();
  }
  await mkdir(".cache/qa/lifetime", { recursive: true });
  await writeFile(".cache/qa/lifetime/results.json", JSON.stringify(results, null, 2));
} finally { await browser.close(); }
