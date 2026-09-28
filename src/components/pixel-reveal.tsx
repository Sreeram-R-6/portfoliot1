"use client";

import { useEffect, useRef } from "react";

/** Original implementation of the described cell threshold algorithm. */
export function PixelReveal() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;
    let progress = Number(canvas.closest<HTMLElement>(".hero-motion")?.dataset.revealProgress ?? 0);
    const repaint = () => {
      const bounds = canvas.getBoundingClientRect();
      const columns = 16;
      const rows = Math.max(1, Math.ceil(bounds.height / Math.max(bounds.width, 1) * columns));
      canvas.width = columns;
      canvas.height = rows;
      context.clearRect(0, 0, columns, rows);
      context.fillStyle = "rgb(157 241 51)";
      for (let row = 0; row < rows; row++) {
        for (let column = 0; column < columns; column++) {
          const hash = Math.sin(column * 12.9898 + row * 78.233) * 43758.5453;
          const noise = hash - Math.floor(hash);
          const horizontal = (columns - 1 - column) / (columns - 1);
          const threshold = noise * 0.4 + horizontal * 0.6;
          if (progress > 0 && progress >= threshold) context.fillRect(column, row, 1, 1);
        }
      }
    };
    const reveal = (event: Event) => {
      const value = (event as CustomEvent<{ progress: number }>).detail?.progress;
      if (typeof value !== "number") return;
      progress = Math.max(0, Math.min(1, value));
      repaint();
    };
    const observer = new ResizeObserver(repaint);
    observer.observe(canvas);
    canvas.addEventListener("portfolio:reveal", reveal);
    repaint();
    return () => {
      observer.disconnect();
      canvas.removeEventListener("portfolio:reveal", reveal);
    };
  }, []);

  return <canvas ref={canvasRef} data-pixel-reveal aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full [image-rendering:pixelated]" />;
}
