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
      text: "Wer unterwegs sucht, bleibt nicht bei einer verkleinerten Desktop-Seite. Anfragen gehen an den Betrieb mit der klareren Seite.",
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
