import type { MetadataRoute } from "next";
import { postcodes } from "@/data/postcodes";
import { siteConfig } from "@/lib/site";

export const dynamic = "force-static";

const routes = [
  "",
  "/australia",
  "/new-zealand",
  "/search",
  "/about",
  "/contact",
  "/privacy-policy",
  "/terms",
  "/disclaimer",
  "/data-sources"
];

export default function sitemap(): MetadataRoute.Sitemap {
  const postcodeRoutes = postcodes.map((item) => `/postcode/${item.country}/${item.code}`);

  return [...routes, ...postcodeRoutes].map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7
  }));
}
