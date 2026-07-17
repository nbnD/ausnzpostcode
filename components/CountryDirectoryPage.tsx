import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CityGuideLinks } from "@/components/CityGuideLinks";
import { DataDisclaimer } from "@/components/DataDisclaimer";
import { FaqList } from "@/components/FaqList";
import { JsonLd } from "@/components/JsonLd";
import { LocalityPostcodeLabel } from "@/components/LocalityPostcodeLabel";
import { getCityPages } from "@/data/city-pages";
import {
  countryName,
  countryRoot,
  formatCount,
  getBrowseLetters,
  getCountryLocalities,
  getCountryPostcodes,
  getDirectoryLocalities,
  getRegions,
  localityPath,
  postcodePath,
  statePath,
  type CountryCode
} from "@/data/postcodes";
import { breadcrumbSchema, faqSchema, placeSchema } from "@/lib/schema";

export function CountryDirectoryPage({ country }: { country: CountryCode }) {
  const name = countryName(country);
  const root = countryRoot(country);
  const isNz = country === "nz";
  const postcodes = getCountryPostcodes(country);
  const localities = getDirectoryLocalities(getCountryLocalities(country));
  const regions = getRegions(country);
  const featuredRegions = regions.slice(0, 6);
  const featuredLocalities = localities.slice(0, 12);
  const cities = getCityPages(country);
  const faqs = isNz
    ? [
        {
          question: "How many New Zealand postcodes are listed?",
          answer: `This directory lists ${formatCount(postcodes.length)} New Zealand postcode records and ${formatCount(localities.length)} related locality records across ${formatCount(regions.length)} regions.`
        },
        {
          question: "How do I find a New Zealand postcode for a locality?",
          answer: "Search by locality name, browse New Zealand regions, or open the A-Z locality directory to find matching postcode pages and nearby places where available."
        },
        {
          question: "Which New Zealand regions can I browse by postcode?",
          answer: "You can browse New Zealand postcode pages by region, including Auckland, Wellington, Canterbury and other regional directories linked from this page."
        },
        {
          question: "Can the same 4-digit postcode exist in Australia and New Zealand?",
          answer: "Yes. Australia and New Zealand both use 4-digit postcodes, so always check the country and locality before using a postcode for address research or delivery reference."
        },
        {
          question: "Is AusNZ Postcode an official New Zealand postal source?",
          answer: "No. AusNZ Postcode is an independent reference directory. For official delivery or address verification, check the relevant postal authority."
        }
      ]
    : [
        {
          question: "How many Australian postcodes are listed?",
          answer: `This directory lists ${formatCount(postcodes.length)} Australian postcode records and ${formatCount(localities.length)} related suburb and locality records across states and territories.`
        },
        {
          question: "How do I find an Australian postcode for a suburb?",
          answer: "Search by suburb name or postcode, browse by state or territory, or use the A-Z suburb directory to open postcode pages with map positions, nearby postcodes and source notes."
        },
        {
          question: "Which Australian states and territories can I browse by postcode?",
          answer: "You can browse postcode pages for New South Wales, Victoria, Queensland, South Australia, Western Australia, Tasmania, Northern Territory and Australian Capital Territory from this directory."
        },
        {
          question: "Can one Australian postcode cover multiple suburbs?",
          answer: "Yes. Many Australian postcodes cover multiple suburbs, towns or delivery localities. Postcode pages show the related suburb and locality names available in the source data."
        },
        {
          question: "Is AusNZ Postcode an official Australia Post source?",
          answer: "No. AusNZ Postcode is an independent reference directory. For official delivery or address verification, check the relevant postal authority."
        }
      ];

  const schema = [
    breadcrumbSchema([
      { name: "Home", href: "/" },
      { name, href: root }
    ]),
    faqSchema(faqs),
    placeSchema(name, root, `${name} postcode, ${isNz ? "locality" : "suburb"}, and region directory.`)
  ];

  return (
    <>
      <JsonLd data={schema} />
      <div className="border-b border-border bg-white px-4 py-2.5 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: name, href: root }]} />
        </div>
      </div>
      <section className="bg-[linear-gradient(135deg,#0B2545_0%,#112d5e_70%,#0B2545_100%)] px-4 py-12 text-white sm:px-6">
        <div className="mx-auto max-w-6xl">
          <p className={`font-heading text-xs font-bold uppercase tracking-[0.16em] ${isNz ? "text-[#4ADE80]" : "text-coral"}`}>
            {isNz ? "NZ" : "AU"} directory
          </p>
          <h1 className="mt-3 max-w-3xl font-heading text-4xl font-extrabold tracking-normal sm:text-5xl">
            {name} postcode directory
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-ice">
            Browse {formatCount(postcodes.length)} postcodes and {formatCount(localities.length)} {isNz ? "localities" : "suburbs"} by {isNz ? "region" : "state"}.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/search" className="btn-primary">Search postcodes</Link>
            <Link href={`${root}/${isNz ? "localities" : "suburbs"}`} className="rounded-lg border border-white/20 bg-white/10 px-5 py-3 font-heading text-sm font-bold text-white">
              Browse {isNz ? "localities" : "suburbs"}
            </Link>
          </div>
        </div>
      </section>
      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <section className="mb-10 grid gap-3 sm:grid-cols-3">
          {[
            [formatCount(postcodes.length), "postcodes"],
            [formatCount(localities.length), isNz ? "localities" : "suburbs"],
            [formatCount(regions.length), isNz ? "regions" : "states and territories"]
          ].map(([value, label]) => (
            <div key={label} className="card-surface p-5">
              <p className="font-heading text-3xl font-extrabold text-navy">{value}</p>
              <p className="mt-1 text-sm text-muted">{label}</p>
            </div>
          ))}
        </section>
        <section className="mb-10">
          <div className="mb-4 flex items-end justify-between gap-4">
            <div>
              <p className="font-heading text-xs font-bold uppercase tracking-[0.12em] text-coral">Browse</p>
              <h2 className="font-heading text-2xl font-extrabold text-navy">{isNz ? "Regions" : "States and territories"}</h2>
            </div>
            <Link href={`${root}/${isNz ? "localities" : "suburbs"}`} className="text-sm font-bold text-coral">A-Z browse</Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {regions.map((region) => (
              <Link key={region.name} href={statePath(country, region.abbr ?? region.name)} className="card-surface p-5">
                <p className="font-heading text-lg font-bold text-navy">{region.abbr ?? region.name}</p>
                <p className="mt-1 text-sm text-muted">{region.name}</p>
                <p className={`mt-3 text-sm font-bold ${isNz ? "text-green" : "text-coral"}`}>{formatCount(region.count)} postcodes</p>
              </Link>
            ))}
          </div>
        </section>
        <section className="mb-10">
          <h2 className="mb-4 font-heading text-2xl font-extrabold text-navy">Popular postcode pages</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {postcodes.slice(0, 12).map((postcode) => (
              <Link key={postcode.code} href={postcodePath(postcode)} className="card-surface p-5">
                <p className="font-heading text-2xl font-extrabold text-navy">{postcode.code}</p>
                <p className="mt-1 text-sm font-semibold text-text">{postcode.locality}</p>
                <p className="mt-1 text-xs text-muted">{postcode.stateFull}</p>
              </Link>
            ))}
          </div>
        </section>
        <section className="mb-10 grid items-start gap-4 lg:grid-cols-2">
          <div className="card-surface p-6">
            <p className="font-heading text-xs font-bold uppercase tracking-[0.12em] text-coral">Search demand</p>
            <h2 className="mt-2 font-heading text-2xl font-extrabold text-navy">Common {name} postcode lookups</h2>
            <p className="mt-3 text-sm leading-6 text-muted">
              {isNz
                ? "Explore high-demand New Zealand region and locality lookups, then open detailed postcode pages for coordinates, nearby postcodes, local place context and source notes."
                : "Explore high-demand Australian state and suburb lookups, then open detailed postcode pages for coordinates, nearby postcodes, local place context and source notes."}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {featuredRegions.map((region) => (
                <Link
                  key={region.name}
                  href={statePath(country, region.abbr ?? region.name)}
                  className="rounded-full border border-border bg-ash px-3 py-1.5 text-xs font-bold text-navy transition hover:border-coral hover:bg-white hover:text-coral"
                >
                  {region.name} postcodes
                </Link>
              ))}
            </div>
          </div>
          <div className="card-surface p-6">
            <p className="font-heading text-xs font-bold uppercase tracking-[0.12em] text-coral">A-Z shortcuts</p>
            <h2 className="mt-2 font-heading text-2xl font-extrabold text-navy">Browse by {isNz ? "locality" : "suburb"}</h2>
            <p className="mt-3 text-sm leading-6 text-muted">
              Use the A-Z directory to find postcode pages for {isNz ? "localities, towns, city centres and regional delivery areas" : "suburbs, towns, city centres and delivery localities"} with clear links to related maps, nearby postcodes and source notes.
            </p>
            <div className="mt-5 grid gap-2 sm:grid-cols-2">
              {featuredLocalities.map((item) => (
                <Link key={item.slug} href={localityPath(item)} className="rounded-lg border border-border bg-ash px-3 py-2 text-sm font-semibold text-text transition hover:border-coral hover:bg-white hover:text-coral">
                  <LocalityPostcodeLabel name={item.name} postcode={item.postcode} />
                </Link>
              ))}
            </div>
          </div>
        </section>
        <section className="mb-10">
          <h2 className="mb-4 font-heading text-2xl font-extrabold text-navy">Major city postcode guides</h2>
          <CityGuideLinks cities={cities} />
        </section>
        <section className="mb-10">
          <h2 className="mb-4 font-heading text-2xl font-extrabold text-navy">A-Z quick links</h2>
          <div className="flex flex-wrap gap-2">
            {getBrowseLetters(country, `${root}/${isNz ? "localities" : "suburbs"}`).map((item) => (
              <Link key={item.letter} href={item.href} className={`grid h-11 w-11 place-items-center rounded-lg border font-heading text-sm font-bold ${item.count ? "border-border bg-white text-navy hover:border-coral hover:text-coral" : "border-border bg-ash text-muted"}`}>
                {item.letter}
              </Link>
            ))}
          </div>
        </section>
        <div className="mb-10">
          <DataDisclaimer />
        </div>
        <section>
          <h2 className="mb-4 font-heading text-2xl font-extrabold text-navy">Frequently asked questions</h2>
          <FaqList items={faqs} />
        </section>
      </main>
    </>
  );
}
