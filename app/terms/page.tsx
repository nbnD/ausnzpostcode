import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { createMetadata } from "@/lib/metadata";
import { breadcrumbSchema, placeSchema } from "@/lib/schema";

export const metadata: Metadata = createMetadata({
  title: "Terms of Use",
  description:
    "Terms of Use for AusNZPostcode.com, including acceptable use, postcode data sources, advertising, disclaimers, liability, external links, and contact information.",
  path: "/terms"
});

const termsSections = [
  {
    title: "1. Acceptance of Terms",
    body: [
      'By accessing or using ausnzpostcode.com (the "Site"), you agree to be bound by these Terms of Use ("Terms"). If you do not agree to these Terms, please do not use the Site.',
      "These Terms apply to all visitors and users of the Site. We reserve the right to update or modify these Terms at any time without prior notice. Your continued use of the Site after any changes constitutes your acceptance of the updated Terms. The most current version of these Terms will always be available at ausnzpostcode.com/terms/."
    ]
  },
  {
    title: "2. About the Site",
    body: [
      "AusNZPostcode.com is a free online postcode directory providing postcode lookup and reference information for Australia and New Zealand. The Site is independently operated and is not affiliated with Australia Post, New Zealand Post, or any government authority.",
      "The Site provides general reference information only. It is not intended to be used as an authoritative or legally binding source of postcode data."
    ]
  },
  {
    title: "3. Use of the Site",
    body: [
      "You may use the Site for lawful, personal, and non-commercial reference purposes, including looking up postcodes for suburbs and localities in Australia and New Zealand, verifying postcode information for address completion purposes, and browsing postcode data by state, territory, or region.",
      "You must not scrape, crawl, or harvest data from the Site in bulk using automated tools without prior written permission. You must not reproduce, distribute, or publish the Site's content for commercial purposes without permission.",
      "You must not interfere with the Site's systems or security, transmit spam or malware, impersonate any person or entity, or use the Site in any way that violates applicable Australian, New Zealand, or international laws or regulations.",
      "We reserve the right to block or restrict access to the Site for any user who violates these Terms."
    ]
  },
  {
    title: "4. Intellectual Property",
    body: [
      "The design, layout, code, and original written content of AusNZPostcode.com are the intellectual property of AusNZPostcode.com and are protected by applicable copyright and intellectual property laws.",
      "The postcode data displayed on this Site is sourced from third-party open datasets. Australian postcode data is sourced from the matthewproctor/australianpostcodes dataset, made available in the public domain. New Zealand postcode data is sourced from GeoNames, available under the Creative Commons Attribution 4.0 licence. Map data is provided by OpenStreetMap contributors under the Open Database Licence (ODbL).",
      "We make no claim of ownership over the underlying third-party data. Use of this data is subject to the licence terms of the respective data providers.",
      "AusNZPostcode.com and associated branding are the property of AusNZPostcode.com. You may not use our name, logo, or branding without prior written permission."
    ]
  },
  {
    title: "5. Advertising",
    body: [
      "This Site may display advertisements served by Google AdSense and potentially other advertising networks. These advertisements help us operate the Site free of charge for all users.",
      "Advertisements displayed on this Site are provided by third-party advertising networks. We do not control the content of these advertisements. The appearance of an advertisement does not constitute endorsement of the advertised product, service, or company.",
      "Google AdSense and other advertising partners may use cookies and similar tracking technologies to serve personalised advertisements based on browsing behaviour across websites.",
      "You can opt out of personalised advertising from Google by visiting adssettings.google.com. You can also opt out of interest-based advertising from participating third-party advertisers through applicable regional opt-out tools.",
      "We are not responsible for the content, accuracy, or legality of third-party advertisements. Any transactions you enter into with advertisers are solely between you and that advertiser."
    ]
  },
  {
    title: "6. Disclaimer of Warranties",
    body: [
      'The Site and its content are provided on an "as is" and "as available" basis without warranties of any kind, either express or implied.',
      "We do not warrant that the Site will be uninterrupted, error-free, free of viruses, or that postcode data or other content will be accurate, complete, or current.",
      "Postcode boundaries and assignments change over time. For authoritative postcode information, refer directly to Australia Post at auspost.com.au or New Zealand Post at nzpost.co.nz."
    ]
  },
  {
    title: "7. Limitation of Liability",
    body: [
      "To the fullest extent permitted by applicable law, AusNZPostcode.com and its operators shall not be liable for direct, indirect, incidental, special, consequential, or punitive damages arising from your use of or inability to use the Site.",
      "This includes damages arising from errors, omissions, or inaccuracies in postcode data or other content, unauthorised access to or alteration of data, third-party conduct or content, external links, or advertisements displayed on the Site.",
      "This limitation applies regardless of legal theory, even if we have been advised of the possibility of such damages."
    ]
  },
  {
    title: "8. External Links",
    body: [
      "The Site may contain links to third-party websites including Australia Post, New Zealand Post, GeoNames, and OpenStreetMap. These links are provided for convenience and reference only.",
      "We have no control over the content, privacy practices, or availability of external sites and accept no responsibility for them. Linking to a third-party site does not constitute endorsement."
    ]
  },
  {
    title: "9. Indemnification",
    body: [
      "You agree to indemnify, defend, and hold harmless AusNZPostcode.com and its operators from any claims, damages, losses, liabilities, costs, and expenses, including reasonable legal fees, arising from your use of the Site or violation of these Terms."
    ]
  },
  {
    title: "10. Contact",
    body: [
      "For questions about these Terms of Use, contact contact@AusNZPostcode.com."
    ]
  }
];

export default function TermsPage() {
  const schema = [
    breadcrumbSchema([
      { name: "Home", href: "/" },
      { name: "Terms of Use", href: "/terms" }
    ]),
    placeSchema("AusNZPostcode.com Terms of Use", "/terms", "Terms of use for AusNZPostcode.com.")
  ];

  return (
    <>
      <JsonLd data={schema} />
      <div className="border-b border-border bg-white px-4 py-2.5 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Terms of Use", href: "/terms" }]} />
        </div>
      </div>
      <section className="bg-[linear-gradient(135deg,#0B2545_0%,#112d5e_100%)] px-4 py-12 text-white sm:px-6">
        <div className="mx-auto max-w-6xl">
          <p className="font-heading text-xs font-bold uppercase tracking-[0.16em] text-coral">Legal</p>
          <h1 className="mt-3 max-w-3xl font-heading text-4xl font-extrabold tracking-normal sm:text-5xl">Terms of Use</h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-ice sm:text-lg">
            Terms for using AusNZPostcode.com, including acceptable use, data source notes, advertising, disclaimers, and liability limitations.
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
          {termsSections.map((section) => (
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
