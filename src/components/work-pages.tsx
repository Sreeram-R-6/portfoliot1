"use client";
import { ProjectImage } from "./project-image";

import Link from "next/link";
import { useSyncExternalStore, type ReactNode } from "react";
import type { PublicSiteContent } from "@/content/site";
import { HeaderNavigation } from "./header-navigation";
import { ContactFooter } from "./contact-footer";
import { SmoothScrollProvider } from "./smooth-scroll-provider";
import { ProjectPoster, projectSummary } from "./project-showcase";
import "./work-pages.css";

// These slot widths follow work-pages.css, including grid gaps and max widths.
const cardSizes = "(min-width: 1920px) 426px, (min-width: 1025px) calc(24.895vw - 52.56px), (min-width: 768px) calc(50vw - 52px), calc(100vw - 32px)";
const detailSizes = "(min-width: 1440px) 1376px, (min-width: 768px) calc(100vw - 64px), calc(100vw - 32px)";
const gallerySizes = "(min-width: 1440px) 676px, (min-width: 768px) calc(50vw - 44px), calc(100vw - 32px)";

type Project = PublicSiteContent["projects"][number];
function meaningful(value: string | null | undefined): value is string {
  return typeof value === "string" && !!value.trim() && !/^TODO\b/i.test(value.trim());
}

function WorkChrome({ site, children }: { site: PublicSiteContent; children: ReactNode }) {
  return <SmoothScrollProvider>
    <a href="#main-content" className="skip-link">{site.navigation.skip}</a>
    <HeaderNavigation site={site} />
    <main id="main-content" tabIndex={-1} className="work-main">{children}</main>
    <ContactFooter site={site} />
  </SmoothScrollProvider>;
}

function Artwork({ project, image = project.image, eager = false, sizes = cardSizes }: { project: Project; image?: string | null; eager?: boolean; sizes?: string }) {
  return <div className="work-artwork">
    {meaningful(image) ? (
      <ProjectImage src={image} alt={project.title} eager={eager} sizes={sizes} />
    ) : <ProjectPoster id={project.id} />}
  </div>;
}


function subscribeColumns(notify: () => void) {
  const queries = [matchMedia("(min-width: 768px)"), matchMedia("(min-width: 1025px)")];
  queries.forEach((query) => query.addEventListener("change", notify));
  return () => queries.forEach((query) => query.removeEventListener("change", notify));
}
const readColumns = () => matchMedia("(min-width: 1025px)").matches ? 3 : matchMedia("(min-width: 768px)").matches ? 2 : 1;
// First paint can precede hydration. Cover every first-row LCP candidate in
// initial HTML, then narrow priority to the measured grid after hydration.
const serverColumns = () => 3;

export function WorkIndex({ site }: { site: PublicSiteContent }) {
  const columns = useSyncExternalStore(subscribeColumns, readColumns, serverColumns);
  // Repeated cards sharing a first-row asset reuse its one eager request. This
  // also keeps Next's development LCP registry from reclassifying that URL lazy.
  const eagerImages = new Set(site.projects.slice(0, columns).map((project) => project.image));
  const section = site.sections.projects;
  return <WorkChrome site={site}>
    <div className="work-index">
      <header className="work-sidebar">
        <p className="work-eyebrow">{section.eyebrow}</p>
        <h1>{section.title}</h1>
        <p className="work-copy">{section.description}</p>
        <span className="work-count" aria-label={`${section.title}: ${site.projects.length}`}>{String(site.projects.length).padStart(2, "0")}</span>
      </header>
      <div className="work-grid">
        {site.projects.map((project, index) => <article key={project.id} className="work-card">
          <Link className="work-card-art" href={`/work/${encodeURIComponent(project.id)}`} scroll={false} aria-labelledby={`work-${project.id}-title`}>
            <Artwork project={project} eager={index < columns || (!!project.image && eagerImages.has(project.image))} />
            <span className="work-card-tag">{section.cardTag}</span>
          </Link>
          <h2 id={`work-${project.id}-title`}><Link href={`/work/${encodeURIComponent(project.id)}`} scroll={false}>{project.title}</Link></h2>
          <p className="work-copy">{meaningful(project.summary) ? project.summary : projectSummary(project.description)}</p>
          <Link className="work-link" href={`/work/${encodeURIComponent(project.id)}`} scroll={false}>{section.viewLabel}<span aria-hidden="true">↗</span></Link>
        </article>)}
      </div>
    </div>
  </WorkChrome>;
}

export function WorkDetail({ site, project }: { site: PublicSiteContent; project: Project }) {
  const tags = project.tags?.filter(meaningful) ?? [];
  const paragraphs = project.caseStudy?.filter(meaningful) ?? [];
  const gallery = project.gallery?.filter(meaningful) ?? [];
  return <WorkChrome site={site}>
    <article className="work-detail">
      <Link className="work-link" href="/work" scroll={false}><span aria-hidden="true">←</span>{site.sections.projects.title}</Link>
      <header className="work-detail-header">
        <p className="work-eyebrow">{site.sections.projects.cardTag}</p>
        <h1>{project.title}</h1>
        {(meaningful(project.role) || meaningful(project.year)) && <dl className="work-facts">
          {meaningful(project.role) && <div><dt>Role</dt><dd>{project.role}</dd></div>}
          {meaningful(project.year) && <div><dt>Year</dt><dd>{project.year}</dd></div>}
        </dl>}
        {!!tags.length && <ul className="work-tags" aria-label={`${project.title} tags`}>{tags.map((tag, index) => <li key={`${index}-${tag}`}>{tag}</li>)}</ul>}
      </header>
      <Artwork project={project} eager sizes={detailSizes} />
      <div className="work-description"><p className="work-copy">{project.description}</p>
        {paragraphs.map((paragraph, index) => <p className="work-copy" key={index}>{paragraph}</p>)}
        {/^https?:\/\//i.test(project.href) && <a className="work-link" href={project.href} target="_blank" rel="noopener noreferrer">{site.sections.projects.viewLabel}<span aria-hidden="true">↗</span></a>}
      </div>
      {!!gallery.length && <div className="work-gallery" aria-label={`${project.title} gallery`}>{gallery.map((image, index) => <Artwork key={`${index}-${image}`} project={project} image={image} sizes={gallerySizes} />)}</div>}
    </article>
  </WorkChrome>;
}
