import type { Metadata } from "next";
import { AZPage } from "@/components/BrowsePages";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Australia Postcode Directory A-Z",
  description: "Jump to Australian suburbs and postcode pages by first letter.",
  path: "/au/a-z"
});

export default function AustralianAZPage() {
  return <AZPage country="au" />;
}
