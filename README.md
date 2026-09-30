# Sreeram Portfolio

Data-driven portfolio for Sreeram R, covering software, embedded systems, IoT, drones and research. All supplied content lives in `src/content/site.json`; `site.ts` preserves the component exports and types. Editorial reminders stay in `/details` and never render on the public site.

## Stack

Next.js 16 App Router, React 19, strict TypeScript, Tailwind CSS v4, GSAP/ScrollTrigger, Lenis, Three.js and React Three Fiber. Rajdhani, DM Sans and DM Mono load through `next/font/google`. Decorative posters, shader effects, favicon and social artwork are original project assets. No reference-site images, logos, fonts or personal text are included.

## Run and verify

Requires Node.js 24 or newer and npm. No environment variables or service credentials are required.

```sh
npm ci
npm run dev
```

Open http://localhost:3000. Production and checks:

```sh
npm run build
npm run start
npm run lint
npm run typecheck
npm run check
```

The build also emits a standalone server for the existing Docker configuration. Next.js recommends the standalone entry point for packaged production use; `npm run start` supports local QA but prints that configuration warning. To run the packaged server locally in PowerShell after building:

```powershell
Copy-Item -Recurse -Force public .next/standalone/public
Copy-Item -Recurse -Force .next/static .next/standalone/.next/static
node .next/standalone/server.js
```

## Content to provide

- Direct project repository/demo URLs and images you own.
- A downloadable CV file; the Resume control stays hidden while its URL is a placeholder.
- Public domain: replace `metadata.siteUrl` (`https://portfolio.example`) before publishing. Canonical, Open Graph, robots and sitemap derive from it.

## Local content editor

Run `npm run dev`, then open http://localhost:3000/details. The plain editor covers every JSON field, including loader labels, navigation/sound labels and a Sound group. It uses native scrolling, with no Lenis, GSAP or WebGL.

Changes update an in-memory draft automatically. **Save** validates and atomically replaces `src/content/site.json`; refresh the site preview to see the result. **Reset** reloads disk and discards unsaved edits. Reloading the editor also discards unsaved drafts. **Export JSON** downloads the draft; **Import JSON** validates before replacing the draft and still requires Save.

Lists support add, delete and up/down ordering. Projects and experience entries are repeatable and may be empty; use unique lowercase IDs. Keep the structural section IDs. Counters, tools, display lines/words and coordinate lists accept variable counts. Invalid changes show inline messages and cannot be saved. Null project images are valid and produce deterministic original glyph posters seeded by project ID.

Use http(s) URLs, `mailto:name@example.com`, local paths or `#section` anchors for links. The site domain must be an absolute http(s) URL. Numeric counter strings count up; other strings display unchanged. Required text cannot be empty: use TODO for missing content. The warning list includes `todos`, each project’s `todo`, the reserved domain and absent images.

Project `summary` is optional. Use **Add optional summary** in the editor to provide one. Without it, the card derives the first sentence of the full description, shortened at a word boundary to about 140 characters. The stored description is never changed. Optional `role`, `year`, `tags[]`, `gallery[]` and `caseStudy[]` can also be added through the editor; null gallery images are valid. Missing or TODO blocks stay hidden. `/work` lists every project and `/work/[id]` shows its unchanged description and available optional content. Home cards with meaningful case-study paragraphs or gallery images link to that route. Other cards retain the accessible detail dialog; Tab stays inside, Escape closes it and focus returns to the opener. Placeholder URLs open the dialog; real http(s) destinations get an external **View project** link.

Character counters are recommendations, not save limits:

| Field | Recommended characters |
| --- | ---: |
| Title | 48 |
| Role / eyebrow | 60 |
| Hero description | 200 |
| Project summary | 140 |
| Project description | 500 |
| Experience description | 240 |
| Tool item | 40 |
| Footer link label | 40 |

Long text wraps within the layout. Hero display lines use measured one-line fitting. Desktop project pinning uses measured card widths and heights; unusually tall copy uses a normal grid. Experience descriptions use measured heights while retaining the 550ms canvas mix.

Project images support PNG, JPG/JPEG, WebP and static, self-contained SVG; CV uploads accept PDF. Each file is limited to 5 MB. Upload writes a uniquely named, sanitized file into `public/uploads/` immediately and sets its draft path; Save associates that path with the content. Reset does not delete uploaded files. Uploads are public assets: do not upload secrets or private documents. The existing project canvas can use uploaded images while retaining its original placeholder and motion behavior.

