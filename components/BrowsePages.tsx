import Link from "next/link";
import type { ReactNode } from "react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CityGuideLinks } from "@/components/CityGuideLinks";
import { DataDisclaimer } from "@/components/DataDisclaimer";
import { FaqList } from "@/components/FaqList";
import { JsonLd } from "@/components/JsonLd";
import { LocalityPostcodeLabel } from "@/components/LocalityPostcodeLabel";
import { PostcodePaginationGrid } from "@/components/PostcodePaginationGrid";
import { RegionPostcodeGrid } from "@/components/RegionPostcodeGrid";
import { getCityPages } from "@/data/city-pages";
import {
  countryName,
  countryRoot,
  findRegion,
  formatCount,
  getBrowseLetters,
  getCountryLocalities,
  getCountryPostcodes,
  getDirectoryLocalities,
  getLocalitiesByRegion,
  getPostcodesByRegion,
  localityPath,
  statePath,
  type CountryCode
} from "@/data/postcodes";
import { breadcrumbSchema, faqSchema, placeSchema } from "@/lib/schema";

function postcodeListFaqs(country: CountryCode, postcodeCount: number) {
  const name = countryName(country);
  const isNz = country === "nz";

  return isNz
    ? [
        {
          question: "How many New Zealand postcode pages are listed?",
          answer: `This directory includes ${formatCount(postcodeCount)} New Zealand postcode pages with locality, region and map-ready detail links.`
        },
        {
          question: "How do I find a New Zealand postcode?",
          answer: "Browse the postcode cards, use the New Zealand region pages, or search by postcode, locality, town, city centre or region name."
        },
        {
          question: "Do New Zealand postcodes cover multiple localities?",
          answer: "Some New Zealand postcode records can be associated with multiple localities or delivery areas, so postcode detail pages show the related locality names available in the source data."
        },
        {
          question: "Are these New Zealand postcode pages official?",
          answer: `AusNZ Postcode is an independent ${name} postcode reference. For official delivery or address verification, check the relevant postal authority.`
        }
      ]
    : [
        {
          question: "How many Australian postcode pages are listed?",
          answer: `This directory includes ${formatCount(postcodeCount)} Australian postcode pages with suburb, state, map position and nearby postcode links.`
        },
        {
          question: "How do I find an Australian postcode?",
          answer: "Browse the postcode cards, use the state and territory pages, or search by postcode, suburb, town, city centre or delivery locality."
        },
        {
          question: "Can one Australian postcode cover multiple suburbs?",
          answer: "Yes. Many Australian postcodes cover multiple suburbs, towns or delivery localities, and postcode detail pages show the related names available in the source data."
        },
        {
          question: "Are these Australian postcode pages official?",
          answer: `AusNZ Postcode is an independent ${name} postcode reference. For official delivery or address verification, check the relevant postal authority.`
        }
      ];
}

function localityListFaqs(country: CountryCode, localityCount: number) {
  const name = countryName(country);
  const isNz = country === "nz";

  return isNz
    ? [
        {
          question: "How many New Zealand localities are listed?",
          answer: `This directory includes ${formatCount(localityCount)} New Zealand locality records linked to postcode pages, region pages and map-ready locality detail pages.`
        },
        {
          question: "How do I find a New Zealand locality postcode?",
          answer: "Use the A-Z locality sections, open a locality card, or search by locality name to find its postcode and related region information."
        },
        {
          question: "Can the same New Zealand locality name appear in more than one place?",
          answer: "Some locality names may appear in more than one postcode or region, so each locality result includes its postcode to help distinguish the correct place."
        },
        {
          question: "Can I use this New Zealand locality directory for address verification?",
          answer: `Use this ${name} locality directory as a general reference only. For official delivery or address verification, check the relevant postal authority.`
        }
      ]
    : [
        {
          question: "How many Australian suburbs and localities are listed?",
          answer: `This directory includes ${formatCount(localityCount)} Australian suburb and locality records linked to postcode pages, state pages and map-ready locality detail pages.`
        },
        {
          question: "How do I find an Australian suburb postcode?",
          answer: "Use the A-Z suburb sections, open a suburb card, or search by suburb name to find its postcode and related state or territory information."
        },
        {
          question: "Can an Australian suburb or locality have more than one postcode?",
          answer: "Yes. Some Australian suburbs and delivery localities appear with more than one postcode, especially where street delivery, PO boxes or business delivery services differ."
        },
        {
          question: "Can I use this Australian suburb directory for address verification?",
          answer: `Use this ${name} suburb and locality directory as a general reference only. For official delivery or address verification, check the relevant postal authority.`
        }
      ];
}

