import type { Metadata } from "next";
import { FondPluie } from "@/components/fond-pluie";
import { ReservationForm } from "@/components/reservation-form";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Réserver la 1100",
  description: "Demander un créneau dans la 1100, la salle gaming gérée par MINITEL : LAN, tournoi, soirée jeux…",
};

export default function PageReserver() {
  return (
    <>
      <FondPluie />
      <div className="container-site rise pt-12 sm:pt-20">
        <ReservationForm email={site.email} />
      </div>
    </>
  );
}
