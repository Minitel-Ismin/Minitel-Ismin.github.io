import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Site 100 % statique : `npm run build` génère le dossier `out/`,
  // hébergeable tel quel sur GitHub Pages.
  output: "export",
  // Chaque page devient `dossier/index.html` (`/projets/` au lieu de `/projets.html`),
  // ce qui évite les conflits page/dossier sur GitHub Pages.
  trailingSlash: true,
  // L'optimisation d'images de Next nécessite un serveur : désactivée en export statique.
  images: { unoptimized: true },
};

export default nextConfig;
