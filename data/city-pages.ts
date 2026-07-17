import {
  countryRoot,
  formatCount,
  getCountryPostcodes,
  getDirectoryLocalities,
  localities,
  slugify,
  type CountryCode,
  type LocalityRecord,
  type PostcodeRecord
} from "@/data/postcodes";

export type CityPageDefinition = {
  country: CountryCode;
  name: string;
  slug: string;
  state?: string;
  stateFull: string;
  matchTerms?: string[];
  pageLabel: string;
  description: string;
};

export const cityPages: CityPageDefinition[] = [
  {
    country: "au",
    name: "Sydney",
    slug: "sydney-postcodes",
    state: "NSW",
    stateFull: "New South Wales",
    matchTerms: ["SYDNEY"],
    pageLabel: "Sydney postcodes",
    description: "Sydney is New South Wales' largest city and Australia's best-known harbour city, covering the CBD, inner suburbs, business districts, universities, hospitals and surrounding metropolitan localities."
  },
  {
    country: "au",
    name: "Melbourne",
    slug: "melbourne-postcodes",
    state: "VIC",
    stateFull: "Victoria",
    matchTerms: ["MELBOURNE"],
    pageLabel: "Melbourne postcodes",
    description: "Melbourne is Victoria's capital city, with postcode coverage across the CBD, inner suburbs, universities, major hospitals, airport areas and central business delivery zones."
  },
  {
    country: "au",
    name: "Brisbane",
    slug: "brisbane-postcodes",
    state: "QLD",
    stateFull: "Queensland",
    matchTerms: ["BRISBANE"],
    pageLabel: "Brisbane postcodes",
    description: "Brisbane is Queensland's capital city, covering central business areas, riverside suburbs, airport precincts, markets, hospitals and nearby urban localities."
  },
  {
    country: "au",
    name: "Perth",
    slug: "perth-postcodes",
    state: "WA",
    stateFull: "Western Australia",
    matchTerms: ["PERTH"],
    pageLabel: "Perth postcodes",
    description: "Perth is Western Australia's capital city, with postcodes across the CBD, inner suburbs, Kings Park, business delivery zones and nearby metropolitan localities."
  },
  {
    country: "au",
    name: "Adelaide",
    slug: "adelaide-postcodes",
    state: "SA",
    stateFull: "South Australia",
    matchTerms: ["ADELAIDE"],
    pageLabel: "Adelaide postcodes",
    description: "Adelaide is South Australia's capital city, covering the CBD, North Adelaide, university areas, airport precincts, business delivery zones and surrounding localities."
  },
  {
    country: "nz",
    name: "Auckland",
    slug: "auckland-postcodes",
    stateFull: "Auckland",
    pageLabel: "Auckland postcodes",
    description: "Auckland is New Zealand's largest urban region, spanning central Auckland, North Shore, West Auckland, South Auckland, airport areas, coastal suburbs and surrounding localities."
  },
  {
    country: "nz",
    name: "Wellington",
    slug: "wellington-postcodes",
    stateFull: "Wellington",
    pageLabel: "Wellington postcodes",
    description: "Wellington is New Zealand's capital region, covering central Wellington, harbour suburbs, Hutt Valley localities, Porirua, Kapiti Coast and surrounding communities."
  },
  {
    country: "nz",
    name: "Christchurch",
    slug: "christchurch-postcodes",
    stateFull: "Canterbury",
    matchTerms: ["CHRISTCHURCH"],
    pageLabel: "Christchurch postcodes",
    description: "Christchurch is the largest city in Canterbury and the South Island, with postcodes across the central city, suburban areas, business districts and nearby localities."
  }
];

export function getCityPages(country?: CountryCode) {
  return country ? cityPages.filter((city) => city.country === country) : cityPages;
}

export function findCityPage(country: CountryCode, slug: string) {
  return cityPages.find((city) => city.country === country && city.slug === slug);
}

export function cityPath(city: CityPageDefinition) {
  return `${countryRoot(city.country)}/city/${city.slug}`;
}

export function getCityPostcodes(city: CityPageDefinition) {
  return getCountryPostcodes(city.country)
    .filter((postcode) => postcode.stateFull === city.stateFull || postcode.state === city.state)
    .filter((postcode) => matchesCityTerms(city, postcode))
    .sort((a, b) => a.code.localeCompare(b.code));
}

export function getCityLocalities(city: CityPageDefinition) {
  const postcodeCodes = new Set(getCityPostcodes(city).map((postcode) => postcode.code));
  const seen = new Set<string>();

  const items = localities
    .filter((locality) => locality.country === city.country && postcodeCodes.has(locality.postcode))
    .filter((locality) => {
      const key = `${slugify(locality.name)}-${locality.postcode}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .sort((a, b) => a.name.localeCompare(b.name) || a.postcode.localeCompare(b.postcode));

  return getDirectoryLocalities(items);
}

export function buildCityFaqs({
  city,
  postcodes,
  cityLocalities
}: {
  city: CityPageDefinition;
  postcodes: PostcodeRecord[];
  cityLocalities: LocalityRecord[];
}) {
  const countryName = city.country === "au" ? "Australia" : "New Zealand";
  const localityLabel = city.country === "au" ? "suburbs and localities" : "localities";

  return [
    {
      question: `How many postcodes are listed for ${city.name}?`,
      answer: `${city.name} has ${formatCount(postcodes.length)} indexed postcodes in this ${countryName} city guide.`
    },
    {
      question: `What ${localityLabel} are included in the ${city.name} postcode guide?`,
      answer: `This page links ${formatCount(cityLocalities.length)} related ${localityLabel} records for ${city.name}, with postcode cards and A-Z style locality shortcuts.`
    },
    {
      question: `How do I find a ${city.name} postcode?`,
      answer: `Use the postcode cards on this page, open a related ${city.country === "au" ? "suburb" : "locality"}, or search by postcode, place name, state, or region.`
    },
    {
      question: `Is ${city.name} postcode information official?`,
      answer: "AusNZ Postcode is an independent postcode reference. For official delivery or address verification, check the relevant postal authority."
    }
  ];
}

function matchesCityTerms(city: CityPageDefinition, postcode: PostcodeRecord) {
  if (!city.matchTerms?.length) return true;

  const names = postcode.localities ?? [postcode.locality];
  return names.some((name) => city.matchTerms?.some((term) => name.toUpperCase().includes(term)));
}
