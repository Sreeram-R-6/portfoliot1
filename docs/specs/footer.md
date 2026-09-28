# Contact footer

## Evidence and scope

Source inspected 2026-09-28. Local evidence: docs/recon/REPORT.md, source-*.css/js, spec-computed-{375,768,1440}.json, existing full-page crops and recorded scroll states. No repeat screenshots. Only structure/styles/motion are adopted; all copy and destinations come from src/content/site.ts.

Measurements below are source computed values at viewport height 900px, scroll top 0; transformed rectangles are state-dependent and are not universal CSS dimensions. Repeated elements may have distinct sizes. Source class names identify evidence and need not become target component names.

## Layout

Lime background, black text, square corners. Desktop two 50% columns, height 14.875rem=238px, padding 2rem=32px; footer total measured 420px. Headline Rajdhani 600, 40px/32px/-1.6px; desktop buttons 158px by 46px. Link grid auto max-content max-content; gaps 20px 50px. Wordmark text is Sreeram, not source brand.

Phase 4 computed-style addendum: button inner surface rgb(176,255,77), border authored width .5px (computed .666667px on inspection device), border color rgb(111,172,34). Button label is Rajdhani 600, 14px/20px, tracking .28px. Placeholder headline reserves the observed 96px box; shorter user copy naturally occupies fewer lines.

## States and interactions

Dock exposes footer under preceding scene. Link entrance .6s power2.out, stagger .06s. Wordmark yPercent to 0 over .9s power3.out. Second CTA delayed .15s. Desktop sink scrub spans maxScroll-footer.offsetHeight through maxScroll, transform derived from --footer-sink*(1-progress). Pointer trail uses actual text rasterized to texture, verified GLSL in webgl.md. External links and CV remain #.

## Responsive behavior

375: stacked columns padding 16px; CTA height 210px, social 108px; links gaps 20px 32px; buttons measured 159.667px by 46px; wordmark 50.3284px/40.2628px/-1.50985px. 768: two columns width 384px, height 206px, padding 16px; links gaps 20px 26.5px; buttons 180px by 46px; wordmark 105.9px/84.7196px/-3.17699px. 1440: 720px columns; wordmark 200.002px/160.001px/-6.00005px. Fit target name to same available width using source sizing rule, natural metrics differ. Reduced motion: normal-flow footer, no sinking or trail.

Custom breakpoints: mobile max-width 767.98px; tablet 768px–1024.98px; desktop min-width 1025px. Nav utility breakpoint 40rem. Retain fluid formulas rather than interpolating measured snapshots.

## Component tree

`FooterDock > ContactFooter > TopRow > CTAColumn(Headline + two Buttons) + SocialColumn(LinkGroups); BigWordmark > DOMText + DecorativeTrailCanvas.`

## Animation libraries

GSAP + ScrollTrigger; WebGL2 trail/composite on GSAP ticker; CSS link affordances.

## Flags and handling

| Status / item | Handling |
| --- | --- |
| UNVERIFIED: real contact/CV/social functionality | Approved # in site.ts; no email submission or CV download; replace when user provides destinations. |
| APPROXIMATED: wordmark metrics and link groups | Sreeram and user contact placeholders replace source branding/groups. Preserve containers and typography, allow natural text widths. |

Tailwind source version is UNVERIFIED but explicitly approved to ignore: use installed Tailwind v4. No additional package needed. Reduced-motion and keyboard behavior above are target requirements where the source did not establish equivalent behavior.

## Layout property reference

Property tables retain cascade order and media conditions; no source implementation is included. Tokens map to the verified OKLCH equivalents in globals.css. Source utility classes are additionally represented by the computed tables below.

Context: `base`

Reference element: `.footer-dock`.

| Property / input | Specified value |
| --- | --- |
| z-index | -1 |
| position | sticky |
| bottom | 0 |


Context: `@media (min-width:1025px) and (prefers-reduced-motion:no-preference)`

Reference element: `.footer-dock`.

| Property / input | Specified value |
| --- | --- |
| --footer-sink | 64px |


Context: `base`

Reference element: `main:has(>.footer-dock)`.

| Property / input | Specified value |
| --- | --- |
| z-index | 0 |
| position | relative |


Context: `base`

Reference element: `.site-footer`.

