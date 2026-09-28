import { SectionPlaceholder } from "@/components/portfolio-shell";
import { HeaderNavigation } from "@/components/header-navigation";
import { ContactFooter } from "@/components/contact-footer";
import { IdentityHero } from "@/components/identity-hero";
import { ManifestoScene } from "@/components/manifesto-scene";
import { StatisticsTools } from "@/components/statistics-tools";
import { Experience } from "@/components/experience";
import { siteContent } from "@/content/site";

export default function Home() {
  return (
    <>
      <HeaderNavigation />
      <main>
        <IdentityHero />
        <ManifestoScene />
        <StatisticsTools />
        <SectionPlaceholder content={siteContent.sections.projects}>
          <ul className="mt-8 grid gap-6 md:grid-cols-2">
            {siteContent.projects.map((project) => (
              <li key={project.id} className="border border-border p-4">
                <h3 className="font-heading text-xl font-medium uppercase"><a href={project.href}>{project.title}</a></h3>
                <p className="text-sm leading-[1.6] text-muted-foreground">{project.description}</p>
              </li>
            ))}
          </ul>
        </SectionPlaceholder>
        <Experience />
      </main>
      <ContactFooter />
    </>
  );
}
