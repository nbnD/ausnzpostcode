import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { createMetadata } from "@/lib/metadata";
import { breadcrumbSchema, placeSchema } from "@/lib/schema";

export const metadata: Metadata = createMetadata({
  title: "Disclaimer",
  description:
    "Disclaimer for AusNZPostcode.com, including postcode data accuracy, official source status, boundary information, remoteness classification, advertising, maps, and external links.",
  path: "/disclaimer"
});

const disclaimerSections = [
  {
    title: "1. General Disclaimer",
    body: [
      "The information provided on AusNZPostcode.com is for general reference purposes only. While we make every reasonable effort to ensure the postcode data displayed on this Site is accurate and up to date, we make no representations or warranties of any kind about completeness, accuracy, reliability, suitability, or availability.",
      "Any reliance you place on the information provided by this Site is strictly at your own risk."
    ]
  },
  {
    title: "2. Postcode Data Accuracy",
    body: [
      "Postcode data displayed on this Site is sourced from third-party open datasets including the matthewproctor/australianpostcodes dataset and GeoNames. These datasets are community-maintained and may not reflect the most recent changes made by Australia Post or New Zealand Post.",
      "Postcode boundaries, suburb names, LGA assignments, and electorate boundaries can and do change over time. AusNZPostcode.com is not responsible for errors, omissions, or outdated information in postcode data.",
      "For authoritative and legally accurate postcode information, always refer directly to Australia Post at auspost.com.au or New Zealand Post at nzpost.co.nz."
    ]
  },
  {
    title: "3. Not an Official Source",
    body: [
      "AusNZPostcode.com is an independent, privately operated website. We are not affiliated with, endorsed by, or connected to Australia Post, New Zealand Post, the Australian Government, the New Zealand Government, or any local government authority.",
      "The postcode data on this Site should not be used as the sole basis for official, legal, medical, financial, or government-related decisions. If you require authoritative postcode data for official purposes, verify it with the relevant official authority."
    ]
  },
  {
    title: "4. No Professional Advice",
    body: [
      "Nothing on this Site constitutes legal, financial, medical, electoral, or any other form of professional advice. The Site provides general postcode reference information only. If you require professional advice, consult a qualified professional in the relevant field."
    ]
  },
  {
    title: "5. LGA, Electorate, and Boundary Information",
    body: [
      "Local government area (LGA), federal electorate, and state electorate information displayed on this Site is derived from open datasets and is provided for general reference only. These boundaries can change due to redistribution, amalgamation, or legislative changes.",
      "For authoritative boundary information, contact your relevant state or territory government, the Australian Electoral Commission at aec.gov.au, or the Electoral Commission New Zealand at elections.nz."
    ]
  },
  {
    title: "6. Remoteness Classification",
    body: [
      "Remoteness classification data (RA_2021) displayed on this Site is sourced from the Australian Bureau of Statistics (ABS). This classification is used for general reference purposes and may not reflect current ABS classifications.",
      "For authoritative remoteness data, refer to the ABS at abs.gov.au."
    ]
  },
  {
    title: "7. Advertising Disclaimer",
    body: [
      "This Site may display third-party advertisements served by Google AdSense and potentially other advertising networks. We do not endorse, verify, or take responsibility for advertised products, services, or companies.",
      "Advertisement content is controlled by the advertising network and may not reflect our values or opinions. We may receive compensation when users click on or interact with advertisements. This compensation does not influence postcode data, content, or editorial decisions."
    ]
  },
  {
    title: "8. Map Disclaimer",
    body: [
      "Interactive maps on this Site are powered by Leaflet.js and OpenStreetMap. Map accuracy, completeness, and currency are subject to OpenStreetMap data quality and are outside our control.",
      "Map data should not be used for navigation, surveying, or any purpose requiring precise geographic accuracy."
    ]
  },
  {
    title: "9. Availability Disclaimer",
    body: [
      "We do not guarantee that the Site will be available at all times or free from errors or interruptions. We reserve the right to modify, suspend, or discontinue the Site at any time without notice.",
      "We accept no liability for loss or inconvenience caused by Site unavailability."
    ]
  },
  {
    title: "10. External Links Disclaimer",
    body: [
      "This Site contains links to external websites for reference purposes. We have no control over the content or availability of those sites and accept no responsibility for them.",
      "The inclusion of a link does not imply endorsement of the linked site or its content."
    ]
  },
  {
    title: "11. Changes to This Disclaimer",
    body: [
      "We reserve the right to update or modify this Disclaimer at any time. The most current version will always be published at ausnzpostcode.com/disclaimer/.",
      "Your continued use of the Site after changes constitutes acceptance of the updated Disclaimer."
    ]
  },
  {
    title: "12. Contact",
    body: [
      "If you have questions about this Disclaimer or wish to report inaccurate postcode data, contact contact@AusNZPostcode.com."
    ]
  }
];

export default function DisclaimerPage() {
  const schema = [
    breadcrumbSchema([
      { name: "Home", href: "/" },
      { name: "Disclaimer", href: "/disclaimer" }
    ]),
    placeSchema("AusNZPostcode.com Disclaimer", "/disclaimer", "Disclaimer for AusNZPostcode.com.")
  ];

  return (
    <>
      <JsonLd data={schema} />
      <div className="border-b border-border bg-white px-4 py-2.5 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Disclaimer", href: "/disclaimer" }]} />
        </div>
      </div>
      <section className="bg-[linear-gradient(135deg,#0B2545_0%,#112d5e_100%)] px-4 py-12 text-white sm:px-6">
        <div className="mx-auto max-w-6xl">
          <p className="font-heading text-xs font-bold uppercase tracking-[0.16em] text-coral">Legal</p>
          <h1 className="mt-3 max-w-3xl font-heading text-4xl font-extrabold tracking-normal sm:text-5xl">Disclaimer</h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-ice sm:text-lg">
            Important notes about postcode accuracy, official verification, maps, advertising, external links, and use of information on AusNZPostcode.com.
          </p>
        </div>
      </section>
      <main className="mx-auto grid max-w-6xl gap-6 px-4 py-10 sm:px-6 lg:grid-cols-[260px_1fr]">
        <aside className="h-fit rounded-[14px] border border-border bg-white p-5 text-sm text-muted lg:sticky lg:top-24">
          <dl className="space-y-3">
            {[
              ["Website", "ausnzpostcode.com"],
              ["Effective Date", "22 June 2026"],
              ["Last Updated", "22 June 2026"]
            ].map(([label, value]) => (
              <div key={label}>
                <dt className="font-heading text-xs font-bold uppercase tracking-[0.08em] text-navy">{label}</dt>
                <dd className="mt-1">{value}</dd>
              </div>
            ))}
          </dl>
          <Link href="/contact" className="mt-5 inline-flex text-sm font-bold text-coral hover:underline">
            Contact us
          </Link>
        </aside>
        <article className="space-y-5">
          {disclaimerSections.map((section) => (
            <section key={section.title} className="rounded-[14px] border border-border bg-white p-6 sm:p-8">
              <h2 className="font-heading text-xl font-extrabold text-navy">{section.title}</h2>
              <div className="mt-4 space-y-4 text-sm leading-7 text-muted">
                {section.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}
        </article>
      </main>
    </>
  );
}
