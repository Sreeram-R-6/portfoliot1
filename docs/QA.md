# QA - bug audit, 2026-09-29

**Incomplete audit.** B016 is open. Zero open P0/P1 and the complete requested comparison sweep have not passed. Historical reports and Lighthouse scores have been replaced by the evidence below; no prior "Matched" status is inherited.

| Check | Current evidence / result |
| --- | --- |
| Repository/build | Initial clean/synchronized baseline 3b5bfa2; production npm run build plus npm start on 3000, dev on 3002. Latest lint, typecheck and build pass. No dependency/lockfile changes or deployment. |
| Original/local comparison | 336 baseline cropped page captures: four routes, four requested viewports, seven page fractions, original/prod/dev. Final production has 140 page/pin crops and JSON in docs/recon/compare/final-{390,768,1280,1440}.json. Full section-relative matrix remains UNVERIFIED. |
| Content regression | A completed 60-configuration run passed: real / maximum / twenty / three / empty, six widths 320/375/768/1280/1440/1920, normal + reduced motion, 42 crops, no clipping/overlap/root overflow or unexpected console output. A final unchanged-code repeat is running; .cache/qa/content/results.json records progress. |
| Project pin assertions | qa-content.mjs now checks pinned top against navigation bottom at five fractions (2px tolerance), release past the end, and keyboard reachability of the final thumbnail. It re-enters the visible pin before focus; hidden exited cards are not mistaken for a focus bug. |
| Work regression | 36 work/index/detail/maximum/empty configurations at six widths passed. .cache/qa/work/results.json; no clipping, overflow, overlap, pins or unexpected app console output. |
| Navigation regression | Completed eighteen cases previously passed with 0px back/forward/reload error: six widths, production eleven projects and development 3/20-project fixtures. A final repeat is running. .cache/qa/navigation/results.json. |
| Resize / touch / gate | final-resize.json covers nine states on both builds including 1440x500 and 1280x720 flow fallbacks. final-touch-audio-gate.json records trusted CDP swipes (383.33px / 384px travel), landscape blocking and portrait release. |
| Menu | B012/B013/B014 evidence covers font metrics, frame/colors, 16px route gap, twelve forward Tabs, Shift+Tab wrap and Escape focus return on both builds at four viewports. Full entry/exit timestamp parity remains UNVERIFIED. |
| Sound | Current .cache/qa/sound-result.json: no pre-gesture players/requests/plays; synthetic input rejected; ambient .3 and four UI voices .5; mute, storage/reload and simulated document.hidden pause/resume pass; zero page errors. Native background-tab scheduling and full source timing comparison remain UNVERIFIED. |
| Scroll frame timing | final-frame-times.json: serial foreground 2.5-second hero/project sweeps; original/prod/dev median 16.7ms, zero >50ms frames. Production maxima 18.3/17.4ms; dev 33.5/17.9ms. Short samples, not a guarantee on other devices. |
| GPU/navigation lifetime | B015 evidence: three home/work/home cycles through all scenes; active contexts 2/0, triggers 4/0, subscribers 5/2 without growth. B016 heap profiles still show detached DOM/listener accumulation. |
| Production exclusions | Current MCP request checks: GET /details, GET/PUT /api/details, POST /api/details/upload, /qa-stress/three and missing project slug all return 404. GET on upload is not claimed to return 404. |
| Assets | Seven licensed optimized WebPs, 42,708-232,134 bytes, <=1600px; Next Image fill/sizes/lazy below fold. Eleven editor replacement labels. Seventeen tracked public paths are inventoried in ASSETS.md, including existing own audio/branding/directory markers. |
| Reference guard | git check-ignore public/_reference succeeds; build/pre-commit reject tracked reference files, same-hash copies and source imports, including renamed untracked public build inputs. B005-reference-guard.json and B005-untracked-reference-guard.json. |
| Content preservation | Original text/numbers/counts are unchanged; licensed image fields and authorized footer credits are the additions. Fixtures preserve real imagery in the twenty-project case and retain null-image coverage in maximum stress. |
| Lighthouse mobile | Last completed current-assets run: Performance 91, Accessibility 100, Best practices 100, SEO 100; Lighthouse 12.8.2, headless Chrome, default simulated mobile, production localhost:3000. Final unchanged-code repeat pending until other browser suites finish. |

Commands: `QA_URL=http://localhost:3002 node scripts/qa-content.mjs`, `QA_URL=http://localhost:3002 node scripts/qa-work.mjs`, `node scripts/qa-navigation.mjs` (set environment variables using the active shell). Reports and screenshots stay ignored under .cache/qa/ and docs/recon/compare/.

The only excluded app warning is upstream Three.Clock deprecation. npm start additionally emits its existing output:standalone CLI warning; it is not a browser console warning. The environment is Node 22.17.0 rather than package.json's recommended >=24.

Open work: B016 root cause and measured fix; seven section-relative positions in every section/state; original loader completion/orientation identification; full interaction and transition timestamp comparisons; WebGL DPR/context-loss recovery; exact original navigation/restoration comparisons. UNVERIFIED is not a pass.
