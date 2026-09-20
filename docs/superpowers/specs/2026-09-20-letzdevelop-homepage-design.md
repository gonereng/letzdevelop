# LetzDevelop Marketing Homepage — Design Spec

**Date:** 2026-09-20  
**Site:** https://letzdevelop.lu  
**Language:** German only

## Product

LetzDevelop is a Luxembourg website studio for local businesses. The homepage sells three website packages (Basic, Pro, Business) plus optional monthly hosting, and captures leads via an unverbindliche Redesign-Vorschau and a contact form.

This is a marketing site, not a product app. One page does the selling. Legal pages are separate routes.

## Audience

Owners of small and mid-size businesses in Luxembourg: Handwerk, Praxen, Kanzleien, Handel, Dienstleistung. They want a site that looks current, works on the phone, and has a clear price. They do not want agency theatre.

## Voice

- German, Siezen, short sentences.
- Local and concrete. Say Luxemburg, not “DACH”.
- Prices are visible. No “Preis auf Anfrage” as the only answer.
- Never mention AI, generators, automated redesign tooling, or how the studio works internally.
- No English UI. No language switcher.

## Hard constraints (on-page)

1. German only — no language switcher, no `hreflang` for other locales.
2. Never mention AI, generators, or automated redesign tooling.
3. Redesign-Vorschau is **unverbindlich**. After the check there is **no purchase obligation**. Say this in the section, next to the form, and in the success copy.
4. Prices always as **ab … €** plus **Hosting ab … € / Monat**, with a scope footnote.
5. No fake testimonials, no fake client logos, no invented case studies.
6. Hosting is a **monthly add-on** shown on **every** package card — not bundled into the one-off price, not hidden in a tooltip.
7. Contact via Formspree (`PUBLIC_FORMSPREE_ID`). Fallback: `mailto:hello@letzdevelop.lu` when the id is missing (dev).

## Provisional values (`src/content/site.ts`)

These numbers are placeholders until the owner confirms them. Change them only in `site.ts`.

| Key | Value |
|---|---|
| Basic | 990 € |
| Pro | 1890 € |
| Business | 3490 € |
| Hosting | 29 € / Monat |
| Vorschau turnaround | 3 Werktage |
| Email | hello@letzdevelop.lu |

## Brand

**Name:** LetzDevelop  
**Mark:** Wordmark “LetzDevelop” with a small red bar under “Letz” — a nod to the Luxembourg flag without using the flag as a logo.

**Positioning line:** Websites für Betriebe in Luxemburg.

**Personality:** Calm print shop that went digital. Paper, ink, one red stamp. Not a SaaS dashboard, not a neon startup, not a stock “creative agency” with purple gradients.

## Visual system

### Colour

| Token | Hex | Use |
|---|---|---|
| `--ink` | `#1C1915` | Text, header, footer |
| `--paper` | `#F4EFE6` | Page background |
| `--cream` | `#FBF7F0` | Cards, raised surfaces |
| `--stone` | `#D9D0C3` | Rules, borders |
| `--moss` | `#3F5C4A` | Secondary actions, over-uns band |
| `--red` | `#C8102E` | Luxembourg red: CTAs, mark underline, focus |
| `--muted` | `#5C574F` | Secondary text |

Do not use purple, electric blue, or dark-mode-first palettes.

### Type

- Headlines: **Fraunces** (opsz 144, soft, slightly old-world).
- Body / UI: **Source Sans 3**.
- Load from Google Fonts in the layout `<head>` with `display=swap`.
- Body size 1.125rem, line-height 1.6. Headlines tight tracking on large sizes.
- German compound words must wrap with `hyphens: auto` and `lang="de"`.

### Layout

- Content width 72rem.
- Horizontal padding 1.25rem (mobile) / 2rem (desktop).
- Sections stack with generous vertical rhythm (6–8rem desktop, 4rem mobile).
- One-column until 768px. Package cards become three columns at 960px.
- Sticky header using scroll-state: when stuck, add a hairline border and paper background.
- Skip link to `#inhalt`.

### Motion

- Respect `prefers-reduced-motion`.
- No hero video, no parallax, no count-up animations.
- Subtle underline grow on nav links. Button hover darkens the red, does not bounce.

### Imagery

No stock photos of laptops and handshakes. Use CSS composition: paper grain (SVG noise, very light), a red rule, and a simple geometric “preview frame” in the Vorschau section that looks like a browser window. Do not fake a real client screenshot.

## Page map

### Homepage (`/`) — 12 sections, in order

