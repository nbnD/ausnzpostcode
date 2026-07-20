import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const poiDir = path.join(root, "data", "generated", "poi");
const outputPath = path.join(root, "public", "ev-chargers.json");
const countries = [
  { code: "au", label: "Australia" },
  { code: "nz", label: "New Zealand" }
];

const manifest = readJson(path.join(poiDir, "manifest.json"));
const output = {
  schemaVersion: 1,
  generatedAt: manifest.generatedAt,
  attribution: "Map tiles and place data attribution: OpenStreetMap contributors. EV charger details may include Australian public EV charging station data.",
  countries: {}
};

for (const country of countries) {
  const filePath = path.join(poiDir, country.code, "places", "ev-charger.ndjson");
  const stations = readNdjson(filePath).map((station) => compactStation(station, country.code));
  output.countries[country.code] = {
    label: country.label,
    count: stations.length,
    stations
  };
}

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, `${JSON.stringify(output)}\n`);

console.log(
  JSON.stringify(
    {
      output: path.relative(root, outputPath),
      au: output.countries.au.count,
      nz: output.countries.nz.count,
      bytes: fs.statSync(outputPath).size
    },
    null,
    2
  )
);

function compactStation(station, country) {
  const tags = station.tags ?? {};
  return omitEmpty({
    id: station.id,
    country,
    source: station.source,
    name: station.name,
    lat: station.lat,
    lng: station.lng,
    operator: cleanString(tags.operator),
    chargerType: cleanChargerType(tags.chargerType),
    capacity: cleanCapacity(tags.chargerCapacities),
    ports: cleanNumber(tags.numberOfPlugs),
    connectors: omitEmpty({
      tesla: positiveNumber(tags.teslaConnectors),
      type2: positiveNumber(tags.type2Connectors),
      j1772: positiveNumber(tags.j1772Connectors)
    }),
    postcode: cleanString(tags.postcode || tags["addr:postcode"]),
    suburb: cleanString(tags.suburb || tags["addr:suburb"] || tags["addr:city"]),
    googleMapsUrl: `https://www.google.com/maps/search/?api=1&query=${station.lat},${station.lng}`
  });
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function readNdjson(filePath) {
  if (!fs.existsSync(filePath)) return [];
  return fs.readFileSync(filePath, "utf8").split("\n").filter(Boolean).map((line) => JSON.parse(line));
}

function cleanChargerType(value) {
  const cleaned = cleanString(value);
  return cleaned?.replace(/\bR\d\b/g, "").replace(/\s+/g, " ").trim();
}

function cleanCapacity(value) {
  const cleaned = cleanString(value);
  if (!cleaned) return undefined;
  if (/^\d+(\.\d+)?\s*kW$/i.test(cleaned)) return cleaned.replace(/\s*kW$/i, " kW");
  if (/^(AC|DC)$/i.test(cleaned)) return cleaned.toUpperCase();
  return undefined;
}

function positiveNumber(value) {
  const number = cleanNumber(value);
  return number && number > 0 ? number : undefined;
}

function cleanNumber(value) {
  if (value === null || value === undefined || value === "") return undefined;
  const number = Number(value);
  return Number.isFinite(number) ? number : undefined;
}

function cleanString(value) {
  if (typeof value !== "string" && typeof value !== "number") return undefined;
  const cleaned = String(value).trim();
  return cleaned || undefined;
}

function omitEmpty(record) {
  return Object.fromEntries(
    Object.entries(record).filter(([, value]) => {
      if (value === undefined || value === null || value === "") return false;
      if (typeof value === "object" && !Array.isArray(value) && Object.keys(value).length === 0) return false;
      return true;
    })
  );
}
