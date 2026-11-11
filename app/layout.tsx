import type { Metadata, Viewport } from "next";
import { Geist, JetBrains_Mono, VT323 } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { site } from "@/content/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

const vt323 = VT323({
  variable: "--font-vt323",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.nom} · ${site.accroche}`,
    template: `%s · ${site.nom}`,
  },
  description: site.description,
  openGraph: {
    siteName: site.nom,
    locale: "fr_FR",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: `${site.nom} · ${site.accroche}` }],
  },
};

export const viewport: Viewport = {
  themeColor: "#0f110f",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${jetbrainsMono.variable} ${vt323.variable} antialiased`}
    >
      <body className="flex min-h-dvh flex-col">
        <a
          href="#contenu"
          className="sr-only z-[70] rounded-md bg-phosphor px-4 py-2 font-mono text-sm text-ink focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Aller au contenu
        </a>
        <SiteHeader />
        <main id="contenu" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
