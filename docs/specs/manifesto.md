# Manifesto scene

## Evidence and scope

Source inspected 2026-09-28. Local evidence: docs/recon/REPORT.md, source-*.css/js, spec-computed-{375,768,1440}.json, existing full-page crops and recorded scroll states. No repeat screenshots. Only structure/styles/motion are adopted; all copy and destinations come from src/content/site.ts.

Measurements below are source computed values at viewport height 900px, scroll top 0; transformed rectangles are state-dependent and are not universal CSS dimensions. Repeated elements may have distinct sizes. Source class names identify evidence and need not become target component names.

## Layout

Layered extent fills the hero scene. Desktop paragraph measured width 553px; tablet 704px; mobile 343.323px. Rajdhani paragraph and words: desktop/tablet 64px, line 54.4px, tracking -1.28px; mobile paragraph 40px/34.4px and words 40px/34px, normal tracking.

## States and interactions

Hidden until hero progress 2/9 (.2222222222222222). Pixel reveal maps hero progress 2/3 through 1. Display-word displacement tween duration .7*abs(target-current) seconds, ease none. This scene hands column progress to statistics. Keep split text accessible; no duplicate spoken canvas text.

## Responsive behavior

375: narrow paragraph stack; 768: full-width paragraph; 1440: right-side paragraph and large moving words. Exact positioning and media formulas below. Reduced motion: paragraph and display words visible in document flow; bypass shared pin/pixel transition.

Custom breakpoints: mobile max-width 767.98px; tablet 768px–1024.98px; desktop min-width 1025px. Nav utility breakpoint 40rem. Retain fluid formulas rather than interpolating measured snapshots.

## Component tree

`ManifestoScene > PixelRevealCanvas + ParagraphLines + DisplayWords; nested in IdentityHero shared pin, not an independent pin.`

## Animation libraries

GSAP ScrollTrigger shared timeline; custom 2D pixel-reveal canvas.

## Flags and handling

| Status / item | Handling |
| --- | --- |
| VERIFIED: pixel reveal algorithm | Source-16.js algorithm decoded below; keep static content under reduced motion. |
| APPROXIMATED: paragraph wrapping | Use user manifesto from site.ts with measured font/box values; source wording is excluded, so exact line breaks differ. |

Tailwind source version is UNVERIFIED but explicitly approved to ignore: use installed Tailwind v4. No additional package needed. Reduced-motion and keyboard behavior above are target requirements where the source did not establish equivalent behavior.

## Exact source CSS rules

Rules retain cascade order and media conditions. Tokens map to the verified OKLCH equivalents in globals.css. Source utility classes are additionally represented by the computed tables below.

Context: `base`

```css
.home-hero-extent {visibility:hidden;display:block;position:absolute;inset:0}
```

Context: `base`

```css
.home-hero-extent-v2 {position:absolute;inset:0}
```

Context: `base`

```css
.home-hero-extent-v2-para,.home-hero-extent-v2-word {font-family:var(--font-heading);letter-spacing:-.02em;text-transform:uppercase;color:var(--text-white);mix-blend-mode:plus-lighter;margin:0;font-weight:400;line-height:.85;position:absolute}
```

Context: `base`

```css
.home-hero-extent-v2-para {flex-wrap:wrap;justify-content:space-between;gap:0;width:34.5625rem;font-size:4rem;display:flex;bottom:1.875rem;left:1.75rem}
```

Context: `base`

```css
.home-hero-extent-v2-para>i {display:none}
```

Context: `base`

```css
.home-hero-extent-v2-para>i[data-break-after] {height:0}
```

Context: `base`

```css
.home-hero-extent-v2-para>i[data-break-after="2"],.home-hero-extent-v2-para>i[data-break-after="5"],.home-hero-extent-v2-para>i[data-break-after="8"],.home-hero-extent-v2-para>i[data-break-after="11"],.home-hero-extent-v2-para>i[data-break-after="13"],.home-hero-extent-v2-para>i[data-break-after="15"] {flex-basis:100%;display:block}
```

Context: `base`

```css
.home-hero-extent-v2-para>[data-word="12"],.home-hero-extent-v2-para>[data-word="14"] {margin-left:19.42%}
```

Context: `base`

