# Statistics and tools

## Evidence and scope

Source inspected 2026-09-28. Local evidence: docs/recon/REPORT.md, source-*.css/js, spec-computed-{375,768,1440}.json, existing full-page crops and recorded scroll states. No repeat screenshots. Only structure/styles/motion are adopted; all copy and destinations come from src/content/site.ts.

Measurements below are source computed values at viewport height 900px, scroll top 0; transformed rectangles are state-dependent and are not universal CSS dimensions. Repeated elements may have distinct sizes. Source class names identify evidence and need not become target component names.

## Layout

Seven boxes: three counters and four tool icons. Desktop lime stage z-index 30; lead max(8vh, nav-height), dock dead scroll 250px. Desktop stage measured height 900px/canvas 824px. Mobile/tablet stage 976px at reference height. Tool imagery replaces branded SVGs with neutral symbols in the same 85px boxes. Box geometry and border rules below.

## States and interactions

Once entry on top 75% or positive column progress, whichever occurs first. Box order 1,2,3,4,7,8,5; starts .16*i. Height growth .26s power2.out; width .4s power3.out starts .26s later. Label .55s none starts +.4s; odometer y and digit-width .7s power2.out starts +.4s. Box-1 heading .55s none starts +.05s; box-2 glyph scale .66s back.out(1.6). Decorative notches y -56 to 56, scrub from top bottom to bottom top. Hover icon pairs exist; mobile opacity swap was not observed.

## Responsive behavior

375: two narrow box columns, label 12px/12px/1.56px weight 600; counter 56px/47.6px/-1.12px. 768: counter 88px/74.8px/-1.76px, same label. 1440: counter 100px/85px/-2px; label 16px/16px/2.08px weight 700. Desktop stage overlaps later content; tablet/mobile use source margin-top handoff formula. Reduced motion: static counters and symbols, no transforms or odometers.

Custom breakpoints: mobile max-width 767.98px; tablet 768px–1024.98px; desktop min-width 1025px. Nav utility breakpoint 40rem. Retain fluid formulas rather than interpolating measured snapshots.

## Component tree

`StatisticsTools > Heading + StatGrid > three CounterBoxes + four ToolBoxes; central DecorativeGlyphCanvas. CounterBox > Label + OdometerDigits + Suffix.`

## Animation libraries

GSAP + ScrollTrigger + ScrambleTextPlugin; Three.js custom extruded geometry/material/postprocessing.

## Flags and handling

| Status / item | Handling |
| --- | --- |
| APPROXIMATED: neutral glyph and tool artwork | Use original simple geometry and neutral tool marks; never copy source logo SVG. Preserve measured boxes and verified light/dither pipeline. |
| UNVERIFIED: tool hover swap at narrow width | Use hover effects only on hover:hover; static icon on touch. Do not claim narrow-width swap verified. |
| UNVERIFIED: personal statistics | Use labeled placeholders from site.ts; no invented achievement counts. |

Tailwind source version is UNVERIFIED but explicitly approved to ignore: use installed Tailwind v4. No additional package needed. Reduced-motion and keyboard behavior above are target requirements where the source did not establish equivalent behavior.

## Layout property reference

Property tables retain cascade order and media conditions; no source implementation is included. Tokens map to the verified OKLCH equivalents in globals.css. Source utility classes are additionally represented by the computed tables below.

Context: `base`

Reference element: `.stat-box`.

| Property / input | Specified value |
| --- | --- |
| --oh | 0 |
| --ow | 0 |
| clip-path | inset(calc((1 - var(--oh)) * 50%) calc((1 - var(--ow)) * (100% - 1px)) calc((1 - var(--oh)) * 50%) 0) |


Context: `base`

Reference element: `.stat-stage`.

| Property / input | Specified value |
| --- | --- |
| z-index | 30 |
| background | var(--primary-green-neon) |
| --grid-line-color | var(--primary-green-line) |
| --grid-line-fade-to | var(--primary-green-neon) |
| --stat-lead-in | max(8vh, var(--nav-height,5rem)) |
| --stat-lead-out | 0rem |
| --stat-dead-scroll | 250px |
| will-change | transform |
| width | 100% |
| position | relative |
| overflow | hidden |


Context: `@media (min-width:1025px) and (prefers-reduced-motion:no-preference)`

Reference element: `.stat-stage`.

| Property / input | Specified value |
| --- | --- |
| margin-bottom | calc(var(--stat-dead-scroll,250px) - 2 * (100dvh - var(--nav-height,5rem)) - var(--stat-lead-in,0px) - var(--stat-lead-out,0px)) |


Context: `base`

Reference element: `.stat-stage[data-transition=active]`.

| Property / input | Specified value |
| --- | --- |
| background | 0 0 |


Context: `base`

Reference element: `.stat-stage[data-transition=active]~.selected-work-outer`.

| Property / input | Specified value |
| --- | --- |
| visibility | hidden |


Context: `base`

Reference element: `.stat-stage[data-transition=active] .stat-canvas:before`.

| Property / input | Specified value |
| --- | --- |
| content | "" |
| z-index | -1 |
| background | var(--primary-green-neon) |
| position | absolute |
| inset | 0 |


Context: `base`

Reference element: `.stat-section`.

| Property / input | Specified value |
| --- | --- |
| width | 100% |
| height | calc(100dvh + var(--stat-lead-in,0px) + var(--stat-lead-out,0px)) |
| --canvas-ratio | 1.8 |
| font-family | var(--font-heading) |
| position | relative |
| overflow | hidden |


Context: `base`

Reference element: `.stat-stage>.shared-grid-lines`.

| Property / input | Specified value |
| --- | --- |
| z-index | 1 |


