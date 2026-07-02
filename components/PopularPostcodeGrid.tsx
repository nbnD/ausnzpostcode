import Link from "next/link";
import { getDisplayLocality, postcodePath, type PostcodeRecord } from "@/data/postcodes";

type PopularPostcodeGridProps = {
  items: PostcodeRecord[];
};

export function PopularPostcodeGrid({ items }: PopularPostcodeGridProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => (
        <Link
          key={`${item.country}-${item.code}-${item.locality}`}
          href={postcodePath(item)}
          className="flex items-center gap-3 rounded-[10px] border border-border bg-white p-4 text-text transition hover:border-[#B0C4DE] hover:shadow-premium"
        >
          <span className={`min-w-12 font-heading text-xl font-extrabold ${item.country === "nz" ? "text-green" : "text-navy"}`}>
            {item.code}
          </span>
          <span className="flex-1">
            <span className="block text-sm font-semibold">{getDisplayLocality(item)}</span>
            <span className="block text-xs text-muted">{item.stateFull}</span>
          </span>
          <span className="text-xs font-bold text-muted">{item.country.toUpperCase()}</span>
        </Link>
      ))}
    </div>
  );
}
