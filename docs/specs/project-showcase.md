# Project showcase

## Evidence and scope

Source inspected 2026-09-28. Local evidence: docs/recon/REPORT.md, source-*.css/js, spec-computed-{375,768,1440}.json, existing full-page crops and recorded scroll states. No repeat screenshots. Only structure/styles/motion are adopted; all copy and destinations come from src/content/site.ts.

Measurements below are source computed values at viewport height 900px, scroll top 0; transformed rectangles are state-dependent and are not universal CSS dimensions. Repeated elements may have distinct sizes. Source class names identify evidence and need not become target component names.

## Layout

Desktop section height calc(100dvh - nav-height), 824px at reference viewport. Desktop source track measured 3358.11px by 760px for nine cards; user has five projects, so track extent must be recalculated from actual card bounds. Primary desktop thumbnail 425.438px by 309.885px; alternate 314.24px wide. Cards use zero radius. Source source-size/aspect variants are evidence, not assets to reuse.

## States and interactions

Desktop pin start top <nav-height>px, scrub 1. Intro scramble .7s none with .18s offsets. Card hover scale 1.04, .6s cubic-bezier(.16,1,.3,1); focus must expose same link affordance. Image canvas progress/reverse drives pixel sweep and purple band; uniforms in webgl.md. Mobile/tablet use normal vertical scrolling, no horizontal pin.

## Responsive behavior

375: padding 24px 16px 33px; one-column track margin-top 48px, row gap 16px, width 343.333px; heading 48px/38.4px/-2px, card title 20px/20px; body 15px/27px. 768: padding 44px 32px 112px, two 339px columns, gaps 24px 26px, track margin-top 64px; body 13px/23.4px. 1440: fluid desktop layout; title 80px/64px/-1.93384px, card title 19.3384px/19.3384px, body 12.57px/22.626px. Source fluid scale below. Reduced motion: static grid, no pinned path or image sweep.

Custom breakpoints: mobile max-width 767.98px; tablet 768px–1024.98px; desktop min-width 1025px. Nav utility breakpoint 40rem. Retain fluid formulas rather than interpolating measured snapshots.

## Component tree

`ProjectShowcase > Intro(Title + Description + CTA) + TrackViewport > ProjectTrack > ProjectCard[]; desktop decorative Canvas tracks card bounds.`

## Animation libraries

GSAP ScrollTrigger + ScrambleTextPlugin; Three.js / React Three Fiber custom image shader. No drei required: core texture loading and custom shader materials suffice.

## Flags and handling

| Status / item | Handling |
| --- | --- |
| VERIFIED: source travel formula; APPROXIMATED: target extent | Travel formula is decoded below. Recalculate from five target card bounds rather than retaining the nine-card track length. |
| APPROXIMATED: five projects replacing nine | Use all five user projects in site.ts once each. Preserve card layout rules, derive track length; never invent four additional projects. |
| UNVERIFIED: external project destinations | Approved # values in site.ts. No source project routes are cloned. |
| APPROXIMATED: project thumbnails | Neutral same-aspect placeholders until user supplies images; preserve shader behavior and accessible project names. |

Tailwind source version is UNVERIFIED but explicitly approved to ignore: use installed Tailwind v4. No additional package needed. Reduced-motion and keyboard behavior above are target requirements where the source did not establish equivalent behavior.

## Exact source CSS rules

Rules retain cascade order and media conditions. Tokens map to the verified OKLCH equivalents in globals.css. Source utility classes are additionally represented by the computed tables below.

Context: `base`

```css
.stat-stage[data-transition=active]~.selected-work-outer {visibility:hidden}
```

Context: `base`

```css
.selected-work-outer {background:var(--primary-green-neon);width:100%;position:relative}
```

Context: `base`

```css
.selected-work-outer[data-exit=active] {pointer-events:none;background:0 0}
```

Context: `base`

```css
.selected-work-outer[data-exit=active] .work-card-thumb--link,.selected-work-outer[data-exit=active] .work-card-visit {pointer-events:auto}
```

Context: `base`

```css
.selected-work-navband {display:none}
```

Context: `base`

```css
.selected-work-outer[data-exit=active] .selected-work-navband {height:calc(var(--nav-height,5rem) + 1px);z-index:1;background:var(--primary-green-neon);pointer-events:none;display:block;position:fixed;top:0;left:0;right:0}
```

Context: `base`

```css
.selected-work .shared-v-line {visibility:hidden}
```

Context: `base`

```css
.selected-work {background:var(--primary-green-neon);--grid-line-color:var(--primary-green-line);--grid-line-fade-to:var(--primary-green-neon);--u:.0625rem;width:100%;position:relative}
```

Context: `base`

```css
.selected-work-heading,.work-viewport {will-change:transform}
```

Context: `base`

```css
.selected-work-heading {align-items:flex-start;gap:calc(40 * var(--u));mix-blend-mode:difference;flex-direction:column;display:flex}
```

Context: `base`

```css
.selected-work-cta-wrap {margin-top:calc(40 * var(--u));will-change:transform}
```

Context: `base`

```css
.selected-work-heading-top {align-items:flex-start;gap:calc(32 * var(--u));flex-direction:column;display:flex}
```

Context: `base`

```css
.selected-work-badge {width:fit-content;padding:calc(7 * var(--u)) calc(9 * var(--u));background:var(--primary-green-neon);color:var(--text-black,#070210);font-size:calc(12 * var(--u));letter-spacing:calc(1.56 * var(--u));text-transform:uppercase;white-space:nowrap;align-items:center;font-weight:600;line-height:1;display:inline-flex}
```

Context: `base`

```css
.selected-work-title {color:var(--text-white);font-weight:var(--section-heading-weight);letter-spacing:calc(-2 * var(--u));text-transform:uppercase;line-height:.8}
```

Context: `base`

```css
.selected-work-description {font-family:var(--font-sans);font-size:calc(13 * var(--u));color:var(--text-grey-1);line-height:1.8}
```

Context: `base`

```css
.selected-work-cta {width:calc(160 * var(--u));height:calc(46 * var(--u))}
```

Context: `base`

```css
.work-card {align-items:flex-start;gap:calc(12 * var(--u));flex-direction:column;min-width:0;max-width:100%;display:flex}
```

Context: `base`

```css
.work-card-thumb {width:100%;aspect-ratio:var(--ratio,1.236);box-shadow:0 calc(1 * var(--u)) calc(2 * var(--u)) color-mix(in srgb, var(--background-bg-0) 10%, transparent), 0 calc(10 * var(--u)) calc(24 * var(--u)) color-mix(in srgb, var(--background-bg-0) 2%, transparent);flex:none;position:relative}
```

Context: `base`

```css
.work-card-thumb--link {cursor:pointer;display:block}
```

Context: `base`

```css
.work-card-frame,.work-card-mask {position:absolute;inset:0;overflow:hidden}
```

Context: `base`

```css
.work-card-img {object-fit:cover;transition:transform .6s cubic-bezier(.16,1,.3,1)}
```

Context: `@media (hover:hover)`

```css
.work-card-thumb:hover .work-card-img {transform:scale(1.04)}
```

Context: `@media (prefers-reduced-motion:reduce)`

```css
.work-card-img {transition:none}
```

Context: `@media (prefers-reduced-motion:reduce)`

```css
.work-card-thumb:hover .work-card-img {transform:none}
```

Context: `base`

```css
.work-card-cover {mix-blend-mode:hard-light;background:linear-gradient(to bottom, transparent, var(--work-cover));pointer-events:none;position:absolute;inset:0}
```

Context: `base`

```css
.work-card-tag {left:calc(16 * var(--u));bottom:calc(15 * var(--u));padding:calc(7 * var(--u)) calc(8 * var(--u));font-size:calc(12 * var(--u));letter-spacing:calc(1.56 * var(--u));text-transform:uppercase;white-space:nowrap;background:#202020;align-items:center;font-weight:600;line-height:1;display:inline-flex;position:absolute}
```

Context: `base`

```css
.work-card-tag[data-tag=case-study] {color:var(--primary-orange)}
```

Context: `base`

```css
.work-card-tag[data-tag=web-design],.work-card-tag[data-tag=app-design] {color:var(--primary-green-neon)}
```

Context: `base`

```css
.work-card-tag[data-tag=exploration] {color:var(--tertiary-purple-vivid)}
```

Context: `base`

```css
.work-card-tag[data-tag=for-fun] {color:var(--primary-cyan-neon)}
```

Context: `base`

```css
.work-card-plus {width:calc(8 * var(--u));height:calc(8 * var(--u));color:color-mix(in srgb, var(--background-bg-0) 35%, transparent);pointer-events:none;position:absolute}
```

Context: `base`

```css
.work-card-plus-tl {left:calc(-4 * var(--u));top:calc(-4 * var(--u))}
```

Context: `base`

```css
.work-card-plus-tr {right:calc(-4 * var(--u));top:calc(-4 * var(--u))}
```

Context: `base`

