import type { Metadata } from "next";
import { PopularPostcodeGrid } from "@/components/PopularPostcodeGrid";
import { SearchHero } from "@/components/SearchHero";
import { SectionHeading } from "@/components/SectionHeading";
import { StateGrid } from "@/components/StateGrid";
import { TabbedFAQAccordion } from "@/components/TabbedFAQAccordion";
import { formatCount, homepageData } from "@/data/postcodes";
import { createMetadata } from "@/lib/metadata";
import { faqSchema } from "@/lib/schema";

export const metadata: Metadata = createMetadata({
  title: "Australia and New Zealand Postcode Directory",
  description:
    "Search Australia and New Zealand postcodes, suburb regions, data sources, and local directory pages from one fast static website.",
  path: "/"
});

const faqGroups = [
  {
    id: "australia",
    label: "Australia",
    items: [
      {
        question: "How are Australian postcodes structured?",
        answer:
          "Australian postcodes are 4-digit numbers assigned by Australia Post. Each state and territory has a broad postcode range, such as 1000-2999 for New South Wales, 3000-3999 for Victoria, 4000-4999 for Queensland, 5000-5999 for South Australia, 6000-6999 for Western Australia, and 7000-7999 for Tasmania."
      },
      {
        question: "What do the first digits of an Australian postcode mean?",
        answer:
          "The first digit generally points to the state or territory. Postcodes starting with 1 or 2 are usually New South Wales, 3 is Victoria, 4 is Queensland, 5 is South Australia, 6 is Western Australia, 7 is Tasmania, and 0 is used for Northern Territory and ACT ranges."
      },
      {
        question: "How many postcodes does Australia have?",
        answer:
          "Australia has thousands of active postcodes covering suburbs, towns, rural areas, PO boxes, and special delivery services. AusNZ Postcode currently indexes Australian postcode records from local source data and groups them for search and browsing."
      },
      {
        question: "Can one postcode cover multiple suburbs?",
        answer:
          "Yes. One Australian postcode can cover multiple suburbs, towns, or localities, especially in regional and rural areas. A suburb can also have more than one postcode where street delivery, PO box, or business delivery services are separated."
      },
      {
        question: "Does Australia use ZIP codes or postcodes?",
        answer:
          "Australia uses postcodes, not ZIP codes. ZIP codes are used in the United States. If an international form asks Australians for a ZIP or postal code, the correct entry is usually the 4-digit Australian postcode."
      }
    ]
  },
  {
    id: "new-zealand",
    label: "New Zealand",
    items: [
      {
        question: "How many digits are in a New Zealand postcode?",
        answer:
          "New Zealand postcodes are 4-digit numbers. They look similar to Australian postcodes, but they belong to a separate New Zealand postal system and should not be used interchangeably with Australian postcodes."
      },
      {
        question: "When did New Zealand introduce postcodes?",
        answer:
          "New Zealand introduced its current postcode system in 2006. The system was designed to improve address sorting and delivery accuracy across regions, towns, suburbs, and rural localities."
      },
      {
        question: "How are NZ postcodes different from Australian postcodes?",
        answer:
          "Both countries use 4-digit postcodes, but the systems are separate. Australian postcodes are organised around Australian states and territories, while New Zealand postcodes are structured around New Zealand regions and delivery routes."
      },
      {
        question: "How many postcodes does New Zealand have?",
        answer:
          "New Zealand has thousands of postcode and locality combinations across the North Island, South Island, Stewart Island, and offshore areas. AusNZ Postcode indexes New Zealand postcode records from local source data for browsing and search."
      }
    ]
  },
  {
    id: "general",
    label: "General",
    items: [
      {
        question: "Is this postcode lookup free to use?",
        answer:
          "Yes. AusNZ Postcode is free to use for postcode, suburb, locality, state, and region lookups across Australia and New Zealand."
      },
      {
        question: "What data sources does ausnzpostcode.com use?",
        answer:
          "AusNZ Postcode uses local postcode datasets stored with the project. Australian and New Zealand records are normalised into static indexes so the website can be searched and browsed without a backend or paid postcode API."
      },
      {
        question: "What is the difference between Australian and New Zealand postcodes?",
        answer:
          "Australian and New Zealand postcodes both use 4 digits, but they refer to different countries and separate postal systems. Always check the country with the postcode because the same number can represent different places in Australia and New Zealand."
      }
    ]
  }
];

const faqItems = faqGroups.flatMap((group) => group.items);

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
          <SectionHeading title="Browse Australia by state" href="/au" linkLabel="See all" />
          <StateGrid title="Australian states and territories" items={homepageData.auStates} accent="au" />
        </section>
        <section className="mb-12">
          <SectionHeading title="Browse New Zealand by region" href="/nz" linkLabel="See all" />
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
          <TabbedFAQAccordion groups={faqGroups} />
        </section>
      </main>
    </>
  );
}
