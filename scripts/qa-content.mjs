import { chromium } from "@playwright/test";
import { mkdir, writeFile, readFile } from "node:fs/promises";
import assert from "node:assert/strict";
import sharp from "sharp";

const base = process.env.QA_URL || "http://localhost:3000";
const output = process.env.QA_OUTPUT || ".cache/qa/content";
const widths = [320, 375, 768, 1280, 1440, 1920];
const sections = ["header-navigation", "identity", "manifesto", "statistics", "projects", "experience", "footer"];
const cases = [["real", "/", 11], ["maximum", "/qa-stress/maximum", 20], ["twenty", "/qa-stress/twenty", 20], ["three", "/qa-stress/three", 3], ["empty", "/qa-stress/empty", 0]].filter(([name]) => !process.env.QA_CASE || process.env.QA_CASE === name);
const source = await readFile("src/content/site.json", "utf8");
await mkdir(output, { recursive: true });
const results = [];
const browser = await chromium.launch({ channel: "chrome", headless: true });
try {
  for (const [name, path, count] of cases) for (const width of widths) for (const reducedMotion of ["reduce", "no-preference"]) {
    const context = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion });
    const page = await context.newPage();
    const messages = [];
    page.on("pageerror", (error) => messages.push(error.message));
    page.on("console", (message) => {
      if (["error", "warning"].includes(message.type()) && !message.text().includes("THREE.Clock: This module has been deprecated")) messages.push(message.text());
    });
    await page.goto(`${base}${path}`);
    await page.evaluate(() => document.fonts.ready);
    await page.locator(".site-loader").waitFor({ state: "hidden" });
    await page.waitForTimeout(1100);
    // Start the interaction sweep with a real user input. Programmatic focusing
    // before any input keeps the LCP observer open while below-fold images enter.
    await page.keyboard.press("Tab");
    assert.equal(await page.locator("[data-project-card]").count(), count);
    const pin = await page.evaluate(() => window.__portfolioMotion?.read().triggers.find((entry) => entry.id === "project-showcase"));
    const pinChecks = [];
    if (pin) {
      for (const fraction of [.1, .25, .5, .75, .9]) {
        await page.evaluate((top) => document.getElementById("scroll-container").dispatchEvent(new CustomEvent("portfolio:scrollto", { detail: { top } })), pin.start + (pin.end - pin.start) * fraction);
        await page.waitForTimeout(1200);
        const position = await page.evaluate(() => ({ top: document.querySelector('[data-section="projects"]').getBoundingClientRect().top, nav: document.querySelector("nav").offsetHeight }));
        assert.ok(Math.abs(position.top - position.nav) <= 2, `${name}/${width}: pin detached at ${fraction}`);
        pinChecks.push({ fraction, ...position });
      }
    }
    if (count) {
      if (pin) {
        // Re-enter the visible pin before testing keyboard navigation. The exit
        // mask intentionally hides the whole scene, so native focus skips it.
        await page.evaluate((top) => document.getElementById("scroll-container").dispatchEvent(new CustomEvent("portfolio:scrollto", { detail: { top } })), pin.start + (pin.end - pin.start) * .1);
        await page.waitForTimeout(1200);
      }
      const last = page.locator("[data-project-thumb]").last();
      await last.focus();
      await page.waitForTimeout(1200);
      const box = await last.boundingBox();
      assert.ok(box && box.x >= -2 && box.x + box.width <= width + 2 && box.y >= -2 && box.y + box.height <= 902, `${name}/${width}: last project unreachable`);
      if (pin) {
        await page.evaluate((top) => document.getElementById("scroll-container").dispatchEvent(new CustomEvent("portfolio:scrollto", { detail: { top } })), pin.end + 200);
        await page.waitForTimeout(1200);
        const top = await page.locator('[data-section="projects"]').evaluate((element) => element.getBoundingClientRect().top);
        assert.ok(top < -100, `${name}/${width}: pin failed to release`);
      }
    }
    const measurements = [];
    for (const section of sections) {
      await page.evaluate((name) => {
        const element = document.querySelector(`[data-section="${name}"]`);
        const scroller = document.getElementById("scroll-container");
        const trigger = window.__portfolioMotion?.read().triggers.find((entry) => entry.id === (name === "projects" ? "project-showcase" : "portfolio-hero"));
        let top;
        if (name === "manifesto" && trigger) top = trigger.start + (trigger.end - trigger.start) * .68;
        else if (name === "projects" && trigger) top = trigger.start + (trigger.end - trigger.start) * .29;
        else top = scroller.scrollTop + element.getBoundingClientRect().top - (document.querySelector("nav")?.offsetHeight || 76);
        scroller.dispatchEvent(new CustomEvent("portfolio:scrollto", { detail: { top } }));
      }, section);
      await page.waitForTimeout(section === "statistics" && reducedMotion === "no-preference" ? 2400 : 300);
      const measured = await page.evaluate((name) => {
        const section = document.querySelector(`[data-section="${name}"]`);
        const visible = (element) => {
          if (element.closest('[inert]')) return false;
          if (element.classList.contains("sr-only")) return false;
          for (let node = element; node instanceof Element; node = node.parentElement) {
            const css = getComputedStyle(node);
            if (css.display === "none" || css.visibility === "hidden" || Number(css.opacity) === 0) return false;
          }
          const rect = element.getBoundingClientRect();
          return rect.width > 0 && rect.height > 0 && rect.bottom > 0 && rect.top < innerHeight && rect.right > 0 && rect.left < innerWidth;
        };
        const elements = [...section.querySelectorAll("h1,h2,h3,p,.identity-name,.rowTitle,.role,.footer-action,.footer-contact-link")].filter(visible);
        const clipped = elements.filter((element) => {
          const css = getComputedStyle(element);
          return ["hidden", "clip"].includes(css.overflowY) && element.scrollHeight > element.clientHeight + 2;
        }).map((element) => element.textContent.slice(0, 80));
        const overlaps = [];
        for (let i = 0; i < elements.length; i++) for (let j = i + 1; j < elements.length; j++) {
          const a = elements[i], b = elements[j];
          if (a.contains(b) || b.contains(a)) continue;
          const ar = a.getBoundingClientRect(), br = b.getBoundingClientRect();
          if (Math.min(ar.right, br.right) - Math.max(ar.left, br.left) > 2 && Math.min(ar.bottom, br.bottom) - Math.max(ar.top, br.top) > 2) overlaps.push([a.textContent.slice(0, 45), b.textContent.slice(0, 45)]);
        }
        return { section: name, rootOverflow: document.documentElement.scrollWidth > innerWidth, scrollerOverflow: document.getElementById("scroll-container").scrollWidth > innerWidth, clipped, overlaps };
      }, section);
      measurements.push(measured);
      assert.equal(measured.rootOverflow, false, `${name}/${width}/${section}: root overflow`);
      assert.equal(measured.scrollerOverflow, false, `${name}/${width}/${section}: scroller overflow`);
      assert.deepEqual(measured.clipped, [], `${name}/${width}/${section}: clipped text`);
      assert.deepEqual(measured.overlaps, [], `${name}/${width}/${section}: overlapping text`);
      if (name === "real" && reducedMotion === "reduce") {
        // Temporarily expose the native scroller so an entire section can be cropped,
        // including cards below the viewport. Restore it before further assertions.
        const style = await page.addStyleTag({ content: 'html,body{height:auto!important;overflow:visible!important;scrollbar-width:none!important}#scroll-container{height:auto!important;overflow:visible!important}[data-section="header-navigation"]{position:relative!important}nextjs-portal,.skip-link{visibility:hidden!important}' });
        await page.locator(`[data-section="${section}"]`).screenshot({ path: `${output}/${section}-${width}.png` });
        await style.evaluate((element) => element.remove());
      }
    }
    if (name === "real") {
      assert.equal(await page.locator("body").innerText().then((text) => text.includes("TODO: add project link")), false);
      await page.evaluate(() => {
        const section = document.querySelector('[data-section="projects"]');
        const scroller = document.getElementById("scroll-container");
        const trigger = window.__portfolioMotion?.read().triggers.find((entry) => entry.id === "project-showcase");
        const top = trigger ? trigger.start + (trigger.end - trigger.start) * .29 : scroller.scrollTop + section.getBoundingClientRect().top - document.querySelector("nav").offsetHeight;
        scroller.dispatchEvent(new CustomEvent("portfolio:scrollto", { detail: { top } }));
      });
      await page.waitForTimeout(reducedMotion === "no-preference" ? 1500 : 100);
      const button = page.locator("[data-project-thumb]").first();
      await button.focus(); await page.keyboard.press("Enter");
      assert.equal(await page.locator("dialog[open]").count(), 1);
      const expected = JSON.parse(source).projects[0].description;
      assert.equal(await page.locator("[data-detail-description]").textContent(), expected);
      await page.keyboard.press("Tab");
      assert.equal(await page.evaluate(() => document.querySelector("dialog[open]").contains(document.activeElement)), true);
      await page.keyboard.press("Escape");
      assert.equal(await button.evaluate((element) => document.activeElement === element), true);
    }
    if (reducedMotion === "reduce") assert.equal(await page.locator("canvas").count(), 0);
    const rail = await page.locator('[data-section="projects"]').evaluate((element) => ({ layout: element.dataset.projectLayout || "grid", width: element.querySelector("[data-project-track]").offsetWidth, trigger: window.__portfolioMotion?.read().triggers.find((entry) => entry.id === "project-showcase") }));
    if (["real", "twenty", "three"].includes(name) && width >= 1440 && reducedMotion === "no-preference") assert.equal(rail.layout, "horizontal", "Regular-length content should retain the horizontal pin");
    assert.deepEqual(messages, [], `${name}/${width}/${reducedMotion}: console output`);
    results.push({ name, width, reducedMotion, rail, pinChecks, sections: measurements.length, consoleMessages: messages.length });
    await writeFile(`${output}/results.json`, `${JSON.stringify(results, null, 2)}\n`);
    console.log(`PASS ${name} ${width} ${reducedMotion}: ${count} projects; ${rail.layout}`);
    await context.close();
  }
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  await context.addInitScript(() => Object.defineProperty(navigator, "hardwareConcurrency", { value: 2 }));
  const page = await context.newPage();
  await page.goto(base); await page.waitForTimeout(1100);
  await page.locator('[data-section="projects"]').scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  assert.equal(await page.locator("canvas").count(), 0);
  await context.close();
  assert.equal(await readFile("src/content/site.json", "utf8"), source, "Source content changed");
  await writeFile(`${output}/results.json`, `${JSON.stringify(results, null, 2)}\n`);
  if (!process.env.QA_CASE) for (const section of sections) {
    const panels = await Promise.all(widths.map(async (width, index) => ({ input: await sharp(`${output}/${section}-${width}.png`).resize({ width: 320, height: 900, fit: "contain", background: "#222" }).toBuffer(), left: index * 320, top: 0 })));
    await sharp({ create: { width: widths.length * 320, height: 900, channels: 3, background: "#222" } }).composite(panels).png().toFile(`${output}/${section}-review.png`);
  }
  console.log(`PASS ${results.length} page configurations; ${sections.length * widths.length} section crops; low-power fallback; source unchanged`);
} finally {
  await browser.close();
}
