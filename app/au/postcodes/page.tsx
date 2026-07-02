import type { Metadata } from "next";
import { PostcodeListPage } from "@/components/BrowsePages";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Australian Postcodes A-Z",
  description: "Browse all Australian postcode pages by postcode number, suburb, state, and territory.",
  path: "/au/postcodes"
});

export default function AustralianPostcodesPage() {
  return <PostcodeListPage country="au" />;
}
