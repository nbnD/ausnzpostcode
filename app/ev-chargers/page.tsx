import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { EvChargersMap } from "@/components/EvChargersMap";
import { FaqList } from "@/components/FaqList";
import { JsonLd } from "@/components/JsonLd";
import { createMetadata } from "@/lib/metadata";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";

export const metadata: Metadata = createMetadata({
  title: "EV Chargers Map Australia and New Zealand",
  description:
    "Explore indexed EV charging stations across Australia and New Zealand with an interactive OpenStreetMap-powered map, charger details, ports, operators and Google Maps links.",
  path: "/ev-chargers"
});

const faqs = [
  {
    question: "Can I find EV chargers in Australia and New Zealand?",
    answer:
      "Yes. This EV chargers map includes indexed charging station locations for Australia and New Zealand using the available local EV and OpenStreetMap-derived datasets."
  },
  {
    question: "Does this map show live charger availability?",
    answer:
      "No. The EV charger map is a static planning reference and does not show live availability, pricing, faults or real-time charging status."
  },
  {
    question: "Where does EV charger data come from?",
    answer:
      "EV charger locations are generated from local open datasets used by AusNZ Postcode. New Zealand charger coverage currently comes from OpenStreetMap-derived data, while Australian charger details may also include public EV charging station data."
  },
  {
    question: "Can I open a charger in Google Maps?",
    answer:
      "Yes. Each EV charger marker or detail card includes an Open in Google Maps link generated from the station coordinates."
  }
];

export default function EvChargersPage() {
  const schema = [
    breadcrumbSchema([
      { name: "Home", href: "/" },
      { name: "EV Chargers", href: "/ev-chargers" }
    ]),
    faqSchema(faqs)
  ];

  return (
    <>
      <JsonLd data={schema} />
      <div className="border-b border-border bg-white px-4 py-2.5 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "EV Chargers", href: "/ev-chargers" }]} />
        </div>
      </div>
      <section className="bg-[linear-gradient(135deg,#0B2545_0%,#112d5e_65%,#2D6A4F_100%)] px-4 py-12 text-white sm:px-6">
        <div className="mx-auto max-w-6xl">
          <p className="font-heading text-xs font-bold uppercase tracking-[0.16em] text-[#B7F7D0]">
            EV charging map
          </p>
          <h1 className="mt-3 max-w-4xl font-heading text-4xl font-extrabold tracking-normal sm:text-5xl">
            EV chargers map for Australia and New Zealand
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-ice">
            Browse indexed EV charging stations, compare available charger details, and open station coordinates in Google Maps. This map is built for planning and local discovery, not live charger availability.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/au" className="btn-primary">Browse Australia</Link>
            <Link href="/nz" className="rounded-lg border border-white/20 bg-white/10 px-5 py-3 font-heading text-sm font-bold text-white">
              Browse New Zealand
            </Link>
            <Link href="/search" className="rounded-lg border border-white/20 bg-white/10 px-5 py-3 font-heading text-sm font-bold text-white">
              Search postcodes
            </Link>
          </div>
        </div>
      </section>
      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <EvChargersMap />
        <section className="mt-10 grid gap-4 md:grid-cols-3">
          {[
            ["Australia and New Zealand", "Switch between AU and NZ station coverage without leaving the page."],
            ["Map-ready locations", "Open each charger in Google Maps using its indexed latitude and longitude."],
            ["Planning reference", "Use the data as a general guide and confirm live availability with the charging provider."]
          ].map(([title, body]) => (
            <div key={title} className="card-surface p-5">
              <h2 className="font-heading text-lg font-extrabold text-navy">{title}</h2>
              <p className="mt-2 text-sm leading-6 text-muted">{body}</p>
            </div>
          ))}
        </section>
        <section className="mt-10">
          <h2 className="mb-4 font-heading text-2xl font-extrabold text-navy">Frequently asked questions</h2>
          <FaqList items={faqs} />
        </section>
      </main>
    </>
  );
}
