import { notFound } from "next/navigation";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { PortfolioPage } from "@/components/portfolio-page";
import { publicContent, type SiteContent } from "@/content/site";
import { isSiteContent } from "@/content/details-schema";

export const metadata = { robots: { index: false, follow: false } };

export default async function StressPage({ params }: { params: Promise<{ scenario: string }> }) {
  if (process.env.NODE_ENV === "production") notFound();
  const { scenario } = await params;
  if (!["maximum", "twenty", "three", "empty"].includes(scenario)) notFound();
  const fixtures = JSON.parse(await readFile(resolve(process.cwd(), "src/content/__fixtures__/stress.json"), "utf8")) as Record<string, unknown>;
  const content = fixtures[scenario];
  if (!isSiteContent(content)) throw new Error("Invalid stress fixture.");
  return <PortfolioPage site={publicContent(content as SiteContent)} />;
}
