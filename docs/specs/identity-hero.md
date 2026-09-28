# Identity hero

## Evidence and scope

Source inspected 2026-09-28. Local evidence: docs/recon/REPORT.md, source-*.css/js, spec-computed-{375,768,1440}.json, existing full-page crops and recorded scroll states. No repeat screenshots. Only structure/styles/motion are adopted; all copy and destinations come from src/content/site.ts.

Measurements below are source computed values at viewport height 900px, scroll top 0; transformed rectangles are state-dependent and are not universal CSS dimensions. Repeated elements may have distinct sizes. Source class names identify evidence and need not become target component names.

## Layout

Hero pin height calc(100dvh - var(--nav-height)); 824px at height 900/nav 76. Pin travel 4.5 * innerHeight = 4050px at reference height. Contact gap 14px; badge padding 7px 9px. Rajdhani display, DM Sans introduction. Canvas layers remain decorative; semantic text remains DOM.

## States and interactions

Ready entrance: [data-reveal] .8s power3.out, stagger .06s, delay .1s. ScrollTrigger start top <nav-height>px, end +=4.5*innerHeight, pin true, scrub true; durations are scroll progress, not wall-clock seconds. Pointer drives portrait trail/hover; see webgl.md. Scroll cue CSS period 1.00866s, cubic-bezier(.5,0,.5,1). Split lines reveal .8s power3.out, stagger .08s at intersection threshold .2.

## Responsive behavior

375: region 120px/96px/-7.2px; name 100px/80px/-5px; introduction 14px/21px. 768: region 105.127px/84.1018px/-6.30763px; name 157.691px/126.153px/-9.46145px; introduction 20px/30px. 1440: region 119.52px/95.616px/-7.1712px; name 179.28px/143.424px/-10.7568px; introduction 19.92px/29.88px. Font weight 400 display, 500 introduction. Source fluid rules below take precedence over rounding these measurements. Reduced motion: readable static DOM and neutral portrait placeholder, no pin.

Custom breakpoints: mobile max-width 767.98px; tablet 768px–1024.98px; desktop min-width 1025px. Nav utility breakpoint 40rem. Retain fluid formulas rather than interpolating measured snapshots.

## Component tree

`IdentityHero > HeroPin > PortraitCanvas + ContactRail + Introduction + RoleBadge + RegionMarker + NameDisplay + ScrollCue; shared pin contains ManifestoScene.`

## Animation libraries

GSAP + ScrollTrigger + SplitText; custom WebGL2; CSS cue keyframes.

## Flags and handling

| Status / item | Handling |
| --- | --- |
| APPROXIMATED: replacement portrait and name composition | Use neutral same-size placeholder and Sreeram content. Do not reuse photograph or source name; natural text widths differ. Shader equations are readable, not approximated. |
| UNVERIFIED: original Three patch | Approved latest r185 patch pinned as three 0.185.1; no source patch string found. Source revision 185 verified. |

Tailwind source version is UNVERIFIED but explicitly approved to ignore: use installed Tailwind v4. No additional package needed. Reduced-motion and keyboard behavior above are target requirements where the source did not establish equivalent behavior.

## Layout property reference

Property tables retain cascade order and media conditions; no source implementation is included. Tokens map to the verified OKLCH equivalents in globals.css. Source utility classes are additionally represented by the computed tables below.

Context: `base`

Reference element: `.home-hero`.

| Property / input | Specified value |
| --- | --- |
| background | #000 |
| width | 100% |
| position | relative |


Context: `base`

Reference element: `.home-hero-bg`.

| Property / input | Specified value |
| --- | --- |
| z-index | 0 |
| position | absolute |
| inset | 0 |


Context: `base`

Reference element: `.home-hero-line-cap`.

| Property / input | Specified value |
| --- | --- |
| width | var(--scroller-width,100%) |
| height | var(--nav-height,0px) |
| z-index | 0 |
| pointer-events | none |
| visibility | hidden |
| position | fixed |
| top | 0 |
| left | 0 |


Context: `base`

Reference element: `.home-hero-pin`.

| Property / input | Specified value |
| --- | --- |
| height | calc(100dvh - var(--nav-height,5rem)) |
| width | 100% |
| position | relative |
| overflow | hidden |


Context: `base`

Reference element: `.home-hero .shared-v-line:nth-child(3)`.

| Property / input | Specified value |
| --- | --- |
| left | var(--line3-x,calc(40% + .4rem)) |


Context: `@media (max-width:767.98px)`

Reference element: `.home-hero .shared-v-line:nth-child(3)`.

| Property / input | Specified value |
| --- | --- |
| left | calc(100% - 16px) |


Context: `@media (min-width:768px)`

Reference element: `.home-hero-bottom-cluster`.

| Property / input | Specified value |
| --- | --- |
| height | calc(51.6875rem * var(--v-scale,1)) |
| position | absolute |
| inset | auto 0 2rem |


Context: `@media (min-width:768px) and (max-width:1024.98px)`

Reference element: `.home-hero-bottom-cluster`.

