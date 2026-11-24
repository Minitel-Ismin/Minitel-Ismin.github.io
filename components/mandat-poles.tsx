import { LinkedinLogoIcon } from "@phosphor-icons/react/dist/ssr";
import type { Membre, Pole } from "@/content/mandats";

function initiales(m: Membre) {
  return `${m.prenom[0]}${m.nom[0]}`.toUpperCase();
}

function CarteMembre({ membre }: { membre: Membre }) {
  const contenu = (
    <>
      <span
        aria-hidden
        className="grid size-11 shrink-0 place-items-center rounded-lg bg-ink-3 font-mono text-sm text-phosphor transition-colors duration-300 group-hover:bg-phosphor group-hover:text-ink"
      >
        {initiales(membre)}
      </span>
      <span className="min-w-0">
        <span className="block font-medium leading-snug">
          {membre.prenom} <span className="uppercase">{membre.nom}</span>
        </span>
        <span className="mt-1 flex items-center gap-1.5 font-mono text-xs leading-snug text-muted">
          {membre.role}
          {membre.linkedin && <LinkedinLogoIcon aria-label="Profil LinkedIn" size={14} className="text-paper" />}
        </span>
      </span>
    </>
  );

  const classes =
    "group flex items-center gap-4 rounded-xl border border-line bg-ink-2 p-4 transition-[border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-phosphor/40";

  return membre.linkedin ? (
    <a href={membre.linkedin} target="_blank" rel="noopener" className={classes}>
      {contenu}
    </a>
  ) : (
    <div className={classes}>{contenu}</div>
  );
}

export function MandatPoles({ poles, niveauTitre = 2 }: { poles: Pole[]; niveauTitre?: 2 | 3 }) {
  const Titre = niveauTitre === 2 ? "h2" : "h3";
  return (
    <div className="space-y-14">
      {poles.map((pole) => (
        <section key={pole.nom} className="grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <Titre className="text-xl font-semibold tracking-tight">{pole.nom}</Titre>
            <p className="mt-1 font-mono text-xs text-faint">
              {pole.membres.length} {pole.membres.length > 1 ? "membres" : "membre"}
            </p>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2 lg:col-span-9 xl:grid-cols-3">
            {pole.membres.map((m) => (
              <li key={`${m.prenom}-${m.nom}-${m.role}`}>
                <CarteMembre membre={m} />
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
