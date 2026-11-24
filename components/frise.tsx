"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./frise.module.css";

// Ligne de lecture : une étape s'anime quand son haut passe aux trois quarts de l'écran,
// au moment où le fil lumineux l'atteint.
const LIGNE_DE_LECTURE = 0.75;

// Étape de la frise : marquée `data-visible` la première fois qu'elle entre dans l'écran.
// Les animations elles-mêmes sont en CSS (frise.module.css).
export function EtapeFrise({ className, children }: { className?: string; children: React.ReactNode }) {
  const ref = useRef<HTMLLIElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observateur = new IntersectionObserver(
      ([entree]) => {
        if (entree.isIntersecting) {
          setVisible(true);
          observateur.disconnect();
        }
      },
      { rootMargin: `0px 0px -${Math.round((1 - LIGNE_DE_LECTURE) * 100)}% 0px` },
    );
    observateur.observe(el);
    return () => observateur.disconnect();
  }, []);

  return (
    <li ref={ref} className={`${styles.etape} ${className ?? ""}`} data-visible={visible || undefined}>
      {children}
    </li>
  );
}

// Fil de la frise : se remplit de vert à mesure qu'on descend dans la liste parente.
export function FilFrise() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fil = ref.current;
    const frise = fil?.parentElement;
    if (!fil || !frise) return;
    let image = 0;
    const appliquer = () => {
      const { top, height } = frise.getBoundingClientRect();
      const progression = Math.min(1, Math.max(0, (window.innerHeight * LIGNE_DE_LECTURE - top) / height));
      fil.style.setProperty("--progression", progression.toFixed(4));
    };
    const surDefilement = () => {
      cancelAnimationFrame(image);
      image = requestAnimationFrame(appliquer);
    };
    appliquer();
    window.addEventListener("scroll", surDefilement, { passive: true });
    window.addEventListener("resize", surDefilement);
    return () => {
      cancelAnimationFrame(image);
      window.removeEventListener("scroll", surDefilement);
      window.removeEventListener("resize", surDefilement);
    };
  }, []);

  return (
    <div ref={ref} className={styles.fil} aria-hidden>
      <div className={styles.piste} />
      <div className={styles.remplissage} />
    </div>
  );
}
