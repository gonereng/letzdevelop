export type Vorhaben = "neu" | "redesign";

export interface FunnelAnswers {
  vorhaben: Vorhaben;
  website: string;
  branche: string;
  animation: string;
}

/**
 * Turns what people type into a URL ("meinbetrieb.lu", "www.firma.lu/kontakt")
 * into a full https URL. Returns "" for empty input and null when it cannot be a web address.
 */
export function normalizeWebsite(raw: string): string | null {
  const trimmed = raw.trim();
  if (!trimmed) return "";
  if (/\s/.test(trimmed)) return null;

  const withScheme = /^[a-z][a-z\d+.-]*:/i.test(trimmed) ? trimmed : `https://${trimmed}`;

  let url: URL;
  try {
    url = new URL(withScheme);
  } catch {
    return null;
  }

  if (url.protocol !== "https:" && url.protocol !== "http:") return null;
  const host = url.hostname;
  const labels = host.split(".");
  if (labels.length < 2 || labels.some((label) => !label) || labels.at(-1)!.length < 2) return null;

  return url.href.replace(/\/$/, "");
}

export function isVorhaben(value: string | null | undefined): value is Vorhaben {
  return value === "neu" || value === "redesign";
}

/** Subject line for the email LetzDevelop receives, so leads can be sorted at a glance. */
export function funnelSubject(answers: Pick<FunnelAnswers, "vorhaben" | "branche" | "animation">): string {
  const parts = [
    "Vorschau-Anfrage",
    answers.vorhaben === "redesign" ? "Redesign" : "Neu",
    answers.branche.trim(),
    answers.animation.trim(),
  ].filter(Boolean);
  return parts.join(" · ");
}
