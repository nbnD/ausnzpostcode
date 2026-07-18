import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PostcodeDetailPage } from "@/components/PostcodeDetailPage";
import { findPostcode, getCountryPostcodes, getDisplayLocality, getLocalitySummary } from "@/data/postcodes";
import { createMetadata } from "@/lib/metadata";
import { getPoiCountsForPostcode } from "@/lib/poi-data";
import { buildPoiMetaDescription } from "@/lib/poi-seo";

type Params = { postcode: string };

export function generateStaticParams(): Params[] {
  return getCountryPostcodes("nz").map((item) => ({ postcode: item.code }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { postcode: code } = await params;
  const postcode = findPostcode("nz", code);

  if (!postcode) {
    return createMetadata({
      title: "New Zealand Postcode Not Found",
      description: "The requested New Zealand postcode could not be found.",
      path: `/nz/postcode/${code}`
    });
  }

  const areaParts = [postcode.territory, postcode.island].filter(Boolean).join(", ");
  const areaDescription = areaParts ? `listed area data for ${areaParts}` : undefined;
  const baseDescription = `Postcode ${postcode.code} covers ${getLocalitySummary(postcode)} in ${postcode.stateFull}${areaDescription ? `, with ${areaDescription}` : ""}. Browse map, nearby postcodes, local classifications, and FAQs.`;

  return createMetadata({
    title: `${postcode.code} Postcode - ${getDisplayLocality(postcode)} ${postcode.stateFull}`,
    description: buildPoiMetaDescription({
      postcode: postcode.code,
      locality: getDisplayLocality(postcode),
      stateFull: postcode.stateFull,
      baseDescription,
      areaDescription,
      counts: getPoiCountsForPostcode("nz", postcode.code)
    }),
    path: `/nz/postcode/${postcode.code}`
  });
}

export default async function NewZealandPostcodePage({ params }: { params: Promise<Params> }) {
  const { postcode: code } = await params;
  const postcode = findPostcode("nz", code);

  if (!postcode) notFound();

  return <PostcodeDetailPage postcode={postcode} />;
}