function azFaqs(country: CountryCode, localityCount: number) {
  const isNz = country === "nz";
  const name = countryName(country);

  return [
    {
      question: `How do I use the ${name} A-Z postcode directory?`,
      answer: `Choose a letter to browse ${isNz ? "New Zealand localities" : "Australian suburbs and localities"} alphabetically, then open a result to view its postcode, region or state, map position and related pages.`
    },
    {
      question: `How many ${isNz ? "New Zealand localities" : "Australian suburbs and localities"} are in the A-Z directory?`,
      answer: `The A-Z directory links ${formatCount(localityCount)} ${isNz ? "New Zealand locality records" : "Australian suburb and locality records"} to postcode detail pages.`
    },
    {
      question: `Can I search instead of browsing the ${name} A-Z directory?`,
      answer: `Yes. Use search if you already know a postcode, ${isNz ? "locality" : "suburb"}, town, city centre, state or region name.`
    },
    {
      question: `Is the ${name} A-Z directory official?`,
      answer: "AusNZ Postcode is an independent postcode reference. For official delivery or address verification, check the relevant postal authority."
    }
  ];
}

function regionFaqs({
  country,
  regionName,
  countryName,
  postcodeCount,
  localityCount
}: {
  country: CountryCode;
  regionName: string;
  countryName: string;
  postcodeCount: number;
  localityCount: number;
}) {
  const isNz = country === "nz";
  const placeType = isNz ? "localities" : "suburbs";
  const areaType = isNz ? "region" : "state";

  return [
    {
      question: `How many postcodes are listed for ${regionName}?`,
      answer: `${regionName} has ${formatCount(postcodeCount)} indexed postcode pages in the ${countryName} directory.`
    },
    {
      question: `What ${placeType} are included in the ${regionName} postcode directory?`,
      answer: `This ${regionName} ${areaType} page includes ${formatCount(localityCount)} related ${placeType} records, with popular ${placeType} linked above the postcode list.`
    },
    {
      question: `How do I find a postcode in ${regionName}?`,
      answer: `Use the postcode cards on this page to open individual ${regionName} postcode pages, or use search to look up a postcode, ${isNz ? "locality" : "suburb"}, town, city centre, or region name.`
    },
    {
      question: `Is ${regionName} postcode information official?`,
      answer: `AusNZ Postcode is an independent ${countryName} postcode reference. For official delivery or address verification in ${regionName}, check the relevant postal authority.`
    }
  ];
}

const auRegionDescriptions: Record<string, string> = {
  ACT: "The Australian Capital Territory is centred on Canberra and includes national institutions, universities, government precincts, town centres and surrounding residential suburbs.",
  NSW: "New South Wales covers Sydney, coastal towns, regional cities, inland communities and rural delivery areas across the most populous state in Australia.",
  NT: "The Northern Territory covers Darwin, Alice Springs, remote communities, pastoral regions and large delivery areas across northern and central Australia.",
  QLD: "Queensland covers Brisbane, coastal cities, regional centres, island communities and inland towns across the state's tropical and subtropical regions.",
  SA: "South Australia covers Adelaide, wine regions, coastal towns, regional service centres and remote communities across the state's southern and inland areas.",
  TAS: "Tasmania covers Hobart, Launceston, coastal towns, island communities and regional localities across the state.",
  VIC: "Victoria covers Melbourne, Geelong, regional cities, coastal towns, alpine areas and rural communities across south-eastern Australia.",
  WA: "Western Australia covers Perth, regional cities, mining towns, coastal communities and remote delivery areas across Australia's largest state."
};

const nzRegionDescriptions: Record<string, string> = {
  Auckland: "Auckland is New Zealand's largest urban region, covering central Auckland, North Shore, West Auckland, South Auckland, airport areas, coastal suburbs and nearby communities.",
  Wellington: "Wellington covers New Zealand's capital city, harbour suburbs, Hutt Valley localities, Porirua, Kapiti Coast and surrounding communities.",
  Canterbury: "Canterbury covers Christchurch, the Canterbury Plains, alpine townships, coastal communities and rural localities across the central South Island.",
  "West Coast": "West Coast covers South Island coastal towns, glacier communities, rural settlements, national park gateways and remote localities along New Zealand's western coastline."
};