| Property / input | Specified value |
| --- | --- |
| background | var(--primary-green-neon) |
| color | var(--text-black) |


Context: `base`

Reference element: `.footer-top`.

| Property / input | Specified value |
| --- | --- |
| width | 100% |
| display | flex |


Context: `base`

Reference element: `.footer-cta,.footer-social`.

| Property / input | Specified value |
| --- | --- |
| width | 50% |
| height | 14.875rem |
| padding | 2rem |


Context: `base`

Reference element: `.footer-cta`.

| Property / input | Specified value |
| --- | --- |
| border-right | 1px solid var(--primary-green-divider) |


Context: `base`

Reference element: `.footer-social`.

| Property / input | Specified value |
| --- | --- |
| overflow | hidden |


Context: `base`

Reference element: `.footer-headline`.

| Property / input | Specified value |
| --- | --- |
| letter-spacing | -.04em |
| width | 17.3125rem |
| font-size | 2.5rem |
| line-height | .8 |


Context: `base`

Reference element: `.footer-buttons`.

| Property / input | Specified value |
| --- | --- |
| gap | 1.5rem |
| margin-top | 2rem |
| display | flex |


Context: `base`

Reference element: `.footer-button`.

| Property / input | Specified value |
| --- | --- |
| width | 9.875rem |
| height | 2.875rem |


Context: `base`

Reference element: `.footer-links-grid`.

| Property / input | Specified value |
| --- | --- |
| grid-template-columns | auto max-content max-content |
| justify-content | end |
| align-items | center |
| gap | 1.25rem 3.125rem |
| display | grid |


Context: `base`

Reference element: `.footer-link`.

| Property / input | Specified value |
| --- | --- |
| justify-content | space-between |


Context: `base`

Reference element: `.footer-bigtext-box`.

| Property / input | Specified value |
| --- | --- |
| border-top | 1px solid var(--primary-green-divider) |
| height | .91em |
| font-size | 13.889vw |
| position | relative |
| overflow | clip |


Context: `base`

Reference element: `.dot-trail`.

| Property / input | Specified value |
| --- | --- |
| -webkit-user-select | none |
| user-select | none |
| cursor | default |
| display | block |
| position | relative |


Context: `base`

Reference element: `.dot-trail-canvas`.

| Property / input | Specified value |
| --- | --- |
| pointer-events | none |
| width | 100% |
| height | 100% |
| position | absolute |
| inset | 0 |


Context: `base`

Reference element: `.dot-trail[data-gl=on] .dot-trail-text`.

| Property / input | Specified value |
| --- | --- |
| color | #0000 |


Context: `base`

Reference element: `.footer-bigtext`.

| Property / input | Specified value |
| --- | --- |
| letter-spacing | -.03em |
| text-align | center |
| white-space | nowrap |
| font-weight | 500 |
| line-height | .8 |
| position | absolute |
| bottom | 0 |
| left | 0 |
| right | 0 |


Context: `@media (max-width:1024.98px)`

Reference element: `.footer-cta,.footer-social`.

| Property / input | Specified value |
| --- | --- |
| height | 12.875rem |
| padding | 1rem |


Context: `@media (max-width:1024.98px)`

Reference element: `.footer-buttons`.

| Property / input | Specified value |
| --- | --- |
| gap | 1.5rem |


Context: `@media (max-width:1024.98px)`

Reference element: `.footer-button`.

| Property / input | Specified value |
| --- | --- |
| width | 11.25rem |


Context: `@media (max-width:1024.98px)`

Reference element: `.footer-links-grid`.

| Property / input | Specified value |
| --- | --- |
| grid-template-columns | 1fr max-content max-content |
| justify-content | stretch |
| column-gap | 1.65625rem |


Context: `@media (max-width:1024.98px)`

Reference element: `.footer-bigtext-box`.

| Property / input | Specified value |
| --- | --- |
| height | .9565em |
| font-size | 13.789vw |


Context: `@media (max-width:1024.98px)`

Reference element: `.footer-bigtext`.

| Property / input | Specified value |
| --- | --- |
| bottom | .0435em |


Context: `@media (max-width:767.98px)`

Reference element: `.footer-top`.

| Property / input | Specified value |
| --- | --- |
| flex-direction | column |


Context: `@media (max-width:767.98px)`

