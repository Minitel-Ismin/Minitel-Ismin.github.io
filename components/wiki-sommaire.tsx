import Link from "next/link";
import { cheminWiki, sectionsWiki } from "@/content/wiki";

type WikiSommaireProps = {
  /** Page affichée, mise en avant dans le sommaire. */
  section: string;
  page: string;
};

export function WikiSommaire({ section, page }: WikiSommaireProps) {
  return (
    <ul className="space-y-7">
      {sectionsWiki.map((s) => (
        <li key={s.slug}>
          <p className="font-mono text-[0.7rem] tracking-widest text-faint uppercase">{s.titre}</p>
          <ul className="mt-2.5 border-l border-line">
            {s.pages.map((p) => {
              const actif = s.slug === section && p.slug === page;
              return (
                <li key={p.slug}>
                  <Link
                    href={cheminWiki(s.slug, p.slug)}
                    aria-current={actif ? "page" : undefined}
                    className={`-ml-px block border-l py-1.5 pl-4 text-sm transition-colors ${
                      actif
                        ? "border-phosphor text-paper"
                        : "border-transparent text-muted hover:border-line-strong hover:text-paper"
                    }`}
                  >
                    {p.titre}
                  </Link>
                </li>
              );
            })}
          </ul>
        </li>
      ))}
    </ul>
  );
}
