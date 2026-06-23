import type { Metadata } from "next";
import { PageIntro } from "@/components/PageIntro";
import { createMetadata } from "@/lib/metadata";
import { breadcrumbSchema, faqSchema, placeSchema } from "@/lib/schema";

export const metadata: Metadata = createMetadata({
  title: "Privacy Policy",
  description:
    "Privacy policy for AusNZ Postcode, a static postcode directory with no backend account system.",
  path: "/privacy-policy"
});

export default function PrivacyPolicyPage() {
  const schema = [
    breadcrumbSchema([
      { name: "Home", href: "/" },
      { name: "Privacy Policy", href: "/privacy-policy" }
    ]),
    faqSchema([
      {
        question: "Does AusNZ Postcode require user accounts?",
        answer: "No. The static site foundation does not include accounts, a backend, or API routes."
      }
    ]),
    placeSchema("AusNZ Postcode privacy", "/privacy-policy", "Privacy policy for AusNZ Postcode.")
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
          { label: "Privacy Policy", href: "/privacy-policy" }
        ]}
        title="Privacy Policy"
        description="How this static postcode directory approaches privacy."
      />
      <section className="bg-shell py-16">
        <div className="mx-auto max-w-3xl space-y-6 px-4 text-ink-muted sm:px-6 lg:px-8">
          <p>
            AusNZ Postcode is built as a static website. The foundation does not include
            user accounts, a database, backend processing, or API routes.
          </p>
          <p>
            Standard hosting logs may be processed by GitHub Pages or other hosting
            providers. Future analytics, if added, should be privacy-conscious and disclosed
            here before use.
          </p>
        </div>
      </section>
    </>
  );
}
