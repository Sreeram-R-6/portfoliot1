"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { createMotionMedia } from "@/lib/motion-media";
import { siteContent, type PublicSiteContent } from "@/content/site";
import { DecorativeCanvas } from "./decorative-canvas";
import { GlyphPoster } from "./glyph-poster";
import styles from "./experience.module.css";


export function ExperienceMark({ index }: { index: string }) {
  const variant = (Number(index) - 1) % 7;
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 669 415" width="669" height="415" className={styles.mark} color="#ffffff" aria-hidden="true">
      <g transform={`translate(334.5 207.5) rotate(${variant * 15})`} stroke="#ffffff" fill="none" strokeWidth="12" strokeLinejoin="miter">
        <path d="M-106-66H-26V-106H66V-26H106V66H26V106H-66V26H-106Z" />
        <rect x="-38" y="-38" width="76" height="76" />
        {variant % 2 === 0 ? <path d="M-134 0H-80M80 0H134M0-134V-80M0 80V134" /> : <path d="M-118-118L-78-78M78 78L118 118M118-118L78-78M-78 78L-118 118" />}
        {variant > 3 && <circle r="156" strokeWidth="3" />}
      </g>
    </svg>
  );
}

export function Experience({ site = siteContent }: { site?: PublicSiteContent }) {
  const content = site.sections.experience;
  const ref = useRef<HTMLElement>(null);
  const [selection, setSelected] = useState(0);
  const selected = selection < 0 ? -1 : Math.min(selection, content.entries.length - 1);
  const selectedEntry = content.entries[Math.max(0, selected)];
  const split = Math.ceil(content.entries.length / 2);

  useEffect(() => {
    const description = ref.current?.querySelector<HTMLElement>("#experience-current-description");
    const active = description?.querySelector<HTMLElement>('p[data-active="true"]');
    if (!description || !active) return;
    const measure = () => description.style.setProperty("--description-height", `${active.scrollHeight}px`);
    const observer = new ResizeObserver(measure);
    observer.observe(active); measure();
    return () => observer.disconnect();
  }, [selected]);

  useEffect(() => {
    const media = createMotionMedia();
    media.add("(hover: hover) and (prefers-reduced-motion: no-preference)", () => {
      const elements = ref.current?.querySelectorAll<HTMLElement>("[data-experience-hover]") ?? [];
      const cleanups = [...elements].map((element) => {
        const button = element.closest("button")!;
        let tween: gsap.core.Timeline | undefined;
        const enter = () => {
          tween?.kill();
          tween = gsap.timeline({ delay: .18 }).to(element, { opacity: .15, duration: .07 }).to(element, { opacity: 1, duration: .07 }).to(element, { opacity: .15, duration: .07 }).to(element, { opacity: 1, duration: .07 });
        };
        const leave = () => { tween?.kill(); gsap.set(element, { clearProps: "opacity" }); };
        button.addEventListener("pointerenter", enter); button.addEventListener("pointerleave", leave);
        return () => { leave(); button.removeEventListener("pointerenter", enter); button.removeEventListener("pointerleave", leave); };
      });
      return () => cleanups.forEach((cleanup) => cleanup());
    });
    return () => media.revert();
  }, []);

  function select(index: number) {
    const mobile = window.matchMedia("(max-width: 767.98px)").matches;
    setSelected((current) => mobile && current === index ? -1 : index);
  }

  function renderRow(entry: (typeof content.entries)[number], index: number) {
    const active = selected === index;
    const panelId = `${entry.id}-panel`;
    return (
      <div className={styles.row} data-selected={active} key={entry.id}>
        <button className={styles.button} type="button" id={`${entry.id}-control`} aria-expanded={active} aria-pressed={active} aria-controls={`${panelId} experience-current-description`} onClick={() => select(index)}>
          <span className={styles.rowBackground} aria-hidden="true" />
          <span className={styles.index}>{entry.index}</span>
          <span className={styles.rowText}>
            <span data-experience-hover className={styles.rowTitle}>{entry.title}</span>
            <span className={styles.role}>{entry.role}</span>
          </span>
          <span className={styles.toggle} aria-hidden="true">{active ? content.collapseMark : content.expandMark}</span>
        </button>
        <div id={panelId} className={styles.panel} inert={!active} aria-hidden={!active} role="region" aria-labelledby={`${entry.id}-control`}>
          <div className={styles.panelInner}>
            <p className={styles.panelCopy}>{entry.description}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section ref={ref} id={content.id} className={styles.stage} data-section="experience" aria-labelledby="experience-heading">
      <GlyphPoster variant="orbit" className={styles.sectionGlyph} />
      <div className={styles.heading}>
        <span className={styles.badge}>{content.eyebrow}</span>
        <h2 id="experience-heading" className={styles.title}>{content.title}</h2>
      </div>
      <p className={styles.introduction}>{content.description}</p>
      <div className={styles.body}>
        <div className={`${styles.list} ${styles.left}`}>
          {content.entries.slice(0, split).map((entry, index) => renderRow(entry, index))}
        </div>
        {selectedEntry && <div className={styles.crt} data-experience-crt data-experience-index={selectedEntry.index}>
          <DecorativeCanvas kind="experience" label={selectedEntry.index} className="h-full w-full">
            <ExperienceMark index={selectedEntry.index} />
          </DecorativeCanvas>
          <span className={`${styles.rule} ${styles.ruleTop}`} />
          <span className={`${styles.rule} ${styles.ruleBottom}`} />
          <span className={`${styles.rule} ${styles.ruleLeft}`} />
          <span className={`${styles.rule} ${styles.ruleRight}`} />
          {([styles.cornerTopLeft, styles.cornerTopRight, styles.cornerBottomRight, styles.cornerBottomLeft]).map((corner) => <span key={corner} className={`${styles.corner} ${corner}`} aria-hidden="true" />)}
        </div>}
        <div id="experience-current-description" className={styles.description} aria-live="polite">
          {content.entries.map((entry, index) => <p key={entry.id} data-active={selected === index} aria-hidden={selected !== index}>{entry.description}</p>)}
        </div>
        <div className={`${styles.list} ${styles.right}`}>
          {content.entries.slice(split).map((entry, index) => renderRow(entry, index + split))}
        </div>
      </div>
    </section>
  );
}
