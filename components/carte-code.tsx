import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import type { Projet } from "@/content/projets";
import styles from "./carte-code.module.css";

// "tournoi-gaming" → "tournoiGaming", pour le nom de la variable affichée.
function enCamelCase(slug: string) {
  return slug.replace(/[-_](.)/g, (_, c: string) => c.toUpperCase());
}

// Réduire, agrandir, fermer : purement décoratifs.
function BoutonsFenetre() {
  return (
    <span className={styles.boutons} aria-hidden>
      <span className={styles.bouton}>
        <svg viewBox="0 0 10.2 1">
          <rect width="10.2" height="1" />
        </svg>
      </span>
      <span className={styles.bouton}>
        <svg viewBox="0 0 10 10">
          <path d="M0 0v10h10V0H0zm1 1h8v8H1V1z" />
        </svg>
      </span>
      <span className={styles.bouton}>
        <svg viewBox="0 0 10.2 10.2">
          <polygon points="10.2,0.7 9.5,0 5.1,4.4 0.7,0 0,0.7 4.4,5.1 0,9.5 0.7,10.2 5.1,5.8 9.5,10.2 10.2,9.5 5.8,5.1" />
        </svg>
      </span>
    </span>
  );
}

function Fenetre({
  href,
  fichier,
  etat,
  action,
  children,
}: {
  href: string;
  fichier: string;
  etat: React.ReactNode;
  action: string;
  children: React.ReactNode;
}) {
  return (
    <Link href={href} className={styles.fenetre}>
      <div className={styles.barre}>
        <span className={styles.fichier}>{fichier}</span>
        <BoutonsFenetre />
      </div>
      {children}
      <div className={styles.etat}>
        {etat}
        <span className={styles.ouvrir}>
          {action}
          <ArrowRightIcon aria-hidden size={12} weight="bold" />
        </span>
      </div>
    </Link>
  );
}

// Un événement présenté comme un objet JS : le nom en grand, le reste en code.
export function CarteCode({ projet }: { projet: Projet }) {
  return (
    <Fenetre
      href={`/projets/${projet.slug}/`}
      fichier={`${projet.slug}.js`}
      etat={
        projet.statut === "en-cours" ? (
          <span className={styles.enCours}>en cours</span>
        ) : (
          <span>terminé · {projet.annee}</span>
        )
      }
      action="ouvrir"
    >
      <ol className={styles.code}>
        <li>
          <span>
            <span className={styles.c1}>const</span> <span className={styles.c2}>{enCamelCase(projet.slug)}</span>{" "}
            = {"{"}
          </span>
        </li>
        <li>
          <span className={styles.retrait}>
            <span className={styles.c2}>nom</span>: <span className={styles.c3} aria-hidden>&quot;</span>
            <h3 className={styles.titre}>{projet.titre}</h3>
            <span className={styles.c3} aria-hidden>&quot;</span>,
          </span>
        </li>
        <li>
          <span className={styles.retrait}>
            <span className={styles.c2}>quoi</span>: <span className={styles.c3}>&quot;{projet.resume}&quot;</span>,
          </span>
        </li>
        <li>
          <span className={styles.retrait}>
            <span className={styles.c2}>tags</span>: [
            {projet.tags.map((tag, i) => (
              <span key={tag}>
                <span className={styles.c3}>&quot;{tag}&quot;</span>
                {i < projet.tags.length - 1 && ", "}
              </span>
            ))}
            ],
          </span>
        </li>
        <li>
          <span>{"};"}</span>
        </li>
      </ol>
    </Fenetre>
  );
}

// La carte « tous les projets » : un terminal qui liste le dossier.
export function CarteTerminal({ projets }: { projets: Projet[] }) {
  return (
    <Fenetre
      href="/projets/"
      fichier="~/minitel/projets"
      etat={<span>{projets.length} projets</span>}
      action="tout voir"
    >
      <ol className={`${styles.code} ${styles.terminal}`}>
        <li>
          <span className={styles.invite}>$ </span>ls projets/
        </li>
        {projets.map((p) => (
          <li key={p.slug} className={styles.c2}>
            {p.slug}.js
          </li>
        ))}
        <li className="mt-3">
          <span className={styles.invite}>$ </span>
          <span className={styles.titre}>Voir tous les projets</span>
          <span className={styles.curseur} aria-hidden />
        </li>
      </ol>
    </Fenetre>
  );
}