Context: `base`

Reference element: `.stat-canvas`.

| Property / input | Specified value |
| --- | --- |
| top | calc(50% + var(--stat-lead-in,0px) / 2 - var(--stat-lead-out,0px) / 2) |
| width | min(100vw, calc(100dvh * var(--canvas-ratio))) |
| height | min(100dvh, calc(100vw / var(--canvas-ratio))) |
| position | absolute |
| left | 50% |
| transform | translate(-50%,-50%) |


Context: `base`

Reference element: `.stat-box`.

| Property / input | Specified value |
| --- | --- |
| will-change | clip-path |
| --box-fill | var(--primary-green-box) |
| --box-stroke | var(--primary-green-box-stroke) |
| --box-text | var(--background-bg-0) |
| position | absolute |


Context: `base`

Reference element: `.stat-box-bg`.

| Property / input | Specified value |
| --- | --- |
| --stat-box-shape | polygon(0 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 125px, 11.71px 113px, 11.71px 52px, 0 40px) |
| background | var(--box-stroke) |
| clip-path | var(--stat-box-shape) |
| transition | background-color .2s |
| position | absolute |
| inset | 0 |


Context: `base`

Reference element: `.stat-box-bg:after`.

| Property / input | Specified value |
| --- | --- |
| content | "" |
| background | var(--box-fill) |
| clip-path | var(--stat-box-shape) |
| transition | background-color .2s |
| position | absolute |
| inset | 2px |


Context: `base`

Reference element: `.stat-box--icon`.

| Property / input | Specified value |
| --- | --- |
| position | absolute |


Context: `base`

Reference element: `.stat-label`.

| Property / input | Specified value |
| --- | --- |
| width | 11.5rem |
| font-family | var(--font-heading) |
| letter-spacing | .13em |
| text-transform | uppercase |
| text-align | right |
| color | var(--box-text,var(--background-bg-0)) |
| margin | 0 |
| font-size | .75rem |
| font-weight | 600 |
| line-height | 1 |
| transition | color .2s |
| position | absolute |
| top | 16px |
| right | 16px |


Context: `base`

Reference element: `.stat-value`.

| Property / input | Specified value |
| --- | --- |
| font-family | var(--font-heading) |
| letter-spacing | -.02em |
| text-align | left |
| color | var(--box-text,var(--background-bg-0)) |
| white-space | nowrap |
| font-variant-numeric | tabular-nums |
| --odo-cell-h | 1em |
| --odo-cell-pad | 0px |
| align-items | flex-start |
| margin | 0 |
| font-size | 3.5rem |
| font-weight | 500 |
| line-height | .85 |
| transition | color .2s |
| display | flex |
| position | absolute |
| bottom | 0 |
| left | 20px |


Context: `base`

Reference element: `.odometer-digit`.

| Property / input | Specified value |
| --- | --- |
| height | var(--odo-cell-h) |
| line-height | 1 |
| display | inline-block |
| overflow | hidden |


Context: `base`

Reference element: `.odometer-digit-strip`.

| Property / input | Specified value |
| --- | --- |
| will-change | transform |
| flex-direction | column |
| align-items | center |
| display | flex |


Context: `base`

Reference element: `.odometer-digit-strip span`.

| Property / input | Specified value |
| --- | --- |
| height | var(--odo-cell-h) |
| line-height | 1 |
| display | block |


Context: `base`

Reference element: `.odometer-suffix`.

| Property / input | Specified value |
| --- | --- |
| display | inline-block |


Context: `base`

Reference element: `.stat-box--icon img`.

| Property / input | Specified value |
| --- | --- |
| aspect-ratio | 1 |
| object-fit | contain |
| pointer-events | none |
| mix-blend-mode | normal |
| width | 30% |
| height | auto |
| transition | opacity .15s |
| position | absolute |
| bottom | 16px |
| left | 16px |


Context: `base`

Reference element: `.tool-logo--hover,.stat-box:hover .tool-logo--default`.

| Property / input | Specified value |
| --- | --- |
| opacity | 0 |


Context: `base`

Reference element: `.stat-box:hover .tool-logo--hover`.

| Property / input | Specified value |
| --- | --- |
| opacity | 1 |


Context: `base`

Reference element: `.stat-box-notch`.

| Property / input | Specified value |
| --- | --- |
| background | var(--primary-green-neon) |
| clip-path | polygon(0 0,100% 0,0 100%) |
| opacity | 0 |
| pointer-events | none |
| width | 16px |
| height | 16px |
| transition | opacity .15s |
| position | absolute |
| top | 16px |
| left | 16px |


Context: `base`

Reference element: `.stat-box:hover .stat-box-notch`.

| Property / input | Specified value |
| --- | --- |
| opacity | 1 |


Context: `base`

Reference element: `.stat-heading`.

| Property / input | Specified value |
| --- | --- |
| will-change | clip-path |
| font-family | var(--font-heading) |
| font-weight | var(--section-heading-weight) |
| letter-spacing | -.025em |
| text-transform | uppercase |
| color | var(--text-white) |
| mix-blend-mode | difference |
| margin | 0 |
| font-size | 5rem |
| line-height | .8 |
| display | none |
| position | absolute |


Context: `base`

Reference element: `.stat-heading-line`.

| Property / input | Specified value |
| --- | --- |
| display | block |


Context: `base`

Reference element: `.stat-heading-logo`.

| Property / input | Specified value |
| --- | --- |
| will-change | transform |
| width | 100% |
| height | 100% |
| display | block |
| transform | scale(0) |


Context: `@media (min-width:1025px)`

Reference element: `.stat-section`.

