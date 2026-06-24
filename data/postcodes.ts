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