```css
.home-hero-extent-v2-para>[data-word="17"] {margin-left:2.76%}
```

Context: `base`

```css
.home-hero-extent-v2-word {white-space:nowrap;font-size:4rem}
```

Context: `base`

```css
.home-hero-extent-v2-word--1 {bottom:1.875rem;right:22.75rem}
```

Context: `base`

```css
.home-hero-extent-v2-word--2 {bottom:4.75rem;right:13.9375rem}
```

Context: `base`

```css
.home-hero-extent-v2-word--3 {bottom:7.625rem;right:1.9375rem}
```

Context: `base`

```css
.home-hero-extent-v2-arrow-mask {pointer-events:none;width:20.75rem;height:2.5625rem;position:absolute;bottom:2.375rem;right:2rem;overflow:hidden}
```

Context: `base`

```css
.home-hero-extent-v2-arrow {width:2.5625rem;height:2.5625rem;color:var(--primary-green-neon);position:absolute;top:0;left:0;transform:translate(-100%)}
```

Context: `@media (min-width:768px) and (max-width:1024.98px)`

```css
.home-hero-extent-v2 {--extent-v2-line:3.4rem}
```

Context: `@media (min-width:768px) and (max-width:1024.98px)`

```css
.home-hero-extent-v2-para {left:2rem;bottom:calc(7.75rem + var(--extent-v2-line) + 2 * var(--extent-v2-line));width:calc(100% - 4rem)}
```

Context: `@media (min-width:768px) and (max-width:1024.98px)`

```css
.home-hero-extent-v2-para>i[data-break-after] {display:none}
```

Context: `@media (min-width:768px) and (max-width:1024.98px)`

```css
.home-hero-extent-v2-para>i[data-break-after="3"],.home-hero-extent-v2-para>i[data-break-after="8"],.home-hero-extent-v2-para>i[data-break-after="11"],.home-hero-extent-v2-para>i[data-break-after="15"] {flex-basis:100%;display:block}
```

Context: `@media (min-width:768px) and (max-width:1024.98px)`

```css
.home-hero-extent-v2-para>[data-word="12"],.home-hero-extent-v2-para>[data-word="14"],.home-hero-extent-v2-para>[data-word="17"] {margin-left:0}
```

Context: `@media (min-width:768px) and (max-width:1024.98px)`

```css
.home-hero-extent-v2-word--1 {bottom:2rem;right:22.8125rem}
```

Context: `@media (min-width:768px) and (max-width:1024.98px)`

```css
.home-hero-extent-v2-word--2 {bottom:4.875rem;right:14rem}
```

Context: `@media (min-width:768px) and (max-width:1024.98px)`

```css
.home-hero-extent-v2-word--3 {bottom:7.75rem;right:2rem}
```

Context: `@media (min-width:768px) and (max-width:1024.98px)`

```css
.home-hero-extent-v2-arrow-mask {width:20.8125rem;height:2.5625rem;bottom:2.5rem;right:2rem}
```

Context: `@media (min-width:768px) and (max-width:1024.98px)`

```css
.home-hero-extent-v2-arrow {width:2.5625rem;height:2.5625rem}
```

Context: `@media (max-width:767.98px)`

```css
.home-hero-extent-v2-para {letter-spacing:0;width:calc(100% - 2rem);font-size:2.5rem;line-height:.86;top:1.5rem;bottom:auto;left:1rem}
```

Context: `@media (max-width:767.98px)`

```css
.home-hero-extent-v2-para>i[data-break-after] {display:none}
```

Context: `@media (max-width:767.98px)`

```css
.home-hero-extent-v2-para>i[data-break-after="3"],.home-hero-extent-v2-para>i[data-break-after="6"],.home-hero-extent-v2-para>i[data-break-after="8"],.home-hero-extent-v2-para>i[data-break-after="11"],.home-hero-extent-v2-para>i[data-break-after="13"],.home-hero-extent-v2-para>i[data-break-after="15"] {flex-basis:100%;display:block}
```

Context: `@media (max-width:767.98px)`

```css
.home-hero-extent-v2-para>[data-word="12"],.home-hero-extent-v2-para>[data-word="14"] {margin-left:23.04%}
```

Context: `@media (max-width:767.98px)`

