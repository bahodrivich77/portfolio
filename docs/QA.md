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
