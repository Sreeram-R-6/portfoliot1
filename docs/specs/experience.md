# Experience

## Evidence and scope

Source inspected 2026-09-28. Local evidence: docs/recon/REPORT.md, source-*.css/js, spec-computed-{375,768,1440}.json, existing full-page crops and recorded scroll states. No repeat screenshots. Only structure/styles/motion are adopted; all copy and destinations come from src/content/site.ts.

Measurements below are source computed values at viewport height 900px, scroll top 0; transformed rectangles are state-dependent and are not universal CSS dimensions. Repeated elements may have distinct sizes. Source class names identify evidence and need not become target component names.

## Layout

Desktop padding 32px, viewport-height scene. Grid columns at 1440: 257px 750px 257px; gaps 28px 56px. CRT measured 609.354px by 378px. Row button height 68px, padding 0 22px; titles 20px/20px; role 12px/12px/1.56px; descriptions DM Sans 14px/22.4px. Scene dead-scroll 35dvh; source stage margin-top calc(35dvh - 143dvh) where applicable.

## States and interactions

Seven source selection controls observed; target data must come from site.ts, not copied employers. Desktop selection changes central mark and one description. Texture mix duration 550ms; easing t<.5 ? 4*t^3 : 1-(-2*t+2)^3/2 (cubic in/out), sampled from performance.now(). Trail radius .4, decay .9, displacement 18*DPR, fringe gain 2.2; pointer smoothing .09, hover smoothing .12. Mobile first panel initially open; clicking selected panel closes; another opens and closes previous. Grid rows transition 0fr to 1fr over .3s ease-out. Keyboard button activation identical to click; aria-expanded and aria-controls required.

## Responsive behavior

375: padding 96px 16px 48px, one column, 9px gaps, heading 45px/36px/-0.9px; CRT and central description hidden; inline panels. 768: padding 80px 32px 48px; two 328px columns, gaps 28px 48px; CRT above lists; heading 64px/51.2px/-1.28px. 1440: three-column layout; heading 80px/64px/-1.6px. Reduced motion: immediate panel opening and static neutral center mark.

Custom breakpoints: mobile max-width 767.98px; tablet 768px–1024.98px; desktop min-width 1025px. Nav utility breakpoint 40rem. Retain fluid formulas rather than interpolating measured snapshots.

## Component tree

`Experience > Heading + ExperienceGrid > LeftList + CentralCRTAndDescription + RightList; ExperienceItem > SelectButton + MobileDescriptionPanel.`

## Animation libraries

CSS accordion transition; GSAP scene handoff; custom WebGL2 CRT/logo transition.

## Flags and handling

| Status / item | Handling |
| --- | --- |
| VERIFIED: central mark transition | Source-15.js supplies 550ms cubic in/out mix; use instantaneous swap under reduced motion. |
| UNVERIFIED: personal experience list | Use explicit experience placeholders from site.ts, with no fabricated employer/date. Preserve responsive selection structure; source seven-entry count is a reference, not seven invented jobs. |
| APPROXIMATED: central mark imagery | Replace employer/source logos with neutral marks; retain verified CRT equations and dimensions. |

Tailwind source version is UNVERIFIED but explicitly approved to ignore: use installed Tailwind v4. No additional package needed. Reduced-motion and keyboard behavior above are target requirements where the source did not establish equivalent behavior.

## Layout property reference

Property tables retain cascade order and media conditions; no source implementation is included. Tokens map to the verified OKLCH equivalents in globals.css. Source utility classes are additionally represented by the computed tables below.

Context: `base`

Reference element: `.worked-at-stage`.

| Property / input | Specified value |
| --- | --- |
| z-index | 0 |
| position | relative |


Context: `@media (min-width:1025px) and (prefers-reduced-motion:no-preference)`

Reference element: `.worked-at-stage`.

| Property / input | Specified value |
| --- | --- |
| --worked-at-dead-scroll | 35dvh |
| margin-top | calc(var(--worked-at-dead-scroll) - 143dvh) |


Context: `base`

Reference element: `.worked-at`.

