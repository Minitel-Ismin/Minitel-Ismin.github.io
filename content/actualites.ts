// Actualités de l'association, affichées de la plus récente à la plus ancienne
// sur /actualites/ (et les trois dernières sur l'accueil).
// Ajouter une actu = ajouter un objet à la liste, peu importe l'ordre.

export type Actualite = {
  date: string; // AAAA-MM-JJ
  titre: string;
  categorie: "Association" | "Événement" | "LAN" | "Formation" | "Réseau";
  paragraphes: string[];
  lien?: { href: string; label: string };
};

export const actualites: Actualite[] = [
  {
    date: "2026-09-16",
    titre: "Le mandat EI25 prend le relais",
    categorie: "Association",
    paragraphes: [
      "Le mandat EI25 reprend l'association pour l'année 2026–2027 : 21 membres répartis en 6 pôles, du réseau au gaming en passant par la cyber.",
    ],
    lien: { href: "/bureau/", label: "Découvrir l'équipe" },
  },
];

export const actualitesTriees = [...actualites].sort((a, b) => b.date.localeCompare(a.date));
