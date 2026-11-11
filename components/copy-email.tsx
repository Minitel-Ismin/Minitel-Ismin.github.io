"use client";

import { CheckIcon, CopyIcon } from "@phosphor-icons/react/dist/ssr";
import { useState } from "react";

export function CopyEmail({ email }: { email: string }) {
  const [copie, setCopie] = useState(false);

  async function copier() {
    try {
      await navigator.clipboard.writeText(email);
      setCopie(true);
      window.setTimeout(() => setCopie(false), 2000);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  }

  return (
    <button
      type="button"
      onClick={copier}
      className="inline-flex items-center gap-1.5 rounded-md border border-line-strong px-2.5 py-1 font-mono text-xs text-muted transition-colors hover:border-phosphor hover:text-phosphor"
    >
      {copie ? <CheckIcon aria-hidden size={14} /> : <CopyIcon aria-hidden size={14} />}
      <span aria-live="polite">{copie ? "Copié" : "Copier"}</span>
    </button>
  );
}