const nzPostcodeContextDescriptions: Record<string, string> = {
  Auckland: "Auckland postcode lookups often cover central Auckland, North Shore, West Auckland, South Auckland, airport areas and coastal suburbs. Use the postcode list below to open each area’s detail page.",
  "Bay of Plenty": "Bay of Plenty postcode lookups often cover Tauranga, Rotorua, Whakatane, coastal towns and inland communities. Use the postcode list below to open each area’s detail page.",
  Canterbury: "Canterbury postcode lookups often cover Christchurch, the Canterbury Plains, alpine townships and coastal communities. Use the postcode list below to open each area’s detail page.",
  Gisborne: "Gisborne postcode lookups often cover the city of Gisborne, East Coast settlements, rural communities and coastal localities. Use the postcode list below to open each area’s detail page.",
  "Hawke's Bay": "Hawke's Bay postcode lookups often cover Napier, Hastings, Havelock North, coastal communities and rural service towns. Use the postcode list below to open each area’s detail page.",
  "Manawatu-Wanganui": "Manawatu-Wanganui postcode lookups often cover Palmerston North, Whanganui, Feilding, rural towns and central North Island communities. Use the postcode list below to open each area’s detail page.",
  Marlborough: "Marlborough postcode lookups often cover Blenheim, Picton, vineyard areas, coastal settlements and rural localities. Use the postcode list below to open each area’s detail page.",
  Nelson: "Nelson postcode lookups often cover Nelson city, coastal suburbs, port areas and nearby communities around Tasman Bay. Use the postcode list below to open each area’s detail page.",
  Northland: "Northland postcode lookups often cover Whangarei, Bay of Islands communities, coastal towns and rural settlements across the far north. Use the postcode list below to open each area’s detail page.",
  Otago: "Otago postcode lookups often cover Dunedin, Queenstown, Wanaka, Central Otago towns, coastal communities and rural localities. Use the postcode list below to open each area’s detail page.",
  Southland: "Southland postcode lookups often cover Invercargill, Gore, Fiordland gateways, rural towns and southern coastal communities. Use the postcode list below to open each area’s detail page.",
  Taranaki: "Taranaki postcode lookups often cover New Plymouth, Stratford, Hawera, coastal communities and rural settlements around Mount Taranaki. Use the postcode list below to open each area’s detail page.",
  Tasman: "Tasman postcode lookups often cover Richmond, Motueka, Golden Bay, rural communities and coastal settlements around Tasman Bay. Use the postcode list below to open each area’s detail page.",
  Waikato: "Waikato postcode lookups often cover Hamilton, Cambridge, Te Awamutu, Matamata, rural towns and communities around the Waikato River. Use the postcode list below to open each area’s detail page.",
  Wellington: "Wellington postcode lookups often cover the capital city, harbour suburbs, Hutt Valley localities, Porirua and Kapiti Coast communities. Use the postcode list below to open each area’s detail page.",
  "West Coast": "West Coast postcode lookups often cover communities such as Greymouth, Hokitika, Westport and glacier townships. Use the postcode list below to open each area’s detail page."
};

function regionOverviewDescription({
  country,
  regionKey,
  regionName,
  postcodeCount,
  localityCount
}: {
  country: CountryCode;
  regionKey: string;
  regionName: string;
  postcodeCount: number;
  localityCount: number;
}) {
  const description = country === "au"
    ? auRegionDescriptions[regionKey] ?? `${regionName} covers suburbs, towns, regional centres and delivery localities across Australia.`
    : nzRegionDescriptions[regionName] ?? `${regionName} covers localities, towns, rural communities and delivery areas across New Zealand.`;
  const localityLabel = country === "au" ? "suburb and locality records" : "locality records";

  return `${description} This page lists ${formatCount(postcodeCount)} postcode pages and ${formatCount(localityCount)} related ${localityLabel}.`;
}