```css
.work-card-plus-br {right:calc(-4 * var(--u));bottom:calc(-4 * var(--u))}
```

Context: `base`

```css
.work-card-plus-bl {left:calc(-4 * var(--u));bottom:calc(-4 * var(--u))}
```

Context: `base`

```css
.work-card-label {justify-content:space-between;align-items:baseline;gap:calc(12 * var(--u));flex-shrink:0;width:100%;display:flex}
```

Context: `base`

```css
.work-card-title {font-size:calc(20 * var(--u));color:var(--background-bg-0);text-transform:uppercase;font-weight:500;line-height:1}
```

Context: `base`

```css
.work-card-visit {font-size:calc(12 * var(--u));letter-spacing:calc(1.56 * var(--u));color:color-mix(in srgb, var(--background-bg-0) 55%, transparent);text-transform:uppercase;white-space:nowrap;flex-shrink:0;font-weight:600;line-height:1}
```

Context: `base`

```css
.work-card-visit-icon {color:var(--background-bg-0)}
```

Context: `base`

```css
.selected-work[data-webgl=on] .work-card-img,.selected-work[data-webgl=on] .work-card-cover {opacity:0}
```

Context: `@media (min-width:1025px)`

```css
.selected-work {height:calc(100dvh - var(--nav-height,0px));--u:min(calc((100dvh - var(--nav-height,0px) - 4rem) / var(--box-h)), .0625rem);overflow:hidden}
```

Context: `@media (min-width:1025px)`

```css
.selected-work-cta-wrap {left:var(--grid-edge-inset,2rem);top:calc(48 * var(--u));z-index:2;margin-top:0;position:absolute}
```

Context: `@media (min-width:1025px)`

```css
.selected-work-heading {left:var(--grid-edge-inset,2rem);top:calc(48 * var(--u));width:calc(451 * var(--u));z-index:2;position:absolute}
```

Context: `@media (min-width:1025px)`

```css
.selected-work-title {font-size:5rem}
```

Context: `@media (min-width:1025px)`

```css
.work-viewport {position:absolute;inset:0}
```

Context: `@media (min-width:1025px)`

```css
.work-track,.work-path-layer {left:calc(var(--box-x) * var(--u));top:calc((100dvh - var(--nav-height,0px) - var(--box-h) * var(--u)) / 2);width:calc(var(--box-w) * var(--u));height:calc(var(--box-h) * var(--u));will-change:transform;position:absolute}
```

Context: `@media (min-width:1025px)`

```css
.work-track {z-index:1}
```

Context: `@media (min-width:1025px)`

```css
.work-card {left:calc(var(--x) * var(--u));top:calc(var(--y) * var(--u));width:calc(var(--w) * var(--u));position:absolute}
```

Context: `@media (max-width:1024.98px)`

```css
.selected-work-title {font-size:calc(48 * var(--u))}
```

Context: `@media (max-width:1024.98px)`

```css
.work-track {grid-template-columns:repeat(2,minmax(0,1fr));display:grid}
```

Context: `@media (max-width:1024.98px)`

```css
.selected-work-heading-top,.selected-work-heading {gap:calc(16 * var(--u))}
```

Context: `@media (max-width:1024.98px)`

```css
.selected-work-cta-wrap {margin-top:calc(16 * var(--u))}
```

Context: `@media (min-width:768px) and (max-width:1024.98px)`

```css
.selected-work {padding:calc(44 * var(--u)) var(--grid-edge-inset,2rem) calc(112 * var(--u))}
```

Context: `@media (min-width:768px) and (max-width:1024.98px)`

```css
.selected-work-cta {width:calc(148 * var(--u))}
```

Context: `@media (min-width:768px) and (max-width:1024.98px)`

```css
.work-track {margin-top:calc(64 * var(--u));column-gap:calc(26 * var(--u));row-gap:calc(24 * var(--u));align-items:start}
```

Context: `@media (max-width:767.98px)`

```css
.selected-work {padding:calc(24 * var(--u)) var(--grid-edge-inset,16px) calc(33 * var(--u))}
```

Context: `@media (max-width:767.98px)`

```css
.selected-work-description {font-size:calc(15 * var(--u))}
```

Context: `@media (max-width:767.98px)`

```css
.selected-work-cta {width:calc(148 * var(--u))}
```

Context: `@media (max-width:767.98px)`

```css
.work-track {margin-top:calc(48 * var(--u));row-gap:calc(16 * var(--u));grid-template-columns:minmax(0,1fr)}
```

Context: `base`

```css
.selected-work {z-index:1}
```

## Computed layout at 375px

