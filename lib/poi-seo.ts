import type { NearbyPoi, PoiCategory } from "@/lib/poi-data";

export const poiCategoryLabels: Record<PoiCategory, { singular: string; plural: string; fallback: string }> = {
  "public-bbq": {
    singular: "mapped public BBQ location",
    plural: "mapped public BBQ locations",
    fallback: "Public BBQ location"
  },
  park: { singular: "park", plural: "parks", fallback: "Park" },
  "dog-park": { singular: "dog park", plural: "dog parks", fallback: "Dog park" },
  playground: { singular: "playground", plural: "playgrounds", fallback: "Playground" },
  "picnic-site": { singular: "picnic site", plural: "picnic sites", fallback: "Picnic site" },
  viewpoint: { singular: "viewpoint", plural: "viewpoints", fallback: "Viewpoint" },
  museum: { singular: "museum", plural: "museums", fallback: "Museum" }
};

export const poiPreviewCategoryOrder: PoiCategory[] = [
  "park",
  "public-bbq",
  "playground",
  "dog-park",
  "picnic-site",
  "viewpoint",
  "museum"
];

export function buildPoiSummary({
  postcode,
  locality,
  counts
}: {
  postcode: string;
  locality: string;
  counts: Partial<Record<PoiCategory, number>>;
}) {
  const phrases = getPoiCountPhrases(counts);

  if (phrases.length === 0) {
    return `No nearby place results are currently available for postcode ${postcode} in this dataset.`;
  }

  return `Around ${locality} postcode ${postcode}, this directory highlights ${joinPhrases(phrases)}, ranked by distance from the postcode centre.`;
}

export function buildPoiMetaDescription({
  postcode,
  locality,
  stateFull,
  baseDescription,
  counts,
  areaDescription
}: {
  postcode: string;
  locality: string;
  stateFull: string;
  baseDescription: string;
  counts: Partial<Record<PoiCategory, number>>;
  areaDescription?: string;
}) {
  const phrases = getPoiCountPhrases(counts).slice(0, 3);
  if (phrases.length === 0) return baseDescription;

  return `Postcode ${postcode} covers ${locality} in ${stateFull}${areaDescription ? `, with ${areaDescription}` : ""}. Nearby place results include ${joinPhrases(phrases)}, ranked by distance from the postcode centre.`;
}

export function getPreviewPlaces(places: NearbyPoi[], limit: number) {
  return [...places]
    .sort((a, b) => {
      const named = Number(Boolean(b.name)) - Number(Boolean(a.name));
      if (named !== 0) return named;
      return a.distanceKm - b.distanceKm;
    })
    .slice(0, limit);
}

export function displayPoiName(place: Pick<NearbyPoi, "name" | "category">) {
  return place.name?.trim() || poiCategoryLabels[place.category].fallback;
}

export function poiLabelFor(category: PoiCategory, count: number) {
  return count === 1 ? poiCategoryLabels[category].singular : poiCategoryLabels[category].plural;
}

export function poiCategoryTitle(category: PoiCategory) {
  return poiCategoryLabels[category].singular.replace(/^mapped /, "").replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export function getPoiCountPhrases(counts: Partial<Record<PoiCategory, number>>) {
  return poiPreviewCategoryOrder
    .filter((category) => (counts[category] ?? 0) > 0)
    .map((category) => `${counts[category]} ${poiLabelFor(category, counts[category] ?? 0)}`);
}

function joinPhrases(phrases: string[]) {
  if (phrases.length <= 1) return phrases[0] ?? "";
  if (phrases.length === 2) return `${phrases[0]} and ${phrases[1]}`;
  return `${phrases.slice(0, -1).join(", ")} and ${phrases[phrases.length - 1]}`;
}
