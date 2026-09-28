import { siteContent } from "@/content/site";
import { ProjectCanvasBoundary } from "./project-canvas-boundary";
import styles from "./project-showcase.module.css";

function Arrow() {
  return <svg aria-hidden="true" viewBox="0 0 16 16" width="14" height="14" fill="none"><path d="M3 13 13 3M3 3h10v10" stroke="currentColor" strokeWidth="1.5" /></svg>;
}

function ProjectPoster({ variant }: { variant: number }) {
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
  return (
    <section id={content.id} data-section={content.id} className={styles.stage} aria-labelledby="projects-heading">
      <div className={styles.measurementGrid} aria-hidden="true">
        {Array.from({ length: 6 }, (_, index) => <i key={index} data-project-grid-line />)}
      </div>
      <div className={styles.intro} data-project-intro>
        <div className={styles.heading}>
          <div className={styles.headingTop}>
            <span className={styles.eyebrow}>{content.eyebrow}</span>
            <h2 id="projects-heading" className={styles.title}>{content.title}</h2>
          </div>
          <p className={styles.description}>{content.description}</p>
        </div>
        <div className={styles.ctaWrap}>
          <a href={content.moreWork.href} className={styles.cta}><span className={styles.ctaCorners} aria-hidden="true" />{content.moreWork.label}<Arrow /></a>
        </div>
      </div>
      <div className={styles.viewport} data-project-viewport>
        <div className={styles.track} data-project-track>
          {siteContent.projects.map((project, index) => (
            <article key={project.id} data-project-card className={styles.card}>
              <a className={styles.thumb} href={project.href} aria-labelledby={`${project.id}-title`} aria-describedby={`${project.id}-description`} data-project-thumb>
                <div className={styles.frame}><ProjectPoster variant={index} /></div>
                <span className={styles.tag}>{content.cardTag}</span>
                {Array.from({ length: 4 }, (_, corner) => <span key={corner} aria-hidden="true" className={`${styles.plus} ${styles[`corner${corner}`]}`} />)}
              </a>
              <div className={styles.label}>
                <h3 id={`${project.id}-title`} className={styles.cardTitle}><a href={project.href}>{project.title}</a></h3>
                <a className={styles.visit} href={project.href} aria-labelledby={`${project.id}-title`}><span>{content.viewLabel}</span><Arrow /></a>
              </div>
              <p id={`${project.id}-description`} className="sr-only">{project.description}</p>
            </article>
          ))}
        </div>
      </div>
      <ProjectCanvasBoundary />
    </section>
  );
}
