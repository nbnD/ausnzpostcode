import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CityLandingPage } from "@/components/CityLandingPage";
import { cityPath, findCityPage, getCityLocalities, getCityPages, getCityPostcodes } from "@/data/city-pages";
import { formatCount } from "@/data/postcodes";
import { createMetadata } from "@/lib/metadata";

type Params = { city: string };

export function generateStaticParams(): Params[] {
  return getCityPages("nz").map((city) => ({ city: city.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { city: slug } = await params;
  const city = findCityPage("nz", slug);

  if (!city) {
    return createMetadata({
      title: "New Zealand City Postcodes Not Found",
      description: "The requested New Zealand city postcode guide could not be found.",
      path: `/nz/city/${slug}`
    });
  }

  const postcodes = getCityPostcodes(city);
  const localities = getCityLocalities(city);

  return createMetadata({
    title: `${city.name} Postcodes`,
    description: `Browse ${formatCount(postcodes.length)} ${city.name} postcodes and ${formatCount(localities.length)} related localities in ${city.stateFull}, New Zealand.`,
    path: cityPath(city)
  });
}

export default async function NewZealandCityPage({ params }: { params: Promise<Params> }) {
  const { city: slug } = await params;
  const city = findCityPage("nz", slug);

  if (!city) notFound();

  return <CityLandingPage city={city} />;
}