function postcodeContextDescription(country: CountryCode, regionName: string, regionKey: string) {
  if (country === "nz") {
    return nzPostcodeContextDescriptions[regionName] ?? `${regionName} postcode lookups cover localities, towns and rural delivery areas. Use the postcode list below to open detail pages.`;
  }

  if (regionKey === "ACT") {
    return "Use this section to compare ACT postcode areas across Canberra suburbs, national institutions, delivery localities and nearby postcode pages.";
  }

  return `Use this section to compare ${regionName} postcode areas across suburbs, towns, regional centres, delivery localities and nearby postcode pages.`;
}

export function PostcodeListPage({ country }: { country: CountryCode }) {
  const root = countryRoot(country);
  const name = countryName(country);
  const items = getCountryPostcodes(country);
  const faqs = postcodeListFaqs(country, items.length);
  const path = `${root}/postcodes`;

  return (
    <BrowseShell country={country} title={`${name} postcodes`} description={`Browse ${formatCount(items.length)} ${name} postcode pages.`} path={path} faqs={faqs}>
      <PostcodePaginationGrid items={items} />
    </BrowseShell>
  );
}

export function LocalityListPage({ country }: { country: CountryCode }) {
  const root = countryRoot(country);
  const isNz = country === "nz";
  const name = countryName(country);
  const items = getDirectoryLocalities(getCountryLocalities(country));
  const faqs = localityListFaqs(country, items.length);
  const path = `${root}/${isNz ? "localities" : "suburbs"}`;

  return (
    <BrowseShell country={country} title={`${name} ${isNz ? "localities" : "suburbs"}`} description={`Browse ${formatCount(items.length)} ${isNz ? "localities" : "suburbs"} across ${name}.`} path={path} faqs={faqs}>
      <div className="space-y-8">
        {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((letter) => {
          const letterItems = items.filter((item) => item.name.toUpperCase().startsWith(letter)).slice(0, 80);
          if (!letterItems.length) return null;
          return (
            <section key={letter} id={letter}>
              <h2 className="mb-3 font-heading text-xl font-extrabold text-navy">{letter}</h2>
              <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {letterItems.map((item) => (
                  <Link key={item.slug} href={localityPath(item)} className="rounded-lg border border-border bg-white p-3 text-sm font-semibold text-text transition hover:border-coral hover:text-coral">
                    <LocalityPostcodeLabel name={item.name} postcode={item.postcode} />
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </BrowseShell>
  );
}

export function AZPage({ country }: { country: CountryCode }) {
  const root = countryRoot(country);
  const isNz = country === "nz";
  const path = `${root}/a-z`;
  const localityCount = getDirectoryLocalities(getCountryLocalities(country)).length;
  const faqs = azFaqs(country, localityCount);

  return (
    <BrowseShell country={country} title={`${countryName(country)} A-Z directory`} description={`Jump to ${isNz ? "localities" : "suburbs"} by first letter.`} path={path} faqs={faqs}>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {getBrowseLetters(country, `${root}/${isNz ? "localities" : "suburbs"}`).map((item) => (
          <Link key={item.letter} href={item.href} className="card-surface p-5">
            <p className="font-heading text-3xl font-extrabold text-navy">{item.letter}</p>
            <p className="mt-1 text-sm text-muted">{formatCount(item.count)} entries</p>
          </Link>
        ))}
      </div>
    </BrowseShell>
  );
}

export function RegionListPage({ country, slug }: { country: CountryCode; slug: string }) {
  const region = findRegion(country, slug);
  if (!region) return null;

  const root = countryRoot(country);
  const name = countryName(country);
  const items = getPostcodesByRegion(country, region.abbr ?? region.name);
  const regionLocalities = getDirectoryLocalities(getLocalitiesByRegion(country, region.abbr ?? region.name));
  const regionCities = getCityPages(country).filter((city) => (city.state && city.state === region.abbr) || city.stateFull === region.name);
  const regionKey = region.abbr ?? region.name;
  const path = statePath(country, region.abbr ?? region.name);
  const faqs = regionFaqs({
    country,
    regionName: region.name,
    countryName: name,
    postcodeCount: items.length,
    localityCount: regionLocalities.length
  });

  return (
    <BrowseShell country={country} title={`${region.name} postcodes`} description={`Browse ${formatCount(items.length)} postcodes in ${region.name}, ${name}.`} path={path} faqs={faqs} regionName={region.name}>
      <section className="mb-8 grid items-start gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="grid gap-4">
          <div className="card-surface p-6">
            <p className="font-heading text-xs font-bold uppercase tracking-[0.12em] text-coral">
              {country === "nz" ? "Region overview" : "State overview"}
            </p>
            <h2 className="mt-2 font-heading text-2xl font-extrabold text-navy">
              Find postcodes in {region.name}
            </h2>
            <p className="mt-3 text-sm leading-6 text-muted">
              {regionOverviewDescription({
                country,
                regionKey,
                regionName: region.name,
                postcodeCount: items.length,
                localityCount: regionLocalities.length
              })}
            </p>
          </div>
          <div className="rounded-[14px] border border-border bg-white p-5 shadow-[0_10px_30px_rgba(11,37,69,0.06)]">
            <p className="font-heading text-xs font-bold uppercase tracking-[0.12em] text-coral">Postcode context</p>
            <h2 className="mt-2 font-heading text-xl font-extrabold text-navy">
              Compare {region.name} postcode areas
            </h2>
            <p className="mt-2 text-sm leading-6 text-muted">
              {postcodeContextDescription(country, region.name, regionKey)}
            </p>
            <div className="mt-4 grid grid-cols-2 gap-2">
              {[
                [formatCount(items.length), "postcode pages"],
                [formatCount(regionLocalities.length), country === "nz" ? "localities" : "suburbs/localities"],
                [region.name, country === "nz" ? "region" : "state"],
                [name, "country"]
              ].map(([value, label]) => (
                <div key={label} className="rounded-lg border border-border bg-ash px-3 py-2">
                  <p className="font-heading text-sm font-extrabold text-navy">{value}</p>
                  <p className="mt-0.5 text-[11px] font-semibold uppercase tracking-[0.06em] text-muted">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="card-surface p-6">
          <p className="font-heading text-xs font-bold uppercase tracking-[0.12em] text-coral">
            Popular {country === "nz" ? "localities" : "suburbs"}
          </p>
          <div className="mt-4 grid gap-2">
            {regionLocalities.slice(0, 8).map((item) => (
              <Link key={item.slug} href={localityPath(item)} className="rounded-lg border border-border bg-ash px-3 py-2 text-sm font-semibold text-text transition hover:border-coral hover:bg-white hover:text-coral">
                <LocalityPostcodeLabel name={item.name} postcode={item.postcode} />
              </Link>
            ))}
          </div>
        </div>
      </section>
      {regionCities.length > 0 ? (
        <section className="mb-8">
          <h2 className="mb-4 font-heading text-2xl font-extrabold text-navy">
            Major city guides in {region.name}
          </h2>
          <CityGuideLinks cities={regionCities} compact />
        </section>
      ) : null}
      <RegionPostcodeGrid items={items} />
      <div className="mt-8">
        <Link href={root} className="text-sm font-bold text-coral hover:underline">Back to {name}</Link>
      </div>
    </BrowseShell>
  );
}

function BrowseShell({
  country,
  title,
  description,
  path,
  faqs,
  regionName,
  children
}: {
  country: CountryCode;
  title: string;
  description: string;
  path: string;
  faqs: Array<{ question: string; answer: string }>;
  regionName?: string;
  children: ReactNode;
}) {
  const root = countryRoot(country);
  const name = countryName(country);
  const schema = [
    breadcrumbSchema([
      { name: "Home", href: "/" },
      { name, href: root },
      { name: regionName ?? title, href: path }
    ]),
    faqSchema(faqs),
    placeSchema(regionName ?? name, path, description)
  ];

  return (
    <>
      <JsonLd data={schema} />
      <div className="border-b border-border bg-white px-4 py-2.5 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: name, href: root }, { label: regionName ?? title, href: path }]} />
        </div>
      </div>
      <section className="bg-[linear-gradient(135deg,#0B2545_0%,#112d5e_100%)] px-4 py-10 text-white sm:px-6">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-sky">{name}</p>
          <h1 className="mt-3 font-heading text-4xl font-extrabold tracking-normal sm:text-5xl">{title}</h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-ice">{description}</p>
        </div>
      </section>
      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="mb-8">
          <DataDisclaimer />
        </div>
        {children}
        <section className="mt-10">
          <h2 className="mb-4 font-heading text-2xl font-extrabold text-navy">Frequently asked questions</h2>
          <FaqList items={faqs} />
        </section>
      </main>
    </>
  );
}
