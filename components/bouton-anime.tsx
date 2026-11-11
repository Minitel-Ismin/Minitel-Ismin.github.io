import Link from "next/link";
import styles from "./bouton-anime.module.css";

function Fleche({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
    </svg>
  );
}

// Lien d'appel à l'action : au survol, la flèche traverse le bouton et un cercle le remplit.
export function BoutonAnime({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className={styles.bouton}>
      <Fleche className={styles.flecheEntree} />
      <span className={styles.texte}>{children}</span>
      <span aria-hidden className={styles.cercle} />
      <Fleche className={styles.flecheSortie} />
    </Link>
  );
}
