# LetzDevelop Homepage Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship a German-only Astro 5 marketing homepage for letzdevelop.lu with 12 sections, package prices, unverbindliche Redesign-Vorschau, Formspree, and legal stubs.

**Architecture:** Static Astro site. All copy, prices, and FAQs live in `src/content/site.ts`. Pure helpers in `src/lib/` are unit-tested with Vitest. Sections are Astro components composed on `src/pages/index.astro`. Forms POST to Formspree using `PUBLIC_FORMSPREE_ID`.

**Tech Stack:** Astro 5, Tailwind CSS 4 (`@tailwindcss/vite`), TypeScript, Vitest, Formspree.

## Global Constraints

- German only — no language switcher, `html lang="de"`.
- Never mention AI, generators, or automated redesign tooling on-page.
- Redesign-Vorschau copy must include **unverbindlich** and **keine Kaufverpflichtung**.
- Prices as **ab … €** plus **Hosting ab … € / Monat**, with a scope footnote.
- No fake testimonials or logos.
- Provisional values only in `src/content/site.ts`: Basic 990€, Pro 1890€, Business 3490€, hosting 29€/Monat, 3 Werktage, hello@letzdevelop.lu.
- Hosting is a monthly add-on row on every package card.
- Formspree via `PUBLIC_FORMSPREE_ID`; ship `.env.example`.
- Legal stubs at `/impressum`, `/datenschutz`, `/agb`.

## File map

```
docs/superpowers/plans/2026-09-20-letzdevelop-homepage.md
docs/superpowers/specs/2026-09-20-letzdevelop-homepage-design.md
.env.example
package.json
astro.config.mjs
tsconfig.json
vitest.config.ts
src/content/site.ts
src/lib/money.ts
src/lib/form.ts
src/lib/money.test.ts
src/lib/form.test.ts
src/styles/global.css
src/layouts/BaseLayout.astro
src/components/Header.astro
src/components/Footer.astro
src/components/CtaButton.astro
src/components/LeadForm.astro
src/components/PackageCard.astro
src/components/sections/{Hero,Kennzeichen,Problem,Leistungen,Vorschau,Preise,Ablauf,Ueber,Faq,Kontakt}.astro
src/pages/{index,impressum,datenschutz,agb}.astro
public/favicon.svg
README.md
```

---

### Task 1: Scaffold Astro 5, Tailwind, Vitest

**Files:**
- Create: `package.json`, `astro.config.mjs`, `tsconfig.json`, `vitest.config.ts`, `.env.example`, `.gitignore`, `src/pages/index.astro`, `src/styles/global.css`, `public/favicon.svg`

**Produces:** `npm run dev`, `npm run build`, `npm test` (Vitest) scripts.

- [ ] **Step 1: Scaffold**

From the repo root (keep existing `README.md` and `docs/`):

```bash
npm create astro@latest . -- --template minimal --install --no-git --typescript strict --yes
npx astro add tailwind --yes
npm install -D vitest
```

If `create astro` refuses a non-empty directory, init `package.json` manually with Astro 5, `@astrojs/check`, `typescript`, `@tailwindcss/vite`, `tailwindcss`, `vitest`.

`astro.config.mjs`:

```js
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://letzdevelop.lu",
  vite: {
    plugins: [tailwindcss()],
  },
});
```

`vitest.config.ts`:

```ts
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["src/**/*.test.ts"],
  },
});
```

Add scripts to `package.json`:

```json
{
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "test": "vitest run",
    "test:watch": "vitest"
  }
}
```

`.env.example`:

```
PUBLIC_FORMSPREE_ID=
```

`.gitignore` must include `node_modules/`, `dist/`, `.env`, `.astro/`.

Placeholder `src/pages/index.astro` with `lang` later owned by the layout; for now a single German heading is enough.

- [ ] **Step 2: Verify**

`npm test` exits 0 (0 tests is OK). `npm run build` succeeds.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "chore: scaffold Astro 5 with Tailwind and Vitest"
```

---

### Task 2: Content module and helpers (TDD)

**Files:**
- Create: `src/content/site.ts`, `src/lib/money.ts`, `src/lib/form.ts`, `src/lib/money.test.ts`, `src/lib/form.test.ts`

**Produces:**
- `site` object (packages, hosting, turnaround, email, nav, faq, copy)
- `formatEuro(amount: number): string`
- `formatFromPrice(amount: number): string`
- `formatHostingMonthly(amount: number): string`
- `formspreeAction(id: string | undefined): string | null`
- `isHttpUrl(value: string): boolean`

- [ ] **Step 1: Write failing tests**

`src/lib/money.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { formatEuro, formatFromPrice, formatHostingMonthly } from "./money";

