"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { createMotionMedia } from "@/lib/motion-media";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./hero-motion.css";
import { afterSiteReady } from "./site-readiness";

const clamp = gsap.utils.clamp(0, 1);

/** One pin owns both scenes. All progress thresholds come from recon. */
export function HeroMotion({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const hero = ref.current;
    const scroller = document.getElementById("scroll-container");
    if (!hero || !scroller) return;
    let entered = false;
    let mounted = true;
    let desktopModule: Promise<typeof import("./hero-desktop-motion")> | undefined;
    const loadDesktop = () => desktopModule ??= import("./hero-desktop-motion");
    // Warm desktop code under the loader; mobile never requests SplitText.
    if (innerWidth >= 768 && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
      hero.dataset.motionReady = "false";
      loadDesktop().then(() => { if (mounted) hero.dataset.motionReady = "true"; });
    } else hero.dataset.motionReady = "true";
    const stop = afterSiteReady(() => {
      gsap.registerPlugin(ScrollTrigger);
      const media = createMotionMedia();
      const entrance = gsap.context(() => {
        if (!entered) gsap.fromTo(hero.querySelectorAll('[data-section="identity"] [data-reveal]'), { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: matchMedia("(prefers-reduced-motion: reduce)").matches ? .12 : .8, stagger: .06, ease: "power3.out" });
        entered = true;
      }, hero);
      media.add("(max-width: 767.98px) and (prefers-reduced-motion: no-preference)", () => {
        const identity = hero.querySelector<HTMLElement>("[data-section=identity]")!;
        const manifesto = hero.querySelector<HTMLElement>("[data-section=manifesto]")!;
        const available = innerHeight - (scroller.querySelector("nav")?.offsetHeight ?? 76);
        if (Math.max(identity.scrollHeight, manifesto.scrollHeight) > available + 1) return;
        hero.dataset.motion = "active";
        const apply = (progress: number) => {
          const exit = clamp(progress / (2 / 9));
          const outgoing = clamp((progress - 7 / 9) / (2 / 9));
          gsap.set(identity, { opacity: 1 - exit, y: -exit * 32, visibility: exit >= 1 ? "hidden" : "visible" });
          gsap.set(manifesto, { opacity: progress < 2 / 9 ? 0 : 1 - outgoing, y: progress < 2 / 9 ? 24 : 0, visibility: progress >= 2 / 9 ? "visible" : "hidden" });
          const reveal = clamp((progress - 2 / 3) * 3);
          hero.dataset.motionProgress = String(progress);
          hero.dataset.revealProgress = String(reveal);
          manifesto.querySelector<HTMLElement>("[data-pixel-reveal]")?.dispatchEvent(new CustomEvent("portfolio:reveal", { detail: { progress: reveal } }));
        };
        const trigger = ScrollTrigger.create({
          id: "portfolio-hero", trigger: hero, scroller, refreshPriority: 100,
          start: () => `top ${scroller.querySelector("nav")?.offsetHeight ?? 76}px`,
          end: () => `+=${4.5 * innerHeight}`, pin: true, scrub: true,
          onUpdate: (self) => apply(self.progress), onRefresh: (self) => apply(self.progress),
        });
        const revealFocusedScene = (event: FocusEvent) => {
          const inManifesto = manifesto.contains(event.target as Node);
          scroller.scrollTo({ top: inManifesto ? trigger.start + (trigger.end - trigger.start) * .4 : trigger.start, behavior: "instant" });
          ScrollTrigger.update();
        };
        hero.addEventListener("focusin", revealFocusedScene);
        apply(trigger.progress);
        return () => {
          hero.removeEventListener("focusin", revealFocusedScene);
          delete hero.dataset.motion; delete hero.dataset.motionProgress; delete hero.dataset.revealProgress;
        };
      });
      media.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", (context) => {
        let cancelled = false;
        loadDesktop().then((module) => {
          if (cancelled) return;
          const top = scroller.scrollTop;
          context.add(() => module.setupDesktopHero(hero, scroller));
          ScrollTrigger.refresh();
          scroller.dispatchEvent(new CustomEvent("portfolio:scrollto", { detail: { top } }));
        });
        return () => { cancelled = true; };
      });
      // Readiness creates this upstream pin after the other scene effects. Recompute
      // downstream offsets with its spacing included before accepting scroll input.
      ScrollTrigger.refresh();
      return () => { media.revert(); entrance.revert(); };
    }, { resize: true });
    return () => { mounted = false; stop(); delete hero.dataset.motionReady; };
  }, []);
  return <div ref={ref} className="hero-motion">{children}</div>;
}
