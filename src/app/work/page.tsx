import type { Metadata } from "next";
import { siteContent } from "@/content/site";
import { WorkIndex } from "@/components/work-pages";

const section = siteContent.sections.projects;
export const metadata: Metadata = {
  title: `${section.title} | ${siteContent.name}`,
  description: section.description,
  alternates: { canonical: "/work" },
  openGraph: { title: `${section.title} | ${siteContent.name}`, description: section.description, url: "/work", images: ["/seo/og.png"] },
  twitter: { title: `${section.title} | ${siteContent.name}`, description: section.description, images: ["/seo/og.png"] },
};

export default function WorkPage() {
  return <WorkIndex site={siteContent} />;
}
