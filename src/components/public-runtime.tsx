"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { SiteLoader } from "./site-loader";

export function PublicRuntime({ children, loaderLabel }: { children: ReactNode; loaderLabel: string }) {
  const pathname = usePathname();
  if (pathname.startsWith("/details")) return children;
  return <><SiteLoader label={loaderLabel} />{children}</>;
}
