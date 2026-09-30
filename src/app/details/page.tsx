import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DetailsEditor } from "@/components/details-editor";
import { readDetails } from "@/lib/details-store";

export const metadata: Metadata = { title: "Site details (local editor)", robots: { index: false, follow: false } };

export default async function DetailsPage() {
  if (process.env.NODE_ENV === "production") {
    if (process.env.GITHUB_PAGES === "1") {
      return <main style={{ minHeight: "100dvh", padding: "4rem 2rem", background: "#000", color: "#fff" }}><h1>Site details</h1><p>This local editor is unavailable on the static GitHub Pages site.</p></main>;
    }
    notFound();
  }
  return <DetailsEditor initialContent={await readDetails()} />;
}
