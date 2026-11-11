import { ArrowRightIcon, ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr";
import type { Metadata } from "next";
import Link from "next/link";
import { FondSpline } from "@/components/fond-spline";
import { PageHeader } from "@/components/page-header";
import { mandatActuel } from "@/content/mandats";
import { missions, site } from "@/content/site";

export const metadata: Metadata = {
  title: "L'association",
  description:
    "MINITEL, l'association réseau de l'ISMIN : nos missions, notre organisation en pôles et nos ressources.",
};

const ressources = [
  {
    titre: "Wiki de l'association",
    texte: "Eduroam, VPN de l'école, imprimantes, lecteurs réseau, Seafile, statuts et règlement intérieur.",
    href: site.liens.wiki,
  },
  {
    titre: "Instagram",
    texte: "Pour suivre l'actualité de l'asso au fil de l'année : @minitel.ismin.",
    href: site.liens.instagram,
  },
  {
    titre: "LinkedIn",
    texte: "La page de l'association, pour garder le contact avec les partenaires et les anciens.",
    href: site.liens.linkedin,
  },
];

export default function PageAPropos() {
  return (
    <>
      <FondSpline
        scene="https://prod.spline.design/ByLAngR4g5Nagj2w/scene.splinecode"
        apercu={{
          large: "/img/association/fond-spline-large.webp",
          etroit: "/img/association/fond-spline-etroit.webp",
        }}
      />
      <PageHeader
        eyebrow="L'association"
        title="Présentation de MINITEL"
        intro={`${site.description} Spécialisée en réseaux, cybersécurité et intelligence artificielle, elle rassemble les passionnés de tech.`}
        panneau
      />

      {/* Fond 3D chargé : chaque bloc de texte est posé sur un panneau de verre sombre. */}
      <section className="container-site" aria-labelledby="missions">
        <h2 id="missions" className="eyebrow panneau inline-flex rounded-full px-4 py-2">
          Nos missions
        </h2>
        <ol className="mt-5 grid gap-4 sm:grid-cols-2">
          {missions.map((m, i) => (
            <li key={m.titre} className="panneau p-7 sm:p-8">
              <span className="font-mono text-sm text-phosphor tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 text-2xl font-semibold tracking-tight">{m.titre}</h3>
              <p className="mt-2 max-w-[48ch] leading-relaxed text-muted">{m.texte}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="container-site mt-20 sm:mt-28" aria-labelledby="organisation">
        <div className="panneau grid gap-10 p-7 sm:p-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 id="organisation" className="text-3xl font-bold tracking-[-0.03em] sm:text-[2.6rem] sm:leading-[1.05]">
              Comment on s&apos;organise
            </h2>
            <p className="mt-5 max-w-[40ch] leading-relaxed text-muted">
              Chaque année, un nouveau mandat reprend l&apos;association. Les membres se répartissent
              en pôles, chacun avec ses responsables.
            </p>
            <Link href="/bureau/" className="link-arrow mt-6">
              Voir le mandat {mandatActuel.id}
              <ArrowRightIcon aria-hidden size={16} />
            </Link>
          </div>
          <ul className="border-t border-line lg:col-span-7 lg:col-start-6">
            {mandatActuel.poles.map((p) => (
              <li
                key={p.nom}
                className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-line py-5"
              >
                <span className="text-lg font-medium">{p.nom}</span>
                <span className="font-mono text-xs text-muted">
                  {p.membres.length} {p.membres.length > 1 ? "membres" : "membre"}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="container-site mt-20 sm:mt-28" aria-labelledby="ressources">
        <div className="panneau p-7 sm:p-10">
          <h2 id="ressources" className="text-3xl font-bold tracking-[-0.03em] sm:text-[2.6rem]">
            Ressources
          </h2>
          <div className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-3">
            {ressources.map((r) => (
              <a
                key={r.titre}
                href={r.href}
                target="_blank"
                rel="noopener"
                className="group block bg-ink p-7 transition-colors duration-300 hover:bg-ink-2 sm:p-8"
              >
                <span className="flex items-start justify-between gap-4">
                  <span className="text-xl font-semibold tracking-tight">{r.titre}</span>
                  <ArrowUpRightIcon
                    aria-hidden
                    size={20}
                    className="mt-1 shrink-0 text-faint transition-colors group-hover:text-phosphor"
                  />
                </span>
                <span className="mt-3 block leading-relaxed text-muted">{r.texte}</span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
