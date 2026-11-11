import styles from "./fond-pluie.module.css";

// Fond décoratif : une pluie de néons vue à travers une grille de points lumineux.
export function FondPluie() {
  return <div className={styles.fond} aria-hidden />;
}
