import { siteContent } from "@/content/site";
import { LazyPixelReveal } from "./lazy-pixel-reveal";
import { IdentityPoster } from "./identity-hero";
import "./manifesto-scene.css";

export function ManifestoScene() {
  const manifesto = siteContent.sections.manifesto;

  return (
    <section
      id={manifesto.id}
      data-section="manifesto"
      className="manifesto-scene"
      aria-labelledby="manifesto-title"
    >
      <div className="manifesto-portrait" aria-hidden="true"><IdentityPoster idPrefix="manifesto-poster" /></div>
      <LazyPixelReveal />
      <h2 id="manifesto-title" className="sr-only">{manifesto.title}</h2>
      <p className="manifesto-paragraph" aria-label={manifesto.description} data-reveal>
        {manifesto.description.split(/\s+/).map((word, index) => (
          <span key={`${index}-${word}`} data-word={index} aria-hidden="true">{word}{" "}</span>
        ))}
      </p>
      <div className="manifesto-display" aria-hidden="true">
        {manifesto.displayWords.map((word, index) => (
          <p key={word} className={`manifesto-word manifesto-word-${index + 1}`} data-reveal>{word}</p>
        ))}
      </div>
      <div className="manifesto-arrow-frame" aria-hidden="true">
        <svg viewBox="0 0 41 41" className="manifesto-arrow" fill="none">
          <path d="M4 20.5h31M22 7.5l13 13-13 13" stroke="currentColor" strokeWidth="2" />
        </svg>
      </div>
    </section>
  );
}
