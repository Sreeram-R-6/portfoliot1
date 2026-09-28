"use client";

import dynamic from "next/dynamic";
import { useStaticPoster } from "./decorative-canvas";

const PixelReveal = dynamic(() => import("./pixel-reveal").then((module) => module.PixelReveal), { ssr: false });

export function LazyPixelReveal() {
  const staticPoster = useStaticPoster();
  return staticPoster ? null : <PixelReveal />;
}
