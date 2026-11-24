import { CaretDownIcon } from "@phosphor-icons/react/dist/ssr";

// Briques communes aux formulaires (contact, réservation de la 1100).

export function classeChamp(erreur?: string) {
  return `w-full rounded-lg border bg-ink-2 px-4 py-3 text-paper placeholder:text-faint transition-colors focus:outline-none [color-scheme:dark] ${
    erreur ? "border-error focus:border-error" : "border-line-strong focus:border-phosphor"
  }`;
}

// Attributs d'accessibilité à poser sur l'input d'un champ en erreur.
export function ariaErreur(id: string, erreur?: string) {
  return {
    "aria-invalid": Boolean(erreur),
    "aria-describedby": erreur ? `${id}-erreur` : undefined,
  };
}

type ChampProps = {
  id: string;
  label: string;
  erreur?: string;
  facultatif?: boolean;
  className?: string;
  children: React.ReactNode;
};

export function Champ({ id, label, erreur, facultatif, className, children }: ChampProps) {
  return (
    <div className={className}>
      <label htmlFor={id} className="font-mono text-xs tracking-widest text-muted uppercase">
        {label}
        {facultatif && <span className="tracking-normal text-faint normal-case"> (facultatif)</span>}
      </label>
      <div className="mt-2">{children}</div>
      {erreur && (
        <p id={`${id}-erreur`} className="mt-2 text-sm text-error">
          {erreur}
        </p>
      )}
    </div>
  );
}

export function ListeDeroulante({
  id,
  options,
  erreur,
  ...props
}: { id: string; options: readonly string[]; erreur?: string } & React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div className="relative">
      <select id={id} name={id} {...props} {...ariaErreur(id, erreur)} className={`${classeChamp(erreur)} appearance-none pr-11`}>
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
      <CaretDownIcon
        aria-hidden
        size={18}
        className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-muted"
      />
    </div>
  );
}
