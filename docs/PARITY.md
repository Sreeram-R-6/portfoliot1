# Current audit status

All previous match claims are withdrawn pending the measured bug audit in docs/BUGS.md. Historical QA below is not proof for this task.

# Behavioral parity audit

Audited live with Playwright MCP on 2026-09-28 at 1440, 768 and 375px (900px height). Home, work index and both linked case-study routes were inspected. Local baseline: clean/synced `4d38519`. This document contains original observation notes only; no copied source code, artwork, audio or reference copy.

| Priority / area | Reference behavior | Local baseline / gap | Plan / final status |
| --- | --- | --- | --- |
| P0 Global scroll | Nested 100vh scroller, Lenis 1.3.23; smooth wheel and synchronized touch | Same nested Lenis architecture | Retain; pending route restoration |
| P0 Identity | Shared hero/manifesto pin at all three widths; about 4.5 viewport heights of scrub | Desktop/tablet pin; mobile ordinary flow | Restore mobile with lightweight animation; tall content remains readable |
| P0 Manifesto | Same hero pin; staged glyph decode and word movement | Adaptive words/measure, shared desktop pin | Retain own text and measured fitting |
| P0 Statistics | Vertical reveal, desktop pixel handoff toward project scene, no independent snap | Adaptive cells, simpler handoff | Approximate handoff without fixed-height clipping |
| P0 Projects desktop | Pin at navigation edge; vertical wheel drives horizontal cards; scrub 1; progressive path/diamond and pixel exit; release after rail | Existing measured N-card pin, no explicit keyboard arrows | Add arrows/progress and verify last-card travel/release for 3/11/20 |
| P0 Projects narrow | 768px two-column vertical grid; 375px one-column vertical cards; no project pin or horizontal touch track | Same adaptive grid | Match audited vertical touch model |
| P0 Project snap | No snap configuration in project trigger; sampled smooth continuous travel | No snapping | Match: no invented snap points |
| P0 Loader sequence | Full lime cover, 0-100 counter, frame edges converge; initial .4s power2.out, later power2.inOut; holds at 78/95; .2s finish | Absent | Own geometry, real progress, compressed timing to obey requested 300ms overhead |
| P0 Loader readiness | Document load gates 100; 6s safety fallback; waits for stable frames; sampled visible approximately .76-4.47s | Hero intro starts immediately | Gate hero on fonts/images/render readiness; bounded error recovery |
| P0 Loader persistence | Session marker; absent on later loads and route changes | Absent | Once per session; no replay during route transitions |
| P0 Ambient sound | Native HTMLAudio; MP3 loop, volume .3; default enabled; attempts playback, retries on first pointerdown | No sound | Original synthesized assets; stricter no-play-before-gesture |
| P0 UI sound | WAV hover/click; four alternating voices, volume .5; delegated annotated controls; fine-pointer hover only | No sound | Own hover/click/toggle WAVs; paths editable |
| P0 Sound state | Header toggle desktop, menu toggle mobile; pause when hidden; no localStorage persistence or fade found | No toggle | Add requested persistence and gentle fade; show actual blocked/playback state |
| P0 / | Shared chrome, scroll choreography and selected work | Exists with user content | Retain content/adaptive fixes |
| P0 /work | Vertical index; desktop sidebar with 3-column card groups, tablet 2/mobile 1; no pins | 404 | Data-driven project index; no invented grouping/facts |
| P0 /work/[slug] | Both observed case studies scroll vertically with shared chrome, sections/gallery and related work | 404 | All user project IDs; hide absent optional blocks |
| P1 Route transitions | Pixel cover then reveal; approximately 1.3s entering, ready threshold .2; source fallback up to 4s; route changes reset view | No route shell | Own pixel transition and nested-scroll back/forward restoration |
| P1 Menu | Panel travels from right; shade .4s power2.out; panel .175s; items .7s stagger .1 after .4; exit .2/.3 power2.in | Existing matching timelines, extra links, unnumbered connections | About/Work route links, numbered user's social links; sound/footer line |
| P1 Experience | Desktop one selected central description/image; mobile first open, same control closes, others switch; plus/minus; measured transition; canvas mix 550ms cubic in/out | Variable four-entry implementation, 550ms mix | Retain; check per-entry marks and heights |
| P1 Counters | Digit strips roll .7s power2.out, staggered boxes; numeric plus suffix | Numeric count-up text, no suffix/roll | Digit-roll with numeric plus only; literal values untouched |
| P1 Tools | Default/hover image pair; opacity .15s; hover-capable pointers | Own glyphs, no pair | Original default/hover glyph pair, same swap duration |
| P2 Cursor | Fine-pointer 60px progress ring, .2s tracking; no reduced-motion ring | Existing matching ring | Retain |
| P2 Orientation | Coarse-pointer landscape at height <=500px blocks view with rotate hint | Existing guard uses user orientation text | Verify inert page/scroll while gate is visible |
| P2 Footer | Reveal/dock, link entrance and wordmark trail | Adaptive contact labels; CV placeholder hidden | Keep adaptive measured footer and placeholder policy |
| P2 Typography/color | Rajdhani headings; dark/lime/purple surfaces; breakpoint-specific display sizes, hover decode | Same font/tokens; fluid sizes preserve long user content | Intentional adaptive size/spacing differences; no copied labels/logos |

