import type { Metadata } from "next";
import { SearchResults } from "@/components/SearchResults";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Search Postcodes",
  description:
    "Search Australian and New Zealand postcodes by suburb, locality, postcode number, state, region, and type.",
  path: "/search"
});

export default function SearchPage() {
  return <SearchResults />;
}
