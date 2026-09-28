"use client";

import { useEffect, useRef } from "react";

/** Measure the original string, independent of any decorative SplitText spans. */
export function FitText({ text, className }: { text: string; className: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = ref.current;
    const parent = element?.parentElement;
    if (!element || !parent) return;
    let mounted = true;
    let previousWidth = -1;
    const fit = () => {
      if (!mounted) return;
      element.style.removeProperty("--fit-size");
      const style = getComputedStyle(element);
      const size = parseFloat(style.fontSize);
      const context = document.createElement("canvas").getContext("2d");
      if (!context) return;
      context.font = `${style.fontWeight} ${size}px ${style.fontFamily}`;
      const spacing = parseFloat(style.letterSpacing) || 0;
      const width = context.measureText(text).width + Math.max(0, text.length - 1) * spacing;
      element.style.setProperty("--fit-size", `${Math.min(size, size * (element.clientWidth - 2) / Math.max(1, width))}px`);
    };
    const observer = new ResizeObserver(() => {
      if (parent.clientWidth !== previousWidth) { previousWidth = parent.clientWidth; fit(); }
    });
    observer.observe(parent);
    fit();
    document.fonts.ready.then(fit);
    return () => { mounted = false; observer.disconnect(); };
  }, [text]);
  return <div ref={ref} className={className} aria-hidden="true" data-reveal>{text}</div>;
}
