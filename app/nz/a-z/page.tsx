import type { Metadata } from "next";
import { AZPage } from "@/components/BrowsePages";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "New Zealand Postcode Directory A-Z",
  description: "Jump to New Zealand localities and postcode pages by first letter.",
  path: "/nz/a-z"
});

export default function NewZealandAZPage() {
  return <AZPage country="nz" />;
}