| Property / input | Specified value |
| --- | --- |
| height | calc(100dvh - var(--nav-height,5rem) + var(--stat-lead-in,0px) + var(--stat-lead-out,0px)) |
| --line-gap | calc(20% - .8rem) |
| --box-w | var(--line-gap) |
| --col-1 | 2rem |
| --col-2 | calc(20% + 1.2rem) |
| --col-3 | calc(40% + .4rem) |
| --col-4 | calc(60% - .4rem) |
| --col-5 | calc(80% - 1.2rem) |
| --row-h | calc((100% - 4rem) / 3) |
| --row-1 | 2rem |
| --row-2 | calc(2rem + var(--row-h)) |
| --row-3 | calc(2rem + var(--row-h) * 2) |


Context: `@media (min-width:1025px)`

Reference element: `.stat-canvas`.

| Property / input | Specified value |
| --- | --- |
| top | var(--stat-lead-in,0px) |
| width | 100% |
| height | calc(100% - var(--stat-lead-in,0px) - var(--stat-lead-out,0px)) |
| bottom | 0 |
| left | 0 |
| right | 0 |
| transform | none |


Context: `@media (min-width:1025px)`

Reference element: `.stat-label`.

| Property / input | Specified value |
| --- | --- |
| font-size | 1rem |
| font-weight | 700 |


Context: `@media (min-width:1025px)`

Reference element: `.stat-box--icon img`.

| Property / input | Specified value |
| --- | --- |
| width | 5.3125rem |


Context: `@media (min-width:1025px)`

Reference element: `.stat-value`.

| Property / input | Specified value |
| --- | --- |
| font-size | 6.25rem |


Context: `@media (min-width:1025px)`

Reference element: `.stat-box,.stat-heading`.

| Property / input | Specified value |
| --- | --- |
| top | var(--row-1) |
| left | var(--col-1) |
| width | var(--box-w) |
| height | var(--row-h) |


Context: `@media (min-width:1025px)`

Reference element: `.stat-heading`.

| Property / input | Specified value |
| --- | --- |
| flex-direction | column |
| justify-content | flex-end |
| display | flex |


Context: `@media (min-width:1025px)`

Reference element: `.box-1`.

| Property / input | Specified value |
| --- | --- |
| left | var(--col-1) |


Context: `@media (min-width:1025px)`

Reference element: `.box-4`.

| Property / input | Specified value |
| --- | --- |
| left | var(--col-3) |


Context: `@media (min-width:1025px)`

Reference element: `.box-5`.

| Property / input | Specified value |
| --- | --- |
| left | var(--col-5) |


Context: `@media (min-width:1025px)`

Reference element: `.box-2`.

| Property / input | Specified value |
| --- | --- |
| top | var(--row-2) |
| left | var(--col-2) |


Context: `@media (min-width:1025px)`

Reference element: `.box-7`.

| Property / input | Specified value |
| --- | --- |
| top | var(--row-2) |
| left | var(--col-4) |


Context: `@media (min-width:1025px)`

Reference element: `.stat-heading`.

| Property / input | Specified value |
| --- | --- |
| top | var(--row-3) |
| left | var(--col-1) |


Context: `@media (min-width:1025px)`

Reference element: `.box-3`.

| Property / input | Specified value |
| --- | --- |
| top | var(--row-3) |
| left | var(--col-3) |


Context: `@media (min-width:1025px)`

Reference element: `.box-8`.

| Property / input | Specified value |
| --- | --- |
| top | var(--row-3) |
| left | var(--col-5) |


Context: `@media (min-width:1025px)`

Reference element: `.stat-box:hover`.

| Property / input | Specified value |
| --- | --- |
| --box-fill | #620ecc |
| --box-stroke | #480f91 |
| --box-text | var(--text-white) |


Context: `@media (max-width:1024.98px)`

Reference element: `.stat-stage`.

| Property / input | Specified value |
| --- | --- |
| --stat-dock-dead | 0px |
| margin-top | calc(var(--stat-dock-dead) + var(--nav-height,5rem) - 100dvh - var(--stat-lead-in,0px)) |


Context: `@media (max-width:1024.98px)`

Reference element: `.stat-section`.

| Property / input | Specified value |
| --- | --- |
| --canvas-ratio | .4603 |
| --stat-edge-inset | 16px |
| --canvas-letterbox-inset | calc((100vw - min(100vw, calc(100dvh * var(--canvas-ratio)))) / 2) |


Context: `@media (max-width:1024.98px)`

Reference element: `.stat-box--stat`.

| Property / input | Specified value |
| --- | --- |
| gap | 1rem |


Context: `@media (max-width:1024.98px)`

Reference element: `.stat-section`.

| Property / input | Specified value |
| --- | --- |
| --stat-content-w | calc(100vw - 2 * var(--stat-edge-inset)) |
| --stat-gap-x | 12px |
| --stat-gap-y | 12px |
| --stat-box-ratio | 1.2201 |
| --stat-box-w | calc((var(--stat-content-w) - var(--stat-gap-x)) / 2) |
| --stat-box-h | calc(var(--stat-box-w) / var(--stat-box-ratio)) |
| --stat-col-1 | calc(var(--stat-edge-inset) - var(--canvas-letterbox-inset)) |
| --stat-col-2 | calc(var(--stat-col-1) + var(--stat-box-w) + var(--stat-gap-x)) |
| --stat-row-pitch | calc(var(--stat-box-h) + var(--stat-gap-y)) |
| --stat-grid-top | 2rem |


Context: `@media (max-width:1024.98px)`

Reference element: `.stat-box,.stat-heading`.

