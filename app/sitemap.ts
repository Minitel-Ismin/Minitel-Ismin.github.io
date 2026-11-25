import type { MetadataRoute } from "next";
import { projets } from "@/content/projets";
import { navigation, site } from "@/content/site";
import { cheminWiki, pagesWiki } from "@/content/wiki";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...navigation.map((item) => ({ url: `${site.url}${item.href}` })),
    ...projets.map((p) => ({ url: `${site.url}/projets/${p.slug}/` })),
    ...pagesWiki.map((p) => ({ url: `${site.url}${cheminWiki(p.section.slug, p.slug)}` })),
  ];
}
