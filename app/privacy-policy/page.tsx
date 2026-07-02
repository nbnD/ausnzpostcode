import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { createMetadata } from "@/lib/metadata";
import { breadcrumbSchema, placeSchema } from "@/lib/schema";

export const metadata: Metadata = createMetadata({
  title: "Privacy Policy",
  description:
    "Privacy Policy for AusNZPostcode.com, including what information is collected, cookies, analytics, third-party services, data retention, and user rights.",
  path: "/privacy-policy"
});

const privacySections = [
  {
    title: "1. Introduction",
    body: [
      'Welcome to AusNZPostcode.com ("we", "us", "our"). This Privacy Policy explains how we collect, use, and protect information when you visit and use ausnzpostcode.com (the "Site").',
      "We are committed to protecting your privacy. AusNZPostcode.com is a free postcode reference tool. You do not need to create an account, log in, or provide any personal information to use this Site. We collect only the minimum data necessary to operate and improve the Site.",
      "Please read this policy carefully. By using the Site, you agree to the practices described in this Privacy Policy. If you do not agree, please stop using the Site."
    ]
  },
  {
    title: "2. Who We Are",
    body: [
      "AusNZPostcode.com is an independently operated website providing free postcode lookup services for Australia and New Zealand. We are not affiliated with Australia Post, New Zealand Post, or any government agency.",
      "For privacy-related enquiries, contact us at contact@AusNZPostcode.com."
    ]
  },
  {
    title: "3. What Information We Collect",
    body: [
      "We collect two types of information: information you provide to us voluntarily, and information collected automatically when you visit the Site.",
      "Information you provide: if you contact us via our contact form or by email, we collect your name, email address, and the content of your message. This information is used solely to respond to your enquiry and is not stored beyond what is necessary for that purpose.",
      "You do not need to register, subscribe, or provide personal details to search postcodes on this Site.",
      "Information collected automatically may include anonymised usage data, device and browser information, referring website or search engine, server log data, and anonymous search query trends used to improve the Site."
    ]
  },
  {
    title: "4. Cookies and Tracking Technologies",
    body: [
      "Cookies are small text files stored on your device by your browser when you visit a website. They are commonly used to make websites work efficiently and to provide information to website owners.",
      "Essential cookies may be used for basic functionality such as remembering country preference. These cookies do not collect personal information.",
      "If analytics are enabled, Google Analytics may be used to understand how visitors use the Site. Analytics data is aggregated and anonymised and does not identify you personally.",
      "Postcode detail pages may load map tiles from OpenStreetMap. Your browser may request map tiles directly from OpenStreetMap servers in accordance with their privacy policy.",
      "You can control and manage cookies through your browser settings. Disabling cookies may affect some functionality."
    ]
  },
  {
    title: "5. How We Use Your Information",
    body: [
      "We use collected information to operate and maintain the Site, diagnose errors, improve search and page content, respond to enquiries, ensure security, prevent abuse, and comply with legal obligations.",
      "We do not use your information for selling personal data or creating user accounts. We do not add contact enquiries to mailing lists."
    ]
  },
  {
    title: "6. How We Share Your Information",
    body: [
      "We do not sell, rent, or trade your personal information to any third party.",
      "We may use service providers to operate the Site, including static hosting, analytics, and OpenStreetMap map tile delivery. These providers process information according to their own privacy policies.",
      "We may disclose information if required by law, in response to a valid legal request, or to protect the rights, property, or safety of AusNZPostcode.com, its users, or the public.",
      "If AusNZPostcode.com is transferred to a new owner or undergoes a merger or acquisition, user information held at that time may be transferred as part of that transaction."
    ]
  },
  {
    title: "7. Data Retention",
    body: [
      "Analytics data, if collected, is retained according to the settings of the analytics provider.",
      "Server logs are retained by the hosting provider for a limited period for security, diagnostics, and abuse prevention.",
      "Contact enquiries are retained only as long as necessary to resolve your enquiry and are then deleted when no longer needed.",
      "We do not store passwords, payment information, or account records because the Site does not require accounts or payments."
    ]
  },
  {
    title: "8. Data Security",
    body: [
      "We take reasonable technical and organisational measures to protect information against unauthorised access, loss, misuse, or disclosure.",
      "These measures include HTTPS encryption, static hosting, no password storage, no payment storage, and minimal data collection.",
      "No method of transmission over the internet or electronic storage is completely secure. We cannot guarantee absolute security."
    ]
  },
  {
    title: "9. Children's Privacy",
    body: [
      "AusNZPostcode.com is a general reference tool intended for users of all ages. We do not knowingly collect personal information from children under the age of 13.",
      "If you believe a child under 13 has submitted personal information to us, contact contact@AusNZPostcode.com and we will delete that information promptly."
    ]
  },
  {
    title: "10. Your Rights",
    body: [
      "Depending on your location, you may have rights to access, correct, delete, object to processing, or withdraw consent relating to personal information we hold about you.",
      "To exercise these rights, contact contact@AusNZPostcode.com. We will respond to requests within 30 days.",
      "Australian users may contact the Office of the Australian Information Commissioner at oaic.gov.au. New Zealand users may contact the Office of the Privacy Commissioner at privacy.org.nz. EEA and UK users may contact their local data protection authority."
    ]
  },
  {
    title: "11. Third-Party Links",
    body: [
      "This Site may contain links to external websites including Australia Post, New Zealand Post, GeoNames, and OpenStreetMap. These links are provided for reference only.",
      "We are not responsible for the privacy practices or content of third-party websites. We encourage you to read the privacy policy of any external site you visit."
    ]
  },
  {
    title: "12. Changes to This Privacy Policy",
    body: [
      'We may update this Privacy Policy from time to time. When we make changes, we will update the "Last Updated" date at the top of this page.',
      "Your continued use of the Site after changes constitutes acceptance of the updated policy."
    ]
  },
  {
    title: "13. Compliance with Privacy Laws",
    body: [
      "AusNZPostcode.com aims to comply with applicable privacy laws and transparency requirements, including the GDPR, CCPA, CPRA, CalOPPA, and LGPD where those laws apply to visitors using the Site.",
      "If you are covered by these laws, you may have rights to request access, correction, deletion, portability, restriction, objection, or opt-out of certain data uses. Because this Site does not require accounts, payments, or login credentials, most requests will relate only to contact messages, server logs, cookies, analytics, or advertising technologies.",
      "California users may request information about personal information practices and may opt out of sale or sharing where applicable. We do not sell personal information. Visitors may control cookies and personalised advertising through browser settings and advertising preference tools.",
      "EEA, UK, Brazilian, and other international visitors may contact us to exercise applicable privacy rights. We will respond within a reasonable period and in accordance with applicable law."
    ]
  },
  {
    title: "14. Contact Us",
    body: [
      "If you have questions, concerns, or complaints about this Privacy Policy or the way we handle your information, contact contact@AusNZPostcode.com.",
      "Website: ausnzpostcode.com/contact.",
      "We take privacy enquiries seriously and aim to respond within 30 days."
    ]
  }
];

