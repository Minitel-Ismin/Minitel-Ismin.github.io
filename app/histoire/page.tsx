import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FondArcEnCiel } from "@/components/fond-arc-en-ciel";
import { EtapeFrise, FilFrise } from "@/components/frise";
import styles from "@/components/frise.module.css";
import { PageHeader } from "@/components/page-header";
import { historique } from "@/content/historique";
import { mandatActuel } from "@/content/mandats";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Notre histoire",
  description: "La frise des mandats de MINITEL depuis la création de l'association en 2015.",
};

function Point() {
  return <span aria-hidden className={styles.point} />;
}

function Geant({ children }: { children: React.ReactNode }) {
  return (
    <span aria-hidden className={styles.geant}>
      {children}
    </span>
  );
}

export default function PageFrise() {
  // Les mandats documentés alternent à gauche et à droite du fil ; le mandat en cours ouvre à gauche.
  let cote = 0;
  const prochainCote = () => (cote++ % 2 === 0 ? styles.gauche : styles.droite);

  return (
    <>
      <FondArcEnCiel />
      <PageHeader
        eyebrow="Notre histoire"
        title="Mandat après mandat"
        intro={`Depuis ${site.fondation}, chaque promo reprend le réseau et y ajoute sa pierre. Voici ce qu'on a pu retracer.`}
      />

      <div className="container-site">
        <ol className={styles.frise}>
          <FilFrise />

          <EtapeFrise className={prochainCote()}>
            <Point />
            <div className={`${styles.carte} ${styles.carteActive}`}>
              <p className="font-mono text-sm text-phosphor">{mandatActuel.annees} · en cours</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Mandat {mandatActuel.id}</h2>
              <Link href="/bureau/" className="link-arrow mt-5">
                Voir l&apos;équipe actuelle
                <ArrowRightIcon aria-hidden size={16} />
              </Link>
            </div>
            <Geant>{mandatActuel.id}</Geant>
          </EtapeFrise>

          {historique.map((etape) => {
            const documente = Boolean(etape.faits?.length || etape.photo);
            if (!documente) {
              return (
                <EtapeFrise key={etape.mandat} className={styles.courte}>
                  <Point />
                  <p className={styles.pastille}>
                    <span className="font-semibold text-paper">Mandat {etape.mandat}</span>
                    <span className="text-muted">{etape.annees}</span>
                  </p>
                </EtapeFrise>
              );
            }
            return (
              <EtapeFrise key={etape.mandat} className={prochainCote()}>
                <Point />
                <div className={styles.carte}>
                  <p className="font-mono text-sm text-muted">{etape.annees}</p>
                  <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Mandat {etape.mandat}</h2>
                  {etape.faits && (
                    <ul className="mt-6">
                      {etape.faits.map((fait, i) => (
                        <li key={fait} className={styles.fait} style={{ "--i": i } as React.CSSProperties}>
                          <span aria-hidden className="font-mono text-phosphor">
                            ›
                          </span>
                          {fait}
                        </li>
                      ))}
                    </ul>
                  )}
                  {etape.photo && (
                    <figure className="mt-6">
                      <div className={styles.photo}>
                        <Image
                          src={etape.photo.src}
                          alt={etape.photo.alt}
                          width={900}
                          height={560}
                          sizes="(min-width: 1024px) 34rem, 100vw"
                          className="w-full object-cover"
                        />
                      </div>
                      <figcaption className="mt-3 font-mono text-xs text-faint">
                        Le mandat {etape.mandat}, {etape.annees}
                      </figcaption>
                    </figure>
                  )}
                </div>
                <Geant>{etape.mandat}</Geant>
              </EtapeFrise>
            );
          })}

          <EtapeFrise className={styles.centree}>
            <Point />
            <div className={`${styles.carte} ${styles.carteActive} text-center`}>
              <p className="font-mono text-sm text-phosphor">{site.fondation}</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Création de MINITEL</h2>
            </div>
          </EtapeFrise>
        </ol>

        <p className="mt-20 max-w-[60ch] rounded-2xl border border-dashed border-line-strong bg-ink/80 p-6 leading-relaxed text-muted backdrop-blur-md sm:p-8">
          Il manque des mandats ou des souvenirs ? Les anciens peuvent{" "}
          <Link href="/contact/" className="link-arrow">
            nous écrire
          </Link>{" "}
          pour compléter la frise.
        </p>
      </div>
    </>
  );
}