The editor and its GET/PUT/upload endpoints return 404 in production. `/details` has `X-Robots-Tag: noindex`; robots disallows editor/API paths. The sitemap contains `/`, `/work` and project routes, using `metadata.siteUrl`. No authentication, extra listener, host change or new dependency was added.

Mobile and low-power users receive static artwork. Normal motion uses the shared hero/manifesto pin when both scenes fit the viewport; mobile avoids character splitting. Tall content uses ordinary flow. Desktop projects use a measured horizontal pin above 1024px, with vertical-wheel travel, progress, keyboard arrows and focus reveal; tablet/mobile use the audited vertical grid. There is no forced snap. Reduced motion removes pins and uses native scrolling. Route transitions use an original pixel cover, with short fades for reduced motion; back/forward restores the nested scroll position. Coarse-pointer landscape below 501px height shows the orientation hint and makes the page inert.

## Loader and sound

The session loader waits for fonts, visible eager images and initially active WebGL readiness, then exits within about 280ms. Hero entrance waits for release. It runs once per session, with a short reduced-motion fade; `loader.label` supplies its text. Its timing deliberately avoids the reference's artificial loading holds.

Sound defaults to On but creates no audio players or requests until a trusted pointer/keyboard gesture. The header/menu shows the true pending, playing or muted state. The preference persists in localStorage; ambient playback fades over 150ms, loops at volume .3 and pauses when the tab is hidden. UI voices use volume .5. Reduced motion does not mute sound.

All four WAV files in `public/audio/` are original deterministic PCM synthesis from `node scripts/generate-audio.mjs`: a 12-second ambient loop, hover, click and toggle tones, totaling 197,696 bytes. No third-party audio or icon logos are included; tool hover pairs are original geometric glyphs. These authored assets require no third-party license. The scaffold's MIT attribution remains in LICENSE.

Configure `sound.ambient` and `sound.ui.hover/click/toggle` in `/details` to use your own public paths or http(s) tracks. Audio uploads accept MP3, OGG and WAV up to 5 MB, with MIME/signature checks; no file is uploaded until you choose one. Images/PDF rules and the public-upload behavior above also apply.

Social artwork source is `public/seo/social-card.svg`, generated with `node scripts/generate-social-card.mjs`; `public/seo/og.png` is its 1200x630 browser-rendered export. Regenerate both when changing the name or role.

QA findings and measurement conditions are in [docs/QA.md](docs/QA.md). Recon captures and temporary QA tools/reports are ignored. Required MIT scaffold attribution is retained in [LICENSE](LICENSE). No design-reference credit or deployment is included.

## Content stress checks

With the dev server running, `node scripts/qa-content.mjs` checks real content and `/qa-stress/maximum`, `/qa-stress/twenty`, `/qa-stress/three`, `/qa-stress/empty` at 320, 375, 768, 1440 and 1920 pixels with normal and reduced motion. It uses the already installed Playwright package and Chrome. Screenshots and reports stay in `.cache/qa/content/`.

`src/content/__fixtures__/stress.json` is separate synthetic QA data; `node scripts/content-fixtures.mjs` regenerates it from the current schema without writing `site.json`. Fixture routes return 404 in production, have noindex headers, are excluded from the sitemap and are disallowed by robots. Fixture JSON is excluded from standalone output and is not imported into public bundles.

`node scripts/qa-work.mjs` checks public index/detail routes and maximum/empty fixtures at the same five widths. Fixture views use `?view=work` or `?view=detail`. Reports stay in `.cache/qa/work/`. Behavioral audit and deliberate differences are recorded in [docs/PARITY.md](docs/PARITY.md).
# Placeholder credits

Project images are illustrative placeholders from Pexels contributors and Mikael Haggstrom (CC0). Sources, authors, licenses and attribution requirements are recorded in [docs/ASSETS.md](docs/ASSETS.md). Replace them with your own in the development-only `/details` editor.

Enable the reference-asset pre-commit guard after cloning: `git config core.hooksPath .githooks`. The production build always runs the same guard.

# GitHub Pages deployment

This repository is configured as a static Next.js export for the user site
`https://sreeram-r-6.github.io`. Pushes to `main` build `out/` and deploy it
through `.github/workflows/deploy-pages.yml`.

In the repository settings, open **Pages**, choose **GitHub Actions** as the
source, and rename the repository to `sreeram-r-6.github.io` under
**Settings → General**. The public portfolio works on Pages; the local
`/details` editor and its `/api/details` upload/save endpoints require a server
and are intentionally unavailable in the static deployment.
