import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RegionListPage } from "@/components/BrowsePages";
import { findRegion, getRegions, slugify } from "@/data/postcodes";
import { createMetadata } from "@/lib/metadata";

type Params = { region: string };

export function generateStaticParams(): Params[] {
  return getRegions("nz").map((region) => ({ region: slugify(region.name) }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { region: slug } = await params;
  const region = findRegion("nz", slug);

  if (!region) {
    return createMetadata({
      title: "New Zealand Region Not Found",
      description: "The requested New Zealand region could not be found.",
      path: `/nz/region/${slug}`
    });
  }

  return createMetadata({
    title: `${region.name} Postcodes`,
    description: `Browse postcodes and locality pages for ${region.name}, New Zealand.`,
    path: `/nz/region/${slug}`
  });
}

export default async function NewZealandRegionPage({ params }: { params: Promise<Params> }) {
  const { region } = await params;
  if (!findRegion("nz", region)) notFound();
  return <RegionListPage country="nz" slug={region} />;
}
