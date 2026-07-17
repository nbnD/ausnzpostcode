import homepageIndex from "@/data/homepage_index.json";
import postcodeIndex from "@/data/postcode_index.json";

export type CountryCode = "au" | "nz";

export type PostcodeRecord = {
  code: string;
  locality: string;
  localities?: string[];
  localityCount?: number;
  state: string;
  stateFull: string;
  country: CountryCode;
  lga?: string;
  electorate?: string;
  type: string;
  remoteness?: string;
  lat: number;
  lng: number;
  nearby?: Array<{ code: string; name: string }>;
};

export type RegionSummary = {
  abbr?: string;
  name: string;
  island?: string;
  count: number;
};

export type LocalityRecord = {
  country: CountryCode;
  name: string;
  slug: string;
  postcode: string;
  state: string;
  stateFull: string;
  type: string;
  lat: number;
  lng: number;
};

export type BrowseLetter = {
  letter: string;
  count: number;
  href: string;
};

export type HomepageIndex = {
  stats: {
    auPostcodes: number;
    auLocalities: number;
    nzPostcodes: number;
    nzLocalities: number;
    countries: number;
  };
  auStates: Array<RegionSummary & { abbr: string }>;
  nzRegions: RegionSummary[];
  popular: PostcodeRecord[];
  hints: Record<CountryCode, string[]>;
};

export const postcodes = postcodeIndex as PostcodeRecord[];
export const homepageData = homepageIndex as HomepageIndex;
export const australiaStates = homepageData.auStates;
export const nzRegions = homepageData.nzRegions;

export function formatCount(value: number) {
  return value.toLocaleString("en-AU");
}

export function getDisplayLocality(postcode: PostcodeRecord) {
  if (postcode.localities?.includes("Sydney")) return "Sydney";
  if (postcode.localities?.includes("Melbourne")) return "Melbourne";
  if (postcode.localities?.includes("Brisbane")) return "Brisbane";
  if (postcode.localities?.includes("Perth")) return "Perth";
  if (postcode.localities?.includes("Adelaide")) return "Adelaide";
  if (postcode.localities?.includes("Auckland CBD")) return "Auckland CBD";
  if (postcode.localities?.includes("Wellington CBD")) return "Wellington CBD";
  if (postcode.localities?.includes("Christchurch CBD")) return "Christchurch CBD";

  return postcode.locality;
}

export function getLocalitySummary(postcode: PostcodeRecord) {
  const localities = postcode.localities ?? [postcode.locality];
  const shown = localities.slice(0, 4).join(", ");
  const remaining = localities.length - 4;

  return remaining > 0 ? `${shown} +${remaining} more` : shown;
}

export function countryName(country: CountryCode) {
  return country === "au" ? "Australia" : "New Zealand";
}

export function countryRoot(country: CountryCode) {
  return country === "au" ? "/au" : "/nz";
}

export function postcodePath(postcode: PostcodeRecord) {
  return `${countryRoot(postcode.country)}/postcode/${postcode.code}`;
}

export function statePath(country: CountryCode, state: string) {
  return country === "au" ? `/au/state/${slugify(state)}` : `/nz/region/${slugify(state)}`;
}

