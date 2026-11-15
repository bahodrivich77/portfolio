# Mirkarim Furqatov — portfolio

A multilingual React 19 / TypeScript portfolio with Tailwind CSS 4 and Vite 8. An editorial graphite/ivory identity, CSS-built artwork, responsive project showcases, accessible native dialogs, and server-side Telegram delivery.

## Develop

```sh
npm ci
npm run dev
```

```sh
npm test
npm run typecheck
npm run lint
npm run build
npm run preview
```

Node 24 is used in CI. The client is a static Vite build; `api/contact.js` runs as a Vercel Node function. `vite` and `vite preview` do not execute Vercel functions. Use Vercel's development environment to test the integrated contact endpoint locally.

## Deploy to Vercel

Use the existing GitHub project with the Vite framework preset and `dist` output. Set **server-side** environment variables in Vercel for the desired Preview / Production environments:

- `TELEGRAM_BOT_TOKEN`
- `TELEGRAM_CHAT_ID`

Never prefix secrets with `VITE_`. Rotate the token previously committed in `.env`; removing the file does not revoke a credential or erase Git history. No live messages were sent during automated tests.

The contact endpoint validates fields, rejects foreign origins and unsupported methods/content types, handles upstream errors/timeouts, sends plain text, and applies a five-attempt/ten-minute per-IP, per-instance limit. For distributed abuse protection, configure a Vercel Firewall rate-limit rule on `POST /api/contact`; the in-memory application limit is not a distributed quota. The UI preserves input on error and provides a direct Telegram alternative.

## Content and structure

- `src/lib/content.ts`: source links, project metadata, skills.
- `src/i18n/translations.js`: preserved UZ / RU / EN project, experience, and writing content.
- `src/i18n/editorial.ts`: localized interface copy.
- `src/sections/`: typed, independent portfolio sections.
- `src/components/`: navigation, headings, project artwork, metadata, footer.
- `src/index.css`: shared theme tokens, responsive composition, interaction states, reduced-motion and print styles.

Project artwork is explicitly labeled as an **interface study**, not an actual product screenshot. Only the original directly linked LinkedIn article is presented as an article; other preserved topics link to the profile. Existing experience dates are retained from the original codebase, not independently verified credentials. Unsupported counters and proficiency percentages have been removed.

## Quality

The GitHub Actions workflow runs tests, strict TypeScript checks, lint, the production build, and mobile/desktop Lighthouse audits. It uploads HTML/JSON reports and flags any category below 95. Lighthouse values are laboratory measurements, not field Core Web Vitals or a guarantee of deployed performance.

See [the audit and verification record](docs/QA.md) for measured results and limitations.
