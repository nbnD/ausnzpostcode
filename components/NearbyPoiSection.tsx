import type { NearbyPoi, PoiCategory, PoiManifest } from "../lib/poi-data";
import {
  buildPoiSummary,
  displayPoiName,
  getPreviewPlaces,
  poiCategoryTitle,
  poiLabelFor,
  poiPreviewCategoryOrder
} from "../lib/poi-seo";

type NearbyPoiSectionProps = {
  postcode: string;
  locality: string;
  places: NearbyPoi[];
  counts: Partial<Record<PoiCategory, number>>;
  manifest: PoiManifest | null;
};

export function NearbyPoiSection({ postcode, locality, places, counts, manifest }: NearbyPoiSectionProps) {
  if (places.length === 0 || !manifest) return null;

  const previews = getPreviewPlaces(places, 6);
  const summary = buildPoiSummary({ postcode, locality, counts });
  const generatedDate = formatGeneratedDate(manifest.generatedAt);

  return (
    <section className="mb-4 overflow-hidden rounded-[14px] border border-border bg-white">
      <div className="border-b border-border bg-[linear-gradient(135deg,#0B2545_0%,#112d5e_100%)] px-5 py-4">
        <p className="text-xs font-bold uppercase tracking-[0.08em] text-sky">OpenStreetMap nearby places</p>
        <h2 className="mt-1 font-heading text-xl font-extrabold text-white">Nearby parks, BBQs and places to visit</h2>
      </div>
      <div className="p-5">
        <p className="text-sm leading-6 text-text">{summary}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {Object.entries(counts)
            .filter(([, count]) => Number(count) > 0)
            .sort(([a], [b]) => poiPreviewCategoryOrder.indexOf(a as PoiCategory) - poiPreviewCategoryOrder.indexOf(b as PoiCategory))
            .map(([category, count]) => (
              <span key={category} className="rounded-full border border-border bg-ash px-3 py-1 text-xs font-semibold text-navy">
                {count} {poiLabelFor(category as PoiCategory, count ?? 0)}
              </span>
            ))}
        </div>
        <p className="mt-4 text-sm leading-6 text-muted">
          Use this section to compare nearby public facilities and visitor places around the postcode centre before opening the source record on OpenStreetMap.
        </p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {previews.map((place) => (
            <a
              key={place.id}
              href={place.osmUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-[12px] border border-border bg-ash p-4 transition hover:-translate-y-0.5 hover:border-coral hover:bg-white hover:shadow-[0_14px_34px_rgba(11,37,69,0.1)] focus:outline-none focus:ring-2 focus:ring-coral focus:ring-offset-2"
            >
              <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-coral">
                {poiCategoryTitle(place.category)}
              </span>
              <span className="mt-1 block font-heading text-sm font-extrabold text-navy group-hover:text-coral">
                {displayPoiName(place)}
              </span>
              <span className="mt-1 block text-xs text-muted">
                {place.distanceKm.toFixed(2)} km from this postcode centre · OpenStreetMap
              </span>
            </a>
          ))}
        </div>
        <div className="mt-5 rounded-[12px] border border-border bg-white p-4 text-xs leading-5 text-muted">
          <p>
            These are retained nearby OpenStreetMap results within the configured search radius for each category.
            They are matched by distance from the postcode centre and may not describe postal delivery areas.
          </p>
          <p className="mt-2">
            Dataset generated {generatedDate}. Place data © OpenStreetMap contributors, available under the ODbL.
            OpenStreetMap coverage may be incomplete or vary by area.
          </p>
        </div>
      </div>
    </section>
  );
}

function formatGeneratedDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(date);
}