| Element | Geometry / layout | Typography / paint / state |
| --- | --- | --- |
| `section.selected-work-outer` | width: 375.333px; height: 2995.71px; minHeight: 0px; maxWidth: none; position: relative; top: 0px; right: 0px; bottom: 0px; left: 0px; padding: 0px; margin: 0px; gap: normal; display: block; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: "DM Sans", "DM Sans Fallback", ui-sans-serif, system-ui, sans-serif; fontSize: 16px; fontWeight: 400; lineHeight: 24px; letterSpacing: normal; color: rgb(245, 240, 235); backgroundColor: rgb(157, 241, 51); border: 0px solid rgb(245, 240, 235); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `div.selected-work font-heading` | width: 375.333px; height: 2995.71px; minHeight: 0px; maxWidth: none; position: relative; top: 0px; right: 0px; bottom: 0px; left: 0px; padding: 24px 16px 33px; margin: 0px; gap: normal; display: block; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 16px; fontWeight: 400; lineHeight: 24px; letterSpacing: normal; color: rgb(245, 240, 235); backgroundColor: rgb(157, 241, 51); border: 0px solid rgb(245, 240, 235); borderRadius: 0px; boxShadow: none; zIndex: 1; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `div.selected-work-heading` | width: 343.333px; height: 123.396px; minHeight: 0px; maxWidth: none; position: static; top: auto; right: auto; bottom: auto; left: auto; padding: 0px; margin: 0px; gap: 16px; display: flex; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: column; alignItems: flex-start; justifyContent: normal | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 16px; fontWeight: 400; lineHeight: 24px; letterSpacing: normal; color: rgb(245, 240, 235); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(245, 240, 235); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: difference; transform: matrix(1, 0, 0, 1, 503, 0) |
| `h2.selected-work-title` | width: 293.219px; height: 38.3958px; minHeight: auto; maxWidth: none; position: static; top: auto; right: auto; bottom: auto; left: auto; padding: 0px; margin: 0px; gap: normal; display: block; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 48px; fontWeight: 500; lineHeight: 38.4px; letterSpacing: -2px; color: rgb(255, 255, 255); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(255, 255, 255); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `p.selected-work-description` | width: 185.948px; height: 27px; minHeight: auto; maxWidth: none; position: static; top: auto; right: auto; bottom: auto; left: auto; padding: 0px; margin: 0px; gap: normal; display: block; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: "DM Sans", "DM Sans Fallback", ui-sans-serif, system-ui, sans-serif; fontSize: 15px; fontWeight: 400; lineHeight: 27px; letterSpacing: normal; color: rgb(116, 119, 133); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(116, 119, 133); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `a.group relative flex shrink-0 cursor-pointer items-center justify-center  selected-work-cta` | width: 148px; height: 46px; minHeight: 0px; maxWidth: none; position: relative; top: 0px; right: 0px; bottom: 0px; left: 0px; padding: 0px; margin: 0px; gap: normal; display: flex; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: center; justifyContent: center | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 16px; fontWeight: 400; lineHeight: 24px; letterSpacing: normal; color: rgb(245, 240, 235); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(245, 240, 235); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `div.work-viewport` | width: 343.333px; height: 2705.31px; minHeight: 0px; maxWidth: none; position: static; top: auto; right: auto; bottom: auto; left: auto; padding: 0px; margin: 0px; gap: normal; display: block; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 16px; fontWeight: 400; lineHeight: 24px; letterSpacing: normal; color: rgb(245, 240, 235); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(245, 240, 235); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: matrix(1, 0, 0, 1, 503, 0) |
| `div.work-track` | width: 343.333px; height: 2705.31px; minHeight: 0px; maxWidth: none; position: static; top: auto; right: auto; bottom: auto; left: auto; padding: 0px; margin: 48px 0px 0px; gap: 16px normal; display: grid; gridTemplateColumns: 343.333px; gridTemplateRows: 282.083px 280.521px 289.5px 289.5px 289.5px 283.604px 289.5px 289.5px 283.604px; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 16px; fontWeight: 400; lineHeight: 24px; letterSpacing: normal; color: rgb(245, 240, 235); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(245, 240, 235); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `article.work-card work-card-lg` | width: 343.333px; height: 282.083px; minHeight: auto; maxWidth: 100%; position: static; top: auto; right: auto; bottom: auto; left: auto; padding: 0px; margin: 0px; gap: 12px; display: flex; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: column; alignItems: flex-start; justifyContent: normal | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 16px; fontWeight: 400; lineHeight: 24px; letterSpacing: normal; color: rgb(245, 240, 235); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(245, 240, 235); borderRadius: 0px; boxShadow: none; zIndex: 1; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `a.work-card-thumb work-card-thumb--link` | width: 343.333px; height: 250.083px; minHeight: auto; maxWidth: none; position: relative; top: 0px; right: 0px; bottom: 0px; left: 0px; padding: 0px; margin: 0px; gap: normal; display: block; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 16px; fontWeight: 400; lineHeight: 24px; letterSpacing: normal; color: rgb(245, 240, 235); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(245, 240, 235); borderRadius: 0px; boxShadow: color(srgb 0 0 0 / 0.1) 0px 1px 2px 0px, color(srgb 0 0 0 / 0.02) 0px 10px 24px 0px; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: 1.37285 / 1; mixBlendMode: normal; transform: none |
| `span.work-card-tag` | width: 91.0729px; height: 26px; minHeight: 0px; maxWidth: none; position: absolute; top: 209.083px; right: 236.26px; bottom: 15px; left: 16px; padding: 7px 8px; margin: 0px; gap: normal; display: flex; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: center; justifyContent: normal | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 12px; fontWeight: 600; lineHeight: 12px; letterSpacing: 1.56px; color: rgb(247, 80, 73); backgroundColor: rgb(32, 32, 32); border: 0px solid rgb(247, 80, 73); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `h3.work-card-title` | width: 82.8021px; height: 20px; minHeight: auto; maxWidth: none; position: static; top: auto; right: auto; bottom: auto; left: auto; padding: 0px; margin: 0px; gap: normal; display: block; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 20px; fontWeight: 500; lineHeight: 20px; letterSpacing: normal; color: rgb(0, 0, 0); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(0, 0, 0); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `a.group relative flex items-center gap-1 work-card-visit` | width: 42.7917px; height: 12px; minHeight: auto; maxWidth: none; position: relative; top: 0px; right: 0px; bottom: 0px; left: 0px; padding: 0px; margin: 0px; gap: 4px; display: flex; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: center; justifyContent: normal | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 12px; fontWeight: 600; lineHeight: 12px; letterSpacing: 1.56px; color: color(srgb 0 0 0 / 0.55); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid color(srgb 0 0 0 / 0.55); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `article.work-card work-card-lg` | width: 343.333px; height: 280.521px; minHeight: auto; maxWidth: 100%; position: static; top: auto; right: auto; bottom: auto; left: auto; padding: 0px; margin: 0px; gap: 12px; display: flex; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: column; alignItems: flex-start; justifyContent: normal | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 16px; fontWeight: 400; lineHeight: 24px; letterSpacing: normal; color: rgb(245, 240, 235); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(245, 240, 235); borderRadius: 0px; boxShadow: none; zIndex: 2; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `a.work-card-thumb work-card-thumb--link` | width: 343.333px; height: 248.521px; minHeight: auto; maxWidth: none; position: relative; top: 0px; right: 0px; bottom: 0px; left: 0px; padding: 0px; margin: 0px; gap: normal; display: block; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 16px; fontWeight: 400; lineHeight: 24px; letterSpacing: normal; color: rgb(245, 240, 235); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(245, 240, 235); borderRadius: 0px; boxShadow: color(srgb 0 0 0 / 0.1) 0px 1px 2px 0px, color(srgb 0 0 0 / 0.02) 0px 10px 24px 0px; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: 1.38148 / 1; mixBlendMode: normal; transform: none |
| `span.work-card-tag` | width: 91.0729px; height: 26px; minHeight: 0px; maxWidth: none; position: absolute; top: 207.521px; right: 236.26px; bottom: 15px; left: 16px; padding: 7px 8px; margin: 0px; gap: normal; display: flex; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: center; justifyContent: normal | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 12px; fontWeight: 600; lineHeight: 12px; letterSpacing: 1.56px; color: rgb(247, 80, 73); backgroundColor: rgb(32, 32, 32); border: 0px solid rgb(247, 80, 73); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `h3.work-card-title` | width: 67.9688px; height: 20px; minHeight: auto; maxWidth: none; position: static; top: auto; right: auto; bottom: auto; left: auto; padding: 0px; margin: 0px; gap: normal; display: block; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 20px; fontWeight: 500; lineHeight: 20px; letterSpacing: normal; color: rgb(0, 0, 0); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(0, 0, 0); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `article.work-card work-card-sm` | width: 343.333px; height: 289.5px; minHeight: auto; maxWidth: 100%; position: static; top: auto; right: auto; bottom: auto; left: auto; padding: 0px; margin: 0px; gap: 12px; display: flex; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: column; alignItems: flex-start; justifyContent: normal | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 16px; fontWeight: 400; lineHeight: 24px; letterSpacing: normal; color: rgb(245, 240, 235); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(245, 240, 235); borderRadius: 0px; boxShadow: none; zIndex: 3; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `a.work-card-thumb work-card-thumb--link` | width: 343.333px; height: 257.5px; minHeight: auto; maxWidth: none; position: relative; top: 0px; right: 0px; bottom: 0px; left: 0px; padding: 0px; margin: 0px; gap: normal; display: block; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 16px; fontWeight: 400; lineHeight: 24px; letterSpacing: normal; color: rgb(245, 240, 235); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(245, 240, 235); borderRadius: 0px; boxShadow: color(srgb 0 0 0 / 0.1) 0px 1px 2px 0px, color(srgb 0 0 0 / 0.02) 0px 10px 24px 0px; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: 1.33333 / 1; mixBlendMode: normal; transform: none |
| `span.work-card-tag` | width: 92.0104px; height: 26px; minHeight: 0px; maxWidth: none; position: absolute; top: 216.5px; right: 235.323px; bottom: 15px; left: 16px; padding: 7px 8px; margin: 0px; gap: normal; display: flex; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: center; justifyContent: normal | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 12px; fontWeight: 600; lineHeight: 12px; letterSpacing: 1.56px; color: rgb(157, 241, 51); backgroundColor: rgb(32, 32, 32); border: 0px solid rgb(157, 241, 51); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `h3.work-card-title` | width: 156.146px; height: 20px; minHeight: auto; maxWidth: none; position: static; top: auto; right: auto; bottom: auto; left: auto; padding: 0px; margin: 0px; gap: normal; display: block; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 20px; fontWeight: 500; lineHeight: 20px; letterSpacing: normal; color: rgb(0, 0, 0); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(0, 0, 0); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `article.work-card work-card-sm` | width: 343.333px; height: 289.5px; minHeight: auto; maxWidth: 100%; position: static; top: auto; right: auto; bottom: auto; left: auto; padding: 0px; margin: 0px; gap: 12px; display: flex; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: column; alignItems: flex-start; justifyContent: normal | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 16px; fontWeight: 400; lineHeight: 24px; letterSpacing: normal; color: rgb(245, 240, 235); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(245, 240, 235); borderRadius: 0px; boxShadow: none; zIndex: 4; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `span.work-card-tag` | width: 89.25px; height: 26px; minHeight: 0px; maxWidth: none; position: absolute; top: 216.5px; right: 238.083px; bottom: 15px; left: 16px; padding: 7px 8px; margin: 0px; gap: normal; display: flex; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: center; justifyContent: normal | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 12px; fontWeight: 600; lineHeight: 12px; letterSpacing: 1.56px; color: rgb(157, 241, 51); backgroundColor: rgb(32, 32, 32); border: 0px solid rgb(157, 241, 51); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `h3.work-card-title` | width: 154.062px; height: 20px; minHeight: auto; maxWidth: none; position: static; top: auto; right: auto; bottom: auto; left: auto; padding: 0px; margin: 0px; gap: normal; display: block; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 20px; fontWeight: 500; lineHeight: 20px; letterSpacing: normal; color: rgb(0, 0, 0); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(0, 0, 0); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `article.work-card work-card-lg` | width: 343.333px; height: 289.5px; minHeight: auto; maxWidth: 100%; position: static; top: auto; right: auto; bottom: auto; left: auto; padding: 0px; margin: 0px; gap: 12px; display: flex; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: column; alignItems: flex-start; justifyContent: normal | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 16px; fontWeight: 400; lineHeight: 24px; letterSpacing: normal; color: rgb(245, 240, 235); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(245, 240, 235); borderRadius: 0px; boxShadow: none; zIndex: 5; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `h3.work-card-title` | width: 64.8854px; height: 20px; minHeight: auto; maxWidth: none; position: static; top: auto; right: auto; bottom: auto; left: auto; padding: 0px; margin: 0px; gap: normal; display: block; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 20px; fontWeight: 500; lineHeight: 20px; letterSpacing: normal; color: rgb(0, 0, 0); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(0, 0, 0); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `article.work-card work-card-sm` | width: 343.333px; height: 283.604px; minHeight: auto; maxWidth: 100%; position: static; top: auto; right: auto; bottom: auto; left: auto; padding: 0px; margin: 0px; gap: 12px; display: flex; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: column; alignItems: flex-start; justifyContent: normal | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 16px; fontWeight: 400; lineHeight: 24px; letterSpacing: normal; color: rgb(245, 240, 235); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(245, 240, 235); borderRadius: 0px; boxShadow: none; zIndex: 6; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `a.work-card-thumb work-card-thumb--link` | width: 343.333px; height: 251.604px; minHeight: auto; maxWidth: none; position: relative; top: 0px; right: 0px; bottom: 0px; left: 0px; padding: 0px; margin: 0px; gap: normal; display: block; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 16px; fontWeight: 400; lineHeight: 24px; letterSpacing: normal; color: rgb(245, 240, 235); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(245, 240, 235); borderRadius: 0px; boxShadow: color(srgb 0 0 0 / 0.1) 0px 1px 2px 0px, color(srgb 0 0 0 / 0.02) 0px 10px 24px 0px; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: 1.36455 / 1; mixBlendMode: normal; transform: none |
| `span.work-card-tag` | width: 89.25px; height: 26px; minHeight: 0px; maxWidth: none; position: absolute; top: 210.604px; right: 238.083px; bottom: 15px; left: 16px; padding: 7px 8px; margin: 0px; gap: normal; display: flex; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: center; justifyContent: normal | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 12px; fontWeight: 600; lineHeight: 12px; letterSpacing: 1.56px; color: rgb(157, 241, 51); backgroundColor: rgb(32, 32, 32); border: 0px solid rgb(157, 241, 51); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `h3.work-card-title` | width: 101.521px; height: 20px; minHeight: auto; maxWidth: none; position: static; top: auto; right: auto; bottom: auto; left: auto; padding: 0px; margin: 0px; gap: normal; display: block; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 20px; fontWeight: 500; lineHeight: 20px; letterSpacing: normal; color: rgb(0, 0, 0); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(0, 0, 0); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `article.work-card work-card-lg` | width: 343.333px; height: 289.5px; minHeight: auto; maxWidth: 100%; position: static; top: auto; right: auto; bottom: auto; left: auto; padding: 0px; margin: 0px; gap: 12px; display: flex; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: column; alignItems: flex-start; justifyContent: normal | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 16px; fontWeight: 400; lineHeight: 24px; letterSpacing: normal; color: rgb(245, 240, 235); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(245, 240, 235); borderRadius: 0px; boxShadow: none; zIndex: 7; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `h3.work-card-title` | width: 112.188px; height: 20px; minHeight: auto; maxWidth: none; position: static; top: auto; right: auto; bottom: auto; left: auto; padding: 0px; margin: 0px; gap: normal; display: block; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 20px; fontWeight: 500; lineHeight: 20px; letterSpacing: normal; color: rgb(0, 0, 0); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(0, 0, 0); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `article.work-card work-card-lg` | width: 343.333px; height: 289.5px; minHeight: auto; maxWidth: 100%; position: static; top: auto; right: auto; bottom: auto; left: auto; padding: 0px; margin: 0px; gap: 12px; display: flex; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: column; alignItems: flex-start; justifyContent: normal | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 16px; fontWeight: 400; lineHeight: 24px; letterSpacing: normal; color: rgb(245, 240, 235); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(245, 240, 235); borderRadius: 0px; boxShadow: none; zIndex: 8; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `h3.work-card-title` | width: 96.2083px; height: 20px; minHeight: auto; maxWidth: none; position: static; top: auto; right: auto; bottom: auto; left: auto; padding: 0px; margin: 0px; gap: normal; display: block; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 20px; fontWeight: 500; lineHeight: 20px; letterSpacing: normal; color: rgb(0, 0, 0); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(0, 0, 0); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `article.work-card work-card-sm` | width: 343.333px; height: 283.604px; minHeight: auto; maxWidth: 100%; position: static; top: auto; right: auto; bottom: auto; left: auto; padding: 0px; margin: 0px; gap: 12px; display: flex; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: column; alignItems: flex-start; justifyContent: normal | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 16px; fontWeight: 400; lineHeight: 24px; letterSpacing: normal; color: rgb(245, 240, 235); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(245, 240, 235); borderRadius: 0px; boxShadow: none; zIndex: 9; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `h3.work-card-title` | width: 60.4688px; height: 20px; minHeight: auto; maxWidth: none; position: static; top: auto; right: auto; bottom: auto; left: auto; padding: 0px; margin: 0px; gap: normal; display: block; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 20px; fontWeight: 500; lineHeight: 20px; letterSpacing: normal; color: rgb(0, 0, 0); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(0, 0, 0); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |

