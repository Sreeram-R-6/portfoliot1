# Behavioral parity QA — 2026-09-29

The complete audit and per-row final status are in [PARITY.md](PARITY.md). All pre-parity content values and array counts remain equal to the saved source; only authorized loader/sound/route-link configuration was added. Editorial `todo`/`todos` stay out of public props. Optional case-study fields add no facts until entered in `/details`.

| Check | Result |
| --- | --- |
| Home / content fixtures | 50 configurations; 320/375/768/1440/1920; normal + reduced motion; no overflow, clipped/overlapping visible text or unexpected console messages |
| Work routes / fixtures | 30 configurations at the five widths; no pins or layout/console failures; public routes also checked through Playwright MCP at 1440/768/375 |
| Project rail | 3/11/20 cards; desktop pin, wheel travel, progress, last-card focus/arrow reveal, end release; tablet/mobile audited vertical grid |
| Navigation lifecycle | New-push top reset; back/forward/reload position restoration; three route cycles, unique triggers and stable subscribers; rapid-click handling |
| Loader | Monotonic percentage; real font/visible-image/renderer readiness; session repeat suppressed; hero waits; <=300ms added exit delay |
| Sound | Zero players/requests/play before trusted gesture; pointer/keyboard activation; .3 ambient loop/.5 UI; mute/persist/hidden pause/fades; reduced motion does not mute |
| Editor / upload | 186 current scalar fields plus optional role/year/tags/gallery/caseStudy; null gallery/import validation; audio upload works; invalid format/destination, traversal and oversized files reject |
| Counters/tools/experience/orientation | 11+/3+/6+ digit rolls, nonnumeric literal strings, own hover-pair swap, measured variable heights/+/- and 550ms mix; coarse landscape inert/portrait release |
| Visual review | 35 real-content section crops and desktop work index reviewed; existing adaptive layout retained |
| Reduced motion / low power | No canvas in reduced or low-power checks; native reduced scrolling/no pins; mobile static artwork |
| Production editor / fixtures | GET/PUT `/api/details`, POST upload, `/details` and stress routes all 404; fixture JSON excluded from standalone; sitemap omits editor/fixtures |
| Build | Lint, strict typecheck and production build pass |
| IP | Four own synthesized WAVs (197,696 bytes); own favicon/social SVG/PNG/posters; no source-site assets, font binaries or verbatim bundle/shader code; MIT scaffold attribution retained |

Lighthouse 12.8.2, local production on localhost:3001, headless Chrome, default simulated mobile: **Performance 92 / Accessibility 100 / Best practices 100 / SEO 100**, LCP **3.38s**, TBT **21ms**. Previous populated-content QA was 92/100/100/100. Audio loads only after a gesture; the loader waits only for initially needed assets. Scores describe measured runs, not guarantees across devices.

Deliberate differences: loader holds are compressed to honor the requested 300ms limit; audio uses own synthesized tracks, strict gesture gating, requested persistence/fades; pixel transitions and procedural art are original approximations; adaptive typography/tall-content fallbacks remain. No unprovided case-study facts or categories were invented.

Environment remains Node 22.17.0/npm 10.9.2 rather than the recommended Node 24. No dependencies, lockfile changes, history rewrite or deployment. The existing standalone-output warning from `npm start` remains documented in README. The permitted upstream Three.Clock deprecation is the only excluded console warning.

---

# Historical populated content QA (before parity work)

## Source and schema

The source is `src/content/site.json`, saved through `/details`. No incoming file was used. All requested sanity checks matched before the content-only commit `04a811e`: Sreeram R; the two requested display lines; counters 11 / 3 / 6; four tools; eleven projects from Thuzhayan to Autonomous Drone GCS; four requested experience IDs; email, GitHub and LinkedIn. No source value was edited during layout or QA work. SHA-256 remains `491FE8D91479D4A971388C0955C113A91C5ED08C306915202BD398292F3E0048`.