| Property / input | Specified value |
| --- | --- |
| height | calc(70.465rem * var(--v-scale,1)) |


Context: `@media (max-width:767.98px)`

Reference element: `.home-hero-bottom-cluster`.

| Property / input | Specified value |
| --- | --- |
| height | calc(42.875rem * var(--v-scale,1)) |
| position | absolute |
| inset | auto 0 1rem |


Context: `base`

Reference element: `.home-contact`.

| Property / input | Specified value |
| --- | --- |
| left | 2rem |
| top | calc(2rem * var(--v-scale,1)) |
| mix-blend-mode | normal |
| align-items | stretch |
| gap | .875rem |
| width | calc(20% - .8rem) |
| display | flex |


Context: `@media (min-width:768px) and (max-width:1024.98px)`

Reference element: `.home-contact`.

| Property / input | Specified value |
| --- | --- |
| top | calc(1.5rem * var(--v-scale,1)) |
| width | 14.25rem |


Context: `@media (max-width:767.98px)`

Reference element: `.home-contact`.

| Property / input | Specified value |
| --- | --- |
| left | 1rem |
| top | calc(1.5rem * var(--v-scale,1)) |
| width | 14.25rem |


Context: `base`

Reference element: `.home-contact-bar`.

| Property / input | Specified value |
| --- | --- |
| background | var(--primary-green-neon) |
| flex | none |
| width | 2px |


Context: `base`

Reference element: `.home-contact-stack`.

| Property / input | Specified value |
| --- | --- |
| min-width | 0 |
| font-family | var(--font-heading) |
| letter-spacing | .0975rem |
| text-transform | uppercase |
| color | var(--text-grey-1) |
| white-space | nowrap |
| flex-direction | column |
| flex | 1 |
| gap | .5rem |
| font-size | .75rem |
| font-weight | 500 |
| line-height | 1 |
| display | flex |


Context: `base`

Reference element: `.home-contact-row-mask`.

| Property / input | Specified value |
| --- | --- |
| clip-path | inset(0) |
| overflow | hidden |


Context: `base`

Reference element: `.home-contact-row`.

| Property / input | Specified value |
| --- | --- |
| justify-content | space-between |
| align-items | center |
| display | flex |


Context: `base`

Reference element: `.home-contact-row .home-contact-group`.

| Property / input | Specified value |
| --- | --- |
| justify-content | space-between |
| align-items | center |
| width | 6.1875rem |
| display | flex |


Context: `base`

Reference element: `.home-intro`.

| Property / input | Specified value |
| --- | --- |
| left | 2rem |
| top | calc(12rem * var(--v-scale,1)) |
| width | calc(40% - 1.6rem) |
| font-family | var(--font-sans) |
| letter-spacing | -.03em |
| color | var(--text-grey-1) |
| mix-blend-mode | plus-lighter |
| text-align | justify |
| font-size | 1.25rem |
| font-weight | 500 |
| line-height | 1.5 |


Context: `base`

Reference element: `.home-intro .split-line-mask:not(:last-child) .split-line-inner`.

| Property / input | Specified value |
| --- | --- |
| text-align-last | justify |


Context: `@media (min-width:1025px)`

Reference element: `.home-intro`.

| Property / input | Specified value |
| --- | --- |
| font-size | calc(1.25rem * var(--v-scale,1)) |


Context: `@media (min-width:768px) and (max-width:1024.98px)`

Reference element: `.home-intro`.

| Property / input | Specified value |
| --- | --- |
| top | calc(22.375rem * var(--v-scale,1)) |


Context: `@media (max-width:767.98px)`

Reference element: `.home-intro`.

| Property / input | Specified value |
| --- | --- |
| width | 18.4375rem |
| font-size | .875rem |
| top | 17.1875rem |
| left | 1rem |


Context: `base`

Reference element: `.home-intro-indent`.

| Property / input | Specified value |
| --- | --- |
| width | 50% |
| display | inline-block |


Context: `@media (max-width:767.98px)`

Reference element: `.home-intro-indent`.

| Property / input | Specified value |
| --- | --- |
| display | none |


Context: `@media (max-width:767.98px) and (max-height:760px)`

Reference element: `.home-intro`.

| Property / input | Specified value |
| --- | --- |
| top | 11rem |


Context: `base`

Reference element: `.home-intro-accent-art`.

| Property / input | Specified value |
| --- | --- |
| color | #f75049 |
| font-style | italic |


Context: `base`

Reference element: `.home-intro-accent-tech`.

| Property / input | Specified value |
| --- | --- |
| color | var(--primary-green-neon) |


Context: `base`

Reference element: `.home-badge`.

| Property / input | Specified value |
| --- | --- |
| left | 2rem |
| top | calc(34.5rem * var(--v-scale,1)) |
| background | var(--primary-green-neon) |
| font-family | var(--font-heading) |
| letter-spacing | .0975rem |
| text-transform | uppercase |
| color | #070210 |
| white-space | nowrap |
| align-items | center |
| padding | .4375rem .5625rem |
| font-size | .75rem |
| font-weight | 600 |
| line-height | 1 |
| display | inline-flex |


