import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { createMetadata } from "@/lib/metadata";
import { breadcrumbSchema, placeSchema } from "@/lib/schema";

export const metadata: Metadata = createMetadata({
  title: "About AusNZPostcode.com - Free Australian & New Zealand Postcode Finder",
  description:
    "Learn about AusNZPostcode.com, a free postcode directory covering all of Australia and New Zealand. Find out about our data sources, coverage, and how to use the site.",
  path: "/about"
});

const coverageStats = [
  "11,600+ Australian postcodes across all 8 states and territories",
  "1,856+ New Zealand postcodes across all 16 regions on the North Island, South Island, and Stewart Island",
  "Over 16,000 suburbs and localities across both countries"
];

const sourceCards = [
  {
    title: "Australian postcode data",
    body:
      "Australian postcode data is sourced from the matthewproctor/australianpostcodes dataset, maintained by Matthew Proctor and contributors on GitHub. This dataset aggregates postcode information from Australia Post and related public sources and is made available in the public domain. The dataset includes postcode, locality, state, LGA, electorate, PHN region, remoteness classification, latitude, longitude, and postcode type for all postcodes across Australia.",
    source: "github.com/matthewproctor/australianpostcodes",
    href: "https://github.com/matthewproctor/australianpostcodes"
  },
  {
    title: "New Zealand postcode data",
    body:
      "New Zealand postcode data is sourced from GeoNames, a geographical database covering all countries of the world. GeoNames data is made available under the Creative Commons Attribution 4.0 licence, which requires attribution to GeoNames.org. The dataset includes postcode, suburb, region, and GPS coordinates for all NZ postcodes.",
    source: "geonames.org · Licence: CC Attribution 4.0",
    href: "https://www.geonames.org/"
  },
  {
    title: "Map data",
    body:
      "Interactive maps on postcode detail pages are powered by Leaflet.js and use map tiles from OpenStreetMap. OpenStreetMap data is made available under the Open Data Commons Open Database Licence (ODbL).",
    source: "openstreetmap.org · Licence: ODbL",
    href: "https://www.openstreetmap.org/"
  }
];

const useSteps = [
  {
    title: "Search by suburb or locality",
    body:
      "Type any suburb or locality name into the search bar on the homepage. Results appear as you type, and each result links to the full postcode detail page."
  },
  {
    title: "Search by postcode",
    body:
      "Type a 4-digit postcode into the search bar to find matching suburbs, localities, state or region details, and related postcode pages."
  },
  {
    title: "Browse by state or region",
    body:
      "Use the state and region cards on the homepage to browse all postcodes within a specific Australian state or New Zealand region."
  },
  {
    title: "Switch between countries",
    body:
      "Use the country toggle at the top of the search experience to switch between Australian and New Zealand postcode data."
  }
];

