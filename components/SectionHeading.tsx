import Link from "next/link";

type SectionHeadingProps = {
  title: string;
  eyebrow?: string;
  description?: string;
  href?: string;
  linkLabel?: string;
};

export function SectionHeading({
  title,
  eyebrow,
  description,
  href,
  linkLabel
}: SectionHeadingProps) {
  return (
    <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        {eyebrow ? (
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.12em] text-coralText">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="font-heading text-xl font-bold text-navy sm:text-2xl">{title}</h2>
        {description ? <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">{description}</p> : null}
      </div>
      {href && linkLabel ? (
        <Link href={href} className="text-sm font-bold text-coralText hover:underline">
          {linkLabel}
        </Link>
      ) : null}
    </div>
  );
}
