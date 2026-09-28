import type { Metadata } from "next";
import { DM_Mono, DM_Sans, Rajdhani } from "next/font/google";
import { SmoothScrollProvider } from "@/components/smooth-scroll-provider";
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
  title: siteContent.metadata.title,
  description: siteContent.metadata.description,
};

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
      <body><SmoothScrollProvider>{children}</SmoothScrollProvider></body>
    </html>
  );
}
