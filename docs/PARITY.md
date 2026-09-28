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

Final status and verification will be appended after implementation.
