import type { Metadata } from "next";
import { LocalityListPage } from "@/components/BrowsePages";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Australian Suburbs A-Z",
  description: "Browse Australian suburbs and localities by name, postcode, state, and territory.",
  path: "/au/suburbs"
});

export default function AustralianSuburbsPage() {
  return <LocalityListPage country="au" />;
}
