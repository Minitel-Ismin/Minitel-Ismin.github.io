// Composition des mandats, du plus récent au plus ancien.
// Nouveau mandat : copier le bloc du mandat actuel en haut de la liste,
// passer `actuel: true` dessus et `actuel: false` sur l'ancien.

export type Membre = {
  prenom: string;
  nom: string;
  role: string;
  linkedin?: string;
};

export type Pole = {
  nom: string;
  membres: Membre[];
};

export type Mandat = {
  id: string;
  annees: string;
  actuel: boolean;
  poles: Pole[];
};

export const mandats: Mandat[] = [
  {
    id: "EI25",
    annees: "2026–2027",
    actuel: true,
    poles: [
      {
        nom: "Bureau",
        membres: [
          { prenom: "Clément", nom: "Greven", role: "Président" },
          { prenom: "Arthur", nom: "Rocaboy", role: "Vice-président" },
          { prenom: "Achille", nom: "Maily", role: "Trésorier" },
          { prenom: "Paolo", nom: "Bouchard", role: "Secrétaire général" },
          { prenom: "Arthur", nom: "Michaud", role: "Responsable technique" },
        ],
      },
      {
        nom: "Pôle Formation",
        membres: [
          { prenom: "Périne", nom: "Mbou", role: "Responsable formation" },
          { prenom: "Nour", nom: "Zenkri", role: "Chargé formation" },
        ],
      },
      {
        nom: "Pôle Tech",
        membres: [
          { prenom: "Edouard", nom: "Zinck", role: "Responsable site & VPN" },
          { prenom: "Jillian", nom: "Gartiser", role: "Responsable hardware" },
          { prenom: "Mathias", nom: "Bagal", role: "Responsable développement" },
        ],
      },
      {
        nom: "Pôle Cyber",
        membres: [
          { prenom: "Matko", nom: "Vijorovic", role: "Responsable cyber" },
          { prenom: "Yani", nom: "Bellal-Henot", role: "Responsable cyber" },
        ],
      },
      {
        nom: "Pôle Développement",
        membres: [
          { prenom: "Camille", nom: "Lemoine", role: "Responsable communication" },
          { prenom: "Thomas", nom: "Bellance", role: "Responsable partenariats" },
          { prenom: "Maëlys", nom: "Oster", role: "Responsable graphismes" },
        ],
      },
      {
        nom: "Pôle Event / Gaming",
        membres: [
          { prenom: "Théo", nom: "Barbier-Fradin", role: "Coordonnateur event / gaming" },
          { prenom: "Yann", nom: "Tchang", role: "Respo jeux mobiles" },
          { prenom: "Noa", nom: "Ledoux", role: "Respo tournois -1100" },
          { prenom: "Louis", nom: "Cormerais", role: "Respo 1100" },
          { prenom: "Adrien", nom: "Cuer", role: "Respo stream" },
          { prenom: "Mathias", nom: "Bagal", role: "Chargé stream" },
          { prenom: "Tom", nom: "Fromentin", role: "Chargé event" },
          { prenom: "Thomas", nom: "Bellance", role: "Chargé event" },
        ],
      },
    ],
  },
  {
    id: "EI24",
    annees: "2025–2026",
    actuel: false,
    poles: [
      {
        nom: "Bureau",
        membres: [
          {
            prenom: "Arthur",
            nom: "Doradoux",
            role: "Président",
            linkedin: "https://www.linkedin.com/in/arthur-doradoux",
          },
          { prenom: "Kian", nom: "Debeaud", role: "Vice-président" },
          { prenom: "Abdelmalek", nom: "Moussouni", role: "Secrétaire général" },
          { prenom: "Gabriel", nom: "Chatelain", role: "Trésorier" },
        ],
      },
      {
        nom: "Pôle Technique",
        membres: [
          { prenom: "Elouan", nom: "Marron", role: "Responsable réseau & serveur" },
          { prenom: "Matthieu", nom: "Zajac", role: "Responsable hardware" },
          { prenom: "Youssef", nom: "Zaimi", role: "Responsable site & VPN" },
          { prenom: "Vlad", nom: "Munteanu", role: "Responsable développement" },
        ],
      },
      {
        nom: "Pôle Event / Gaming",
        membres: [
          { prenom: "Yoann", nom: "Bosselut", role: "Responsable event / gaming" },
          { prenom: "Axel", nom: "Gannerie", role: "Chargé event" },
          { prenom: "Dimitri", nom: "Blanc", role: "Chargé event" },
          { prenom: "Zana", nom: "Coulibaly", role: "Responsable 1100 & GOTM" },
        ],
      },
      {
        nom: "Pôle Cyber",
        membres: [
          { prenom: "Matthieu", nom: "Lahurte", role: "Responsable cyber" },
          { prenom: "Mohamed", nom: "El Asraoui", role: "Chargé cyber" },
        ],
      },
      {
        nom: "Pôle Formation",
        membres: [
          { prenom: "Vlad", nom: "Munteanu", role: "Responsable formation" },
          { prenom: "Mohamed Yassir", nom: "Igouzoulene", role: "Chargé formation" },
        ],
      },
      {
        nom: "Pôle Communication",
        membres: [{ prenom: "Ines", nom: "Lixi", role: "Responsable communication" }],
      },
    ],
  },
];

export const mandatActuel = mandats.find((m) => m.actuel) ?? mandats[0];
