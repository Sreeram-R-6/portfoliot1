import type { Metadata } from "next";

export const metadata: Metadata = { title: "Site details (local editor)", robots: { index: false, follow: false } };

export default function DetailsPage() {
  return <main style={{ minHeight: "100dvh", padding: "4rem 2rem", background: "#000", color: "#fff" }}><h1>Site details</h1><p>This local editor is unavailable on the static GitHub Pages site.</p></main>;
}
