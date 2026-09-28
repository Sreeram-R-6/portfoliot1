import type { ReactNode } from "react";
import { siteContent, type SectionContent } from "@/content/site";

export function HeaderSkeleton() {
  return (
    <header data-section="header-navigation" className="sticky top-0 z-50 bg-background">
      <nav aria-label={siteContent.navigation.label} className="flex items-center justify-between px-4 py-5 sm:px-8">
        <a href={siteContent.navigation.home.href} className="font-heading text-sm font-semibold uppercase">
          {siteContent.navigation.home.label}
        </a>
        <span className="hidden font-heading text-xs uppercase tracking-[0.0975rem] text-muted-foreground sm:block">
          {siteContent.location}
        </span>
        <details className="relative font-heading uppercase">
          <summary className="cursor-pointer text-sm font-semibold">{siteContent.navigation.menu}</summary>
          <ul className="absolute right-0 z-50 flex flex-col gap-4 border border-border bg-card p-4">
            {siteContent.navigation.links.map((link) => (
              <li key={link.label}><a href={link.href}>{link.label}</a></li>
            ))}
          </ul>
        </details>
      </nav>
    </header>
  );
}

export function SectionPlaceholder({ content, children }: { content: SectionContent; children?: ReactNode }) {
  return (
    <section id={content.id} data-section={content.id} aria-labelledby={`${content.id}-title`} className="section-placeholder">
      <p className="font-heading text-xs font-semibold uppercase tracking-[0.0975rem] text-primary">{content.eyebrow}</p>
      {content.id === "identity" ? (
        <h1 id={`${content.id}-title`} className="placeholder-title">{content.title}</h1>
      ) : (
        <h2 id={`${content.id}-title`} className="placeholder-title">{content.title}</h2>
      )}
      <p className="max-w-prose text-sm leading-[1.6] text-muted-foreground">{content.description}</p>
      {children}
    </section>
  );
}

export function FooterSkeleton() {
  return (
    <footer id={siteContent.footer.id} data-section="footer" className="bg-primary p-4 text-primary-foreground sm:p-8">
      <p className="font-heading text-xs font-semibold uppercase tracking-[0.0975rem]">{siteContent.footer.eyebrow}</p>
      <h2 className="font-heading text-[2.5rem] leading-[0.8] font-semibold uppercase tracking-[-0.04em]">{siteContent.footer.title}</h2>
      <div className="mt-8 flex flex-wrap gap-6 font-heading text-sm uppercase">
        <a href={siteContent.footer.message.href}>{siteContent.footer.message.label}</a>
        <a href={siteContent.footer.cv.href}>{siteContent.footer.cv.label}</a>
        {siteContent.footer.links.map((link) => <a key={link.label} href={link.href}>{link.label}</a>)}
      </div>
      <p className="mt-8 font-heading uppercase">{siteContent.name}</p>
    </footer>
  );
}