Context: `@media (min-width:768px) and (max-width:1024.98px)`

Reference element: `.home-badge`.

| Property / input | Specified value |
| --- | --- |
| top | calc(46.5rem * var(--v-scale,1)) |


Context: `@media (max-width:767.98px)`

Reference element: `.home-badge`.

| Property / input | Specified value |
| --- | --- |
| left | 1rem |
| top | calc(29.25rem * var(--v-scale,1)) |


Context: `base`

Reference element: `.home-badge-char-mask`.

| Property / input | Specified value |
| --- | --- |
| display | inline-block |
| overflow | hidden |


Context: `base`

Reference element: `.home-badge-char-inner`.

| Property / input | Specified value |
| --- | --- |
| white-space | pre |
| display | inline-block |


Context: `base`

Reference element: `.home-label`.

| Property / input | Specified value |
| --- | --- |
| font-family | var(--font-heading) |
| letter-spacing | .0975rem |
| text-transform | uppercase |
| color | var(--text-grey-1) |
| white-space | nowrap |
| margin | 0 |
| font-size | .75rem |
| font-weight | 500 |
| line-height | 1 |


Context: `base`

Reference element: `.home-label--dad`.

| Property / input | Specified value |
| --- | --- |
| left | 2rem |
| top | calc(41.0338rem * var(--v-scale,1)) |


Context: `base`

Reference element: `.home-label--pets`.

| Property / input | Specified value |
| --- | --- |
| left | auto |
| right | calc(80% - 1.2rem - 26.9136rem * var(--v-scale,1) - .0853rem) |
| top | calc(49.7841rem * var(--v-scale,1)) |


Context: `base`

Reference element: `.home-label--age`.

| Property / input | Specified value |
| --- | --- |
| left | calc(60% - .4rem) |
| top | calc(48.7418rem * var(--v-scale,1)) |
| font-family | var(--font-heading) |
| font-weight | 500 |
| font-size | calc(2.5rem * var(--v-scale,1)) |
| color | var(--text-white) |
| text-transform | none |
| line-height | .8 |


Context: `base`

Reference element: `.home-label--from`.

| Property / input | Specified value |
| --- | --- |
| right | calc(20% + 1.2rem) |
| top | calc(2rem * var(--v-scale,1)) |
| text-align | right |


Context: `@media (min-width:768px) and (max-width:1024.98px)`

Reference element: `.home-label--dad`.

| Property / input | Specified value |
| --- | --- |
| top | calc(49.5rem * var(--v-scale,1)) |


Context: `@media (min-width:768px) and (max-width:1024.98px)`

Reference element: `.home-label--pets`.

| Property / input | Specified value |
| --- | --- |
| top | calc(49.5rem * var(--v-scale,1)) |
| left | auto |
| right | calc(100% - 2rem - 28.14rem * var(--v-scale,1) - 1.22px) |


Context: `@media (min-width:768px) and (max-width:1024.98px)`

Reference element: `.home-label--age`.

| Property / input | Specified value |
| --- | --- |
| top | calc(52.1125rem * var(--v-scale,1)) |
| left | auto |
| right | 2rem |


Context: `@media (min-width:768px) and (max-width:1024.98px)`

Reference element: `.home-label--from`.

| Property / input | Specified value |
| --- | --- |
| top | calc(1.5rem * var(--v-scale,1)) |


Context: `@media (max-width:767.98px)`

Reference element: `.home-label--dad`.

| Property / input | Specified value |
| --- | --- |
| left | 1rem |
| top | calc(31.6875rem * var(--v-scale,1)) |


Context: `@media (max-width:767.98px)`

Reference element: `.home-label--pets`.

| Property / input | Specified value |
| --- | --- |
| left | auto |
| right | calc(100% - 1rem - 15.4375rem * var(--v-scale,1)) |
| top | calc(31.6875rem * var(--v-scale,1)) |


Context: `@media (max-width:767.98px)`

Reference element: `.home-label--age`.

| Property / input | Specified value |
| --- | --- |
| left | auto |
| right | 1rem |
| top | calc(40.7938rem * var(--v-scale,1)) |
| font-size | calc(2rem * var(--v-scale,1)) |


Context: `@media (max-width:767.98px)`

Reference element: `.home-label--from`.

| Property / input | Specified value |
| --- | --- |
| display | none |


Context: `base`

Reference element: `.home-scroll-cue`.

| Property / input | Specified value |
| --- | --- |
| right | 2rem |
| bottom | calc(1.1875rem * var(--v-scale,1)) |
| color | var(--text-grey-1) |
| mix-blend-mode | normal |
| flex-direction | column |
| align-items | center |
| gap | 1.125rem |
| display | flex |
| position | absolute |


Context: `base`

Reference element: `.home-scroll-label`.

| Property / input | Specified value |
| --- | --- |
| writing-mode | vertical-rl |
| font-family | var(--font-heading) |
| letter-spacing | .0975rem |
| text-transform | uppercase |
| white-space | nowrap |
| font-size | .75rem |
| font-weight | 500 |
| line-height | 1 |


