import { siteContent } from "@/content/site";
import { DecorativeCanvas } from "./decorative-canvas";
import "./identity-hero.css";

/** An original geometric poster, used instead of a third-party portrait. */
export function IdentityPoster({ idPrefix = "identity-poster" }: { idPrefix?: string }) {
  return (
    <svg viewBox="0 0 800 900" preserveAspectRatio="xMidYMid slice" className="identity-poster" aria-hidden="true">
      <defs>
        <linearGradient id={`${idPrefix}-light`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#747785" />
          <stop offset="0.55" stopColor="#292a33" />
          <stop offset="1" stopColor="#09090d" />
        </linearGradient>
        <pattern id={`${idPrefix}-grid`} width="10" height="10" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1" fill="#9df133" opacity="0.18" />
        </pattern>
      </defs>
      <path d="M90 900 165 640 310 565 480 565 635 655 730 900Z" fill={`url(#${idPrefix}-light)`} />
      <path d="m325 520-10 80 75 55 75-55-12-80Z" fill="#30313a" />
      <ellipse cx="392" cy="351" rx="133" ry="188" fill={`url(#${idPrefix}-light)`} />
      <path d="m263 336 18-122 105-63 105 46 30 116-69-98-99 8Z" fill="#14151c" />
      <path d="m392 298 0 168 40-22-35-32Z" fill="#111218" opacity="0.7" />
      <path d="M90 900 165 640 310 565 480 565 635 655 730 900Z" fill={`url(#${idPrefix}-grid)`} />
      <ellipse cx="392" cy="351" rx="133" ry="188" fill={`url(#${idPrefix}-grid)`} />
    </svg>
  );
}

export function IdentityHero() {
  const identity = siteContent.sections.identity;

  return (
    <section id={identity.id} data-section="identity" className="identity-hero" aria-labelledby="identity-title">
      <div className="identity-scene">
        <div className="identity-grid" aria-hidden="true"><i /><i /><i /><i /><i /><i /></div>
        <div className="identity-portrait-frame" data-portrait-frame>
          <DecorativeCanvas kind="portrait" className="identity-canvas-area"><IdentityPoster /></DecorativeCanvas>
        </div>
        <h1 id="identity-title" className="sr-only">{identity.title}</h1>
        <div className="identity-contact" data-reveal>
          <div className="identity-contact-bar" />
          <div className="identity-contact-stack">
            <a href={siteContent.footer.message.href}>{siteContent.footer.message.label}<span aria-hidden="true">↗</span></a>
            <a href={siteContent.footer.cv.href}>{siteContent.footer.cv.label}<span aria-hidden="true">↗</span></a>
          </div>
        </div>
        <p className="identity-introduction" data-reveal>{identity.description}</p>
        <div className="identity-region" aria-hidden="true" data-reveal>{identity.region}</div>
        <div className="identity-bottom-cluster">
          <p className="identity-badge" data-reveal>{identity.badge}</p>
          <p className="identity-location" data-reveal>{identity.locationLabel}</p>
          <div className="identity-name identity-name-first" aria-hidden="true" data-reveal>{identity.displayLines[0]}</div>
          <div className="identity-name identity-name-second" aria-hidden="true" data-reveal>{identity.displayLines[1]}</div>
        </div>
        <div className="identity-scroll-cue" aria-hidden="true">
          <span>{identity.scrollLabel}</span>
          <svg viewBox="0 0 8 24" fill="none"><path d="M4 0v20m-3-3 3 3 3-3" stroke="currentColor" /></svg>
        </div>
      </div>
    </section>
  );
}
