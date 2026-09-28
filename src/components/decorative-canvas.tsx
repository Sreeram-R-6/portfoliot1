"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react";

export type CanvasKind = "footer" | "portrait" | "glyph" | "experience" | "project";

const OriginalCanvas = dynamic(() => import("./original-canvas").then((module) => module.OriginalCanvas), { ssr: false });
const NeutralGlyphCanvas = dynamic(() => import("./neutral-glyph-canvas").then((module) => module.NeutralGlyphCanvas), { ssr: false });

function subscribePowerPolicy(notify: () => void) {
  const queries = [window.matchMedia("(max-width: 767.98px)"), window.matchMedia("(prefers-reduced-motion: reduce)")];
  queries.forEach((query) => query.addEventListener("change", notify));
  return () => queries.forEach((query) => query.removeEventListener("change", notify));
}

function prefersPoster() {
  return navigator.hardwareConcurrency <= 4 || window.matchMedia("(max-width: 767.98px), (prefers-reduced-motion: reduce)").matches;
}

export function useStaticPoster() {
  return useSyncExternalStore(subscribePowerPolicy, prefersPoster, () => true);
}

export function DecorativeCanvas({ kind, label = "", children, className = "" }: { kind: CanvasKind; label?: string; children: ReactNode; className?: string }) {
  const lowPower = useStaticPoster();
  const [visible, setVisible] = useState(false);
  const [ready, setReady] = useState(false);
  const frameRef = useRef<HTMLDivElement>(null);
  const reportReady = useCallback((value: boolean) => setReady(value), []);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    observer.observe(frame);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={frameRef} aria-hidden="true" data-canvas-kind={kind} data-render-mode={lowPower ? "poster" : "gpu"} data-canvas-ready={ready && visible && !lowPower} className={`relative ${className}`}>
      <div className="canvas-poster absolute inset-0">{children}</div>
      {!lowPower && visible && (kind === "glyph" ? <NeutralGlyphCanvas onReady={reportReady} /> : <OriginalCanvas kind={kind} label={label} onReady={reportReady} />)}
    </div>
  );
}