Context: `base`

Reference element: `.home-scroll-arrow`.

| Property / input | Specified value |
| --- | --- |
| flex | none |
| width | .45rem |
| height | 1.15rem |
| display | block |


Context: `base`

Animation reference `@keyframes home-scroll-chevron-a`: At 0%: opacity = .5, animation-timing-function = cubic-bezier(.5,0,.5,1). At 33.38%: opacity = 1, animation-timing-function = cubic-bezier(.5,0,.5,1). At 66.15%: opacity = .75, animation-timing-function = cubic-bezier(.5,0,.5,1). At 99.27%: opacity = .5, animation-timing-function = linear.


Context: `base`

Animation reference `@keyframes home-scroll-chevron-b`: At 0%: opacity = .75, animation-timing-function = cubic-bezier(.5,0,.5,1). At 33.38%: opacity = .5, animation-timing-function = cubic-bezier(.5,0,.5,1). At 66.15%: opacity = 1, animation-timing-function = cubic-bezier(.5,0,.5,1). At 99.27%: opacity = .75, animation-timing-function = linear.


Context: `base`

Animation reference `@keyframes home-scroll-chevron-c`: At 0%: opacity = 1, animation-timing-function = cubic-bezier(.5,0,.5,1). At 33.38%: opacity = .75, animation-timing-function = cubic-bezier(.5,0,.5,1). At 66.15%: opacity = .5, animation-timing-function = cubic-bezier(.5,0,.5,1). At 99.27%: opacity = 1, animation-timing-function = linear.


Context: `base`

Reference element: `.home-scroll-chevron-1`.

| Property / input | Specified value |
| --- | --- |
| animation | 1.00866s linear infinite home-scroll-chevron-a |


Context: `base`

Reference element: `.home-scroll-chevron-2`.

| Property / input | Specified value |
| --- | --- |
| animation | 1.00866s linear infinite home-scroll-chevron-b |


Context: `base`

Reference element: `.home-scroll-chevron-3`.

| Property / input | Specified value |
| --- | --- |
| animation | 1.00866s linear infinite home-scroll-chevron-c |


Context: `@media (prefers-reduced-motion:reduce)`

Reference element: `.home-scroll-chevron-1`.

| Property / input | Specified value |
| --- | --- |
| opacity | .5 |
| animation | none |


Context: `@media (prefers-reduced-motion:reduce)`

Reference element: `.home-scroll-chevron-2`.

| Property / input | Specified value |
| --- | --- |
| opacity | .75 |
| animation | none |


Context: `@media (prefers-reduced-motion:reduce)`

Reference element: `.home-scroll-chevron-3`.

| Property / input | Specified value |
| --- | --- |
| opacity | 1 |
| animation | none |


Context: `@media (min-width:768px) and (max-width:1024.98px)`

Reference element: `.home-scroll-cue`.

| Property / input | Specified value |
| --- | --- |
| bottom | calc(1.254rem * var(--v-scale,1)) |


Context: `@media (max-width:767.98px)`

Reference element: `.home-scroll-cue`.

| Property / input | Specified value |
| --- | --- |
| display | none |


Context: `base`

Reference element: `.home-portrait`.

| Property / input | Specified value |
| --- | --- |
| height | calc(100svh - var(--nav-height,5rem)) |
| position | absolute |
| top | 0 |
| left | 0 |
| right | 0 |


Context: `@media (max-width:767.98px)`

Reference element: `.home-portrait`.

| Property / input | Specified value |
| --- | --- |
| opacity | .5 |


## Computed layout at 375px

