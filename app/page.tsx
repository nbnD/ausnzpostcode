import type { Metadata } from "next";
import Link from "next/link";
import { FaqList } from "@/components/FaqList";
import { SearchHero } from "@/components/SearchHero";
import { SectionHeader } from "@/components/SectionHeader";
import { australiaStates, nzRegions, postcodes } from "@/data/postcodes";
import { createMetadata } from "@/lib/metadata";
import { breadcrumbSchema, faqSchema, placeSchema } from "@/lib/schema";

export const metadata: Metadata = createMetadata({
  title: "Australia and New Zealand Postcode Directory",
  description:
    "Search Australia and New Zealand postcodes, suburb regions, data sources, and local directory pages from one fast static website.",
  path: "/"
});

const faqItems = [
  {
    question: "Does AusNZ Postcode use a paid map or postcode API?",
    answer:
      "No. The site is designed for local JSON data, static generation, and OpenStreetMap-compatible mapping where maps are needed."
  },
  {
    question: "Will postcode pages work on GitHub Pages?",
    answer:
      "Yes. The foundation uses Next.js static export so pages can be served as static files from GitHub Pages."
  },
  {
    question: "Where does the postcode data come from?",
    answer:
      "The project will cite official and open data sources on each relevant page, with a dedicated data sources page for transparency."
  }
];

export default function Home() {
  const schema = [
    breadcrumbSchema([{ name: "Home", href: "/" }]),
    faqSchema(faqItems),
    placeSchema(
      "Australia and New Zealand",
      "/",
      "Postcode directory coverage for Australia and New Zealand."
    )
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <SearchHero />
      <section className="border-b border-border bg-white">
        <div className="mx-auto flex max-w-6xl flex-wrap justify-center px-4 py-4 sm:px-6">
          {[
            ["13,500+", "postcodes"],
            ["2", "countries"],
            ["100%", "static"],
            ["0", "paid APIs"]
          ].map(([num, label], index) => (
            <div key={label} className={`flex items-center gap-2 px-7 py-2 ${index > 0 ? "border-l border-border" : ""}`}>
              <span className="font-heading text-xl font-bold text-navy">{num}</span>
              <span className="text-xs font-semibold text-muted">{label}</span>
            </div>
          ))}
        </div>
      </section>
      <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <section>
          <SectionHeader title="Browse Australia by state" href="/search?country=au" linkLabel="See all" />
          <div className="mb-12 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
            {australiaStates.map((state) => (
              <Link key={state.abbr} href={`/search?q=${state.abbr}`} className="rounded-[10px] border border-border bg-white p-4 text-center transition hover:-translate-y-0.5 hover:border-coral hover:shadow-coral">
                <span className="block font-heading text-2xl font-extrabold text-navy">{state.abbr}</span>
                <span className="mt-1 block text-xs font-medium leading-snug text-muted">{state.name}</span>
                <span className="mt-1 block text-xs font-bold text-coral">{state.count}</span>
              </Link>
            ))}
          </div>
        </section>
        <section>
          <SectionHeader title="Browse New Zealand by region" href="/search?country=nz" linkLabel="See all" />
          <div className="mb-12 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {nzRegions.map((region) => (
              <Link key={region.name} href={`/search?q=${region.name}`} className="rounded-[10px] border border-border bg-white p-4 text-center transition hover:-translate-y-0.5 hover:border-green hover:shadow-premium">
                <span className="block font-heading text-sm font-bold text-navy">{region.name}</span>
                <span className="mt-1 block text-xs text-muted">{region.island}</span>
                <span className="mt-1 block text-xs font-bold text-green">{region.count}</span>
              </Link>
            ))}
          </div>
        </section>
        <section>
          <SectionHeader title="Popular postcode lookups" href="/search" linkLabel="Search postcodes" />
          <div className="mb-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {postcodes.slice(0, 8).map((item) => (
              <Link key={`${item.country}-${item.code}-${item.locality}`} href={`/postcode/${item.country}/${item.code}`} className="flex items-center gap-3 rounded-[10px] border border-border bg-white p-4 text-text transition hover:border-[#B0C4DE] hover:shadow-premium">
                <span className="min-w-12 font-heading text-xl font-extrabold text-navy">{item.code}</span>
                <span className="flex-1">
                  <span className="block text-sm font-semibold">{item.locality}</span>
                  <span className="block text-xs text-muted">{item.stateFull}</span>
                </span>
                <span className="text-xs font-bold text-muted">{item.country.toUpperCase()}</span>
              </Link>
            ))}
          </div>
        </section>
        <section className="mb-12 rounded-[14px] border border-border bg-white p-6 sm:p-10">
          <h2 className="text-center font-heading text-xl font-bold text-navy">How it works</h2>
          <div className="mt-7 grid gap-6 md:grid-cols-3">
            {[
              ["Search", "Enter a postcode, suburb, locality, state, or region."],
              ["Compare", "Review local details, nearby postcodes, and source notes."],
              ["Explore", "Move from search results into detail pages and regional grids."]
            ].map(([title, body]) => (
              <div key={title} className="text-center">
                <div className="mx-auto mb-3 grid h-14 w-14 place-items-center rounded-[14px] bg-coral/10 font-heading font-bold text-coral">
                  {title.slice(0, 1)}
                </div>
                <h3 className="font-heading text-sm font-bold text-navy">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{body}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="mb-4">
          <SectionHeader title="Frequently asked questions" />
          <FaqList items={faqItems} />
        </section>
      </main>
      <section className="bg-white py-10">
        <div className="mx-auto max-w-6xl px-4 text-sm leading-6 text-muted sm:px-6">
          <Link href="/data-sources" className="font-bold text-coral hover:underline">
            View data source policy
          </Link>
        </div>
      </section>
    </>
  );
}
