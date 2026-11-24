import {
  ArrowUpRightIcon,
  EnvelopeSimpleIcon,
  InstagramLogoIcon,
  LinkedinLogoIcon,
} from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";
import { navigation, site } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="mt-28 border-t border-line bg-ink">
      <div className="container-site grid gap-12 py-16 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="font-mono text-sm font-bold tracking-[0.18em]">{site.nom}</p>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">{site.description}</p>
          <Image
            src="/img/logos/mines-blanc.png"
            alt="Mines Saint-Étienne"
            width={249}
            height={205}
            className="mt-8 h-12 w-auto opacity-70"
          />
        </div>

        <nav aria-label="Pied de page" className="md:col-span-3">
          <p className="font-mono text-xs uppercase tracking-widest text-faint">Plan du site</p>
          <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2.5 text-sm">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-muted transition-colors hover:text-paper">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-4">
          <p className="font-mono text-xs uppercase tracking-widest text-faint">Nous joindre</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              <a
                href={`mailto:${site.email}`}
                className="inline-flex items-center gap-2 text-muted transition-colors hover:text-phosphor"
              >
                <EnvelopeSimpleIcon aria-hidden size={16} />
                {site.email}
              </a>
            </li>
            <li>
              <a
                href={site.liens.instagram}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-2 text-muted transition-colors hover:text-phosphor"
              >
                <InstagramLogoIcon aria-hidden size={16} />
                @minitel.ismin
              </a>
            </li>
            <li>
              <a
                href={site.liens.linkedin}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-2 text-muted transition-colors hover:text-phosphor"
              >
                <LinkedinLogoIcon aria-hidden size={16} />
                Association MINITEL
              </a>
            </li>
            <li>
              <a
                href={site.liens.wiki}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-2 text-muted transition-colors hover:text-phosphor"
              >
                <ArrowUpRightIcon aria-hidden size={16} />
                Wiki de l&apos;association
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container-site flex flex-col gap-2 py-6 font-mono text-xs text-faint sm:flex-row sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.nom} · Campus Georges Charpak, Gardanne
          </p>
          <p>Association fondée en {site.fondation}</p>
        </div>
      </div>
    </footer>
  );
}