| Property / input | Specified value |
| --- | --- |
| top | var(--stat-grid-top) |
| left | var(--stat-col-1) |
| width | var(--stat-box-w) |
| height | var(--stat-box-h) |
| bottom | auto |
| right | auto |


Context: `@media (max-width:1024.98px)`

Reference element: `.box-2`.

| Property / input | Specified value |
| --- | --- |
| left | var(--stat-col-2) |


Context: `@media (max-width:1024.98px)`

Reference element: `.box-3`.

| Property / input | Specified value |
| --- | --- |
| top | calc(var(--stat-grid-top) + var(--stat-row-pitch)) |


Context: `@media (max-width:1024.98px)`

Reference element: `.box-4`.

| Property / input | Specified value |
| --- | --- |
| top | calc(var(--stat-grid-top) + var(--stat-row-pitch)) |
| left | var(--stat-col-2) |


Context: `@media (max-width:1024.98px)`

Reference element: `.box-5`.

| Property / input | Specified value |
| --- | --- |
| top | calc(var(--stat-grid-top) + 2 * var(--stat-row-pitch)) |


Context: `@media (max-width:1024.98px)`

Reference element: `.box-7`.

| Property / input | Specified value |
| --- | --- |
| top | calc(var(--stat-grid-top) + 2 * var(--stat-row-pitch)) |
| left | var(--stat-col-2) |


Context: `@media (max-width:1024.98px)`

Reference element: `.box-8`.

| Property / input | Specified value |
| --- | --- |
| top | calc(var(--stat-grid-top) + 3 * var(--stat-row-pitch)) |


Context: `@media (max-width:1024.98px)`

Reference element: `.stat-heading`.

| Property / input | Specified value |
| --- | --- |
| top | calc(var(--stat-grid-top) + 3 * var(--stat-row-pitch)) |
| left | var(--stat-col-2) |
| display | block |


Context: `@media (max-width:1024.98px)`

Reference element: `.stat-canvas`.

| Property / input | Specified value |
| --- | --- |
| z-index | 2 |


Context: `@media (max-width:1024.98px)`

Reference element: `.stat-canvas:before`.

| Property / input | Specified value |
| --- | --- |
| content | "" |
| top | 0 |
| bottom | 0 |
| left | 0 |
| right | min(0px, calc(100% - var(--stat-col-2) - var(--stat-box-w) + 2px)) |
| z-index | -1 |
| background | var(--primary-green-neon) |
| position | absolute |


Context: `@media (max-width:1024.98px)`

Reference element: `.stat-stage[data-transition=active] .stat-canvas:before`.

| Property / input | Specified value |
| --- | --- |
| right | min(0px, calc(100% - var(--stat-col-2) - var(--stat-box-w) + 2px)) |


Context: `@media (max-width:1024.98px)`

Reference element: `.stat-box:hover .tool-logo--default`.

| Property / input | Specified value |
| --- | --- |
| opacity | 1 |


Context: `@media (max-width:1024.98px)`

Reference element: `.stat-box:hover .tool-logo--hover,.stat-box:hover .stat-box-notch`.

| Property / input | Specified value |
| --- | --- |
| opacity | 0 |


Context: `@media (max-width:1024.98px)`

Reference element: `.stat-value`.

| Property / input | Specified value |
| --- | --- |
| bottom | 0 |
| left | 1rem |


Context: `@media (max-width:1024.98px)`

Reference element: `.stat-box--icon img`.

| Property / input | Specified value |
| --- | --- |
| width | 3.5rem |
| bottom | .8rem |
| left | 1rem |


Context: `@media (max-width:1024.98px)`

Reference element: `.stat-box-bg`.

| Property / input | Specified value |
| --- | --- |
| --chamfer-unit | calc(var(--stat-box-h) / 228) |
| --stat-box-shape | polygon(0 0, 100% 0, 100% calc(100% - 8 * var(--chamfer-unit)), calc(100% - 8 * var(--chamfer-unit)) 100%, 0 100%, 0 calc(125 * var(--chamfer-unit)), calc(11.71 * var(--chamfer-unit)) calc(113 * var(--chamfer-unit)), calc(11.71 * var(--chamfer-unit)) calc(52 * var(--chamfer-unit)), 0 calc(40 * var(--chamfer-unit))) |


Context: `@media (min-width:768px) and (max-width:1024.98px)`

Reference element: `.stat-section`.

| Property / input | Specified value |
| --- | --- |
| --stat-edge-inset | 2rem |
| --stat-box-ratio | 2.3711 |
| --stat-gap-x | calc(var(--stat-content-w) * 16 / 770) |
| --stat-gap-y | calc(var(--stat-content-w) * 16 / 770) |
| --stat-dock-bottom | 2rem |
| --stat-box-h | max(calc(var(--stat-box-w) / var(--stat-box-ratio)), calc(( 100dvh - var(--nav-height,5rem) - var(--stat-grid-top) - var(--stat-dock-bottom) - 3 * var(--stat-gap-y) ) / 4)) |


Context: `@media (min-width:768px) and (max-width:1024.98px)`

Reference element: `.stat-value`.

| Property / input | Specified value |
| --- | --- |
| --odo-cell-h | 1.1em |
| --odo-cell-pad | 0x |
| font-size | 5.5rem |
| bottom | 0 |
| left | 2rem |


Context: `@media (min-width:768px) and (max-width:1024.98px)`

Reference element: `.stat-box--icon img`.

| Property / input | Specified value |
| --- | --- |
| width | 5.5rem |
| bottom | 1rem |
| left | 1.5rem |


Context: `@media (prefers-reduced-motion:reduce)`

Reference element: `.stat-box`.

| Property / input | Specified value |
| --- | --- |
| opacity | 1!important |
| transition | none!important |
| transform | none!important |


