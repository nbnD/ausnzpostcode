import Link from "next/link";
import { cityPath, type CityPageDefinition } from "@/data/city-pages";

type CityGuideLinksProps = {
  cities: CityPageDefinition[];
  compact?: boolean;
};

export function CityGuideLinks({ cities, compact = false }: CityGuideLinksProps) {
  if (!cities.length) return null;

  return (
    <div className={`grid gap-3 ${compact ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-4"}`}>
      {cities.map((city) => {
        const isNz = city.country === "nz";

        return (
          <Link key={city.slug} href={cityPath(city)} className="card-surface p-5">
            <p className="font-heading text-lg font-extrabold text-navy">{city.name}</p>
            <p className="mt-1 text-sm text-muted">{city.stateFull}</p>
            <p className={`mt-3 text-sm font-bold ${isNz ? "text-green" : "text-coralText"}`}>{city.pageLabel}</p>
          </Link>
        );
      })}
    </div>
  );
}
