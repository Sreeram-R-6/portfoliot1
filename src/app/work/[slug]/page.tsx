import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { siteContent } from "@/content/site";
import { WorkDetail } from "@/components/work-pages";

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() {
  return siteContent.projects.map((project) => ({ slug: project.id }));
}

async function getProject(params: Props["params"]) {
  const { slug } = await params;
  const project = siteContent.projects.find((entry) => entry.id === slug);
  if (!project) notFound();
  return project;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = await getProject(params);
  const title = `${project.title} | ${siteContent.name}`;
  const description = project.summary && !/^TODO\b/i.test(project.summary) ? project.summary : project.description;
  const url = `/work/${encodeURIComponent(project.id)}`;
  return {
    title, description,
    alternates: { canonical: url },
    openGraph: { title, description, url, images: ["/seo/og.png"] },
    twitter: { title, description, images: ["/seo/og.png"] },
  };
}

export default async function ProjectPage({ params }: Props) {
  return <WorkDetail site={siteContent} project={await getProject(params)} />;
}
