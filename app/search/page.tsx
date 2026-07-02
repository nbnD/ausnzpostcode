import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { SearchResults } from "@/components/SearchResults";
import { createMetadata } from "@/lib/metadata";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = createMetadata({
  title: "Search Postcodes",
  description:
    "Search Australian and New Zealand postcodes by suburb, locality, postcode number, state, region, and type.",
  path: "/search"
});

export default function SearchPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", href: "/" }, { name: "Search", href: "/search" }])} />
      <div className="border-b border-border bg-white px-4 py-2.5 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Search", href: "/search" }]} />
        </div>
      </div>
      <SearchResults />
    </>
  );
}
