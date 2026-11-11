// Sert le dossier `out/` (après `npm run build`) comme le ferait GitHub Pages :
// fichier exact, sinon dossier/index.html, sinon la page 404.
import fs from "node:fs";
import http from "node:http";
import path from "node:path";

const racine = path.resolve("out");
const port = Number(process.env.PORT ?? 3000);
const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".css": "text/css",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".woff2": "font/woff2",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml",
};

if (!fs.existsSync(racine)) {
  console.error("Dossier out/ introuvable : lance d'abord `npm run build`.");
  process.exit(1);
}

http
  .createServer((req, res) => {
    const url = decodeURIComponent(new URL(req.url ?? "/", "http://localhost").pathname);
    const cible = path.join(racine, url);
    if (!cible.startsWith(racine)) {
      res.writeHead(403).end();
      return;
    }
    for (const fichier of [cible, path.join(cible, "index.html")]) {
      if (fs.existsSync(fichier) && fs.statSync(fichier).isFile()) {
        if (fichier.endsWith("index.html") && fichier !== cible && !url.endsWith("/")) {
          res.writeHead(301, { Location: `${url}/` }).end();
          return;
        }
        res.writeHead(200, { "Content-Type": types[path.extname(fichier)] ?? "application/octet-stream" });
        fs.createReadStream(fichier).pipe(res);
        return;
      }
    }
    res.writeHead(404, { "Content-Type": types[".html"] });
    fs.createReadStream(path.join(racine, "404.html")).pipe(res);
  })
  .listen(port, () => console.log(`Site exporté visible sur http://localhost:${port}`));
