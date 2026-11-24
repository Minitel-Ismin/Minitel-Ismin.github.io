import { ArrowLeftIcon, ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjet, projets } from "@/content/projets";

// Site statique : seules les pages listées ici existent.
export const dynamicParams = false;

export function generateStaticParams() {
  return projets.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: PageProps<"/projets/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const projet = getProjet(slug);
  return projet ? { title: projet.titre, description: projet.resume } : {};
}

export default async function PageProjet(props: PageProps<"/projets/[slug]">) {
  const { slug } = await props.params;
  const projet = getProjet(slug);
  if (!projet) notFound();

  const index = projets.indexOf(projet);
  const precedent = projets[index - 1];
  const suivant = projets[index + 1];

  return (
    <article>
      <header className="container-site pt-10 pb-12 sm:pt-14 sm:pb-16">
        <Link href="/projets/" className="link-arrow text-sm">
          <ArrowLeftIcon aria-hidden size={16} />
          Tous les projets
        </Link>
        <p className="rise eyebrow mt-12 flex items-center gap-2">
          {projet.statut === "en-cours" && (
            <span aria-hidden className="size-1.5 rounded-full bg-phosphor shadow-[0_0_6px_var(--color-phosphor)]" />
          )}
          {projet.statut === "en-cours" ? "En cours" : `Édition ${projet.annee}`}
        </p>
        <h1
          className="rise mt-5 max-w-4xl text-4xl leading-[1.02] font-bold tracking-[-0.035em] sm:text-6xl"
          style={{ "--i": 1 } as React.CSSProperties}
        >
          {projet.titre}
        </h1>
        <p
          className="rise mt-5 max-w-[60ch] text-lg leading-relaxed text-muted"
          style={{ "--i": 2 } as React.CSSProperties}
        >
          {projet.sousTitre}
        </p>
      </header>

      <div className="container-site grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <div className="space-y-5 text-lg leading-relaxed text-paper/90">
            {projet.paragraphes.map((p) => (
              <p key={p} className="max-w-[65ch]">
                {p}
              </p>
            ))}
          </div>
          {projet.liste && (
            <>
              <h2 className="mt-12 text-xl font-semibold tracking-tight">{projet.liste.titre}</h2>
              <ul className="mt-5 border-t border-line">
                {projet.liste.items.map((item) => (
                  <li key={item} className="flex gap-4 border-b border-line py-3.5">
                    <span aria-hidden className="font-mono text-phosphor">
                      ›
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>

        <aside className="lg:col-span-4 lg:col-start-9">
          <div className="rounded-2xl border border-line bg-ink-2 p-6 lg:sticky lg:top-28">
            <h2 className="font-mono text-xs tracking-widest text-faint uppercase">Fiche</h2>
            <dl className="mt-4 divide-y divide-line font-mono text-sm">
              {projet.infos.map((info) => (
                <div key={info.label} className="flex justify-between gap-4 py-3">
                  <dt className="text-muted">{info.label}</dt>
                  <dd className="text-right">{info.valeur}</dd>
                </div>
              ))}
            </dl>
            <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Thèmes">
              {projet.tags.map((tag) => (
                <li key={tag} className="rounded-md bg-ink px-2 py-1 font-mono text-[0.7rem] text-muted">
                  {tag}
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>

      <div className="container-site mt-24">
        <nav
          aria-label="Autres projets"
          className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2"
        >
          {precedent ? (
            <Link
              href={`/projets/${precedent.slug}/`}
              className="group flex flex-col gap-2 bg-ink p-6 transition-colors hover:bg-ink-2 sm:p-8"
            >
              <span className="inline-flex items-center gap-2 font-mono text-xs text-faint">
                <ArrowLeftIcon aria-hidden size={14} className="transition-transform group-hover:-translate-x-1" />
                Projet précédent
              </span>
              <span className="text-xl font-semibold tracking-tight">{precedent.titre}</span>
            </Link>
          ) : (
            <div className="hidden bg-ink sm:block" />
          )}
          {suivant ? (
            <Link
              href={`/projets/${suivant.slug}/`}
              className="group flex flex-col items-end gap-2 bg-ink p-6 text-right transition-colors hover:bg-ink-2 sm:p-8"
            >
              <span className="inline-flex items-center gap-2 font-mono text-xs text-faint">
                Projet suivant
                <ArrowRightIcon aria-hidden size={14} className="transition-transform group-hover:translate-x-1" />
              </span>
              <span className="text-xl font-semibold tracking-tight">{suivant.titre}</span>
            </Link>
          ) : (
            <Link
              href="/projets/"
              className="group flex flex-col items-end gap-2 bg-ink p-6 text-right transition-colors hover:bg-ink-2 sm:p-8"
            >
              <span className="inline-flex items-center gap-2 font-mono text-xs text-faint">
                Fin de la liste
                <ArrowRightIcon aria-hidden size={14} className="transition-transform group-hover:translate-x-1" />
              </span>
              <span className="text-xl font-semibold tracking-tight">Tous les projets</span>
            </Link>
          )}
        </nav>
      </div>
    </article>
  );
}