## Evidence and scope

- At 1440px home had two pins (hero and projects); at 768/375 only the hero pin. Work and both case studies had no pin at any audited width.
- Sampled desktop project pin top stayed at 76px through track travel; the last card crossed the viewport before exit; pin released after the end. No page-level horizontal wheel listener or snap setting was found in the project trigger.
- Work index measured three 306px columns with 40px gaps in the content area at 1440px. Different project count and missing categories require adaptive grouping rather than fabricated categories.
- Loader percentages sampled 0,21,45,67,78,81,95,99 before cover removal. Exact original wall-clock timing conflicts with the requested <=300ms extra delay: choreography will be approximated, with real monotonic progress.
- Native audio setup and visibility/gesture listeners were identified from browser network and runtime bundle inspection. No audio or bundle file was downloaded into the repository. The reference has no Howler dependency in its sound module; no new dependency is needed.
- Original persistence/fades are absent; requested persistence/fades and strict gesture gating are deliberate improvements. Reference autoplay retries silently, while this implementation will expose the true pending state.
- Local baseline has 11 projects and four experience entries, no sound/loader, and both requested new route patterns return 404. Existing content remains the source of truth; only new configuration/optional fields may be added.

## Final status — 2026-09-29

UNVERIFIED (previously MATCHED) means observed behavior was reproduced, not that the original artwork or content was copied. APPROXIMATED identifies authored visuals/timing. INTENTIONALLY DIFFERENT identifies requested adaptive, accessibility or performance behavior.

