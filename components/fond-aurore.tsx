"use client";

import { useEffect, useRef } from "react";
import styles from "./fond-aurore.module.css";

// Part du viewport à faire défiler pour que l'aurore ait totalement disparu.
const DISTANCE_FONDU = 0.9;

// Fond décoratif : une aurore animée qui s'efface progressivement quand on fait défiler.
export function FondAurore() {
  const fond = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = fond.current;
    if (!el) return;
    let image = 0;
    const appliquer = () => {
      const opacite = Math.max(0, 1 - window.scrollY / (window.innerHeight * DISTANCE_FONDU));
      el.style.opacity = String(opacite);
      el.toggleAttribute("data-eteint", opacite === 0);
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

  return <div ref={fond} className={styles.fond} aria-hidden />;
}
