import type { MetadataRoute } from "next";
import { siteContent } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteContent.metadata.siteUrl.replace(/\/$/, "");
  return [
    { url: base, changeFrequency: "monthly", priority: 1 },
    { url: `${base}/work`, changeFrequency: "monthly", priority: .9 },
    ...siteContent.projects.map((project) => ({ url: `${base}/work/${project.id}`, changeFrequency: "monthly" as const, priority: .7 })),
  ];
}
