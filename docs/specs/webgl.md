# Canvas and WebGL specification

## Evidence and scope

GLSL template literals are readable despite minified surrounding JavaScript. Raw sources and uniform declarations were extracted locally to docs/recon/shaders/ and shaders.json. No invented GLSL is labeled verified. Third-party shader files and source assets remain gitignored. Table hashes identify exact captured templates, including unresolved template substitutions; implementation must separately bind substitutions from their source functions.

Verified source Three revision: 185. No npm patch string found. Approved target: three 0.185.1, @react-three/fiber 9.7.0, GSAP 3.15.0, Lenis 1.3.23. No drei required. Existing extraction includes generic Three shaders; only site-specific stages below are relevant.

## What renders and when

| Stage | Pipeline and visual behavior | Inputs / activation |
| --- | --- | --- |
| Identity | Image/CRT base → bloom → pointer-trail and grid composite; RGB separation, scan mask, curved screen/vignette/pulse | Time, hover, portrait image placement, mouse/current and previous pointer, canvas size; active hero scene |
| Manifesto | 2D pixel reveal and DOM words; not a fabricated GLSL shader | Shared hero scroll progress 2/3 through 1; paragraph visibility from 2/9 |
| Statistics | Extruded neutral glyph → custom lit material → bar dither → chromatic aberration | Time rotation + scroll rotation offset, size/DPR; IntersectionObserver pauses offscreen |
| Projects | Image textures mapped to DOM card bounds; block reveal, sweep mask and purple transition band; trail displacement | Scroll progress/reverse, image aspect/cover/zoom, pointer with hover:hover; shared scene coordinates |
| Experience | Two mark textures mixed in CRT base → bloom → pointer trail/fringe | Selection controls uMixT, time, mouse, canvas size; hidden on mobile |
| Footer | Text rasterized using actual computed font into mipmapped texture → feedback trail → dot/text composite | Pointer/current and previous coordinates; active within 1.25 viewport heights below / .25 above |

## Verified configuration

| Pipeline | Source values |
| --- | --- |
| Portrait defaults | imageHeight 1, imageX .5, imageXAnchor .5, imageTop 0 (component defaults; responsive parent can override). Bloom radius 10, samples 32, base .3, glow 1. MASK_INTENSITY .4, MASK_SIZE 4, MASK_BORDER 1, SCREEN_CURVATURE .04, SCREEN_VIGNETTE .4, PULSE_INTENSITY .03, PULSE_WIDTH 60, PULSE_RATE 20 |
| Statistics renderer | antialias true, alpha true, premultipliedAlpha false, transparent clear, sRGB. Perspective camera FOV 35, near .1, far 100, z 6.2. SVG extrude depth 14, bevel thickness/size 1.4, segments 3, curve segments 24; geometry fitted to 2.6 units |
| Statistics material | light direction normalize(.6,.8,.9), fresnel power 2.6, specular power 48. Component defaults accent #B6F200, glyph #9B5CFF, cellPx 6, bars, contrast 1, aberration .2035, rotationSpeed .52; x rotation .12*sin(.3*time). These are component defaults, not proof of all caller overrides |
| Project material | progress 0, reverse 0, zoom 1, trail rect (0,0,1,1), displacement 22, fringe 2.2, trail/band color #C02DFF. Trail radius .25, decay .9. Shader substitutions MAX_BLOCK 1, SHARPEN_EASE .700, MASK_BLOCK 26, SWEEP_JITTER .40, LAYER_OFFSET .180, BAND_WIDTH .250, BAND_CORE .050, BAND_ALPHA 1, HALF_ALPHA .500 |
| Experience | Mix 550ms cubic in/out; trail radius .4, decay .9, displacement 18*DPR, fringe gain 2.2; pointer smoothing .09, hover smoothing .12; render targets trail dimension capped at 512 |
| Footer | WebGL2 alpha true, premultipliedAlpha true, antialias false. Trail max texture dimension min(1024, MAX_TEXTURE_SIZE), halves if framebuffer incomplete. Cell 9 * DPR; radius .45; decay .9; displacement .5; highlight #905cff. Text color read from computed DOM. Mipmap LOD max(0,log2(max(1,.7*cell))) |

## Extracted shader source and uniforms

