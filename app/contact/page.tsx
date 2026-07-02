import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { createMetadata } from "@/lib/metadata";
import { breadcrumbSchema, placeSchema } from "@/lib/schema";

export const metadata: Metadata = createMetadata({
  title: "Contact",
  description: "Contact AusNZPostcode.com for postcode corrections, privacy questions, legal enquiries, disclaimer questions, or general feedback.",
  path: "/contact"
});

export default function ContactPage() {
  const schema = [
    breadcrumbSchema([
      { name: "Home", href: "/" },
      { name: "Contact", href: "/contact" }
    ]),
    placeSchema("AusNZPostcode.com contact", "/contact", "Contact page for AusNZPostcode.com.")
  ];

  return (
    <>
      <JsonLd data={schema} />
      <div className="border-b border-border bg-white px-4 py-2.5 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Contact", href: "/contact" }]} />
        </div>
      </div>
      <section className="bg-[linear-gradient(135deg,#0B2545_0%,#112d5e_100%)] px-4 py-12 text-white sm:px-6">
        <div className="mx-auto max-w-6xl">
          <p className="font-heading text-xs font-bold uppercase tracking-[0.16em] text-coral">Contact</p>
          <h1 className="mt-3 max-w-3xl break-words font-heading text-4xl font-extrabold tracking-normal [overflow-wrap:anywhere] sm:text-5xl">
            Contact AusNZPostcode.com
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-ice sm:text-lg">
            For contact, legal, privacy, disclaimer, correction, or general enquiries, use the email below.
          </p>
        </div>
      </section>
      <main className="mx-auto max-w-3xl px-4 py-12 text-center sm:px-6">
        <div className="rounded-[14px] border border-border bg-white p-8 shadow-sm">
          <h2 className="font-heading text-xl font-extrabold text-navy">Email</h2>
          <a
            href="mailto:contact@AusNZPostcode.com"
            className="mt-4 inline-flex break-words text-lg font-bold text-coral [overflow-wrap:anywhere] hover:underline"
          >
            contact@AusNZPostcode.com
          </a>
        </div>
      </main>
    </>
  );
}
