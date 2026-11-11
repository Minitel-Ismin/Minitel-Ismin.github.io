"use client";

import { PaperPlaneTiltIcon } from "@phosphor-icons/react/dist/ssr";
import { useState } from "react";
import { ariaErreur, Champ, classeChamp, ListeDeroulante } from "@/components/champ";
import { EnvoiMessagerie } from "@/components/envoi-messagerie";
import { type Message, ouvrirMessagerie } from "@/lib/messagerie";

const SUJETS = ["Problème de connexion", "Événement / gaming", "Formation", "Partenariat", "Autre"];

type Erreurs = Partial<Record<"nom" | "message", string>>;

export function ContactForm({ email }: { email: string }) {
  const [erreurs, setErreurs] = useState<Erreurs>({});
  const [envoye, setEnvoye] = useState<Message | null>(null);

  function envoyer(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const donnees = new FormData(e.currentTarget);
    const nom = String(donnees.get("nom") ?? "").trim();
    const sujet = String(donnees.get("sujet") ?? SUJETS[0]);
    const message = String(donnees.get("message") ?? "").trim();

    const nouvelles: Erreurs = {};
    if (nom.length < 2) nouvelles.nom = "Indique ton nom (2 caractères minimum).";
    if (message.length < 10) nouvelles.message = "Ton message doit faire au moins 10 caractères.";
    setErreurs(nouvelles);
    const premiere = Object.keys(nouvelles)[0];
    if (premiere) {
      e.currentTarget.querySelector<HTMLElement>(`[name="${premiere}"]`)?.focus();
      return;
    }

    const mail = { objet: `[Site] ${sujet} · ${nom}`, corps: `${message}\n\n${nom}` };
    ouvrirMessagerie(email, mail);
    setEnvoye(mail);
  }

  return (
    <form onSubmit={envoyer} noValidate className="space-y-6">
      <Champ id="nom" label="Nom et prénom" erreur={erreurs.nom}>
        <input
          id="nom"
          name="nom"
          autoComplete="name"
          placeholder="Prénom Nom"
          {...ariaErreur("nom", erreurs.nom)}
          className={classeChamp(erreurs.nom)}
        />
      </Champ>

      <Champ id="sujet" label="Sujet">
        <ListeDeroulante id="sujet" options={SUJETS} />
      </Champ>

      <Champ id="message" label="Message" erreur={erreurs.message}>
        <textarea
          id="message"
          name="message"
          rows={7}
          placeholder="Ton bâtiment, ton appareil, ce qui ne marche pas et depuis quand…"
          {...ariaErreur("message", erreurs.message)}
          className={`${classeChamp(erreurs.message)} resize-y`}
        />
      </Champ>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
        <button type="submit" className="btn-primary shrink-0 justify-center whitespace-nowrap">
          <PaperPlaneTiltIcon aria-hidden size={18} weight="bold" />
          Ouvrir ma messagerie
        </button>
        <p className="text-sm leading-snug text-faint">
          Le message s&apos;ouvre prêt à partir dans ton application mail.
        </p>
      </div>

      <div role="status">{envoye && <EnvoiMessagerie email={email} message={envoye} />}</div>
    </form>
  );
}
