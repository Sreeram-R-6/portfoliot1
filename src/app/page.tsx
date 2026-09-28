import { FooterSkeleton, HeaderSkeleton, SectionPlaceholder } from "@/components/portfolio-shell";
import { siteContent } from "@/content/site";

export default function Home() {
  return (
    <>
      <HeaderSkeleton />
      <main>
        <SectionPlaceholder content={siteContent.sections.identity} />
        <SectionPlaceholder content={siteContent.sections.manifesto} />
        <SectionPlaceholder content={siteContent.sections.statistics} />
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
        <SectionPlaceholder content={siteContent.sections.experience} />
      </main>
      <FooterSkeleton />
    </>
  );
}
