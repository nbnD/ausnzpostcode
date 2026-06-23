import type { Metadata } from "next";
import { Card } from "@/components/Card";
import { PageIntro } from "@/components/PageIntro";
import { createMetadata } from "@/lib/metadata";
import { breadcrumbSchema, faqSchema, placeSchema } from "@/lib/schema";
import countries from "@/data/countries.json";

const australia = countries.find((country) => country.slug === "australia")!;

export const metadata: Metadata = createMetadata({
  title: "Australia Postcode Directory",
  description:
    "Browse Australian postcode coverage by state and territory, with static SEO pages prepared for local postcode data.",
  path: "/australia"
});

const faqs = [
  {
    question: "Which Australian regions are included first?",
    answer:
      "The foundation includes placeholders for all states and territories so local postcode pages can be generated as data is added."
  },
  {
    question: "Will Australian pages use Google Maps?",
    answer:
      "No. Any map experience should use OpenStreetMap-compatible data and Leaflet only."
  }
];

export default function AustraliaPage() {
  const schema = [
    breadcrumbSchema([
      { name: "Home", href: "/" },
      { name: "Australia", href: "/australia" }
    ]),
    faqSchema(faqs),
    placeSchema("Australia", "/australia", australia.summary)
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
          { label: "Australia", href: "/australia" }
        ]}
        eyebrow="AU"
        title="Australia Postcode Directory"
        description="A static-first directory foundation for Australian states, territories, suburbs, and postcodes."
      />
      <section className="bg-shell py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {australia.featuredRegions.map((region) => (
              <Card key={region} title={region} eyebrow="Region">
                Postcode and suburb pages for {region} will be generated from local JSON data.
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
