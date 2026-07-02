import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LocalityDetailPage } from "@/components/LocalityDetailPage";
import { findLocality, getCountryLocalities } from "@/data/postcodes";
import { createMetadata } from "@/lib/metadata";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return getCountryLocalities("nz").map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const locality = findLocality("nz", slug);

  if (!locality) {
    return createMetadata({
      title: "New Zealand Locality Not Found",
      description: "The requested New Zealand locality could not be found.",
      path: `/nz/locality/${slug}`
    });
  }

  return createMetadata({
    title: `${locality.name} Postcode ${locality.postcode}`,
    description: `${locality.name} is in ${locality.stateFull}, New Zealand. View postcode ${locality.postcode}, map, nearby localities, and FAQs.`,
    path: `/nz/locality/${locality.slug}`
  });
}

export default async function NewZealandLocalityPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const locality = findLocality("nz", slug);

  if (!locality) notFound();

  return <LocalityDetailPage locality={locality} />;
}
