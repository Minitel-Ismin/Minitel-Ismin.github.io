import type { MetadataRoute } from "next";
import { projets } from "@/content/projets";
import { navigation, site } from "@/content/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...navigation.map((item) => ({ url: `${site.url}${item.href}` })),
    ...projets.map((p) => ({ url: `${site.url}/projets/${p.slug}/` })),
  ];
}
