// Frise historique, du mandat le plus récent au plus ancien.
// `photo` est optionnelle : un chemin dans /public (ex. "/img/frise/ei18.png").

export type Etape = {
  mandat: string;
  annees: string;
  faits?: string[];
  photo?: { src: string; alt: string };
};

export const historique: Etape[] = [
  {
    mandat: "EI24",
    annees: "2025–2026",
  },
  {
    mandat: "EI23",
    annees: "2024–2025",
    faits: ["Organisation de 2 LAN League of Legends", "Rénovation de la 1100", "Formations"],
  },
  {
    mandat: "EI22",
    annees: "2023–2024",
  },
  {
    mandat: "EI21",
    annees: "2022–2023",
    faits: [
      "Home cinéma pour la 1100",
      "Participation à des hackathons",
      "Projet Nextcloud associatif",
    ],
  },
  {
    mandat: "EI20",
    annees: "2021–2022",
  },
  {
    mandat: "EI19",
    annees: "2020–2021",
  },
  {
    mandat: "EI18",
    annees: "2019–2020",
    faits: [
      "Création de la 1100",
      "Découpage de l'association en pôles",
      "Première install party en SV",
      "Partenariat avec LDLC",
    ],
    photo: { src: "/img/frise/ei18.png", alt: "Photo de groupe du mandat EI18 devant le campus" },
  },
  {
    mandat: "EI17",
    annees: "2018–2019",
    photo: { src: "/img/frise/ei17.png", alt: "Quatre membres du mandat EI17 assis sur un muret du campus" },
  },
];
