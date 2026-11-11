import { ArrowUpRightIcon, InstagramLogoIcon, LinkedinLogoIcon } from "@phosphor-icons/react/dist/ssr";
import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { CopyEmail } from "@/components/copy-email";
import { PageHeader } from "@/components/page-header";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Nous contacter",
  description: "Écrire à MINITEL : problème de connexion, événement, formation ou partenariat.",
};

export default function PageContact() {
  return (
    <>
      <PageHeader
        eyebrow="Nous contacter"
        title="Écrire à MINITEL"
        intro="Un problème de connexion, une question sur un événement, une idée de partenariat : écris-nous."
      />

      <div className="container-site grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <ContactForm email={site.email} />
        </div>

        <aside className="space-y-10 lg:col-span-4 lg:col-start-9">
          <div>
            <h2 className="font-mono text-xs tracking-widest text-faint uppercase">Email</h2>
            <a
              href={`mailto:${site.email}`}
              className="mt-3 block text-lg font-medium break-all transition-colors hover:text-phosphor"
            >
              {site.email}
            </a>
            <div className="mt-3">
              <CopyEmail email={site.email} />
            </div>
          </div>

          <div>
            <h2 className="font-mono text-xs tracking-widest text-faint uppercase">Réseaux</h2>
            <ul className="mt-3 space-y-2">
              <li>
                <a
                  href={site.liens.instagram}
                  target="_blank"
                  rel="noopener"
                  className="inline-flex items-center gap-2.5 transition-colors hover:text-phosphor"
                >
                  <InstagramLogoIcon aria-hidden size={20} />
                  @minitel.ismin
                </a>
              </li>
              <li>
                <a
                  href={site.liens.linkedin}
                  target="_blank"
                  rel="noopener"
                  className="inline-flex items-center gap-2.5 transition-colors hover:text-phosphor"
                >
                  <LinkedinLogoIcon aria-hidden size={20} />
                  Association MINITEL
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-mono text-xs tracking-widest text-faint uppercase">Adresse</h2>
            <address className="mt-3 leading-relaxed text-muted not-italic">
              {site.adresse.lignes.map((ligne) => (
                <span key={ligne} className="block">
                  {ligne}
                </span>
              ))}
            </address>
          </div>

          <a
            href={site.liens.wiki}
            target="_blank"
            rel="noopener"
            className="group block rounded-2xl border border-line bg-ink-2 p-6 transition-colors hover:border-phosphor/50"
          >
            <span className="flex items-start justify-between gap-4 font-semibold">
              Avant d&apos;écrire
              <ArrowUpRightIcon
                aria-hidden
                size={18}
                className="shrink-0 text-faint transition-colors group-hover:text-phosphor"
              />
            </span>
            <span className="mt-2 block text-sm leading-relaxed text-muted">
              Eduroam, VPN de l&apos;école, imprimantes : la réponse est peut-être déjà sur le
              wiki.
            </span>
          </a>
        </aside>
      </div>
    </>
  );
}