```css
.home-hero-extent-v2-para>[data-word="17"] {margin-left:clamp(0px,84.94px - 15.44%,100% - 245px)}
```

Context: `@media (max-width:767.98px)`

```css
.home-hero-extent-v2-word {letter-spacing:0;font-size:2.5rem}
```

Context: `@media (max-width:767.98px)`

```css
.home-hero-extent-v2-word--1 {bottom:1.5rem;left:1rem;right:auto}
```

Context: `@media (max-width:767.98px)`

```css
.home-hero-extent-v2-word--2 {bottom:3.3125rem;right:9.6875rem}
```

Context: `@media (max-width:767.98px)`

```css
.home-hero-extent-v2-word--3 {bottom:5.125rem;right:1.5rem}
```

Context: `@media (max-width:767.98px)`

```css
.home-hero-extent-v2-arrow-mask {width:auto;height:1.625rem;bottom:1.8125rem;left:11.625rem;right:1.5rem}
```

Context: `@media (max-width:767.98px)`

```css
.home-hero-extent-v2-arrow {width:1.625rem;height:1.625rem}
```

## Computed layout at 375px

| Element | Geometry / layout | Typography / paint / state |
| --- | --- | --- |
| `div.home-hero-extent` | width: 375.323px; height: 824px; minHeight: 0px; maxWidth: none; position: absolute; top: 0px; right: 0px; bottom: 0px; left: 0px; padding: 0px; margin: 0px; gap: normal; display: block; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: "DM Sans", "DM Sans Fallback", ui-sans-serif, system-ui, sans-serif; fontSize: 16px; fontWeight: 400; lineHeight: 24px; letterSpacing: normal; color: rgb(245, 240, 235); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(245, 240, 235); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: hidden; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `div.home-hero-extent-v2` | width: 375.323px; height: 824px; minHeight: 0px; maxWidth: none; position: absolute; top: 0px; right: 0px; bottom: 0px; left: 0px; padding: 0px; margin: 0px; gap: normal; display: block; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: "DM Sans", "DM Sans Fallback", ui-sans-serif, system-ui, sans-serif; fontSize: 16px; fontWeight: 400; lineHeight: 24px; letterSpacing: normal; color: rgb(245, 240, 235); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(245, 240, 235); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: hidden; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `p.home-hero-extent-v2-para` | width: 343.323px; height: 240.771px; minHeight: 0px; maxWidth: none; position: absolute; top: 24px; right: 16px; bottom: 559.229px; left: 16px; padding: 0px; margin: 0px; gap: 0px; display: flex; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: space-between | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 40px; fontWeight: 400; lineHeight: 34.4px; letterSpacing: normal; color: rgb(255, 255, 255); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(255, 255, 255); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: hidden; transition: all; aspectRatio: auto; mixBlendMode: plus-lighter; transform: none |
| `p.home-hero-extent-v2-word home-hero-extent-v2-word--1` | width: 169.74px; height: 34px; minHeight: 0px; maxWidth: none; position: absolute; top: 766px; right: 189.583px; bottom: 24px; left: 16px; padding: 0px; margin: 0px; gap: normal; display: block; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 40px; fontWeight: 400; lineHeight: 34px; letterSpacing: normal; color: rgb(255, 255, 255); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(255, 255, 255); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: hidden; transition: all; aspectRatio: auto; mixBlendMode: plus-lighter; transform: none |
| `p.home-hero-extent-v2-word home-hero-extent-v2-word--2` | width: 90.5833px; height: 34px; minHeight: 0px; maxWidth: none; position: absolute; top: 737px; right: 155px; bottom: 53px; left: 129.74px; padding: 0px; margin: 0px; gap: normal; display: block; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 40px; fontWeight: 400; lineHeight: 34px; letterSpacing: normal; color: rgb(255, 255, 255); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(255, 255, 255); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: hidden; transition: all; aspectRatio: auto; mixBlendMode: plus-lighter; transform: none |
| `p.home-hero-extent-v2-word home-hero-extent-v2-word--3` | width: 123.51px; height: 34px; minHeight: 0px; maxWidth: none; position: absolute; top: 708px; right: 24px; bottom: 82px; left: 227.812px; padding: 0px; margin: 0px; gap: normal; display: block; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 40px; fontWeight: 400; lineHeight: 34px; letterSpacing: normal; color: rgb(255, 255, 255); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(255, 255, 255); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: hidden; transition: all; aspectRatio: auto; mixBlendMode: plus-lighter; transform: none |

