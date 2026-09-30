import type { NextConfig } from "next";

const pagesExport = process.env.GITHUB_PAGES === "1";

const nextConfig: NextConfig = {
  output: pagesExport ? "export" : "standalone",
  trailingSlash: pagesExport,
  images: { unoptimized: pagesExport },
  ...(!pagesExport ? {
    outputFileTracingExcludes: { "/*": ["./src/content/__fixtures__/**"] },
    async headers() {
      return ["/details/:path*", "/qa-stress/:path*"].map((source) => ({ source, headers: [{ key: "X-Robots-Tag", value: "noindex" }] }));
    },
  } : {}),
};

export default nextConfig;
