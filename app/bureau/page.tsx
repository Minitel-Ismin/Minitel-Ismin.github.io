import { CaretDownIcon } from "@phosphor-icons/react/dist/ssr";
import type { Metadata } from "next";
import { MandatPoles } from "@/components/mandat-poles";
import { PageHeader } from "@/components/page-header";
import { mandatActuel, mandats } from "@/content/mandats";

export const metadata: Metadata = {
  title: "Le bureau",
  description: `Les membres du mandat ${mandatActuel.id} de MINITEL et les mandats précédents.`,
};

function compterMembres(poles: (typeof mandats)[number]["poles"]) {
  return new Set(poles.flatMap((p) => p.membres.map((m) => `${m.prenom} ${m.nom}`))).size;
}

export default function PageMandat() {
  const anciens = mandats.filter((m) => m !== mandatActuel);
  const nb = compterMembres(mandatActuel.poles);

  return (
    <>
      <PageHeader
        eyebrow={`Le bureau · Mandat ${mandatActuel.id} · ${mandatActuel.annees}`}
        title="L'équipe du mandat"
        intro={`${nb} membres répartis en ${mandatActuel.poles.length} pôles. Ce sont eux qui font tourner le réseau et l'asso cette année.`}
      />

      <div className="container-site">
        <MandatPoles poles={mandatActuel.poles} />
      </div>

      {anciens.length > 0 && (
        <section className="container-site mt-28" aria-labelledby="anciens">
          <h2 id="anciens" className="eyebrow">
            Mandats précédents
          </h2>
          <div className="mt-6 border-t border-line">
            {anciens.map((m) => (
              <details key={m.id} className="group border-b border-line">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 transition-colors hover:text-phosphor [&::-webkit-details-marker]:hidden">
                  <span className="flex flex-wrap items-baseline gap-x-5 gap-y-1">
                    <span className="text-2xl font-semibold tracking-tight sm:text-3xl">Mandat {m.id}</span>
                    <span className="font-mono text-sm text-muted">
                      {m.annees} · {compterMembres(m.poles)} membres
                    </span>
                  </span>
                  <CaretDownIcon
                    aria-hidden
                    size={22}
                    className="shrink-0 transition-transform duration-300 group-open:rotate-180"
                  />
                </summary>
                <div className="pt-4 pb-14">
                  <MandatPoles poles={m.poles} niveauTitre={3} />
                </div>
              </details>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
