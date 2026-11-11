"use client";

import { MagnifyingGlassIcon, XIcon } from "@phosphor-icons/react/dist/ssr";
import { useMemo, useState } from "react";
import { ProjectCard } from "@/components/project-card";
import type { Projet } from "@/content/projets";

const TOUS = "Tous";

function normaliser(texte: string) {
  return texte
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
}

export function ProjectsExplorer({ projets }: { projets: Projet[] }) {
  const [recherche, setRecherche] = useState("");
  const [filtre, setFiltre] = useState(TOUS);

  // Un tag devient un filtre dès qu'il est partagé par au moins deux projets.
  const filtres = useMemo(() => {
    const compte = new Map<string, number>();
    projets.forEach((p) => p.tags.forEach((t) => compte.set(t, (compte.get(t) ?? 0) + 1)));
    return [TOUS, ...[...compte].filter(([, n]) => n >= 2).sort((a, b) => b[1] - a[1]).map(([t]) => t)];
  }, [projets]);

  const terme = normaliser(recherche.trim());
  const visibles = projets.filter((p) => {
    if (filtre !== TOUS && !p.tags.includes(filtre)) return false;
    if (!terme) return true;
    return normaliser([p.titre, p.resume, ...p.tags].join(" ")).includes(terme);
  });

  const sections = [
    { titre: "En cours", liste: visibles.filter((p) => p.statut === "en-cours") },
    { titre: "Passés", liste: visibles.filter((p) => p.statut === "passe") },
  ].filter((s) => s.liste.length > 0);

  const reinitialiser = () => {
    setRecherche("");
    setFiltre(TOUS);
  };

  return (
    <div className="container-site">
      <div className="flex flex-col gap-4 border-y border-line py-5 md:flex-row md:items-center md:justify-between">
        <label className="relative block md:w-80">
          <span className="sr-only">Rechercher un projet</span>
          <MagnifyingGlassIcon
            aria-hidden
            size={18}
            className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-faint"
          />
          <input
            type="search"
            value={recherche}
            onChange={(e) => setRecherche(e.target.value)}
            onKeyDown={(e) => e.key === "Escape" && setRecherche("")}
            placeholder="Rechercher un projet"
            className="w-full rounded-lg border border-line-strong bg-ink-2 py-2.5 pr-3 pl-10 text-sm text-paper placeholder:text-faint transition-colors focus:border-phosphor focus:outline-none"
          />
        </label>
        <div role="group" aria-label="Filtrer par thème" className="flex flex-wrap gap-2">
          {filtres.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFiltre(f)}
              aria-pressed={filtre === f}
              className={`rounded-md border px-3 py-1.5 font-mono text-xs transition-colors duration-200 ${
                filtre === f
                  ? "border-phosphor bg-phosphor text-ink"
                  : "border-line-strong text-muted hover:border-paper hover:text-paper"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <p className="sr-only" aria-live="polite">
        {visibles.length} {visibles.length > 1 ? "projets affichés" : "projet affiché"}
      </p>

      {sections.length === 0 ? (
        <div className="mt-12 flex flex-col items-start gap-5 rounded-2xl border border-dashed border-line-strong p-8 sm:p-12">
          <p className="font-pixel text-3xl text-phosphor">Aucun résultat</p>
          <p className="max-w-[50ch] text-muted">
            Aucun projet ne correspond
            {recherche.trim() ? ` à « ${recherche.trim()} »` : ""}
            {filtre !== TOUS ? ` dans le thème ${filtre}` : ""}.
          </p>
          <button type="button" onClick={reinitialiser} className="link-arrow">
            <XIcon aria-hidden size={16} />
            Tout afficher
          </button>
        </div>
      ) : (
        sections.map((s) => (
          <section key={s.titre} className="mt-12" aria-label={`Projets ${s.titre.toLowerCase()}`}>
            <h2 className="flex items-baseline gap-3 text-xl font-semibold tracking-tight">
              {s.titre}
              <span className="font-mono text-xs font-normal text-faint">{s.liste.length}</span>
            </h2>
            <ul className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {s.liste.map((p) => (
                <li key={p.slug}>
                  <ProjectCard projet={p} index={projets.indexOf(p)} />
                </li>
              ))}
            </ul>
          </section>
        ))
      )}
    </div>
  );
}
