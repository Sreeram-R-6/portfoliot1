"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

const clamp = gsap.utils.clamp(0, 1);
const alphabet = "!<>-_\\/[]{}=+*^?#%&~";

/** Desktop text splitting is loaded only when this scene can use it. */
export function setupDesktopHero(hero: HTMLElement, scroller: HTMLElement) {
  gsap.registerPlugin(SplitText);
  const identity = hero.querySelector<HTMLElement>("[data-section=identity]")!;
  const manifesto = hero.querySelector<HTMLElement>("[data-section=manifesto]")!;
  // Content taller than the viewport stays in normal flow rather than clipping.
  const available = innerHeight - (scroller.querySelector("nav")?.offsetHeight ?? 76);
  if (Math.max(identity.scrollHeight, manifesto.scrollHeight) > available + 1) return;
  hero.dataset.motion = "active";
  const showIdentityOnFocus = () => {
    scroller.scrollTo({ top: trigger.start, behavior: "instant" });
    ScrollTrigger.update();
  };
  identity.addEventListener("focusin", showIdentityOnFocus);
  const titles = [...identity.querySelectorAll<HTMLElement>(".identity-name, .identity-region")].map((element) => SplitText.create(element, { type: "chars", aria: "none" }));
  const titleLabels = titles.map((split) => split.chars.map((char) => char.textContent ?? ""));
  const lines = [...identity.querySelectorAll<HTMLElement>(".identity-introduction, .identity-location")].map((element) => SplitText.create(element, { type: "lines", aria: "none" }));
  const contact = identity.querySelector<HTMLElement>(".identity-contact-stack")!;
  const badge = identity.querySelector<HTMLElement>(".identity-badge")!;
  const badgeWidth = badge.offsetWidth;
  const badgeHeight = badge.offsetHeight;
  const paragraph = manifesto.querySelector<HTMLElement>(".manifesto-paragraph")!;
  const words = [...manifesto.querySelectorAll<HTMLElement>(".manifesto-word")];
  const splits = [paragraph, ...words].map((element) => SplitText.create(element, { type: "chars", aria: "none" }));
  const labels = splits.map((split) => split.chars.map((char) => char.textContent ?? ""));
  const players = splits.map((split, index) => {
    const state = { value: 0 };
    let target = -1;
    let tween: gsap.core.Tween | undefined;
    const paint = () => split.chars.forEach((char, order) => {
      const amount = clamp((state.value - order / split.chars.length * .5) / .25);
      const element = char as HTMLElement;
      element.style.visibility = amount <= 0 ? "hidden" : "visible";
      element.textContent = amount >= 1 ? labels[index][order] : alphabet[Math.floor(Math.random() * alphabet.length)];
    });
    paint();
    return {
      to(value: number) {
        if (value === target) return;
        target = value; tween?.kill();
        tween = gsap.to(state, { value, duration: .7 * Math.abs(value - state.value), ease: "none", onUpdate: paint, onComplete: paint });
      },
      kill: () => tween?.kill(),
    };
  });
  const thresholds = players.map((_, index) => index === 0 ? 2 / 9 : .42222222222222217 + (index - 1) * (.6 - .42222222222222217) / Math.max(1, words.length - 1));
  const arrow = manifesto.querySelector<SVGElement>(".manifesto-arrow")!;
  const arrowFrame = manifesto.querySelector<HTMLElement>(".manifesto-arrow-frame")!;
  const arrowState = { out: 0 };
  let arrowTarget = -1;
  let arrowTween: gsap.core.Tween | undefined;
  let latestProgress = 0;
  const paintArrow = () => {
    const start = -(words[0]?.getBoundingClientRect().width ?? 0);
    const middle = .875 * parseFloat(getComputedStyle(document.documentElement).fontSize);
    const end = arrowFrame.offsetWidth - arrow.getBoundingClientRect().width;
    const travel = clamp((latestProgress - 2 / 3) / (7 / 9 - 2 / 3));
    gsap.set(arrow, { x: travel > 0 ? middle + (end - middle) * travel : start + (middle - start) * arrowState.out });
  };
  const apply = (progress: number) => {
    const exit = clamp(progress / (2 / 9));
    latestProgress = progress;
    titles.forEach((split, index) => split.chars.forEach((char, order) => {
      const amount = clamp((exit - (.3 + (split.chars.length - 1 - order) / split.chars.length * .2)) / .25);
      gsap.set(char, { opacity: amount >= 1 ? 0 : 1 });
      char.textContent = amount > 0 && amount < 1 ? alphabet[Math.floor(Math.random() * alphabet.length)] : titleLabels[index][order];
    }));
    lines.forEach((split) => split.lines.forEach((line, order) => {
      const amount = clamp((exit - order / split.lines.length * .5) / .5);
      gsap.set(line, { yPercent: -110 * amount, opacity: 1 - amount });
    }));
    gsap.set(contact, { yPercent: -110 * exit, opacity: 1 - exit });
    const width = badgeWidth * (1 - exit);
    const cutTop = Math.min(4, width), cutBottom = Math.min(10, width);
    gsap.set(badge, { clipPath: `polygon(0 ${cutTop}px,${cutTop}px 0,${width}px 0,${width}px ${Math.max(0, badgeHeight - cutBottom)}px,${width - cutBottom}px ${badgeHeight}px,0 ${badgeHeight}px)`, visibility: width <= 0 ? "hidden" : "visible" });
    gsap.set(identity.querySelector(".identity-scroll-cue"), { opacity: 1 - exit });
    gsap.set(manifesto, { visibility: progress >= 2 / 9 ? "visible" : "hidden" });
    const outgoing = clamp((progress - 7 / 9) / (2 / 9));
    players.forEach((player, index) => player.to(progress >= 7 / 9 ? +(outgoing < index / players.length * .5) : +(progress >= thresholds[index])));
    const nextArrow = +(progress >= (thresholds[1] ?? 2 / 9));
    if (nextArrow !== arrowTarget) {
      arrowTarget = nextArrow; arrowTween?.kill();
      arrowTween = gsap.to(arrowState, { out: nextArrow, duration: .7 * Math.abs(nextArrow - arrowState.out), ease: "none", onUpdate: paintArrow });
    }
    paintArrow();
    const reveal = clamp((progress - 2 / 3) * 3);
    hero.dataset.motionProgress = String(progress);
    hero.dataset.revealProgress = String(reveal);
    const canvas = manifesto.querySelector<HTMLElement>("[data-pixel-reveal]");
    canvas?.dispatchEvent(new CustomEvent("portfolio:reveal", { detail: { progress: reveal } }));
    const stats = document.querySelector<HTMLElement>("[data-section=statistics]");
    stats?.dispatchEvent(new CustomEvent("portfolio:column", { detail: { progress: clamp((reveal - .5) * 2), reveal } }));
  };
  const trigger = ScrollTrigger.create({
    id: "portfolio-hero", trigger: hero, scroller, refreshPriority: 100,
    start: () => `top ${scroller.querySelector("nav")?.offsetHeight ?? 76}px`,
    end: () => `+=${4.5 * innerHeight}`, pin: true, scrub: true,
    onUpdate: (self) => apply(self.progress), onRefresh: (self) => apply(self.progress),
  });
  apply(trigger.progress);
  return () => {
    identity.removeEventListener("focusin", showIdentityOnFocus);
    players.forEach((player) => player.kill());
    arrowTween?.kill();
    titles.forEach((split) => split.revert()); lines.forEach((split) => split.revert());
    splits.forEach((split) => split.revert());
    delete hero.dataset.motion; delete hero.dataset.motionProgress; delete hero.dataset.revealProgress;
  };
}
