import { siteConfig } from "@/lib/site";

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
