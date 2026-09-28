"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { SiteLoader } from "./site-loader";
import { SoundProvider, type SoundConfig } from "./sound-provider";

export function PublicRuntime({ children, loaderLabel, sound }: { children: ReactNode; loaderLabel: string; sound: SoundConfig }) {
  const pathname = usePathname();
  if (pathname.startsWith("/details")) return children;
  return <SoundProvider config={sound}><SiteLoader label={loaderLabel} />{children}</SoundProvider>;
}