## Computed layout at 768px

| Element | Geometry / layout | Typography / paint / state |
| --- | --- | --- |
| `section.selected-work-outer` | width: 768px; height: 1915.9px; minHeight: 0px; maxWidth: none; position: relative; top: 0px; right: 0px; bottom: 0px; left: 0px; padding: 0px; margin: 0px; gap: normal; display: block; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: "DM Sans", "DM Sans Fallback", ui-sans-serif, system-ui, sans-serif; fontSize: 16px; fontWeight: 400; lineHeight: 24px; letterSpacing: normal; color: rgb(245, 240, 235); backgroundColor: rgb(157, 241, 51); border: 0px solid rgb(245, 240, 235); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `div.selected-work font-heading` | width: 768px; height: 1915.9px; minHeight: 0px; maxWidth: none; position: relative; top: 0px; right: 0px; bottom: 0px; left: 0px; padding: 44px 32px 112px; margin: 0px; gap: normal; display: block; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 16px; fontWeight: 400; lineHeight: 24px; letterSpacing: normal; color: rgb(245, 240, 235); backgroundColor: rgb(157, 241, 51); border: 0px solid rgb(245, 240, 235); borderRadius: 0px; boxShadow: none; zIndex: 1; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `div.selected-work-heading` | width: 704px; height: 119.792px; minHeight: 0px; maxWidth: none; position: static; top: auto; right: auto; bottom: auto; left: auto; padding: 0px; margin: 0px; gap: 16px; display: flex; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: column; alignItems: flex-start; justifyContent: normal | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 16px; fontWeight: 400; lineHeight: 24px; letterSpacing: normal; color: rgb(245, 240, 235); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(245, 240, 235); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: difference; transform: matrix(1, 0, 0, 1, 503, 0) |
| `h2.selected-work-title` | width: 293.219px; height: 38.3958px; minHeight: auto; maxWidth: none; position: static; top: auto; right: auto; bottom: auto; left: auto; padding: 0px; margin: 0px; gap: normal; display: block; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 48px; fontWeight: 500; lineHeight: 38.4px; letterSpacing: -2px; color: rgb(255, 255, 255); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(255, 255, 255); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `p.selected-work-description` | width: 161.156px; height: 23.3958px; minHeight: auto; maxWidth: none; position: static; top: auto; right: auto; bottom: auto; left: auto; padding: 0px; margin: 0px; gap: normal; display: block; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: "DM Sans", "DM Sans Fallback", ui-sans-serif, system-ui, sans-serif; fontSize: 13px; fontWeight: 400; lineHeight: 23.4px; letterSpacing: normal; color: rgb(116, 119, 133); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(116, 119, 133); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `a.group relative flex shrink-0 cursor-pointer items-center justify-center  selected-work-cta` | width: 148px; height: 46px; minHeight: 0px; maxWidth: none; position: relative; top: 0px; right: 0px; bottom: 0px; left: 0px; padding: 0px; margin: 0px; gap: normal; display: flex; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: center; justifyContent: center | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 16px; fontWeight: 400; lineHeight: 24px; letterSpacing: normal; color: rgb(245, 240, 235); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(245, 240, 235); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `div.work-viewport` | width: 704px; height: 1514.1px; minHeight: 0px; maxWidth: none; position: static; top: auto; right: auto; bottom: auto; left: auto; padding: 0px; margin: 0px; gap: normal; display: block; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 16px; fontWeight: 400; lineHeight: 24px; letterSpacing: normal; color: rgb(245, 240, 235); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(245, 240, 235); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: matrix(1, 0, 0, 1, 503, 0) |
| `div.work-track` | width: 704px; height: 1514.1px; minHeight: 0px; maxWidth: none; position: static; top: auto; right: auto; bottom: auto; left: auto; padding: 0px; margin: 64px 0px 0px; gap: 24px 26px; display: grid; gridTemplateColumns: 339px 339px; gridTemplateRows: 278.927px 286.25px 286.25px 286.25px 280.427px; gridTemplateAreas: none; flexDirection: row; alignItems: start; justifyContent: normal | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 16px; fontWeight: 400; lineHeight: 24px; letterSpacing: normal; color: rgb(245, 240, 235); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(245, 240, 235); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `article.work-card work-card-lg` | width: 339px; height: 278.927px; minHeight: auto; maxWidth: 100%; position: static; top: auto; right: auto; bottom: auto; left: auto; padding: 0px; margin: 0px; gap: 12px; display: flex; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: column; alignItems: flex-start; justifyContent: normal | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 16px; fontWeight: 400; lineHeight: 24px; letterSpacing: normal; color: rgb(245, 240, 235); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(245, 240, 235); borderRadius: 0px; boxShadow: none; zIndex: 1; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `a.work-card-thumb work-card-thumb--link` | width: 339px; height: 246.927px; minHeight: auto; maxWidth: none; position: relative; top: 0px; right: 0px; bottom: 0px; left: 0px; padding: 0px; margin: 0px; gap: normal; display: block; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 16px; fontWeight: 400; lineHeight: 24px; letterSpacing: normal; color: rgb(245, 240, 235); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(245, 240, 235); borderRadius: 0px; boxShadow: color(srgb 0 0 0 / 0.1) 0px 1px 2px 0px, color(srgb 0 0 0 / 0.02) 0px 10px 24px 0px; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: 1.37285 / 1; mixBlendMode: normal; transform: none |
| `span.work-card-tag` | width: 91.0729px; height: 26px; minHeight: 0px; maxWidth: none; position: absolute; top: 205.927px; right: 231.927px; bottom: 15px; left: 16px; padding: 7px 8px; margin: 0px; gap: normal; display: flex; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: center; justifyContent: normal | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 12px; fontWeight: 600; lineHeight: 12px; letterSpacing: 1.56px; color: rgb(247, 80, 73); backgroundColor: rgb(32, 32, 32); border: 0px solid rgb(247, 80, 73); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `h3.work-card-title` | width: 82.8021px; height: 20px; minHeight: auto; maxWidth: none; position: static; top: auto; right: auto; bottom: auto; left: auto; padding: 0px; margin: 0px; gap: normal; display: block; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 20px; fontWeight: 500; lineHeight: 20px; letterSpacing: normal; color: rgb(0, 0, 0); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(0, 0, 0); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `a.group relative flex items-center gap-1 work-card-visit` | width: 42.7917px; height: 12px; minHeight: auto; maxWidth: none; position: relative; top: 0px; right: 0px; bottom: 0px; left: 0px; padding: 0px; margin: 0px; gap: 4px; display: flex; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: center; justifyContent: normal | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 12px; fontWeight: 600; lineHeight: 12px; letterSpacing: 1.56px; color: color(srgb 0 0 0 / 0.55); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid color(srgb 0 0 0 / 0.55); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `article.work-card work-card-lg` | width: 339px; height: 277.385px; minHeight: auto; maxWidth: 100%; position: static; top: auto; right: auto; bottom: auto; left: auto; padding: 0px; margin: 0px; gap: 12px; display: flex; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: column; alignItems: flex-start; justifyContent: normal | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 16px; fontWeight: 400; lineHeight: 24px; letterSpacing: normal; color: rgb(245, 240, 235); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(245, 240, 235); borderRadius: 0px; boxShadow: none; zIndex: 2; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `a.work-card-thumb work-card-thumb--link` | width: 339px; height: 245.385px; minHeight: auto; maxWidth: none; position: relative; top: 0px; right: 0px; bottom: 0px; left: 0px; padding: 0px; margin: 0px; gap: normal; display: block; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 16px; fontWeight: 400; lineHeight: 24px; letterSpacing: normal; color: rgb(245, 240, 235); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(245, 240, 235); borderRadius: 0px; boxShadow: color(srgb 0 0 0 / 0.1) 0px 1px 2px 0px, color(srgb 0 0 0 / 0.02) 0px 10px 24px 0px; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: 1.38148 / 1; mixBlendMode: normal; transform: none |
| `span.work-card-tag` | width: 91.0729px; height: 26px; minHeight: 0px; maxWidth: none; position: absolute; top: 204.385px; right: 231.927px; bottom: 15px; left: 16px; padding: 7px 8px; margin: 0px; gap: normal; display: flex; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: center; justifyContent: normal | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 12px; fontWeight: 600; lineHeight: 12px; letterSpacing: 1.56px; color: rgb(247, 80, 73); backgroundColor: rgb(32, 32, 32); border: 0px solid rgb(247, 80, 73); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `h3.work-card-title` | width: 67.9688px; height: 20px; minHeight: auto; maxWidth: none; position: static; top: auto; right: auto; bottom: auto; left: auto; padding: 0px; margin: 0px; gap: normal; display: block; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 20px; fontWeight: 500; lineHeight: 20px; letterSpacing: normal; color: rgb(0, 0, 0); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(0, 0, 0); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `article.work-card work-card-sm` | width: 339px; height: 286.25px; minHeight: auto; maxWidth: 100%; position: static; top: auto; right: auto; bottom: auto; left: auto; padding: 0px; margin: 0px; gap: 12px; display: flex; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: column; alignItems: flex-start; justifyContent: normal | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 16px; fontWeight: 400; lineHeight: 24px; letterSpacing: normal; color: rgb(245, 240, 235); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(245, 240, 235); borderRadius: 0px; boxShadow: none; zIndex: 3; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `a.work-card-thumb work-card-thumb--link` | width: 339px; height: 254.25px; minHeight: auto; maxWidth: none; position: relative; top: 0px; right: 0px; bottom: 0px; left: 0px; padding: 0px; margin: 0px; gap: normal; display: block; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 16px; fontWeight: 400; lineHeight: 24px; letterSpacing: normal; color: rgb(245, 240, 235); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(245, 240, 235); borderRadius: 0px; boxShadow: color(srgb 0 0 0 / 0.1) 0px 1px 2px 0px, color(srgb 0 0 0 / 0.02) 0px 10px 24px 0px; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: 1.33333 / 1; mixBlendMode: normal; transform: none |
| `span.work-card-tag` | width: 92.0104px; height: 26px; minHeight: 0px; maxWidth: none; position: absolute; top: 213.25px; right: 230.99px; bottom: 15px; left: 16px; padding: 7px 8px; margin: 0px; gap: normal; display: flex; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: center; justifyContent: normal | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 12px; fontWeight: 600; lineHeight: 12px; letterSpacing: 1.56px; color: rgb(157, 241, 51); backgroundColor: rgb(32, 32, 32); border: 0px solid rgb(157, 241, 51); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `h3.work-card-title` | width: 156.146px; height: 20px; minHeight: auto; maxWidth: none; position: static; top: auto; right: auto; bottom: auto; left: auto; padding: 0px; margin: 0px; gap: normal; display: block; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 20px; fontWeight: 500; lineHeight: 20px; letterSpacing: normal; color: rgb(0, 0, 0); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(0, 0, 0); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `article.work-card work-card-sm` | width: 339px; height: 286.25px; minHeight: auto; maxWidth: 100%; position: static; top: auto; right: auto; bottom: auto; left: auto; padding: 0px; margin: 0px; gap: 12px; display: flex; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: column; alignItems: flex-start; justifyContent: normal | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 16px; fontWeight: 400; lineHeight: 24px; letterSpacing: normal; color: rgb(245, 240, 235); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(245, 240, 235); borderRadius: 0px; boxShadow: none; zIndex: 4; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `span.work-card-tag` | width: 89.25px; height: 26px; minHeight: 0px; maxWidth: none; position: absolute; top: 213.25px; right: 233.75px; bottom: 15px; left: 16px; padding: 7px 8px; margin: 0px; gap: normal; display: flex; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: center; justifyContent: normal | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 12px; fontWeight: 600; lineHeight: 12px; letterSpacing: 1.56px; color: rgb(157, 241, 51); backgroundColor: rgb(32, 32, 32); border: 0px solid rgb(157, 241, 51); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `h3.work-card-title` | width: 154.062px; height: 20px; minHeight: auto; maxWidth: none; position: static; top: auto; right: auto; bottom: auto; left: auto; padding: 0px; margin: 0px; gap: normal; display: block; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 20px; fontWeight: 500; lineHeight: 20px; letterSpacing: normal; color: rgb(0, 0, 0); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(0, 0, 0); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `article.work-card work-card-lg` | width: 339px; height: 286.25px; minHeight: auto; maxWidth: 100%; position: static; top: auto; right: auto; bottom: auto; left: auto; padding: 0px; margin: 0px; gap: 12px; display: flex; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: column; alignItems: flex-start; justifyContent: normal | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 16px; fontWeight: 400; lineHeight: 24px; letterSpacing: normal; color: rgb(245, 240, 235); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(245, 240, 235); borderRadius: 0px; boxShadow: none; zIndex: 5; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `h3.work-card-title` | width: 64.8854px; height: 20px; minHeight: auto; maxWidth: none; position: static; top: auto; right: auto; bottom: auto; left: auto; padding: 0px; margin: 0px; gap: normal; display: block; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 20px; fontWeight: 500; lineHeight: 20px; letterSpacing: normal; color: rgb(0, 0, 0); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(0, 0, 0); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `article.work-card work-card-sm` | width: 339px; height: 280.427px; minHeight: auto; maxWidth: 100%; position: static; top: auto; right: auto; bottom: auto; left: auto; padding: 0px; margin: 0px; gap: 12px; display: flex; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: column; alignItems: flex-start; justifyContent: normal | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 16px; fontWeight: 400; lineHeight: 24px; letterSpacing: normal; color: rgb(245, 240, 235); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(245, 240, 235); borderRadius: 0px; boxShadow: none; zIndex: 6; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `a.work-card-thumb work-card-thumb--link` | width: 339px; height: 248.427px; minHeight: auto; maxWidth: none; position: relative; top: 0px; right: 0px; bottom: 0px; left: 0px; padding: 0px; margin: 0px; gap: normal; display: block; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 16px; fontWeight: 400; lineHeight: 24px; letterSpacing: normal; color: rgb(245, 240, 235); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(245, 240, 235); borderRadius: 0px; boxShadow: color(srgb 0 0 0 / 0.1) 0px 1px 2px 0px, color(srgb 0 0 0 / 0.02) 0px 10px 24px 0px; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: 1.36455 / 1; mixBlendMode: normal; transform: none |
| `span.work-card-tag` | width: 89.25px; height: 26px; minHeight: 0px; maxWidth: none; position: absolute; top: 207.427px; right: 233.75px; bottom: 15px; left: 16px; padding: 7px 8px; margin: 0px; gap: normal; display: flex; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: center; justifyContent: normal | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 12px; fontWeight: 600; lineHeight: 12px; letterSpacing: 1.56px; color: rgb(157, 241, 51); backgroundColor: rgb(32, 32, 32); border: 0px solid rgb(157, 241, 51); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `h3.work-card-title` | width: 101.521px; height: 20px; minHeight: auto; maxWidth: none; position: static; top: auto; right: auto; bottom: auto; left: auto; padding: 0px; margin: 0px; gap: normal; display: block; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 20px; fontWeight: 500; lineHeight: 20px; letterSpacing: normal; color: rgb(0, 0, 0); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(0, 0, 0); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `article.work-card work-card-lg` | width: 339px; height: 286.25px; minHeight: auto; maxWidth: 100%; position: static; top: auto; right: auto; bottom: auto; left: auto; padding: 0px; margin: 0px; gap: 12px; display: flex; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: column; alignItems: flex-start; justifyContent: normal | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 16px; fontWeight: 400; lineHeight: 24px; letterSpacing: normal; color: rgb(245, 240, 235); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(245, 240, 235); borderRadius: 0px; boxShadow: none; zIndex: 7; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `h3.work-card-title` | width: 112.188px; height: 20px; minHeight: auto; maxWidth: none; position: static; top: auto; right: auto; bottom: auto; left: auto; padding: 0px; margin: 0px; gap: normal; display: block; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 20px; fontWeight: 500; lineHeight: 20px; letterSpacing: normal; color: rgb(0, 0, 0); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(0, 0, 0); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `article.work-card work-card-lg` | width: 339px; height: 286.25px; minHeight: auto; maxWidth: 100%; position: static; top: auto; right: auto; bottom: auto; left: auto; padding: 0px; margin: 0px; gap: 12px; display: flex; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: column; alignItems: flex-start; justifyContent: normal | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 16px; fontWeight: 400; lineHeight: 24px; letterSpacing: normal; color: rgb(245, 240, 235); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(245, 240, 235); borderRadius: 0px; boxShadow: none; zIndex: 8; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `h3.work-card-title` | width: 96.2083px; height: 20px; minHeight: auto; maxWidth: none; position: static; top: auto; right: auto; bottom: auto; left: auto; padding: 0px; margin: 0px; gap: normal; display: block; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 20px; fontWeight: 500; lineHeight: 20px; letterSpacing: normal; color: rgb(0, 0, 0); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(0, 0, 0); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `article.work-card work-card-sm` | width: 339px; height: 280.427px; minHeight: auto; maxWidth: 100%; position: static; top: auto; right: auto; bottom: auto; left: auto; padding: 0px; margin: 0px; gap: 12px; display: flex; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: column; alignItems: flex-start; justifyContent: normal | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 16px; fontWeight: 400; lineHeight: 24px; letterSpacing: normal; color: rgb(245, 240, 235); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(245, 240, 235); borderRadius: 0px; boxShadow: none; zIndex: 9; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `h3.work-card-title` | width: 60.4688px; height: 20px; minHeight: auto; maxWidth: none; position: static; top: auto; right: auto; bottom: auto; left: auto; padding: 0px; margin: 0px; gap: normal; display: block; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 20px; fontWeight: 500; lineHeight: 20px; letterSpacing: normal; color: rgb(0, 0, 0); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(0, 0, 0); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |

