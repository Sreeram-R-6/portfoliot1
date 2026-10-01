import type { ReactNode, SVGProps } from "react";

export type GlyphVariant = "hex" | "orbit" | "cross" | "bracket" | "signal";

const paths: Record<GlyphVariant, ReactNode> = {
  hex: <><path d="m80 14 56 32v64l-56 32-56-32V46Z" fill="currentColor" fillOpacity=".13" stroke="currentColor" strokeWidth="7" /><path d="m24 46 56 32 56-32M80 78v64M52 30l56 32v64" stroke="currentColor" strokeWidth="7" /></>,
  orbit: <><circle cx="80" cy="80" r="53" fill="currentColor" fillOpacity=".13" stroke="currentColor" strokeWidth="7" /><circle cx="80" cy="80" r="25" stroke="currentColor" strokeWidth="7" /><path d="M80 14v28M80 118v28M14 80h28M118 80h28" stroke="currentColor" strokeWidth="7" /></>,
  cross: <><path d="M80 14v132M14 80h132" stroke="currentColor" strokeWidth="7" /><path d="m43 43 74 74M117 43l-74 74" stroke="currentColor" strokeWidth="4" /><circle cx="80" cy="80" r="22" fill="currentColor" fillOpacity=".13" stroke="currentColor" strokeWidth="7" /></>,
  bracket: <><path d="M24 58V24h34M136 58V24h-34M24 102v34h34M136 102v34h-34" stroke="currentColor" strokeWidth="7" /><path d="M52 80h56M80 52v56" stroke="currentColor" strokeWidth="7" /></>,
  signal: <><path d="M20 80h24M116 80h24M80 20v24M80 116v24" stroke="currentColor" strokeWidth="7" /><path d="m45 45 18 18M97 97l18 18M115 45 97 63M63 97l-18 18" stroke="currentColor" strokeWidth="5" /><circle cx="80" cy="80" r="19" fill="currentColor" fillOpacity=".16" stroke="currentColor" strokeWidth="7" /></>,
};

export function GlyphPoster({ variant, ...props }: { variant: GlyphVariant } & SVGProps<SVGSVGElement>) {
  return <svg viewBox="0 0 160 160" fill="none" aria-hidden="true" {...props}>{paths[variant]}</svg>;
}
