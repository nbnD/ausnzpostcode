import type { Metadata } from "next";
import { CountryDirectoryPage } from "@/components/CountryDirectoryPage";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "New Zealand Postcode Directory",
  description:
    "Browse New Zealand postcodes, localities, regions, maps, and local postcode information from one fast static directory.",
  path: "/nz"
});

export default function NewZealandDirectory() {
  return <CountryDirectoryPage country="nz" />;
}