## Computed layout at 375px

| Element | Geometry / layout | Typography / paint / state |
| --- | --- | --- |
| `section.stat-stage` | width: 375.333px; height: 976px; minHeight: 0px; maxWidth: none; position: relative; top: 0px; right: 0px; bottom: 0px; left: 0px; padding: 0px; margin: -900px 0px 0px; gap: normal; display: block; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: "DM Sans", "DM Sans Fallback", ui-sans-serif, system-ui, sans-serif; fontSize: 16px; fontWeight: 400; lineHeight: 24px; letterSpacing: normal; color: rgb(245, 240, 235); backgroundColor: rgb(157, 241, 51); border: 0px solid rgb(245, 240, 235); borderRadius: 0px; boxShadow: none; zIndex: 30; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `div.stat-section` | width: 375.333px; height: 976px; minHeight: 0px; maxWidth: none; position: relative; top: 0px; right: 0px; bottom: 0px; left: 0px; padding: 0px; margin: 0px; gap: normal; display: block; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 16px; fontWeight: 400; lineHeight: 24px; letterSpacing: normal; color: rgb(245, 240, 235); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(245, 240, 235); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `div.stat-canvas` | width: 375.333px; height: 815.406px; minHeight: 0px; maxWidth: none; position: absolute; top: 526px; right: -187.667px; bottom: -365.406px; left: 187.667px; padding: 0px; margin: 0px; gap: normal; display: block; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 16px; fontWeight: 400; lineHeight: 24px; letterSpacing: normal; color: rgb(245, 240, 235); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(245, 240, 235); borderRadius: 0px; boxShadow: none; zIndex: 2; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: matrix(1, 0, 0, 1, -187.667, -407.703) |
| `div.stat-box stat-box--stat box-1` | width: 165.667px; height: 135.771px; minHeight: 0px; maxWidth: none; position: absolute; top: 32px; right: 193.667px; bottom: 647.635px; left: 16px; padding: 0px; margin: 0px; gap: 16px; display: block; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 16px; fontWeight: 400; lineHeight: 24px; letterSpacing: normal; color: rgb(245, 240, 235); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(245, 240, 235); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: inset(50% calc(100% - 1px) 50% 0px); opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `span.stat-box-bg` | width: 165.667px; height: 135.771px; minHeight: 0px; maxWidth: none; position: absolute; top: 0px; right: 0px; bottom: 0px; left: 0px; padding: 0px; margin: 0px; gap: normal; display: block; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 16px; fontWeight: 400; lineHeight: 24px; letterSpacing: normal; color: rgb(245, 240, 235); backgroundColor: rgb(89, 159, 0); border: 0px solid rgb(245, 240, 235); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: polygon(0px 0px, 100% 0px, 100% calc(100% - 4.76425px), calc(100% - 4.76425px) 100%, 0px 100%, 0px 74.4415px, 6.97368px 67.2951px, 6.97368px 30.9676px, 0px 23.8213px); opacity: 1; visibility: visible; transition: background-color 0.2s; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `p.stat-label` | width: 184px; height: 12px; minHeight: 0px; maxWidth: none; position: absolute; top: 16px; right: 16px; bottom: 107.771px; left: -34.3333px; padding: 0px; margin: 0px; gap: normal; display: block; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 12px; fontWeight: 600; lineHeight: 12px; letterSpacing: 1.56px; color: rgb(0, 0, 0); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(0, 0, 0); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: color 0.2s; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `p.stat-value` | width: 129.844px; height: 56px; minHeight: 0px; maxWidth: none; position: absolute; top: 79.7708px; right: 19.8229px; bottom: 0px; left: 16px; padding: 0px; margin: 0px; gap: normal; display: flex; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: flex-start; justifyContent: normal | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 56px; fontWeight: 500; lineHeight: 47.6px; letterSpacing: -1.12px; color: rgb(0, 0, 0); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(0, 0, 0); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: color 0.2s; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `div.stat-box stat-box--stat box-2` | width: 165.667px; height: 135.771px; minHeight: 0px; maxWidth: none; position: absolute; top: 32px; right: 16px; bottom: 647.635px; left: 193.667px; padding: 0px; margin: 0px; gap: 16px; display: block; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 16px; fontWeight: 400; lineHeight: 24px; letterSpacing: normal; color: rgb(245, 240, 235); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(245, 240, 235); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: inset(50% calc(100% - 1px) 50% 0px); opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `div.stat-box stat-box--stat box-3` | width: 165.667px; height: 135.771px; minHeight: 0px; maxWidth: none; position: absolute; top: 179.781px; right: 193.667px; bottom: 499.865px; left: 16px; padding: 0px; margin: 0px; gap: 16px; display: block; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 16px; fontWeight: 400; lineHeight: 24px; letterSpacing: normal; color: rgb(245, 240, 235); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(245, 240, 235); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: inset(50% calc(100% - 1px) 50% 0px); opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `p.stat-value` | width: 79.8438px; height: 56px; minHeight: 0px; maxWidth: none; position: absolute; top: 79.7708px; right: 69.8229px; bottom: 0px; left: 16px; padding: 0px; margin: 0px; gap: normal; display: flex; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: flex-start; justifyContent: normal | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 56px; fontWeight: 500; lineHeight: 47.6px; letterSpacing: -1.12px; color: rgb(0, 0, 0); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(0, 0, 0); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: color 0.2s; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `div.stat-box stat-box--icon box-4` | width: 165.667px; height: 135.771px; minHeight: 0px; maxWidth: none; position: absolute; top: 179.781px; right: 16px; bottom: 499.865px; left: 193.667px; padding: 0px; margin: 0px; gap: normal; display: block; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 16px; fontWeight: 400; lineHeight: 24px; letterSpacing: normal; color: rgb(245, 240, 235); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(245, 240, 235); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: inset(50% calc(100% - 1px) 50% 0px); opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `div.stat-box stat-box--icon box-5` | width: 165.667px; height: 135.771px; minHeight: 0px; maxWidth: none; position: absolute; top: 327.562px; right: 193.667px; bottom: 352.083px; left: 16px; padding: 0px; margin: 0px; gap: normal; display: block; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 16px; fontWeight: 400; lineHeight: 24px; letterSpacing: normal; color: rgb(245, 240, 235); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(245, 240, 235); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: inset(50% calc(100% - 1px) 50% 0px); opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `div.stat-box stat-box--icon box-7` | width: 165.667px; height: 135.771px; minHeight: 0px; maxWidth: none; position: absolute; top: 327.562px; right: 16px; bottom: 352.083px; left: 193.667px; padding: 0px; margin: 0px; gap: normal; display: block; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 16px; fontWeight: 400; lineHeight: 24px; letterSpacing: normal; color: rgb(245, 240, 235); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(245, 240, 235); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: inset(50% calc(100% - 1px) 50% 0px); opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `div.stat-box stat-box--icon box-8` | width: 165.667px; height: 135.771px; minHeight: 0px; maxWidth: none; position: absolute; top: 475.344px; right: 193.667px; bottom: 204.302px; left: 16px; padding: 0px; margin: 0px; gap: normal; display: block; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 16px; fontWeight: 400; lineHeight: 24px; letterSpacing: normal; color: rgb(245, 240, 235); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(245, 240, 235); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: inset(50% calc(100% - 1px) 50% 0px); opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |

