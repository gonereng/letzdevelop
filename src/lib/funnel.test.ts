import { describe, expect, it } from "vitest";
import { funnelSubject, isVorhaben, normalizeWebsite } from "./funnel";

describe("normalizeWebsite", () => {
  it("returns an empty string for empty input", () => {
    expect(normalizeWebsite("")).toBe("");
    expect(normalizeWebsite("   ")).toBe("");
  });

  it("adds https when the scheme is missing", () => {
    expect(normalizeWebsite("meinbetrieb.lu")).toBe("https://meinbetrieb.lu");
    expect(normalizeWebsite(" www.firma.lu/kontakt ")).toBe("https://www.firma.lu/kontakt");
  });

  it("keeps an existing http(s) scheme", () => {
    expect(normalizeWebsite("http://firma.lu")).toBe("http://firma.lu");
    expect(normalizeWebsite("https://firma.lu/")).toBe("https://firma.lu");
  });

  it("rejects values that are not web addresses", () => {
    expect(normalizeWebsite("meinbetrieb")).toBeNull();
    expect(normalizeWebsite("mein betrieb.lu")).toBeNull();
    expect(normalizeWebsite("javascript:alert(1)")).toBeNull();
    expect(normalizeWebsite("mailto:hallo@firma.lu")).toBeNull();
    expect(normalizeWebsite("firma.l")).toBeNull();
  });
});

describe("isVorhaben", () => {
  it("accepts only the two known values", () => {
    expect(isVorhaben("neu")).toBe(true);
    expect(isVorhaben("redesign")).toBe(true);
    expect(isVorhaben("relaunch")).toBe(false);
    expect(isVorhaben(null)).toBe(false);
  });
});

describe("funnelSubject", () => {
  it("joins the answers into a sortable subject", () => {
    expect(funnelSubject({ vorhaben: "redesign", branche: "Handwerk", animation: "Dezent" })).toBe(
      "Vorschau-Anfrage · Redesign · Handwerk · Dezent",
    );
  });

  it("skips empty parts", () => {
    expect(funnelSubject({ vorhaben: "neu", branche: " ", animation: "Keine" })).toBe(
      "Vorschau-Anfrage · Neu · Keine",
    );
  });
});
