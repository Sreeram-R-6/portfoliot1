"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import type { PublicSiteContent } from "@/content/site";
import { HeaderNavigation } from "./header-navigation";
import { ContactFooter } from "./contact-footer";
import { SmoothScrollProvider } from "./smooth-scroll-provider";
import { ProjectPoster, projectSummary } from "./project-showcase";
import "./work-pages.css";

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

function Artwork({ project, image = project.image }: { project: Project; image?: string | null }) {
  return <div className="work-artwork">
    {meaningful(image) ? (
      // User-supplied files are also supported without requiring remote image config.
      // eslint-disable-next-line @next/next/no-img-element
      <img src={image} alt={project.title} loading="lazy" decoding="async" />
    ) : <ProjectPoster id={project.id} />}
  </div>;
}

export function WorkIndex({ site }: { site: PublicSiteContent }) {
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
        {site.projects.map((project) => <article key={project.id} className="work-card">
          <Link className="work-card-art" href={`/work/${encodeURIComponent(project.id)}`} scroll={false} aria-labelledby={`work-${project.id}-title`}>
            <Artwork project={project} />
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
      <Artwork project={project} />
      <div className="work-description"><p className="work-copy">{project.description}</p>
        {paragraphs.map((paragraph, index) => <p className="work-copy" key={index}>{paragraph}</p>)}
        {/^https?:\/\//i.test(project.href) && <a className="work-link" href={project.href} target="_blank" rel="noopener noreferrer">{site.sections.projects.viewLabel}<span aria-hidden="true">↗</span></a>}
      </div>
      {!!gallery.length && <div className="work-gallery" aria-label={`${project.title} gallery`}>{gallery.map((image, index) => <Artwork key={`${index}-${image}`} project={project} image={image} />)}</div>}
    </article>
  </WorkChrome>;
}