| Key | Exists in starting schema | Action |
| --- | --- | --- |
| metadata.* | Yes | Keep title, description and siteUrl; wire metadata, canonical and sitemap |
| name / role / location | Yes | Preserve; fit identity and footer typography |
| orientation.* | Yes | Keep data-driven orientation hint |
| navigation.* | Yes | Render labels, links and coordinates with wrapping |
| sections.identity.* | Yes | Variable display lines and measured one-line fitting |
| sections.manifesto.* | Yes | Variable display words and readable description |
| sections.statistics.* | Yes | Variable counters/tools; numeric animation or literal strings |
| sections.projects.* | Yes | Data-driven heading, labels and more-work link |
| sections.experience.* | Yes | Variable entries and measured descriptions |
| projects[].* | Yes | Preserve full description; allow null image; measured N-card rail |
| projects[].summary | No | Optional; derive a short summary only at render time when absent |
| projects[].todo / todos[] | Yes | Editor warnings only; strip from public props |
| footer.* | Yes | Wrap labels; hide placeholder CV action |

The editor supports all populated keys, null images and optional summaries. Recommended character counters are soft limits. Import validation rejects unknown keys and invalid URLs before applying drafts. Current checks cover all 173 scalar/null controls, optional-summary import, null images, Reset, invalid import, disabled Save for bad URLs and invalid PUT, with byte-identical source afterward.

## Layout and stress verification

- Hero lines stay on one line with CSS sizing plus measured fitting. Headings balance, body copy has a readable measure, and flex/grid children can shrink. Text containers grow with content.
- Manifesto words wrap without glyph clipping. Its accessible description is separate from decorative animated text.
- Statistics count complete numeric strings; non-numeric values remain literal. Tool strings stay intact and wrap within cells.
- Project summaries retain full stored descriptions. Native detail dialogs support keyboard opening, Tab trapping, Escape and focus return; long descriptions scroll. Null images use deterministic original glyph posters. Placeholder actions open details; external links have `noopener noreferrer`.
- Project rail/path/pin travel derives from measured cards. Normal desktop content keeps horizontal travel; tall content uses a grid. Screenshot review widened the desktop introduction so the 1920px rail remains active.
- Experience wraps long titles/roles and measures descriptions; the canvas mix remains 550ms. Footer email/links wrap and stack, and placeholder Resume is hidden. Navigation uses intrinsic wrapping rather than fixed coordinate slots.
- Playwright checks 50 configurations: real content and maximum/20/3/0-project fixtures at 320, 375, 768, 1440 and 1920px, each with normal and reduced motion. Every configuration passes root/scroller overflow, visible text clipping, text-block overlap and console checks. The documented upstream Three.Clock deprecation is the only allowed warning.
- Fixtures include 1224-character descriptions, long unbroken strings, null images, a non-numeric counter, additional counters/tools and empty collections. Normal desktop 3/11/20-card rails are measured rather than hardcoded. At 1440px their measured track widths are 1266 / 4715 / 8596px and pin distances are 4001 / 7308 / 11189px.
- Captured and reviewed 35 full-section crops (seven sections at five widths), stored under ignored `.cache/qa/content/`. Screenshot-only CSS exposes the native scroller and hides offscreen skip-link capture artifacts; product focus behavior is unchanged.
- Reduced-motion checks and simulated two-core low-power checks render zero canvases with eleven real projects. Long-dialog checks confirm scrolling, full unchanged text, focus trapping and external-link attributes. Public text contains no editorial TODO reminders.
- Synthetic fixture routes are development-only, noindex and disallowed by robots. Production returns 404 before reading fixture files; the JSON is excluded from standalone output and public bundles.

## Performance and final checks

Lighthouse 12.8.2 uses headless Chrome against the local production build at localhost:3001 with default simulated mobile throttling. Reports remain ignored under `.cache/lighthouse/`; no dependencies or lockfile changes were made. Scores are individual measured runs.

