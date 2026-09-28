import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  outputFileTracingExcludes: { "/*": ["./src/content/__fixtures__/**"] },
  async headers() {
    return ["/details/:path*", "/qa-stress/:path*"].map((source) => ({ source, headers: [{ key: "X-Robots-Tag", value: "noindex" }] }));
  },
};

export default nextConfig;
