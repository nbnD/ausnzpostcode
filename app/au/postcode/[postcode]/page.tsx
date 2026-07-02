import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PostcodeDetailPage } from "@/components/PostcodeDetailPage";
import { findPostcode, getCountryPostcodes, getDisplayLocality, getLocalitySummary } from "@/data/postcodes";
import { createMetadata } from "@/lib/metadata";

type Params = { postcode: string };

export function generateStaticParams(): Params[] {
  return getCountryPostcodes("au").map((item) => ({ postcode: item.code }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { postcode: code } = await params;
  const postcode = findPostcode("au", code);

  if (!postcode) {
    return createMetadata({
      title: "Australian Postcode Not Found",
      description: "The requested Australian postcode could not be found.",
      path: `/au/postcode/${code}`
    });
  }

  return createMetadata({
    title: `${postcode.code} Postcode - ${getDisplayLocality(postcode)} ${postcode.state}`,
    description: `Postcode ${postcode.code} covers ${getLocalitySummary(postcode)} in ${postcode.stateFull}. Browse map, nearby postcodes, and FAQs.`,
    path: `/au/postcode/${postcode.code}`
  });
}

export default async function AustralianPostcodePage({ params }: { params: Promise<Params> }) {
  const { postcode: code } = await params;
  const postcode = findPostcode("au", code);

  if (!postcode) notFound();

  return <PostcodeDetailPage postcode={postcode} />;
}