| Property / input | Specified value |
| --- | --- |
| border-bottom | 1px solid var(--background-stroke-2) |
| background | var(--background-bg-0,#000) |
| flex-direction | column |
| justify-content | center |
| align-items | center |
| width | 100% |
| min-height | 100dvh |
| padding | 6rem 1rem 3rem |
| display | flex |
| position | relative |
| overflow | hidden |


Context: `base`

Reference element: `.worked-at-heading`.

| Property / input | Specified value |
| --- | --- |
| text-align | center |
| flex-direction | column |
| align-items | center |
| gap | 1.5rem |
| margin-bottom | 2rem |
| display | flex |


Context: `base`

Reference element: `.worked-at-badge`.

| Property / input | Specified value |
| --- | --- |
| background | var(--primary-green-neon) |
| color | var(--text-black,#070210) |
| font-family | var(--font-heading) |
| letter-spacing | .0975rem |
| text-transform | uppercase |
| clip-path | polygon(0% 4px,4px 0%,100% 0%,100% calc(100% - 10px),calc(100% - 10px) 100%,0% 100%) |
| align-items | center |
| padding | .4375rem .5625rem |
| font-size | .75rem |
| font-weight | 600 |
| line-height | 1 |
| display | inline-flex |


Context: `base`

Reference element: `.worked-at-title`.

| Property / input | Specified value |
| --- | --- |
| font-family | var(--font-heading) |
| font-weight | var(--section-heading-weight) |
| letter-spacing | -.02em |
| text-transform | uppercase |
| color | var(--text-white) |
| margin | 0 |
| font-size | 5rem |
| line-height | .8 |


Context: `base`

Reference element: `.worked-at-body`.

| Property / input | Specified value |
| --- | --- |
| grid-template-columns | 1fr |
| grid-template-areas | "stage""desc""left""right" |
| justify-items | center |
| gap | 1.75rem 3rem |
| width | 100% |
| max-width | 87.5rem |
| display | grid |


Context: `base`

Reference element: `.worked-at-col`.

| Property / input | Specified value |
| --- | --- |
| flex-direction | column |
| gap | .5625rem |
| width | 100% |
| display | flex |


Context: `base`

Reference element: `.worked-at-col--left`.

| Property / input | Specified value |
| --- | --- |
| grid-area | left |


Context: `base`

Reference element: `.worked-at-col--right`.

| Property / input | Specified value |
| --- | --- |
| grid-area | right |


Context: `base`

Reference element: `.worked-at-row`.

| Property / input | Specified value |
| --- | --- |
| --row-shape | polygon(0% 20px, 20px 0%, 100% 0%, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0% 100%) |
| --row-stroke | 1px |
| width | 100% |
| position | relative |


Context: `base`

Reference element: `.worked-at-row-button`.

| Property / input | Specified value |
| --- | --- |
| cursor | pointer |
| text-align | left |
| align-items | center |
| width | 100% |
| height | 4.25rem |
| padding | 0 1.375rem |
| display | flex |
| position | relative |


Context: `base`

Reference element: `.worked-at-row-bg`.

| Property / input | Specified value |
| --- | --- |
| z-index | 0 |
| clip-path | var(--row-shape) |
| background | var(--background-stroke-2) |
| pointer-events | none |
| position | absolute |
| inset | 0 |


Context: `base`

Reference element: `.worked-at-row-bg:after`.

| Property / input | Specified value |
| --- | --- |
| content | "" |
| inset | var(--row-stroke) |
| clip-path | var(--row-shape) |
| background | var(--background-bg-0,#000) |
| transition | background-color .2s ease-out |
| position | absolute |


Context: `base`

Reference element: `.worked-at-row-index,.worked-at-row-text,.worked-at-row-mark`.

| Property / input | Specified value |
| --- | --- |
| z-index | 1 |
| position | relative |


Context: `base`

Reference element: `.worked-at-row-index`.

| Property / input | Specified value |
| --- | --- |
| width | 2.25rem |
| font-family | var(--font-heading) |
| letter-spacing | .0975rem |
| text-align | right |
| text-transform | uppercase |
| color | var(--text-grey-1) |
| flex-shrink | 0 |
| padding-right | .75rem |
| font-size | .75rem |
| font-weight | 600 |
| line-height | 1 |
| right | .5rem |


Context: `base`

Reference element: `.worked-at-row-text`.

| Property / input | Specified value |
| --- | --- |
| flex-direction | column |
| flex | 1 |
| gap | .375rem |
| min-width | 0 |
| display | flex |


Context: `base`

Reference element: `.worked-at-row-title`.

| Property / input | Specified value |
| --- | --- |
| font-family | var(--font-heading) |
| text-transform | uppercase |
| color | var(--text-white) |
| font-size | 1.25rem |
| font-weight | 500 |
| line-height | 1 |
| transition | color .3s ease-out |


Context: `base`

Reference element: `.worked-at-row-role`.

| Property / input | Specified value |
| --- | --- |
| font-family | var(--font-heading) |
| letter-spacing | .0975rem |
| text-transform | uppercase |
| color | var(--text-grey-1) |
| font-size | .75rem |
| font-weight | 600 |
| line-height | 1 |
| transition | color .3s ease-out |


Context: `base`

Reference element: `.worked-at-row-mark`.

| Property / input | Specified value |
| --- | --- |
| font-family | var(--font-mono) |
| color | var(--primary-green-neon) |
| flex-shrink | 0 |
| font-size | 1rem |
| line-height | 1 |
| transition | color .3s ease-out |
| display | none |


Context: `base`

Reference element: `.worked-at-row-button:hover .worked-at-row-bg:after`.

| Property / input | Specified value |
| --- | --- |
| background | var(--primary-green-neon) |


Context: `base`

Reference element: `.worked-at-row[data-selected=true] .worked-at-row-bg:after,.worked-at-row[data-selected=true] .worked-at-row-button:hover .worked-at-row-bg:after`.

| Property / input | Specified value |
| --- | --- |
| background | var(--foreground,#fff) |


Context: `base`

Reference element: `.worked-at-row-button:hover .worked-at-row-title,.worked-at-row[data-selected=true] .worked-at-row-title,.worked-at-row-button:hover .worked-at-row-mark,.worked-at-row[data-selected=true] .worked-at-row-mark,.worked-at-row-button:hover .worked-at-row-index,.worked-at-row-button:hover .worked-at-row-role`.

| Property / input | Specified value |
| --- | --- |
| color | var(--text-black,#070210) |


Context: `base`

Reference element: `.worked-at-row-panel`.

| Property / input | Specified value |
| --- | --- |
| grid-template-rows | 0fr |
| transition | grid-template-rows .3s ease-out |
| display | grid |


Context: `base`

Reference element: `.worked-at-row-panel-inner`.

| Property / input | Specified value |
| --- | --- |
| overflow | hidden |


Context: `base`

Reference element: `.worked-at-row-description`.

| Property / input | Specified value |
| --- | --- |
| font-family | var(--font-sans) |
| color | var(--text-grey-1) |
| margin | 0 |
| padding | 1.375rem 1.5rem 1.5rem |
| font-size | .875rem |
| line-height | 1.6 |


Context: `base`

Reference element: `.worked-at-crt`.

| Property / input | Specified value |
| --- | --- |
| aspect-ratio | 669/415 |
| grid-area | stage |
| width | auto |
| max-width | 100% |
| height | min(25.9375rem,42dvh) |
| position | relative |


Context: `base`

Reference element: `.worked-at-crt-canvas`.

| Property / input | Specified value |
| --- | --- |
| position | absolute |
| inset | 0 |


Context: `base`

Reference element: `.worked-at-crt-rule`.

| Property / input | Specified value |
| --- | --- |
| background | var(--background-stroke-1) |
| pointer-events | none |
| position | absolute |


Context: `base`

Reference element: `.worked-at-crt-rule--t,.worked-at-crt-rule--b`.

| Property / input | Specified value |
| --- | --- |
| height | 1px |
| left | .375rem |
| right | .375rem |


Context: `base`

Reference element: `.worked-at-crt-rule--t`.

| Property / input | Specified value |
| --- | --- |
| top | 0 |


Context: `base`

Reference element: `.worked-at-crt-rule--b`.

| Property / input | Specified value |
| --- | --- |
| bottom | 0 |


Context: `base`

Reference element: `.worked-at-crt-rule--l,.worked-at-crt-rule--r`.

| Property / input | Specified value |
| --- | --- |
| width | 1px |
| top | .375rem |
| bottom | .375rem |


Context: `base`

Reference element: `.worked-at-crt-rule--l`.

| Property / input | Specified value |
| --- | --- |
| left | 0 |


Context: `base`

Reference element: `.worked-at-crt-rule--r`.

| Property / input | Specified value |
| --- | --- |
| right | 0 |


Context: `base`

Reference element: `.worked-at-crt-plus`.

| Property / input | Specified value |
| --- | --- |
| width | .5rem |
| height | .5rem |
| color | var(--text-grey-1) |
| pointer-events | none |
| position | absolute |


Context: `base`

Reference element: `.worked-at-crt-plus--tl`.

| Property / input | Specified value |
| --- | --- |
| top | -.25rem |
| left | -.25rem |


Context: `base`

Reference element: `.worked-at-crt-plus--tr`.

| Property / input | Specified value |
| --- | --- |
| top | -.25rem |
| right | -.25rem |


Context: `base`

Reference element: `.worked-at-crt-plus--br`.

| Property / input | Specified value |
| --- | --- |
| bottom | -.25rem |
| right | -.25rem |


Context: `base`

Reference element: `.worked-at-crt-plus--bl`.

| Property / input | Specified value |
| --- | --- |
| bottom | -.25rem |
| left | -.25rem |


Context: `base`

Reference element: `.worked-at-description`.

| Property / input | Specified value |
| --- | --- |
| max-width | 34.5625rem |
| font-family | var(--font-sans) |
| text-align | center |
| color | var(--text-grey-1) |
| grid-area | desc |
| margin | 0 |
| font-size | 1rem |
| line-height | 1.6 |
| display | grid |


Context: `base`

Reference element: `.worked-at-description-copy`.

| Property / input | Specified value |
| --- | --- |
| visibility | hidden |
| grid-area | 1/1 |
| margin | 0 |


Context: `base`

Reference element: `.worked-at-description-copy[data-active=true]`.

| Property / input | Specified value |
| --- | --- |
| visibility | visible |


Context: `@media (max-width:767.98px)`

Reference element: `.worked-at`.

| Property / input | Specified value |
| --- | --- |
| padding | 6rem 1rem 3rem |


Context: `@media (max-width:767.98px)`

Reference element: `.worked-at-crt,.worked-at-description`.

| Property / input | Specified value |
| --- | --- |
| display | none |


Context: `@media (max-width:767.98px)`

Reference element: `.worked-at-body`.

| Property / input | Specified value |
| --- | --- |
| grid-template-areas | "left""right" |
| gap | .5625rem |


Context: `@media (max-width:767.98px)`

Reference element: `.worked-at-col`.

| Property / input | Specified value |
| --- | --- |
| display | contents |


Context: `@media (max-width:767.98px)`

Reference element: `.worked-at-row-mark`.

| Property / input | Specified value |
| --- | --- |
| display | block |


Context: `@media (max-width:767.98px)`

Reference element: `.worked-at-row[data-selected=true] .worked-at-row-panel`.

| Property / input | Specified value |
| --- | --- |
| grid-template-rows | 1fr |


Context: `@media (max-width:767.98px)`

Reference element: `.worked-at-row[data-selected=true] .worked-at-row-panel-inner`.

| Property / input | Specified value |
| --- | --- |
| background | var(--background-bg-0,#000) |
| border | var(--row-stroke) solid var(--background-stroke-2) |
| clip-path | polygon(0% 0%,100% 0%,100% calc(100% - 20px),calc(100% - 20px) 100%,0% 100%) |
| border-top | 0 |


Context: `@media (max-width:767.98px)`

Reference element: `.worked-at-title`.

| Property / input | Specified value |
| --- | --- |
| font-size | 2.8125rem |


Context: `@media (min-width:768px) and (max-width:1024.98px)`

Reference element: `.worked-at`.

| Property / input | Specified value |
| --- | --- |
| padding | 5rem 2rem 3rem |


Context: `@media (min-width:768px) and (max-width:1024.98px)`

Reference element: `.worked-at-body`.

| Property / input | Specified value |
| --- | --- |
| grid-template-columns | 1fr 1fr |
| grid-template-areas | "stage stage""desc desc""left right" |
| align-items | start |


Context: `@media (min-width:768px) and (max-width:1024.98px)`

Reference element: `.worked-at-title`.

| Property / input | Specified value |
| --- | --- |
| font-size | 4rem |


Context: `@media (min-width:1025px)`

Reference element: `.worked-at`.

| Property / input | Specified value |
| --- | --- |
| padding | 2rem |


Context: `@media (min-width:1025px)`

Reference element: `.worked-at-body`.

| Property / input | Specified value |
| --- | --- |
| grid-template-columns | 16.0625rem minmax(0,1fr) 16.0625rem |
| grid-template-areas | "left stage right""left desc right" |
| align-items | start |
| gap | 1.75rem 3.5rem |


Context: `@media (min-width:1025px)`

Reference element: `.worked-at-col,.worked-at-description`.

| Property / input | Specified value |
| --- | --- |
| align-self | start |


## Computed layout at 375px

| Element | Geometry / layout | Typography / paint / state |
| --- | --- | --- |
| `div.worked-at-stage` | width: 375.333px; height: 951.312px; minHeight: 0px; maxWidth: none; position: relative; top: 0px; right: 0px; bottom: 0px; left: 0px; padding: 0px; margin: 0px; gap: normal; display: block; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: "DM Sans", "DM Sans Fallback", ui-sans-serif, system-ui, sans-serif; fontSize: 16px; fontWeight: 400; lineHeight: 24px; letterSpacing: normal; color: rgb(245, 240, 235); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(245, 240, 235); borderRadius: 0px; boxShadow: none; zIndex: 0; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `section.worked-at` | width: 375.333px; height: 951.312px; minHeight: 900px; maxWidth: none; position: relative; top: 0px; right: 0px; bottom: 0px; left: 0px; padding: 96px 16px 48px; margin: 0px; gap: normal; display: flex; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: column; alignItems: center; justifyContent: center | fontFamily: "DM Sans", "DM Sans Fallback", ui-sans-serif, system-ui, sans-serif; fontSize: 16px; fontWeight: 400; lineHeight: 24px; letterSpacing: normal; color: rgb(245, 240, 235); backgroundColor: rgb(0, 0, 0); border: ; borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `div.worked-at-heading` | width: 202.594px; height: 86px; minHeight: auto; maxWidth: none; position: static; top: auto; right: auto; bottom: auto; left: auto; padding: 0px; margin: 0px 0px 32px; gap: 24px; display: flex; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: column; alignItems: center; justifyContent: normal | fontFamily: "DM Sans", "DM Sans Fallback", ui-sans-serif, system-ui, sans-serif; fontSize: 16px; fontWeight: 400; lineHeight: 24px; letterSpacing: normal; color: rgb(245, 240, 235); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(245, 240, 235); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `span.worked-at-badge` | width: 77.1875px; height: 26px; minHeight: auto; maxWidth: none; position: static; top: auto; right: auto; bottom: auto; left: auto; padding: 7px 9px; margin: 0px; gap: normal; display: flex; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: center; justifyContent: normal | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 12px; fontWeight: 600; lineHeight: 12px; letterSpacing: 1.56px; color: rgb(7, 2, 16); backgroundColor: rgb(157, 241, 51); border: 0px solid rgb(7, 2, 16); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: polygon(0% 4px, 4px 0%, 100% 0%, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0% 100%); opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `h2.worked-at-title` | width: 202.594px; height: 36px; minHeight: auto; maxWidth: none; position: static; top: auto; right: auto; bottom: auto; left: auto; padding: 0px; margin: 0px; gap: normal; display: block; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 45px; fontWeight: 500; lineHeight: 36px; letterSpacing: -0.9px; color: rgb(255, 255, 255); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(255, 255, 255); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `div.worked-at-body` | width: 343.333px; height: 688.646px; minHeight: auto; maxWidth: 1400px; position: static; top: auto; right: auto; bottom: auto; left: auto; padding: 0px; margin: 0px; gap: 9px; display: grid; gridTemplateColumns: 343.333px; gridTemplateRows: 226.646px 68px 68px 68px 68px 68px 68px; gridTemplateAreas: "left" "right"; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: "DM Sans", "DM Sans Fallback", ui-sans-serif, system-ui, sans-serif; fontSize: 16px; fontWeight: 400; lineHeight: 24px; letterSpacing: normal; color: rgb(245, 240, 235); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(245, 240, 235); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `div.worked-at-col worked-at-col--left` | width: 100%; height: auto; minHeight: 0px; maxWidth: none; position: static; top: auto; right: auto; bottom: auto; left: auto; padding: 0px; margin: 0px; gap: 9px; display: contents; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: column; alignItems: normal; justifyContent: normal | fontFamily: "DM Sans", "DM Sans Fallback", ui-sans-serif, system-ui, sans-serif; fontSize: 16px; fontWeight: 400; lineHeight: 24px; letterSpacing: normal; color: rgb(245, 240, 235); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(245, 240, 235); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `div.worked-at-row` | width: 343.333px; height: 226.646px; minHeight: auto; maxWidth: none; position: relative; top: 0px; right: 0px; bottom: 0px; left: 0px; padding: 0px; margin: 0px; gap: normal; display: block; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: "DM Sans", "DM Sans Fallback", ui-sans-serif, system-ui, sans-serif; fontSize: 16px; fontWeight: 400; lineHeight: 24px; letterSpacing: normal; color: rgb(245, 240, 235); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(245, 240, 235); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `button.worked-at-row-button` | width: 343.333px; height: 68px; minHeight: 0px; maxWidth: none; position: relative; top: 0px; right: 0px; bottom: 0px; left: 0px; padding: 0px 22px; margin: 0px; gap: normal; display: flex; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: center; justifyContent: normal | fontFamily: "DM Sans", "DM Sans Fallback", ui-sans-serif, system-ui, sans-serif; fontSize: 16px; fontWeight: 400; lineHeight: 24px; letterSpacing: normal; color: rgb(245, 240, 235); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(245, 240, 235); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `div.worked-at-row-panel` | width: 343.333px; height: 158.646px; minHeight: 0px; maxWidth: none; position: static; top: auto; right: auto; bottom: auto; left: auto; padding: 0px; margin: 0px; gap: normal; display: grid; gridTemplateColumns: 343.333px; gridTemplateRows: 158.646px; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: "DM Sans", "DM Sans Fallback", ui-sans-serif, system-ui, sans-serif; fontSize: 16px; fontWeight: 400; lineHeight: 24px; letterSpacing: normal; color: rgb(245, 240, 235); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(245, 240, 235); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: grid-template-rows 0.3s ease-out; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `div.worked-at-row` | width: 343.333px; height: 68px; minHeight: auto; maxWidth: none; position: relative; top: 0px; right: 0px; bottom: 0px; left: 0px; padding: 0px; margin: 0px; gap: normal; display: block; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: "DM Sans", "DM Sans Fallback", ui-sans-serif, system-ui, sans-serif; fontSize: 16px; fontWeight: 400; lineHeight: 24px; letterSpacing: normal; color: rgb(245, 240, 235); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(245, 240, 235); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `div.worked-at-row-panel` | width: 343.333px; height: 0px; minHeight: 0px; maxWidth: none; position: static; top: auto; right: auto; bottom: auto; left: auto; padding: 0px; margin: 0px; gap: normal; display: grid; gridTemplateColumns: 343.333px; gridTemplateRows: 0px; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: "DM Sans", "DM Sans Fallback", ui-sans-serif, system-ui, sans-serif; fontSize: 16px; fontWeight: 400; lineHeight: 24px; letterSpacing: normal; color: rgb(245, 240, 235); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(245, 240, 235); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: grid-template-rows 0.3s ease-out; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `div.worked-at-crt` | width: auto; height: 378px; minHeight: 0px; maxWidth: 100%; position: relative; top: auto; right: auto; bottom: auto; left: auto; padding: 0px; margin: 0px; gap: normal; display: none; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: "DM Sans", "DM Sans Fallback", ui-sans-serif, system-ui, sans-serif; fontSize: 16px; fontWeight: 400; lineHeight: 24px; letterSpacing: normal; color: rgb(245, 240, 235); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(245, 240, 235); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: 669 / 415; mixBlendMode: normal; transform: none |
| `div.worked-at-col worked-at-col--right` | width: 100%; height: auto; minHeight: 0px; maxWidth: none; position: static; top: auto; right: auto; bottom: auto; left: auto; padding: 0px; margin: 0px; gap: 9px; display: contents; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: column; alignItems: normal; justifyContent: normal | fontFamily: "DM Sans", "DM Sans Fallback", ui-sans-serif, system-ui, sans-serif; fontSize: 16px; fontWeight: 400; lineHeight: 24px; letterSpacing: normal; color: rgb(245, 240, 235); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(245, 240, 235); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `div.worked-at-description` | width: auto; height: auto; minHeight: 0px; maxWidth: 553px; position: static; top: auto; right: auto; bottom: auto; left: auto; padding: 0px; margin: 0px; gap: normal; display: none; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: "DM Sans", "DM Sans Fallback", ui-sans-serif, system-ui, sans-serif; fontSize: 16px; fontWeight: 400; lineHeight: 25.6px; letterSpacing: normal; color: rgb(116, 119, 133); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(116, 119, 133); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |

## Computed layout at 768px

| Element | Geometry / layout | Typography / paint / state |
| --- | --- | --- |
| `div.worked-at-stage` | width: 768px; height: 1071.65px; minHeight: 0px; maxWidth: none; position: relative; top: 0px; right: 0px; bottom: 0px; left: 0px; padding: 0px; margin: 0px; gap: normal; display: block; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: "DM Sans", "DM Sans Fallback", ui-sans-serif, system-ui, sans-serif; fontSize: 16px; fontWeight: 400; lineHeight: 24px; letterSpacing: normal; color: rgb(245, 240, 235); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(245, 240, 235); borderRadius: 0px; boxShadow: none; zIndex: 0; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `section.worked-at` | width: 768px; height: 1071.65px; minHeight: 900px; maxWidth: none; position: relative; top: 0px; right: 0px; bottom: 0px; left: 0px; padding: 80px 32px 48px; margin: 0px; gap: normal; display: flex; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: column; alignItems: center; justifyContent: center | fontFamily: "DM Sans", "DM Sans Fallback", ui-sans-serif, system-ui, sans-serif; fontSize: 16px; fontWeight: 400; lineHeight: 24px; letterSpacing: normal; color: rgb(245, 240, 235); backgroundColor: rgb(0, 0, 0); border: ; borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `div.worked-at-heading` | width: 288.135px; height: 101.198px; minHeight: auto; maxWidth: none; position: static; top: auto; right: auto; bottom: auto; left: auto; padding: 0px; margin: 0px 0px 32px; gap: 24px; display: flex; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: column; alignItems: center; justifyContent: normal | fontFamily: "DM Sans", "DM Sans Fallback", ui-sans-serif, system-ui, sans-serif; fontSize: 16px; fontWeight: 400; lineHeight: 24px; letterSpacing: normal; color: rgb(245, 240, 235); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(245, 240, 235); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `span.worked-at-badge` | width: 77.1875px; height: 26px; minHeight: auto; maxWidth: none; position: static; top: auto; right: auto; bottom: auto; left: auto; padding: 7px 9px; margin: 0px; gap: normal; display: flex; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: center; justifyContent: normal | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 12px; fontWeight: 600; lineHeight: 12px; letterSpacing: 1.56px; color: rgb(7, 2, 16); backgroundColor: rgb(157, 241, 51); border: 0px solid rgb(7, 2, 16); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: polygon(0% 4px, 4px 0%, 100% 0%, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0% 100%); opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `h2.worked-at-title` | width: 288.135px; height: 51.1979px; minHeight: auto; maxWidth: none; position: static; top: auto; right: auto; bottom: auto; left: auto; padding: 0px; margin: 0px; gap: normal; display: block; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 64px; fontWeight: 500; lineHeight: 51.2px; letterSpacing: -1.28px; color: rgb(255, 255, 255); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(255, 255, 255); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `div.worked-at-body` | width: 704px; height: 809.781px; minHeight: auto; maxWidth: 1400px; position: static; top: auto; right: auto; bottom: auto; left: auto; padding: 0px; margin: 0px; gap: 28px 48px; display: grid; gridTemplateColumns: 328px 328px; gridTemplateRows: 378px 76.7812px 299px; gridTemplateAreas: "stage stage" "desc desc" "left right"; flexDirection: row; alignItems: start; justifyContent: normal | fontFamily: "DM Sans", "DM Sans Fallback", ui-sans-serif, system-ui, sans-serif; fontSize: 16px; fontWeight: 400; lineHeight: 24px; letterSpacing: normal; color: rgb(245, 240, 235); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(245, 240, 235); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `div.worked-at-col worked-at-col--left` | width: 328px; height: 299px; minHeight: auto; maxWidth: none; position: static; top: auto; right: auto; bottom: auto; left: auto; padding: 0px; margin: 0px; gap: 9px; display: flex; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: column; alignItems: normal; justifyContent: normal | fontFamily: "DM Sans", "DM Sans Fallback", ui-sans-serif, system-ui, sans-serif; fontSize: 16px; fontWeight: 400; lineHeight: 24px; letterSpacing: normal; color: rgb(245, 240, 235); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(245, 240, 235); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `div.worked-at-row` | width: 328px; height: 68px; minHeight: auto; maxWidth: none; position: relative; top: 0px; right: 0px; bottom: 0px; left: 0px; padding: 0px; margin: 0px; gap: normal; display: block; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: "DM Sans", "DM Sans Fallback", ui-sans-serif, system-ui, sans-serif; fontSize: 16px; fontWeight: 400; lineHeight: 24px; letterSpacing: normal; color: rgb(245, 240, 235); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(245, 240, 235); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `button.worked-at-row-button` | width: 328px; height: 68px; minHeight: 0px; maxWidth: none; position: relative; top: 0px; right: 0px; bottom: 0px; left: 0px; padding: 0px 22px; margin: 0px; gap: normal; display: flex; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: center; justifyContent: normal | fontFamily: "DM Sans", "DM Sans Fallback", ui-sans-serif, system-ui, sans-serif; fontSize: 16px; fontWeight: 400; lineHeight: 24px; letterSpacing: normal; color: rgb(245, 240, 235); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(245, 240, 235); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `div.worked-at-row-panel` | width: 328px; height: 0px; minHeight: 0px; maxWidth: none; position: static; top: auto; right: auto; bottom: auto; left: auto; padding: 0px; margin: 0px; gap: normal; display: grid; gridTemplateColumns: 328px; gridTemplateRows: 0px; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: "DM Sans", "DM Sans Fallback", ui-sans-serif, system-ui, sans-serif; fontSize: 16px; fontWeight: 400; lineHeight: 24px; letterSpacing: normal; color: rgb(245, 240, 235); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(245, 240, 235); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: grid-template-rows 0.3s ease-out; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `div.worked-at-crt` | width: 609.354px; height: 378px; minHeight: auto; maxWidth: 100%; position: relative; top: 0px; right: 0px; bottom: 0px; left: 0px; padding: 0px; margin: 0px; gap: normal; display: block; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: "DM Sans", "DM Sans Fallback", ui-sans-serif, system-ui, sans-serif; fontSize: 16px; fontWeight: 400; lineHeight: 24px; letterSpacing: normal; color: rgb(245, 240, 235); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(245, 240, 235); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: 669 / 415; mixBlendMode: normal; transform: none |
| `div.worked-at-col worked-at-col--right` | width: 328px; height: 222px; minHeight: auto; maxWidth: none; position: static; top: auto; right: auto; bottom: auto; left: auto; padding: 0px; margin: 0px; gap: 9px; display: flex; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: column; alignItems: normal; justifyContent: normal | fontFamily: "DM Sans", "DM Sans Fallback", ui-sans-serif, system-ui, sans-serif; fontSize: 16px; fontWeight: 400; lineHeight: 24px; letterSpacing: normal; color: rgb(245, 240, 235); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(245, 240, 235); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `div.worked-at-description` | width: 553px; height: 76.7812px; minHeight: auto; maxWidth: 553px; position: static; top: auto; right: auto; bottom: auto; left: auto; padding: 0px; margin: 0px; gap: normal; display: grid; gridTemplateColumns: 553px; gridTemplateRows: 76.7812px; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: "DM Sans", "DM Sans Fallback", ui-sans-serif, system-ui, sans-serif; fontSize: 16px; fontWeight: 400; lineHeight: 25.6px; letterSpacing: normal; color: rgb(116, 119, 133); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(116, 119, 133); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |

## Computed layout at 1440px

| Element | Geometry / layout | Typography / paint / state |
| --- | --- | --- |
| `div.worked-at-stage` | width: 1440px; height: 900px; minHeight: 0px; maxWidth: none; position: relative; top: 0px; right: 0px; bottom: 0px; left: 0px; padding: 0px; margin: -972px 0px 0px; gap: normal; display: block; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: "DM Sans", "DM Sans Fallback", ui-sans-serif, system-ui, sans-serif; fontSize: 16px; fontWeight: 400; lineHeight: 24px; letterSpacing: normal; color: rgb(245, 240, 235); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(245, 240, 235); borderRadius: 0px; boxShadow: none; zIndex: 0; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `section.worked-at` | width: 1440px; height: 900px; minHeight: 900px; maxWidth: none; position: relative; top: 0px; right: 0px; bottom: 0px; left: 0px; padding: 32px; margin: 0px; gap: normal; display: flex; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: column; alignItems: center; justifyContent: center | fontFamily: "DM Sans", "DM Sans Fallback", ui-sans-serif, system-ui, sans-serif; fontSize: 16px; fontWeight: 400; lineHeight: 24px; letterSpacing: normal; color: rgb(245, 240, 235); backgroundColor: rgb(0, 0, 0); border: ; borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `div.worked-at-heading` | width: 360.167px; height: 114px; minHeight: auto; maxWidth: none; position: static; top: auto; right: auto; bottom: auto; left: auto; padding: 0px; margin: 0px 0px 32px; gap: 24px; display: flex; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: column; alignItems: center; justifyContent: normal | fontFamily: "DM Sans", "DM Sans Fallback", ui-sans-serif, system-ui, sans-serif; fontSize: 16px; fontWeight: 400; lineHeight: 24px; letterSpacing: normal; color: rgb(245, 240, 235); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(245, 240, 235); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `span.worked-at-badge` | width: 77.1875px; height: 26px; minHeight: auto; maxWidth: none; position: static; top: auto; right: auto; bottom: auto; left: auto; padding: 7px 9px; margin: 0px; gap: normal; display: flex; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: center; justifyContent: normal | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 12px; fontWeight: 600; lineHeight: 12px; letterSpacing: 1.56px; color: rgb(7, 2, 16); backgroundColor: rgb(157, 241, 51); border: 0px solid rgb(7, 2, 16); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: polygon(0% 4px, 4px 0%, 100% 0%, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0% 100%); opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `h2.worked-at-title` | width: 360.167px; height: 64px; minHeight: auto; maxWidth: none; position: static; top: auto; right: auto; bottom: auto; left: auto; padding: 0px; margin: 0px; gap: normal; display: block; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 80px; fontWeight: 500; lineHeight: 64px; letterSpacing: -1.6px; color: rgb(255, 255, 255); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(255, 255, 255); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `div.worked-at-body` | width: 1376px; height: 482.781px; minHeight: auto; maxWidth: 1400px; position: static; top: auto; right: auto; bottom: auto; left: auto; padding: 0px; margin: 0px; gap: 28px 56px; display: grid; gridTemplateColumns: 257px 750px 257px; gridTemplateRows: 378px 76.7812px; gridTemplateAreas: "left stage right" "left desc right"; flexDirection: row; alignItems: start; justifyContent: normal | fontFamily: "DM Sans", "DM Sans Fallback", ui-sans-serif, system-ui, sans-serif; fontSize: 16px; fontWeight: 400; lineHeight: 24px; letterSpacing: normal; color: rgb(245, 240, 235); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(245, 240, 235); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `div.worked-at-col worked-at-col--left` | width: 257px; height: 299px; minHeight: auto; maxWidth: none; position: static; top: auto; right: auto; bottom: auto; left: auto; padding: 0px; margin: 0px; gap: 9px; display: flex; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: column; alignItems: normal; justifyContent: normal | fontFamily: "DM Sans", "DM Sans Fallback", ui-sans-serif, system-ui, sans-serif; fontSize: 16px; fontWeight: 400; lineHeight: 24px; letterSpacing: normal; color: rgb(245, 240, 235); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(245, 240, 235); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `div.worked-at-row` | width: 257px; height: 68px; minHeight: auto; maxWidth: none; position: relative; top: 0px; right: 0px; bottom: 0px; left: 0px; padding: 0px; margin: 0px; gap: normal; display: block; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: "DM Sans", "DM Sans Fallback", ui-sans-serif, system-ui, sans-serif; fontSize: 16px; fontWeight: 400; lineHeight: 24px; letterSpacing: normal; color: rgb(245, 240, 235); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(245, 240, 235); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `button.worked-at-row-button` | width: 257px; height: 68px; minHeight: 0px; maxWidth: none; position: relative; top: 0px; right: 0px; bottom: 0px; left: 0px; padding: 0px 22px; margin: 0px; gap: normal; display: flex; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: center; justifyContent: normal | fontFamily: "DM Sans", "DM Sans Fallback", ui-sans-serif, system-ui, sans-serif; fontSize: 16px; fontWeight: 400; lineHeight: 24px; letterSpacing: normal; color: rgb(245, 240, 235); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(245, 240, 235); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `div.worked-at-row-panel` | width: 257px; height: 0px; minHeight: 0px; maxWidth: none; position: static; top: auto; right: auto; bottom: auto; left: auto; padding: 0px; margin: 0px; gap: normal; display: grid; gridTemplateColumns: 257px; gridTemplateRows: 0px; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: "DM Sans", "DM Sans Fallback", ui-sans-serif, system-ui, sans-serif; fontSize: 16px; fontWeight: 400; lineHeight: 24px; letterSpacing: normal; color: rgb(245, 240, 235); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(245, 240, 235); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: grid-template-rows 0.3s ease-out; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `div.worked-at-crt` | width: 609.354px; height: 378px; minHeight: auto; maxWidth: 100%; position: relative; top: 0px; right: 0px; bottom: 0px; left: 0px; padding: 0px; margin: 0px; gap: normal; display: block; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: "DM Sans", "DM Sans Fallback", ui-sans-serif, system-ui, sans-serif; fontSize: 16px; fontWeight: 400; lineHeight: 24px; letterSpacing: normal; color: rgb(245, 240, 235); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(245, 240, 235); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: 669 / 415; mixBlendMode: normal; transform: none |
| `div.worked-at-col worked-at-col--right` | width: 257px; height: 222px; minHeight: auto; maxWidth: none; position: static; top: auto; right: auto; bottom: auto; left: auto; padding: 0px; margin: 0px; gap: 9px; display: flex; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: column; alignItems: normal; justifyContent: normal | fontFamily: "DM Sans", "DM Sans Fallback", ui-sans-serif, system-ui, sans-serif; fontSize: 16px; fontWeight: 400; lineHeight: 24px; letterSpacing: normal; color: rgb(245, 240, 235); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(245, 240, 235); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `div.worked-at-description` | width: 553px; height: 76.7812px; minHeight: auto; maxWidth: 553px; position: static; top: auto; right: auto; bottom: auto; left: auto; padding: 0px; margin: 0px; gap: normal; display: grid; gridTemplateColumns: 553px; gridTemplateRows: 76.7812px; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: "DM Sans", "DM Sans Fallback", ui-sans-serif, system-ui, sans-serif; fontSize: 16px; fontWeight: 400; lineHeight: 25.6px; letterSpacing: normal; color: rgb(116, 119, 133); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(116, 119, 133); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