export function localityPath(locality: LocalityRecord) {
  return locality.country === "au" ? `/au/suburb/${locality.slug}` : `/nz/locality/${locality.slug}`;
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function findPostcode(country: CountryCode, code: string) {
  return postcodes.find((item) => item.country === country && item.code === code);
}

export function getCountryPostcodes(country: CountryCode) {
  return postcodes.filter((item) => item.country === country);
}

export function getRegions(country: CountryCode) {
  return country === "au" ? australiaStates : nzRegions;
}

export function findRegion(country: CountryCode, slug: string) {
  return getRegions(country).find((region) => slugify(region.abbr ?? region.name) === slug || slugify(region.name) === slug);
}

export function getPostcodesByRegion(country: CountryCode, region: string) {
  return getCountryPostcodes(country).filter((item) => item.state === region || item.stateFull === region);
}

const localityCandidates: LocalityRecord[] = postcodes.flatMap((postcode) => {
  const names = postcode.localities ?? [postcode.locality];
  return names.map((name) => ({
    country: postcode.country,
    name,
    slug: `${slugify(name)}-${postcode.code}`,
    postcode: postcode.code,
    state: postcode.state,
    stateFull: postcode.stateFull,
    type: postcode.type,
    lat: postcode.lat,
    lng: postcode.lng
  }));
});

export const localities: LocalityRecord[] = Array.from(
  new Map(localityCandidates.map((item) => [`${item.country}:${item.slug}`, item])).values()
);

export function getDirectoryLocalities(items: LocalityRecord[]) {
  const aliasSlugs = new Set<string>();
  const displayNames = new Map<string, string>();
  const groups = new Map<string, LocalityRecord[]>();

  for (const item of items) {
    const key = `${item.country}:${item.postcode}`;
    groups.set(key, [...(groups.get(key) ?? []), item]);
  }

  for (const group of groups.values()) {
    for (const shortName of group) {
      if (!isInitialism(shortName.name)) continue;

      const fullName = group.find((item) => item.slug !== shortName.slug && initialsFor(item.name) === shortName.name);
      if (!fullName) continue;

      aliasSlugs.add(shortName.slug);
      displayNames.set(fullName.slug, `${fullName.name} (${shortName.name})`);
    }
  }

  return items
    .filter((item) => !aliasSlugs.has(item.slug))
    .map((item) => displayNames.has(item.slug) ? { ...item, name: displayNames.get(item.slug)! } : item);
}

function isInitialism(value: string) {
  return /^[A-Z0-9]{2,8}$/.test(value);
}

function initialsFor(value: string) {
  return value
    .split(/[^A-Za-z0-9]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
}

export function getCountryLocalities(country: CountryCode) {
  return localities.filter((item) => item.country === country);
}

export function getLocalitiesForPostcode(country: CountryCode, code: string) {
  return localities.filter((item) => item.country === country && item.postcode === code);
}

export function getLocalitiesByRegion(country: CountryCode, region: string) {
  return getCountryLocalities(country).filter((item) => item.state === region || item.stateFull === region);
}

export function findLocality(country: CountryCode, slug: string) {
  return localities.find((item) => item.country === country && item.slug === slug);
}

export function getNearbyPostcodes(postcode: PostcodeRecord, limit = 8) {
  const codeNumber = Number(postcode.code);

  return getCountryPostcodes(postcode.country)
    .filter((item) => item.state === postcode.state && item.code !== postcode.code)
    .sort((a, b) => Math.abs(Number(a.code) - codeNumber) - Math.abs(Number(b.code) - codeNumber))
    .slice(0, limit);
}

export function getNearbyLocalities(locality: LocalityRecord, limit = 8) {
  return getCountryLocalities(locality.country)
    .filter((item) => item.state === locality.state && item.slug !== locality.slug)
    .sort((a, b) => Math.abs(Number(a.postcode) - Number(locality.postcode)) - Math.abs(Number(b.postcode) - Number(locality.postcode)))
    .slice(0, limit);
}

export function getBrowseLetters(country: CountryCode, basePath: string): BrowseLetter[] {
  const counts = getDirectoryLocalities(getCountryLocalities(country)).reduce<Record<string, number>>((acc, item) => {
    const letter = item.name.charAt(0).toUpperCase();
    if (/^[A-Z]$/.test(letter)) acc[letter] = (acc[letter] ?? 0) + 1;
    return acc;
  }, {});

  return "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((letter) => ({
    letter,
    count: counts[letter] ?? 0,
    href: `${basePath}#${letter}`
  }));
}

export function getSampleLocalities(country: CountryCode, limit = 24) {
  return getCountryLocalities(country)
    .filter((item, index, all) => all.findIndex((candidate) => candidate.name === item.name) === index)
    .slice(0, limit);
}
