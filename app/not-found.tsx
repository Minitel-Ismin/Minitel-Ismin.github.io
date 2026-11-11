import type { Metadata } from "next";
import Link from "next/link";
import { LegacyRedirect } from "@/components/legacy-redirect";

export const metadata: Metadata = {
  title: "Page introuvable",
};

export default function PageIntrouvable() {
  return (
    <section className="container-site flex min-h-[60dvh] flex-col justify-center py-24">
      <LegacyRedirect />
      <p className="font-pixel text-[clamp(5rem,18vw,11rem)] leading-none text-phosphor [text-shadow:0_0_24px_rgb(105_255_10/0.45)]">
        404
      </p>
      <h1 className="mt-6 text-3xl font-bold tracking-tight sm:text-5xl">
        Connexion perdue avec cette page.
      </h1>
      <p className="mt-5 max-w-[50ch] text-lg leading-relaxed text-muted">
        Elle n&apos;existe pas, ou plus. Le lien est peut-être ancien : le site a été refait.
      </p>
      <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
        <Link href="/" className="btn-primary">
          Retour à l&apos;accueil
        </Link>
        <Link href="/projets/" className="link-arrow">
          Voir les projets
        </Link>
        <Link href="/contact/" className="link-arrow">
          Nous écrire
        </Link>
      </div>
    </section>
  );
}
