import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RegionListPage } from "@/components/BrowsePages";
import { findRegion, getRegions } from "@/data/postcodes";
import { createMetadata } from "@/lib/metadata";

type Params = { state: string };

export function generateStaticParams(): Params[] {
  return getRegions("au").map((region) => ({ state: (region.abbr ?? region.name).toLowerCase() }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { state } = await params;
  const region = findRegion("au", state);

  if (!region) {
    return createMetadata({
      title: "Australian State Not Found",
      description: "The requested Australian state or territory could not be found.",
      path: `/au/state/${state}`
    });
  }

  return createMetadata({
    title: `${region.name} Postcodes`,
    description: `Browse postcodes, suburbs, and locality pages for ${region.name}, Australia.`,
    path: `/au/state/${state}`
  });
}

export default async function AustralianStatePage({ params }: { params: Promise<Params> }) {
  const { state } = await params;
  if (!findRegion("au", state)) notFound();
  return <RegionListPage country="au" slug={state} />;
}
