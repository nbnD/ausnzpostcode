import type { Metadata } from "next";
import { Card } from "@/components/Card";
import { PageIntro } from "@/components/PageIntro";
import { createMetadata } from "@/lib/metadata";
import { getPoiManifest } from "@/lib/poi-data";
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
  const poiManifest = getPoiManifest();
  const generatedDate = poiManifest?.generatedAt
    ? new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(new Date(poiManifest.generatedAt))
    : "available during local POI-enabled builds";
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
        description="The directory uses local postcode datasets and offline OpenStreetMap place extraction for static pages."
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
        <div className="mx-auto mt-6 grid max-w-7xl gap-5 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
          <Card title="OpenStreetMap nearby places" eyebrow="Local discovery">
            Nearby parks, public BBQ locations, dog parks, playgrounds, picnic sites,
            viewpoints and museums are extracted offline from OpenStreetMap data. Place
            data © OpenStreetMap contributors, available under the ODbL.
          </Card>
          <Card title="Postcode-centre matching" eyebrow="Method">
            OpenStreetMap places are matched by distance from postcode centre coordinates.
            This is nearby matching for general reference, not a statement about postal
            delivery areas or official boundaries.
          </Card>
          <Card title="Category radii and limits" eyebrow="Controls">
            The current radii are 5 km for public BBQs, parks and playgrounds, 8 km for
            dog parks, 10 km for picnic sites, 15 km for museums and 20 km for viewpoints.
            Each postcode keeps up to 10 places per category and 30 places total.
          </Card>
          <Card title="Generated dataset" eyebrow="Freshness">
            The nearby-place dataset is generated offline and validated before use.
            Current generated date: {generatedDate}. OpenStreetMap coverage may be
            incomplete, and the site is not affiliated with OpenStreetMap, Australia Post,
            NZ Post or any government agency.
          </Card>
        </div>
      </section>
    </>
  );
}
