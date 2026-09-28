# Header and navigation

## Evidence and scope

Source inspected 2026-09-28. Local evidence: docs/recon/REPORT.md, source-*.css/js, spec-computed-{375,768,1440}.json, existing full-page crops and recorded scroll states. No repeat screenshots. Only structure/styles/motion are adopted; all copy and destinations come from src/content/site.ts.

Measurements below are source computed values at viewport height 900px, scroll top 0; transformed rectangles are state-dependent and are not universal CSS dimensions. Repeated elements may have distinct sizes. Source class names identify evidence and need not become target component names.

## Layout

Sticky nav inside the nested scroll container; top 0, z-index 50. Height 76px at all three reference widths. Padding 20px 16px at 375; 20px 32px at 768/1440. Fixed menu z-index 90; cursor ring 60. Replace branding with Sreeram text. Keep all destinations in site.ts.

Phase 4 computed-style addendum (Playwright, no capture): menu panel top/bottom 50px, max-height 760px; min-width 640px has width 380px/right 50px; below 640px left/right 24px. Background rgb(37,39,47). Menu text Rajdhani 500, 56px/48.16px desktop, 40px/34.4px mobile. List margin-top 68px. Hover surface transition 180ms cubic-bezier(.34,1.56,.64,1). Audio omitted by user decision. Branded loader omitted; page remains non-blocking.

## States and interactions

Phase 5 source addendum: source-13.js initializes panel x to viewport width and items y to 28px. Source-14.js hover decode is per character, .35s ease none, stagger .014s, speed .5, revealDelay .05; punctuation alphabet matches the captured GLITCH_CHARS constant.

Closed, opening, open, closing; focus/hover link scramble; Escape closes. Opening: backdrop opacity .75, .4s power2.out; panel x to 0, .175s power2.out; items opacity 1/y 0/scale 1, .7s power2.out, stagger .1s starting .4s. Closing: panel .2s power2.in; backdrop .3s power2.in delayed .1s. Keyboard focus must enter the menu and return to its button (target accessibility requirement).

## Responsive behavior

375: branding and menu; status controls hidden. 768: sm controls visible (40rem). 1440: full status row; additional utilities use 64rem. Landscape/coarse-pointer guard condition: landscape, max-height 500px. Reduced motion: instantaneous menu and no cursor animation.

Custom breakpoints: mobile max-width 767.98px; tablet 768px–1024.98px; desktop min-width 1025px. Nav utility breakpoint 40rem. Retain fluid formulas rather than interpolating measured snapshots.

## Component tree

`Header > IdentityLink + StatusControls + MenuButton; MenuOverlay > Backdrop + NavigationLinks + ConnectionLinks. Global BootCover and LandscapeGuard are siblings.`

## Animation libraries

GSAP core + ScrambleTextPlugin; CSS hover transitions. Global Lenis/ScrollTrigger foundation.

## Flags and handling

| Status / item | Handling |
| --- | --- |
| UNVERIFIED: source audio behavior/assets | Do not reuse audio. Omit audio playback until user supplies licensed media; no extra dependency. |
| UNVERIFIED: full loader choreography | Session loader existence and 4000ms boot / 6000ms fallback are verified; omit branded loader rather than invent timings. Static boot cover only if needed. |
| UNVERIFIED: external destinations | Approved: all external href values are # in site.ts; internal navigation targets local sections. |

Tailwind source version is UNVERIFIED but explicitly approved to ignore: use installed Tailwind v4. No additional package needed. Reduced-motion and keyboard behavior above are target requirements where the source did not establish equivalent behavior.

## Layout property reference

Property tables retain cascade order and media conditions; no source implementation is included. Tokens map to the verified OKLCH equivalents in globals.css. Source utility classes are additionally represented by the computed tables below.

Context: `@layer base`

Reference element: `ol,ul,menu`.

| Property / input | Specified value |
| --- | --- |
| list-style | none |


Context: `@layer components;@layer utilities`

Reference element: `.bg-\[var\(--menu-accent\)\]`.

| Property / input | Specified value |
| --- | --- |
| background-color | var(--menu-accent) |


Context: `@layer components;@layer utilities`

Reference element: `.bg-\[var\(--menu-text-black\)\]`.

| Property / input | Specified value |
| --- | --- |
| background-color | var(--menu-text-black) |


Context: `@layer components;@layer utilities`

Reference element: `.text-\[var\(--menu-text-white\)\]`.

| Property / input | Specified value |
| --- | --- |
| color | var(--menu-text-white) |


Context: `@layer components;@layer utilities / @media (hover:hover)`

Reference element: `.group-hover\:text-\[var\(--menu-text-black\)\]:is(:where(.group):hover *)`.

| Property / input | Specified value |
| --- | --- |
| color | var(--menu-text-black) |


Context: `@layer components;@layer utilities`

Reference element: `.group-data-\[active\=true\]\:bg-\[var\(--menu-active-bg\)\]:is(:where(.group)[data-active=true] *)`.

| Property / input | Specified value |
| --- | --- |
| background-color | var(--menu-active-bg) |


Context: `@layer components;@layer utilities`

Reference element: `.group-data-\[active\=true\]\:text-\[var\(--menu-text-black\)\]:is(:where(.group)[data-active=true] *)`.