Reference element: `.footer-cta`.

| Property / input | Specified value |
| --- | --- |
| border-right | none |
| border-bottom | 1px solid var(--primary-green-divider) |
| width | 100% |
| height | 13.125rem |


Context: `@media (max-width:767.98px)`

Reference element: `.footer-social`.

| Property / input | Specified value |
| --- | --- |
| width | 100% |
| height | 6.75rem |


Context: `@media (max-width:767.98px)`

Reference element: `.footer-buttons`.

| Property / input | Specified value |
| --- | --- |
| width | 100% |


Context: `@media (max-width:767.98px)`

Reference element: `.footer-button`.

| Property / input | Specified value |
| --- | --- |
| flex | 1 1 0 |
| width | auto |
| min-width | 0 |


Context: `@media (max-width:767.98px)`

Reference element: `.footer-links-grid`.

| Property / input | Specified value |
| --- | --- |
| column-gap | 2rem |


Context: `@media (max-width:767.98px)`

Reference element: `.footer-bigtext-box`.

| Property / input | Specified value |
| --- | --- |
| height | 1.068em |
| font-size | 13.409vw |


Context: `@media (max-width:767.98px)`

Reference element: `.footer-bigtext`.

| Property / input | Specified value |
| --- | --- |
| bottom | .132em |


## Computed layout at 375px

