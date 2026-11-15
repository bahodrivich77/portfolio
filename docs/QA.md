# Redesign audit and QA

## Original issues addressed

- Hardcoded dark colors and a no-op theme provider; hero/about/skills bypassed localization.
- Mouse-only project cards and an unlabelled modal without native focus management.
- Global custom cursor, canvas background, typewriter/counter timers, and an uncancelled smooth-scroll animation loop.
- Large inline style blocks, repeated component logic, unsupported numeric skill ratings and achievement counters.
- A client-side Telegram token referenced through Vite's public environment mechanism; `.env` and Vite cache tracked in Git.
- Broken favicon path, invented social URLs in structured data, and canonical/sitemap entries for language routes the app did not implement.

## Design and engineering changes

Typed section/component architecture; work-first editorial layout; graphite/ivory tokens; lime folded monogram; lightweight CSS interface studies; real language and theme persistence; responsive grids; native scrolling/dialog focus behavior; keyboard-visible focus and reduced-motion rules; semantic landmarks/labels; stable image dimensions; local variable fonts; server-side contact function. Removed unused animation/scroll dependencies.

## Verification

- Browser layout matrix: 320, 375, 768, 1024, 1440, 1920, 3840 CSS-pixel frame widths, each in UZ / EN / RU and dark / light (42 cases). No horizontal document overflow, broken image elements, or missing internal anchor targets. Frame scrollbars consume 15 CSS pixels; this is viewport layout testing, not physical-device certification.
- Visual inspection: desktop and mobile hero, project cards, mobile menu, dialogs; additional section checks recorded in the final update below.
- Contact tests use a mocked upstream service; no real Telegram message was transmitted.
- Lighthouse local execution attempted against the production preview with Lighthouse 13.6.0. Chromium could not start because the execution environment denied its process socket. The CI workflow supplies an independent, repeatable audit path; no local Lighthouse score is claimed.
- Automated accessibility checks use axe-core with WCAG 2 A/AA, WCAG 2.1 AA, WCAG 2.2 AA and best-practice tags. Automated scans do not certify complete WCAG conformance. Manual keyboard, contrast, focus visibility and reflow checks supplement them.

## Deployment requirements

Set new server-only Telegram environment variables on Vercel and revoke the historically exposed token. `.env` is no longer tracked and is not included in browser source; Git history still contains the old version. A Vercel Firewall rule is needed for distributed rate limiting. No production merge or deployment is authorized by this branch.

## Final refinement results

- Preserved the Telegram poll introduced by the concurrent `main` update (`cd8afef`), including adding candidates, vote changes/retraction, reactions, reset, and clipboard copy. It is explicitly labeled as a browser-only demo; added three vote-state tests.
- Fixed initial fragment navigation after React mounts; a direct `#about` load now positions the section 100px below the viewport top. Project Escape/focus restoration and mobile menu keyboard activation/Escape were verified.
- Repeated the full 42-case layout matrix with the poll expanded: no overflow, broken image elements, or missing anchor targets. See `responsive-qa.json`.
- Twelve axe scans at mobile/desktop widths across UZ/EN/RU and both themes returned zero violations (48 passing checks per scan). The expanded poll also returned zero violations (49 passing checks in the additional English mobile dark scan). Contrast checks flagged as incomplete for decorative/gradient artwork require human review; this is not a blanket conformance certificate. See `accessibility-qa.json`.
- Contact UI failure preserves input; success resets the form. Both were verified with mocked endpoint responses. Nine API tests cover validation, methods, origin/content type, honeypot, missing environment variables, success, upstream failures, message length, and rate limiting. No real message was sent.
- No portfolio-origin console warnings/errors were observed. Browser extension and Vercel login errors are external to the app.
- Removed client credential references and verified original local environment values are absent from tracked source and the built browser bundle. Historical Git contents are not erased.
- Patched vulnerable dependency versions and scoped the TypeScript ESLint minimatch override to a fixed release. `npm audit` reports zero vulnerabilities. `npm test` passes 15 tests; TypeScript, lint and production build pass.

## Measured Lighthouse baseline

GitHub Actions run [43700191534](https://github.com/bahodrivich77/portfolio/actions/runs/43700191534), commit `613dd3c`, Lighthouse 13.6.0, fresh production preview served on the runner:

| Device | Performance | Accessibility | Best Practices | SEO | LCP | TBT | CLS |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Mobile | 100 | 100 | 100 | 100 | 0.8 s | 70 ms | 0 |
| Desktop | 100 | 100 | 100 | 100 | 0.2 s | 0 ms | 0 |

[HTML and JSON reports](https://github.com/bahodrivich77/portfolio/actions/runs/43700191534/artifacts/14155913416). The first CI run incorrectly gated Lighthouse's additional experimental agentic-browsing category (50); the gate now explicitly checks the four requested categories above. That extra category remains visible in the raw reports. These are lab results, not field INP/CrUX measurements. The updated lockfile and fragment fix are audited again by subsequent CI runs.

Vercel reported the branch preview Ready. Its URL requires Vercel authentication in this browser, so deployed contact delivery and the preview's live metrics were not verified. Use the Preview link in PR #5 with the owner's Vercel account; do not disable deployment protection to bypass the sign-in requirement.
