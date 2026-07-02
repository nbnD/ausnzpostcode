import type { Metadata } from "next";
import Link from "next/link";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = {
  ...createMetadata({
    title: "New Zealand Postcode Directory Moved",
    description: "The New Zealand postcode directory has moved to /nz.",
    path: "/nz"
  }),
  robots: {
    index: false,
    follow: true
  }
};

export default function NewZealandLegacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6">
      <h1 className="font-heading text-4xl font-extrabold text-navy">New Zealand directory moved</h1>
      <p className="mt-4 text-muted">The production New Zealand postcode directory is now available at /nz.</p>
      <Link href="/nz" className="btn-primary mt-6">Open New Zealand directory</Link>
    </main>
  );
}
