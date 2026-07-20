import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { DataDisclaimer } from "@/components/DataDisclaimer";
import { FaqList } from "@/components/FaqList";
import { JsonLd } from "@/components/JsonLd";
import { LocalityPostcodeLabel } from "@/components/LocalityPostcodeLabel";
import {
  buildCityFaqs,
  cityPath,
  getCityLocalities,
  getCityPostcodes,
  type CityPageDefinition
} from "@/data/city-pages";
import {
  countryName,
  countryRoot,
  formatCount,
  getDisplayLocality,
  localityPath,
  postcodePath,
  statePath
} from "@/data/postcodes";
import { breadcrumbSchema, faqSchema, placeSchema } from "@/lib/schema";

export function CityLandingPage({ city }: { city: CityPageDefinition }) {
  const country = countryName(city.country);
  const root = countryRoot(city.country);
  const path = cityPath(city);
  const isNz = city.country === "nz";
  const postcodes = getCityPostcodes(city);
  const cityLocalities = getCityLocalities(city);
  const faqs = buildCityFaqs({ city, postcodes, cityLocalities });
  const stateHref = statePath(city.country, city.state ?? city.stateFull);
  const localityLabel = isNz ? "localities" : "suburbs";
  const schema = [
    breadcrumbSchema([
      { name: "Home", href: "/" },
      { name: country, href: root },
      { name: city.stateFull, href: stateHref },
      { name: city.pageLabel, href: path }
    ]),
    faqSchema(faqs),
    placeSchema(city.name, path, `${city.pageLabel} in ${city.stateFull}, ${country}.`)
  ];

  return (
    <>
      <JsonLd data={schema} />
      <div className="border-b border-border bg-white px-4 py-2.5 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: country, href: root },
              { label: city.stateFull, href: stateHref },
              { label: city.pageLabel, href: path }
            ]}
          />
        </div>
      </div>
      <section className="bg-[linear-gradient(135deg,#0B2545_0%,#112d5e_72%,#0B2545_100%)] px-4 py-12 text-white sm:px-6">
        <div className="mx-auto max-w-6xl">
          <p className={`font-heading text-xs font-bold uppercase tracking-[0.16em] ${isNz ? "text-[#4ADE80]" : "text-coral"}`}>
            {country} city guide
          </p>
          <h1 className="mt-3 max-w-3xl font-heading text-4xl font-extrabold tracking-normal sm:text-5xl">
            {city.name} postcodes
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-ice">
            Browse {formatCount(postcodes.length)} postcodes and {formatCount(cityLocalities.length)} related {localityLabel} for {city.name}, {city.stateFull}.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/search" className="rounded-lg bg-white px-5 py-3 font-heading text-sm font-bold text-navy shadow-sm transition hover:bg-[#DDE8F5]">
              Search postcodes
            </Link>
            <Link href={stateHref} className="rounded-lg border border-white/30 bg-transparent px-5 py-3 font-heading text-sm font-bold text-white transition hover:bg-white/10">
              Browse {city.stateFull}
            </Link>
          </div>
        </div>
      </section>
      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <section className="mb-10 grid gap-3 sm:grid-cols-3">
          {[
            [formatCount(postcodes.length), "postcodes"],
            [formatCount(cityLocalities.length), localityLabel],
            [city.stateFull, isNz ? "region" : "state"]
          ].map(([value, label]) => (
            <div key={label} className="card-surface p-5">
              <p className="font-heading text-2xl font-extrabold text-navy">{value}</p>
              <p className="mt-1 text-sm text-muted">{label}</p>
            </div>
          ))}
        </section>

        <section className="mb-10 grid items-start gap-4 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="card-surface p-6">
            <p className="font-heading text-xs font-bold uppercase tracking-[0.12em] text-coral">City overview</p>
            <h2 className="mt-2 font-heading text-2xl font-extrabold text-navy">
              Find postcodes in {city.name}
            </h2>
            <p className="mt-3 text-sm leading-6 text-muted">
              {city.description}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <Link href={`${root}/postcodes`} className="rounded-full border border-border bg-ash px-3 py-1.5 text-xs font-bold text-navy transition hover:border-coral hover:bg-white hover:text-coral">
                {country} postcodes
              </Link>
              <Link href={`${root}/${isNz ? "localities" : "suburbs"}`} className="rounded-full border border-border bg-ash px-3 py-1.5 text-xs font-bold text-navy transition hover:border-coral hover:bg-white hover:text-coral">
                Browse {localityLabel}
              </Link>
              <Link href={`${root}/a-z`} className="rounded-full border border-border bg-ash px-3 py-1.5 text-xs font-bold text-navy transition hover:border-coral hover:bg-white hover:text-coral">
                A-Z directory
              </Link>
            </div>
          </div>
          <div className="card-surface p-6">
            <p className="font-heading text-xs font-bold uppercase tracking-[0.12em] text-coral">Related {localityLabel}</p>
            <div className="mt-4 grid gap-2">
              {cityLocalities.slice(0, 10).map((locality) => (
                <Link key={locality.slug} href={localityPath(locality)} className="rounded-lg border border-border bg-ash px-3 py-2 text-sm font-semibold text-text transition hover:border-coral hover:bg-white hover:text-coral">
                  <LocalityPostcodeLabel name={locality.name} postcode={locality.postcode} />
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="mb-10">
          <div className="mb-4 flex items-end justify-between gap-4">
            <div>
              <p className="font-heading text-xs font-bold uppercase tracking-[0.12em] text-coral">Postcodes</p>
              <h2 className="font-heading text-2xl font-extrabold text-navy">{city.name} postcodes</h2>
            </div>
            <Link href="/search" className="text-sm font-bold text-coral">Search all</Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {postcodes.map((postcode) => (
              <Link key={postcode.code} href={postcodePath(postcode)} className="card-surface p-4">
                <p className="font-heading text-2xl font-extrabold text-navy">{postcode.code}</p>
                <p className="mt-1 text-sm font-semibold text-text">{getDisplayLocality(postcode)}</p>
                <p className="mt-1 text-xs text-muted">{postcode.stateFull}</p>
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
