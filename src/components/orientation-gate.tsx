"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function OrientationGate({ title, hint }: { title: string; hint: string }) {
  const pathname = usePathname();
  useEffect(() => {
    const query = matchMedia("(orientation: landscape) and (max-height: 500px) and (pointer: coarse)");
    const scroller = document.getElementById("scroll-container");
    const update = () => {
      if (!scroller) return;
      scroller.dataset.orientationBlocked = String(query.matches);
      const loader = document.querySelector<HTMLElement>(".site-loader");
      scroller.inert = query.matches || Boolean(loader && !loader.hidden && document.documentElement.dataset.siteLoaded !== "true");
    };
    update();
    query.addEventListener("change", update);
    return () => {
      query.removeEventListener("change", update);
      if (scroller) delete scroller.dataset.orientationBlocked;
    };
  }, [pathname]);
  return <div className="orientation-guard" role="status"><p className="orientation-title">{title}</p><p className="orientation-hint">{hint}</p></div>;
}
