import Link from "next/link";
import type { Actualite } from "@/content/actualites";
import { formaterDate } from "@/lib/dates";
import styles from "./carte-console.module.css";

// Une actualité dans une fenêtre de terminal : le titre dans la barre, le texte en sortie console.
// Toute la carte est cliquable quand l'actu a un lien.
export function CarteConsole({ actu }: { actu: Actualite }) {
  const contenu = (
    <>
      <div className={styles.windowTitle}>
        <h2 className={styles.titre}>{actu.titre}</h2>
        <span className={styles.windowButtons} aria-hidden>
          <span className={`${styles.windowButton} ${styles.close}`} />
          <span className={`${styles.windowButton} ${styles.reduce}`} />
          <span className={`${styles.windowButton} ${styles.fullscreen}`} />
        </span>
      </div>
      <div className={styles.console}>
        <p className={styles.meta}>
          <time dateTime={actu.date}>{formaterDate(actu.date)}</time> · {actu.categorie}
        </p>
        {actu.paragraphes.map((p) => (
          <p key={p}>{p}</p>
        ))}
        {actu.lien && (
          <p className={styles.commande}>
            {actu.lien.label}
            <span className={styles.curseur} aria-hidden />
          </p>
        )}
      </div>
    </>
  );

  return actu.lien ? (
    <Link href={actu.lien.href} className={styles.window}>
      {contenu}
    </Link>
  ) : (
    <article className={styles.window}>{contenu}</article>
  );
}