| Property / input | Specified value |
| --- | --- |
| color | var(--menu-text-black) |


Context: `base`

Reference element: `.cursor-progress-ring`.

| Property / input | Specified value |
| --- | --- |
| z-index | 60 |
| opacity | 0 |
| pointer-events | none |
| will-change | transform |
| mix-blend-mode | difference |
| position | fixed |
| top | 0 |
| left | 0 |


## Computed layout at 375px

| Element | Geometry / layout | Typography / paint / state |
| --- | --- | --- |
| `nav.nav` | width: 375.333px; height: 76px; minHeight: 0px; maxWidth: none; position: sticky; top: 0px; right: auto; bottom: auto; left: auto; padding: 20px 16px; margin: 0px; gap: normal; display: flex; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: center; justifyContent: space-between | fontFamily: "DM Sans", "DM Sans Fallback", ui-sans-serif, system-ui, sans-serif; fontSize: 16px; fontWeight: 400; lineHeight: 24px; letterSpacing: normal; color: rgb(245, 240, 235); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(245, 240, 235); borderRadius: 0px; boxShadow: none; zIndex: 50; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `div.cursor-progress-ring` | width: 60px; height: 60px; minHeight: 0px; maxWidth: none; position: fixed; top: 0px; right: 315.333px; bottom: 840px; left: 0px; padding: 0px; margin: 0px; gap: normal; display: block; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: "DM Sans", "DM Sans Fallback", ui-sans-serif, system-ui, sans-serif; fontSize: 16px; fontWeight: 400; lineHeight: 24px; letterSpacing: normal; color: rgb(245, 240, 235); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(245, 240, 235); borderRadius: 0px; boxShadow: none; zIndex: 60; clipPath: none; opacity: 0; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: difference; transform: none |

## Computed layout at 768px

| Element | Geometry / layout | Typography / paint / state |
| --- | --- | --- |
| `nav.nav` | width: 768px; height: 76px; minHeight: 0px; maxWidth: none; position: sticky; top: 0px; right: auto; bottom: auto; left: auto; padding: 20px 32px; margin: 0px; gap: normal; display: flex; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: center; justifyContent: space-between | fontFamily: "DM Sans", "DM Sans Fallback", ui-sans-serif, system-ui, sans-serif; fontSize: 16px; fontWeight: 400; lineHeight: 24px; letterSpacing: normal; color: rgb(245, 240, 235); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(245, 240, 235); borderRadius: 0px; boxShadow: none; zIndex: 50; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `div.cursor-progress-ring` | width: 60px; height: 60px; minHeight: 0px; maxWidth: none; position: fixed; top: 0px; right: 708px; bottom: 840px; left: 0px; padding: 0px; margin: 0px; gap: normal; display: block; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: "DM Sans", "DM Sans Fallback", ui-sans-serif, system-ui, sans-serif; fontSize: 16px; fontWeight: 400; lineHeight: 24px; letterSpacing: normal; color: rgb(245, 240, 235); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(245, 240, 235); borderRadius: 0px; boxShadow: none; zIndex: 60; clipPath: none; opacity: 0; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: difference; transform: none |

## Computed layout at 1440px

| Element | Geometry / layout | Typography / paint / state |
| --- | --- | --- |
| `nav.nav` | width: 1440px; height: 76px; minHeight: 0px; maxWidth: none; position: sticky; top: 0px; right: auto; bottom: auto; left: auto; padding: 20px 32px; margin: 0px; gap: normal; display: flex; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: center; justifyContent: space-between | fontFamily: "DM Sans", "DM Sans Fallback", ui-sans-serif, system-ui, sans-serif; fontSize: 16px; fontWeight: 400; lineHeight: 24px; letterSpacing: normal; color: rgb(245, 240, 235); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(245, 240, 235); borderRadius: 0px; boxShadow: none; zIndex: 50; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `div.cursor-progress-ring` | width: 60px; height: 60px; minHeight: 0px; maxWidth: none; position: fixed; top: 0px; right: 1380px; bottom: 840px; left: 0px; padding: 0px; margin: 0px; gap: normal; display: block; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: "DM Sans", "DM Sans Fallback", ui-sans-serif, system-ui, sans-serif; fontSize: 16px; fontWeight: 400; lineHeight: 24px; letterSpacing: normal; color: rgb(245, 240, 235); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(245, 240, 235); borderRadius: 0px; boxShadow: none; zIndex: 60; clipPath: none; opacity: 0; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: difference; transform: none |

## Phase 5 motion verification

- Menu panel uses measured viewport-width travel, y28 item entry and the recorded opening/closing timelines. Per-character hover decode uses source-14 timing. Escape, backdrop dismissal and focus return work at 375/768/1440; live reduced-motion changes finish immediately.
- Source-13 cursor: 60px circle/r29.5, pointer center offset30, quickTo .2s power3, stroke offset from nested scroll progress. Only fine pointers with no reduced motion activate it.
- Source-0 CSS landscape guard: landscape + height<=500px + coarse pointer, z99999, .75rem gap, 2rem padding; own orientation copy in site.ts. Loader/audio omissions remain as approved.