describe("formatEuro", () => {
  it("formats integers in de-LU style with a euro suffix", () => {
    expect(formatEuro(990)).toBe("990 €");
    expect(formatEuro(1890)).toBe("1.890 €");
    expect(formatEuro(3490)).toBe("3.490 €");
    expect(formatEuro(29)).toBe("29 €");
  });
});

describe("formatFromPrice", () => {
  it("prefixes ab", () => {
    expect(formatFromPrice(990)).toBe("ab 990 €");
  });
});

describe("formatHostingMonthly", () => {
  it("labels hosting as a monthly add-on", () => {
    expect(formatHostingMonthly(29)).toBe("Hosting ab 29 € / Monat");
  });
});
```

`src/lib/form.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { formspreeAction, isHttpUrl } from "./form";

describe("formspreeAction", () => {
  it("returns null when the id is missing", () => {
    expect(formspreeAction(undefined)).toBeNull();
    expect(formspreeAction("")).toBeNull();
    expect(formspreeAction("   ")).toBeNull();
  });

  it("builds the Formspree endpoint", () => {
    expect(formspreeAction("abcdxyz")).toBe("https://formspree.io/f/abcdxyz");
  });
});

describe("isHttpUrl", () => {
  it("accepts http(s) URLs", () => {
    expect(isHttpUrl("https://beispiel.lu")).toBe(true);
    expect(isHttpUrl("http://firma.lu/kontakt")).toBe(true);
  });

  it("rejects empty and non-http values", () => {
    expect(isHttpUrl("")).toBe(false);
    expect(isHttpUrl("beispiel.lu")).toBe(false);
    expect(isHttpUrl("javascript:alert(1)")).toBe(false);
  });
});
```

- [ ] **Step 2: Run tests — expect FAIL**

```bash
npm test
```

- [ ] **Step 3: Implement helpers and `site.ts`**

`src/lib/money.ts`:

```ts
const euro = new Intl.NumberFormat("de-LU", {
  maximumFractionDigits: 0,
});

export function formatEuro(amount: number): string {
  return `${euro.format(amount)} €`;
}

export function formatFromPrice(amount: number): string {
  return `ab ${formatEuro(amount)}`;
}

export function formatHostingMonthly(amount: number): string {
  return `Hosting ab ${formatEuro(amount)} / Monat`;
}
```

`src/lib/form.ts`:

```ts
export function formspreeAction(id: string | undefined): string | null {
  const trimmed = id?.trim();
  if (!trimmed) return null;
  return `https://formspree.io/f/${trimmed}`;
}

export function isHttpUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}
```

`src/content/site.ts` — see Appendix A (full file). Values must match the table in the design spec.

- [ ] **Step 4: Run tests — expect PASS**

```bash
npm test
```

- [ ] **Step 5: Commit**

```bash
git add src/content/site.ts src/lib
git commit -m "feat: add site content and price/form helpers"
```

---

### Task 3: Layout, tokens, Header, Footer

**Files:**
- Create: `src/styles/global.css`, `src/layouts/BaseLayout.astro`, `src/components/Header.astro`, `src/components/Footer.astro`, `src/components/CtaButton.astro`
- Modify: `src/pages/index.astro`

**Consumes:** `site` from `src/content/site.ts`

- [ ] Implement the visual system from the design spec (paper/ink/red tokens, Fraunces + Source Sans 3, skip link, sticky header with scroll-state, mobile `<details>` nav).
- [ ] Header nav uses `site.nav`. Footer lists email plus Impressum, Datenschutz, AGB.
- [ ] `html lang="de"`. Meta title/description from `site.meta`.
- [ ] Commit: `feat: add base layout with header and footer`

---

### Task 4: Hero and Kennzeichen

**Files:**
- Create: `src/components/sections/Hero.astro`, `src/components/sections/Kennzeichen.astro`
- Modify: `src/pages/index.astro`

- [ ] Hero: one `h1`, lead, CTAs to `#vorschau` and `#preise`, fact row (Luxemburg, `formatFromPrice(basic)`, 3 Werktage).
- [ ] Kennzeichen: four factual chips, no logos.
- [ ] Commit: `feat: add hero and trust chips`

---

### Task 5: Problem and Leistungen

**Files:**
- Create: `src/components/sections/Problem.astro`, `src/components/sections/Leistungen.astro`
- Modify: `src/pages/index.astro`

- [ ] Problem: three points from `site.problems`.
- [ ] Leistungen: four offers from `site.services`.
- [ ] Commit: `feat: add problem and services sections`

---

### Task 6: Redesign-Vorschau

**Files:**
- Create: `src/components/sections/Vorschau.astro`, `src/components/LeadForm.astro`
- Modify: `src/pages/index.astro`

- [ ] Section id `vorschau`. Copy includes **unverbindlich** and **keine Kaufverpflichtung**.
- [ ] Form variant `vorschau`: name, email, url; hidden `_subject`; honeypot; Formspree or mailto fallback.
- [ ] Mention 3 Werktage.
- [ ] Commit: `feat: add unverbindliche redesign preview form`

