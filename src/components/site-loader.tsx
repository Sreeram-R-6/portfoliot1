"use client";

import { useEffect, useRef } from "react";
import { releaseSiteReady } from "./site-readiness";
import "./site-loader.css";

const sessionKey = "portfolio:loaded";

export function SiteLoader({ label = "Loading", contentSelector = "#scroll-container" }: { label?: string; contentSelector?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const counter = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const cover = ref.current;
    if (!cover) return;
    const content = document.querySelector<HTMLElement>(contentSelector);
    let frame = 0;
    let readinessFrame = 0;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let observer: MutationObserver | undefined;
    let cancelled = false;
    let target = 0;
    let shown = 0;
    let completed = false;
    const wasInert = content?.inert ?? false;
    const release = () => {
      if (cancelled) return;
      cover.hidden = true;
      if (content) content.inert = wasInert || content.dataset.orientationBlocked === "true";
      releaseSiteReady();
      try { sessionStorage.setItem(sessionKey, "1"); } catch { /* Private storage must not gate the page. */ }
    };
    let previouslyLoaded = false;
    try { previouslyLoaded = sessionStorage.getItem(sessionKey) === "1"; } catch { /* Continue with the initial loader. */ }
    if (previouslyLoaded) { release(); return; }
    if (content) content.inert = true;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const paint = () => {
      shown = Math.min(target, shown + Math.max(1, (target - shown) * .3));
      if (counter.current) counter.current.textContent = `${Math.floor(shown)}%`;
      cover.style.setProperty("--load-progress", String(shown / 100));
      cover.dataset.stage = shown < 78 ? "loading" : shown < 95 ? "converging" : "finishing";
      if (!completed) frame = requestAnimationFrame(paint);
    };
    frame = requestAnimationFrame(paint);
    const finish = () => {
      if (completed || cancelled) return;
      completed = true;
      clearTimeout(watchdog);
      observer?.disconnect();
      observer = undefined;
      cancelAnimationFrame(frame);
      target = 100;
      const initial = shown;
      const started = performance.now();
      const complete = () => {
        if (cancelled) return;
        const amount = reduced ? 1 : Math.min(1, (performance.now() - started) / 60);
        shown = initial + (100 - initial) * (1 - (1 - amount) ** 3);
        if (counter.current) counter.current.textContent = `${Math.floor(shown)}%`;
        cover.style.setProperty("--load-progress", String(shown / 100));
        if (amount < 1) { frame = requestAnimationFrame(complete); return; }
        cover.dataset.stage = "complete";
        // A 60ms final count plus a 220ms exit stays within the 300ms allowance.
        timer = setTimeout(release, reduced ? 60 : 220);
      };
      complete();
    };
    const visible = (element: Element) => {
      const box = element.getBoundingClientRect();
      return box.width > 0 && box.height > 0 && box.top < innerHeight && box.bottom > 0;
    };
    const tasks: Promise<void>[] = [];
    let finishedTasks = 0;
    const addTask = (task: Promise<unknown>) => {
      tasks.push(task.then(() => undefined, () => undefined).then(() => {
        finishedTasks += 1;
        target = Math.max(target, Math.min(95, finishedTasks / tasks.length * 95));
      }));
    };
    addTask(document.fonts.ready);
    document.querySelectorAll<HTMLImageElement>("img").forEach((image) => {
      if (image.loading === "lazy" || !visible(image)) return;
      addTask(image.decode());
    });
    // Only initially visible active renderers participate, never below-fold scenes.
    addTask(new Promise<void>((resolve) => {
      readinessFrame = requestAnimationFrame(() => {
        const renderers = [...document.querySelectorAll<HTMLElement>('[data-canvas-kind][data-render-mode="gpu"]')].filter(visible);
        const motion = [...document.querySelectorAll<HTMLElement>('[data-motion-ready="false"]')].filter(visible);
        const check = () => {
          if (motion.every((scene) => scene.dataset.motionReady === "true") && renderers.every((renderer) => renderer.dataset.renderMode !== "gpu" || renderer.dataset.canvasReady === "true")) resolve();
        };
        observer = new MutationObserver(check);
        renderers.forEach((renderer) => observer?.observe(renderer, { attributes: true, attributeFilter: ["data-canvas-ready", "data-render-mode"] }));
        motion.forEach((scene) => observer?.observe(scene, { attributes: true, attributeFilter: ["data-motion-ready"] }));
        check();
      });
    }));
    Promise.all(tasks).then(finish);
    const watchdog = setTimeout(finish, 6000);
    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      cancelAnimationFrame(readinessFrame);
      clearTimeout(timer); clearTimeout(watchdog);
      observer?.disconnect();
      if (content) content.inert = wasInert || content.dataset.orientationBlocked === "true";
    };
  }, [contentSelector]);

  return <div ref={ref} className="site-loader" role="status" aria-label={label} data-stage="loading">
    <div className="site-loader-frame" aria-hidden="true" />
    <div className="site-loader-center"><span className="site-loader-label">{label}</span><span ref={counter} className="site-loader-count">0%</span></div>
  </div>;
}
