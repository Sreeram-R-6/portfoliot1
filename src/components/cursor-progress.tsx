"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { createMotionMedia } from "@/lib/motion-media";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { subscribeFrame } from "@/lib/motion-runtime";
import "./cursor-progress.css";

export function CursorProgress() {
  const ref = useRef<HTMLDivElement>(null);
  const ring = useRef<SVGCircleElement>(null);
  useEffect(() => {
    const element = ref.current;
    const circle = ring.current;
    const scroller = document.getElementById("scroll-container");
    if (!element || !circle || !scroller) return;
    gsap.registerPlugin(ScrollTrigger);
    const media = createMotionMedia();
    media.add("(pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
      const circumference = Math.PI * 2 * 29.5;
      gsap.set(circle, { strokeDasharray: circumference, strokeDashoffset: circumference });
      const x = gsap.quickTo(element, "x", { duration: .2, ease: "power3" });
      const y = gsap.quickTo(element, "y", { duration: .2, ease: "power3" });
      let moved = false;
      const move = (event: PointerEvent) => {
        if (!moved) { moved = true; gsap.set(element, { x: event.clientX - 30, y: event.clientY - 30, opacity: 1 }); }
        else { x(event.clientX - 30); y(event.clientY - 30); }
      };
      window.addEventListener("pointermove", move, { passive: true });
      const stop = subscribeFrame("cursor-progress", undefined, () => {
        const progress = gsap.utils.clamp(0, 1, scroller.scrollTop / Math.max(1, scroller.scrollHeight - scroller.clientHeight));
        circle.style.strokeDashoffset = String(circumference * (1 - progress));
      });
      return () => { stop(); window.removeEventListener("pointermove", move); gsap.killTweensOf(element); element.style.opacity = "0"; };
    });
    return () => media.revert();
  }, []);
  return <div ref={ref} className="cursor-progress" aria-hidden="true"><svg viewBox="0 0 60 60" width="60" height="60" fill="none"><circle cx="30" cy="30" r="29.5" stroke="var(--background-stroke-1)" strokeWidth="1" /><circle ref={ring} cx="30" cy="30" r="29.5" stroke="var(--primary-green-neon)" strokeWidth="1" strokeLinecap="round" transform="rotate(-90 30 30)" /></svg></div>;
}