| Element | Geometry / layout | Typography / paint / state |
| --- | --- | --- |
| `div.footer-dock` | width: 375.333px; height: 371.75px; minHeight: 0px; maxWidth: none; position: sticky; top: auto; right: auto; bottom: 0px; left: auto; padding: 0px; margin: 0px; gap: normal; display: block; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: "DM Sans", "DM Sans Fallback", ui-sans-serif, system-ui, sans-serif; fontSize: 16px; fontWeight: 400; lineHeight: 24px; letterSpacing: normal; color: rgb(245, 240, 235); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(245, 240, 235); borderRadius: 0px; boxShadow: none; zIndex: -1; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `footer.site-footer relative` | width: 375.333px; height: 371.75px; minHeight: 0px; maxWidth: none; position: relative; top: 0px; right: 0px; bottom: 0px; left: 0px; padding: 0px; margin: 0px; gap: normal; display: block; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: "DM Sans", "DM Sans Fallback", ui-sans-serif, system-ui, sans-serif; fontSize: 16px; fontWeight: 400; lineHeight: 24px; letterSpacing: normal; color: rgb(7, 2, 16); backgroundColor: rgb(157, 241, 51); border: 0px solid rgb(7, 2, 16); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `div.footer-top` | width: 375.333px; height: 318px; minHeight: 0px; maxWidth: none; position: static; top: auto; right: auto; bottom: auto; left: auto; padding: 0px; margin: 0px; gap: normal; display: flex; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: column; alignItems: normal; justifyContent: normal | fontFamily: "DM Sans", "DM Sans Fallback", ui-sans-serif, system-ui, sans-serif; fontSize: 16px; fontWeight: 400; lineHeight: 24px; letterSpacing: normal; color: rgb(7, 2, 16); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(7, 2, 16); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `div.footer-cta` | width: 375.333px; height: 210px; minHeight: auto; maxWidth: none; position: static; top: auto; right: auto; bottom: auto; left: auto; padding: 16px; margin: 0px; gap: normal; display: block; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: "DM Sans", "DM Sans Fallback", ui-sans-serif, system-ui, sans-serif; fontSize: 16px; fontWeight: 400; lineHeight: 24px; letterSpacing: normal; color: rgb(7, 2, 16); backgroundColor: rgba(0, 0, 0, 0); border: ; borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `h2.footer-headline font-heading font-semibold uppercase` | width: 277px; height: 96px; minHeight: 0px; maxWidth: none; position: static; top: auto; right: auto; bottom: auto; left: auto; padding: 0px; margin: 0px; gap: normal; display: block; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 40px; fontWeight: 600; lineHeight: 32px; letterSpacing: -1.6px; color: rgb(7, 2, 16); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(7, 2, 16); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `div.footer-buttons` | width: 343.333px; height: 46px; minHeight: 0px; maxWidth: none; position: static; top: auto; right: auto; bottom: auto; left: auto; padding: 0px; margin: 32px 0px 0px; gap: 24px; display: flex; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: "DM Sans", "DM Sans Fallback", ui-sans-serif, system-ui, sans-serif; fontSize: 16px; fontWeight: 400; lineHeight: 24px; letterSpacing: normal; color: rgb(7, 2, 16); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(7, 2, 16); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `a.group relative flex shrink-0 cursor-pointer items-center justify-center  footer-button` | width: 159.667px; height: 46px; minHeight: auto; maxWidth: none; position: relative; top: 0px; right: 0px; bottom: 0px; left: 0px; padding: 0px; margin: 0px; gap: normal; display: flex; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: center; justifyContent: center | fontFamily: "DM Sans", "DM Sans Fallback", ui-sans-serif, system-ui, sans-serif; fontSize: 16px; fontWeight: 400; lineHeight: 24px; letterSpacing: normal; color: rgb(7, 2, 16); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(7, 2, 16); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `a.group relative flex shrink-0 cursor-pointer items-center justify-center gap-[0.375rem] footer-button` | width: 159.667px; height: 46px; minHeight: auto; maxWidth: none; position: relative; top: 0px; right: 0px; bottom: 0px; left: 0px; padding: 0px; margin: 0px; gap: 6px; display: flex; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: center; justifyContent: center | fontFamily: "DM Sans", "DM Sans Fallback", ui-sans-serif, system-ui, sans-serif; fontSize: 16px; fontWeight: 400; lineHeight: 24px; letterSpacing: normal; color: rgb(7, 2, 16); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(7, 2, 16); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `div.footer-social` | width: 375.333px; height: 108px; minHeight: auto; maxWidth: none; position: static; top: auto; right: auto; bottom: auto; left: auto; padding: 16px; margin: 0px; gap: normal; display: block; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: "DM Sans", "DM Sans Fallback", ui-sans-serif, system-ui, sans-serif; fontSize: 16px; fontWeight: 400; lineHeight: 24px; letterSpacing: normal; color: rgb(7, 2, 16); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(7, 2, 16); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `div.footer-links-grid` | width: 343.333px; height: 76px; minHeight: 0px; maxWidth: none; position: static; top: auto; right: auto; bottom: auto; left: auto; padding: 0px; margin: 0px; gap: 20px 32px; display: grid; gridTemplateColumns: 120.073px 76.5833px 82.6771px; gridTemplateRows: 12px 12px 12px; gridTemplateAreas: none; flexDirection: row; alignItems: center; justifyContent: stretch | fontFamily: "DM Sans", "DM Sans Fallback", ui-sans-serif, system-ui, sans-serif; fontSize: 16px; fontWeight: 400; lineHeight: 24px; letterSpacing: normal; color: rgb(7, 2, 16); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(7, 2, 16); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `a.group relative flex items-center gap-1 footer-link footer-reveal font-heading text-xs font-semibold uppercase leading-none tracking-[0.0975rem] text-[var(--text-black)]` | width: 76.5833px; height: 12px; minHeight: auto; maxWidth: none; position: relative; top: 0px; right: 0px; bottom: 0px; left: 0px; padding: 0px; margin: 0px; gap: 4px; display: flex; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: center; justifyContent: space-between | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 12px; fontWeight: 600; lineHeight: 12px; letterSpacing: 1.56px; color: rgb(7, 2, 16); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(7, 2, 16); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 0; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: matrix(1, 0, 0, 1, 0, 20) |
| `a.group relative flex items-center gap-1 footer-link footer-reveal font-heading text-xs font-semibold uppercase leading-none tracking-[0.0975rem] text-[var(--text-black)]` | width: 82.6771px; height: 12px; minHeight: auto; maxWidth: none; position: relative; top: 0px; right: 0px; bottom: 0px; left: 0px; padding: 0px; margin: 0px; gap: 4px; display: flex; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: center; justifyContent: space-between | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 12px; fontWeight: 600; lineHeight: 12px; letterSpacing: 1.56px; color: rgb(7, 2, 16); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(7, 2, 16); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 0; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: matrix(1, 0, 0, 1, 0, 20) |
| `div.footer-bigtext-box` | width: 375.333px; height: 53.75px; minHeight: 0px; maxWidth: none; position: relative; top: 0px; right: 0px; bottom: 0px; left: 0px; padding: 0px; margin: 0px; gap: normal; display: block; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: "DM Sans", "DM Sans Fallback", ui-sans-serif, system-ui, sans-serif; fontSize: 50.3284px; fontWeight: 400; lineHeight: 75.4927px; letterSpacing: normal; color: rgb(7, 2, 16); backgroundColor: rgba(0, 0, 0, 0); border: ; borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `span.dot-trail footer-bigtext font-heading uppercase` | width: 375.333px; height: 40.2604px; minHeight: 0px; maxWidth: none; position: absolute; top: 6.1875px; right: 0px; bottom: 6.64336px; left: 0px; padding: 0px; margin: 0px; gap: normal; display: block; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 50.3284px; fontWeight: 500; lineHeight: 40.2628px; letterSpacing: -1.50985px; color: rgb(7, 2, 16); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(7, 2, 16); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: matrix(1, 0, 0, 1, 0, 40.2604) |

