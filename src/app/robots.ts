import type { MetadataRoute } from "next";
import { siteContent } from "@/content/site";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/details", "/api/details", "/qa-stress"] },
    sitemap: `${siteContent.metadata.siteUrl}/sitemap.xml`,
  };
}
