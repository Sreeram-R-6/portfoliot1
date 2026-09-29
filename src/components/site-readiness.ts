"use client";

let released = false;
const listeners = new Set<() => void>();

/** Shared across route mounts; the session loader releases the initial entrance. */
export function releaseSiteReady() {
  if (released) return;
  released = true;
  listeners.forEach((listener) => listener());
  listeners.clear();
  window.dispatchEvent(new Event("portfolio:ready"));
}

export function afterSiteReady(start: () => void | (() => void), { resize = false } = {}) {
  let cleanup: void | (() => void);
  let frame = 0;
  let resizeTimer: ReturnType<typeof setTimeout> | undefined;
  let viewport = "";
  const run = () => {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => {
      const scroller = document.getElementById("scroll-container");
      const top = scroller?.scrollTop ?? 0;
      cleanup?.();
      viewport = `${innerWidth}x${innerHeight}`;
      cleanup = start();
      // Rebuild fit-dependent scenes in their natural layout, then refresh all
      // offsets and synchronize Lenis with any clamping caused by the new extent.
      window.dispatchEvent(new Event("portfolio:refresh"));
      if (resize) scroller?.dispatchEvent(new CustomEvent("portfolio:scrollto", { detail: { top } }));
    });
  };
  const onResize = () => {
    if (!released || viewport === `${innerWidth}x${innerHeight}`) return;
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(run, 120);
  };
  if (resize) window.addEventListener("resize", onResize);
  if (released) run();
  else listeners.add(run);
  return () => {
    listeners.delete(run);
    window.removeEventListener("resize", onResize);
    clearTimeout(resizeTimer);
    cancelAnimationFrame(frame);
    cleanup?.();
  };
}
