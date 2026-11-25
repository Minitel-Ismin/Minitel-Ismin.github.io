// Sommaire du wiki. Chaque page correspond au fichier Markdown
// `content/wiki/<section>/<page>.md`. Nouvelle page : créer le fichier
// puis l'ajouter ici, à la place voulue dans sa section.
//
// Dans le Markdown, le titre de la page vient d'ici (pas de `# Titre` dans le fichier).
// Onglets (ex. Windows / Linux) : même syntaxe que l'ancien wiki Hugo :
//   {{< tabs >}}
//   {{< tab "Windows" >}} ...contenu... {{< /tab >}}
//   {{< tab "Linux" >}} ...contenu... {{< /tab >}}
//   {{< /tabs >}}

export type PageWiki = {
  slug: string;
  titre: string;
  resume: string;
};

export type SectionWiki = {
  slug: string;
  titre: string;
  pages: PageWiki[];
};

export const sectionsWiki: SectionWiki[] = [
  {
    slug: "association",
    titre: "L'association",
    pages: [
      {
        slug: "statuts",
        titre: "Statuts",
        resume: "Les statuts de l'association MINITEL.",
      },
      {
        slug: "reglement-interieur",
        titre: "Règlement intérieur",
        resume: "Le règlement intérieur de l'association MINITEL.",
      },
    ],
  },
  {
    slug: "ecole",
    titre: "Pour l'école",
    pages: [
      {
        slug: "logiciels",
        titre: "Logiciels recommandés",
        resume: "Notre sélection de logiciels pour Windows, Linux et macOS.",
      },
      {
        slug: "mail",
        titre: "Clients mail",
        resume: "Les paramètres pour lire ses mails école dans Thunderbird, Outlook ou sur son téléphone.",
      },
      {
        slug: "agenda",
        titre: "Agenda sur téléphone",
        resume: "Avoir l'emploi du temps de l'école dans Google Agenda et sur son téléphone.",
      },
    ],
  },
  {
    slug: "materiel",
    titre: "Utilisation du matériel",
    pages: [
      {
        slug: "machine-virtuelle",
        titre: "Machine virtuelle",
        resume: "Importer et configurer une machine virtuelle dans VirtualBox.",
      },
      {
        slug: "imprimantes",
        titre: "Imprimantes",
        resume: "Installer les imprimantes de l'école, récupérer son code PUK et imprimer.",
      },
      {
        slug: "lecteurs-reseau",
        titre: "Lecteurs réseau",
        resume: "Ajouter durablement les lecteurs réseau de l'école sur sa machine.",
      },
      {
        slug: "seafile",
        titre: "Seafile",
        resume: "Utiliser le cloud de l'école : synchronisation, partage, groupes et historique.",
      },
      {
        slug: "eduroam",
        titre: "Eduroam",
        resume: "Se connecter au wifi eduroam, à l'école comme à la résidence.",
      },
    ],
  },
  {
    slug: "autres",
    titre: "Autres",
    pages: [
      {
        slug: "mailing-list",
        titre: "Mailing list",
        resume: "Créer une liste de diffusion entre adresses de l'école avec Sympa.",
      },
      {
        slug: "vpn-ecole",
        titre: "VPN de l'école",
        resume: "Accéder aux serveurs de licences et aux lecteurs réseau depuis l'extérieur.",
      },
    ],
  },
  {
    slug: "loisirs",
    titre: "Loisirs",
    pages: [
      {
        slug: "chroot-debian",
        titre: "Chroot Debian",
        resume: "Donner un accès SFTP cloisonné à un utilisateur sur un serveur Debian.",
      },
      {
        slug: "openvpn",
        titre: "OpenVPN",
        resume: "Monter son propre VPN avec OpenVPN sur un serveur Debian.",
      },
    ],
  },
];

/** Toutes les pages, dans l'ordre du sommaire, avec leur section. */
export const pagesWiki = sectionsWiki.flatMap((section) =>
  section.pages.map((page) => ({ ...page, section })),
);

export type EntreeWiki = (typeof pagesWiki)[number];

export function cheminWiki(section: string, page: string) {
  return `/wiki/${section}/${page}/`;
}

export function getPageWiki(section: string, page: string) {
  return pagesWiki.find((p) => p.section.slug === section && p.slug === page);
}
