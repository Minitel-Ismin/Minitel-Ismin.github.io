"use client";

import { useEffect } from "react";

// L'ancien site utilisait des URL en .html (apropos.html, projets/nuit-info.html…).
// GitHub Pages renvoie la page 404 pour ces adresses : on redirige vers la nouvelle page.
const ANCIENNES_PAGES: Record<string, string> = {
  "/index.html": "/",
  "/apropos.html": "/association/",
  "/mandat.html": "/bureau/",
  "/projets.html": "/projets/",
  "/frise.html": "/histoire/",
  "/contact.html": "/contact/",
  "/photo.html": "/hall-of-fame/",
};

export function LegacyRedirect() {
  useEffect(() => {
    const chemin = window.location.pathname;
    const projet = chemin.match(/^\/projets\/([\w-]+)\.html$/);
    const cible = ANCIENNES_PAGES[chemin] ?? (projet ? `/projets/${projet[1]}/` : null);
    if (cible) window.location.replace(cible);
  }, []);

  return null;
}