export default function PrivacyPolicyPage() {
  const schema = [
    breadcrumbSchema([
      { name: "Home", href: "/" },
      { name: "Privacy Policy", href: "/privacy-policy" }
    ]),
    placeSchema("AusNZPostcode.com Privacy Policy", "/privacy-policy", "Privacy policy for AusNZPostcode.com.")
  ];

  return (
    <LegalPage
      schema={schema}
      eyebrow="Privacy"
      title="Privacy Policy"
      description="How AusNZPostcode.com collects, uses, protects, and discloses information when you use this free postcode directory."
      meta={[
        ["Website", "ausnzpostcode.com"],
        ["Effective Date", "22 June 2026"],
        ["Last Updated", "22 June 2026"]
      ]}
      sections={privacySections}
    />
  );
}

function LegalPage({
  schema,
  eyebrow,
  title,
  description,
  meta,
  sections
}: {
  schema: unknown;
  eyebrow: string;
  title: string;
  description: string;
  meta: Array<[string, string]>;
  sections: Array<{ title: string; body: string[] }>;
}) {
  return (
    <>
      <JsonLd data={schema} />
      <div className="border-b border-border bg-white px-4 py-2.5 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: title, href: "/privacy-policy" }]} />
        </div>
      </div>
      <section className="bg-[linear-gradient(135deg,#0B2545_0%,#112d5e_100%)] px-4 py-12 text-white sm:px-6">
        <div className="mx-auto max-w-6xl">
          <p className="font-heading text-xs font-bold uppercase tracking-[0.16em] text-coral">{eyebrow}</p>
          <h1 className="mt-3 max-w-3xl font-heading text-4xl font-extrabold tracking-normal sm:text-5xl">{title}</h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-ice sm:text-lg">{description}</p>
        </div>
      </section>
      <main className="mx-auto grid max-w-6xl gap-6 px-4 py-10 sm:px-6 lg:grid-cols-[260px_1fr]">
        <aside className="h-fit rounded-[14px] border border-border bg-white p-5 text-sm text-muted lg:sticky lg:top-24">
          <dl className="space-y-3">
            {meta.map(([label, value]) => (
              <div key={label}>
                <dt className="font-heading text-xs font-bold uppercase tracking-[0.08em] text-navy">{label}</dt>
                <dd className="mt-1">{value}</dd>
              </div>
            ))}
          </dl>
          <Link href="/contact" className="mt-5 inline-flex text-sm font-bold text-coral hover:underline">
            Contact us
          </Link>
        </aside>
        <article className="space-y-5">
          {sections.map((section) => (
            <section key={section.title} className="rounded-[14px] border border-border bg-white p-6 sm:p-8">
              <h2 className="font-heading text-xl font-extrabold text-navy">{section.title}</h2>
              <div className="mt-4 space-y-4 text-sm leading-7 text-muted">
                {section.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}
        </article>
      </main>
    </>
  );
}
