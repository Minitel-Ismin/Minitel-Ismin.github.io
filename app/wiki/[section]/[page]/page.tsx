import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CaretDownIcon,
  PencilSimpleIcon,
} from "@phosphor-icons/react/dist/ssr";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { WikiSommaire } from "@/components/wiki-sommaire";
import { site } from "@/content/site";
import { cheminWiki, getPageWiki, pagesWiki } from "@/content/wiki";
import { rendrePageWiki, type TitreWiki } from "@/lib/wiki";

// Site statique : seules les pages du sommaire (content/wiki.ts) existent.
export const dynamicParams = false;

export function generateStaticParams() {
  return pagesWiki.map((p) => ({ section: p.section.slug, page: p.slug }));
}

export async function generateMetadata(props: PageProps<"/wiki/[section]/[page]">): Promise<Metadata> {
  const { section, page } = await props.params;
  const entree = getPageWiki(section, page);
  return entree ? { title: `${entree.titre} · Wiki`, description: entree.resume } : {};
}

function SurCettePage({ sommaire }: { sommaire: TitreWiki[] }) {
  return (
    <ul className="space-y-2 text-sm">
      {sommaire.map((t) => (
        <li key={t.id}>
          <a href={`#${t.id}`} className="text-muted transition-colors hover:text-phosphor">
            {t.texte}
          </a>
        </li>
      ))}
    </ul>
  );
}

export default async function PageArticleWiki(props: PageProps<"/wiki/[section]/[page]">) {
  const { section, page } = await props.params;
  const entree = getPageWiki(section, page);
  if (!entree) notFound();

  const { html, sommaire } = rendrePageWiki(section, page);
  const avecSommaire = sommaire.length >= 3;

  const index = pagesWiki.indexOf(entree);
  const precedente = pagesWiki[index - 1];
  const suivante = pagesWiki[index + 1];
  const lienModifier = `${site.liens.depot}/edit/main/content/wiki/${section}/${page}.md`;

  return (
    <div className="container-site grid gap-x-10 gap-y-8 pt-10 sm:pt-14 lg:grid-cols-12">
      <aside className="lg:col-span-3">
        <details className="group rounded-2xl border border-line bg-ink-2 lg:hidden">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-mono text-xs tracking-widest uppercase [&::-webkit-details-marker]:hidden">
            Toutes les pages du wiki
            <CaretDownIcon aria-hidden size={16} className="transition-transform group-open:rotate-180" />
          </summary>
          <nav aria-label="Pages du wiki" className="border-t border-line px-5 py-6">
            <WikiSommaire section={section} page={page} />
          </nav>
        </details>
        <nav
          aria-label="Pages du wiki"
          className="hidden lg:sticky lg:top-24 lg:block lg:max-h-[calc(100dvh-7rem)] lg:overflow-y-auto lg:pb-8"
        >
          <WikiSommaire section={section} page={page} />
        </nav>
      </aside>

      <article className="min-w-0 lg:col-span-9 xl:col-span-7">
        <header>
          <p className="rise font-mono text-xs text-faint">
            <Link href="/wiki/" className="transition-colors hover:text-phosphor">
              Wiki
            </Link>
            <span aria-hidden> / </span>
            {entree.section.titre}
          </p>
          <h1
            className="rise mt-5 text-4xl leading-[1.04] font-bold tracking-[-0.035em] sm:text-5xl"
            style={{ "--i": 1 } as React.CSSProperties}
          >
            {entree.titre}
          </h1>
          <p
            className="rise mt-4 max-w-[60ch] text-lg leading-relaxed text-muted"
            style={{ "--i": 2 } as React.CSSProperties}
          >
            {entree.resume}
          </p>
        </header>

        {avecSommaire && (
          <details className="group mt-8 rounded-2xl border border-line xl:hidden">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-mono text-xs tracking-widest uppercase [&::-webkit-details-marker]:hidden">
              Sur cette page
              <CaretDownIcon aria-hidden size={16} className="transition-transform group-open:rotate-180" />
            </summary>
            <nav aria-label="Sur cette page" className="border-t border-line px-5 py-5">
              <SurCettePage sommaire={sommaire} />
            </nav>
          </details>
        )}

        {/* HTML produit au build à partir des fichiers Markdown du dépôt (content/wiki),
            jamais à partir de saisies des visiteurs. */}
        <div className="wiki-prose mt-10" dangerouslySetInnerHTML={{ __html: html }} />

        <p className="mt-14 border-t border-line pt-6 text-sm text-muted">
          Une erreur, une info qui n&apos;est plus à jour ?{" "}
          <a href={lienModifier} target="_blank" rel="noopener" className="link-arrow">
            <PencilSimpleIcon aria-hidden size={14} />
            Modifier cette page sur GitHub
          </a>
        </p>

        <nav
          aria-label="Autres pages du wiki"
          className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2"
        >
          {precedente ? (
            <Link
              href={cheminWiki(precedente.section.slug, precedente.slug)}
              className="group flex flex-col gap-2 bg-ink p-6 transition-colors hover:bg-ink-2"
            >
              <span className="inline-flex items-center gap-2 font-mono text-xs text-faint">
                <ArrowLeftIcon aria-hidden size={14} className="transition-transform group-hover:-translate-x-1" />
                Page précédente
              </span>
              <span className="text-lg font-semibold tracking-tight">{precedente.titre}</span>
            </Link>
          ) : (
            <div className="hidden bg-ink sm:block" />
          )}
          {suivante ? (
            <Link
              href={cheminWiki(suivante.section.slug, suivante.slug)}
              className="group flex flex-col items-end gap-2 bg-ink p-6 text-right transition-colors hover:bg-ink-2"
            >
              <span className="inline-flex items-center gap-2 font-mono text-xs text-faint">
                Page suivante
                <ArrowRightIcon aria-hidden size={14} className="transition-transform group-hover:translate-x-1" />
              </span>
              <span className="text-lg font-semibold tracking-tight">{suivante.titre}</span>
            </Link>
          ) : (
            <Link
              href="/wiki/"
              className="group flex flex-col items-end gap-2 bg-ink p-6 text-right transition-colors hover:bg-ink-2"
            >
              <span className="inline-flex items-center gap-2 font-mono text-xs text-faint">
                Fin du wiki
                <ArrowRightIcon aria-hidden size={14} className="transition-transform group-hover:translate-x-1" />
              </span>
              <span className="text-lg font-semibold tracking-tight">Toutes les pages</span>
            </Link>
          )}
        </nav>
      </article>

      {avecSommaire && (
        <aside className="hidden xl:col-span-2 xl:block">
          <nav aria-label="Sur cette page" className="sticky top-24 max-h-[calc(100dvh-7rem)] overflow-y-auto pb-8">
            <p className="font-mono text-[0.7rem] tracking-widest text-faint uppercase">Sur cette page</p>
            <div className="mt-4">
              <SurCettePage sommaire={sommaire} />
            </div>
          </nav>
        </aside>
      )}
    </div>
  );
}
