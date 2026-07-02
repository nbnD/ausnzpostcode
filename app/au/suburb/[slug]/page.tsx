import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LocalityDetailPage } from "@/components/LocalityDetailPage";
import { findLocality, getCountryLocalities } from "@/data/postcodes";
import { createMetadata } from "@/lib/metadata";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return getCountryLocalities("au").map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const locality = findLocality("au", slug);

  if (!locality) {
    return createMetadata({
      title: "Australian Suburb Not Found",
      description: "The requested Australian suburb could not be found.",
      path: `/au/suburb/${slug}`
    });
  }

  return createMetadata({
    title: `${locality.name} Postcode ${locality.postcode}`,
    description: `${locality.name} is in ${locality.stateFull}, Australia. View postcode ${locality.postcode}, map, nearby suburbs, and FAQs.`,
    path: `/au/suburb/${locality.slug}`
  });
}

export default async function AustralianSuburbPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const locality = findLocality("au", slug);

  if (!locality) notFound();

  return <LocalityDetailPage locality={locality} />;
}
