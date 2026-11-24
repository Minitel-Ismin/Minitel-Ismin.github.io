"use client";

import type { Application } from "@splinetool/runtime";
import dynamic from "next/dynamic";
import { Component, useState } from "react";
import { preload } from "react-dom";
import styles from "./fond-spline.module.css";

// Le runtime Spline (WebGL) ne sert à rien au rendu statique : chargé côté client uniquement.
const Spline = dynamic(() => import("@splinetool/react-spline"), { ssr: false });

// react-spline relance pendant le rendu toute erreur de chargement de la scène (réseau coupé,
// Spline indisponible, WebGL absent). Sans ce garde-fou, elle ferait tomber toute la page :
// ici, on retire juste la scène et l'aperçu statique reste affiché.
class SansErreur extends Component<{ children: React.ReactNode }, { echec: boolean }> {
  state = { echec: false };
  static getDerivedStateFromError() {
    return { echec: true };
  }
  render() {
    return this.state.echec ? null : this.props.children;
  }
}

// Le badge « Built with Spline » est intégré au fichier de scène (export d'un compte gratuit) et
// dessiné dans le coin bas-droit du canvas. Le canvas déborde de DEBORDEMENT px sous l'écran :
// le badge tombe hors champ, coupé par l'overflow du conteneur fixe.
// Pour le retirer proprement : décocher le logo dans les réglages d'export Spline, puis réexporter.
const DEBORDEMENT = 80;

type Props = {
  scene: string;
  /** Captures de la scène affichées tout de suite, le temps que la 3D se charge (~2 s). */
  apercu: { large: string; etroit: string };
};

// Fond décoratif : une scène 3D Spline fixe derrière la page. Un aperçu statique s'affiche
// immédiatement, puis la scène animée apparaît en fondu une fois prête.
export function FondSpline({ scene, apercu }: Props) {
  // Le fichier de scène (plusieurs Mo) part dès le HTML, en parallèle du JavaScript,
  // au lieu d'attendre que le runtime soit chargé. Le runtime le récupère via un simple fetch().
  preload(scene, { as: "fetch", crossOrigin: "anonymous" });
  const [prete, setPrete] = useState(false);

  function auChargement(app: Application) {
    // On attend une image rendue avant le fondu, pour ne pas révéler un canvas vide.
    requestAnimationFrame(() => {
      setPrete(true);
      // Mouvement réduit demandé : on fige la scène sur cette première image.
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        requestAnimationFrame(() => app.stop());
      }
    });
  }

  return (
    <div className={styles.fond} aria-hidden>
      {/* Aperçu en <picture> : repéré par le navigateur dès la lecture du HTML, avant tout CSS,
          et seule la version adaptée à la forme de l'écran est téléchargée. */}
      <picture>
        <source media="(min-aspect-ratio: 1/1)" srcSet={apercu.large} />
        <img src={apercu.etroit} alt="" fetchPriority="high" className={styles.apercu} />
      </picture>
      <SansErreur>
        {/* Hauteur passée en style : react-spline impose height: 100% en inline sur son conteneur. */}
        <Spline
          scene={scene}
          onLoad={auChargement}
          className={prete ? `${styles.scene} ${styles.prete}` : styles.scene}
          style={{ height: `calc(100% + ${DEBORDEMENT}px)` }}
        />
      </SansErreur>
      <div className={styles.voile} />
    </div>
  );
}
