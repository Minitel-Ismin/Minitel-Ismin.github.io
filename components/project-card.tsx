import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import type { Projet } from "@/content/projets";

export function ProjectCard({ projet, index }: { projet: Projet; index: number }) {
  return (
    <Link
      href={`/projets/${projet.slug}/`}
      className="group relative flex h-full flex-col rounded-2xl border border-line bg-ink-2 p-6 transition-[border-color,background-color,transform] duration-300 hover:-translate-y-0.5 hover:border-phosphor/50 hover:bg-ink-3 active:translate-y-0 sm:p-7"
    >
      <div className="flex items-center justify-between font-mono text-xs text-faint">
        <span>{String(index + 1).padStart(2, "0")}</span>
        <span className="inline-flex items-center gap-2">
          {projet.statut === "en-cours" && (
            <span aria-hidden className="size-1.5 rounded-full bg-phosphor shadow-[0_0_6px_var(--color-phosphor)]" />
          )}
          {projet.statut === "en-cours" ? "En cours" : projet.annee}
        </span>
      </div>

      <h3 className="mt-10 text-2xl font-semibold tracking-tight">{projet.titre}</h3>
      <p className="mt-3 text-[0.95rem] leading-relaxed text-muted">{projet.resume}</p>

      <div className="mt-auto flex items-end justify-between gap-4 pt-8">
        <ul className="flex flex-wrap gap-1.5" aria-label="Thèmes">
          {projet.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-md bg-ink px-2 py-1 font-mono text-[0.7rem] text-muted"
            >
              {tag}
            </li>
          ))}
        </ul>
        <ArrowRightIcon
          aria-hidden
          size={20}
          className="shrink-0 text-faint transition-[color,transform] duration-300 group-hover:translate-x-1 group-hover:text-phosphor"
        />
      </div>
    </Link>
  );
}
