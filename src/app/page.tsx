import { HeaderNavigation } from "@/components/header-navigation";
import { ContactFooter } from "@/components/contact-footer";
import { IdentityHero } from "@/components/identity-hero";
import { ManifestoScene } from "@/components/manifesto-scene";
import { StatisticsTools } from "@/components/statistics-tools";
import { Experience } from "@/components/experience";
import { ProjectShowcase } from "@/components/project-showcase";
import { HeroMotion } from "@/components/hero-motion";
import { FooterMotion } from "@/components/footer-motion";
import { siteContent } from "@/content/site";

export default function Home() {
  return (
    <>
      <a href="#main-content" className="skip-link">{siteContent.navigation.skip}</a>
      <HeaderNavigation />
      <main id="main-content" tabIndex={-1}>
        <HeroMotion>
          <IdentityHero />
          <ManifestoScene />
        </HeroMotion>
        <StatisticsTools />
        <ProjectShowcase />
        <Experience />
      </main>
      <FooterMotion><ContactFooter /></FooterMotion>
    </>
  );
}
