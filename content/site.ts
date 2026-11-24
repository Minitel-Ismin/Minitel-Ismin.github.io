// Informations générales de l'association, utilisées sur tout le site.
// Pour changer l'email, un lien ou une mission : c'est ici, et nulle part ailleurs.

export const site = {
  nom: "MINITEL",
  accroche: "Association réseau de l'ISMIN",
  description:
    "MINITEL est l'association réseau de l'École des Mines de Saint-Étienne sur le campus Georges Charpak, à Gardanne.",
  url: "https://minitel-ismin.github.io",
  fondation: 2015,
  email: "minitel13120@gmail.com",
  adresse: {
    lignes: ["Hébergement Georges Charpak Provence", "879 avenue de Mimet", "13120 Gardanne"],
  },
  liens: {
    wiki: "https://minitel.emse.fr/wiki/",
    servicesNumeriques: "https://services-numeriques.emse.fr/minitel/",
    myIsmin: "https://myismin.emse.fr/",
    instagram: "https://www.instagram.com/minitel.ismin/",
    linkedin: "https://www.linkedin.com/company/association-minitel/",
  },
} as const;

export const navigation = [
  { href: "/", label: "Accueil" },
  { href: "/actualites/", label: "Actualités" },
  { href: "/association/", label: "L'association" },
  { href: "/histoire/", label: "Notre histoire" },
  { href: "/bureau/", label: "Le bureau" },
  { href: "/projets/", label: "Nos projets" },
  { href: "/reserver-1100/", label: "Réserver 1100" },
  { href: "/contact/", label: "Nous contacter" },
  { href: "/hall-of-fame/", label: "Hall of fame" },
] as const;

export const missions = [
  {
    titre: "Internet à la résidence",
    texte: "Maintenir l'accès à internet depuis la résidence, en filaire comme en wifi.",
  },
  {
    titre: "Un réseau qui tient",
    texte: "Optimiser le débit et la fiabilité de la connexion, année après année.",
  },
  {
    titre: "Support informatique",
    texte: "Aider les élèves sur leurs problèmes d'ordinateur, de téléphone ou de logiciel.",
  },
  {
    titre: "Appui aux associations",
    texte: "Accompagner techniquement les autres associations dans leurs projets informatiques.",
  },
  {
    titre: "Vie du campus",
    texte: "Animer des challenges informatiques comme la Nuit de l'Info, des LAN et des tournois.",
  },
  {
    titre: "Prêt de matériel",
    texte: "Prêter du matériel informatique aux élèves et aux associations.",
  },
] as const;
