"use client";

import { CheckIcon, CopyIcon } from "@phosphor-icons/react/dist/ssr";
import { useState } from "react";
import type { Message } from "@/lib/messagerie";

// Affiché après l'envoi d'un formulaire : sans application mail configurée
// (webmail uniquement, PC de l'école…), le lien mailto ne fait rien.
// On laisse donc toujours la possibilité de copier le message.
export function EnvoiMessagerie({ email, message }: { email: string; message: Message }) {
  const [copie, setCopie] = useState(false);

  async function copier() {
    try {
      await navigator.clipboard.writeText(`Objet : ${message.objet}\n\n${message.corps}`);
      setCopie(true);
      window.setTimeout(() => setCopie(false), 2500);
    } catch {
      setCopie(false);
    }
  }

  return (
    <div className="rounded-2xl border border-phosphor/40 bg-phosphor-soft p-5 sm:p-6">
      <p className="font-medium text-paper">Ta messagerie devrait s&apos;ouvrir avec le message prêt à partir.</p>
      <p className="mt-2 text-sm leading-relaxed text-muted">
        Rien ne s&apos;ouvre ? Copie le message et envoie-le à{" "}
        <a href={`mailto:${email}`} className="text-phosphor underline underline-offset-4">
          {email}
        </a>{" "}
        depuis ta boîte mail.
      </p>
      <button
        type="button"
        onClick={copier}
        className="mt-4 inline-flex items-center gap-2 rounded-md border border-line-strong px-3 py-1.5 font-mono text-xs text-paper transition-colors hover:border-phosphor hover:text-phosphor"
      >
        {copie ? <CheckIcon aria-hidden size={14} /> : <CopyIcon aria-hidden size={14} />}
        <span aria-live="polite">{copie ? "Message copié" : "Copier le message"}</span>
      </button>
    </div>
  );
}
