"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { SiteLoader } from "./site-loader";
import { RouteTransition } from "./route-transition";
import { OrientationGate } from "./orientation-gate";
import { SoundProvider, type SoundConfig } from "./sound-provider";

export function PublicRuntime({ children, loaderLabel, sound, orientation }: { children: ReactNode; loaderLabel: string; sound: SoundConfig; orientation: { title: string; hint: string } }) {
  const pathname = usePathname();
  if (pathname.startsWith("/details")) return children;
  return <SoundProvider config={sound}><SiteLoader label={loaderLabel} /><OrientationGate {...orientation} /><RouteTransition>{children}</RouteTransition></SoundProvider>;
}