---

### Task 7: Preise

**Files:**
- Create: `src/components/PackageCard.astro`, `src/components/sections/Preise.astro`
- Modify: `src/pages/index.astro`

- [ ] Three cards from `site.packages`. Each shows `formatFromPrice(price)` and `formatHostingMonthly(site.hosting.monthlyEuro)` as a separate add-on row.
- [ ] Highlight `featured: true` (Pro).
- [ ] Scope footnote from `site.priceFootnote`.
- [ ] Commit: `feat: add package cards with hosting add-on`

---

### Task 8: Ablauf

**Files:**
- Create: `src/components/sections/Ablauf.astro`
- Modify: `src/pages/index.astro`

- [ ] Four numbered steps from `site.steps`. Step 2 states 3 Werktage.
- [ ] Commit: `feat: add process steps`

---

### Task 9: Über uns

**Files:**
- Create: `src/components/sections/Ueber.astro`
- Modify: `src/pages/index.astro`

- [ ] Short studio copy from `site.about`. No testimonials, no logos, no AI mentions.
- [ ] Commit: `feat: add about section`

---

### Task 10: FAQ and Kontakt

**Files:**
- Create: `src/components/sections/Faq.astro`, `src/components/sections/Kontakt.astro`
- Modify: `src/components/LeadForm.astro`, `src/pages/index.astro`

- [ ] FAQ: `<details>` from `site.faq`. One item restates unverbindlich / keine Kaufverpflichtung. Do not put headings inside `<summary>`.
- [ ] Kontakt form variant: name, email, tel optional, package select, message, privacy checkbox linking to `/datenschutz`.
- [ ] Commit: `feat: add FAQ and Formspree contact form`

---

### Task 11: Legal stubs

**Files:**
- Create: `src/pages/impressum.astro`, `src/pages/datenschutz.astro`, `src/pages/agb.astro`

- [ ] Same `BaseLayout`. No invented RCS/TVA. Email from `site.email`.
- [ ] Datenschutz names Formspree for form posts.
- [ ] AGB: hosting monthly add-on; Vorschau unverbindlich.
- [ ] Commit: `feat: add impressum, datenschutz, and agb stubs`

---

### Task 12: README, polish, verify

**Files:**
- Modify: `README.md`, any remaining copy/a11y polish

- [ ] README: German or bilingual-ok English for developers — `npm install`, `npm run dev`, `npm run build`, `npm test`, how to set `PUBLIC_FORMSPREE_ID` for letzdevelop.lu, where to edit prices (`src/content/site.ts`).
- [ ] Grep the built HTML: no “AI”, no “Generator”, no language switcher, all three prices, hosting line, unverbindlich, hello@letzdevelop.lu.
- [ ] `npm test` and `npm run build` must pass.
- [ ] Commit: `docs: document setup, Formspree, and content source`

---

## Appendix A — `src/content/site.ts`

