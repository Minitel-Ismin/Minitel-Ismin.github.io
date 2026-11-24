"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const LIGNES = [
  "3615 MINITEL",
  "",
  "> wifi résidence ... OK",
  "> réseau filaire ... OK",
  "> support info ..... OK",
  "> prêt matériel .... OK",
];

const TEXTE = LIGNES.join("\n");

// Illustration du logo dont l'écran (transparent dans le PNG) affiche
// un texte tapé façon Minitel. L'écran est placé sous l'image : le cadre
// du terminal masque naturellement ses bords.
export function MinitelScreen() {
  const [visible, setVisible] = useState(0);

  useEffect(() => {
    // Sans animation (préférence système), tout le texte s'affiche au premier tick.
    const pas = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? TEXTE.length : 1;
    let i = 0;
    const id = window.setInterval(() => {
      i = Math.min(i + pas, TEXTE.length);
      setVisible(i);
      if (i >= TEXTE.length) window.clearInterval(id);
    }, 38);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="relative mx-auto w-full max-w-[34rem]" style={{ aspectRatio: "705 / 632" }}>
      <div
        aria-hidden
        className="absolute inset-[8%] rounded-full bg-phosphor/10 blur-3xl"
      />
      <div
        aria-hidden
        className="minitel-screen absolute"
        style={{ left: "21%", top: "15.2%", width: "51.2%", height: "43.4%" }}
      >
        <pre className="minitel-screen__text absolute inset-0 overflow-hidden px-[7%] py-[8%] whitespace-pre">
          {TEXTE.slice(0, visible)}
          <span className="animate-blink">█</span>
        </pre>
      </div>
      <Image
        src="/img/minitel-terminal.png"
        alt="Illustration du terminal Minitel, logo de l'association"
        fill
        priority
        sizes="(min-width: 1024px) 34rem, 90vw"
        className="object-contain drop-shadow-[0_30px_60px_rgb(0_0_0/0.55)]"
      />
    </div>
  );
}
