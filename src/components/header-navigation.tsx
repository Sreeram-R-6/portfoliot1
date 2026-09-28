"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import { gsap } from "gsap";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { siteContent, type PublicSiteContent } from "@/content/site";
import { SoundToggle } from "./sound-provider";
import "./header-navigation.css";
import { CursorProgress } from "./cursor-progress";

type MenuMotion = { open: () => void; close: () => void; scramble: (element: HTMLElement) => void };

export function HeaderNavigation({ site = siteContent }: { site?: PublicSiteContent }) {
  const [isOpen, setIsOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const motionRef = useRef<MenuMotion | null>(null);
  const navigation = site.navigation;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    gsap.registerPlugin(ScrambleTextPlugin);
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const items = dialog.querySelectorAll("[data-menu-item]");
    const scrambles = new Map<HTMLElement, gsap.core.Tween>();
    const finishClose = () => {
      dialog.dataset.motionState = "closed";
      dialog.close();
      setIsOpen(false);
      triggerRef.current?.focus();
    };
    let opening: gsap.core.Timeline;
    let closing: gsap.core.Timeline;
    const context = gsap.context(() => {
      opening = gsap.timeline({ paused: true, onComplete: () => { dialog.dataset.motionState = "open"; } })
        .fromTo(dialog, { "--menu-shade": 0 }, { "--menu-shade": 0.75, duration: 0.4, ease: "power2.out", immediateRender: false }, 0)
        .fromTo(dialog, { x: () => window.innerWidth }, { x: 0, duration: 0.175, ease: "power2.out", immediateRender: false }, 0)
        .fromTo(items, { opacity: 0, y: 28, scale: 0.96 }, { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: "power2.out", stagger: 0.1, immediateRender: false }, 0.4);
      closing = gsap.timeline({ paused: true, onComplete: finishClose })
        .to(dialog, { x: () => window.innerWidth, duration: 0.2, ease: "power2.in" }, 0)
        .to(dialog, { "--menu-shade": 0, duration: 0.3, ease: "power2.in" }, 0.1);
    }, headerRef);
    const resetScrambles = () => {
      scrambles.forEach((tween, element) => {
        tween.kill();
        element.querySelectorAll<HTMLElement>("[data-menu-char]").forEach((char) => { char.textContent = char.dataset.menuChar ?? ""; });
      });
      scrambles.clear();
    };
    const close = () => {
      if (!dialog.open || dialog.dataset.motionState === "closing") return;
      setIsOpen(false);
      opening.pause();
      resetScrambles();
      dialog.dataset.motionState = "closing";
      if (reducedMotion.matches) finishClose();
      else closing.invalidate().restart();
    };
    motionRef.current = {
      open: () => {
        if (dialog.open && dialog.dataset.motionState !== "closing") return;
        closing.pause();
        if (!dialog.open) dialog.showModal();
        setIsOpen(true);
        if (reducedMotion.matches) {
          gsap.set(dialog, { x: 0, "--menu-shade": 0.75 });
          gsap.set(items, { opacity: 1, y: 0, scale: 1 });
          dialog.dataset.motionState = "open";
        } else {
          dialog.dataset.motionState = "opening";
          opening.invalidate().restart();
        }
      },
      close,
      scramble: (element) => {
        const label = element.dataset.menuLabel;
        if (!label || reducedMotion.matches) return;
        scrambles.get(element)?.kill();
        const chars = element.querySelectorAll<HTMLElement>("[data-menu-char]");
        chars.forEach((char) => { char.textContent = char.dataset.menuChar ?? ""; });
        // Captured source-14.js: per-character hover decode.
        const tween = gsap.to(chars, {
          duration: 0.35,
          ease: "none",
          scrambleText: { text: "{original}", chars: "!<>-_\\/[]{}=+*^?#%&~", speed: 0.5, revealDelay: 0.05 },
          stagger: 0.014,
          onComplete: () => { scrambles.delete(element); },
        });
        scrambles.set(element, tween);
      },
    };
    const onPreference = () => {
      resetScrambles();
      if (!reducedMotion.matches) return;
      opening.pause();
      closing.pause();
      if (dialog.dataset.motionState === "closing") finishClose();
      else if (dialog.open) {
        gsap.set(dialog, { x: 0, "--menu-shade": 0.75 });
        gsap.set(items, { opacity: 1, y: 0, scale: 1 });
        dialog.dataset.motionState = "open";
      }
    };
    reducedMotion.addEventListener("change", onPreference);
    return () => {
      motionRef.current = null;
      reducedMotion.removeEventListener("change", onPreference);
      resetScrambles();
      context.revert();
      if (dialog.open) dialog.close();
    };
  }, []);

  const close = () => motionRef.current?.close();
  const closeOnBackdrop = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target !== event.currentTarget) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) close();
  };
  const scramble = (element: HTMLElement) => {
    const label = element.querySelector<HTMLElement>("[data-menu-label]");
    if (label) motionRef.current?.scramble(label);
  };

  return (
    <>
    <header ref={headerRef} data-section="header-navigation" className="sticky top-0 z-50 bg-background">
      <div className="orientation-guard" role="status">
        <p className="orientation-title">{site.orientation.title}</p>
        <p className="orientation-hint">{site.orientation.hint}</p>
      </div>
      <nav aria-label={navigation.label} className="site-navigation relative flex items-center justify-between px-4 py-5 sm:px-8">
        <a href={navigation.home.href} className="flex items-center gap-2 font-heading text-xs leading-5 font-semibold uppercase focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">
          <span aria-hidden="true" className="mr-1.5 block size-2.5 rotate-45 border border-primary" />
          {navigation.home.label}
        </a>
        <span className="hidden sm:inline-flex"><SoundToggle {...navigation.sound} /></span>
        <span className="hidden font-heading text-xs leading-5 tracking-[1.56px] text-muted-foreground uppercase sm:block">{site.location}</span>
        <span className="hidden font-heading text-xs leading-5 tracking-[1.56px] text-muted-foreground uppercase lg:block">
          {navigation.coordinates.map((coordinate, index) => <span key={`${index}-${coordinate}`} className="block">{coordinate}</span>)}
        </span>
        <button ref={triggerRef} type="button" aria-expanded={isOpen} aria-controls="navigation-dialog" aria-haspopup="dialog" onClick={() => motionRef.current?.open()} className="menu-surface relative min-h-9 px-4 py-2 bg-[#252e20]/80 font-heading text-sm leading-5 font-semibold uppercase hover:bg-primary hover:text-primary-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">
          <span aria-hidden="true" className="absolute top-0 left-0 size-1 border-t border-l border-primary" />
          <span aria-hidden="true" className="absolute right-0 bottom-0 size-1 border-r border-b border-primary" />
          {navigation.menu}
        </button>
      </nav>
      <dialog ref={dialogRef} id="navigation-dialog" aria-labelledby="navigation-dialog-title" onCancel={(event) => { event.preventDefault(); close(); }} onClose={() => setIsOpen(false)} onClick={closeOnBackdrop} data-lenis-prevent data-motion-state="closed" className="navigation-dialog fixed inset-x-6 top-[50px] bottom-[50px] z-[90] m-0 h-[calc(100dvh-100px)] max-h-[760px] w-auto max-w-none overflow-y-auto border-0 bg-[var(--background-stroke-1)] p-0 text-foreground sm:right-[50px] sm:left-auto sm:w-[380px]">
        <div className="flex min-h-full flex-col p-6">
          <div className="flex h-10 items-center justify-between">
            <h2 id="navigation-dialog-title" className="font-heading text-xs leading-4 font-normal uppercase tracking-[1.56px]">{navigation.label}</h2>
            <button type="button" autoFocus onClick={close} className="h-10 px-2 font-heading text-sm leading-5 font-semibold uppercase hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">{navigation.close}</button>
          </div>
          <ul className="mt-[68px] mb-auto flex flex-col pb-12">
            {navigation.links.map((link, index) => (
              <li key={`${index}-${link.label}`} data-menu-item>
                <a href={link.href} aria-label={link.label} onClick={close} onPointerEnter={(event) => scramble(event.currentTarget)} onFocus={(event) => scramble(event.currentTarget)} className="menu-surface group flex items-center justify-between px-2 py-3 font-heading text-[40px] leading-[0.86] font-medium uppercase hover:bg-primary hover:text-primary-foreground focus-visible:bg-primary focus-visible:text-primary-foreground focus-visible:outline-none sm:text-[56px]">
                  <span data-menu-label={link.label} aria-hidden="true">{[...link.label].map((char, index) => <span key={index} data-menu-char={char}>{char}</span>)}</span><span aria-hidden="true" className="font-mono text-xs tracking-normal">0{index + 1}</span>
                </a>
              </li>
            ))}
          </ul>
          <div data-menu-item className="border-t border-foreground/25 pt-6">
            <p className="font-heading text-xs leading-4 font-normal uppercase tracking-[1.56px]">{navigation.connections}</p>
            <ul className="mt-4 flex flex-wrap gap-x-8 gap-y-4 font-heading text-lg font-semibold uppercase">
              {[site.footer.message, ...(!site.footer.cv.href.startsWith("#") && !site.footer.cv.href.startsWith("TODO") ? [site.footer.cv] : []), ...site.footer.links].map((link, index) => (
                <li key={`${index}-${link.label}`}><a href={link.href} aria-label={link.label} onClick={close} onPointerEnter={(event) => scramble(event.currentTarget)} onFocus={(event) => scramble(event.currentTarget)} className="underline-offset-4 hover:text-primary hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"><span data-menu-label={link.label} aria-hidden="true">{[...link.label].map((char, index) => <span key={index} data-menu-char={char}>{char}</span>)}</span></a></li>
              ))}
            </ul>
          </div>
          <div data-menu-item className="mt-6 border-t border-foreground/25 pt-4"><SoundToggle {...navigation.sound} /></div>
        </div>
      </dialog>
    </header>
    <CursorProgress />
    </>
  );
}