```ts
export const site = {
  name: "LetzDevelop",
  domain: "letzdevelop.lu",
  url: "https://letzdevelop.lu",
  email: "hello@letzdevelop.lu",
  turnaroundDays: 3,
  hosting: {
    monthlyEuro: 29,
  },
  meta: {
    title: "LetzDevelop – Websites für Betriebe in Luxemburg",
    description:
      "Websites für Betriebe in Luxemburg. Klare Paketpreise ab 990 €, Hosting ab 29 € / Monat, unverbindliche Redesign-Vorschau in 3 Werktagen.",
  },
  nav: [
    { href: "/#leistungen", label: "Leistungen" },
    { href: "/#vorschau", label: "Vorschau" },
    { href: "/#preise", label: "Preise" },
    { href: "/#ablauf", label: "Ablauf" },
    { href: "/#kontakt", label: "Kontakt" },
  ],
  packages: [
    {
      id: "basic",
      name: "Basic",
      priceEuro: 990,
      featured: false,
      summary: "Eine starke Seite für den klaren Erstauftritt.",
      features: [
        "Eine Seite, mobil und schnell",
        "Impressum- und Kontaktbereich",
        "Grundlegende Suchmaschinen-Angaben",
      ],
    },
    {
      id: "pro",
      name: "Pro",
      priceEuro: 1890,
      featured: true,
      summary: "Mehrere Seiten, wenn Angebot und Betrieb mehr Raum brauchen.",
      features: [
        "Bis zu fünf Seiten",
        "Kontaktformular",
        "Struktur für Leistungen und Ablauf",
        "Startbereit für Hosting bei uns",
      ],
    },
    {
      id: "business",
      name: "Business",
      priceEuro: 3490,
      featured: false,
      summary: "Der umfangreichere Auftritt mit redaktionellem Spielraum.",
      features: [
        "Bis zu zehn Seiten",
        "Individuelle Struktur",
        "Erweiterte Formulare",
        "Begleitung bis zum Livegang",
      ],
    },
  ],
  priceFootnote:
    "Alle Paketpreise sind Startpreise (ab … €) und gelten zuzüglich MwSt., sofern ausgewiesen. Der genaue Umfang steht im schriftlichen Angebot. Hosting ist ein monatliches Zusatzmodul und nicht im einmaligen Paketpreis enthalten.",
  problems: [
    {
      title: "Die Seite öffnet sich schlecht auf dem Telefon",
      text: "Wer unterwegs sucht, bleibt nicht bei einer verkleinerten Desktop-Seite. Anrufe und Anfragen gehen an den Betrieb mit der klareren Seite.",
    },
    {
      title: "Adresse und Öffnungszeiten sind versteckt",
      text: "In Luxemburg suchen Menschen lokal. Wenn Kontakt, Ort und Leistung nicht sofort stehen, ist der nächste Anbieter einen Klick weiter.",
    },
    {
      title: "Ein Relaunch fühlt sich nach einem Großprojekt an",
      text: "Viele Betriebe schieben die Website Jahre vor sich her, weil Angebote unklar sind. Feste Pakete und eine unverbindliche Vorschau machen den ersten Schritt klein.",
    },
  ],
  services: [
    {
      title: "Neue Website",
      text: "Vom ersten Auftritt bis zur klaren Leistungsseite – in einem der drei Pakete.",
    },
    {
      title: "Relaunch",
      text: "Bestehende Adresse, neuer Auftritt. Inhalte sortieren, Technik auf heutigen Stand.",
    },
    {
      title: "Hosting und Betreuung",
      text: "Monatliches Hosting ab 29 €. Updates und Erreichbarkeit, ohne dass Sie einen Server pflegen.",
    },
    {
      title: "Formulare",
      text: "Anfragen landen bei Ihnen – Termine, Offerten, Kontakt. Kein unnötiger Ballast.",
    },
  ],
  steps: [
    {
      title: "Anfrage",
      text: "Sie schicken URL oder Kurzbeschreibung. Keine Vorbereitungsschleife, kein Briefing-Workshop.",
    },
    {
      title: "Unverbindliche Vorschau",
      text: "In 3 Werktagen erhalten Sie eine Redesign-Richtung. Unverbindlich – daraus folgt keine Kaufverpflichtung.",
    },
    {
      title: "Angebot",
      text: "Passt die Richtung, kommt ein schriftliches Angebot mit Paket, Umfang und optionalem Hosting.",
    },
    {
      title: "Livegang",
      text: "Umsetzung, Abstimmung, Veröffentlichung. Hosting können Sie monatlich dazubuchen.",
    },
  ],
  about: {
    title: "Ein Studio in Luxemburg, kein Konzernauftritt",
    text: "LetzDevelop baut Websites für Betriebe, die hier arbeiten: verständlich auf Deutsch, mit sichtbaren Preisen und kurzen Wegen. Wir versprechen keinen Medienzirkus und keine erfundenen Referenzen – sondern eine Seite, die man findet, versteht und anschreiben kann.",
  },
  faq: [
    {
      q: "Ist die Redesign-Vorschau wirklich unverbindlich?",
      a: "Ja. Die Vorschau ist unverbindlich. Nach der Prüfung besteht keine Kaufverpflichtung. Sie entscheiden erst nach dem schriftlichen Angebot.",
    },
    {
      q: "Was bedeutet „ab“ beim Preis?",
      a: "„Ab“ ist der Startpreis des Pakets. Der genaue Umfang (Seiten, Texte, Sonderwünsche) steht im Angebot. Hosting kommt als monatliches Modul dazu, wenn Sie es wollen.",
    },
    {
      q: "Ist Hosting Pflicht?",
      a: "Nein. Hosting ab 29 € / Monat ist ein Zusatzmodul auf jedem Paket. Sie können die fertige Seite auch anderweitig betreiben.",
    },
    {
      q: "Wie schnell geht die Vorschau?",
      a: "In der Regel in 3 Werktagen, nachdem URL und Kontakt bei uns angekommen sind.",
    },
    {
      q: "In welcher Sprache ist die Website?",
      a: "Diese Seite ist auf Deutsch. Ihre eigene Website sprechen wir im Angebot ab – der Inhalt folgt Ihrem Betrieb, nicht einer Sprachumschaltung auf unserer Seite.",
    },
    {
      q: "Wohin gehen die Formulardaten?",
      a: "An hello@letzdevelop.lu über Formspree. Einzelheiten stehen in der Datenschutzerklärung.",
    },
  ],
} as const;

export type PackageId = (typeof site.packages)[number]["id"];
```
