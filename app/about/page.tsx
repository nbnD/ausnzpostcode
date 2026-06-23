import type { Metadata } from "next";
import { PageIntro } from "@/components/PageIntro";
import { createMetadata } from "@/lib/metadata";
import { breadcrumbSchema, faqSchema, placeSchema } from "@/lib/schema";

export const metadata: Metadata = createMetadata({
  title: "About",
  description:
    "Learn about AusNZ Postcode, a static Australia and New Zealand postcode directory focused on speed, clarity, and transparent sources.",
  path: "/about"
});

export default function AboutPage() {
  const schema = [
    breadcrumbSchema([
      { name: "Home", href: "/" },
      { name: "About", href: "/about" }
    ]),
    faqSchema([
      {
        question: "What is AusNZ Postcode?",
        answer:
          "AusNZ Postcode is a static postcode directory foundation for Australia and New Zealand."
      }
    ]),
    placeSchema("AusNZ Postcode", "/about", "Postcode directory for Australia and New Zealand.")
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
          { label: "About", href: "/about" }
        ]}
        title="About AusNZ Postcode"
        description="A fast, transparent postcode directory built as static pages for Australia and New Zealand."
      />
      <section className="bg-shell py-16">
        <div className="mx-auto max-w-3xl space-y-6 px-4 text-ink-muted sm:px-6 lg:px-8">
          <p>
            AusNZ Postcode is designed to make postcode lookup pages easier to browse,
            faster to load, and clearer about where the underlying information comes from.
          </p>
          <p>
            The site is intentionally static: no backend, no paid APIs, and no runtime data
            fetches from GitHub. As postcode data is added, pages can be generated from local
            JSON files and deployed to GitHub Pages.
          </p>
        </div>
      </section>
    </>
  );
}
