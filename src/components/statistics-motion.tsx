"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";

export function StatisticsMotion() {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const stage = ref.current?.closest<HTMLElement>("[data-section=statistics]");
    const scroller = document.getElementById("scroll-container");
    if (!stage || !scroller) return;
    gsap.registerPlugin(ScrollTrigger, ScrambleTextPlugin);
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      stage.dataset.motion = "active";
      const timeline = gsap.timeline({ scrollTrigger: { id: "statistics-entry", trigger: stage, scroller, refreshPriority: 75, start: "top 75%", once: true } });
      const counts: HTMLElement[] = [];
      [...stage.querySelectorAll<HTMLElement>("[data-stat-box]")].forEach((box, index) => {
        const start = index * .16;
        const label = box.querySelector<HTMLElement>("[data-stat-label]");
        timeline.fromTo(box, { "--oh": 0, "--ow": 0 }, { "--oh": 1, duration: .26, ease: "power2.out" }, start)
          .to(box, { "--ow": 1, duration: .4, ease: "power3.out" }, start + .26);
        if (label) timeline.fromTo(label, { opacity: 0 }, { opacity: 1, duration: .55, ease: "none", scrambleText: { text: label.textContent } }, start + .4);
        const element = box.querySelector<HTMLElement>("[data-counter-value]");
        if (element) {
          counts.push(element);
          timeline.add(() => { element.dataset.rolling = "true"; }, start + .4);
          element.querySelectorAll<HTMLElement>("[data-counter-strip]").forEach((strip) => {
            const target = Number(strip.dataset.counterTarget);
            timeline.fromTo(strip, { yPercent: 0 }, { yPercent: -100 * target / (target + 1), duration: .7, ease: "power2.out" }, start + .4);
          });
        }
      });
      timeline.fromTo(stage.querySelector("[data-statistics-glyph]"), { scale: 0 }, { scale: 1, duration: .66, ease: "back.out(1.6)" }, .16);
      return () => { counts.forEach((element) => { delete element.dataset.rolling; }); delete stage.dataset.motion; };
    });
    return () => media.revert();
  }, []);
  return <span ref={ref} hidden aria-hidden="true" />;
}
