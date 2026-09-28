import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DetailsEditor } from "@/components/details-editor";
import { readDetails } from "@/lib/details-store";

export const metadata: Metadata = { title: "Site details (local editor)", robots: { index: false, follow: false } };

export default async function DetailsPage() {
  if (process.env.NODE_ENV === "production") notFound();
  return <DetailsEditor initialContent={await readDetails()} />;
}
