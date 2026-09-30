import { notFound } from "next/navigation";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { PortfolioPage } from "@/components/portfolio-page";
import { WorkIndex, WorkDetail } from "@/components/work-pages";
import { publicContent, type SiteContent } from "@/content/site";
import { isSiteContent } from "@/content/details-schema";

export const metadata = { robots: { index: false, follow: false } };

export function generateStaticParams() {
  return ["maximum", "twenty", "three", "empty"].map((scenario) => ({ scenario }));
}

export default async function StressPage({ params, searchParams }: { params: Promise<{ scenario: string }>; searchParams: Promise<{ view?: string }> }) {
  if (process.env.NODE_ENV === "production") notFound();
  const { scenario } = await params;
  if (!["maximum", "twenty", "three", "empty"].includes(scenario)) notFound();
  const fixtures = JSON.parse(await readFile(resolve(process.cwd(), "src/content/__fixtures__/stress.json"), "utf8")) as Record<string, unknown>;
  const content = fixtures[scenario];
  if (!isSiteContent(content)) throw new Error("Invalid stress fixture.");
  const site = publicContent(content as SiteContent);
  const { view } = await searchParams;
  if (view === "work") return <WorkIndex site={site} />;
  if (view === "detail" && site.projects[0]) return <WorkDetail site={site} project={site.projects[0]} />;
  return <PortfolioPage site={site} />;
}