## Computed layout at 1440px

| Element | Geometry / layout | Typography / paint / state |
| --- | --- | --- |
| `section.selected-work-outer` | width: 1440px; height: 7135px; minHeight: 0px; maxWidth: none; position: relative; top: 0px; right: 0px; bottom: 0px; left: 0px; padding: 0px; margin: 0px; gap: normal; display: block; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: "DM Sans", "DM Sans Fallback", ui-sans-serif, system-ui, sans-serif; fontSize: 16px; fontWeight: 400; lineHeight: 24px; letterSpacing: normal; color: rgb(245, 240, 235); backgroundColor: rgb(157, 241, 51); border: 0px solid rgb(245, 240, 235); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `div.selected-work font-heading` | width: 1440px; height: 824px; minHeight: 0px; maxWidth: 1440px; position: relative; top: 0px; right: 0px; bottom: 0px; left: 0px; padding: 0px; margin: 0px; gap: normal; display: block; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 16px; fontWeight: 400; lineHeight: 24px; letterSpacing: normal; color: rgb(245, 240, 235); backgroundColor: rgb(157, 241, 51); border: 0px solid rgb(245, 240, 235); borderRadius: 0px; boxShadow: none; zIndex: 1; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: matrix(1, 0, 0, 1, 0, 0) |
| `div.selected-work-heading` | width: 436.073px; height: 245.354px; minHeight: 0px; maxWidth: none; position: absolute; top: 46.4122px; right: 971.927px; bottom: 532.24px; left: 32px; padding: 0px; margin: 0px; gap: 38.6768px; display: flex; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: column; alignItems: flex-start; justifyContent: normal | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 16px; fontWeight: 400; lineHeight: 24px; letterSpacing: normal; color: rgb(245, 240, 235); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(245, 240, 235); borderRadius: 0px; boxShadow: none; zIndex: 2; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: difference; transform: matrix(1, 0, 0, 1, 1930, 0) |
| `h2.selected-work-title` | width: 436.073px; height: 128px; minHeight: auto; maxWidth: none; position: static; top: auto; right: auto; bottom: auto; left: auto; padding: 0px; margin: 0px; gap: normal; display: block; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 80px; fontWeight: 500; lineHeight: 64px; letterSpacing: -1.93384px; color: rgb(255, 255, 255); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(255, 255, 255); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `p.selected-work-description` | width: 155.812px; height: 22.625px; minHeight: auto; maxWidth: none; position: static; top: auto; right: auto; bottom: auto; left: auto; padding: 0px; margin: 0px; gap: normal; display: block; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: "DM Sans", "DM Sans Fallback", ui-sans-serif, system-ui, sans-serif; fontSize: 12.57px; fontWeight: 400; lineHeight: 22.626px; letterSpacing: normal; color: rgb(116, 119, 133); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(116, 119, 133); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `a.group relative flex shrink-0 cursor-pointer items-center justify-center  selected-work-cta` | width: 154.698px; height: 44.4688px; minHeight: 0px; maxWidth: none; position: relative; top: 0px; right: 0px; bottom: 0px; left: 0px; padding: 0px; margin: 0px; gap: normal; display: flex; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: center; justifyContent: center | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 16px; fontWeight: 400; lineHeight: 24px; letterSpacing: normal; color: rgb(245, 240, 235); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(245, 240, 235); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `div.work-viewport` | width: 1440px; height: 824px; minHeight: 0px; maxWidth: none; position: absolute; top: 0px; right: 0px; bottom: 0px; left: 0px; padding: 0px; margin: 0px; gap: normal; display: block; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 16px; fontWeight: 400; lineHeight: 24px; letterSpacing: normal; color: rgb(245, 240, 235); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(245, 240, 235); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: matrix(1, 0, 0, 1, 1930, 0) |
| `div.work-track` | width: 3358.11px; height: 760px; minHeight: 0px; maxWidth: none; position: absolute; top: 32px; right: -2277.8px; bottom: 32px; left: 359.695px; padding: 0px; margin: 0px; gap: normal; display: block; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 16px; fontWeight: 400; lineHeight: 24px; letterSpacing: normal; color: rgb(245, 240, 235); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(245, 240, 235); borderRadius: 0px; boxShadow: none; zIndex: 1; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: matrix(1, 0, 0, 1, 0, 0) |
| `article.work-card work-card-lg` | width: 425.438px; height: 340.812px; minHeight: 0px; maxWidth: 100%; position: absolute; top: 398.371px; right: 2932.68px; bottom: 20.8229px; left: 0px; padding: 0px; margin: 0px; gap: 11.6031px; display: flex; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: column; alignItems: flex-start; justifyContent: normal | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 16px; fontWeight: 400; lineHeight: 24px; letterSpacing: normal; color: rgb(245, 240, 235); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(245, 240, 235); borderRadius: 0px; boxShadow: none; zIndex: 1; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `a.work-card-thumb work-card-thumb--link` | width: 425.438px; height: 309.885px; minHeight: auto; maxWidth: none; position: relative; top: 0px; right: 0px; bottom: 0px; left: 0px; padding: 0px; margin: 0px; gap: normal; display: block; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 16px; fontWeight: 400; lineHeight: 24px; letterSpacing: normal; color: rgb(245, 240, 235); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(245, 240, 235); borderRadius: 0px; boxShadow: color(srgb 0 0 0 / 0.1) 0px 0.966921px 1.93384px 0px, color(srgb 0 0 0 / 0.02) 0px 9.66921px 23.2061px 0px; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: 1.37285 / 1; mixBlendMode: normal; transform: none |
| `span.work-card-tag` | width: 88.0417px; height: 25.125px; minHeight: 0px; maxWidth: none; position: absolute; top: 270.26px; right: 321.927px; bottom: 14.5038px; left: 15.4707px; padding: 6.76845px 7.73537px; margin: 0px; gap: normal; display: flex; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: center; justifyContent: normal | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 11.6031px; fontWeight: 600; lineHeight: 11.6031px; letterSpacing: 1.5084px; color: rgb(247, 80, 73); backgroundColor: rgb(32, 32, 32); border: 0px solid rgb(247, 80, 73); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `h3.work-card-title` | width: 80.0417px; height: 19.3333px; minHeight: auto; maxWidth: none; position: static; top: auto; right: auto; bottom: auto; left: auto; padding: 0px; margin: 0px; gap: normal; display: block; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 19.3384px; fontWeight: 500; lineHeight: 19.3384px; letterSpacing: normal; color: rgb(0, 0, 0); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(0, 0, 0); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `a.group relative flex items-center gap-1 work-card-visit` | width: 42.7917px; height: 11.6042px; minHeight: auto; maxWidth: none; position: relative; top: 0px; right: 0px; bottom: 0px; left: 0px; padding: 0px; margin: 0px; gap: 4px; display: flex; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: center; justifyContent: normal | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 11.6031px; fontWeight: 600; lineHeight: 11.6031px; letterSpacing: 1.5084px; color: color(srgb 0 0 0 / 0.55); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid color(srgb 0 0 0 / 0.55); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `article.work-card work-card-lg` | width: 425.438px; height: 338.885px; minHeight: 0px; maxWidth: 100%; position: absolute; top: 14.5038px; right: 2496.6px; bottom: 406.615px; left: 436.081px; padding: 0px; margin: 0px; gap: 11.6031px; display: flex; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: column; alignItems: flex-start; justifyContent: normal | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 16px; fontWeight: 400; lineHeight: 24px; letterSpacing: normal; color: rgb(245, 240, 235); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(245, 240, 235); borderRadius: 0px; boxShadow: none; zIndex: 2; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `a.work-card-thumb work-card-thumb--link` | width: 425.438px; height: 307.958px; minHeight: auto; maxWidth: none; position: relative; top: 0px; right: 0px; bottom: 0px; left: 0px; padding: 0px; margin: 0px; gap: normal; display: block; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 16px; fontWeight: 400; lineHeight: 24px; letterSpacing: normal; color: rgb(245, 240, 235); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(245, 240, 235); borderRadius: 0px; boxShadow: color(srgb 0 0 0 / 0.1) 0px 0.966921px 1.93384px 0px, color(srgb 0 0 0 / 0.02) 0px 9.66921px 23.2061px 0px; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: 1.38148 / 1; mixBlendMode: normal; transform: none |
| `span.work-card-tag` | width: 88.0417px; height: 25.125px; minHeight: 0px; maxWidth: none; position: absolute; top: 268.333px; right: 321.927px; bottom: 14.5038px; left: 15.4707px; padding: 6.76845px 7.73537px; margin: 0px; gap: normal; display: flex; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: center; justifyContent: normal | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 11.6031px; fontWeight: 600; lineHeight: 11.6031px; letterSpacing: 1.5084px; color: rgb(247, 80, 73); backgroundColor: rgb(32, 32, 32); border: 0px solid rgb(247, 80, 73); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `h3.work-card-title` | width: 65.6979px; height: 19.3333px; minHeight: auto; maxWidth: none; position: static; top: auto; right: auto; bottom: auto; left: auto; padding: 0px; margin: 0px; gap: normal; display: block; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 19.3384px; fontWeight: 500; lineHeight: 19.3384px; letterSpacing: normal; color: rgb(0, 0, 0); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(0, 0, 0); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `article.work-card work-card-sm` | width: 314.24px; height: 266.604px; minHeight: 0px; maxWidth: 100%; position: absolute; top: 488.295px; right: 2355.44px; bottom: 5.10417px; left: 688.448px; padding: 0px; margin: 0px; gap: 11.6031px; display: flex; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: column; alignItems: flex-start; justifyContent: normal | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 16px; fontWeight: 400; lineHeight: 24px; letterSpacing: normal; color: rgb(245, 240, 235); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(245, 240, 235); borderRadius: 0px; boxShadow: none; zIndex: 3; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `a.work-card-thumb work-card-thumb--link` | width: 314.24px; height: 235.677px; minHeight: auto; maxWidth: none; position: relative; top: 0px; right: 0px; bottom: 0px; left: 0px; padding: 0px; margin: 0px; gap: normal; display: block; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 16px; fontWeight: 400; lineHeight: 24px; letterSpacing: normal; color: rgb(245, 240, 235); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(245, 240, 235); borderRadius: 0px; boxShadow: color(srgb 0 0 0 / 0.1) 0px 0.966921px 1.93384px 0px, color(srgb 0 0 0 / 0.02) 0px 9.66921px 23.2061px 0px; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: 1.33333 / 1; mixBlendMode: normal; transform: none |
| `span.work-card-tag` | width: 88.9375px; height: 25.125px; minHeight: 0px; maxWidth: none; position: absolute; top: 196.052px; right: 209.833px; bottom: 14.5038px; left: 15.4707px; padding: 6.76845px 7.73537px; margin: 0px; gap: normal; display: flex; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: center; justifyContent: normal | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 11.6031px; fontWeight: 600; lineHeight: 11.6031px; letterSpacing: 1.5084px; color: rgb(157, 241, 51); backgroundColor: rgb(32, 32, 32); border: 0px solid rgb(157, 241, 51); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `h3.work-card-title` | width: 150.938px; height: 19.3333px; minHeight: auto; maxWidth: none; position: static; top: auto; right: auto; bottom: auto; left: auto; padding: 0px; margin: 0px; gap: normal; display: block; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 19.3384px; fontWeight: 500; lineHeight: 19.3384px; letterSpacing: normal; color: rgb(0, 0, 0); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(0, 0, 0); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `article.work-card work-card-sm` | width: 314.24px; height: 266.604px; minHeight: 0px; maxWidth: 100%; position: absolute; top: 162.443px; right: 2013.15px; bottom: 330.958px; left: 1030.74px; padding: 0px; margin: 0px; gap: 11.6031px; display: flex; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: column; alignItems: flex-start; justifyContent: normal | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 16px; fontWeight: 400; lineHeight: 24px; letterSpacing: normal; color: rgb(245, 240, 235); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(245, 240, 235); borderRadius: 0px; boxShadow: none; zIndex: 4; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `span.work-card-tag` | width: 86.2708px; height: 25.125px; minHeight: 0px; maxWidth: none; position: absolute; top: 196.052px; right: 212.5px; bottom: 14.5038px; left: 15.4707px; padding: 6.76845px 7.73537px; margin: 0px; gap: normal; display: flex; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: center; justifyContent: normal | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 11.6031px; fontWeight: 600; lineHeight: 11.6031px; letterSpacing: 1.5084px; color: rgb(157, 241, 51); backgroundColor: rgb(32, 32, 32); border: 0px solid rgb(157, 241, 51); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `h3.work-card-title` | width: 148.927px; height: 19.3333px; minHeight: auto; maxWidth: none; position: static; top: auto; right: auto; bottom: auto; left: auto; padding: 0px; margin: 0px; gap: normal; display: block; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 19.3384px; fontWeight: 500; lineHeight: 19.3384px; letterSpacing: normal; color: rgb(0, 0, 0); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(0, 0, 0); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `article.work-card work-card-lg` | width: 425.438px; height: 350px; minHeight: 0px; maxWidth: 100%; position: absolute; top: 291.043px; right: 1490.03px; bottom: 118.958px; left: 1442.65px; padding: 0px; margin: 0px; gap: 11.6031px; display: flex; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: column; alignItems: flex-start; justifyContent: normal | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 16px; fontWeight: 400; lineHeight: 24px; letterSpacing: normal; color: rgb(245, 240, 235); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(245, 240, 235); borderRadius: 0px; boxShadow: none; zIndex: 5; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `a.work-card-thumb work-card-thumb--link` | width: 425.438px; height: 319.073px; minHeight: auto; maxWidth: none; position: relative; top: 0px; right: 0px; bottom: 0px; left: 0px; padding: 0px; margin: 0px; gap: normal; display: block; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 16px; fontWeight: 400; lineHeight: 24px; letterSpacing: normal; color: rgb(245, 240, 235); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(245, 240, 235); borderRadius: 0px; boxShadow: color(srgb 0 0 0 / 0.1) 0px 0.966921px 1.93384px 0px, color(srgb 0 0 0 / 0.02) 0px 9.66921px 23.2061px 0px; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: 1.33333 / 1; mixBlendMode: normal; transform: none |
| `span.work-card-tag` | width: 88.9375px; height: 25.125px; minHeight: 0px; maxWidth: none; position: absolute; top: 279.448px; right: 321.031px; bottom: 14.5038px; left: 15.4707px; padding: 6.76845px 7.73537px; margin: 0px; gap: normal; display: flex; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: center; justifyContent: normal | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 11.6031px; fontWeight: 600; lineHeight: 11.6031px; letterSpacing: 1.5084px; color: rgb(157, 241, 51); backgroundColor: rgb(32, 32, 32); border: 0px solid rgb(157, 241, 51); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `h3.work-card-title` | width: 62.7188px; height: 19.3333px; minHeight: auto; maxWidth: none; position: static; top: auto; right: auto; bottom: auto; left: auto; padding: 0px; margin: 0px; gap: normal; display: block; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 19.3384px; fontWeight: 500; lineHeight: 19.3384px; letterSpacing: normal; color: rgb(0, 0, 0); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(0, 0, 0); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `article.work-card work-card-sm` | width: 314.24px; height: 261.208px; minHeight: 0px; maxWidth: 100%; position: absolute; top: 80.2544px; right: 1135.18px; bottom: 418.542px; left: 1908.7px; padding: 0px; margin: 0px; gap: 11.6031px; display: flex; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: column; alignItems: flex-start; justifyContent: normal | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 16px; fontWeight: 400; lineHeight: 24px; letterSpacing: normal; color: rgb(245, 240, 235); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(245, 240, 235); borderRadius: 0px; boxShadow: none; zIndex: 6; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `a.work-card-thumb work-card-thumb--link` | width: 314.24px; height: 230.281px; minHeight: auto; maxWidth: none; position: relative; top: 0px; right: 0px; bottom: 0px; left: 0px; padding: 0px; margin: 0px; gap: normal; display: block; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 16px; fontWeight: 400; lineHeight: 24px; letterSpacing: normal; color: rgb(245, 240, 235); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(245, 240, 235); borderRadius: 0px; boxShadow: color(srgb 0 0 0 / 0.1) 0px 0.966921px 1.93384px 0px, color(srgb 0 0 0 / 0.02) 0px 9.66921px 23.2061px 0px; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: 1.36455 / 1; mixBlendMode: normal; transform: none |
| `span.work-card-tag` | width: 86.2708px; height: 25.125px; minHeight: 0px; maxWidth: none; position: absolute; top: 190.656px; right: 212.5px; bottom: 14.5038px; left: 15.4707px; padding: 6.76845px 7.73537px; margin: 0px; gap: normal; display: flex; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: center; justifyContent: normal | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 11.6031px; fontWeight: 600; lineHeight: 11.6031px; letterSpacing: 1.5084px; color: rgb(157, 241, 51); backgroundColor: rgb(32, 32, 32); border: 0px solid rgb(157, 241, 51); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `h3.work-card-title` | width: 98.1458px; height: 19.3333px; minHeight: auto; maxWidth: none; position: static; top: auto; right: auto; bottom: auto; left: auto; padding: 0px; margin: 0px; gap: normal; display: block; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 19.3384px; fontWeight: 500; lineHeight: 19.3384px; letterSpacing: normal; color: rgb(0, 0, 0); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(0, 0, 0); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `article.work-card work-card-lg` | width: 425.438px; height: 350px; minHeight: 0px; maxWidth: 100%; position: absolute; top: 402.239px; right: 688.458px; bottom: 7.77083px; left: 2244.22px; padding: 0px; margin: 0px; gap: 11.6031px; display: flex; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: column; alignItems: flex-start; justifyContent: normal | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 16px; fontWeight: 400; lineHeight: 24px; letterSpacing: normal; color: rgb(245, 240, 235); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(245, 240, 235); borderRadius: 0px; boxShadow: none; zIndex: 7; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `span.work-card-tag` | width: 86.2708px; height: 25.125px; minHeight: 0px; maxWidth: none; position: absolute; top: 279.448px; right: 323.698px; bottom: 14.5038px; left: 15.4707px; padding: 6.76845px 7.73537px; margin: 0px; gap: normal; display: flex; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: center; justifyContent: normal | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 11.6031px; fontWeight: 600; lineHeight: 11.6031px; letterSpacing: 1.5084px; color: rgb(157, 241, 51); backgroundColor: rgb(32, 32, 32); border: 0px solid rgb(157, 241, 51); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `h3.work-card-title` | width: 108.448px; height: 19.3333px; minHeight: auto; maxWidth: none; position: static; top: auto; right: auto; bottom: auto; left: auto; padding: 0px; margin: 0px; gap: normal; display: block; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 19.3384px; fontWeight: 500; lineHeight: 19.3384px; letterSpacing: normal; color: rgb(0, 0, 0); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(0, 0, 0); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `article.work-card work-card-lg` | width: 425.438px; height: 350px; minHeight: 0px; maxWidth: 100%; position: absolute; top: 0px; right: 335.531px; bottom: 410px; left: 2597.15px; padding: 0px; margin: 0px; gap: 11.6031px; display: flex; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: column; alignItems: flex-start; justifyContent: normal | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 16px; fontWeight: 400; lineHeight: 24px; letterSpacing: normal; color: rgb(245, 240, 235); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(245, 240, 235); borderRadius: 0px; boxShadow: none; zIndex: 8; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `h3.work-card-title` | width: 93px; height: 19.3333px; minHeight: auto; maxWidth: none; position: static; top: auto; right: auto; bottom: auto; left: auto; padding: 0px; margin: 0px; gap: normal; display: block; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 19.3384px; fontWeight: 500; lineHeight: 19.3384px; letterSpacing: normal; color: rgb(0, 0, 0); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(0, 0, 0); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `article.work-card work-card-sm` | width: 314.24px; height: 261.208px; minHeight: 0px; maxWidth: 100%; position: absolute; top: 492.163px; right: 0.0104167px; bottom: 6.63542px; left: 3043.87px; padding: 0px; margin: 0px; gap: 11.6031px; display: flex; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: column; alignItems: flex-start; justifyContent: normal | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 16px; fontWeight: 400; lineHeight: 24px; letterSpacing: normal; color: rgb(245, 240, 235); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(245, 240, 235); borderRadius: 0px; boxShadow: none; zIndex: 9; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `h3.work-card-title` | width: 58.4479px; height: 19.3333px; minHeight: auto; maxWidth: none; position: static; top: auto; right: auto; bottom: auto; left: auto; padding: 0px; margin: 0px; gap: normal; display: block; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 19.3384px; fontWeight: 500; lineHeight: 19.3384px; letterSpacing: normal; color: rgb(0, 0, 0); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(0, 0, 0); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |


