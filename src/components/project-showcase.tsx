"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { siteContent } from "@/content/site";
import { ProjectCanvasBoundary } from "./project-canvas-boundary";
import styles from "./project-showcase.module.css";

function exitMask(progress: number, width: number, height: number, navHeight: number) {
  const columns = 16;
  const rows = Math.max(1, Math.ceil(height / width * columns));
  const cellWidth = width / columns, cellHeight = height / rows;
  const rectangles: string[] = [];
  const coordinate = (value: number) => value.toFixed(1);
  for (let row = 0; row < rows; row++) {
    const closed = Array.from({ length: columns }, (_, column) => {
      const signal = 43758.5453 * Math.sin(12.9898 * column + 78.233 * row);
      const noise = signal - Math.floor(signal);
      return noise + ((columns - 1 - column) / (columns - 1) - noise) * .6 > progress;
    });
    let column = 0;
    while (column < columns) {
      if (!closed[column]) { column++; continue; }
      const left = column * cellWidth;
      while (column < columns && closed[column]) column++;
      const right = column * cellWidth;
      const top = row * cellHeight - navHeight, bottom = (row + 1) * cellHeight - navHeight;
      rectangles.push(`M${coordinate(left)} ${coordinate(top)}H${coordinate(right)}V${coordinate(bottom)}H${coordinate(left)}Z`);
    }
  }
  return `path('${rectangles.join("") || "M0 0Z"}')`;
}

function Arrow() {
  return <svg aria-hidden="true" viewBox="0 0 16 16" width="14" height="14" fill="none"><path d="M3 13 13 3M3 3h10v10" stroke="currentColor" strokeWidth="1.5" /></svg>;
}

function ProjectPoster({ id }: { id: string }) {
  const seed = [...id].reduce((value, character) => (value * 31 + character.charCodeAt(0)) >>> 0, 0);
  const variant = seed % 5;
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 540" preserveAspectRatio="xMidYMid slice" data-project-poster aria-hidden="true" className={styles.poster}>
      <rect width="720" height="540" fill={variant % 2 ? "#25212f" : "#15291b"} />
      <g stroke={variant % 2 ? "#453952" : "#2e4936"} strokeWidth="1" fill="none">
        {[90, 180, 270, 360, 450, 540, 630].map((x) => <path key={`x-${x}`} d={`M${x} 0V540`} />)}
        {[90, 180, 270, 360, 450].map((y) => <path key={`y-${y}`} d={`M0 ${y}H720`} />)}
      </g>
      {variant === 0 && <g fill="none" stroke="#9df133" strokeWidth="5"><path d="M80 380h110l70-165h170l90 115h120" /><path d="M80 420h160l70-165h95l90 115h145" opacity=".3" /><circle cx="260" cy="215" r="19" fill="#15291b" /><circle cx="520" cy="330" r="19" fill="#15291b" /><rect x="300" y="140" width="120" height="55" stroke="#9b5cff" /></g>}
      {variant === 1 && <g fill="none" stroke="#9b5cff" strokeWidth="5"><rect x="235" y="145" width="250" height="250" /><rect x="275" y="185" width="170" height="170" stroke="#9df133" /><path d="M235 185H95m140 70H55m180 70H95m390-140h140m-140 70h180m-180 70h140M275 145V65m80 80V25m80 120V65m-160 330v80m80-80v120m80-120v80" /><circle cx="360" cy="270" r="37" stroke="#9df133" /></g>}
      {variant === 2 && <g fill="none" stroke="#9df133" strokeWidth="5"><path d="m360 85 185 100v175L360 455 175 360V185Z" /><path d="m360 85 0 370m-185-270 370 175m0-175L175 360" opacity=".35" /><path d="m360 185 92 50v85l-92 50-92-50v-85Z" stroke="#9b5cff" /><circle cx="360" cy="270" r="24" fill="#9df133" stroke="none" /></g>}
      {variant === 3 && <g fill="none" stroke="#9b5cff" strokeWidth="5"><path d="M130 115h150v150H130ZM440 275h150v150H440Z" /><path d="M280 190h160v160M205 265v85h235" stroke="#9df133" /><circle cx="440" cy="190" r="20" fill="#25212f" stroke="#9df133" /><circle cx="205" cy="350" r="20" fill="#25212f" stroke="#9df133" /><path d="M130 75h150m160 390h150" opacity=".35" /></g>}
      {variant === 4 && <g fill="none" strokeWidth="5"><circle cx="360" cy="270" r="160" stroke="#9df133" /><circle cx="360" cy="270" r="110" stroke="#9df133" opacity=".3" /><path d="M120 270h75l35-75 65 130 70-110 50 55h185" stroke="#9b5cff" /><path d="M360 70v40m0 320v40M160 270h40m320 0h40" stroke="#9df133" /><circle cx="360" cy="270" r="12" fill="#9df133" /></g>}
    </svg>
  );
}

