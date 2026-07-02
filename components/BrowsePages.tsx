import Link from "next/link";
import type { ReactNode } from "react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { DataDisclaimer } from "@/components/DataDisclaimer";
import { FaqList } from "@/components/FaqList";
import { JsonLd } from "@/components/JsonLd";
import {
  countryName,
  countryRoot,
  findRegion,
  formatCount,
  getBrowseLetters,
  getCountryLocalities,
  getCountryPostcodes,
  getPostcodesByRegion,
  localityPath,
  postcodePath,
  statePath,
  type CountryCode
} from "@/data/postcodes";
import { breadcrumbSchema, faqSchema, placeSchema } from "@/lib/schema";

function pageFaqs(country: CountryCode, topic: string) {
  const name = countryName(country);
  return [
    {
      question: `How is this ${topic} list generated?`,
      answer: `This ${topic} list is generated from local ${name} postcode JSON data during static export.`
    },
    {
      question: `Can I use this ${topic} list for official mail verification?`,
      answer: "Use this directory as a general reference only. Check the relevant postal authority for official delivery or address verification."
    }
  ];
}

export function PostcodeListPage({ country }: { country: CountryCode }) {
  const root = countryRoot(country);
  const name = countryName(country);
  const items = getCountryPostcodes(country);
  const faqs = pageFaqs(country, "postcode");
  const path = `${root}/postcodes`;

  return (
    <BrowseShell country={country} title={`${name} postcodes`} description={`Browse ${formatCount(items.length)} ${name} postcode pages.`} path={path} faqs={faqs}>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <Link key={item.code} href={postcodePath(item)} className="card-surface p-4">
            <p className="font-heading text-2xl font-extrabold text-navy">{item.code}</p>
            <p className="mt-1 text-sm font-semibold text-text">{item.locality}</p>
            <p className="mt-1 text-xs text-muted">{item.stateFull}</p>
          </Link>
        ))}
      </div>
    </BrowseShell>
  );
}

export function LocalityListPage({ country }: { country: CountryCode }) {
  const root = countryRoot(country);
  const isNz = country === "nz";
  const name = countryName(country);
  const items = getCountryLocalities(country);
  const faqs = pageFaqs(country, isNz ? "locality" : "suburb");
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
                    {item.name}
                    <span className="ml-2 text-xs font-normal text-muted">{item.postcode}</span>
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
  const faqs = pageFaqs(country, "A-Z");

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
  const path = statePath(country, region.abbr ?? region.name);
  const faqs = pageFaqs(country, country === "nz" ? "region" : "state");

  return (
    <BrowseShell country={country} title={`${region.name} postcodes`} description={`Browse ${formatCount(items.length)} postcodes in ${region.name}, ${name}.`} path={path} faqs={faqs} regionName={region.name}>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <Link key={item.code} href={postcodePath(item)} className="card-surface p-4">
            <p className="font-heading text-2xl font-extrabold text-navy">{item.code}</p>
            <p className="mt-1 text-sm font-semibold text-text">{item.locality}</p>
            <p className="mt-1 text-xs text-muted">{item.stateFull}</p>
          </Link>
        ))}
      </div>
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
