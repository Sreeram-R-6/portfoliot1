"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { afterSiteReady } from "./site-readiness";
import "./route-transition.css";

const entryField = "portfolioEntry";
const positions = new Map<string, number>();
const createEntry = () => `p-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
const readPosition = (key: string) => {
  if (positions.has(key)) return positions.get(key) ?? 0;
  try { return Math.max(0, Number(sessionStorage.getItem(`portfolio:scroll:${key}`)) || 0); } catch { return 0; }
};

export function RouteTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const overlay = useRef<HTMLDivElement>(null);
  const currentPath = useRef(pathname);
  const entry = useRef("");
  const pending = useRef<{ kind: "push" | "pop"; top: number; key?: string } | null>(null);
  const navigationTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const finishTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const escapeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const restoreFrame = useRef(0);
  const inertContent = useRef<{ node: HTMLElement; previous: boolean } | null>(null);

  useEffect(() => {
    let initialRestorePending = false;
    const save = (persist = true) => {
      if (initialRestorePending) return;
      const scroller = document.getElementById("scroll-container");
      if (!entry.current || !scroller) return;
      const top = scroller.scrollTop;
      positions.set(entry.current, top);
      if (persist) {
        try { sessionStorage.setItem(`portfolio:scroll:${entry.current}`, String(top)); } catch { /* Storage is optional. */ }
      }
    };
    const markEntry = (key: string) => {
      entry.current = key;
      history.replaceState({ ...history.state, [entryField]: key }, "", location.href);
    };
    markEntry(typeof history.state?.[entryField] === "string" ? history.state[entryField] : createEntry());
    const initialTop = readPosition(entry.current);
    initialRestorePending = initialTop > 0;
    const cancelInitialRestore = afterSiteReady(() => {
      if (initialTop <= 0) return;
      const restoreInitial = () => {
        const node = document.getElementById("scroll-container");
        node?.dispatchEvent(new CustomEvent("portfolio:scrollto", { detail: { top: initialTop }, bubbles: true }));
        initialRestorePending = false;
      };
      const initialFrame = requestAnimationFrame(restoreInitial);
      return () => cancelAnimationFrame(initialFrame);
    });
    const block = () => {
      const node = document.getElementById("scroll-container");
      if (node && !inertContent.current) { inertContent.current = { node, previous: node.inert && node.dataset.orientationBlocked !== "true" }; node.inert = true; }
    };
    const uncover = () => {
      if (overlay.current) { overlay.current.hidden = true; delete overlay.current.dataset.phase; }
      if (inertContent.current) { inertContent.current.node.inert = inertContent.current.previous || inertContent.current.node.dataset.orientationBlocked === "true"; inertContent.current = null; }
      pending.current = null;
    };
    const cover = () => {
      clearTimeout(finishTimer.current); clearTimeout(escapeTimer.current);
      const element = overlay.current;
      if (element) { element.hidden = false; element.dataset.phase = "cover"; }
      block();
      // Failed/aborted routing cannot leave an inert or covered document.
      escapeTimer.current = setTimeout(uncover, 5000);
    };
    const click = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>("a[href]") : null;
      if (!anchor || anchor.download || (anchor.target && anchor.target !== "_self")) return;
      const url = new URL(anchor.href, location.href);
      if (url.origin !== location.origin || (url.pathname !== "/" && url.pathname !== "/work" && !url.pathname.startsWith("/work/"))) return;
      if (url.pathname === location.pathname) return;
      event.preventDefault();
      save();
      pending.current = { kind: "push", top: 0 };
      // Native dialog top layers must not sit above the pixel cover.
      document.querySelectorAll<HTMLDialogElement>("dialog[open]").forEach((dialog) => dialog.close());
      cover();
      clearTimeout(navigationTimer.current);
      const href = `${url.pathname}${url.search}${url.hash}`;
      navigationTimer.current = setTimeout(() => router.push(href, { scroll: false }), matchMedia("(prefers-reduced-motion: reduce)").matches ? 30 : 400);
    };
    const pop = (event: PopStateEvent) => {
      save();
      clearTimeout(navigationTimer.current);
      const key = typeof event.state?.[entryField] === "string" ? event.state[entryField] : createEntry();
      if (currentPath.current === location.pathname) { markEntry(key); pending.current = null; return; }
      pending.current = { kind: "pop", key, top: readPosition(key) };
      document.querySelectorAll<HTMLDialogElement>("dialog[open]").forEach((dialog) => dialog.close());
      cover();
    };
    const scrolling = (event: Event) => { if ((event.target as HTMLElement | null)?.id === "scroll-container" && !pending.current) save(false); };
    const pageHide = () => save();
    document.addEventListener("click", click, true);
    document.addEventListener("scroll", scrolling, true);
    window.addEventListener("popstate", pop);
    window.addEventListener("pagehide", pageHide);
    return () => {
      save();
      document.removeEventListener("click", click, true);
      document.removeEventListener("scroll", scrolling, true);
      window.removeEventListener("popstate", pop); window.removeEventListener("pagehide", pageHide);
      clearTimeout(navigationTimer.current); clearTimeout(finishTimer.current); clearTimeout(escapeTimer.current);
      cancelAnimationFrame(restoreFrame.current);
      cancelInitialRestore();
      uncover();
    };
  }, [router]);

  useEffect(() => {
    if (currentPath.current === pathname) return;
    currentPath.current = pathname;
    const navigation = pending.current;
    const key = navigation?.kind === "pop" ? navigation.key ?? createEntry() : createEntry();
    entry.current = key;
    history.replaceState({ ...history.state, [entryField]: key }, "", location.href);
    const top = navigation?.top ?? 0;
    let cancelled = false;
    const restore = () => {
      if (cancelled) return;
      const node = document.getElementById("scroll-container");
      let destination = top;
      if (node && navigation?.kind === "push" && location.hash) {
        try {
          const anchor = document.getElementById(decodeURIComponent(location.hash.slice(1)));
          if (anchor) destination = node.scrollTop + anchor.getBoundingClientRect().top - node.getBoundingClientRect().top - (node.querySelector("nav")?.getBoundingClientRect().height ?? 0);
        } catch { /* A malformed fragment must not abort navigation. */ }
      }
      if (node) node.dispatchEvent(new CustomEvent("portfolio:scrollto", { detail: { top: destination }, bubbles: true }));
    };
    const enter = () => {
      if (cancelled) return;
      window.dispatchEvent(new Event("portfolio:refresh"));
      restore();
      const node = document.getElementById("scroll-container");
      if (node && inertContent.current?.node !== node) {
        if (inertContent.current) inertContent.current.node.inert = inertContent.current.previous || inertContent.current.node.dataset.orientationBlocked === "true";
        inertContent.current = { node, previous: node.inert && node.dataset.orientationBlocked !== "true" };
        node.inert = true;
      }
      if (overlay.current) { overlay.current.hidden = false; overlay.current.dataset.phase = "enter"; }
      finishTimer.current = setTimeout(() => {
        restore();
        pending.current = null;
        clearTimeout(escapeTimer.current);
        if (overlay.current) overlay.current.hidden = true;
        if (inertContent.current) { inertContent.current.node.inert = inertContent.current.previous || inertContent.current.node.dataset.orientationBlocked === "true"; inertContent.current = null; }
        const main = document.getElementById("main-content");
        if (navigation?.kind !== "pop") main?.focus({ preventScroll: true });
      }, matchMedia("(prefers-reduced-motion: reduce)").matches ? 60 : 900);
    };
    document.fonts.ready.then(() => {
      if (cancelled) return;
      restoreFrame.current = requestAnimationFrame(() => { restoreFrame.current = requestAnimationFrame(enter); });
    });
    window.addEventListener("portfolio:scroll-ready", restore);
    return () => {
      cancelled = true;
      cancelAnimationFrame(restoreFrame.current);
      window.removeEventListener("portfolio:scroll-ready", restore);
      clearTimeout(finishTimer.current);
    };
  }, [pathname]);

  return <>{children}<div ref={overlay} className="route-transition" hidden aria-hidden="true">{Array.from({ length: 48 }, (_, index) => <i key={index} className={`route-pixel route-pixel-${(index * 17 + 11) % 8}`} />)}</div></>;
}
