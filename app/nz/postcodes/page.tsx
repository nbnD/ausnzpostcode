import type { Metadata } from "next";
import { PostcodeListPage } from "@/components/BrowsePages";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "New Zealand Postcodes A-Z",
  description: "Browse all New Zealand postcode pages by postcode number, locality, and region.",
  path: "/nz/postcodes"
});

export default function NewZealandPostcodesPage() {
  return <PostcodeListPage country="nz" />;
}
