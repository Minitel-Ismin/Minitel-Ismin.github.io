type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  intro?: React.ReactNode;
  children?: React.ReactNode;
  /** Pose le contenu sur un panneau de verre sombre (pages à fond chargé). */
  panneau?: boolean;
};

export function PageHeader({ eyebrow, title, intro, children, panneau }: PageHeaderProps) {
  return (
    <header className="container-site pt-16 pb-12 sm:pt-24 sm:pb-16">
      <div className={panneau ? "panneau max-w-4xl p-6 sm:p-10" : undefined}>
        {eyebrow && (
          <p className="rise font-mono text-xs tracking-widest text-phosphor uppercase">
            <span aria-hidden>› </span>
            {eyebrow}
          </p>
        )}
        <h1
          className={`rise max-w-4xl text-4xl font-bold tracking-[-0.035em] leading-[1.02] sm:text-6xl ${eyebrow ? "mt-5" : ""}`}
          style={{ "--i": 1 } as React.CSSProperties}
        >
          {title}
        </h1>
        {intro && (
          <p
            className="rise mt-6 max-w-[62ch] text-lg leading-relaxed text-muted"
            style={{ "--i": 2 } as React.CSSProperties}
          >
            {intro}
          </p>
        )}
        {children}
      </div>
    </header>
  );
}
