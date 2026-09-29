"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { createMotionMedia } from "@/lib/motion-media";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { subscribeFrame } from "@/lib/motion-runtime";
import "./footer-motion.css";
import { afterSiteReady } from "./site-readiness";

export function FooterMotion({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const dock = ref.current;
    const footer = dock?.querySelector<HTMLElement>("footer");
    const scroller = document.getElementById("scroll-container");
    if (!dock || !footer || !scroller) return;
    return afterSiteReady(() => {
    gsap.registerPlugin(ScrollTrigger);
    const media = createMotionMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const links = footer.querySelectorAll(".footer-contact-link, .footer-group-label");
      const wordmark = footer.querySelector(".footer-wordmark-frame");
      const buttons = footer.querySelectorAll(".footer-action");
      const linkMotion = gsap.fromTo(links, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: .6, ease: "power2.out", stagger: .06, paused: true });
      const textMotion = gsap.fromTo(wordmark?.firstElementChild ?? wordmark, { yPercent: 100 }, { yPercent: 0, duration: .9, ease: "power3.out", paused: true });
      const cta = gsap.timeline({ paused: true });
      buttons.forEach((button, index) => {
        const start = index * .15;
        cta.fromTo(button, { clipPath: "inset(50% 50% 50% 50%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: .3, ease: "power3.out" }, start)
          .fromTo(button.children, { opacity: 0 }, { opacity: 1, duration: .05 }, start)
          .to(button.children, { opacity: .3, duration: .04 }, start + .09)
          .to(button.children, { opacity: 1, duration: .05 }, start + .13);
      });
      const pending = [
        { element: footer.querySelector(".footer-link-groups"), play: () => linkMotion.play() },
        { element: wordmark, play: () => textMotion.play() },
        { element: footer.querySelector(".footer-contact-actions"), play: () => cta.play() },
      ];
      const revealForKeyboard = () => {
        linkMotion.progress(1);
        textMotion.progress(1);
        cta.progress(1);
        pending.length = 0;
      };
      footer.addEventListener("focusin", revealForKeyboard);
      const stop = subscribeFrame("footer-entrance", undefined, () => {
        const bottom = scroller.getBoundingClientRect().bottom;
        const preceding = dock.previousElementSibling?.getBoundingClientRect().bottom ?? bottom;
        const desktop = innerWidth >= 1025;
        for (let index = pending.length - 1; index >= 0; index--) {
          const entry = pending[index];
          const bounds = entry.element?.getBoundingClientRect();
          if (!bounds) continue;
          if (desktop ? preceding < bottom && bounds.bottom >= preceding && bounds.top <= bottom : footer.getBoundingClientRect().top <= bottom * .75) {
            entry.play(); pending.splice(index, 1);
          }
        }
      });
      return () => { stop(); footer.removeEventListener("focusin", revealForKeyboard); };
    });
    media.add("(min-width: 1025px) and (prefers-reduced-motion: no-preference)", () => {
      if (footer.offsetHeight > innerHeight - (scroller.querySelector("nav")?.offsetHeight ?? 76)) return;
      dock.dataset.motion = "docked";
      ScrollTrigger.create({
        id: "footer-sink", scroller, scrub: true, invalidateOnRefresh: true, refreshPriority: -100,
        start: () => ScrollTrigger.maxScroll(scroller) - footer.offsetHeight,
        end: () => ScrollTrigger.maxScroll(scroller),
        onUpdate: (self) => { gsap.set(footer, { y: 64 * (1 - self.progress) }); },
      });
      return () => { delete dock.dataset.motion; };
    });
    return () => media.revert();
    }, { resize: true });
  }, []);
  return <div ref={ref} className="footer-motion">{children}</div>;
}
