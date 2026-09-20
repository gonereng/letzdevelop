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
