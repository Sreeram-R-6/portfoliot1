import { HeaderNavigation } from "@/components/header-navigation";
import { ContactFooter } from "@/components/contact-footer";
import { IdentityHero } from "@/components/identity-hero";
import { ManifestoScene } from "@/components/manifesto-scene";
import { StatisticsTools } from "@/components/statistics-tools";
import { Experience } from "@/components/experience";
import { ProjectShowcase } from "@/components/project-showcase";
import { HeroMotion } from "@/components/hero-motion";

export default function Home() {
  return (
    <>
      <HeaderNavigation />
      <main>
        <HeroMotion>
          <IdentityHero />
          <ManifestoScene />
        </HeroMotion>
        <StatisticsTools />
        <ProjectShowcase />
        <Experience />
      </main>
      <ContactFooter />
    </>
  );
}
