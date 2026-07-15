import { siteConfig } from "./site";
import type { NearbyPoi } from "./poi-data";
import { displayPoiName, poiCategoryTitle } from "./poi-seo";

type Breadcrumb = {
  name: string;
  href: string;
};

export function breadcrumbSchema(items: Breadcrumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: new URL(item.href, siteConfig.url).toString()
    }))
  };
}

export function faqSchema(items: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer
      }
    }))
  };
}

export function placeSchema(name: string, path: string, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Place",
    name,
    description,
    url: new URL(path, siteConfig.url).toString()
  };
}

export function nearbyPoiItemListSchema({
  name,
  path,
  places
}: {
  name: string;
  path: string;
  places: NearbyPoi[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    url: new URL(path, siteConfig.url).toString(),
    numberOfItems: places.length,
    itemListElement: places.map((place, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Place",
        name: displayPoiName(place),
        url: place.googleMapsUrl,
        category: poiCategoryTitle(place.category),
        description: `${displayPoiName(place)} is ${place.distanceKm.toFixed(2)} km from this postcode centre in the retained nearby OpenStreetMap results.`
      }
    }))
  };
}
