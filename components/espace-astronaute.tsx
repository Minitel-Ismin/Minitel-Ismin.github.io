import styles from "./espace-astronaute.module.css";

const POSITIONS = [1, 2, 3, 4, 5, 6, 7] as const;
const BOITES = [styles.etoiles1, styles.etoiles2, styles.etoiles3, styles.etoiles4];

// Animation décorative : un astronaute qui tourne sur lui-même dans une pluie d'étoiles.
export function EspaceAstronaute() {
  return (
    <div className={styles.ciel} aria-hidden>
      {BOITES.map((boite) => (
        <div key={boite} className={boite}>
          {POSITIONS.map((n) => (
            <div key={n} className={`${styles.etoile} ${styles[`position${n}`]}`} />
          ))}
        </div>
      ))}
      <div className={styles.astronaute}>
        <div className={styles.tete} />
        <div className={`${styles.bras} ${styles.brasGauche}`} />
        <div className={`${styles.bras} ${styles.brasDroit}`} />
        <div className={styles.corps}>
          <div className={styles.panneau} />
        </div>
        <div className={`${styles.jambe} ${styles.jambeGauche}`} />
        <div className={`${styles.jambe} ${styles.jambeDroite}`} />
        <div className={styles.sac} />
      </div>
    </div>
  );
}
