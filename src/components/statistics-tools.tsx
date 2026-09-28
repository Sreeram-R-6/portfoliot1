import { siteContent, type PublicSiteContent } from "@/content/site";
import { DecorativeCanvas } from "./decorative-canvas";
import styles from "./statistics-tools.module.css";
import { StatisticsMotion } from "./statistics-motion";
import { DigitCounter } from "./digit-counter";

function ToolMark({ variant }: { variant: number }) {
  return (
    <svg viewBox="0 0 85 85" fill="none" aria-hidden="true" className={styles.toolMark}>
      <g stroke="currentColor" strokeWidth="5" strokeLinecap="square">
        {variant === 0 && <><path d="M15 25 42 10 70 25v35L42 75 15 60Z" /><path d="m15 25 27 16 28-16M42 41v34" /></>}
        {variant === 1 && <><path d="m30 18-21 24 21 25M55 18l21 24-21 25M48 10 37 75" /></>}
        {variant === 2 && <><rect x="22" y="22" width="41" height="41" /><path d="M32 8v14M53 8v14M32 63v14M53 63v14M8 32h14M8 53h14M63 32h14M63 53h14" /></>}
        {variant === 3 && <><circle cx="42.5" cy="42.5" r="12" /><circle cx="42.5" cy="42.5" r="31" /><path d="M42.5 3v14M42.5 68v14M3 42.5h14M68 42.5h14" /></>}
      </g>
    </svg>
  );
}

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
              <p className={styles.label} data-stat-label>{tool}</p>
              <ToolMark variant={index % 4} />
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
