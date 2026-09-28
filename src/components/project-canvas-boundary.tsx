"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { useStaticPoster } from "./decorative-canvas";

const ProjectCanvas = dynamic(() => import("./project-canvas").then((module) => module.ProjectCanvas), { ssr: false });

function subscribeDesktop(notify: () => void) {
  const query = matchMedia("(min-width: 1025px)");
  query.addEventListener("change", notify);
  return () => query.removeEventListener("change", notify);
}

export function ProjectCanvasBoundary() {
  const poster = useStaticPoster();
  const desktop = useSyncExternalStore(subscribeDesktop, () => matchMedia("(min-width: 1025px)").matches, () => false);
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const reportReady = useCallback((value: boolean) => {
    ref.current?.closest("[data-section]")?.setAttribute("data-project-gpu-ready", String(value));
  }, []);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) reportReady(false);
      setVisible(entry.isIntersecting);
    });
    observer.observe(element);
    return () => { observer.disconnect(); reportReady(false); };
  }, [reportReady]);

  useEffect(() => {
    const viewport = ref.current?.closest("[data-section]")?.querySelector<HTMLElement>("[data-project-viewport]");
    if (!viewport) return;
    const exposeFocusedCard = (event: FocusEvent) => {
      if (!matchMedia("(min-width: 1025px)").matches || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const card = event.target instanceof Element ? event.target.closest<HTMLElement>("[data-project-card]") : null;
      if (!card) return;
      const bounds = card.getBoundingClientRect(), frame = viewport.getBoundingClientRect();
      const shift = bounds.right > frame.right ? bounds.right - frame.right : bounds.left < frame.left ? bounds.left - frame.left : 0;
      if (shift) viewport.scrollLeft += shift;
    };
    viewport.addEventListener("focusin", exposeFocusedCard);
    return () => viewport.removeEventListener("focusin", exposeFocusedCard);
  }, []);

  return (
    <div ref={ref} aria-hidden="true" data-project-canvas data-render-mode={poster || !desktop ? "poster" : "gpu"} className="pointer-events-none absolute inset-0 z-0">
      {!poster && desktop && visible && <ProjectCanvas onReady={reportReady} />}
    </div>
  );
}
