import type { Metadata } from "next";
import { PageIntro } from "@/components/PageIntro";
import { createMetadata } from "@/lib/metadata";
import { breadcrumbSchema, faqSchema, placeSchema } from "@/lib/schema";

export const metadata: Metadata = createMetadata({
  title: "Disclaimer",
  description:
    "Disclaimer for AusNZ Postcode, including accuracy, source, and official verification notes.",
  path: "/disclaimer"
});

export default function DisclaimerPage() {
  const schema = [
    breadcrumbSchema([
      { name: "Home", href: "/" },
      { name: "Disclaimer", href: "/disclaimer" }
    ]),
    faqSchema([
      {
        question: "Is AusNZ Postcode an official postal authority?",
        answer:
          "No. AusNZ Postcode is an independent directory and should cite official sources where possible."
      }
    ]),
    placeSchema("AusNZ Postcode disclaimer", "/disclaimer", "Disclaimer for AusNZ Postcode.")
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <PageIntro
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Disclaimer", href: "/disclaimer" }
        ]}
        title="Disclaimer"
        description="Important notes about accuracy, official status, and source verification."
      />
      <section className="bg-shell py-16">
        <div className="mx-auto max-w-3xl space-y-6 px-4 text-ink-muted sm:px-6 lg:px-8">
          <p>
            AusNZ Postcode is not an official postal, government, or geospatial authority.
            Information should be treated as a convenient directory reference.
          </p>
          <p>
            Postcodes, place names, and administrative boundaries can change. Always verify
            critical use cases with official sources before acting.
          </p>
        </div>
      </section>
    </>
  );
}
