"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { subscribeFrame } from "@/lib/motion-runtime";

const clamp = gsap.utils.clamp(0, 1);

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
      const boxes = [...stage.querySelectorAll<HTMLElement>("[data-stat-box]")];
      const timeline = gsap.timeline({ paused: true, onComplete: () => { stage.dataset.entered = "true"; } });
      // Spec order: box-1,2,3,4,7,8,5; target contains those seven boxes.
      [0, 1, 2, 3, 5, 6, 4].forEach((order, index) => {
        const box = boxes[order];
        const start = index * .16;
        const label = box.querySelector<HTMLElement>("[data-stat-label]");
        timeline.fromTo(box, { "--oh": 0 }, { "--oh": 1, duration: .26, ease: "power2.out" }, start)
          .fromTo(box, { "--ow": 0 }, { "--ow": 1, duration: .4, ease: "power3.out" }, start + .26);
        if (label) timeline.fromTo(label, { opacity: 0 }, { opacity: 1, duration: .55, ease: "none", scrambleText: { text: label.textContent, chars: "!<>-_\\/[]{}=+*^?#%&~" } }, start + .4);
        const strip = box.querySelector<HTMLElement>("[data-odometer-strip]");
        if (strip) {
          const digit = box.querySelector<HTMLElement>("[data-odometer]")!;
          const height = strip.firstElementChild!.getBoundingClientRect().height;
          const rest = strip.lastElementChild!.getBoundingClientRect().width;
          const wide = Math.max(...[...strip.children].map((child) => child.getBoundingClientRect().width));
          timeline.fromTo(strip, { y: 0 }, { y: -5 * height, duration: .7, ease: "power2.out" }, start + .4)
            .fromTo(digit, { width: wide }, { width: rest, duration: .7, ease: "power2.out" }, start + .4);
        }
      });
      timeline.fromTo(stage.querySelector("[data-statistics-glyph]"), { scale: 0 }, { scale: 1, duration: .66, ease: "back.out(1.6)" }, .16);
      let started = false;
      const enter = () => { if (!started) { started = true; timeline.play(0); } };
      ScrollTrigger.create({ id: "statistics-entry", trigger: stage, scroller, start: "top 75%", once: true, onEnter: enter });
      gsap.fromTo(stage.querySelectorAll("[data-stat-notch]"), { y: -56 }, { y: 56, ease: "power2.out", scrollTrigger: { trigger: stage, scroller, start: "top bottom", end: "bottom top", scrub: true } });
      const column = (event: Event) => {
        const { progress } = (event as CustomEvent<{ progress: number }>).detail;
        stage.dataset.motionProgress = String(progress);
        if (progress > 0) enter();
      };
      let handoff = 0;
      const handoffEvent = (event: Event) => { handoff = (event as CustomEvent<{ progress: number }>).detail.progress; };
      stage.addEventListener("portfolio:column", column);
      stage.addEventListener("portfolio:handoff", handoffEvent);
      const stop = subscribeFrame("statistics-dock", undefined, () => {
        const hero = document.querySelector<HTMLElement>(".hero-motion");
        const reveal = Number(hero?.dataset.revealProgress ?? 0);
        const desktop = innerWidth >= 1025;
        const navHeight = scroller.querySelector("nav")?.offsetHeight ?? 76;
        const previous = stage.style.transform;
        stage.style.transform = "";
        const top = stage.querySelector<HTMLElement>("[data-stat-canvas]")!.getBoundingClientRect().top;
        stage.style.transform = previous;
        const y = reveal > 0 ? desktop && handoff < 1 ? navHeight - top : Math.min(0, navHeight - top) : 0;
        const x = desktop ? -handoff * innerWidth * 1.34 : 0;
        stage.style.transform = `translate3d(${x}px,${handoff >= 1 ? 0 : y}px,0)`;
        stage.dataset.revealProgress = String(clamp(reveal));
        const heroTrigger = ScrollTrigger.getById("portfolio-hero");
        const projectTrigger = ScrollTrigger.getById("project-showcase");
        if (heroTrigger) {
          const columnStart = heroTrigger.start + (heroTrigger.end - heroTrigger.start) * (2 / 3 + 1 / 3 * .5);
          const projectTop = projectTrigger?.start ?? stage.offsetTop + stage.offsetHeight - navHeight;
          const progress = clamp((scroller.scrollTop - columnStart) / Math.max(1, projectTop - columnStart));
          stage.dataset.motionProgress = String(progress);
          if (progress > 0) enter();
        }
        if (reveal > 0 && reveal < .99) {
          const width = stage.offsetWidth;
          const height = stage.offsetHeight;
          const rows = Math.max(1, Math.ceil(height / width * 16));
          let path = "";
          for (let row = 0; row < rows; row++) {
            let open = -1;
            for (let col = 0; col <= 16; col++) {
              const hash = Math.sin(col * 12.9898 + row * 78.233) * 43758.5453;
              const noise = hash - Math.floor(hash);
              const visible = col < 16 && noise * .4 + (15 - col) / 15 * .6 <= reveal;
              if (visible && open < 0) open = col;
              if (!visible && open >= 0) {
                const left = (open * width / 16).toFixed(1);
                const right = (col * width / 16).toFixed(1);
                const top = (row * height / rows).toFixed(1);
                const bottom = ((row + 1) * height / rows).toFixed(1);
                path += `M${left} ${top}H${right}V${bottom}H${left}Z`;
                open = -1;
              }
            }
          }
          stage.style.clipPath = `path('${path || "M0 0Z"}')`;
        } else stage.style.clipPath = "";
      });
      return () => {
        stop(); stage.removeEventListener("portfolio:column", column); stage.removeEventListener("portfolio:handoff", handoffEvent);
        stage.style.transform = ""; stage.style.clipPath = ""; delete stage.dataset.motion; delete stage.dataset.entered; delete stage.dataset.motionProgress;
      };
    });
    return () => media.revert();
  }, []);
  return <span ref={ref} hidden aria-hidden="true" />;
}