## Computed layout at 768px

| Element | Geometry / layout | Typography / paint / state |
| --- | --- | --- |
| `div.footer-dock` | width: 768px; height: 307.292px; minHeight: 0px; maxWidth: none; position: sticky; top: auto; right: auto; bottom: 0px; left: auto; padding: 0px; margin: 0px; gap: normal; display: block; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: "DM Sans", "DM Sans Fallback", ui-sans-serif, system-ui, sans-serif; fontSize: 16px; fontWeight: 400; lineHeight: 24px; letterSpacing: normal; color: rgb(245, 240, 235); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(245, 240, 235); borderRadius: 0px; boxShadow: none; zIndex: -1; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `footer.site-footer relative` | width: 768px; height: 307.292px; minHeight: 0px; maxWidth: none; position: relative; top: 0px; right: 0px; bottom: 0px; left: 0px; padding: 0px; margin: 0px; gap: normal; display: block; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: "DM Sans", "DM Sans Fallback", ui-sans-serif, system-ui, sans-serif; fontSize: 16px; fontWeight: 400; lineHeight: 24px; letterSpacing: normal; color: rgb(7, 2, 16); backgroundColor: rgb(157, 241, 51); border: 0px solid rgb(7, 2, 16); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `div.footer-top` | width: 768px; height: 206px; minHeight: 0px; maxWidth: none; position: static; top: auto; right: auto; bottom: auto; left: auto; padding: 0px; margin: 0px; gap: normal; display: flex; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: "DM Sans", "DM Sans Fallback", ui-sans-serif, system-ui, sans-serif; fontSize: 16px; fontWeight: 400; lineHeight: 24px; letterSpacing: normal; color: rgb(7, 2, 16); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(7, 2, 16); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `div.footer-cta` | width: 384px; height: 206px; minHeight: auto; maxWidth: none; position: static; top: auto; right: auto; bottom: auto; left: auto; padding: 16px; margin: 0px; gap: normal; display: block; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: "DM Sans", "DM Sans Fallback", ui-sans-serif, system-ui, sans-serif; fontSize: 16px; fontWeight: 400; lineHeight: 24px; letterSpacing: normal; color: rgb(7, 2, 16); backgroundColor: rgba(0, 0, 0, 0); border: ; borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `h2.footer-headline font-heading font-semibold uppercase` | width: 277px; height: 96px; minHeight: 0px; maxWidth: none; position: static; top: auto; right: auto; bottom: auto; left: auto; padding: 0px; margin: 0px; gap: normal; display: block; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 40px; fontWeight: 600; lineHeight: 32px; letterSpacing: -1.6px; color: rgb(7, 2, 16); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(7, 2, 16); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `div.footer-buttons` | width: 351.333px; height: 46px; minHeight: 0px; maxWidth: none; position: static; top: auto; right: auto; bottom: auto; left: auto; padding: 0px; margin: 32px 0px 0px; gap: 24px; display: flex; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: "DM Sans", "DM Sans Fallback", ui-sans-serif, system-ui, sans-serif; fontSize: 16px; fontWeight: 400; lineHeight: 24px; letterSpacing: normal; color: rgb(7, 2, 16); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(7, 2, 16); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `a.group relative flex shrink-0 cursor-pointer items-center justify-center  footer-button` | width: 180px; height: 46px; minHeight: auto; maxWidth: none; position: relative; top: 0px; right: 0px; bottom: 0px; left: 0px; padding: 0px; margin: 0px; gap: normal; display: flex; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: center; justifyContent: center | fontFamily: "DM Sans", "DM Sans Fallback", ui-sans-serif, system-ui, sans-serif; fontSize: 16px; fontWeight: 400; lineHeight: 24px; letterSpacing: normal; color: rgb(7, 2, 16); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(7, 2, 16); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `a.group relative flex shrink-0 cursor-pointer items-center justify-center gap-[0.375rem] footer-button` | width: 180px; height: 46px; minHeight: auto; maxWidth: none; position: relative; top: 0px; right: 0px; bottom: 0px; left: 0px; padding: 0px; margin: 0px; gap: 6px; display: flex; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: center; justifyContent: center | fontFamily: "DM Sans", "DM Sans Fallback", ui-sans-serif, system-ui, sans-serif; fontSize: 16px; fontWeight: 400; lineHeight: 24px; letterSpacing: normal; color: rgb(7, 2, 16); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(7, 2, 16); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `div.footer-social` | width: 384px; height: 206px; minHeight: auto; maxWidth: none; position: static; top: auto; right: auto; bottom: auto; left: auto; padding: 16px; margin: 0px; gap: normal; display: block; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: "DM Sans", "DM Sans Fallback", ui-sans-serif, system-ui, sans-serif; fontSize: 16px; fontWeight: 400; lineHeight: 24px; letterSpacing: normal; color: rgb(7, 2, 16); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(7, 2, 16); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `div.footer-links-grid` | width: 352px; height: 76px; minHeight: 0px; maxWidth: none; position: static; top: auto; right: auto; bottom: auto; left: auto; padding: 0px; margin: 0px; gap: 20px 26.5px; display: grid; gridTemplateColumns: 139.74px 76.5833px 82.6771px; gridTemplateRows: 12px 12px 12px; gridTemplateAreas: none; flexDirection: row; alignItems: center; justifyContent: stretch | fontFamily: "DM Sans", "DM Sans Fallback", ui-sans-serif, system-ui, sans-serif; fontSize: 16px; fontWeight: 400; lineHeight: 24px; letterSpacing: normal; color: rgb(7, 2, 16); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(7, 2, 16); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `a.group relative flex items-center gap-1 footer-link footer-reveal font-heading text-xs font-semibold uppercase leading-none tracking-[0.0975rem] text-[var(--text-black)]` | width: 76.5833px; height: 12px; minHeight: auto; maxWidth: none; position: relative; top: 0px; right: 0px; bottom: 0px; left: 0px; padding: 0px; margin: 0px; gap: 4px; display: flex; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: center; justifyContent: space-between | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 12px; fontWeight: 600; lineHeight: 12px; letterSpacing: 1.56px; color: rgb(7, 2, 16); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(7, 2, 16); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 0; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: matrix(1, 0, 0, 1, 0, 20) |
| `a.group relative flex items-center gap-1 footer-link footer-reveal font-heading text-xs font-semibold uppercase leading-none tracking-[0.0975rem] text-[var(--text-black)]` | width: 82.6771px; height: 12px; minHeight: auto; maxWidth: none; position: relative; top: 0px; right: 0px; bottom: 0px; left: 0px; padding: 0px; margin: 0px; gap: 4px; display: flex; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: center; justifyContent: space-between | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 12px; fontWeight: 600; lineHeight: 12px; letterSpacing: 1.56px; color: rgb(7, 2, 16); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(7, 2, 16); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 0; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: matrix(1, 0, 0, 1, 0, 20) |
| `div.footer-bigtext-box` | width: 768px; height: 101.292px; minHeight: 0px; maxWidth: none; position: relative; top: 0px; right: 0px; bottom: 0px; left: 0px; padding: 0px; margin: 0px; gap: normal; display: block; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: "DM Sans", "DM Sans Fallback", ui-sans-serif, system-ui, sans-serif; fontSize: 105.9px; fontWeight: 400; lineHeight: 158.849px; letterSpacing: normal; color: rgb(7, 2, 16); backgroundColor: rgba(0, 0, 0, 0); border: ; borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `span.dot-trail footer-bigtext font-heading uppercase` | width: 768px; height: 84.7083px; minHeight: 0px; maxWidth: none; position: absolute; top: 11.3125px; right: 0px; bottom: 4.60663px; left: 0px; padding: 0px; margin: 0px; gap: normal; display: block; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 105.9px; fontWeight: 500; lineHeight: 84.7196px; letterSpacing: -3.17699px; color: rgb(7, 2, 16); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(7, 2, 16); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: matrix(1, 0, 0, 1, 0, 84.7083) |

