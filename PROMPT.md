ROLE
You are a senior front-end engineer. Rebuild the design, layout, and motion of https://curtisdesignr.me/ as my personal portfolio inside this repo (Next.js 16 App Router, React 19, Tailwind v4). Follow AGENTS.md and the clone-website skill/workflow in this repo. If no skill is registered, read its instruction file and follow it manually.

TOOLS

- playwright MCP: recon, screenshots, DOM, computed styles, interaction sweeps.
- context7 MCP: fetch current docs for Next 16, Tailwind v4, and any animation lib before using it. Do not guess APIs.
- gh CLI (preferred) or github MCP: repo creation and push.

HARD RULES

- Zero hallucination: every value (color, font, spacing, easing, duration, breakpoint) must come from getComputedStyle, CSS, or the JS bundle. If unverifiable, mark "UNVERIFIED" in the spec and ask me.
- Do not copy their text, logos, photos, or personal branding. Copy structure, layout, styling, and motion only. Use my placeholder content.
- Paid font -> closest Google Font, note it.
- No new dependencies without listing them and the reason first.
- Small commits, one per section. Never rewrite the project in one pass.
- NEVER commit secrets, tokens, .env files, or third-party assets/screenshots.

GIT RULES (apply to every phase)

- After each step: run verification first (see VERIFY per phase). Commit and push ONLY if verification passes.
- If verification fails: fix, re-verify, then commit. Never push a broken build.
- Commit format: "<type>: <what>" (feat/fix/chore/docs). Push after every commit: git push origin main.
- After each push, confirm with `git status -sb` (must show no "ahead") and `git log -1 --oneline`. Print both.
- Never force-push. Never rewrite history.

PHASE 0: REPO SETUP

1. Verify tools: `node -v` (>=20), `git --version`, `gh --version`, `gh auth status`. If gh is missing or unauthenticated, STOP and tell me the exact fix.
2. Detach from the template: `git remote remove origin` (ignore error if none). Ensure branch is named main: `git branch -M main`.
3. Update .gitignore to include: node_modules, .next, .env*, docs/recon/, public/\_original/, *.log, .DS_Store, .playwright-mcp/.
4. Check `gh repo view portfoliot1`. If it already exists, STOP and ask me. Otherwise:
   `gh repo create portfoliot1 --public --source=. --remote=origin --description "Personal portfolio (Next.js 16, Tailwind v4)"`
5. Commit any pending changes ("chore: init portfolio from template") and `git push -u origin main`.
   VERIFY: `gh repo view portfoliot1 --json name,visibility,url` shows name=portfoliot1, visibility=PUBLIC; `git status -sb` clean and in sync; `git ls-files | grep -E "\.env|docs/recon"` returns nothing.
   Print the repo URL. Then continue.

PHASE 1: RECON (no code yet)

1. Open the site at 375, 768, 1440 px. Full-page screenshots into docs/recon/ (gitignored).
2. List every section top to bottom.
3. Extract: fonts (family, weight, size, line-height, letter-spacing), colors (convert to oklch tokens), spacing scale, radii, shadows, borders, z-index layers.
4. Interaction sweep per section: hover, focus, click, scroll triggers, cursor effects, page transitions, loaders, sticky/pinned behavior.
5. Identify the animation stack (GSAP, Framer Motion, Lenis, Locomotive, Three.js/WebGL, CSS only) via script tags, network, bundle. Report exact libs and versions.
6. List assets by type. Download nothing I lack rights to; use same-size placeholders.
   Output: docs/recon/REPORT.md (local only) and a committed docs/STACK.md containing only the tech/animation-stack findings and section list (no third-party content).
   VERIFY: both files exist; `git ls-files docs` shows only STACK.md.
   Commit "docs: recon summary", push. STOP and show me a summary.

PHASE 2: FOUNDATION

- globals.css: oklch tokens, next/font setup, base styles, smooth scroll if used.
- Layout shell, nav, footer skeleton.
- src/content/site.ts: all copy and project data (nothing hardcoded in components).
  VERIFY: `npm run build` passes with zero errors; `npm run lint` clean; dev server renders shell.
  Commit "feat: foundation", push.

PHASE 3: SPECS
For each section write docs/specs/<section>.md: layout (exact values), states, interactions (trigger, duration, easing), responsive behavior per breakpoint, component tree.
VERIFY: one spec per section listed in STACK.md; no unexplained UNVERIFIED items.
Commit "docs: section specs", push. STOP and wait for my approval.

PHASE 4: BUILD
One section at a time in spec order. For each:

1. Implement.
2. VERIFY: `npm run build` passes; run dev; screenshot at 375/768/1440; diff against local recon; fix mismatches.
3. Commit "feat: <section>", push, print `git log -1 --oneline`.

PHASE 5: MOTION
Implement scroll/hover/transition behavior from the specs using the libs from Phase 1. Match timing and easing exactly. Respect prefers-reduced-motion.
VERIFY: build passes; each animation checked in the browser via playwright; no console errors.
Commit per feature ("feat: <animation>"), push each.

PHASE 6: QA

- Visual diff at 375/768/1440.
- Lighthouse: Performance 90+, Accessibility 95+.
- Keyboard nav, alt text, semantic HTML, meta/OG tags.
- `npm run build` zero errors and zero type errors.
- README.md: project description, stack, run instructions. No third-party content.
  VERIFY: all above pass.
  Commit "chore: qa and readme", push.

MY CONTENT (placeholders until I replace them)

- Name: Sreeram
- Role: CS student and builder, CCE Kerala
- Projects: Thuzhayan (AI-instrumented Vallamkali telemetry), SafeRoad (ESP32 + Firebase road safety), AICTE dual-drone disaster rescue system, CCE Judge (competitive programming platform), Weather Station Dashboard
- Contact: [email], [GitHub], [LinkedIn]

OUTPUT STYLE
Terse. Bullet/table reports only. At the end of each phase print: VERIFY results / UNVERIFIED items / commit hash pushed / next action. Ask at most one question at a time, only when blocked.

START PHASE 0 NOW.
