import type { Metadata } from "next";
import { PageIntro } from "@/components/PageIntro";
import { createMetadata } from "@/lib/metadata";
import { breadcrumbSchema, faqSchema, placeSchema } from "@/lib/schema";

export const metadata: Metadata = createMetadata({
  title: "Contact",
  description:
    "Contact AusNZ Postcode about corrections, source suggestions, and postcode directory feedback.",
  path: "/contact"
});

export default function ContactPage() {
  const schema = [
    breadcrumbSchema([
      { name: "Home", href: "/" },
      { name: "Contact", href: "/contact" }
    ]),
    faqSchema([
      {
        question: "How can I suggest a correction?",
        answer:
          "Send correction details with the page URL, the suggested change, and the source that supports it."
      }
    ]),
    placeSchema("AusNZ Postcode contact", "/contact", "Contact page for postcode directory feedback.")
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
          { label: "Contact", href: "/contact" }
        ]}
        title="Contact"
        description="Share postcode corrections, source suggestions, and directory feedback."
      />
      <section className="bg-shell py-16">
        <div className="mx-auto max-w-3xl px-4 text-ink-muted sm:px-6 lg:px-8">
          <p className="leading-7">
            For now, please use the GitHub repository to raise corrections or source
            suggestions. Include the page URL, the proposed change, and a reliable source.
          </p>
          <a
            href="https://github.com/nbnD/ausnzpostcode/issues"
            className="mt-6 inline-flex rounded-md bg-coast px-5 py-3 text-sm font-bold text-white hover:bg-ink"
          >
            Open a GitHub issue
          </a>
        </div>
      </section>
    </>
  );
}
