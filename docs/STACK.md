# Technology and section inventory

| Technology | Observed version | Evidence |
| --- | --- | --- |
| Next.js App Router / Turbopack | 16.2.4 | Browser `window.next.version`; deployed Next runtime bundle |
| React / React DOM | 19.3.0-canary-3f0b9e61-20260317 | Deployed runtime version strings |
| Tailwind-generated CSS plus custom CSS | Exact Tailwind version UNVERIFIED | Theme/utility layers and generated utility declarations; version banner absent |
| GSAP | 3.15.0 | Core bundle version assignment |
| GSAP ScrollTrigger and Observer | 3.15.0 | Plugin bundle version assignments |
| GSAP Flip | 3.15.0 | Registered plugin implementation and version assignment |
| GSAP SplitText | 3.15.0 | Plugin export and version assignment |
| GSAP ScrambleTextPlugin | 3.15.0 | Registered `scrambleText` plugin and explicit version |
| Lenis | 1.3.23 | `window.lenis.version` and bundled constant |
| Three.js | Revision 185; exact npm patch version UNVERIFIED | `window.__THREE__` and exported `REVISION` |
| React Three Fiber | 9.7.0 | `rendererPackageName: "@react-three/fiber"`, `rendererVersion: "9.7.0"` |
| Custom WebGL / canvas shaders and CSS keyframes | Site-authored; no package version | GLSL, canvas context creation, pointer handlers, CSS keyframes |
| Vercel Analytics | 2.0.1 | Bundled SDK metadata |

| Order | Section | Source structure | Interaction model |
| --- | --- | --- | --- |
| 1 | Header and navigation | Sticky `nav`; fixed menu overlay | Click, hover, focus; sound toggle and route links |
| 2 | Identity hero | `.home-hero` / `.home-hero-pin` | Pinned scroll scene; entrance motion and portrait shader |
| 3 | Manifesto scene | `.home-hero-extent` inside the same hero pin | Scroll-driven text reveal and moving display words |
| 4 | Statistics and tools | `.stat-stage` / `#stat-and-tools` | Pixel reveal, odometer counters, icon hover, desktop handoff |
| 5 | Project showcase | `.selected-work-outer` / `.selected-work` | Desktop pinned horizontal track; tablet grid; mobile vertical cards |
| 6 | Experience | `.worked-at-stage` / `.worked-at` | Click-selected central canvas and description; mobile accordions |
| 7 | Contact footer | `.footer-dock` / `.site-footer` | Scroll reveal, pointer-driven wordmark trail, links and buttons |

- Global behavior: first-session preloader and boot cover; mobile landscape guard; smooth nested scrolling; reduced-motion branches.
- Target repository baseline is separate from the observed source: Next.js 16.3.5, React 19.2.4, Tailwind v4.
