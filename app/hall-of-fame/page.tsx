import { ArrowRightIcon, TrophyIcon } from "@phosphor-icons/react/dist/ssr";
import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { palmares } from "@/content/hall-of-fame";
import { annee, formaterDate } from "@/lib/dates";

export const metadata: Metadata = {
  title: "Hall of fame",
  description: "Le palmarès des LAN et tournois organisés par MINITEL.",
};

export default function PageHallOfFame() {
  const tries = [...palmares].sort((a, b) => b.date.localeCompare(a.date));
  const annees = [...new Set(tries.map((v) => annee(v.date)))];

  return (
    <>
      <PageHeader
        eyebrow="Hall of fame"
        title="Les champions des LAN"
        intro="Chaque LAN et chaque tournoi organisés par MINITEL ont leurs vainqueurs. Ici, ils restent."
      />

      <div className="container-site">
        {tries.length === 0 ? (
          <div className="flex flex-col items-start gap-5 rounded-2xl border border-dashed border-line-strong p-8 sm:p-12">
            <TrophyIcon aria-hidden size={40} className="text-phosphor" />
            <p className="font-pixel text-4xl text-phosphor">Palmarès vierge</p>
            <p className="max-w-[52ch] leading-relaxed text-muted">
              Aucun vainqueur n&apos;est encore inscrit. Les gagnants des prochaines LAN apparaîtront
              ici : la première place est à prendre.
            </p>
            <Link href="/projets/" className="link-arrow">
              Voir nos événements
              <ArrowRightIcon aria-hidden size={16} />
            </Link>
          </div>
        ) : (
          <div className="space-y-16">
            {annees.map((an) => (
              <section key={an} aria-labelledby={`annee-${an}`}>
                <h2 id={`annee-${an}`} className="font-pixel text-5xl text-phosphor">
                  {an}
                </h2>
                <ul className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {tries
                    .filter((v) => annee(v.date) === an)
                    .map((v) => (
                      <li
                        key={`${v.date}-${v.evenement}-${v.jeu}`}
                        className="flex flex-col rounded-2xl border border-line bg-ink-2 p-6"
                      >
                        <div className="flex items-center justify-between font-mono text-xs text-muted">
                          <span>{v.jeu}</span>
                          <time dateTime={v.date}>{formaterDate(v.date)}</time>
                        </div>
                        <div className="mt-8 flex items-start gap-3">
                          <TrophyIcon
                            aria-hidden
                            size={28}
                            weight="fill"
                            className="mt-0.5 shrink-0 text-phosphor drop-shadow-[0_0_8px_rgb(105_255_10/0.5)]"
                          />
                          <div>
                            <h3 className="text-2xl font-semibold tracking-tight">
                              {v.equipe ?? v.joueurs.join(", ")}
                            </h3>
                            <p className="mt-1 text-sm text-muted">{v.evenement}</p>
                          </div>
                        </div>
                        {v.equipe && v.joueurs.length > 0 && (
                          <ul className="mt-6 flex flex-wrap gap-1.5 border-t border-line pt-5" aria-label="Joueurs">
                            {v.joueurs.map((j) => (
                              <li key={j} className="rounded-md bg-ink px-2 py-1 font-mono text-xs text-paper">
                                {j}
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                </ul>
              </section>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
