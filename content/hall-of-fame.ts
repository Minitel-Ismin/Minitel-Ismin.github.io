// Palmarès des LAN et tournois organisés par MINITEL.
// Après chaque LAN, ajouter les vainqueurs ici, par exemple :
//
//   {
//     date: "2026-11-21",
//     evenement: "LAN League of Legends",
//     jeu: "League of Legends",
//     equipe: "Nom de l'équipe",
//     joueurs: ["Prénom Nom", "Prénom Nom", "Prénom Nom", "Prénom Nom", "Prénom Nom"],
//   },
//
// `equipe` est facultatif (tournoi en solo : un seul joueur, pas d'équipe).

export type Victoire = {
  date: string; // AAAA-MM-JJ
  evenement: string;
  jeu: string;
  equipe?: string;
  joueurs: string[];
};

export const palmares: Victoire[] = [];
