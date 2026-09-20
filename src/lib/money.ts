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
