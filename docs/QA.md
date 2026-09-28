# Phase 6 QA

## IP and secrets audit

- Baseline clean at d5b7e06; 85 tracked files reviewed.
- Replaced inherited template favicon with an original S monogram; replaced template promotional documentation and package links; removed inherited sponsorship configuration and source branding URL. No source-reference credit is published.
- Retained required MIT template license attribution and developer workflow/scaffold files. No reference-site images, logos, font binaries, bundle code or complete shader implementations are tracked. Decorative shaders are original authored approximations; source measurement/property records remain specifications.
- Rajdhani, DM Sans and DM Mono import only from next/font/google; there are no tracked font files.
- Credential patterns in tracked files and full git patch history produced no credential candidates. github_pat and ghp_ each have zero matches; api_key has 26 historical instruction references to an environment variable name, no values. Generic token/.env history hits are documentation, CSS design tokens, async generation variables and ignore/configuration rules. History remains unchanged.
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

Lighthouse 12.8.2, headless Chrome, local production build at http://localhost:3001, default simulated throttling. Desktop uses --preset=desktop; mobile uses the default mobile profile. Baseline source commit 0cacd76; final source commit 77e5d2f. Scores are individual runs and can vary with machine load.

| Profile | Performance before / after | Accessibility before / after | Best practices before / after | SEO before / after |
| --- | --- | --- | --- | --- |
| Desktop | 94 / 100 | 95 / 100 | 100 / 100 | 100 / 100 |
| Mobile | 93 / 94 | 95 / 100 | 100 / 100 | 100 / 100 |

- Final desktop LCP 771 ms, TBT 0 ms; mobile LCP 3148 ms, TBT 64 ms. All requested score targets pass.
- Existing dynamic WebGL components mount only when intersecting and the power policy permits them. Mobile at 375px uses five poster render modes and zero canvases; reduced motion also has zero canvases. No performance-only source change was needed. Score differences include accessibility changes and normal run variability.
- Temporary Lighthouse installation and raw JSON reports stay in ignored .cache/lighthouse/; project dependencies and lockfile are unchanged by this tool installation.
- No browser console errors. Existing Fiber/Three Clock deprecation warning is documented in STACK.md. Local next start emits its existing standalone-output warning; README includes the packaged server entry point.
