import Link from "next/link";
import type { ReactNode } from "react";

type CardProps = {
  eyebrow?: string;
  title: string;
  href?: string;
  children: ReactNode;
};

export function Card({ eyebrow, title, href, children }: CardProps) {
  const content = (
    <div className="h-full rounded-[10px] border border-border bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-coral hover:shadow-coral">
      {eyebrow ? (
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-coral">
          {eyebrow}
        </p>
      ) : null}
      <h3 className="font-heading text-lg font-bold text-navy">{title}</h3>
      <div className="mt-3 text-sm leading-6 text-muted">{children}</div>
    </div>
  );

  if (!href) {
    return content;
  }

  return (
    <Link href={href} className="block h-full">
      {content}
    </Link>
  );
}
