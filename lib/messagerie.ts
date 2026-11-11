// Le site est statique, sans base de données ni serveur : les formulaires
// préparent un email et l'ouvrent dans la messagerie de l'utilisateur.
// Pour brancher plus tard un vrai service d'envoi, c'est cette fonction qu'il faudra remplacer.

export type Message = { objet: string; corps: string };

export function ouvrirMessagerie(destinataire: string, { objet, corps }: Message) {
  window.location.href = `mailto:${destinataire}?subject=${encodeURIComponent(objet)}&body=${encodeURIComponent(corps)}`;
}

export const EMAIL_VALIDE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