| Element | Geometry / layout | Typography / paint / state |
| --- | --- | --- |
| `section.home-hero` | width: 375.333px; height: 4874px; minHeight: 0px; maxWidth: none; position: relative; top: 0px; right: 0px; bottom: 0px; left: 0px; padding: 0px; margin: 0px; gap: normal; display: block; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: "DM Sans", "DM Sans Fallback", ui-sans-serif, system-ui, sans-serif; fontSize: 16px; fontWeight: 400; lineHeight: 24px; letterSpacing: normal; color: rgb(245, 240, 235); backgroundColor: rgb(0, 0, 0); border: 0px solid rgb(245, 240, 235); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `div.home-hero-pin` | width: 375.323px; height: 824px; minHeight: 0px; maxWidth: 375.333px; position: relative; top: 0px; right: 0px; bottom: 0px; left: 0px; padding: 0px; margin: 0px; gap: normal; display: block; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: "DM Sans", "DM Sans Fallback", ui-sans-serif, system-ui, sans-serif; fontSize: 16px; fontWeight: 400; lineHeight: 24px; letterSpacing: normal; color: rgb(245, 240, 235); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(245, 240, 235); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: matrix(1, 0, 0, 1, 0, 0.001) |
| `div.home-hero-bg` | width: 375.323px; height: 824px; minHeight: 0px; maxWidth: none; position: absolute; top: 0px; right: 0px; bottom: 0px; left: 0px; padding: 0px; margin: 0px; gap: normal; display: block; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: "DM Sans", "DM Sans Fallback", ui-sans-serif, system-ui, sans-serif; fontSize: 16px; fontWeight: 400; lineHeight: 24px; letterSpacing: normal; color: rgb(245, 240, 235); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(245, 240, 235); borderRadius: 0px; boxShadow: none; zIndex: 0; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `div.home-portrait` | width: 375.323px; height: 824px; minHeight: 0px; maxWidth: none; position: absolute; top: 0px; right: 0px; bottom: 0px; left: 0px; padding: 0px; margin: 0px; gap: normal; display: block; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: "DM Sans", "DM Sans Fallback", ui-sans-serif, system-ui, sans-serif; fontSize: 16px; fontWeight: 400; lineHeight: 24px; letterSpacing: normal; color: rgb(245, 240, 235); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(245, 240, 235); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: matrix(1, 0, 0, 1, 0, 0) |
| `p.home-layer home-label home-label--from` | width: auto; height: auto; minHeight: 0px; maxWidth: none; position: absolute; top: 32px; right: calc(20% + 19.2px); bottom: auto; left: auto; padding: 0px; margin: 0px; gap: normal; display: none; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 12px; fontWeight: 500; lineHeight: 12px; letterSpacing: 1.56px; color: rgb(116, 119, 133); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(116, 119, 133); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: plus-lighter; transform: none |
| `div.home-layer home-contact` | width: 228px; height: 32px; minHeight: 0px; maxWidth: none; position: absolute; top: 24px; right: 131.323px; bottom: 768px; left: 16px; padding: 0px; margin: 0px; gap: 14px; display: flex; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: stretch; justifyContent: normal | fontFamily: "DM Sans", "DM Sans Fallback", ui-sans-serif, system-ui, sans-serif; fontSize: 16px; fontWeight: 400; lineHeight: 24px; letterSpacing: normal; color: rgb(245, 240, 235); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(245, 240, 235); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `div.home-contact-stack` | width: 212px; height: 32px; minHeight: auto; maxWidth: none; position: static; top: auto; right: auto; bottom: auto; left: auto; padding: 0px; margin: 0px; gap: 8px; display: flex; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: column; alignItems: normal; justifyContent: normal | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 12px; fontWeight: 500; lineHeight: 12px; letterSpacing: 1.56px; color: rgb(116, 119, 133); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(116, 119, 133); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `p.home-layer home-intro` | width: 295px; height: 84px; minHeight: 0px; maxWidth: none; position: absolute; top: 275px; right: 64.3229px; bottom: 465px; left: 16px; padding: 0px; margin: 0px; gap: normal; display: block; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: "DM Sans", "DM Sans Fallback", ui-sans-serif, system-ui, sans-serif; fontSize: 14px; fontWeight: 500; lineHeight: 21px; letterSpacing: -0.42px; color: rgb(116, 119, 133); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(116, 119, 133); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: plus-lighter; transform: none |
| `span.home-layer home-badge` | width: 187.531px; height: 26px; minHeight: 0px; maxWidth: none; position: absolute; top: 468px; right: 171.792px; bottom: 192px; left: 16px; padding: 7px 9px; margin: 0px; gap: normal; display: flex; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: center; justifyContent: normal | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 12px; fontWeight: 600; lineHeight: 12px; letterSpacing: 1.56px; color: rgb(7, 2, 16); backgroundColor: rgb(157, 241, 51); border: 0px solid rgb(7, 2, 16); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: polygon(0px 4px, 4px 0px, 188px 0px, 188px 16px, 178px 26px, 0px 26px); opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: plus-lighter; transform: matrix(1, 0, 0, 1, 0, 0) |
| `p.home-layer home-label home-label--dad` | width: 37.1667px; height: 12px; minHeight: 0px; maxWidth: none; position: absolute; top: 507px; right: 322.156px; bottom: 167px; left: 16px; padding: 0px; margin: 0px; gap: normal; display: block; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 12px; fontWeight: 500; lineHeight: 12px; letterSpacing: 1.56px; color: rgb(116, 119, 133); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(116, 119, 133); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: plus-lighter; transform: none |
| `p.home-layer home-label home-label--pets` | width: 146.375px; height: 12px; minHeight: 0px; maxWidth: none; position: absolute; top: 507px; right: 112.323px; bottom: 167px; left: 116.625px; padding: 0px; margin: 0px; gap: normal; display: block; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 12px; fontWeight: 500; lineHeight: 12px; letterSpacing: 1.56px; color: rgb(116, 119, 133); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(116, 119, 133); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: plus-lighter; transform: none |
| `div.home-layer home-scroll-cue` | width: auto; height: auto; minHeight: 0px; maxWidth: none; position: absolute; top: auto; right: 32px; bottom: 19px; left: auto; padding: 0px; margin: 0px; gap: 18px; display: none; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: column; alignItems: center; justifyContent: normal | fontFamily: "DM Sans", "DM Sans Fallback", ui-sans-serif, system-ui, sans-serif; fontSize: 16px; fontWeight: 400; lineHeight: 24px; letterSpacing: normal; color: rgb(116, 119, 133); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(116, 119, 133); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `p.home-layer home-label home-label--age` | width: 42.6354px; height: 25.5938px; minHeight: 0px; maxWidth: none; position: absolute; top: 652.701px; right: 16px; bottom: 7.70833px; left: 316.688px; padding: 0px; margin: 0px; gap: normal; display: block; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 32px; fontWeight: 500; lineHeight: 25.6px; letterSpacing: 1.56px; color: rgb(255, 255, 255); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(255, 255, 255); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: plus-lighter; transform: none |

