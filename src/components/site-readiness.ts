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

export function afterSiteReady(start: () => void | (() => void)) {
  let cleanup: void | (() => void);
  const run = () => { cleanup = start(); };
  if (released) run();
  else listeners.add(run);
  return () => { listeners.delete(run); cleanup?.(); };
}
