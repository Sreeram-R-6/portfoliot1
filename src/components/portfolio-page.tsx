import { HeaderNavigation } from "./header-navigation";
import { ContactFooter } from "./contact-footer";
import { IdentityHero } from "./identity-hero";
import { ManifestoScene } from "./manifesto-scene";
import { StatisticsTools } from "./statistics-tools";
import { Experience } from "./experience";
import { ProjectShowcase } from "./project-showcase";
import { HeroMotion } from "./hero-motion";
import { FooterMotion } from "./footer-motion";
import { siteContent, type PublicSiteContent } from "@/content/site";
import { SmoothScrollProvider } from "./smooth-scroll-provider";

export function PortfolioPage({ site = siteContent }: { site?: PublicSiteContent }) {
  return <SmoothScrollProvider>
    <a href="#main-content" className="skip-link">{site.navigation.skip}</a>
    <HeaderNavigation site={site} />
    <main id="main-content" tabIndex={-1}>
      <HeroMotion><IdentityHero site={site} /><ManifestoScene site={site} /></HeroMotion>
      <div className="statistics-projects">
        <StatisticsTools site={site} />
        <ProjectShowcase site={site} />
      </div>
      <Experience site={site} />
    </main>
    <FooterMotion><ContactFooter site={site} /></FooterMotion>
  </SmoothScrollProvider>;
}
