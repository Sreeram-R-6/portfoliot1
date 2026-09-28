# Sreeram Portfolio

Personal portfolio for Sreeram, a CS student and builder at CCE Kerala. Projects cover software, embedded systems and telemetry. Copy lives in `src/content/site.json`; `site.ts` preserves the component exports and types. Unprovided contact details, project URLs/images and statistics remain marked TODO.

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

- Email, GitHub and LinkedIn URLs; CV file.
- Project destinations and images you own for all five projects.
- Confirmed statistics and tools; optional coordinates.
- Public domain: replace `metadata.siteUrl` (`https://portfolio.example`) before publishing. Canonical, Open Graph, robots and sitemap derive from it.

## Local content editor

Run `npm run dev`, then open http://localhost:3000/details. The plain editor covers every JSON field, grouped into profile/identity, contact/social links, manifesto, statistics/tools, projects, experience, footer and SEO/meta. It uses native scrolling, with no Lenis, GSAP or WebGL.

Changes update an in-memory draft automatically. **Save** validates and atomically replaces `src/content/site.json`; refresh the site preview to see the result. **Reset** reloads disk and discards unsaved edits. Reloading the editor also discards unsaved drafts. **Export JSON** downloads the draft; **Import JSON** validates before replacing the draft and still requires Save.

Lists support add, delete and up/down ordering. Projects and experience entries are repeatable; keep at least one of each and use unique lowercase IDs. Existing structural section IDs, two identity display lines, three manifesto words/counters/footer group labels, four tools and two coordinate labels are required by the current layout. Invalid changes show inline messages and cannot be saved.

Use http(s) URLs, `mailto:name@example.com`, local paths or `#section` anchors for links. The site domain must be an absolute http(s) URL. Statistics accept non-negative decimal numbers stored as text, or TODO. Required text cannot be empty: use TODO for missing content. The warning list counts remaining TODO fields and includes the reserved domain and absent images.

Project images support PNG, JPG/JPEG, WebP and static, self-contained SVG; CV uploads accept PDF. Each file is limited to 5 MB. Upload writes a uniquely named, sanitized file into `public/uploads/` immediately and sets its draft path; Save associates that path with the content. Reset does not delete uploaded files. Uploads are public assets: do not upload secrets or private documents. The existing project canvas can use uploaded images while retaining its original placeholder and motion behavior.

The editor and its GET/PUT/upload endpoints return 404 in production. `/details` has `X-Robots-Tag: noindex`; robots disallows editor/API paths and the sitemap contains only the public home page. No authentication, extra listener, host change or new dependency was added.

Mobile and reduced-motion users receive static artwork. Reduced motion also removes scroll pins and uses native scrolling. Keyboard focus reveals animated controls immediately.

Social artwork source is `public/seo/social-card.svg`, generated with `node scripts/generate-social-card.mjs`; `public/seo/og.png` is its 1200x630 browser-rendered export. Regenerate both when changing the name or role.

QA findings and measurement conditions are in [docs/QA.md](docs/QA.md). Recon captures and temporary QA tools/reports are ignored. Required MIT scaffold attribution is retained in [LICENSE](LICENSE). No design-reference credit or deployment is included.
