# Sreeram Portfolio

Personal portfolio for Sreeram, a CS student and builder at CCE Kerala. Projects cover software, embedded systems and telemetry. Copy lives in `src/content/site.ts`; unprovided contact details, project URLs/images and statistics remain marked TODO.

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

Mobile and reduced-motion users receive static artwork. Reduced motion also removes scroll pins and uses native scrolling. Keyboard focus reveals animated controls immediately.

Social artwork source is `public/seo/social-card.svg`, generated with `node scripts/generate-social-card.mjs`; `public/seo/og.png` is its 1200x630 browser-rendered export. Regenerate both when changing the name or role.

QA findings and measurement conditions are in [docs/QA.md](docs/QA.md). Recon captures and temporary QA tools/reports are ignored. Required MIT scaffold attribution is retained in [LICENSE](LICENSE). No design-reference credit or deployment is included.