## Computed layout at 1440px

| Element | Geometry / layout | Typography / paint / state |
| --- | --- | --- |
| `div.footer-dock` | width: 1440px; height: 420px; minHeight: 0px; maxWidth: none; position: sticky; top: auto; right: auto; bottom: 0px; left: auto; padding: 0px; margin: 0px; gap: normal; display: block; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: "DM Sans", "DM Sans Fallback", ui-sans-serif, system-ui, sans-serif; fontSize: 16px; fontWeight: 400; lineHeight: 24px; letterSpacing: normal; color: rgb(245, 240, 235); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(245, 240, 235); borderRadius: 0px; boxShadow: none; zIndex: -1; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `footer.site-footer relative` | width: 1440px; height: 420px; minHeight: 0px; maxWidth: none; position: relative; top: 0px; right: 0px; bottom: 0px; left: 0px; padding: 0px; margin: 0px; gap: normal; display: block; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: "DM Sans", "DM Sans Fallback", ui-sans-serif, system-ui, sans-serif; fontSize: 16px; fontWeight: 400; lineHeight: 24px; letterSpacing: normal; color: rgb(7, 2, 16); backgroundColor: rgb(157, 241, 51); border: 0px solid rgb(7, 2, 16); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `div.footer-top` | width: 1440px; height: 238px; minHeight: 0px; maxWidth: none; position: static; top: auto; right: auto; bottom: auto; left: auto; padding: 0px; margin: 0px; gap: normal; display: flex; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: "DM Sans", "DM Sans Fallback", ui-sans-serif, system-ui, sans-serif; fontSize: 16px; fontWeight: 400; lineHeight: 24px; letterSpacing: normal; color: rgb(7, 2, 16); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(7, 2, 16); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `div.footer-cta` | width: 720px; height: 238px; minHeight: auto; maxWidth: none; position: static; top: auto; right: auto; bottom: auto; left: auto; padding: 32px; margin: 0px; gap: normal; display: block; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: "DM Sans", "DM Sans Fallback", ui-sans-serif, system-ui, sans-serif; fontSize: 16px; fontWeight: 400; lineHeight: 24px; letterSpacing: normal; color: rgb(7, 2, 16); backgroundColor: rgba(0, 0, 0, 0); border: ; borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `h2.footer-headline font-heading font-semibold uppercase` | width: 277px; height: 96px; minHeight: 0px; maxWidth: none; position: static; top: auto; right: auto; bottom: auto; left: auto; padding: 0px; margin: 0px; gap: normal; display: block; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 40px; fontWeight: 600; lineHeight: 32px; letterSpacing: -1.6px; color: rgb(7, 2, 16); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(7, 2, 16); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `div.footer-buttons` | width: 655.333px; height: 46px; minHeight: 0px; maxWidth: none; position: static; top: auto; right: auto; bottom: auto; left: auto; padding: 0px; margin: 32px 0px 0px; gap: 24px; display: flex; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: "DM Sans", "DM Sans Fallback", ui-sans-serif, system-ui, sans-serif; fontSize: 16px; fontWeight: 400; lineHeight: 24px; letterSpacing: normal; color: rgb(7, 2, 16); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(7, 2, 16); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `a.group relative flex shrink-0 cursor-pointer items-center justify-center  footer-button` | width: 158px; height: 46px; minHeight: auto; maxWidth: none; position: relative; top: 0px; right: 0px; bottom: 0px; left: 0px; padding: 0px; margin: 0px; gap: normal; display: flex; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: center; justifyContent: center | fontFamily: "DM Sans", "DM Sans Fallback", ui-sans-serif, system-ui, sans-serif; fontSize: 16px; fontWeight: 400; lineHeight: 24px; letterSpacing: normal; color: rgb(7, 2, 16); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(7, 2, 16); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `a.group relative flex shrink-0 cursor-pointer items-center justify-center gap-[0.375rem] footer-button` | width: 158px; height: 46px; minHeight: auto; maxWidth: none; position: relative; top: 0px; right: 0px; bottom: 0px; left: 0px; padding: 0px; margin: 0px; gap: 6px; display: flex; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: center; justifyContent: center | fontFamily: "DM Sans", "DM Sans Fallback", ui-sans-serif, system-ui, sans-serif; fontSize: 16px; fontWeight: 400; lineHeight: 24px; letterSpacing: normal; color: rgb(7, 2, 16); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(7, 2, 16); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `div.footer-social` | width: 720px; height: 238px; minHeight: auto; maxWidth: none; position: static; top: auto; right: auto; bottom: auto; left: auto; padding: 32px; margin: 0px; gap: normal; display: block; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: "DM Sans", "DM Sans Fallback", ui-sans-serif, system-ui, sans-serif; fontSize: 16px; fontWeight: 400; lineHeight: 24px; letterSpacing: normal; color: rgb(7, 2, 16); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(7, 2, 16); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `div.footer-links-grid` | width: 656px; height: 76px; minHeight: 0px; maxWidth: none; position: static; top: auto; right: auto; bottom: auto; left: auto; padding: 0px; margin: 0px; gap: 20px 50px; display: grid; gridTemplateColumns: 87.7604px 76.5833px 82.6771px; gridTemplateRows: 12px 12px 12px; gridTemplateAreas: none; flexDirection: row; alignItems: center; justifyContent: end | fontFamily: "DM Sans", "DM Sans Fallback", ui-sans-serif, system-ui, sans-serif; fontSize: 16px; fontWeight: 400; lineHeight: 24px; letterSpacing: normal; color: rgb(7, 2, 16); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(7, 2, 16); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `a.group relative flex items-center gap-1 footer-link footer-reveal font-heading text-xs font-semibold uppercase leading-none tracking-[0.0975rem] text-[var(--text-black)]` | width: 76.5833px; height: 12px; minHeight: auto; maxWidth: none; position: relative; top: 0px; right: 0px; bottom: 0px; left: 0px; padding: 0px; margin: 0px; gap: 4px; display: flex; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: center; justifyContent: space-between | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 12px; fontWeight: 600; lineHeight: 12px; letterSpacing: 1.56px; color: rgb(7, 2, 16); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(7, 2, 16); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 0; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: matrix(1, 0, 0, 1, 0, 20) |
| `a.group relative flex items-center gap-1 footer-link footer-reveal font-heading text-xs font-semibold uppercase leading-none tracking-[0.0975rem] text-[var(--text-black)]` | width: 82.6771px; height: 12px; minHeight: auto; maxWidth: none; position: relative; top: 0px; right: 0px; bottom: 0px; left: 0px; padding: 0px; margin: 0px; gap: 4px; display: flex; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: center; justifyContent: space-between | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 12px; fontWeight: 600; lineHeight: 12px; letterSpacing: 1.56px; color: rgb(7, 2, 16); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(7, 2, 16); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 0; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: matrix(1, 0, 0, 1, 0, 20) |
| `div.footer-bigtext-box` | width: 1440px; height: 182px; minHeight: 0px; maxWidth: none; position: relative; top: 0px; right: 0px; bottom: 0px; left: 0px; padding: 0px; margin: 0px; gap: normal; display: block; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: "DM Sans", "DM Sans Fallback", ui-sans-serif, system-ui, sans-serif; fontSize: 200.002px; fontWeight: 400; lineHeight: 300.002px; letterSpacing: normal; color: rgb(7, 2, 16); backgroundColor: rgba(0, 0, 0, 0); border: ; borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `span.dot-trail footer-bigtext font-heading uppercase` | width: 1440px; height: 160px; minHeight: 0px; maxWidth: none; position: absolute; top: 21.3333px; right: 0px; bottom: 0px; left: 0px; padding: 0px; margin: 0px; gap: normal; display: block; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 200.002px; fontWeight: 500; lineHeight: 160.001px; letterSpacing: -6.00005px; color: rgb(7, 2, 16); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(7, 2, 16); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: visible; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: matrix(1, 0, 0, 1, 0, 160) |