1. **Header** — Wordmark, in-page nav (Leistungen, Vorschau, Preise, Ablauf, Kontakt), primary CTA “Vorschau anfragen”. Mobile: native `<details>` disclosure for the menu (no JS hamburger library).
2. **Hero** — H1, lead, two CTAs (Vorschau / Preise), fact row: Luxemburg · ab 990 € · Vorschau in 3 Werktagen.
3. **Kennzeichen** — Four factual chips, not logos: Sitz in Luxemburg, Feste Paketpreise, Hosting monatlich, Deutsch.
4. **Problem** — Why a tired website costs local businesses. Three short points.
5. **Leistungen** — Four offers: Neue Website, Relaunch, Hosting & Betreuung, Formulare. Each links to Preise or Kontakt.
6. **Redesign-Vorschau** — Lead magnet. Form: name, email, current site URL. Copy **must** include “unverbindlich” and “keine Kaufverpflichtung”. Promise: direction within 3 Werktage.
7. **Preise** — Three package cards. Each shows `ab {price} €`, then a distinct hosting row `Hosting ab 29 € / Monat`. Highlight Pro. Scope footnote under the grid.
8. **Ablauf** — Numbered 1–4: Anfrage, Vorschau (3 Werktage), Angebot, Livegang.
9. **Über uns** — Short studio story. Local, direct, no team headshots required. No client names.
10. **FAQ** — Native `<details>` items from `site.ts`. Include unverbindlich, hosting, duration, what “ab” means, data handling pointer to Datenschutz.
11. **Kontakt** — Full form: name, email, phone (optional), package select, message, privacy checkbox linking to `/datenschutz`. Formspree POST.
12. **Footer** — Wordmark, email, nav, legal links (Impressum, Datenschutz, AGB). Copyright year from `site.ts`.

### Legal stubs

- `/impressum` — Placeholder legal entity block. No invented RCS/TVA numbers. Email and site name only, plus “Angaben zum Rechtsträger folgen.”
- `/datenschutz` — GDPR-oriented stub: controller email, Formspree as processor for form posts, no analytics claimed unless actually added.
- `/agb` — Short stub for website-package orders: scope via written offer, hosting as monthly add-on, Vorschau unverbindlich.

Legal pages use the same layout (header/footer), `h1`, and a readable prose column.

## Components

| File | Role |
|---|---|
| `src/layouts/BaseLayout.astro` | html lang=de, fonts, skip link, header, footer, slot |
| `src/components/Header.astro` | Sticky nav |
| `src/components/Footer.astro` | Legal + contact |
| `src/components/CtaButton.astro` | Primary/secondary link styled as button |
| `src/components/LeadForm.astro` | Shared Formspree form (vorschau \| kontakt variants) |
| `src/components/PackageCard.astro` | One package + hosting add-on row |
| `src/components/sections/*.astro` | One file per homepage section |

## Forms

- `action="https://formspree.io/f/{PUBLIC_FORMSPREE_ID}"` `method="POST"`.
- Visible labels, `autocomplete` tokens (`name`, `email`, `tel`, `url`).
- Required privacy consent on Kontakt. Vorschau includes a one-line consent + unverbindlich note.
- Honeypot field `_gotcha` (hidden).
- Success: Formspree redirect back with `?gesendet=1` or native Formspree thank-you; homepage shows a German confirmation that restates unverbindlich for the vorschau variant.
- If `PUBLIC_FORMSPREE_ID` is empty, render a `mailto:` fallback instead of a dead form.

## SEO / meta

- Title: `LetzDevelop – Websites für Betriebe in Luxemburg`
- Description: German, ~155 chars, mentions Luxemburg, ab-Preise, unverbindliche Vorschau.
- `lang="de"`, Open Graph using the same title/description. Canonical `https://letzdevelop.lu/`.
- No indexing tricks. No cookie banner unless we add non-essential cookies (we do not).

## Accessibility

- Landmarks: header, nav, main, footer.
- Sequential headings (one h1 in hero / legal h1 on stubs).
- 4.5:1 contrast on paper/ink and red/cream for button text (use white text on `--red`).
- Focus visible: 2px ink outline offset 2px.
- FAQ: `<details>`/`<summary>` — do not put headings inside `<summary>`.
- Forms: errors via native `required` + `aria-describedby` for the privacy note.

## Out of scope

- CMS, blog, multilingual, client portal, payment, cookie consent platform, analytics, real photography, CMS-driven prices.
- Testimonials of any kind.
- Mention of implementation tooling.