## Computed layout at 768px

| Element | Geometry / layout | Typography / paint / state |
| --- | --- | --- |
| `section.home-hero` | width: 768px; height: 4874px; minHeight: 0px; maxWidth: none; position: relative; top: 0px; right: 0px; bottom: 0px; left: 0px; padding: 0px; margin: 0px; gap: normal; display: block; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: "DM Sans", "DM Sans Fallback", ui-sans-serif, system-ui, sans-serif; fontSize: 16px; fontWeight: 400; lineHeight: 24px; letterSpacing: normal; color: rgb(245, 240, 235); backgroundColor: rgb(0, 0, 0); border: 0px solid rgb(245, 240, 235); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `div.home-hero-pin` | width: 768px; height: 824px; minHeight: 0px; maxWidth: 768px; position: relative; top: 0px; right: 0px; bottom: 0px; left: 0px; padding: 0px; margin: 0px; gap: normal; display: block; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: "DM Sans", "DM Sans Fallback", ui-sans-serif, system-ui, sans-serif; fontSize: 16px; fontWeight: 400; lineHeight: 24px; letterSpacing: normal; color: rgb(245, 240, 235); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(245, 240, 235); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: matrix(1, 0, 0, 1, 0, 0.001) |
| `div.home-hero-bg` | width: 768px; height: 824px; minHeight: 0px; maxWidth: none; position: absolute; top: 0px; right: 0px; bottom: 0px; left: 0px; padding: 0px; margin: 0px; gap: normal; display: block; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: "DM Sans", "DM Sans Fallback", ui-sans-serif, system-ui, sans-serif; fontSize: 16px; fontWeight: 400; lineHeight: 24px; letterSpacing: normal; color: rgb(245, 240, 235); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(245, 240, 235); borderRadius: 0px; boxShadow: none; zIndex: 0; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `div.home-portrait` | width: 768px; height: 824px; minHeight: 0px; maxWidth: none; position: absolute; top: 0px; right: 0px; bottom: 0px; left: 0px; padding: 0px; margin: 0px; gap: normal; display: block; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: "DM Sans", "DM Sans Fallback", ui-sans-serif, system-ui, sans-serif; fontSize: 16px; fontWeight: 400; lineHeight: 24px; letterSpacing: normal; color: rgb(245, 240, 235); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(245, 240, 235); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: matrix(1, 0, 0, 1, 0, 0) |
| `p.home-layer home-label home-label--from` | width: 33.2708px; height: 12px; minHeight: 0px; maxWidth: none; position: absolute; top: 20.088px; right: 172.792px; bottom: 791.917px; left: 561.938px; padding: 0px; margin: 0px; gap: normal; display: block; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 12px; fontWeight: 500; lineHeight: 12px; letterSpacing: 1.56px; color: rgb(116, 119, 133); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(116, 119, 133); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: plus-lighter; transform: none |
| `div.home-layer home-contact` | width: 228px; height: 32px; minHeight: 0px; maxWidth: none; position: absolute; top: 20.088px; right: 508px; bottom: 771.917px; left: 32px; padding: 0px; margin: 0px; gap: 14px; display: flex; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: stretch; justifyContent: normal | fontFamily: "DM Sans", "DM Sans Fallback", ui-sans-serif, system-ui, sans-serif; fontSize: 16px; fontWeight: 400; lineHeight: 24px; letterSpacing: normal; color: rgb(245, 240, 235); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(245, 240, 235); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `div.home-contact-stack` | width: 212px; height: 32px; minHeight: auto; maxWidth: none; position: static; top: auto; right: auto; bottom: auto; left: auto; padding: 0px; margin: 0px; gap: 8px; display: flex; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: column; alignItems: normal; justifyContent: normal | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 12px; fontWeight: 500; lineHeight: 12px; letterSpacing: 1.56px; color: rgb(116, 119, 133); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(116, 119, 133); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `p.home-layer home-intro` | width: 281.594px; height: 210px; minHeight: 0px; maxWidth: none; position: absolute; top: 299.646px; right: 454.406px; bottom: 314.354px; left: 32px; padding: 0px; margin: 0px; gap: normal; display: block; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: "DM Sans", "DM Sans Fallback", ui-sans-serif, system-ui, sans-serif; fontSize: 20px; fontWeight: 500; lineHeight: 30px; letterSpacing: -0.6px; color: rgb(116, 119, 133); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(116, 119, 133); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: plus-lighter; transform: none |
| `span.home-layer home-badge` | width: 187.531px; height: 26px; minHeight: 0px; maxWidth: none; position: absolute; top: 622.728px; right: 548.469px; bottom: 294.948px; left: 32px; padding: 7px 9px; margin: 0px; gap: normal; display: flex; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: center; justifyContent: normal | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 12px; fontWeight: 600; lineHeight: 12px; letterSpacing: 1.56px; color: rgb(7, 2, 16); backgroundColor: rgb(157, 241, 51); border: 0px solid rgb(7, 2, 16); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: polygon(0px 4px, 4px 0px, 188px 0px, 188px 16px, 178px 26px, 0px 26px); opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: plus-lighter; transform: matrix(1, 0, 0, 1, 0, 0) |
| `p.home-layer home-label home-label--dad` | width: 37.1667px; height: 12px; minHeight: 0px; maxWidth: none; position: absolute; top: 662.904px; right: 698.833px; bottom: 268.771px; left: 32px; padding: 0px; margin: 0px; gap: normal; display: block; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 12px; fontWeight: 500; lineHeight: 12px; letterSpacing: 1.56px; color: rgb(116, 119, 133); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(116, 119, 133); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: plus-lighter; transform: none |
| `p.home-layer home-label home-label--pets` | width: 146.375px; height: 12px; minHeight: 0px; maxWidth: none; position: absolute; top: 662.904px; right: 357.927px; bottom: 268.771px; left: 263.698px; padding: 0px; margin: 0px; gap: normal; display: block; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 12px; fontWeight: 500; lineHeight: 12px; letterSpacing: 1.56px; color: rgb(116, 119, 133); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(116, 119, 133); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: plus-lighter; transform: none |
| `div.home-layer home-scroll-cue` | width: 12px; height: 123.51px; minHeight: 0px; maxWidth: none; position: absolute; top: 803.365px; right: 32px; bottom: 16.7936px; left: 724px; padding: 0px; margin: 0px; gap: 18px; display: flex; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: column; alignItems: center; justifyContent: normal | fontFamily: "DM Sans", "DM Sans Fallback", ui-sans-serif, system-ui, sans-serif; fontSize: 16px; fontWeight: 400; lineHeight: 24px; letterSpacing: normal; color: rgb(116, 119, 133); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(116, 119, 133); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `p.home-layer home-label home-label--age` | width: 44.3958px; height: 26.7812px; minHeight: 0px; maxWidth: none; position: absolute; top: 697.891px; right: 32px; bottom: 219px; left: 691.604px; padding: 0px; margin: 0px; gap: normal; display: block; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 33.48px; fontWeight: 500; lineHeight: 26.784px; letterSpacing: 1.56px; color: rgb(255, 255, 255); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(255, 255, 255); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: plus-lighter; transform: none |

