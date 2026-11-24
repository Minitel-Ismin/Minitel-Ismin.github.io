import styles from "./fond-pixels.module.css";

// Fond décoratif : un motif de pixels qui défile, balayé par une lumière verte, sous un voile sombre.
export function FondPixels() {
  return (
    <div className={styles.fond} aria-hidden>
      <div className={styles.voile} />
    </div>
  );
}
