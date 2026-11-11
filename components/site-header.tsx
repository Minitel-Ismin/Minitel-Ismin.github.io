"use client";

import { ArrowUpRightIcon, ListIcon, XIcon } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { navigation, site } from "@/content/site";

// Le segment de route (et non l'URL) donne le lien actif : il est identique au rendu
// statique et dans le navigateur, y compris sur la page 404 servie pour une URL inconnue.
function estActif(segment: string | null, href: string) {
  const cible = href.replaceAll("/", "");
  return cible === "" ? segment === null : segment === cible;
}

// En dessous de cette hauteur la barre reste affichée ; au-delà, on ignore les micro-défilements.
const ZONE_HAUTE = 64;
const SEUIL = 6;

export function SiteHeader() {
  const segment = useSelectedLayoutSegment();
  // Sur l'accueil, la barre flotte en capsule de verre au-dessus de l'aurore.
  const verre = segment === null;
  const [menuOuvert, setMenuOuvert] = useState(false);
  const [cachee, setCachee] = useState(false);
  const dernierY = useRef(0);

  // Cache la barre quand on descend, la ré-affiche dès qu'on remonte.
  useEffect(() => {
    let image = 0;
    const surDefilement = () => {
      cancelAnimationFrame(image);
      image = requestAnimationFrame(() => {
        const y = window.scrollY;
        const delta = y - dernierY.current;
        if (y < ZONE_HAUTE) setCachee(false);
        else if (Math.abs(delta) < SEUIL) return;
        else setCachee(delta > 0);
        dernierY.current = y;
      });
    };
    dernierY.current = window.scrollY;
    window.addEventListener("scroll", surDefilement, { passive: true });
    return () => {
      cancelAnimationFrame(image);
      window.removeEventListener("scroll", surDefilement);
    };
  }, []);

  useEffect(() => {
    if (!menuOuvert) return;
    const fermerSurEchap = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOuvert(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", fermerSurEchap);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", fermerSurEchap);
    };
  }, [menuOuvert]);

  return (
    <>
      {/* :focus-visible : la barre revient si on y navigue au clavier alors qu'elle est cachée
          (focus-within la garderait affichée après un simple clic sur un lien). */}
      <header
        className={`sticky top-0 z-50 transition-transform duration-300 ease-out has-[:focus-visible]:translate-y-0 motion-reduce:transition-none ${
          verre ? "pt-3" : "border-b border-line bg-ink/80 backdrop-blur-md"
        } ${cachee && !menuOuvert ? "-translate-y-full" : "translate-y-0"}`}
      >
        <div className="container-site">
          <div
            className={`flex items-center justify-between gap-6 ${
              verre ? "verre h-14 rounded-2xl pr-2 pl-3 sm:pl-4" : "h-16"
            }`}
          >
            <Link
              href="/"
              onClick={() => setMenuOuvert(false)}
              className="group flex items-center gap-3"
              aria-label={`${site.nom}, retour à l'accueil`}
            >
              <Image
                src="/img/logos/minitel-petit.png"
                alt=""
                width={40}
                height={36}
                priority
                className="h-9 w-auto transition-transform duration-300 group-hover:-rotate-6"
              />
              <span className="font-mono text-[0.95rem] font-bold tracking-[0.18em]">{site.nom}</span>
            </Link>
  
            <nav aria-label="Navigation principale" className="hidden xl:block">
              <ul className="flex items-center">
                {navigation.map((item) => {
                  const actif = estActif(segment, item.href);
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        aria-current={actif ? "page" : undefined}
                        className={`relative block px-2.5 py-2 font-mono text-[0.7rem] tracking-wider uppercase transition-colors duration-200 ${
                          actif ? "text-paper" : "text-muted hover:text-paper"
                        } ${
                          verre
                            ? `rounded-full ${actif ? "bg-white/10 shadow-[inset_0_1px_0_rgb(255_255_255/0.15)]" : "hover:bg-white/[0.06]"}`
                            : "rounded-md"
                        }`}
                      >
                        {item.label}
                        {actif && !verre && (
                          <span
                            aria-hidden
                            className="absolute inset-x-2.5 -bottom-[13px] h-px bg-phosphor shadow-[0_0_8px_var(--color-phosphor)]"
                          />
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
  
            <button
              type="button"
              onClick={() => setMenuOuvert((o) => !o)}
              aria-expanded={menuOuvert}
              aria-controls="menu-mobile"
              className={`inline-flex items-center gap-2 px-2 py-2 font-mono text-xs tracking-widest text-paper uppercase xl:hidden ${
                verre ? "rounded-full px-3 hover:bg-white/[0.06]" : "-mr-2 rounded-md"
              }`}
            >
              {menuOuvert ? "Fermer" : "Menu"}
              {menuOuvert ? <XIcon aria-hidden size={20} /> : <ListIcon aria-hidden size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Hors du <header> : son backdrop-filter piégerait le position: fixed du menu. */}
      {menuOuvert && (
        <nav
          id="menu-mobile"
          aria-label="Navigation principale"
          className={`fixed inset-0 z-40 overflow-y-auto bg-ink px-4 pb-10 sm:px-6 xl:hidden ${
            verre ? "pt-[5.25rem]" : "pt-20"
          }`}
        >
          <ul className="flex flex-col">
            {navigation.map((item, i) => {
              const actif = estActif(segment, item.href);
              return (
                <li
                  key={item.href}
                  className="rise border-b border-line"
                  style={{ "--i": i } as React.CSSProperties}
                >
                  <Link
                    href={item.href}
                    onClick={() => setMenuOuvert(false)}
                    aria-current={actif ? "page" : undefined}
                    className="flex items-baseline justify-between py-3.5 text-2xl font-semibold tracking-tight sm:text-3xl"
                  >
                    <span className={actif ? "text-phosphor" : "text-paper"}>{item.label}</span>
                    <span className="font-mono text-xs text-faint">{String(i + 1).padStart(2, "0")}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
          <a
            href={site.liens.wiki}
            target="_blank"
            rel="noopener"
            className="mt-8 inline-flex items-center gap-2 font-mono text-sm text-phosphor"
          >
            Wiki de l&apos;association <ArrowUpRightIcon aria-hidden size={14} weight="bold" />
          </a>
        </nav>
      )}
    </>
  );
}
