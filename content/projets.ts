// Projets et événements. Chaque projet a sa page : /projets/<slug>/
// Ajouter un projet = ajouter un objet à la liste (l'ordre de la liste est l'ordre d'affichage).
// Les tags présents sur au moins deux projets deviennent des filtres sur la page Projets.

export type Projet = {
  slug: string;
  titre: string;
  resume: string;
  sousTitre: string;
  statut: "en-cours" | "passe";
  annee: string;
  tags: string[];
  paragraphes: string[];
  liste?: { titre: string; items: string[] };
  infos: { label: string; valeur: string }[];
};

export const projets: Projet[] = [
  {
    slug: "tournoi-gaming",
    titre: "Tournoi Gaming",
    resume: "Des tournois de jeux vidéo ouverts à tous les étudiants du campus.",
    sousTitre: "Compétitions de jeux vidéo et événements gaming",
    statut: "en-cours",
    annee: "2024",
    tags: ["Gaming", "Événement", "Esport"],
    paragraphes: [
      "Les tournois gaming organisés par MINITEL rassemblent les passionnés de jeux vidéo du campus. On s'y affronte dans une ambiance conviviale, et c'est souvent l'occasion de découvrir de nouveaux jeux.",
    ],
    liste: {
      titre: "Jeux proposés",
      items: [
        "Mario Kart 8 Deluxe",
        "Super Smash Bros. Ultimate",
        "Rocket League",
        "Counter-Strike 2",
        "League of Legends",
      ],
    },
    infos: [
      { label: "Année", valeur: "2024" },
      { label: "Format", valeur: "Multi-jeux" },
      { label: "Type", valeur: "Compétition" },
    ],
  },
  {
    slug: "tibbar_20",
    titre: "TIBBAR des 20 ans",
    resume: "Le TIBBAR organisé pour les 20 ans de la COMIF, avec Switch et karaoké.",
    sousTitre: "TIBBAR organisé à l'occasion des 20 ans de la COMIF",
    statut: "en-cours",
    annee: "2024",
    tags: ["Événement", "Gaming", "Collaboration"],
    paragraphes: [
      "Le TIBBAR des 20 ans de la COMIF a été le plus gros événement de l'année sur le campus.",
      "MINITEL s'est joint à la COMIF pour ce MINIBAR géant en mettant à disposition de tous la Nintendo Switch avec Mario Kart, Super Smash Bros. et d'autres jeux, ainsi qu'un karaoké.",
      "Ce fut un réel honneur de participer aux côtés de la COMIF à un si bel événement et de proposer ces activités, qui ont toujours autant de succès.",
    ],
    infos: [
      { label: "Année", valeur: "2024" },
      { label: "Avec", valeur: "La COMIF" },
      { label: "Matériel", valeur: "Nintendo Switch, karaoké" },
    ],
  },
  {
    slug: "nuit-info",
    titre: "Nuit de l'Info",
    resume: "Le défi national où les étudiants développent un projet en une seule nuit.",
    sousTitre: "Événement de programmation et de développement",
    statut: "passe",
    annee: "2024",
    tags: ["Événement", "Hackathon", "Développement"],
    paragraphes: [
      "La Nuit de l'Info est un événement national de programmation qui rassemble des étudiants passionnés d'informatique. MINITEL l'organise sur le campus pour permettre aux élèves de relever le défi.",
    ],
    liste: {
      titre: "Déroulement",
      items: [
        "Challenge de programmation sur une nuit",
        "Équipes de 2 à 4 personnes",
        "Développement d'une application de A à Z",
        "Présentation des projets",
        "Récompenses pour les meilleurs projets",
      ],
    },
    infos: [
      { label: "Année", valeur: "2024" },
      { label: "Durée", valeur: "Une nuit" },
      { label: "Type", valeur: "Programmation" },
    ],
  },
  {
    slug: "formation-reseau",
    titre: "Formation Réseau",
    resume: "Des sessions pratiques pour apprendre les réseaux et la sécurité.",
    sousTitre: "Sessions de formation sur les réseaux et la sécurité",
    statut: "passe",
    annee: "2024",
    tags: ["Formation", "Réseau", "Sécurité"],
    paragraphes: [
      "Les formations réseau de MINITEL sont des sessions pratiques pour développer ses compétences en réseaux et en sécurité informatique. Elles sont ouvertes à tous les niveaux.",
    ],
    liste: {
      titre: "Au programme",
      items: [
        "Fondamentaux des réseaux",
        "Configuration de serveurs",
        "Sécurité des réseaux",
        "Protocoles de communication",
        "Outils de diagnostic",
      ],
    },
    infos: [
      { label: "Année", valeur: "2024" },
      { label: "Format", valeur: "Formation continue" },
      { label: "Approche", valeur: "Pratique" },
    ],
  },
  {
    slug: "workshop-docker",
    titre: "Workshop Docker",
    resume: "Un atelier pratique pour découvrir la conteneurisation avec Docker.",
    sousTitre: "Formation pratique à la conteneurisation",
    statut: "passe",
    annee: "2024",
    tags: ["Formation", "DevOps", "Docker"],
    paragraphes: [
      "Le workshop Docker est un atelier pratique pour découvrir et prendre en main la conteneurisation. Docker est aujourd'hui un outil standard pour déployer des applications.",
    ],
    liste: {
      titre: "Au programme",
      items: [
        "Introduction à la conteneurisation",
        "Installation et configuration de Docker",
        "Création et gestion de conteneurs",
        "Applications conteneurisées",
        "Orchestration avec Docker Compose",
        "Bonnes pratiques et sécurité",
      ],
    },
    infos: [
      { label: "Année", valeur: "2024" },
      { label: "Durée", valeur: "4 h" },
      { label: "Approche", valeur: "Pratique" },
    ],
  },
];

export function getProjet(slug: string) {
  return projets.find((p) => p.slug === slug);
}
