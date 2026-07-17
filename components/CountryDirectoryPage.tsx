import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { DataDisclaimer } from "@/components/DataDisclaimer";
import { FaqList } from "@/components/FaqList";
import { JsonLd } from "@/components/JsonLd";
import {
  countryName,
  countryRoot,
  formatCount,
  getBrowseLetters,
  getCountryLocalities,
  getCountryPostcodes,
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
  const localities = getCountryLocalities(country);
  const regions = getRegions(country);
  const featuredRegions = regions.slice(0, 6);
  const featuredLocalities = localities.slice(0, 12);
  const faqs = [
    {
      question: `How do I search ${name} postcodes?`,
      answer: `Use the search page or browse ${name} by ${isNz ? "region and locality" : "state and suburb"} from this directory.`
    },
    {
      question: `Is the ${name} directory static?`,
      answer: "Yes. Pages are generated from local JSON data and exported as static files for GitHub Pages."
    },
    {
      question: "Is this an official postal authority?",
      answer: "No. AusNZ Postcode is an independent reference directory and is not affiliated with postal authorities or government agencies."
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
        <section className="mb-10 grid gap-4 lg:grid-cols-2">
          <div className="card-surface p-6">
            <p className="font-heading text-xs font-bold uppercase tracking-[0.12em] text-coral">Search demand</p>
            <h2 className="mt-2 font-heading text-2xl font-extrabold text-navy">Common {name} postcode lookups</h2>
            <p className="mt-3 text-sm leading-6 text-muted">
              Start with major {isNz ? "regions and localities" : "states and suburbs"}, then move into postcode pages for maps, nearby places, related localities, and source notes.
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
              These pages help searchers find direct answers such as which postcode belongs to a suburb, town, city centre, or delivery locality.
            </p>
            <div className="mt-5 grid gap-2 sm:grid-cols-2">
              {featuredLocalities.map((item) => (
                <Link key={item.slug} href={localityPath(item)} className="rounded-lg border border-border bg-ash px-3 py-2 text-sm font-semibold text-text transition hover:border-coral hover:bg-white hover:text-coral">
                  {item.name}
                  <span className="ml-2 text-xs font-normal text-muted">{item.postcode}</span>
                </Link>
              ))}
            </div>
          </div>
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