## Computed layout at 768px

| Element | Geometry / layout | Typography / paint / state |
| --- | --- | --- |
| `div.home-hero-extent` | width: 768px; height: 824px; minHeight: 0px; maxWidth: none; position: absolute; top: 0px; right: 0px; bottom: 0px; left: 0px; padding: 0px; margin: 0px; gap: normal; display: block; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: "DM Sans", "DM Sans Fallback", ui-sans-serif, system-ui, sans-serif; fontSize: 16px; fontWeight: 400; lineHeight: 24px; letterSpacing: normal; color: rgb(245, 240, 235); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(245, 240, 235); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: hidden; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `div.home-hero-extent-v2` | width: 768px; height: 824px; minHeight: 0px; maxWidth: none; position: absolute; top: 0px; right: 0px; bottom: 0px; left: 0px; padding: 0px; margin: 0px; gap: normal; display: block; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: "DM Sans", "DM Sans Fallback", ui-sans-serif, system-ui, sans-serif; fontSize: 16px; fontWeight: 400; lineHeight: 24px; letterSpacing: normal; color: rgb(245, 240, 235); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(245, 240, 235); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: hidden; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `p.home-hero-extent-v2-para` | width: 704px; height: 271.979px; minHeight: 0px; maxWidth: none; position: absolute; top: 264.823px; right: 32px; bottom: 287.2px; left: 32px; padding: 0px; margin: 0px; gap: 0px; display: flex; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: space-between | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 64px; fontWeight: 400; lineHeight: 54.4px; letterSpacing: -1.28px; color: rgb(255, 255, 255); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(255, 255, 255); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: hidden; transition: all; aspectRatio: auto; mixBlendMode: plus-lighter; transform: none |
| `p.home-hero-extent-v2-word home-hero-extent-v2-word--1` | width: 260.01px; height: 54.3958px; minHeight: 0px; maxWidth: none; position: absolute; top: 737.604px; right: 365px; bottom: 32px; left: 142.99px; padding: 0px; margin: 0px; gap: normal; display: block; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 64px; fontWeight: 400; lineHeight: 54.4px; letterSpacing: -1.28px; color: rgb(255, 255, 255); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(255, 255, 255); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: hidden; transition: all; aspectRatio: auto; mixBlendMode: plus-lighter; transform: none |
| `p.home-hero-extent-v2-word home-hero-extent-v2-word--2` | width: 139.802px; height: 54.3958px; minHeight: 0px; maxWidth: none; position: absolute; top: 691.604px; right: 224px; bottom: 78px; left: 404.198px; padding: 0px; margin: 0px; gap: normal; display: block; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 64px; fontWeight: 400; lineHeight: 54.4px; letterSpacing: -1.28px; color: rgb(255, 255, 255); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(255, 255, 255); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: hidden; transition: all; aspectRatio: auto; mixBlendMode: plus-lighter; transform: none |
| `p.home-hero-extent-v2-word home-hero-extent-v2-word--3` | width: 189.917px; height: 54.3958px; minHeight: 0px; maxWidth: none; position: absolute; top: 645.604px; right: 32px; bottom: 124px; left: 546.083px; padding: 0px; margin: 0px; gap: normal; display: block; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 64px; fontWeight: 400; lineHeight: 54.4px; letterSpacing: -1.28px; color: rgb(255, 255, 255); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(255, 255, 255); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: hidden; transition: all; aspectRatio: auto; mixBlendMode: plus-lighter; transform: none |

## Computed layout at 1440px

