import type { Metadata } from "next";
import Link from "next/link";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = {
  ...createMetadata({
    title: "Australia Postcode Directory Moved",
    description: "The Australia postcode directory has moved to /au.",
    path: "/au"
  }),
  robots: {
    index: false,
    follow: true
  }
};

export default function AustraliaLegacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6">
      <h1 className="font-heading text-4xl font-extrabold text-navy">Australia directory moved</h1>
      <p className="mt-4 text-muted">The production Australia postcode directory is now available at /au.</p>
      <Link href="/au" className="btn-primary mt-6">Open Australia directory</Link>
    </main>
  );
}
