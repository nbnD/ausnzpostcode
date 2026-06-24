import type { Metadata } from "next";
import { CTASection } from "@/components/CTASection";
import { FAQAccordion } from "@/components/FAQAccordion";
import { PopularPostcodeGrid } from "@/components/PopularPostcodeGrid";
import { SearchHero } from "@/components/SearchHero";
import { SectionHeading } from "@/components/SectionHeading";
import { StateGrid } from "@/components/StateGrid";
import { formatCount, homepageData } from "@/data/postcodes";
import { createMetadata } from "@/lib/metadata";
import { faqSchema } from "@/lib/schema";

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
  const schema = faqSchema(faqItems);

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
            [formatCount(homepageData.stats.auPostcodes), "AU postcodes"],
            [formatCount(homepageData.stats.nzPostcodes), "NZ postcodes"],
            [formatCount(homepageData.stats.auLocalities + homepageData.stats.nzLocalities), "localities"],
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
        <section className="mb-12">
          <SectionHeading title="Browse Australia by state" href="/search?country=au" linkLabel="See all" />
          <StateGrid title="Australian states and territories" items={homepageData.auStates} accent="au" />
        </section>
        <section className="mb-12">
          <SectionHeading title="Browse New Zealand by region" href="/search?country=nz" linkLabel="See all" />
          <StateGrid title="New Zealand regions" items={homepageData.nzRegions} accent="nz" />
        </section>
        <section className="mb-12">
          <SectionHeading title="Popular postcode lookups" href="/search" linkLabel="Search postcodes" />
          <PopularPostcodeGrid items={homepageData.popular} />
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
          <SectionHeading title="Frequently asked questions" />
          <FAQAccordion items={faqItems} />
        </section>
      </main>
      <CTASection />
    </>
  );
}
