import type { Metadata, Viewport } from "next";
import { DM_Mono, DM_Sans, Rajdhani } from "next/font/google";
import { siteContent } from "@/content/site";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const rajdhani = Rajdhani({
  variable: "--font-rajdhani",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteContent.metadata.siteUrl),
  title: siteContent.metadata.title,
  description: siteContent.metadata.description,
  alternates: { canonical: "/" },
  authors: [{ name: siteContent.name }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/",
    siteName: siteContent.name,
    title: siteContent.metadata.title,
    description: siteContent.metadata.description,
    images: [{ url: "/seo/og.png", width: 1200, height: 630, alt: siteContent.role }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteContent.metadata.title,
    description: siteContent.metadata.description,
    images: ["/seo/og.png"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#000000" };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${dmMono.variable} ${rajdhani.variable} h-full antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
