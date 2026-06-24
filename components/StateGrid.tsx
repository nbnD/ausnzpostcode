import Link from "next/link";
import type { RegionSummary } from "@/data/postcodes";
import { formatCount } from "@/data/postcodes";

type StateGridProps = {
  title: string;
  items: RegionSummary[];
  accent: "au" | "nz";
};

export function StateGrid({ title, items, accent }: StateGridProps) {
  const hoverClass = accent === "nz" ? "hover:border-green hover:shadow-premium" : "hover:border-coral hover:shadow-coral";
  const countClass = accent === "nz" ? "text-green" : "text-coral";

  return (
    <div aria-label={title} className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
      {items.map((item) => (
        <Link
          key={item.abbr ?? item.name}
          href={`/search?q=${encodeURIComponent(item.abbr ?? item.name)}`}
          className={`rounded-[10px] border border-border bg-white p-4 text-center transition hover:-translate-y-0.5 ${hoverClass}`}
        >
          <span className="block font-heading text-2xl font-extrabold text-navy">
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
