import Link from "next/link";

export function SectionHeader({
  title,
  href,
  linkLabel
}: {
  title: string;
  href?: string;
  linkLabel?: string;
}) {
  return (
    <div className="mb-5 flex items-center justify-between gap-4">
      <h2 className="flex items-center gap-2 font-heading text-lg font-bold text-navy">
        {title}
      </h2>
      {href && linkLabel ? (
        <Link href={href} className="text-sm font-semibold text-coral hover:underline">
          {linkLabel}
        </Link>
      ) : null}
    </div>
  );
}