| Mobile metric | Before | Final |
| --- | ---: | ---: |
| Performance | 84 | 92 |
| Accessibility | 100 | 100 |
| Best practices | 100 | 100 |
| SEO | 100 | 100 |
| Largest contentful paint | 3.5s | 3.25s |
| Total blocking time | 335ms | 25ms |

The first mobile-flow run reached 92 Performance / 95 Accessibility. Its unsupported paragraph aria-label was then replaced by a separate screen-reader description; the final run reaches 100 Accessibility. All requested mobile targets pass.

Mobile hero/manifesto use ordinary flow below 768px, avoiding character splitting and pin setup after first paint. Desktop motion and the original WebGL/shader implementation remain. Mobile artwork stays static through the existing power policy.

`npm run check` passes lint, strict typecheck and production build. Production `npm start` returns 404 for `/details`, GET/PUT `/api/details`, POST `/api/details/upload` and stress routes. Robots disallows editor/fixture paths; sitemap contains neither. Metadata follows the source values. The existing standalone-output start warning remains documented in README.

Environment: Node 22.17.0 / npm 10.9.2; the repository requests Node 24, so these results do not claim a Node 24 run. No deployment, history rewrite, new dependency or third-party asset was added.

---

# Historical Phase 6 QA

## IP and secrets audit

- Baseline clean at d5b7e06; 85 tracked files reviewed.
- Replaced inherited template favicon with an original S monogram; replaced template promotional documentation and package links; removed inherited sponsorship configuration and source branding URL. No source-reference credit is published.
- Retained required MIT template license attribution and developer workflow/scaffold files. No reference-site images, logos, font binaries, bundle code or complete shader implementations are tracked. Decorative shaders are original authored approximations; source measurement/property records remain specifications.
- Rajdhani, DM Sans and DM Mono import only from next/font/google; there are no tracked font files.
- Credential patterns in tracked files and full git patch history produced no credential candidates. Baseline github_pat and ghp_ each had zero matches; api_key had 26 historical instruction references to an environment variable name, no values. Final literal prefix/key matches in this QA report are audit labels. Generic token/.env history hits are documentation, CSS design tokens, async generation variables and ignore/configuration rules. History remains unchanged.
- .gitignore covers .env*, docs/recon/, .next/, node_modules/ and .playwright-mcp/.

## Content

- Uses supplied name, role, CCE Kerala and five named projects only. Removed seven fabricated experience slots; education shows the supplied CS student role.
- All achievement counters remain em dashes marked TODO, including project count: no unconfirmed number is published.
- Contact, CV, tool, coordinate, project URL/image and domain gaps are explicit TODOs. Unprovided links lead to the contact section; no external URL or job history was invented.

## Metadata

- English document, explicit zoomable viewport, title/description, Open Graph/Twitter card, original S favicon and own 1200x630 social PNG.
- Canonical, robots and sitemap share the reserved https://portfolio.example placeholder. TODO: replace metadata.siteUrl before publishing. No deployment took place.

## Accessibility

- Added a first-focus skip link targeting the focusable main landmark; footer now provides a separate contentinfo landmark. Heading structure is one H1, section H2s and project H3s. Decorative SVGs/canvases are aria-hidden; no meaningful image requires an invented alt description.
- Enlarged hero link targets; preserved the original two anchors instead of splitting/cloning them for animation. Keyboard focus restores the hero and reveals project/footer controls immediately. Menu traps focus, Escape closes it and focus returns to Menu.
- Production keyboard sweep reached all five projects, education and footer links without empty or invisible stops. Reduced motion uses native scrolling, no pins and no canvas; skip link focuses main.
- Manual contrast fixes cover selected education text, hero copy over the poster, project heading/description/actions, and a solid navigation background over lime sections. Measured hero copy on black 10.14:1, dark project text on lime 15.06:1 and footer labels 6.44:1.
- Checked responsive layouts at 375, 768 and 1440 pixels: no horizontal page overflow; original placeholders remain. Screenshots are local and ignored under .cache/qa/.

