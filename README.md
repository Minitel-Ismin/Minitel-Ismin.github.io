# Site de MINITEL

Site de l'association réseau de l'ISMIN, publié sur [minitel-ismin.github.io](https://minitel-ismin.github.io).

Fait avec [Next.js](https://nextjs.org) (export statique) et Tailwind CSS. Pas de serveur ni de base de données : `npm run build` produit un dossier `out/` de fichiers HTML, que GitHub Pages héberge tel quel.

## Lancer le site sur sa machine

Il faut [Node.js](https://nodejs.org) 20 ou plus récent.

```bash
npm install      # une seule fois
npm run dev      # http://localhost:3000, rechargement automatique
```

Pour voir le site exactement comme il sera publié :

```bash
npm run build    # génère out/
npm run preview  # sert out/ sur http://localhost:3000
```

## Modifier le contenu

Tout le contenu est dans `content/`. Pas besoin de toucher aux pages pour les mises à jour courantes.

| Je veux…                                   | Fichier                   |
| ------------------------------------------ | ------------------------- |
| Publier une actualité                      | `content/actualites.ts`   |
| Ajouter les vainqueurs d'une LAN           | `content/hall-of-fame.ts` |
| Passer au mandat suivant, changer un rôle  | `content/mandats.ts`      |
| Ajouter ou modifier un projet              | `content/projets.ts`      |
| Compléter la frise historique              | `content/historique.ts`   |
| Changer l'email, un lien, les onglets      | `content/site.ts`         |

- **Nouveau mandat** : copier le bloc du mandat actuel en haut de `mandats`, mettre `actuel: true` dessus et `actuel: false` sur l'ancien. L'accueil, Le bureau, Notre histoire et Réserver 1100 se mettent à jour seuls.
- **Actualité** : ajouter un objet à `actualites` (date au format `AAAA-MM-JJ`). Les trois plus récentes s'affichent aussi sur l'accueil.
- **Hall of fame** : après une LAN, ajouter les vainqueurs à `palmares` (un exemple est en commentaire dans le fichier). Le palmarès est trié par année automatiquement.
- **Nouveau projet** : ajouter un objet à `projets`. Sa page `/projets/<slug>/` est créée automatiquement. Un tag partagé par au moins deux projets devient un filtre sur la page Projets.
- **Images** : les déposer dans `public/img/` et les référencer par `/img/…`.

Avant de publier, `npm run lint` et `npm run build` doivent passer sans erreur.

## Organisation du code

```
app/          une page par dossier : actualites/, association/, histoire/, bureau/,
              projets/, reserver-1100/, contact/, hall-of-fame/
components/   en-tête, pied de page, cartes, formulaires…
content/      les données du site (voir ci-dessus)
lib/          dates en français, envoi des formulaires par messagerie
public/img/   logos et photos
scripts/      préversion locale et correctif d'export sous Windows
```

Le design repose sur quelques couleurs définies en haut de `app/globals.css` (fond sombre, vert phosphore `#69ff0a` de la charte).

## Publication

Le workflow `.github/workflows/deploy.yml` construit et publie le site à chaque push sur `main`.

**À faire une fois, avant le premier merge sur `main`** : un admin de l'organisation doit régler *Settings → Pages → Build and deployment → Source* sur **GitHub Actions**. Sans ça, GitHub Pages continuerait à servir la racine de la branche, qui ne contient plus de `index.html`, et le site serait cassé.

Les anciennes adresses en `.html` (`apropos.html`, `mandat.html`, `photo.html`…) redirigent automatiquement vers les nouvelles pages.

## Bon à savoir

- **Formulaires (contact, réservation de la 1100)** : pas de base de données ni de serveur. Le formulaire vérifie les champs, prépare le message et ouvre la messagerie de l'utilisateur, adressé à l'email de `content/site.ts`. Un bouton permet aussi de copier le message, pour ceux qui n'ont pas d'application mail. Pour brancher un vrai service d'envoi plus tard, tout passe par `lib/messagerie.ts`.
- **Build sous Windows** : `scripts/fix-windows-export.mjs` corrige automatiquement après chaque build un bug de Next 16 qui nomme mal certains fichiers sous Windows. Il ne fait rien sous Linux ou macOS.
