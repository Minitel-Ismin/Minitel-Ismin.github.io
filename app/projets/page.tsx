import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { ProjectsExplorer } from "@/components/projects-explorer";
import { projets } from "@/content/projets";

export const metadata: Metadata = {
  title: "Nos projets",
  description: "Tournois, formations, hackathons : les projets et événements organisés par MINITEL.",
};

export default function PageProjets() {
  return (
    <>
      <PageHeader
        eyebrow="Nos projets"
        title="Ce qu'on organise"
        intro="Tournois, formations, hackathons : les projets portés par l'asso, en cours et passés."
      />
      <ProjectsExplorer projets={projets} />
    </>
  );
}
