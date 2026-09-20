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