| Stage / raw local file | Source offset / SHA-256 | Uniform declarations |
| --- | --- | --- |
| `shader-12-1292.glsl` (source-12.js) | 1292; `3da406ea22594ce8f169350fa6436a2219c936919cb5d09786b63efce93ae8f0` |  |
| `shader-12-1665.glsl` (source-12.js) | 1665; `a655bc669709b47dae6bd1e03dfbe6fa422197d504c11b80cf4eeb046a3b0f24` | `vec2 iResolution`; `sampler2D iChannel0` |
| `shader-13-11375.glsl` (source-13.js) | 11375; `2fe27edddb0671327bc44b2375e63d2da5a891a6b68f38898549dbd889fb6059` | `sampler2D uPrev`; `vec2 uMouse`; `vec2 uPrevMouse`; `vec2 uResolution`; `float uRadius`; `float uDecay`; `float uActive` |
| `shader-13-13709.glsl` (source-13.js) | 13709; `6a1bd97fd48c5965dcdc060dc4ff9ce313541ab26e4e255e7ce6635b4bd86845` | `sampler2D uText`; `sampler2D uTrail`; `vec2 uResolution`; `float uCell`; `float uLod`; `vec3 uColor`; `vec3 uHighlight`; `float uDisplace` |
| `shader-15-52720.glsl` (source-15.js) | 52720; `514e6ffb552139aecd0cf30d76c3dcb1118cd1fded579caee2b3ec1e66f75ce6` | `vec2 iResolution`; `float iTime`; `float uHover`; `sampler2D uLogoCurrent`; `sampler2D uLogoNext`; `float uMixT`; `vec2 uLogoCenter`; `float uLogoHalfSize` |
| `shader-15-54075.glsl` (source-15.js) | 54075; `463b97d3a66eaeef02d03c368c8e948e96cc5ed85017568de00514762b6f56b4` | `sampler2D uPrev`; `vec2 uMouse`; `vec2 uPrevMouse`; `vec2 uResolution`; `float uRadius`; `float uDecay` |
| `shader-15-55412.glsl` (source-15.js) | 55412; `ebf9854648d7c9a65930bb2b105e5d6ccb69c9044d018a2b5a2b56d6b759bab5` | `vec2 iResolution`; `float iTime`; `sampler2D iChannel0`; `float uHover`; `sampler2D uTrail`; `float uTrailDisplace`; `float uTrailFringeGain`; `vec3 uTrailColor` |
| `shader-16-3847.glsl` (source-16.js) | 3847; `0e9bb8a94ab4a21e2247f8b3a01bd720d7ec0387e81fb6fed2b4bbe6313f8e12` | `vec2 iResolution`; `float iTime`; `float uHover`; `sampler2D uImage`; `float uImageAspect`; `float uImageHeight`; `float uImageX`; `float uImageXAnchor`; `float uImageTop` |
| `shader-16-8296.glsl` (source-16.js) | 8296; `15ad6e0f726f8ce424ec72fa6c8d2eb7e5ff218ba8645baeb1f64efb8de9b9aa` | `sampler2D uPrev`; `vec2 uMouse`; `vec2 uPrevMouse`; `vec2 uResolution`; `float uRadius`; `float uDecay` |
| `shader-16-9633.glsl` (source-16.js) | 9633; `d3ec4f783fa451c35045a856efdc61c713591034fad563d2e5baec793167fad1` | `vec2 iResolution`; `float iTime`; `sampler2D iChannel0`; `float uHover`; `sampler2D uTrail`; `float uTrailDisplace`; `float uTrailFringeGain`; `vec3 uTrailColor`; `vec2 uGridOrigin`; `vec2 uGridSize`; `vec2 uGridPitch`; `float uGridDot`; `vec3 uGridColor`; `float uGridRevealGain`; `float uBloomAlphaGain` |
| `shader-16-804278.glsl` (source-16.js) | 804278; `d77a4539913f9fa964fd9f72d113161a1eb392726229bc224d70137fea9c2fc1` |  |
| `shader-16-804556.glsl` (source-16.js) | 804556; `cadcad5e9da09dd67ce40250a5a9f20e9936caaf47bee9a76afa222a8d19a66e` | `vec3 uColor`; `vec3 uLightDir`; `vec3 uCameraPos`; `float uFresnelPower`; `float uSpecularPower` |
| `shader-16-805461.glsl` (source-16.js) | 805461; `9acf5667608b89ceb0fea6d5941f1a9b4195b3621bd1d240406c8d7b1c854a39` |  |
| `shader-16-805593.glsl` (source-16.js) | 805593; `f259f9a9e157ac4fc884fcedb7d4974bd7538b7fc9f7971fe1ab50ce464b52fe` | `sampler2D tDiffuse`; `vec2 uResolution`; `float uCellPx`; `vec3 uBarColor`; `float uShape`; `float uContrast` |
| `shader-16-808154.glsl` (source-16.js) | 808154; `e636482b5ae1369a9391c265fc1b6d676eb590e74202874a12114178ba719678` | `sampler2D tDiffuse`; `vec2 uResolution`; `float uStrength`; `vec2 uCenter` |
| `shader-16-1000358.glsl` (source-16.js) | 1000358; `325c5bef14799855fe47f7c4da8a65d4c986a8ef3face89d77473434447a1a65` |  |
| `shader-16-1000495.glsl` (source-16.js) | 1000495; `768eb18c3d5ba78477a1b72a52e5c6dcdb52d91fb1e0fba601f7cde60605c6a7` |  |
| `shader-16-1000609.glsl` (source-16.js) | 1000609; `eb80789d77a070afef6a4121790479f6d853ef0519d6068179eca35221129e10` | `sampler2D uPrev`; `vec2 uMouse`; `vec2 uPrevMouse`; `vec2 uResolution`; `float uRadius`; `float uDecay` |
| `shader-16-1002072.glsl` (source-16.js) | 1002072; `c0daddcfa0d03941314e34bbd9844f3f2dd43170b25ad9501e05c734110fee55` | `sampler2D uTex`; `sampler2D uTrail`; `vec4 uTrailRect`; `float uTrailDisplace`; `float uTrailFringeGain`; `vec3 uTrailColor`; `vec3 uBandColor`; `float uProgress`; `float uReverse`; `float uImgAspect`; `vec2 uSize`; `vec3 uCover`; `float uZoom` |

