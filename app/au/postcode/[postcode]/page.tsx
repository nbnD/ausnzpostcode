import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PostcodeDetailPage } from "@/components/PostcodeDetailPage";
import { findPostcode, getCountryPostcodes, getDisplayLocality, getLocalitySummary } from "@/data/postcodes";
import { createMetadata } from "@/lib/metadata";
import { getPoiCountsForPostcode } from "@/lib/poi-data";
import { buildPoiMetaDescription } from "@/lib/poi-seo";

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

  const areaParts = [postcode.lga, postcode.sa3, postcode.phn].filter(Boolean).slice(0, 2).join(", ");
  const areaDescription = areaParts ? `listed area data for ${areaParts}` : undefined;
  const baseDescription = `Postcode ${postcode.code} covers ${getLocalitySummary(postcode)} in ${postcode.stateFull}${areaDescription ? `, with ${areaDescription}` : ""}. Browse map, nearby postcodes, local classifications, and FAQs.`;

  return createMetadata({
    title: `${postcode.code} Postcode - ${getDisplayLocality(postcode)} ${postcode.state}`,
    description: buildPoiMetaDescription({
      postcode: postcode.code,
      locality: getDisplayLocality(postcode),
      stateFull: postcode.stateFull,
      baseDescription,
      areaDescription,
      counts: getPoiCountsForPostcode("au", postcode.code)
    }),
    path: `/au/postcode/${postcode.code}`
  });
}

export default async function AustralianPostcodePage({ params }: { params: Promise<Params> }) {
  const { postcode: code } = await params;
  const postcode = findPostcode("au", code);

  if (!postcode) notFound();

  return <PostcodeDetailPage postcode={postcode} />;
}
