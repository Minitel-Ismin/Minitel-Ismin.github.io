// Rendu des pages du wiki : Markdown (content/wiki) → HTML, au moment du build.
// Tout se passe côté serveur : aucune bibliothèque Markdown n'est envoyée au navigateur.

import fs from "node:fs";
import path from "node:path";
import { Marked } from "marked";
import { getPageWiki } from "@/content/wiki";

const DOSSIER_WIKI = path.join(process.cwd(), "content", "wiki");
const DOSSIER_PUBLIC = path.join(process.cwd(), "public");

// Syntaxe des onglets reprise de l'ancien wiki Hugo (thème hugo-book).
const RE_ONGLETS = /\{\{<\s*tabs\b[^>]*>\}\}([\s\S]*?)\{\{<\s*\/tabs\s*>\}\}/g;
const RE_ONGLET = /\{\{<\s*tab\s+"([^"]*)"\s*>\}\}([\s\S]*?)\{\{<\s*\/tab\s*>\}\}/g;

export type TitreWiki = { id: string; texte: string };

function echapper(texte: string) {
  return texte
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function decoderEntites(texte: string) {
  return texte
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&quot;", '"')
    .replaceAll("&#39;", "'")
    .replaceAll("&amp;", "&");
}

function slugifier(texte: string) {
  return (
    texte
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "section"
  );
}

/** Largeur et hauteur d'un PNG (lues dans l'en-tête), pour éviter les sauts de mise en page. */
function dimensionsImage(fichier: string) {
  const octets = fs.readFileSync(fichier);
  const estPng = octets.length >= 24 && octets.readUInt32BE(0) === 0x89504e47;
  return estPng ? { largeur: octets.readUInt32BE(16), hauteur: octets.readUInt32BE(20) } : null;
}

function verifierLienInterne(href: string, source: string) {
  const [chemin] = href.split("#");
  const morceaux = chemin.match(/^\/wiki\/([^/]+)\/([^/]+)\/?$/);
  if (chemin.startsWith("/wiki/") && (!morceaux || !getPageWiki(morceaux[1], morceaux[2]))) {
    throw new Error(`Wiki (${source}) : lien vers une page qui n'existe pas : ${href}`);
  }
}

/**
 * Un analyseur Markdown par page : les identifiants de titres restent uniques sur toute la page
 * (onglets compris), et seuls les titres hors onglets alimentent le sommaire « Sur cette page ».
 */
function creerAnalyseur(source: string, ids: Map<string, number>, sommaire: TitreWiki[] | null) {
  const analyseur = new Marked({ gfm: true, async: false });
  analyseur.use({
    renderer: {
      heading({ tokens, depth }) {
        const html = this.parser.parseInline(tokens);
        const texte = decoderEntites(this.parser.parseInline(tokens, this.parser.textRenderer));
        const base = slugifier(texte);
        const n = ids.get(base) ?? 0;
        ids.set(base, n + 1);
        const id = n === 0 ? base : `${base}-${n + 1}`;
        if (sommaire && depth === 2) sommaire.push({ id, texte });
        return `<h${depth} id="${id}">${html}</h${depth}>\n`;
      },
      link({ href, title, tokens }) {
        const html = this.parser.parseInline(tokens);
        verifierLienInterne(href, source);
        const externe = /^https?:\/\//.test(href);
        const attributs = [
          `href="${echapper(href)}"`,
          title ? `title="${echapper(title)}"` : "",
          externe ? 'target="_blank" rel="noopener"' : "",
        ];
        return `<a ${attributs.filter(Boolean).join(" ")}>${html}</a>`;
      },
      image({ href, title, text }) {
        if (!text.trim()) {
          throw new Error(`Wiki (${source}) : image sans texte alternatif : ${href}`);
        }
        let dimensions = "";
        if (href.startsWith("/")) {
          const fichier = path.join(DOSSIER_PUBLIC, href);
          if (!fs.existsSync(fichier)) {
            throw new Error(`Wiki (${source}) : image introuvable dans public/ : ${href}`);
          }
          const d = dimensionsImage(fichier);
          if (d) dimensions = ` width="${d.largeur}" height="${d.hauteur}"`;
        }
        const titre = title ? ` title="${echapper(title)}"` : "";
        return `<img src="${echapper(href)}" alt="${echapper(text)}"${titre}${dimensions} loading="lazy" decoding="async">`;
      },
    },
  });
  return analyseur;
}

function rendreOnglets(contenu: string, nom: string, analyseur: Marked, source: string) {
  const onglets = [...contenu.matchAll(RE_ONGLET)];
  if (onglets.length === 0) {
    throw new Error(`Wiki (${source}) : bloc {{< tabs >}} sans aucun {{< tab "…" >}}`);
  }
  // Onglets sans JavaScript : un bouton radio par onglet, le panneau qui suit le bouton coché
  // s'affiche (voir .wiki-onglets dans globals.css). Flèches du clavier pour changer d'onglet.
  const html = onglets
    .map(([, titre, corps], i) => {
      const id = `${nom}-${i + 1}`;
      return [
        `<input type="radio" name="${nom}" id="${id}" class="wiki-onglets__choix"${i === 0 ? " checked" : ""}>`,
        `<label for="${id}" class="wiki-onglets__nom">${echapper(titre.trim())}</label>`,
        `<div class="wiki-onglets__panneau">${analyseur.parse(corps) as string}</div>`,
      ].join("");
    })
    .join("");
  return `<div class="wiki-onglets">${html}</div>\n`;
}

export function rendrePageWiki(section: string, page: string) {
  const source = `${section}/${page}.md`;
  const markdown = fs.readFileSync(path.join(DOSSIER_WIKI, section, `${page}.md`), "utf8");

  const ids = new Map<string, number>();
  const sommaire: TitreWiki[] = [];
  const principal = creerAnalyseur(source, ids, sommaire);
  const dansOnglets = creerAnalyseur(source, ids, null);

  let html = "";
  let curseur = 0;
  let numero = 0;
  for (const bloc of markdown.matchAll(RE_ONGLETS)) {
    html += principal.parse(markdown.slice(curseur, bloc.index)) as string;
    html += rendreOnglets(bloc[1], `onglets-${++numero}`, dansOnglets, source);
    curseur = bloc.index + bloc[0].length;
  }
  html += principal.parse(markdown.slice(curseur)) as string;

  return { html, sommaire };
}
