"use client";

import { useState } from "react";
import { EnvoiMessagerie } from "@/components/envoi-messagerie";
import { formaterDateLongue } from "@/lib/dates";
import { EMAIL_VALIDE, type Message, ouvrirMessagerie } from "@/lib/messagerie";
import styles from "./reservation-form.module.css";

// Au-delà, on ne génère plus de champs : une demande plus grosse passe par un mail direct.
const MAX_PERSONNES = 30;

type Erreurs = Record<string, string>;

function aujourdhui() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

// Champ à libellé flottant : le libellé suit l'input pour que le CSS puisse réagir à son état.
function Champ({
  id,
  libelle,
  erreur,
  ...props
}: { id: string; libelle: string; erreur?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className={styles.groupe}>
      <input
        id={id}
        name={id}
        placeholder=" "
        {...props}
        aria-invalid={Boolean(erreur)}
        aria-describedby={erreur ? `${id}-erreur` : props["aria-describedby"]}
      />
      <label htmlFor={id} className={styles.libelle} data-text={libelle}>
        {libelle}
      </label>
      {erreur && (
        <p id={`${id}-erreur`} className={styles.erreur}>
          {erreur}
        </p>
      )}
    </div>
  );
}

// Formulaire de réservation de la 1100. Pas de serveur : la demande s'ouvre dans la messagerie
// de l'élève, prête à partir. Chaque personne en plus du demandeur doit être nommée.
export function ReservationForm({ email }: { email: string }) {
  const [erreurs, setErreurs] = useState<Erreurs>({});
  const [envoye, setEnvoye] = useState<Message | null>(null);
  const [nbPersonnes, setNbPersonnes] = useState("1");

  const total = Number.parseInt(nbPersonnes, 10);
  const enPlus = Number.isInteger(total) && total > 1 ? Math.min(total, MAX_PERSONNES) - 1 : 0;

  function envoyer(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const lire = (cle: string) => String(d.get(cle) ?? "").trim();
    const v = {
      prenom: lire("prenom"),
      nom: lire("nom"),
      email: lire("email"),
      date: lire("date"),
      debut: lire("debut"),
      fin: lire("fin"),
      personnes: Number(lire("personnes")),
      participants: Array.from({ length: enPlus }, (_, i) => lire(`participant-${i + 2}`)),
    };

    const nouvelles: Erreurs = {};
    if (v.prenom.length < 2) nouvelles.prenom = "Indique ton prénom.";
    if (v.nom.length < 2) nouvelles.nom = "Indique ton nom.";
    if (!EMAIL_VALIDE.test(v.email)) nouvelles.email = "Indique une adresse email valide.";
    if (!v.date) nouvelles.date = "Choisis une date.";
    else if (v.date < aujourdhui()) nouvelles.date = "Cette date est déjà passée.";
    if (!v.debut) nouvelles.debut = "Indique l'heure de début.";
    if (!v.fin) nouvelles.fin = "Indique l'heure de fin.";
    else if (v.fin === v.debut) nouvelles.fin = "La fin doit être différente du début.";
    if (!Number.isInteger(v.personnes) || v.personnes < 1 || v.personnes > MAX_PERSONNES)
      nouvelles.personnes = `Entre 1 et ${MAX_PERSONNES} personnes.`;
    v.participants.forEach((p, i) => {
      if (p.length < 2) nouvelles[`participant-${i + 2}`] = `Indique le nom de la personne ${i + 2}.`;
    });
    setErreurs(nouvelles);

    const premiere = Object.keys(nouvelles)[0];
    if (premiere) {
      e.currentTarget.querySelector<HTMLElement>(`[name="${premiere}"]`)?.focus();
      return;
    }

    const lendemain = v.fin < v.debut;
    const dateLisible = formaterDateLongue(v.date);
    const mail = {
      objet: `[Réservation 1100] ${dateLisible} · ${v.personnes} personne${v.personnes > 1 ? "s" : ""}`,
      corps: [
        "Demande de réservation de la 1100",
        "",
        `Prénom : ${v.prenom}`,
        `Nom : ${v.nom}`,
        `Email : ${v.email}`,
        `Date : ${dateLisible}`,
        `Horaire : ${v.debut} – ${v.fin}${lendemain ? " (le lendemain)" : ""}`,
        `Nombre de personnes : ${v.personnes}`,
        "",
        "Personnes présentes :",
        `- ${v.prenom} ${v.nom} (demandeur)`,
        ...v.participants.map((p) => `- ${p}`),
      ].join("\n"),
    };
    ouvrirMessagerie(email, mail);
    setEnvoye(mail);
  }

  return (
    <div className={styles.carte}>
      <div className={styles.entete}>
        <h1 className={styles.titre}>
          <svg viewBox="0 0 24 24" fill="none" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <polyline points="4 17 10 11 4 5" />
            <line x1="12" y1="19" x2="20" y2="19" />
          </svg>
          Réserver la 1100
        </h1>
        <div className={styles.points} aria-hidden>
          <span />
          <span />
          <span />
        </div>
      </div>

      <div className={styles.corps}>
        <form onSubmit={envoyer} noValidate>
          <div className={styles.paire}>
            <Champ id="prenom" libelle="Prénom" autoComplete="given-name" erreur={erreurs.prenom} />
            <Champ id="nom" libelle="Nom" autoComplete="family-name" erreur={erreurs.nom} />
          </div>
          <Champ id="email" libelle="Adresse mail" type="email" autoComplete="email" erreur={erreurs.email} />

          <Champ id="date" libelle="Date" type="date" erreur={erreurs.date} />
          <div className={styles.paire}>
            <Champ id="debut" libelle="Début" type="time" erreur={erreurs.debut} />
            <Champ id="fin" libelle="Fin" type="time" aria-describedby="fin-aide" erreur={erreurs.fin} />
          </div>
          <p id="fin-aide" className={styles.aide}>
            Une fin plus tôt que le début compte pour le lendemain (LAN de nuit).
          </p>

          <Champ
            id="personnes"
            libelle="Personnes (toi compris)"
            type="number"
            inputMode="numeric"
            min={1}
            max={MAX_PERSONNES}
            step={1}
            value={nbPersonnes}
            onChange={(e) => setNbPersonnes(e.target.value)}
            erreur={erreurs.personnes}
          />

          {enPlus > 0 && (
            <div className={styles.participants}>
              {Array.from({ length: enPlus }, (_, i) => {
                const id = `participant-${i + 2}`;
                return (
                  <Champ
                    key={id}
                    id={id}
                    libelle={`Personne ${i + 2} · nom`}
                    autoComplete="off"
                    erreur={erreurs[id]}
                  />
                );
              })}
            </div>
          )}

          <button type="submit" className={styles.envoyer} data-text="Envoyer la demande">
            <span className={styles.texteBouton}>Envoyer la demande</span>
          </button>
          <p className={styles.note}>Rien n&apos;est enregistré sur le site : la demande part par mail à l&apos;asso.</p>
        </form>

        <div role="status" className={styles.statut}>
          {envoye && <EnvoiMessagerie email={email} message={envoye} />}
        </div>
      </div>
    </div>
  );
}
