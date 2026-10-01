import { CodeXml, Cpu, RadioTower, Globe } from "lucide-react";
import { siteContent, type PublicSiteContent } from "@/content/site";
import { DecorativeCanvas } from "./decorative-canvas";
import styles from "./statistics-tools.module.css";
import { StatisticsMotion } from "./statistics-motion";
import { DigitCounter } from "./digit-counter";
import { GlyphPoster } from "./glyph-poster";

function ToolMark({ variant, hover = false }: { variant: number; hover?: boolean }) {
  const Icon = [CodeXml, Cpu, RadioTower, Globe][variant];
  return <Icon aria-hidden="true" className={styles.toolMark} strokeWidth={hover ? 2.5 : 1.5} />;
}

const glyphVariants = ["hex", "orbit", "cross", "bracket", "signal"] as const;

export function StatisticsTools({ site = siteContent }: { site?: PublicSiteContent }) {
  const content = site.sections.statistics;

  return (
    <section id={content.id} data-section="statistics" className={styles.stage} aria-labelledby="statistics-title">
      <h2 id="statistics-title" className={styles.heading}>{content.title}</h2>
      <p className={styles.description}>{content.description}</p>
      <div className={styles.canvas} data-stat-canvas>
        <div className={styles.grid}>
          {content.counters.map((counter, index) => (
            <div key={`${index}-${counter.label}`} data-stat-box className={styles.box}>
              <span aria-hidden="true" className={styles.boxBackground} />
              <span aria-hidden="true" data-stat-notch className={styles.notch} />
              <span className={styles.boxGlyph}><GlyphPoster variant={glyphVariants[index % glyphVariants.length]} className={styles.boxGlyphPoster} /></span>
              <p className={styles.label} data-stat-label id={`statistics-counter-${index}`}>{counter.label}</p>
              <p className={styles.value} aria-labelledby={`statistics-counter-${index}`}>
                <span className="sr-only">{counter.value}</span>
                <DigitCounter value={counter.value} />
              </p>
            </div>
          ))}
          {content.tools.map((tool, index) => (
            <div key={`${index}-${tool}`} data-stat-box className={styles.box}>
              <span aria-hidden="true" className={styles.boxBackground} />
              <span aria-hidden="true" data-stat-notch className={styles.notch} />
              <span className={styles.boxGlyph}><GlyphPoster variant={glyphVariants[(index + content.counters.length) % glyphVariants.length]} className={styles.boxGlyphPoster} /></span>
              <p className={styles.label} data-stat-label>{tool}</p>
              <span className={styles.toolPair} aria-hidden="true">
                <span className={styles.toolDefault}><ToolMark variant={index % 4} /></span>
                <span className={styles.toolHover}><ToolMark variant={index % 4} hover /></span>
              </span>
            </div>
          ))}
          <div className={styles.glyphFrame} aria-hidden="true" data-statistics-glyph>
            <DecorativeCanvas kind="glyph" className="h-full w-full">
              <div className="flex h-full w-full items-center justify-center">
            <svg viewBox="0 0 160 160" fill="none" className={styles.glyphPoster}>
              <path d="m80 14 56 32v64l-56 32-56-32V46Z" fill="currentColor" fillOpacity=".13" stroke="currentColor" strokeWidth="7" />
              <path d="m24 46 56 32 56-32M80 78v64M52 30l56 32v64" stroke="currentColor" strokeWidth="7" />
            </svg>
              </div>
            </DecorativeCanvas>
          </div>
        </div>
      </div>
      <StatisticsMotion />
    </section>
  );
}
