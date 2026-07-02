import type { Metadata } from "next";
import { LocalityListPage } from "@/components/BrowsePages";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "New Zealand Localities A-Z",
  description: "Browse New Zealand localities by name, postcode, and region.",
  path: "/nz/localities"
});

export default function NewZealandLocalitiesPage() {
  return <LocalityListPage country="nz" />;
}