| Element | Geometry / layout | Typography / paint / state |
| --- | --- | --- |
| `div.home-hero-extent` | width: 1440px; height: 824px; minHeight: 0px; maxWidth: none; position: absolute; top: 0px; right: 0px; bottom: 0px; left: 0px; padding: 0px; margin: 0px; gap: normal; display: block; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: "DM Sans", "DM Sans Fallback", ui-sans-serif, system-ui, sans-serif; fontSize: 16px; fontWeight: 400; lineHeight: 24px; letterSpacing: normal; color: rgb(245, 240, 235); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(245, 240, 235); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: hidden; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `div.home-hero-extent-v2` | width: 1440px; height: 824px; minHeight: 0px; maxWidth: none; position: absolute; top: 0px; right: 0px; bottom: 0px; left: 0px; padding: 0px; margin: 0px; gap: normal; display: block; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: "DM Sans", "DM Sans Fallback", ui-sans-serif, system-ui, sans-serif; fontSize: 16px; fontWeight: 400; lineHeight: 24px; letterSpacing: normal; color: rgb(245, 240, 235); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(245, 240, 235); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: hidden; transition: all; aspectRatio: auto; mixBlendMode: normal; transform: none |
| `p.home-hero-extent-v2-para` | width: 553px; height: 380.771px; minHeight: 0px; maxWidth: none; position: absolute; top: 413.229px; right: 859px; bottom: 30px; left: 28px; padding: 0px; margin: 0px; gap: 0px; display: flex; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: space-between | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 64px; fontWeight: 400; lineHeight: 54.4px; letterSpacing: -1.28px; color: rgb(255, 255, 255); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(255, 255, 255); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: hidden; transition: all; aspectRatio: auto; mixBlendMode: plus-lighter; transform: none |
| `p.home-hero-extent-v2-word home-hero-extent-v2-word--1` | width: 260.01px; height: 54.3958px; minHeight: 0px; maxWidth: none; position: absolute; top: 739.604px; right: 364px; bottom: 30px; left: 815.99px; padding: 0px; margin: 0px; gap: normal; display: block; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 64px; fontWeight: 400; lineHeight: 54.4px; letterSpacing: -1.28px; color: rgb(255, 255, 255); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(255, 255, 255); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: hidden; transition: all; aspectRatio: auto; mixBlendMode: plus-lighter; transform: none |
| `p.home-hero-extent-v2-word home-hero-extent-v2-word--2` | width: 139.802px; height: 54.3958px; minHeight: 0px; maxWidth: none; position: absolute; top: 693.604px; right: 223px; bottom: 76px; left: 1077.2px; padding: 0px; margin: 0px; gap: normal; display: block; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 64px; fontWeight: 400; lineHeight: 54.4px; letterSpacing: -1.28px; color: rgb(255, 255, 255); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(255, 255, 255); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: hidden; transition: all; aspectRatio: auto; mixBlendMode: plus-lighter; transform: none |
| `p.home-hero-extent-v2-word home-hero-extent-v2-word--3` | width: 189.917px; height: 54.3958px; minHeight: 0px; maxWidth: none; position: absolute; top: 647.604px; right: 31px; bottom: 122px; left: 1219.08px; padding: 0px; margin: 0px; gap: normal; display: block; gridTemplateColumns: none; gridTemplateRows: none; gridTemplateAreas: none; flexDirection: row; alignItems: normal; justifyContent: normal | fontFamily: Rajdhani, "Rajdhani Fallback", sans-serif; fontSize: 64px; fontWeight: 400; lineHeight: 54.4px; letterSpacing: -1.28px; color: rgb(255, 255, 255); backgroundColor: rgba(0, 0, 0, 0); border: 0px solid rgb(255, 255, 255); borderRadius: 0px; boxShadow: none; zIndex: auto; clipPath: none; opacity: 1; visibility: hidden; transition: all; aspectRatio: auto; mixBlendMode: plus-lighter; transform: none |


## Decoded pixel reveal

Source-16.js: 16 columns; rows=max(1,ceil(height/width*16)). For column x, row y: noise=fract(43758.5453*sin(12.9898*x+78.233*y)); threshold=noise+( (columns>1 ? (columns-1-x)/(columns-1) : 0)-noise)*.6. A cell is filled when progress>0 and threshold<=progress. Canvas backing size is 16 by rows, enlarged using pixelated rendering; pixel color [157,241,51], alpha 255 when filled else 0. Clip-path uses contiguous open-cell rectangles with coordinates rounded to one decimal; inverse mode uses closed cells. Column progress starts at reveal .5; transition done at .99. Text scramble configuration: letterDelayMs 18, scrambleDurationMs 280.
