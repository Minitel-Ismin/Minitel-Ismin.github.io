import { ArrowRightIcon, ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr";
import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { site } from "@/content/site";
import { cheminWiki, sectionsWiki } from "@/content/wiki";

export const metadata: Metadata = {
  title: "Wiki",
  description:
    "Les tutos de MINITEL pour les services de l'école : eduroam, VPN, imprimantes, mails, Seafile… et les textes officiels de l'association.",
};

export default function PageWiki() {
  return (
    <>
      <PageHeader
        eyebrow="Wiki"
        title="Le wiki de MINITEL"
        intro="Les tutos de l'asso pour se servir du réseau et des services de l'école : wifi, VPN, imprimantes, mails, cloud… et les textes officiels de l'association."
      />

      <div className="container-site">
        <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-2 lg:grid-cols-3">
          {sectionsWiki.map((section) => (
            <section key={section.slug} className="bg-ink p-7 sm:p-8">
              <h2 className="eyebrow">
                <span aria-hidden>› </span>
                {section.titre}
              </h2>
              <ul className="mt-5 space-y-1">
                {section.pages.map((page) => (
                  <li key={page.slug}>
                    <Link
                      href={cheminWiki(section.slug, page.slug)}
                      className="group -mx-3 block rounded-xl px-3 py-3 transition-colors hover:bg-ink-2"
                    >
                      <span className="flex items-center justify-between gap-4 font-semibold tracking-tight">
                        {page.titre}
                        <ArrowRightIcon
                          aria-hidden
                          size={16}
                          className="shrink-0 text-faint transition-[color,translate] group-hover:translate-x-0.5 group-hover:text-phosphor"
                        />
                      </span>
                      <span className="mt-1 block text-sm leading-relaxed text-muted">{page.resume}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
          <section className="flex flex-col justify-between gap-6 bg-ink-2 p-7 sm:p-8">
            <div>
              <h2 className="text-xl font-semibold tracking-tight">Une info manque ou n&apos;est plus à jour ?</h2>
              <p className="mt-3 leading-relaxed text-muted">
                Chaque page se modifie directement sur GitHub. Sinon, écris-nous et on s&apos;en occupe.
              </p>
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-3">
              <Link href="/contact/" className="link-arrow text-sm">
                Nous écrire
                <ArrowRightIcon aria-hidden size={14} />
              </Link>
              <a
                href={`${site.liens.depot}/tree/main/content/wiki`}
                target="_blank"
                rel="noopener"
                className="link-arrow text-sm"
              >
                Le wiki sur GitHub
                <ArrowUpRightIcon aria-hidden size={14} />
              </a>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
