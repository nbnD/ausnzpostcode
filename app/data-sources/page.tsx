import type { Metadata } from "next";
import { Card } from "@/components/Card";
import { PageIntro } from "@/components/PageIntro";
import { createMetadata } from "@/lib/metadata";
import { breadcrumbSchema, faqSchema, placeSchema } from "@/lib/schema";

export const metadata: Metadata = createMetadata({
  title: "Data Sources",
  description:
    "Data source policy for AusNZ Postcode, including local JSON data, official references, and open mapping constraints.",
  path: "/data-sources"
});

const faqs = [
  {
    question: "Can this project fetch raw GitHub data at runtime?",
    answer:
      "No. Runtime GitHub data fetches are out of scope. Source data should live locally in the repository."
  },
  {
    question: "Can this project use Google Maps?",
    answer: "No. Mapping must use OpenStreetMap and Leaflet only."
  }
];

export default function DataSourcesPage() {
  const schema = [
    breadcrumbSchema([
      { name: "Home", href: "/" },
      { name: "Data Sources", href: "/data-sources" }
    ]),
    faqSchema(faqs),
    placeSchema("AusNZ Postcode data sources", "/data-sources", "Data source policy.")
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
          { label: "Data Sources", href: "/data-sources" }
        ]}
        title="Data Sources"
        description="The directory is prepared for local data files, official citations, and open mapping only."
      />
      <section className="bg-shell py-16">
        <div className="mx-auto grid max-w-7xl gap-5 px-4 sm:px-6 md:grid-cols-3 lg:px-8">
          <Card title="Local repository data" eyebrow="Storage">
            Source files are stored under the data directory and used during static
            generation. The app does not fetch raw GitHub files at runtime.
          </Card>
          <Card title="AU and NZ datasets" eyebrow="Sources">
            Australian and New Zealand postcode JSON files are sourced from the open
            matthewproctor/australianpostcodes repository and checked in locally for
            static use.
          </Card>
          <Card title="Open maps only" eyebrow="Maps">
            Map features should use OpenStreetMap-compatible tiles and Leaflet, without
            paid APIs or Google Maps.
          </Card>
        </div>
      </section>
    </>
  );
}
