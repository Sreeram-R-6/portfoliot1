"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { subscribeFrame } from "@/lib/motion-runtime";

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const content = contentRef.current;
    if (!wrapper || !content) return;

    gsap.registerPlugin(ScrollTrigger);
    const previousScroller = ScrollTrigger.defaults({}).scroller;
    ScrollTrigger.defaults({ scroller: wrapper });
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let stopScrolling: (() => void) | undefined;
    let mounted = true;

    const configureScrolling = () => {
      stopScrolling?.();
      if (preference.matches) {
        wrapper.dataset.scrollMode = "native";
        const scrollTo = (event: Event) => {
          const top = (event as CustomEvent<{ top: number }>).detail?.top;
          if (typeof top === "number" && Number.isFinite(top)) wrapper.scrollTo({ top, behavior: "instant" });
        };
        wrapper.addEventListener("scroll", ScrollTrigger.update, { passive: true });
        wrapper.addEventListener("portfolio:scrollto", scrollTo);
        stopScrolling = () => {
          wrapper.removeEventListener("scroll", ScrollTrigger.update);
          wrapper.removeEventListener("portfolio:scrollto", scrollTo);
        };
      } else {
        wrapper.dataset.scrollMode = "smooth";
        const lenis = new Lenis({
          wrapper,
          content,
          autoRaf: false,
          lerp: 0.045,
          wheelMultiplier: 0.75,
          smoothWheel: true,
          syncTouch: true,
          syncTouchLerp: 0.05,
          touchMultiplier: 0.85,
          anchors: true,
        });
        const scrollTo = (event: Event) => {
          const top = (event as CustomEvent<{ top: number }>).detail?.top;
          if (typeof top === "number" && Number.isFinite(top)) lenis.scrollTo(top, { immediate: true, force: true });
        };
        wrapper.addEventListener("portfolio:scrollto", scrollTo);
        lenis.on("scroll", ScrollTrigger.update);
        gsap.ticker.lagSmoothing(0);
        const stopFrame = subscribeFrame("lenis", undefined, (time) => lenis.raf(time * 1000));
        stopScrolling = () => {
          stopFrame();
          wrapper.removeEventListener("portfolio:scrollto", scrollTo);
          lenis.off("scroll", ScrollTrigger.update);
          lenis.destroy();
        };
      }
      ScrollTrigger.refresh();
    };

    configureScrolling();
    preference.addEventListener("change", configureScrolling);
    const refresh = () => ScrollTrigger.refresh();
    const nav = content.querySelector("nav");
    const updateNavHeight = () => {
      if (nav) wrapper.style.setProperty("--nav-height", `${nav.getBoundingClientRect().height}px`);
      refresh();
    };
    const observer = new ResizeObserver(updateNavHeight);
    if (nav) observer.observe(nav);
    updateNavHeight();
    window.addEventListener("resize", refresh);
    document.fonts.ready.then(() => {
      if (mounted) updateNavHeight();
    });

    return () => {
      mounted = false;
      preference.removeEventListener("change", configureScrolling);
      window.removeEventListener("resize", refresh);
      observer.disconnect();
      stopScrolling?.();
      delete wrapper.dataset.scrollMode;
      ScrollTrigger.defaults({ scroller: previousScroller });
    };
  }, []);

  return (
    <div ref={wrapperRef} id="scroll-container" className="h-dvh overflow-x-hidden overflow-y-auto">
      <div ref={contentRef} id="scroll-content">{children}</div>
    </div>
  );
}
