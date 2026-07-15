import fs from "node:fs";
import path from "node:path";
import type { CountryCode } from "@/data/postcodes";

export type PoiCategory =
  | "public-bbq"
  | "park"
  | "dog-park"
  | "playground"
  | "picnic-site"
  | "viewpoint"
  | "museum";

export type PoiManifest = {
  schemaVersion: number;
  datasetVersion: string;
  generatedAt: string;
  source: string;
  licence: string;
  attribution: string;
  countries: CountryCode[];
  approvedCategories: PoiCategory[];
  configuredCategoryRadiiKm: Record<PoiCategory, number>;
  configuredPerCategoryLimit: number;
  configuredTotalPostcodeLimit: number;
  includeUnreferencedPois: boolean;
  uniquePoisEmitted: number;
  totalPostcodeReferences: number;
};

export type SharedPoi = {
  id: string;
  category: PoiCategory;
  name?: string;
  lat: number;
  lng: number;
  tags?: Record<string, string>;
};

export type NearbyPoi = SharedPoi & {
  distanceKm: number;
  osmType: "node" | "way" | "relation";
  osmId: string;
  osmUrl: string;
  googleMapsUrl: string;
};

type ValidationReport = {
  schemaVersion: number;
  valid: boolean;
  issueCount: number;
  issues?: string[];
};

type PostcodeRef = {
  id: string;
  category: PoiCategory;
  distanceKm: number;
};

type PostcodeRefRecord = {
  locality?: string;
  stateOrRegion?: string;
  places?: PostcodeRef[];
};

type PostcodePartition = {
  schemaVersion: number;
  country: CountryCode;
  partition: string;
  postcodes: Record<string, PostcodeRefRecord>;
};

const supportedSchemaVersion = 1;
const stableIdPattern = /^osm:(node|way|relation):(\d+)$/;
const defaultPoiDataDir = path.join(process.cwd(), "data", "generated", "poi");
const manifestCache = new Map<string, PoiManifest | null>();
const partitionCache = new Map<string, PostcodePartition | null>();
const categoryCache = new Map<string, Map<string, SharedPoi>>();

export function getPoiManifest(options: { required?: boolean } = {}): PoiManifest | null {
  const root = getPoiDataDir(options.required);
  if (!root) return null;
  if (manifestCache.has(root)) return manifestCache.get(root) ?? null;

  const manifestPath = path.join(root, "manifest.json");
  const validationPath = path.join(root, "validation-report.json");
  if (!fs.existsSync(manifestPath)) throw new Error(`POI manifest is missing: ${manifestPath}`);
  if (!fs.existsSync(validationPath)) throw new Error(`POI validation report is missing: ${validationPath}`);

  const manifest = readJson<PoiManifest>(manifestPath);
  const validation = readJson<ValidationReport>(validationPath);
  if (manifest.schemaVersion !== supportedSchemaVersion) {
    throw new Error(`Unsupported POI schemaVersion ${manifest.schemaVersion}. Expected ${supportedSchemaVersion}.`);
  }
  if (validation.schemaVersion !== supportedSchemaVersion || validation.valid !== true || validation.issueCount !== 0) {
    throw new Error(`POI validation report is not valid. Issues: ${(validation.issues ?? []).join("; ") || "unknown"}`);
  }

  manifestCache.set(root, manifest);
  return manifest;
}

export function hasPoiData(country: CountryCode, postcode: string): boolean {
  return getNearbyRefs(country, postcode).length > 0;
}

export function getNearbyPoisForPostcode(country: CountryCode, postcode: string): NearbyPoi[] {
  const refs = getNearbyRefs(country, postcode);
  if (refs.length === 0) return [];

  return refs.map((ref) => {
    const poi = getSharedPoi(country, ref.category, ref.id);
    const osm = parseStableOsmId(ref.id);
    if (!poi) {
      throw new Error(`POI reference ${country} ${postcode} ${ref.id} points to a missing ${ref.category} record.`);
    }

    return {
      ...poi,
      distanceKm: ref.distanceKm,
      osmType: osm.osmType,
      osmId: osm.osmId,
      osmUrl: `https://www.openstreetmap.org/${osm.osmType}/${osm.osmId}`,
      googleMapsUrl: `https://www.google.com/maps/search/?api=1&query=${poi.lat},${poi.lng}`
    };
  });
}

