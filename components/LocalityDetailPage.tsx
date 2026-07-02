import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { DataDisclaimer } from "@/components/DataDisclaimer";
import { FaqList } from "@/components/FaqList";
import { JsonLd } from "@/components/JsonLd";
import { PostcodeMap } from "@/components/PostcodeMap";
import { ShareActions } from "@/components/ShareActions";
import {
  countryName,
  countryRoot,
  findPostcode,
  getNearbyLocalities,
  localityPath,
  postcodePath,
  statePath,
  type LocalityRecord
} from "@/data/postcodes";
import { breadcrumbSchema, faqSchema, placeSchema } from "@/lib/schema";
import { siteConfig } from "@/lib/site";

function buildLocalityFaqs(locality: LocalityRecord) {
  const kind = locality.country === "au" ? "suburb" : "locality";
  return [
    {
      question: `What is the postcode of ${locality.name}?`,
      answer: `${locality.name} uses postcode ${locality.postcode}.`
    },
    {
      question: `Which ${locality.country === "au" ? "state" : "region"} is ${locality.name} in?`,
      answer: `${locality.name} is in ${locality.stateFull}.`
    },
    {
      question: `Where is ${locality.name} located?`,
      answer: `${locality.name} is a ${kind} in ${countryName(locality.country)}, within ${locality.stateFull}.`
    },
    {
      question: `Is ${locality.name} postcode information official?`,
      answer: "This is an independent reference page. Check the relevant postal authority for official delivery or address verification."
    }
  ];
}

export function LocalityDetailPage({ locality }: { locality: LocalityRecord }) {
  const country = countryName(locality.country);
  const root = countryRoot(locality.country);
  const path = localityPath(locality);
  const postcode = findPostcode(locality.country, locality.postcode);
  const faqs = buildLocalityFaqs(locality);
  const schema = [
    breadcrumbSchema([
      { name: "Home", href: "/" },
      { name: country, href: root },
      { name: locality.stateFull, href: statePath(locality.country, locality.state) },
      { name: locality.name, href: path }
    ]),
    faqSchema(faqs),
    placeSchema(locality.name, path, `${locality.name} postcode ${locality.postcode} in ${locality.stateFull}.`)
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
              { label: locality.stateFull, href: statePath(locality.country, locality.state) },
              { label: locality.name, href: path }
            ]}
          />
        </div>
      </div>
      <section className="bg-[linear-gradient(135deg,#0B2545_0%,#112d5e_100%)] px-4 py-10 text-white sm:px-6">
        <div className="mx-auto flex max-w-6xl flex-wrap items-start justify-between gap-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-sky">
              {country} · {locality.stateFull}
            </p>
            <h1 className="mt-3 font-heading text-4xl font-extrabold tracking-normal sm:text-5xl">
              {locality.name}
            </h1>
            <p className="mt-3 text-xl font-semibold text-ice">
              Postcode <Link href={postcode ? postcodePath(postcode) : "/search"} className="text-coral hover:underline">{locality.postcode}</Link>
            </p>
          </div>
          <ShareActions title={`${locality.name} postcode ${locality.postcode}`} url={`${siteConfig.url}${path}`} />
        </div>
      </section>
      <main className="mx-auto grid max-w-6xl gap-6 px-4 py-7 sm:px-6 lg:grid-cols-[1fr_340px]">
        <section>
          <div className="mb-4 overflow-hidden rounded-[14px] border border-border bg-white">
            <h2 className="border-b border-border bg-ash px-5 py-3.5 font-heading text-xs font-bold uppercase tracking-[0.08em] text-navy">
              Locality details
            </h2>
            <dl className="divide-y divide-border text-sm">
              {[
                ["Name", locality.name],
                ["Postcode", locality.postcode],
                ["State / Region", locality.stateFull],
                ["Country", country],
                ["Type", locality.type],
                ["Coordinates", locality.lat && locality.lng ? `${locality.lat}, ${locality.lng}` : undefined]
              ].filter(([, value]) => value).map(([label, value]) => (
                <div key={label} className="grid gap-2 px-5 py-3 sm:grid-cols-[38%_1fr]">
                  <dt className="font-medium text-muted">{label}</dt>
                  <dd className="font-semibold text-text">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="mb-4 overflow-hidden rounded-[14px] border border-border bg-white">
            <h2 className="border-b border-border bg-ash px-5 py-3.5 font-heading text-xs font-bold uppercase tracking-[0.08em] text-navy">
              OpenStreetMap location
            </h2>
            <div className="p-4">
              <PostcodeMap lat={locality.lat} lng={locality.lng} label={`${locality.name} ${locality.postcode}`} />
            </div>
          </div>
          <div className="mb-4 overflow-hidden rounded-[14px] border border-border bg-white">
            <h2 className="border-b border-border bg-ash px-5 py-3.5 font-heading text-xs font-bold uppercase tracking-[0.08em] text-navy">
              Nearby {locality.country === "au" ? "suburbs" : "localities"}
            </h2>
            <div className="flex flex-wrap gap-2 p-5">
              {getNearbyLocalities(locality).map((item) => (
                <Link key={item.slug} href={localityPath(item)} className="rounded-lg border border-border bg-ash px-4 py-2 font-heading text-sm font-bold text-navy transition hover:border-coral hover:text-coral">
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <DataDisclaimer />
          </div>
          <div className="overflow-hidden rounded-[14px] border border-border bg-white">
            <h2 className="border-b border-border bg-ash px-5 py-3.5 font-heading text-xs font-bold uppercase tracking-[0.08em] text-navy">
              Frequently asked questions
            </h2>
            <div className="p-4">
              <FaqList items={faqs} />
            </div>
          </div>
        </section>
        <aside className="hidden lg:block">
          <DataDisclaimer />
        </aside>
      </main>
    </>
  );
}
