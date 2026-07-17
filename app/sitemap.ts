import type { MetadataRoute } from "next";
import { cityPath, getCityPages } from "@/data/city-pages";
import { siteConfig } from "@/lib/site";

export const dynamic = "force-static";

const routes = [
  "",
  "/au",
  "/nz",
  "/au/postcodes",
  "/au/suburbs",
  "/au/a-z",
  "/nz/postcodes",
  "/nz/localities",
  "/nz/a-z",
  "/search",
  "/about",
  "/contact",
  "/privacy-policy",
  "/terms",
  "/disclaimer",
  "/data-sources"
];

export default function sitemap(): MetadataRoute.Sitemap {
  return [...routes, ...getCityPages().map(cityPath)].map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7
  }));
}
