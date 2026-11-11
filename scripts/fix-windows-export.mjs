// Contournement d'un bug de Next 16 sous Windows : lors de l'export statique, les fichiers
// de préchargement `__next.<segment>.<...>.txt` sont écrits dans des sous-dossiers
// (`__next.apropos/__PAGE__.txt`) au lieu d'un seul nom de fichier avec des points
// (`__next.apropos.__PAGE__.txt`), car les `\` du chemin Windows ne sont pas convertis.
// Le navigateur ne trouve alors pas ces fichiers (404 en console, navigation plus lente).
// Sous Linux/macOS, l'export est correct et ce script ne fait rien.
import fs from "node:fs";
import path from "node:path";

if (process.platform !== "win32") process.exit(0);

const out = path.resolve("out");
let corriges = 0;

function fichiers(dossier) {
  return fs.readdirSync(dossier, { withFileTypes: true }).flatMap((e) => {
    const chemin = path.join(dossier, e.name);
    return e.isDirectory() ? fichiers(chemin) : [chemin];
  });
}

function parcourir(dossier) {
  for (const entree of fs.readdirSync(dossier, { withFileTypes: true })) {
    if (!entree.isDirectory()) continue;
    const chemin = path.join(dossier, entree.name);
    if (entree.name.startsWith("__next.")) {
      for (const fichier of fichiers(chemin)) {
        const relatif = path.relative(chemin, fichier).split(path.sep).join(".");
        fs.renameSync(fichier, path.join(dossier, `${entree.name}.${relatif}`));
        corriges += 1;
      }
      fs.rmSync(chemin, { recursive: true });
    } else {
      parcourir(chemin);
    }
  }
}

if (fs.existsSync(out)) {
  parcourir(out);
  console.log(`fix-windows-export : ${corriges} fichier(s) de préchargement renommé(s).`);
}