## Computed layout at 768px

| Element | Geometry / layout | Typography / paint / state |
| --- | --- | --- |
| `section.stat-stage` | width: 768px; height: 976px; minHeight: 0px; maxWidth: none; position: relative; top: 0px; right: 0px; bottom: 0px; left: 0px; padding: 0px; margin: -900px 0px 0px; gap: normal; display: block; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: "DM Sans", "DM Sans Fallback", ui-sans-serif, system-ui, sans-serif; fontSize: 16px; fontWeight: 400; lineHeight: 24px; letterSpacing: normal; color: rgb(245, 240, 235); backgroundColor: rgb(157, 241, 51); border: 0px solid rgb(245, 240, 235); borderRadius: 0px; boxShadow: none; zIndex: 30; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `div.stat-section` | width: 768px; height: 976px; minHeight: 0px; maxWidth: none; position: relative; top: 0px; right: 0px; bottom: 0px; left: 0px; padding: 0px; margin: 0px; gap: normal; display: block; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 16px; fontWeight: 400; lineHeight: 24px; letterSpacing: normal; color: rgb(245, 240, 235); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(245, 240, 235); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `div.stat-canvas` | width: 414.26px; height: 900px; minHeight: 0px; maxWidth: none; position: absolute; top: 526px; right: -30.2604px; bottom: -450px; left: 384px; padding: 0px; margin: 0px; gap: normal; display: block; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 16px; fontWeight: 400; lineHeight: 24px; letterSpacing: normal; color: rgb(245, 240, 235); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(245, 240, 235); borderRadius: 0px; boxShadow: none; zIndex: 2; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: matrix(1, 0, 0, 1, -207.13, -450) |
| `div.stat-box stat-box--stat box-1` | width: 344.677px; height: 179.021px; minHeight: 0px; maxWidth: none; position: absolute; top: 32px; right: 214.448px; bottom: 688.979px; left: -144.865px; padding: 0px; margin: 0px; gap: 16px; display: block; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 16px; fontWeight: 400; lineHeight: 24px; letterSpacing: normal; color: rgb(245, 240, 235); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(245, 240, 235); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: inset(50% calc(100% - 1px) 50% 0px); opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `span.stat-box-bg` | width: 344.677px; height: 179.021px; minHeight: 0px; maxWidth: none; position: absolute; top: 0px; right: 0px; bottom: 0px; left: 0px; padding: 0px; margin: 0px; gap: normal; display: block; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 16px; fontWeight: 400; lineHeight: 24px; letterSpacing: normal; color: rgb(245, 240, 235); backgroundColor: rgb(89, 159, 0); border: 0px solid rgb(245, 240, 235); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: polygon(0px 0px, 100% 0px, 100% calc(100% - 6.2817px), calc(100% - 6.2817px) 100%, 0px 100%, 0px 98.1516px, 9.19484px 88.7291px, 9.19484px 40.8311px, 0px 31.4085px); opacity: 1; visibility: visible; transition: background-color 0.2s; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `p.stat-label` | width: 184px; height: 12px; minHeight: 0px; maxWidth: none; position: absolute; top: 16px; right: 16px; bottom: 151.021px; left: 144.677px; padding: 0px; margin: 0px; gap: normal; display: block; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 12px; fontWeight: 600; lineHeight: 12px; letterSpacing: 1.56px; color: rgb(0, 0, 0); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(0, 0, 0); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: color 0.2s; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `p.stat-value` | width: 146.323px; height: 96.7917px; minHeight: 0px; maxWidth: none; position: absolute; top: 82.2292px; right: 166.354px; bottom: 0px; left: 32px; padding: 0px; margin: 0px; gap: normal; display: flex; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: flex-start; justifyContent: normal | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 88px; fontWeight: 500; lineHeight: 74.8px; letterSpacing: -1.76px; color: rgb(0, 0, 0); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(0, 0, 0); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: color 0.2s; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `div.stat-box stat-box--stat box-2` | width: 344.677px; height: 179.021px; minHeight: 0px; maxWidth: none; position: absolute; top: 32px; right: -144.865px; bottom: 688.979px; left: 214.449px; padding: 0px; margin: 0px; gap: 16px; display: block; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 16px; fontWeight: 400; lineHeight: 24px; letterSpacing: normal; color: rgb(245, 240, 235); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(245, 240, 235); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: inset(50% calc(100% - 1px) 50% 0px); opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `div.stat-box stat-box--stat box-3` | width: 344.677px; height: 179.021px; minHeight: 0px; maxWidth: none; position: absolute; top: 225.657px; right: 214.448px; bottom: 495.323px; left: -144.865px; padding: 0px; margin: 0px; gap: 16px; display: block; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 16px; fontWeight: 400; lineHeight: 24px; letterSpacing: normal; color: rgb(245, 240, 235); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(245, 240, 235); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: inset(50% calc(100% - 1px) 50% 0px); opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `p.stat-value` | width: 96.3229px; height: 96.7917px; minHeight: 0px; maxWidth: none; position: absolute; top: 82.2292px; right: 216.354px; bottom: 0px; left: 32px; padding: 0px; margin: 0px; gap: normal; display: flex; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: flex-start; justifyContent: normal | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 88px; fontWeight: 500; lineHeight: 74.8px; letterSpacing: -1.76px; color: rgb(0, 0, 0); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(0, 0, 0); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: color 0.2s; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `div.stat-box stat-box--icon box-4` | width: 344.677px; height: 179.021px; minHeight: 0px; maxWidth: none; position: absolute; top: 225.657px; right: -144.865px; bottom: 495.323px; left: 214.449px; padding: 0px; margin: 0px; gap: normal; display: block; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 16px; fontWeight: 400; lineHeight: 24px; letterSpacing: normal; color: rgb(245, 240, 235); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(245, 240, 235); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: inset(50% calc(100% - 1px) 50% 0px); opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `div.stat-box stat-box--icon box-5` | width: 344.677px; height: 179.021px; minHeight: 0px; maxWidth: none; position: absolute; top: 419.314px; right: 214.448px; bottom: 301.667px; left: -144.865px; padding: 0px; margin: 0px; gap: normal; display: block; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 16px; fontWeight: 400; lineHeight: 24px; letterSpacing: normal; color: rgb(245, 240, 235); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(245, 240, 235); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: inset(50% calc(100% - 1px) 50% 0px); opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `div.stat-box stat-box--icon box-7` | width: 344.677px; height: 179.021px; minHeight: 0px; maxWidth: none; position: absolute; top: 419.314px; right: -144.865px; bottom: 301.667px; left: 214.449px; padding: 0px; margin: 0px; gap: normal; display: block; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 16px; fontWeight: 400; lineHeight: 24px; letterSpacing: normal; color: rgb(245, 240, 235); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(245, 240, 235); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: inset(50% calc(100% - 1px) 50% 0px); opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `div.stat-box stat-box--icon box-8` | width: 344.677px; height: 179.021px; minHeight: 0px; maxWidth: none; position: absolute; top: 612.971px; right: 214.448px; bottom: 108.01px; left: -144.865px; padding: 0px; margin: 0px; gap: normal; display: block; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 16px; fontWeight: 400; lineHeight: 24px; letterSpacing: normal; color: rgb(245, 240, 235); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(245, 240, 235); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: inset(50% calc(100% - 1px) 50% 0px); opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |

## Computed layout at 1440px

| Element | Geometry / layout | Typography / paint / state |
| --- | --- | --- |
| `section.stat-stage` | width: 1440px; height: 900px; minHeight: 0px; maxWidth: none; position: relative; top: 0px; right: 0px; bottom: 0px; left: 0px; padding: 0px; margin: 0px 0px -1474px; gap: normal; display: block; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: "DM Sans", "DM Sans Fallback", ui-sans-serif, system-ui, sans-serif; fontSize: 16px; fontWeight: 400; lineHeight: 24px; letterSpacing: normal; color: rgb(245, 240, 235); backgroundColor: rgb(157, 241, 51); border: 0px solid rgb(245, 240, 235); borderRadius: 0px; boxShadow: none; zIndex: 30; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `div.stat-section` | width: 1440px; height: 900px; minHeight: 0px; maxWidth: none; position: relative; top: 0px; right: 0px; bottom: 0px; left: 0px; padding: 0px; margin: 0px; gap: normal; display: block; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 16px; fontWeight: 400; lineHeight: 24px; letterSpacing: normal; color: rgb(245, 240, 235); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(245, 240, 235); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `div.stat-canvas` | width: 1440px; height: 824px; minHeight: 0px; maxWidth: none; position: absolute; top: 76px; right: 0px; bottom: 0px; left: 0px; padding: 0px; margin: 0px; gap: normal; display: block; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 16px; fontWeight: 400; lineHeight: 24px; letterSpacing: normal; color: rgb(245, 240, 235); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(245, 240, 235); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `div.stat-box stat-box--stat box-1` | width: 275.198px; height: 253.323px; minHeight: 0px; maxWidth: none; position: absolute; top: 32px; right: 1132.8px; bottom: 538.677px; left: 32px; padding: 0px; margin: 0px; gap: normal; display: block; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 16px; fontWeight: 400; lineHeight: 24px; letterSpacing: normal; color: rgb(245, 240, 235); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(245, 240, 235); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: inset(50% calc(100% - 1px) 50% 0px); opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `span.stat-box-bg` | width: 275.198px; height: 253.323px; minHeight: 0px; maxWidth: none; position: absolute; top: 0px; right: 0px; bottom: 0px; left: 0px; padding: 0px; margin: 0px; gap: normal; display: block; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 16px; fontWeight: 400; lineHeight: 24px; letterSpacing: normal; color: rgb(245, 240, 235); backgroundColor: rgb(89, 159, 0); border: 0px solid rgb(245, 240, 235); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: polygon(0px 0px, 100% 0px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0px 100%, 0px 125px, 11.71px 113px, 11.71px 52px, 0px 40px); opacity: 1; visibility: visible; transition: background-color 0.2s; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `p.stat-label` | width: 184px; height: 16px; minHeight: 0px; maxWidth: none; position: absolute; top: 16px; right: 16px; bottom: 221.323px; left: 75.1979px; padding: 0px; margin: 0px; gap: normal; display: block; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 16px; fontWeight: 700; lineHeight: 16px; letterSpacing: 2.08px; color: rgb(0, 0, 0); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(0, 0, 0); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: color 0.2s; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `p.stat-value` | width: 152.5px; height: 100px; minHeight: 0px; maxWidth: none; position: absolute; top: 153.323px; right: 102.698px; bottom: 0px; left: 20px; padding: 0px; margin: 0px; gap: normal; display: flex; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: flex-start; justifyContent: normal | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 100px; fontWeight: 500; lineHeight: 85px; letterSpacing: -2px; color: rgb(0, 0, 0); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(0, 0, 0); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: color 0.2s; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `div.stat-box stat-box--stat box-2` | width: 275.198px; height: 253.323px; minHeight: 0px; maxWidth: none; position: absolute; top: 285.323px; right: 857.604px; bottom: 285.354px; left: 307.198px; padding: 0px; margin: 0px; gap: normal; display: block; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 16px; fontWeight: 400; lineHeight: 24px; letterSpacing: normal; color: rgb(245, 240, 235); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(245, 240, 235); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: inset(50% calc(100% - 1px) 50% 0px); opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `div.stat-box stat-box--stat box-3` | width: 275.198px; height: 253.323px; minHeight: 0px; maxWidth: none; position: absolute; top: 538.656px; right: 582.406px; bottom: 32.0208px; left: 582.396px; padding: 0px; margin: 0px; gap: normal; display: block; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 16px; fontWeight: 400; lineHeight: 24px; letterSpacing: normal; color: rgb(245, 240, 235); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(245, 240, 235); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: inset(50% calc(100% - 1px) 50% 0px); opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `p.stat-value` | width: 102.5px; height: 100px; minHeight: 0px; maxWidth: none; position: absolute; top: 153.323px; right: 152.698px; bottom: 0px; left: 20px; padding: 0px; margin: 0px; gap: normal; display: flex; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: flex-start; justifyContent: normal | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 100px; fontWeight: 500; lineHeight: 85px; letterSpacing: -2px; color: rgb(0, 0, 0); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(0, 0, 0); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: color 0.2s; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `div.stat-box stat-box--icon box-4` | width: 275.198px; height: 253.323px; minHeight: 0px; maxWidth: none; position: absolute; top: 32px; right: 582.406px; bottom: 538.677px; left: 582.396px; padding: 0px; margin: 0px; gap: normal; display: block; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 16px; fontWeight: 400; lineHeight: 24px; letterSpacing: normal; color: rgb(245, 240, 235); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(245, 240, 235); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: inset(50% calc(100% - 1px) 50% 0px); opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `div.stat-box stat-box--icon box-5` | width: 275.198px; height: 253.323px; minHeight: 0px; maxWidth: none; position: absolute; top: 32px; right: 32.0104px; bottom: 538.677px; left: 1132.79px; padding: 0px; margin: 0px; gap: normal; display: block; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 16px; fontWeight: 400; lineHeight: 24px; letterSpacing: normal; color: rgb(245, 240, 235); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(245, 240, 235); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: inset(50% calc(100% - 1px) 50% 0px); opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `div.stat-box stat-box--icon box-7` | width: 275.198px; height: 253.323px; minHeight: 0px; maxWidth: none; position: absolute; top: 285.323px; right: 307.208px; bottom: 285.354px; left: 857.594px; padding: 0px; margin: 0px; gap: normal; display: block; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 16px; fontWeight: 400; lineHeight: 24px; letterSpacing: normal; color: rgb(245, 240, 235); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(245, 240, 235); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: inset(50% calc(100% - 1px) 50% 0px); opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `div.stat-box stat-box--icon box-8` | width: 275.198px; height: 253.323px; minHeight: 0px; maxWidth: none; position: absolute; top: 538.656px; right: 32.0104px; bottom: 32.0208px; left: 1132.79px; padding: 0px; margin: 0px; gap: normal; display: block; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 16px; fontWeight: 400; lineHeight: 24px; letterSpacing: normal; color: rgb(245, 240, 235); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(245, 240, 235); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: inset(50% calc(100% - 1px) 50% 0px); opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |

## Phase 5 implementation

- Recorded seven-box order/timings drive full-box clipping through --oh/--ow. Only the actual project count5 has an odometer; unknown values remain dashes. Labels scramble and settle back to user placeholders.
- Desktop uses the recorded margin-bottom formula (250px minus two scene heights minus lead); narrow layouts use -100dvh margin-top. Dock translation measures the canvas origin and follows the recorded reveal/handoff phases. Pixel clipping uses the documented 16-column thresholds.
- Source-16 defines a rotation-offset setter but contains no caller. No arbitrary scroll-spin multiplier is added; neutral glyph retains verified .52 time rotation and .12*sin(.3*time) tilt. Neutral imagery/postprocess remains APPROXIMATED.