## Computed layout at 1440px

| Element | Geometry / layout | Typography / paint / state |
| --- | --- | --- |
| `section.home-hero` | width: 1440px; height: 4874px; minHeight: 0px; maxWidth: none; position: relative; top: 0px; right: 0px; bottom: 0px; left: 0px; padding: 0px; margin: 0px; gap: normal; display: block; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: "DM Sans", "DM Sans Fallback", ui-sans-serif, system-ui, sans-serif; fontSize: 16px; fontWeight: 400; lineHeight: 24px; letterSpacing: normal; color: rgb(245, 240, 235); backgroundColor: rgb(0, 0, 0); border: 0px solid rgb(245, 240, 235); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `div.home-hero-pin` | width: 1440px; height: 824px; minHeight: 0px; maxWidth: 1440px; position: relative; top: 0px; right: 0px; bottom: 0px; left: 0px; padding: 0px; margin: 0px; gap: normal; display: block; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: "DM Sans", "DM Sans Fallback", ui-sans-serif, system-ui, sans-serif; fontSize: 16px; fontWeight: 400; lineHeight: 24px; letterSpacing: normal; color: rgb(245, 240, 235); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(245, 240, 235); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: matrix(1, 0, 0, 1, 0, 0.001) |
| `div.home-hero-bg` | width: 1440px; height: 824px; minHeight: 0px; maxWidth: none; position: absolute; top: 0px; right: 0px; bottom: 0px; left: 0px; padding: 0px; margin: 0px; gap: normal; display: block; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: "DM Sans", "DM Sans Fallback", ui-sans-serif, system-ui, sans-serif; fontSize: 16px; fontWeight: 400; lineHeight: 24px; letterSpacing: normal; color: rgb(245, 240, 235); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(245, 240, 235); borderRadius: 0px; boxShadow: none; zIndex: 0; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `div.home-portrait` | width: 1440px; height: 824px; minHeight: 0px; maxWidth: none; position: absolute; top: 0px; right: 0px; bottom: 0px; left: 0px; padding: 0px; margin: 0px; gap: normal; display: block; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: "DM Sans", "DM Sans Fallback", ui-sans-serif, system-ui, sans-serif; fontSize: 16px; fontWeight: 400; lineHeight: 24px; letterSpacing: normal; color: rgb(245, 240, 235); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(245, 240, 235); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: matrix(1, 0, 0, 1, 0, 0) |
| `p.home-layer home-label home-label--from` | width: 33.2708px; height: 12px; minHeight: 0px; maxWidth: none; position: absolute; top: 31.872px; right: 307.198px; bottom: 780.135px; left: 1099.53px; padding: 0px; margin: 0px; gap: normal; display: block; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 12px; fontWeight: 500; lineHeight: 12px; letterSpacing: 1.56px; color: rgb(116, 119, 133); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(116, 119, 133); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: plus-lighter; transform: none |
| `div.home-layer home-contact` | width: 275.198px; height: 32px; minHeight: 0px; maxWidth: none; position: absolute; top: 31.872px; right: 1132.8px; bottom: 760.135px; left: 32px; padding: 0px; margin: 0px; gap: 14px; display: flex; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: stretch; justifyContent: normal | fontFamily: "DM Sans", "DM Sans Fallback", ui-sans-serif, system-ui, sans-serif; fontSize: 16px; fontWeight: 400; lineHeight: 24px; letterSpacing: normal; color: rgb(245, 240, 235); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(245, 240, 235); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `div.home-contact-stack` | width: 259.198px; height: 32px; minHeight: auto; maxWidth: none; position: static; top: auto; right: auto; bottom: auto; left: auto; padding: 0px; margin: 0px; gap: 8px; display: flex; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: column; alignItems: normal; justifyContent: normal | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 12px; fontWeight: 500; lineHeight: 12px; letterSpacing: 1.56px; color: rgb(116, 119, 133); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(116, 119, 133); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `p.home-layer home-intro` | width: 550.396px; height: 119.5px; minHeight: 0px; maxWidth: none; position: absolute; top: 191.232px; right: 857.604px; bottom: 513.271px; left: 32px; padding: 0px; margin: 0px; gap: normal; display: block; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: "DM Sans", "DM Sans Fallback", ui-sans-serif, system-ui, sans-serif; fontSize: 19.92px; fontWeight: 500; lineHeight: 29.88px; letterSpacing: -0.5976px; color: rgb(116, 119, 133); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(116, 119, 133); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: plus-lighter; transform: none |
| `span.home-layer home-badge` | width: 187.531px; height: 26px; minHeight: 0px; maxWidth: none; position: absolute; top: 549.792px; right: 1220.47px; bottom: 247.896px; left: 32px; padding: 7px 9px; margin: 0px; gap: normal; display: flex; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: center; justifyContent: normal | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 12px; fontWeight: 600; lineHeight: 12px; letterSpacing: 1.56px; color: rgb(7, 2, 16); backgroundColor: rgb(157, 241, 51); border: 0px solid rgb(7, 2, 16); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: polygon(0px 4px, 4px 0px, 188px 0px, 188px 16px, 178px 26px, 0px 26px); opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: plus-lighter; transform: matrix(1, 0, 0, 1, 0, 0) |
| `p.home-layer home-label home-label--dad` | width: 37.1667px; height: 12px; minHeight: 0px; maxWidth: none; position: absolute; top: 653.915px; right: 1370.83px; bottom: 157.781px; left: 32px; padding: 0px; margin: 0px; gap: normal; display: block; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 12px; fontWeight: 500; lineHeight: 12px; letterSpacing: 1.56px; color: rgb(116, 119, 133); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(116, 119, 133); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: plus-lighter; transform: none |
| `p.home-layer home-label home-label--pets` | width: 146.375px; height: 12px; minHeight: 0px; maxWidth: none; position: absolute; top: 793.359px; right: 702.531px; bottom: 18.3333px; left: 591.094px; padding: 0px; margin: 0px; gap: normal; display: block; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 12px; fontWeight: 500; lineHeight: 12px; letterSpacing: 1.56px; color: rgb(116, 119, 133); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(116, 119, 133); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: plus-lighter; transform: none |
| `div.home-layer home-scroll-cue` | width: 12px; height: 123.51px; minHeight: 0px; maxWidth: none; position: absolute; top: 681.26px; right: 32px; bottom: 18.924px; left: 1396px; padding: 0px; margin: 0px; gap: 18px; display: flex; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: column; alignItems: center; justifyContent: normal | fontFamily: "DM Sans", "DM Sans Fallback", ui-sans-serif, system-ui, sans-serif; fontSize: 16px; fontWeight: 400; lineHeight: 24px; letterSpacing: normal; color: rgb(116, 119, 133); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(116, 119, 133); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `p.home-layer home-label home-label--age` | width: 51.9375px; height: 31.875px; minHeight: 0px; maxWidth: none; position: absolute; top: 776.749px; right: 530.469px; bottom: 15.0729px; left: 857.594px; padding: 0px; margin: 0px; gap: normal; display: block; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 39.84px; fontWeight: 500; lineHeight: 31.872px; letterSpacing: 1.56px; color: rgb(255, 255, 255); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(255, 255, 255); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: plus-lighter; transform: none |