export function ProjectShowcase() {
  const content = siteContent.sections.projects;
  const ref = useRef<HTMLElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  function showDetails(project: (typeof siteContent.projects)[number], opener: HTMLElement) {
    const dialog = dialogRef.current;
    if (!dialog) return;
    openerRef.current = opener;
    dialog.querySelector<HTMLElement>("[data-detail-title]")!.textContent = project.title;
    dialog.querySelector<HTMLElement>("[data-detail-description]")!.textContent = project.description;
    const link = dialog.querySelector<HTMLAnchorElement>("[data-detail-link]")!;
    link.hidden = !/^https?:\/\//i.test(project.href);
    link.href = link.hidden ? "#" : project.href;
    dialog.showModal();
  }
  useEffect(() => {
    const section = ref.current;
    const track = section?.querySelector<HTMLElement>("[data-project-track]");
    const intro = section?.querySelector<HTMLElement>("[data-project-intro]");
    if (!section || !track || !intro) return;
    const cards = [...track.querySelectorAll<HTMLElement>("[data-project-card]")];
    gsap.registerPlugin(ScrollTrigger, ScrambleTextPlugin);
    const media = gsap.matchMedia();
    media.add("(min-width: 1025px) and (prefers-reduced-motion: no-preference)", () => {
      if (!cards.length) return;
      section.dataset.projectLayout = "horizontal";
      // Pin only when the entire heading and tallest card fit. Long copy uses a grid.
      const available = innerHeight - (document.querySelector("nav")?.offsetHeight ?? 76);
      const required = intro.offsetHeight + Math.max(...cards.map((card) => card.offsetHeight)) + 96;
      if (required > available) { delete section.dataset.projectLayout; return; }
      const heading = [...intro.querySelectorAll<HTMLElement>("[data-project-scramble]")];
      const originals = heading.map((element) => element.textContent || "");
      const reveal = gsap.timeline({ paused: true });
      heading.forEach((element, index) => reveal.to(element, { duration: .7, ease: "none", scrambleText: originals[index] }, .18 * index));
      let revealed = false;
      const diamond = section.querySelector<HTMLElement>("[data-project-diamond]");
      let diamondRevealed = false;
      const path = section.querySelector<SVGPathElement>("[data-project-path]");
      let pathLength = 0;
      let pathSamples: number[] = [];
      let distances = { handoff: 0, track: 0, lead: 0, exit: 0, total: 1 };
      const measure = () => {
        const bounds = section.getBoundingClientRect();
        const line = section.querySelectorAll<HTMLElement>("[data-project-grid-line]")[5];
        const edge = line?.getBoundingClientRect().left ?? bounds.right;
        const travel = Math.max(0, (parseFloat(getComputedStyle(track).left) || 0) + track.offsetWidth - (edge - bounds.left));
        const handoff = innerWidth * 1.34 / .94;
        const lead = Math.max(0, edge - .75 * innerWidth);
        const exit = Math.max(innerHeight, .75 * innerWidth);
        distances = { handoff, track: travel, lead, exit, total: handoff + travel + lead + exit + .6 * innerHeight };
        if (path) {
          const cards = [...track.querySelectorAll<HTMLElement>("[data-project-card]")];
          // Measured centers work for every project count.
          const points = cards.map((card) => `${card.offsetLeft + card.offsetWidth / 2},${card.offsetTop + card.offsetHeight / 2}`);
          path.setAttribute("d", points.length ? `M${points.join(" L")}` : "M0 0");
          pathLength = path.getTotalLength();
          pathSamples = Array.from({ length: 721 }, (_, index) => path.getPointAtLength(index / 720 * pathLength).x);
          path.style.strokeDasharray = String(pathLength);
        }
      };
      measure();
      const clamp = gsap.utils.clamp(0, 1);
      const state = { progress: 0 };
      const update = () => {
        const scroll = state.progress * distances.total;
        const entry = clamp((scroll / distances.handoff - .06) / .94);
        const handoff = entry < .5 ? 2 * entry * entry : 1 - 2 * (1 - entry) * (1 - entry);
        const trackProgress = clamp((scroll - distances.handoff) / Math.max(1, distances.track));
        const leadProgress = clamp((scroll - distances.handoff - distances.track) / Math.max(1, distances.lead));
        const exitProgress = clamp((scroll - distances.handoff - distances.track - distances.lead) / distances.exit);
        const x = -(distances.track * trackProgress + distances.lead * leadProgress + .75 * innerWidth * exitProgress);
        const entrance = Math.round((1 - handoff) * innerWidth * 1.34);
        gsap.set(track, { x: entrance + x });
        gsap.set(intro, { x: entrance + x });
        if (diamond && !diamondRevealed) {
          const bounds = diamond.getBoundingClientRect();
          if (bounds.left + bounds.width / 2 <= .75 * innerWidth) {
            diamondRevealed = true;
            gsap.fromTo(diamond, { scale: 0 }, { scale: 1, duration: .35, ease: "power2.out" });
          }
        }
        if (path && pathSamples.length) {
          const localEdge = .75 * innerWidth - track.getBoundingClientRect().left;
          const sample = pathSamples.findIndex((point) => point >= localEdge);
          const fraction = sample < 0 ? 1 : sample / 720;
          path.style.strokeDashoffset = String(pathLength * (1 - fraction));
        }
        section.dataset.projectProgress = String(state.progress);
        section.dataset.handoffProgress = String(handoff);
        section.dataset.projectExit = String(exitProgress);
        const navHeight = parseFloat(getComputedStyle(section).getPropertyValue("--nav-height")) || 76;
        section.style.clipPath = exitProgress > 0 && exitProgress < 1 ? exitMask(exitProgress, innerWidth, innerHeight, navHeight) : "";
        section.style.visibility = exitProgress >= 1 ? "hidden" : "";
        document.querySelector('[data-section="statistics"]')?.dispatchEvent(new CustomEvent("portfolio:handoff", { detail: { progress: handoff } }));
        section.dispatchEvent(new Event("projectmotion"));
        if (handoff >= .3 && !revealed) { revealed = true; reveal.play(0); }
      };
      const motion = gsap.to(state, {
        progress: 1, ease: "none", onUpdate: update,
        scrollTrigger: {
          id: "project-showcase", trigger: section, pin: true,
          scroller: document.getElementById("scroll-container") || undefined,
          start: () => `top ${parseFloat(getComputedStyle(section).getPropertyValue("--nav-height")) || 76}px`,
          end: () => `+=${distances.total}`, scrub: 1, invalidateOnRefresh: true,
          onRefreshInit: measure,
        },
      });
      update();
      const focus = (event: FocusEvent) => {
        reveal.progress(1);
        const card = event.target instanceof Element ? event.target.closest<HTMLElement>("[data-project-card]") : null;
        if (!card || !motion.scrollTrigger) return;
        const right = card.getBoundingClientRect().right;
        const left = card.getBoundingClientRect().left;
        const shift = right > innerWidth ? right - innerWidth : left < 0 ? left : 0;
        if (shift) {
          const target = motion.scrollTrigger.start + distances.total * state.progress + shift;
          (document.getElementById("scroll-container") || window).scrollTo({ top: target, behavior: "instant" });
        }
      };
      section.addEventListener("focusin", focus);
      const cta = section.querySelector<HTMLElement>("[data-project-cta-text]");
      const ctaLink = cta?.closest("a");
      const ctaText = cta?.textContent || "";
      const ctaState = { progress: 0 };
      let ctaTween: gsap.core.Tween | undefined;
      let ctaTarget = 0;
      const revealCta = (target: number) => {
        if (!cta || ctaTarget === target) return;
        ctaTarget = target; ctaTween?.kill();
        ctaTween = gsap.to(ctaState, { progress: target, duration: .7 * Math.abs(target - ctaState.progress), ease: "none", onUpdate: () => { cta.textContent = ctaText.slice(0, Math.round(ctaText.length * ctaState.progress)); } });
      };
      const ctaObserver = new IntersectionObserver(([entry]) => { if (entry.intersectionRatio >= .9) revealCta(1); else if (entry.intersectionRatio <= 0) revealCta(0); }, { threshold: [0, .9] });
      let crossed = false;
      const exitObserver = new IntersectionObserver(([entry]) => { if (entry.intersectionRatio >= .999) { crossed = true; revealCta(1); } else if (crossed) { crossed = false; revealCta(0); } }, { rootMargin: "0px -25% 0px 0px", threshold: 1 });
      if (ctaLink) { ctaObserver.observe(ctaLink); exitObserver.observe(ctaLink); }
      return () => {
        ctaObserver.disconnect(); exitObserver.disconnect(); ctaTween?.kill();
        if (cta) cta.textContent = ctaText;
        section.removeEventListener("focusin", focus);
        heading.forEach((element, index) => { element.textContent = originals[index]; });
        delete section.dataset.projectProgress;
        delete section.dataset.handoffProgress;
        delete section.dataset.projectExit;
        section.style.clipPath = ""; section.style.visibility = "";
        delete section.dataset.projectLayout;
      };
    });
    return () => media.revert();
  }, []);
  return (
    <section ref={ref} id={content.id} data-section={content.id} className={styles.stage} aria-labelledby="projects-heading">
      <div className={styles.measurementGrid} aria-hidden="true">
        {Array.from({ length: 6 }, (_, index) => <i key={index} data-project-grid-line />)}
      </div>
      <div className={styles.intro} data-project-intro>
        <div className={styles.heading}>
          <div className={styles.headingTop}>
            <span className={styles.eyebrow} data-project-scramble>{content.eyebrow}</span>
            <h2 id="projects-heading" className={styles.title} data-project-scramble>{content.title}</h2>
          </div>
          <p className={styles.description} data-project-scramble>{content.description}</p>
        </div>
        <div className={styles.ctaWrap}>
          <a href={content.moreWork.href} className={styles.cta} aria-label={content.moreWork.label}><span className={styles.ctaCorners} aria-hidden="true" /><span data-project-cta-text>{content.moreWork.label}</span><Arrow /></a>
        </div>
      </div>
      <div className={styles.viewport} data-project-viewport>
        <div className={styles.track} data-project-track>
          <svg className={styles.path} aria-hidden="true"><path data-project-path /></svg>
          <span className={styles.diamond} data-project-diamond aria-hidden="true"><i /><b /></span>
          {siteContent.projects.map((project) => (
            <article key={project.id} data-project-card className={styles.card}>
              <button type="button" className={styles.thumb} onClick={(event) => showDetails(project, event.currentTarget)} aria-haspopup="dialog" aria-labelledby={`${project.id}-title`} aria-describedby={`${project.id}-description`} data-project-thumb>
                <div className={styles.frame}>
                  {project.image && !/^TODO\b/i.test(project.image) ? (
                    // Native images also feed the existing canvas texture loader.
                    // eslint-disable-next-line @next/next/no-img-element
                    <img data-project-image className={styles.poster} src={project.image} alt="" />
                  ) : <ProjectPoster id={project.id} />}
                </div>
                <span className={styles.tag}>{content.cardTag}</span>
                {Array.from({ length: 4 }, (_, corner) => <span key={corner} aria-hidden="true" className={`${styles.plus} ${styles[`corner${corner}`]}`} />)}
              </button>
              <div className={styles.label}>
                <h3 id={`${project.id}-title`} className={styles.cardTitle}>{project.title}</h3>
                {/^https?:\/\//i.test(project.href) ? <a className={styles.visit} href={project.href} target="_blank" rel="noopener noreferrer"><span>{content.viewLabel}</span><Arrow /></a> : <button type="button" className={styles.visit} onClick={(event) => showDetails(project, event.currentTarget)} aria-haspopup="dialog"><span>{content.viewLabel}</span><Arrow /></button>}
              </div>
              <p id={`${project.id}-description`} className={styles.summary}>{project.summary && !/^TODO\b/i.test(project.summary) ? project.summary : projectSummary(project.description)}</p>
            </article>
          ))}
        </div>
      </div>
      {!!siteContent.projects.length && <ProjectCanvasBoundary />}
      <dialog ref={dialogRef} className={styles.details} aria-labelledby="project-detail-title" data-lenis-prevent onClose={() => openerRef.current?.focus()} onKeyDown={(event) => {
        if (event.key !== "Tab") return;
        const controls = [...event.currentTarget.querySelectorAll<HTMLElement>('button:not(:disabled), a[href]:not([hidden])')];
        const first = controls[0], last = controls.at(-1);
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
      }}>
        <div className={styles.detailsHeader}><h2 id="project-detail-title" data-detail-title /><button type="button" autoFocus onClick={() => dialogRef.current?.close()}>Close</button></div>
        <p data-detail-description className={styles.fullDescription} />
        <a data-detail-link href="#" target="_blank" rel="noopener noreferrer" className={styles.visit}>{content.viewLabel}<Arrow /></a>
      </dialog>
    </section>
  );
}

export function projectSummary(description: string) {
  const sentence = description.match(/^.*?[.!?](?:\s|$)/)?.[0].trim() || description;
  if (sentence.length <= 140) return sentence;
  const prefix = sentence.slice(0, 139);
  const boundary = prefix.lastIndexOf(" ");
  return `${prefix.slice(0, boundary > 0 ? boundary : 139).trimEnd()}…`;
}