export default function AboutPage() {
  const schema = [
    breadcrumbSchema([
      { name: "Home", href: "/" },
      { name: "About", href: "/about" }
    ]),
    placeSchema("AusNZPostcode.com", "/about", "Free postcode directory for Australia and New Zealand.")
  ];

  return (
    <>
      <JsonLd data={schema} />
      <div className="border-b border-border bg-white px-4 py-2.5 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "About", href: "/about" }]} />
        </div>
      </div>
      <section className="bg-[linear-gradient(135deg,#0B2545_0%,#112d5e_100%)] px-4 py-12 text-white sm:px-6">
        <div className="mx-auto max-w-6xl">
          <p className="font-heading text-xs font-bold uppercase tracking-[0.16em] text-coral">
            Free Australian & New Zealand postcode finder
          </p>
          <h1 className="mt-3 max-w-3xl break-words font-heading text-4xl font-extrabold tracking-normal [overflow-wrap:anywhere] sm:text-5xl">
            About AusNZPostcode.com
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-ice sm:text-lg">
            A free, independently run postcode directory covering the whole of
            Australia and New Zealand, built to make postcode lookup fast, accurate,
            and accessible with no paywalls, no signup forms, and no advertising clutter.
          </p>
        </div>
      </section>
      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <section className="mb-10 grid gap-6 lg:grid-cols-[1fr_340px]">
          <div className="rounded-[14px] border border-border bg-white p-6 sm:p-8">
            <h2 className="font-heading text-2xl font-extrabold text-navy">What is this site?</h2>
            <div className="mt-4 space-y-4 text-sm leading-7 text-muted">
              <p>
                AusNZPostcode.com is a free, independently run postcode directory covering
                the whole of Australia and New Zealand. Whether you are filling in an
                online form, addressing a parcel, verifying a delivery address, or simply
                curious about a suburb you have never heard of, this site gives you the
                information you need in seconds.
              </p>
              <p>
                The directory brings Australian and New Zealand postcode information into
                one fast search and browsing experience, with clear local context and
                source attribution.
              </p>
            </div>
          </div>
          <aside className="rounded-[14px] border border-border bg-white p-6">
            <h2 className="font-heading text-lg font-extrabold text-navy">We cover</h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-muted">
              {coverageStats.map((item) => (
                <li key={item} className="rounded-lg bg-ash p-3">{item}</li>
              ))}
            </ul>
          </aside>
        </section>

        <AboutSection title="What information do we provide?">
          <p>
            For each postcode, we show as much detail as the data allows. For Australian
            postcodes this includes the suburb or locality name, state and territory,
            local government area (LGA), federal electorate, Primary Health Network
            (PHN) region, remoteness classification (RA_2021), postcode type, and GPS
            coordinates with an interactive map.
          </p>
          <p>
            For New Zealand postcodes we show the suburb or locality name, region, island
            where available, postcode type, and GPS coordinates with an interactive map.
            Every postcode page also includes nearby postcodes, frequently asked questions,
            and JSON-LD structured data to help search engines understand the content.
          </p>
        </AboutSection>

        <section className="mb-10">
          <div className="mb-5">
            <p className="font-heading text-xs font-bold uppercase tracking-[0.12em] text-coral">Sources</p>
            <h2 className="mt-2 font-heading text-2xl font-extrabold text-navy">Data sources</h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-muted">
              We believe in being transparent about where our data comes from.
              AusNZPostcode.com does not collect or generate postcode data ourselves.
              We use openly licensed public datasets and give full credit to the people
              and organisations who maintain them.
            </p>
          </div>
          <div className="grid gap-4 lg:grid-cols-3">
            {sourceCards.map((source) => (
              <article key={source.title} className="min-w-0 rounded-[14px] border border-border bg-white p-5">
                <h3 className="font-heading text-lg font-extrabold text-navy">{source.title}</h3>
                <p className="mt-3 break-words text-sm leading-7 text-muted">{source.body}</p>
                <a className="mt-4 inline-flex max-w-full break-words text-sm font-bold text-coral [overflow-wrap:anywhere] hover:underline" href={source.href}>
                  Source: {source.source}
                </a>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-10 rounded-[14px] border border-border bg-white p-6 sm:p-8">
          <h2 className="font-heading text-2xl font-extrabold text-navy">How to use this site</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {useSteps.map((step) => (
              <article key={step.title} className="rounded-[12px] border border-border bg-ash p-5">
                <h3 className="font-heading text-base font-extrabold text-navy">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{step.body}</p>
              </article>
            ))}
          </div>
        </section>

        <AboutSection title="Accuracy and updates">
          <p>
            We make every effort to keep our postcode data accurate and up to date.
            However, postcode boundaries and assignments do change over time as Australia
            Post and New Zealand Post update their systems. We recommend verifying
            critical postcode information, such as for legal, medical, or official
            government purposes, directly with Australia Post or New Zealand Post.
          </p>
          <p>
            If you notice an error or an out-of-date postcode, please contact us and we
            will investigate and update accordingly.
          </p>
          <p>
            Official references:{" "}
            <a className="font-bold text-coral hover:underline" href="https://auspost.com.au">Australia Post</a>
            {" "}and{" "}
            <a className="font-bold text-coral hover:underline" href="https://www.nzpost.co.nz">New Zealand Post</a>.
          </p>
        </AboutSection>

        <AboutSection title="Who built this?">
          <p>
            AusNZPostcode.com is an independently built and maintained website. It was
            created to fill a gap: there was no single free, clean, and comprehensive
            postcode reference site covering both Australia and New Zealand together.
            We are not affiliated with Australia Post, New Zealand Post, or any
            government agency.
          </p>
          <p>
            The site is built using Next.js for static page generation, Leaflet.js and
            OpenStreetMap for maps, and is designed for GitHub Pages static hosting.
            All postcode pages are statically generated at build time for fast loading
            and full search engine indexability.
          </p>
        </AboutSection>

        <section className="mb-10 grid gap-4 md:grid-cols-3">
          <InfoCard title="Contact">
            <p>Have a question, spotted an error, or want to suggest a feature?</p>
            <p className="mt-3">
              Email:{" "}
              <a className="font-bold text-coral hover:underline" href="mailto:contact@ausnzpostcode.com">
                contact@ausnzpostcode.com
              </a>
            </p>
            <p className="mt-3">For urgent postcode verification, contact Australia Post or New Zealand Post directly.</p>
          </InfoCard>
          <InfoCard title="Disclaimer">
            The postcode data on this site is provided for general reference purposes only.
            While we strive for accuracy, AusNZPostcode.com makes no warranty regarding
            completeness, accuracy, or suitability for any particular purpose.
          </InfoCard>
          <InfoCard title="Privacy">
            AusNZPostcode.com does not require users to create an account or provide
            personal information to use the site. For more details, see our{" "}
            <Link className="font-bold text-coral hover:underline" href="/privacy-policy">
              Privacy Policy
            </Link>.
          </InfoCard>
        </section>
      </main>
    </>
  );
}

function AboutSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10 rounded-[14px] border border-border bg-white p-6 sm:p-8">
      <h2 className="font-heading text-2xl font-extrabold text-navy">{title}</h2>
      <div className="mt-4 space-y-4 text-sm leading-7 text-muted">{children}</div>
    </section>
  );
}

function InfoCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <article className="rounded-[14px] border border-border bg-white p-5 text-sm leading-7 text-muted">
      <h2 className="font-heading text-lg font-extrabold text-navy">{title}</h2>
      <div className="mt-3">{children}</div>
    </article>
  );
}
