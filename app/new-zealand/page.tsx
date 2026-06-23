import type { Metadata } from "next";
import { Card } from "@/components/Card";
import { PageIntro } from "@/components/PageIntro";
import { createMetadata } from "@/lib/metadata";
import { breadcrumbSchema, faqSchema, placeSchema } from "@/lib/schema";
import countries from "@/data/countries.json";

const newZealand = countries.find((country) => country.slug === "new-zealand")!;

export const metadata: Metadata = createMetadata({
  title: "New Zealand Postcode Directory",
  description:
    "Browse New Zealand postcode coverage by region, with static SEO pages prepared for local postcode data.",
  path: "/new-zealand"
});

const faqs = [
  {
    question: "Which New Zealand regions are included first?",
    answer:
      "The foundation includes high-level regional placeholders so postcode and locality pages can be generated from local data."
  },
  {
    question: "Is the New Zealand directory static?",
    answer:
      "Yes. The site is configured for static export and GitHub Pages deployment without backend routes."
  }
];

export default function NewZealandPage() {
  const schema = [
    breadcrumbSchema([
      { name: "Home", href: "/" },
      { name: "New Zealand", href: "/new-zealand" }
    ]),
    faqSchema(faqs),
    placeSchema("New Zealand", "/new-zealand", newZealand.summary)
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
          { label: "New Zealand", href: "/new-zealand" }
        ]}
        eyebrow="NZ"
        title="New Zealand Postcode Directory"
        description="A static-first directory foundation for New Zealand regions, towns, suburbs, and postcodes."
      />
      <section className="bg-shell py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {newZealand.featuredRegions.map((region) => (
              <Card key={region} title={region} eyebrow="Region">
                Postcode and locality pages for {region} will be generated from local JSON data.
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
