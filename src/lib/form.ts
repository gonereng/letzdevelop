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
