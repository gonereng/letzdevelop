# LetzDevelop

Marketing site for [letzdevelop.lu](https://letzdevelop.lu): German-only homepage, package prices, unverbindliche Redesign-Vorschau, and legal stubs.

Stack: Astro 5, Tailwind CSS 4, Vitest, Formspree.

## Commands

```bash
npm install
npm run dev      # local server
npm run build    # static site in dist/
npm run preview  # serve the build
npm test         # helper unit tests
```

## Content and prices

Edit `src/content/site.ts` for copy, packages, hosting, turnaround, and the contact address. Price formatting lives in `src/lib/money.ts`.

Provisional values:

- Basic 990 €, Pro 1.890 €, Business 3.490 €
- Hosting 29 € / Monat (add-on on every package)
- Redesign-Vorschau in 3 Werktagen
- hello@letzdevelop.lu

## Formspree

Copy `.env.example` to `.env` and set the public form id:

```
PUBLIC_FORMSPREE_ID=yourFormId
```

Astro exposes `PUBLIC_*` variables to the client. Create a form at [formspree.io](https://formspree.io/) and paste the id (the segment after `/f/`). Point submissions to hello@letzdevelop.lu.

Set the variable **before** `npm run build` (or in the host’s build environment). Astro inlines `PUBLIC_*` values at build time; a runtime-only env change will not switch the page from the mailto fallback to Formspree.

If the variable is empty, the page shows a `mailto:` fallback instead of posting.

## Routes

- `/` homepage (12 sections)
- `/impressum`
- `/datenschutz`
- `/agb`

## Constraints

The live page is German only, does not mention internal tooling, states that the preview is unverbindlich with no purchase obligation, and does not invent testimonials or logos.