| Priority / item | Final status | Verification / difference |
| --- | --- | --- |
| P0 Nested scroll / hero / manifesto | UNVERIFIED (previously MATCHED); adaptive exception | One Lenis ticker; shared scrubbed pin at all audited widths when scenes fit. Tall content and reduced motion use flow; mobile avoids SplitText. |
| P0 Projects / progress / release | UNVERIFIED (previously MATCHED) | Desktop measured horizontal rail; tablet 2-column/mobile 1-column grid; no forced snap. Actual wheel, last-card focus, arrow keys and release passed for 3/11/20 projects at 1440/768/375. WebGL shares measured progress. |
| P0 Touch model | UNVERIFIED (previously MATCHED) | Vertical grid below desktop; shared hero uses vertical touch scrolling. No page-level wheel hijack. |
| P0 Loader session / readiness / percentage | UNVERIFIED (previously MATCHED) | Once per session; real readiness, monotonic 0–100%, hero waits. No reload/route loader. |
| P0 Loader choreography / duration | APPROXIMATED | Original geometry and compressed count/exit; about 280ms extra rather than the source's artificial multi-second holds, honoring the explicit 300ms cap. |
| P0 Sound engine / loop / UI voices | UNVERIFIED (previously MATCHED) behavior; APPROXIMATED assets | Native HTMLAudio, ambient .3/UI .5, own ambient/hover/click/toggle tones. Zero audio requests or play calls before trusted gesture. |
| P0 Sound persistence / fade / gesture | INTENTIONALLY DIFFERENT | Requested localStorage persistence, 150ms fade and strict gesture gating; source attempted autoplay and lacked persistence/fade. Hidden tabs pause all voices; Off silences all voices. |
| P0 Home route | UNVERIFIED (previously MATCHED) | All supplied sections and 11 projects preserved. |
| P0 Work index | UNVERIFIED (previously MATCHED) structure; adaptive exception | Sidebar and 3/2/1 columns; every project rendered without fabricated categories. |
| P0 Work detail routes | UNVERIFIED (previously MATCHED) routing; APPROXIMATED layout | All 11 IDs build; unknown ID 404. User description is verbatim. Optional facts/tags/gallery/paragraphs hide cleanly; no invented case-study blocks. |
| P1 Route transition / restoration | APPROXIMATED visual; UNVERIFIED (previously MATCHED) behavior | Own 400ms pixel cover +900ms reveal; reduced 30/60ms fade. New routes start at top; back/forward/reload restore positions. Three cycles produced no duplicate triggers or subscriber growth. |
| P1 Menu | UNVERIFIED (previously MATCHED) | Audited right-panel/stagger timings retained; About/Work, numbered user connections, Sound and own footer identity. |
| P1 Experience | UNVERIFIED (previously MATCHED) | Four variable entries; per-entry +/-; measured mobile/central description heights and 550ms canvas mix. Mobile same-entry closes; desktop selects. |
| P1 Counters | UNVERIFIED (previously MATCHED) | .7s digit roll finishes at 11+,3+,6+; nonnumeric fixture strings remain literal. Stored numbers unchanged. |
| P1 Tools | UNVERIFIED (previously MATCHED) interaction; APPROXIMATED artwork | Original geometric default/hover pair swaps opacity over .15s; complete user strings remain single items. |
| P2 Cursor / typography effects | UNVERIFIED (previously MATCHED) behavior; APPROXIMATED visuals | Existing fine-pointer progress cursor, decode/reveal and authored WebGL trails retained; reduced/low-power fallback preserved. |
| P2 Orientation | UNVERIFIED (previously MATCHED) | Coarse-pointer landscape <=500px height shows user's hint and inert page; portrait releases it. |
| P2 Footer | UNVERIFIED (previously MATCHED) behavior; adaptive exception | Measured reveal/dock and wordmark trails retained; long contacts wrap; placeholder CV remains hidden. |
| P2 Typography / spacing / colors | INTENTIONALLY DIFFERENT where adaptive | Same font families and dark/lime/purple tokens; fluid fit/measure retained for user's longer text. Own glyphs/posters replace all source art. |

## Final QA evidence

- Real content plus maximum, 20-, 3- and 0-project fixtures: **50** configurations at 320/375/768/1440/1920, normal and reduced motion. No horizontal overflow, clipped/overlapping visible text, unexpected console errors or warnings. Only the documented upstream Three.Clock deprecation is allowed by the check.
- Work/index/detail/maximum/empty views: **30** configurations at all five widths, no pins, overflow, clipping, overlap or console messages. Nine public route checks also passed through Playwright MCP at 1440/768/375.
- Reviewed 35 real-content section crops and the desktop work index. No additional visual changes were necessary. The implemented rail inset/focus correction, digit windows, tool pairs, selection marks and inert orientation gate address observed gaps while preserving existing adaptive layouts.
- Loader progress, session repeat, hero gating, audio trusted-gesture/keyboard activation, muted reload, hidden/visible playback and reduced-motion audio checks passed. Audio upload accepts own WAV; invalid format/destination, traversal and >5 MB reject. Editor covers 186 current scalar fields and optional case-study/gallery fields; invalid imports reject without altering source.
- All original source keys/values and original array counts compare equal to the pre-parity baseline. New loader/sound/route-link configuration and optional schema support are the only content additions.
- `npm run check` passes. Production GET/PUT/upload editor endpoints and fixture routes return 404; unknown case ID returns 404; metadata, robots and sitemap follow the current content. No fixture JSON ships in standalone output.
- Lighthouse **12.8.2**, local production, headless Chrome, default simulated mobile: **Performance 92 / Accessibility 100 / Best practices 100 / SEO 100**, LCP 3.38s, TBT 21ms. Previous populated-content QA was 92/100/100/100. Audio is gesture-lazy; loader does not gate on audio/below-fold assets.
- Tracked asset review: only four original generated WAVs, own SVG/PNG social artwork, own favicon and gitkeep files. No source-site audio/images/SVGs/fonts/bundle/shader code is committed. Required MIT scaffold attribution remains. Fonts use next/font/google; package/lockfile unchanged.
- Node 22.17.0/npm 10.9.2 were used; the repository recommends Node 24, so this does not claim Node 24 verification. No deployment.