## States, interactions and responsive behavior

375: static neutral portrait/project images, no experience canvas or hover-only trails; 2D text/counters remain accessible. 768: optional static CRT frame above experience lists; use grid projects. 1440: full active-scene pipelines and pointer effects; source desktop cutoff 1025px. These mobile GPU reductions are target fallback decisions, not claims that the source disabled every canvas.

Scroll transitions use section specs and the shared Lenis/GSAP scroll state. Mouse coordinates normalize to canvas bounds with source y inversion where needed. Source feedback uniforms retain previous frame textures; ping-pong render targets must never read/write the same attachment. Resize updates resolution, image cover and DOM bounds after fonts settle. Selection mix is verified as 550ms cubic in/out. Always preserve readable DOM without canvas.

## Component tree and libraries

`DecorativeCanvasBoundary > VisibleSceneController > PortraitGL | PixelReveal2D | StatisticsThree | ProjectFiber | ExperienceGL | FooterTrailGL`

Raw WebGL2 for fullscreen feedback passes; Three core/addons for geometry and postprocessing; React Three Fiber for project scene only. GSAP ticker coordinates effects where practical; exactly one Lenis RAF path remains in the foundation. Dispose programs, textures, framebuffers, geometry, materials, observers and listeners on unmount; context loss restores static fallback.

## Performance budget and fallback

Target engineering budget (not source-measured): 60fps / 16.7ms total frame on desktop; avoid continuous mobile GPU work. Cap desktop DPR at 2, mobile fallback DPR at 1. Run only visible scenes; prefer at most two active contexts during handoff. Pause on document.hidden/offscreen, debounce resize as needed; no optional dependency. Measure during Phase 5/6 before asserting the budget is met. If frame budget or context limits fail, progressively disable bloom, feedback trail, then entire canvas while retaining the static placeholder and DOM.

prefers-reduced-motion: no time-driven rotation, scroll pinning, trails, pixel sweep, or animated texture mixes. Render static neutral artwork or DOM wordmark; native scrolling and accessible content. Mobile/coarse pointer gets static images and symbols by default. WebGL2 unavailable or context lost uses identical container dimensions and semantic DOM, with no console error.

## Flags and handling

| Status / item | Handling |
| --- | --- |
| UNVERIFIED: source Three npm patch | Approved: latest r185 patch 0.185.1 pinned; retain source revision evidence separately. |
| UNVERIFIED: some caller overrides and runtime uniform mappings | Uniform declarations, defaults and listed assignments are verified; defaults do not establish final responsive values. Inspect local caller bindings before Phase 5; unresolved visual mappings become APPROXIMATED and are reported. Never manufacture a verified value. |
| VERIFIED: pixel algorithm / project travel / experience mix | Decoded in the three section specs. Neutral artwork and five-card measured extent remain intentional approximations. |
| APPROXIMATED: replacement imagery and glyph geometry | Intentional original neutral assets in measured boxes; source photographs/logos/thumbnails are excluded. Readable shader source is not itself approximated. |
| UNVERIFIED: GPU performance and cross-device output | Budget above is a target requirement; benchmark in Phase 5/6 and apply staged fallbacks. Screenshots cannot establish throughput. |
| UNVERIFIED: source Tailwind version / external functionality | User decisions resolve implementation: installed Tailwind v4 and # destinations in site.ts. |

No remaining gap blocks the approved specs checkpoint. Implementation must preserve these evidence boundaries and report unresolved motion mappings before calling them verified.

## Approved target dependency addition

@types/three 0.185.4 is exact-pinned as a devDependency, approved 2026-09-28. No drei or other optional package is added.

Phase 4 geometry uses Three.js with original hollow-frame geometry and original GLSL. Camera, extrusion, bevel, lighting and dither defaults follow the table. Original postprocessing math and replacement geometry are APPROXIMATED; these implementations are not represented as extracted source. Time and scroll inputs are connected in Phase 5.
