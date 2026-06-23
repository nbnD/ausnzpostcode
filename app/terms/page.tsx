import type { Metadata } from "next";
import { PageIntro } from "@/components/PageIntro";
import { createMetadata } from "@/lib/metadata";
import { breadcrumbSchema, faqSchema, placeSchema } from "@/lib/schema";

export const metadata: Metadata = createMetadata({
  title: "Terms",
  description:
    "Terms of use for AusNZ Postcode, including acceptable use of the static postcode directory.",
  path: "/terms"
});

export default function TermsPage() {
  const schema = [
    breadcrumbSchema([
      { name: "Home", href: "/" },
      { name: "Terms", href: "/terms" }
    ]),
    faqSchema([
      {
        question: "Can I rely on this site as legal or postal advice?",
        answer:
          "No. The directory is informational and should be checked against official sources for critical decisions."
      }
    ]),
    placeSchema("AusNZ Postcode terms", "/terms", "Terms of use for AusNZ Postcode.")
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
          { label: "Terms", href: "/terms" }
        ]}
        title="Terms"
        description="Terms for using AusNZ Postcode."
      />
      <section className="bg-shell py-16">
        <div className="mx-auto max-w-3xl space-y-6 px-4 text-ink-muted sm:px-6 lg:px-8">
          <p>
            AusNZ Postcode is provided for general information and directory browsing. You
            should verify important postcode, boundary, and address decisions against
            official sources.
          </p>
          <p>
            Do not misuse the site, attempt to disrupt its hosting, or represent generated
            directory pages as official postal authority records.
          </p>
        </div>
      </section>
    </>
  );
}
