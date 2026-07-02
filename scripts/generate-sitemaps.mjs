import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const publicDir = path.join(root, "public");
const siteUrl = "https://ausnzpostcode.com";
const postcodes = JSON.parse(fs.readFileSync(path.join(root, "data", "postcode_index.json"), "utf8"));

function slugify(value) {
  return String(value)
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function xmlEscape(value) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function urlset(routes) {
  const urls = routes
    .map((route) => `  <url><loc>${xmlEscape(`${siteUrl}${route}`)}</loc></url>`)
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

const au = postcodes.filter((item) => item.country === "au");
const nz = postcodes.filter((item) => item.country === "nz");

function postcodeRoute(item) {
  return `/${item.country}/postcode/${item.code}`;
}

function localityRoutes(country) {
  return postcodes
    .filter((item) => item.country === country)
    .flatMap((item) => (item.localities ?? [item.locality]).map((name) => {
      const slug = `${slugify(name)}-${item.code}`;
      return country === "au" ? `/au/suburb/${slug}` : `/nz/locality/${slug}`;
    }));
}

function regionRoutes(country) {
  const regions = new Set(
    postcodes
      .filter((item) => item.country === country)
      .map((item) => (country === "au" ? item.state.toLowerCase() : slugify(item.stateFull)))
  );
  return [...regions].sort().map((slug) => (country === "au" ? `/au/state/${slug}` : `/nz/region/${slug}`));
}

fs.mkdirSync(publicDir, { recursive: true });
fs.writeFileSync(path.join(publicDir, "sitemap-postcodes.xml"), urlset([...au, ...nz].map(postcodeRoute)));
fs.writeFileSync(path.join(publicDir, "sitemap-suburbs.xml"), urlset([...localityRoutes("au"), ...localityRoutes("nz")]));
fs.writeFileSync(path.join(publicDir, "sitemap-states.xml"), urlset(regionRoutes("au")));
fs.writeFileSync(
  path.join(publicDir, "sitemap-nz.xml"),
  urlset(["/nz", "/nz/postcodes", "/nz/localities", "/nz/a-z", ...regionRoutes("nz"), ...nz.map(postcodeRoute), ...localityRoutes("nz")])
);
fs.writeFileSync(path.join(publicDir, "CNAME"), "ausnzpostcode.com\n");

console.log(
  JSON.stringify(
    {
      postcodes: au.length + nz.length,
      localities: localityRoutes("au").length + localityRoutes("nz").length,
      auRegions: regionRoutes("au").length,
      nzRoutes: 4 + regionRoutes("nz").length + nz.length + localityRoutes("nz").length
    },
    null,
    2
  )
);
