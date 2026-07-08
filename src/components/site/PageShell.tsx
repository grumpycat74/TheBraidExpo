import type { ReactNode } from "react";

export function PageHero({
  eyebrow,
  title,
  subtitle,
  children,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children?: ReactNode;
}) {
  return (
    <section className="border-b border-border/60 bg-secondary/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center">
        {eyebrow && <p className="editorial-eyebrow">{eyebrow}</p>}
        <h1 className="mt-3 font-serif text-4xl sm:text-6xl leading-[1.05]">{title}</h1>
        {subtitle && <p className="mt-5 max-w-2xl mx-auto text-muted-foreground text-base sm:text-lg leading-relaxed">{subtitle}</p>}
        {children && <div className="mt-8 flex flex-wrap justify-center gap-3">{children}</div>}
      </div>
    </section>
  );
}
