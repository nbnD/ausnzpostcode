import type { Metadata } from "next";
import { CountryDirectoryPage } from "@/components/CountryDirectoryPage";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Australia Postcode Directory",
  description:
    "Browse Australian postcodes, suburbs, states, territories, maps, and local postcode information from one fast static directory.",
  path: "/au"
});

export default function AustraliaDirectory() {
  return <CountryDirectoryPage country="au" />;
}