export function getPoiCountsForPostcode(country: CountryCode, postcode: string): Partial<Record<PoiCategory, number>> {
  return getNearbyRefs(country, postcode).reduce<Partial<Record<PoiCategory, number>>>((counts, ref) => {
    counts[ref.category] = (counts[ref.category] ?? 0) + 1;
    return counts;
  }, {});
}

export function __resetPoiDataCacheForTests() {
  manifestCache.clear();
  partitionCache.clear();
  categoryCache.clear();
}

function getNearbyRefs(country: CountryCode, postcode: string): PostcodeRef[] {
  const partition = getPostcodePartition(country, postcode);
  return partition?.postcodes?.[postcode]?.places ?? [];
}

function getPostcodePartition(country: CountryCode, postcode: string): PostcodePartition | null {
  const manifest = getPoiManifest();
  if (!manifest) return null;
  if (!manifest.countries.includes(country)) return null;

  const root = getPoiDataDir();
  if (!root) return null;
  const partition = postcode.charAt(0);
  const cacheKey = `${root}:${country}:${partition}`;
  if (partitionCache.has(cacheKey)) return partitionCache.get(cacheKey) ?? null;

  const filePath = path.join(root, country, "postcode-refs", `${partition}.json`);
  if (!fs.existsSync(filePath)) {
    partitionCache.set(cacheKey, null);
    return null;
  }

  const record = readJson<PostcodePartition>(filePath);
  if (record.schemaVersion !== supportedSchemaVersion || record.country !== country || record.partition !== partition) {
    throw new Error(`Invalid POI postcode partition metadata: ${filePath}`);
  }
  partitionCache.set(cacheKey, record);
  return record;
}

function getSharedPoi(country: CountryCode, category: PoiCategory, id: string): SharedPoi | null {
  const root = getPoiDataDir();
  if (!root) return null;
  const cacheKey = `${root}:${country}:${category}`;
  let index = categoryCache.get(cacheKey);
  if (!index) {
    index = loadCategoryIndex(root, country, category);
    categoryCache.set(cacheKey, index);
  }
  return index.get(id) ?? null;
}

function loadCategoryIndex(root: string, country: CountryCode, category: PoiCategory): Map<string, SharedPoi> {
  const filePath = path.join(root, country, "places", `${category}.ndjson`);
  const index = new Map<string, SharedPoi>();
  if (!fs.existsSync(filePath)) return index;

  const lines = fs.readFileSync(filePath, "utf8").split("\n").filter(Boolean);
  for (const line of lines) {
    const poi = JSON.parse(line) as SharedPoi;
    if (poi.category !== category) throw new Error(`POI ${poi.id} is in the wrong category file: ${category}.`);
    if (!stableIdPattern.test(poi.id)) throw new Error(`POI has invalid stable OSM ID: ${poi.id}`);
    if (index.has(poi.id)) throw new Error(`Duplicate POI ID in ${country}/${category}: ${poi.id}`);
    index.set(poi.id, poi);
  }

  return index;
}

function parseStableOsmId(id: string) {
  const match = stableIdPattern.exec(id);
  if (!match) throw new Error(`Invalid stable OSM ID: ${id}`);
  return { osmType: match[1] as "node" | "way" | "relation", osmId: match[2] };
}

function getPoiDataDir(required = false): string | null {
  const value = process.env.AUSNZ_POI_DATA_DIR?.trim();
  const resolved = value ? path.resolve(value) : defaultPoiDataDir;
  if (!fs.existsSync(resolved) && !value && !required) return null;
  if (!value && required && !fs.existsSync(resolved)) {
    throw new Error("AUSNZ_POI_DATA_DIR is required for this POI command when data/generated/poi is missing.");
  }
  if (!fs.existsSync(resolved)) throw new Error(`AUSNZ_POI_DATA_DIR does not exist: ${resolved}`);
  return resolved;
}

function readJson<T>(filePath: string): T {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8")) as T;
  } catch (error) {
    throw new Error(`Unable to read POI JSON file ${filePath}: ${error instanceof Error ? error.message : String(error)}`);
  }
}