## Decoded desktop travel and handoff

Source-16.js: total pin distance = trackTravel + handoffTravel + exitLead + exitTravel + .6*innerHeight.

- trackTravel = max(0, computed track left + track bounding width - sixth shared vertical line position relative to section); if line absent use section width.
- handoffTravel = innerWidth*1.34/.94.
- exitLead = max(0, sixth shared vertical line viewport x - .75*innerWidth); if line absent use innerWidth.
- exitTravel = max(innerHeight, .75*innerWidth).
- Normalize these phases by total distance. Handoff local progress remaps (phaseProgress-.06)/.94, clamps 0..1, then quadratic in/out: below .5, (2*t)^2/2; otherwise 1-(2*(1-t))^2/2.
- Intro starts once handoff reaches .3. Track x = -(trackTravel*trackPhase + exitLead*leadPhase + .75*innerWidth*exitPhase).
- Path sampling uses 721 samples (indices 0..720). Diamond scale entrance .35s power2.out when its center reaches .75*innerWidth.
- CTA reveal observes .9 intersection; .7*abs(target-current) seconds, ease none; second observer uses rootMargin 0px -25% 0px 0px and threshold 1.

These are verified formulas. A five-card target changes measured distances; the original path artwork must be replaced with neutral geometry and is APPROXIMATED.
