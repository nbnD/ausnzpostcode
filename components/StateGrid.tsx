import Link from "next/link";
import type { RegionSummary } from "@/data/postcodes";
import { formatCount, statePath } from "@/data/postcodes";

type StateGridProps = {
  title: string;
  items: RegionSummary[];
  accent: "au" | "nz";
};

export function StateGrid({ title, items, accent }: StateGridProps) {
  const hoverClass = accent === "nz" ? "hover:border-green hover:shadow-premium" : "hover:border-coral hover:shadow-coral";
  const countClass = accent === "nz" ? "text-green" : "text-coral";
  const gridClass = accent === "nz" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" : "grid-cols-2 sm:grid-cols-4 lg:grid-cols-8";
  const titleClass = accent === "nz" ? "text-base leading-snug" : "text-2xl";

  return (
    <div aria-label={title} className={`grid gap-3 ${gridClass}`}>
      {items.map((item) => (
        <Link
          key={item.abbr ?? item.name}
          href={statePath(accent, item.abbr ?? item.name)}
          className={`flex min-h-[116px] min-w-0 flex-col justify-center rounded-[10px] border border-border bg-white p-4 text-center transition hover:-translate-y-0.5 ${hoverClass}`}
        >
          <span className={`block min-w-0 break-words font-heading font-extrabold text-navy [overflow-wrap:anywhere] ${titleClass}`}>
            {item.abbr ?? item.name}
          </span>
          <span className="mt-1 block text-xs font-medium leading-snug text-muted">
            {item.abbr ? item.name : item.island}
          </span>
          <span className={`mt-1 block text-xs font-bold ${countClass}`}>
            {formatCount(item.count)}
          </span>
        </Link>
      ))}
    </div>
  );
}
