import type { Metadata } from "next";
import { CarteConsole } from "@/components/carte-console";
import { FondPixels } from "@/components/fond-pixels";
import { PageHeader } from "@/components/page-header";
import { Tele404 } from "@/components/tele-404";
import { actualitesTriees } from "@/content/actualites";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Actualités",
  description: "Les dernières nouvelles de MINITEL : mandats, LAN, formations, réseau de la résidence.",
};

export default function PageActualites() {
  return (
    <>
      <FondPixels />
      <PageHeader title="Quoi de neuf à MINITEL" />

      <div className="container-site">
        {actualitesTriees.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-line-strong bg-ink p-8 text-muted">
            Pas encore d&apos;actualité publiée. En attendant, suis{" "}
            <a href={site.liens.instagram} target="_blank" rel="noopener" className="link-arrow">
              @minitel.ismin
            </a>
            .
          </p>
        ) : (
          <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {actualitesTriees.map((a) => (
              <li key={`${a.date}-${a.titre}`}>
                <CarteConsole actu={a} />
              </li>
            ))}
          </ol>
        )}

        <div className="mt-20">
          <Tele404 />
        </div>
      </div>
    </>
  );
}
