import { ArrowRightIcon, ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { BoutonAnime } from "@/components/bouton-anime";
import { CamionReseau } from "@/components/camion-reseau";
import { CarteCode, CarteTerminal } from "@/components/carte-code";
import { EspaceAstronaute } from "@/components/espace-astronaute";
import { FondAurore } from "@/components/fond-aurore";
import { MinitelScreen } from "@/components/minitel-screen";
import { actualitesTriees } from "@/content/actualites";
import { projets } from "@/content/projets";
import { site } from "@/content/site";
import { formaterDate } from "@/lib/dates";

const projetsEnAvant = [...projets]
  .sort((a, b) => Number(b.statut === "en-cours") - Number(a.statut === "en-cours"))
  .slice(0, 2);

const aides = [
  {
    titre: "Un souci de connexion ?",
    texte: "Écris-nous en précisant ton bâtiment, ton appareil et depuis quand ça coince.",
    href: "/contact/",
    externe: false,
  },
  {
    titre: "Réserver la 1100",
    texte: "Une LAN, un tournoi, une soirée jeux ? Demande un créneau dans la salle gaming.",
    href: "/reserver-1100/",
    externe: false,
  },
  {
    titre: "Eduroam, VPN, imprimantes",
    texte: "Les tutos de l'asso pour les services de l'école sont rassemblés sur le wiki.",
    href: site.liens.wiki,
    externe: true,
  },
  {
    titre: "Suivre les événements",
    texte: "LAN, tournois, formations : suis @minitel.ismin pour ne rien rater.",
    href: site.liens.instagram,
    externe: true,
  },
];

export default function Accueil() {
  return (
    <>
      <FondAurore />
      <section className="container-site grid items-center gap-14 pt-14 pb-16 sm:pt-20 lg:grid-cols-12 lg:gap-6 lg:pt-24 lg:pb-24">
        <div className="lg:col-span-7">
          <h1
            className="rise text-[clamp(2.6rem,6.4vw,5.25rem)] leading-[0.98] font-bold tracking-[-0.045em]"
            style={{ "--i": 1 } as React.CSSProperties}
          >
            Le réseau de la résidence, tenu par des élèves
            <span className="text-phosphor">.</span>
          </h1>
          <p
            className="rise mt-7 max-w-[52ch] text-lg leading-relaxed text-muted"
            style={{ "--i": 2 } as React.CSSProperties}
          >
            Depuis {site.fondation}, MINITEL fait tourner internet à la résidence du campus Georges
            Charpak, dépanne les machines des élèves et organise LAN, formations et Nuit de
            l&apos;Info.
          </p>
          <div
            className="rise mt-10 flex flex-wrap items-center gap-x-8 gap-y-5"
            style={{ "--i": 3 } as React.CSSProperties}
          >
            <BoutonAnime href="/association/">Découvrir l&apos;asso</BoutonAnime>
            <Link href="/contact/" className="link-arrow">
              Un souci de connexion ?
            </Link>
          </div>
        </div>
        <div className="rise lg:col-span-5" style={{ "--i": 3 } as React.CSSProperties}>
          <MinitelScreen />
        </div>
      </section>

      {actualitesTriees.length > 0 && (
        <section className="container-site mt-24 grid gap-8 lg:grid-cols-12" aria-labelledby="actus">
          <div className="lg:col-span-4">
            <p className="eyebrow">Actualités</p>
            <h2 id="actus" className="mt-4 text-3xl font-bold tracking-[-0.03em] sm:text-[2.6rem] sm:leading-[1.05]">
              Quoi de neuf
            </h2>
            <Link href="/actualites/" className="link-arrow mt-6">
              Toutes les actualités
              <ArrowRightIcon aria-hidden size={16} />
            </Link>
          </div>
          <ul className="border-t border-line lg:col-span-7 lg:col-start-6">
            {actualitesTriees.slice(0, 3).map((a) => (
              <li key={`${a.date}-${a.titre}`} className="border-b border-line">
                <Link
                  href={a.lien?.href ?? "/actualites/"}
                  className="group grid gap-2 py-6 sm:grid-cols-[9.5rem_1fr_auto] sm:items-baseline sm:gap-6"
                >
                  <time dateTime={a.date} className="font-mono text-xs text-muted">
                    {formaterDate(a.date)}
                  </time>
                  <span>
                    <span className="block text-xl font-semibold tracking-tight transition-colors group-hover:text-phosphor">
                      {a.titre}
                    </span>
                    <span className="mt-1.5 line-clamp-2 block leading-relaxed text-muted">{a.paragraphes[0]}</span>
                  </span>
                  <ArrowRightIcon
                    aria-hidden
                    size={18}
                    className="hidden text-faint transition-[color,transform] group-hover:translate-x-1 group-hover:text-phosphor sm:block"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="container-site mt-28 space-y-20 lg:space-y-28" aria-label="Le réseau de la résidence">
        <div className="grid items-center gap-10 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <EspaceAstronaute />
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <h2 className="text-3xl font-bold tracking-[-0.03em] sm:text-[2.6rem] sm:leading-[1.05]">
              Une connexion qui t&apos;envoie dans l&apos;espace.
            </h2>
            <p className="mt-5 max-w-[46ch] leading-relaxed text-muted">
              La connexion de la résidence est gérée par MINITEL : des élèves du campus qui
              maintiennent le wifi et le filaire, et en améliorent le débit et la fiabilité année
              après année.
            </p>
            <Link href="/contact/" className="link-arrow mt-6">
              Un souci de connexion ?
              <ArrowRightIcon aria-hidden size={16} />
            </Link>
          </div>
        </div>

        <div className="grid items-center gap-10 lg:grid-cols-12">
          <div className="lg:col-span-6 lg:col-start-7 lg:row-start-1">
            <CamionReseau />
          </div>
          <div className="lg:col-span-5 lg:col-start-1 lg:row-start-1">
            <h2 className="text-3xl font-bold tracking-[-0.03em] sm:text-[2.6rem] sm:leading-[1.05]">
              On gère tout le réseau de A à Z.
            </h2>
            <p className="mt-5 max-w-[46ch] leading-relaxed text-muted">
              Wifi, filaire, débit, pannes : MINITEL s&apos;occupe du réseau de la résidence du début
              à la fin. Et quand ton ordi ou ton téléphone fait des siennes, on t&apos;aide aussi.
            </p>
            <Link href="/association/" className="link-arrow mt-6">
              Ce que fait l&apos;association
              <ArrowRightIcon aria-hidden size={16} />
            </Link>
          </div>
        </div>
      </section>

      <section className="container-site mt-32" aria-labelledby="projets">
        <p className="eyebrow">Projets</p>
        <h2 id="projets" className="mt-4 text-3xl font-bold tracking-[-0.03em] sm:text-[2.6rem]">
          Ce qu&apos;on organise
        </h2>
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {projetsEnAvant.map((p) => (
            <CarteCode key={p.slug} projet={p} />
          ))}
          <CarteTerminal projets={projets} />
        </div>
      </section>

      <section className="container-site mt-32" aria-labelledby="aide">
        <h2 id="aide" className="text-3xl font-bold tracking-[-0.03em] sm:text-[2.6rem]">
          Besoin d&apos;un coup de main ?
        </h2>
        <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-2">
          {aides.map((a) => {
            const contenu = (
              <>
                <span className="flex items-start justify-between gap-4">
                  <span className="text-xl font-semibold tracking-tight">{a.titre}</span>
                  {a.externe ? (
                    <ArrowUpRightIcon aria-hidden size={20} className="mt-1 shrink-0 text-faint transition-colors group-hover:text-phosphor" />
                  ) : (
                    <ArrowRightIcon aria-hidden size={20} className="mt-1 shrink-0 text-faint transition-colors group-hover:text-phosphor" />
                  )}
                </span>
                <span className="mt-3 block leading-relaxed text-muted">{a.texte}</span>
              </>
            );
            const classes =
              "group block bg-ink p-7 transition-colors duration-300 hover:bg-ink-2 sm:p-8";
            return a.externe ? (
              <a key={a.titre} href={a.href} target="_blank" rel="noopener" className={classes}>
                {contenu}
              </a>
            ) : (
              <Link key={a.titre} href={a.href} className={classes}>
                {contenu}
              </Link>
            );
          })}
        </div>
      </section>
    </>
  );
}