## Lighthouse and performance

Lighthouse 12.8.2, headless Chrome, local production build at http://localhost:3001, default simulated throttling. Desktop uses --preset=desktop; mobile uses the default mobile profile. Baseline source commit 0cacd76; final source commit 91c3c37. Scores are individual runs and can vary with machine load.

| Profile | Performance before / after | Accessibility before / after | Best practices before / after | SEO before / after |
| --- | --- | --- | --- | --- |
| Desktop | 94 / 100 | 95 / 100 | 100 / 100 | 100 / 100 |
| Mobile | 93 / 93 | 95 / 100 | 100 / 100 | 100 / 100 |

- Final desktop LCP 806 ms, TBT 8 ms; mobile LCP 3154 ms, TBT 73 ms. All requested score targets pass.
- Existing dynamic WebGL components mount only when intersecting and the power policy permits them. Mobile at 375px uses five poster render modes and zero canvases; reduced motion also has zero canvases. No performance-only source change was needed. Score differences include accessibility changes and normal run variability.
- Temporary Lighthouse installation and raw JSON reports stay in ignored .cache/lighthouse/; project dependencies and lockfile are unchanged by this tool installation.
- No browser console errors. Existing Fiber/Three Clock deprecation warning is documented in STACK.md. Local next start emits its existing standalone-output warning; README includes the packaged server entry point.

## Final verification

- npm run check passed: ESLint, TypeScript and production build. A running standalone test server initially locked .next/standalone on Windows; stopping it resolved the lock and the rerun passed.
- Fresh HTTPS clone outside this repository: npm ci and npm run build passed at c088b7a. Fast-forwarded that clean clone to final source 91c3c37 and repeated npm ci/build successfully. npm reported zero vulnerabilities.
- Environment: Node 22.17.0 / npm 10.9.2. npm emitted an engine warning because package.json and .nvmrc request Node 24; validation here does not claim a Node 24 test.
- Verified temporary clone absolute path and expected origin before cleanup. Automatic approval review rejected both guarded and literal-path deletion with "blocked by policy". Cleanup remains outstanding: temporary folder sreeram-portfolio-qa-96582c2ac4114f14bdba76d69049d339 under the Windows local Temp directory.
- Final tracked branding scan has no original personal/brand strings. Ignore checks pass for .env*, recon, build, dependencies and Playwright artifacts. No history rewrite, dependency upgrade, source credit or deployment.

## Local details editor verification

- Clean starting tree at 79e61e7. JSON refactor preserves content and existing exports; the social-card generator now reads JSON.
- All 122 current scalar/null fields match generated editor controls, with no missing or extra fields. Desktop and 375px layouts checked; mobile has no horizontal overflow. Keyboard controls have visible focus. Editor loads zero canvases and no animation-library resources.
- Dev UI Save changed a contact mailto link and numeric statistic, added a sixth project, added/reordered two experience entries and uploaded a PNG. Disk GET and refreshed home reflected each change. Valid import/save restored the original JSON; test uploads were moved into ignored .cache/qa/. No invented QA content or test upload is committed.
- Reset reloaded disk; Export downloaded JSON; invalid import was rejected before applying. Inline empty-field validation disabled Save.
- APIs rejected invalid/masked URLs, unknown keys, wrong types, invalid statistics and empty required text with 400. Oversized image returned 413; traversal filename and active/namespaced SVG returned 400. Invalid requests left disk content unchanged. Static SVG and CV PDF upload paths were also exercised.
- npm run check passed lint, typecheck and build. npm start on temporary production PORT=3001 returned 404 for GET /details, GET/PUT /api/details and POST /api/details/upload. Editor header is noindex; robots disallows details; sitemap excludes it. Dev host was unchanged.
- Restored homepage has all five sections, five original projects, active smooth scrolling and WebGL with zero browser console errors. The existing Three Clock warning remains. No deployment or new dependencies.
