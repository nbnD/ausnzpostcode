import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { renderToStaticMarkup } from "react-dom/server";
import { NearbyPoiSection } from "../components/NearbyPoiSection";
import {
  __resetPoiDataCacheForTests,
  getNearbyPoisForPostcode,
  getPoiCountsForPostcode,
  getPoiManifest,
  hasPoiData,
  type PoiManifest
} from "../lib/poi-data";
import { buildPoiMetaDescription, buildPoiSummary, displayPoiName, getPreviewPlaces } from "../lib/poi-seo";
import { nearbyPoiItemListSchema } from "../lib/schema";

test.afterEach(() => {
  delete process.env.AUSNZ_POI_DATA_DIR;
  __resetPoiDataCacheForTests();
});

test("POI utilities use checked-in data when AUSNZ_POI_DATA_DIR is absent", () => {
  const manifest = getPoiManifest();
  assert.equal(manifest?.schemaVersion, 1);
  assert.equal(hasPoiData("au", "2000"), true);
  assert.equal(getNearbyPoisForPostcode("au", "2000").length > 0, true);
  assert.equal(Object.keys(getPoiCountsForPostcode("au", "2000")).length > 0, true);
  assert.equal(getPoiManifest({ required: true })?.schemaVersion, 1);
});

test("POI utilities fail clearly for missing dataset, unsupported schema and invalid validation report", () => {
  process.env.AUSNZ_POI_DATA_DIR = path.join(os.tmpdir(), "missing-poi-dataset");
  assert.throws(() => getPoiManifest(), /does not exist/);

  const root = fixtureDataset();
  process.env.AUSNZ_POI_DATA_DIR = root;
  writeJson(path.join(root, "manifest.json"), { ...manifestFixture(), schemaVersion: 99 });
  __resetPoiDataCacheForTests();
  assert.throws(() => getPoiManifest(), /Unsupported POI schemaVersion/);

  writeJson(path.join(root, "manifest.json"), manifestFixture());
  writeJson(path.join(root, "validation-report.json"), { schemaVersion: 1, valid: false, issueCount: 1, issues: ["bad data"] });
  __resetPoiDataCacheForTests();
  assert.throws(() => getPoiManifest(), /validation report is not valid/);
});

test("POI utilities resolve AU and NZ postcode refs, counts and OSM links", () => {
  const root = fixtureDataset();
  process.env.AUSNZ_POI_DATA_DIR = root;

  const au = getNearbyPoisForPostcode("au", "2000");
  const nz = getNearbyPoisForPostcode("nz", "1010");

  assert.equal(au.length, 3);
  assert.equal(nz.length, 1);
  assert.deepEqual(au.map((place) => place.id), ["osm:node:1001", "osm:way:1002", "osm:node:1003"]);
  assert.deepEqual(au.map((place) => place.distanceKm), [0.5, 0.2, 0.7]);
  assert.equal(au[1].osmUrl, "https://www.openstreetmap.org/way/1002");
  assert.equal(au[1].googleMapsUrl, "https://www.google.com/maps/search/?api=1&query=-33.861,151.201");
  assert.deepEqual(getPoiCountsForPostcode("au", "2000"), { park: 1, "public-bbq": 1, playground: 1 });
  assert.deepEqual(getPoiCountsForPostcode("nz", "1010"), { museum: 1 });
  assert.equal(hasPoiData("au", "9999"), false);
});

test("POI resolution fails when a postcode reference points to a missing shared POI", () => {
  const root = fixtureDataset();
  process.env.AUSNZ_POI_DATA_DIR = root;
  const partitionPath = path.join(root, "au/postcode-refs/2.json");
  const partition = readJson(partitionPath);
  partition.postcodes["2000"].places.push({ id: "osm:node:9999", category: "park", distanceKm: 1.1 });
  writeJson(partitionPath, partition);
  __resetPoiDataCacheForTests();

  assert.throws(() => getNearbyPoisForPostcode("au", "2000"), /points to a missing park record/);
});

test("POI labels, counts and rendered section are safe and static-friendly", () => {
  const root = fixtureDataset();
  process.env.AUSNZ_POI_DATA_DIR = root;
  const manifest = getPoiManifest();
  const places = getNearbyPoisForPostcode("au", "2000");
  const counts = getPoiCountsForPostcode("au", "2000");
  const html = renderToStaticMarkup(
    <NearbyPoiSection postcode="2000" locality="Sydney" places={places} counts={counts} manifest={manifest} />
  );

  assert.equal(displayPoiName(places[1]), "Public BBQ location");
  assert.match(buildPoiSummary({ postcode: "2000", locality: "Sydney", counts }), /Near Sydney postcode 2000/);
  assert.match(buildPoiSummary({ postcode: "2000", locality: "Sydney", counts }), /1 park, 1 mapped public BBQ location and 1 playground/);
  assert.match(html, /Nearby parks, BBQs and places to visit/);
  assert.match(html, /<button[^>]*aria-pressed="true"[^>]*>All<\/button>/);
  assert.match(html, /<button[^>]*aria-pressed="false"[^>]*>1 park<\/button>/);
  assert.match(html, /<button[^>]*aria-pressed="false"[^>]*>1 mapped public BBQ location<\/button>/);
  assert.match(html, /<button[^>]*aria-pressed="false"[^>]*>1 playground<\/button>/);
  assert.match(html, /Royal Park/);
  assert.match(html, /Public BBQ location/);
  assert.match(html, /0.20 km from this postcode centre/);
  assert.match(html, /Open in Google Maps/);
  assert.match(html, /https:\/\/www\.google\.com\/maps\/search\/\?api=1&amp;query=-33\.861,151\.201/);
  assert.match(html, /Place data © OpenStreetMap contributors, available under the ODbL/);
  assert.doesNotMatch(html, /compare nearby public facilities and visitor places around the postcode centre/);
  assert.doesNotMatch(html, /before opening the source record on OpenStreetMap/);
  assert.doesNotMatch(html, /inside this postcode|top-rated|official place|exact containment/i);

  const empty = renderToStaticMarkup(
    <NearbyPoiSection postcode="9999" locality="Nowhere" places={[]} counts={{}} manifest={manifestFixture()} />
  );
  assert.equal(empty, "");
});

test("POI metadata and ItemList schema use only visible preview facts", () => {
  const root = fixtureDataset();
  process.env.AUSNZ_POI_DATA_DIR = root;
  const places = getNearbyPoisForPostcode("au", "2000");
  const counts = getPoiCountsForPostcode("au", "2000");
  const previews = getPreviewPlaces(places, 3);
  const description = buildPoiMetaDescription({
    postcode: "2000",
    locality: "Sydney",
    stateFull: "New South Wales",
    baseDescription: "Base postcode description.",
    counts
  });
  const schema = nearbyPoiItemListSchema({
    name: "Nearby OpenStreetMap places for postcode 2000",
    path: "/au/postcode/2000",
    places: previews
  });

  assert.match(description, /Nearby OpenStreetMap results include/);
  assert.match(description, /matched from the postcode centre/);
  assert.equal(schema["@type"], "ItemList");
  assert.equal(schema.numberOfItems, 3);
  assert.equal(schema.itemListElement[0].item.name, "Royal Park");
  assert.equal(schema.itemListElement.some((item) => item.item.name === "Public BBQ location"), true);
  assert.equal(schema.itemListElement.some((item) => item.item.url === "https://www.google.com/maps/search/?api=1&query=-33.861,151.201"), true);
  assert.doesNotMatch(JSON.stringify(schema), /opening_hours|wheelchair|inside this postcode|top-rated|official place/i);
});

function fixtureDataset() {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "ausnz-poi-web-"));
  writeJson(path.join(root, "manifest.json"), manifestFixture());
  writeJson(path.join(root, "validation-report.json"), { schemaVersion: 1, valid: true, issueCount: 0, issues: [] });
  writeJson(path.join(root, "statistics.json"), {});
  writeNdjson(path.join(root, "au/places/park.ndjson"), [
    { id: "osm:node:1001", category: "park", name: "Royal Park", lat: -33.86, lng: 151.2 }
  ]);
  writeNdjson(path.join(root, "au/places/public-bbq.ndjson"), [
    { id: "osm:way:1002", category: "public-bbq", lat: -33.861, lng: 151.201 }
  ]);
  writeNdjson(path.join(root, "au/places/playground.ndjson"), [
    { id: "osm:node:1003", category: "playground", name: "Harbour Playground", lat: -33.862, lng: 151.202 }
  ]);
  writeNdjson(path.join(root, "nz/places/museum.ndjson"), [
    { id: "osm:relation:2001", category: "museum", name: "Auckland Museum", lat: -36.85, lng: 174.76 }
  ]);
  writeJson(path.join(root, "au/postcode-refs/2.json"), {
    schemaVersion: 1,
    country: "au",
    partition: "2",
    postcodes: {
      "2000": {
        locality: "Sydney",
        stateOrRegion: "NSW",
        places: [
          { id: "osm:node:1001", category: "park", distanceKm: 0.5 },
          { id: "osm:way:1002", category: "public-bbq", distanceKm: 0.2 },
          { id: "osm:node:1003", category: "playground", distanceKm: 0.7 }
        ]
      },
      "2999": { locality: "No places", stateOrRegion: "NSW", places: [] }
    }
  });
  writeJson(path.join(root, "nz/postcode-refs/1.json"), {
    schemaVersion: 1,
    country: "nz",
    partition: "1",
    postcodes: {
      "1010": {
        locality: "Auckland Central",
        stateOrRegion: "Auckland",
        places: [{ id: "osm:relation:2001", category: "museum", distanceKm: 1.4 }]
      }
    }
  });
  return root;
}

function manifestFixture(): PoiManifest {
  return {
    schemaVersion: 1,
    datasetVersion: "test",
    generatedAt: "2026-07-12T00:00:00.000Z",
    source: "OpenStreetMap contributors",
    licence: "Open Database License (ODbL)",
    attribution: "Place data © OpenStreetMap contributors, available under the Open Database License.",
    countries: ["au", "nz"],
    approvedCategories: ["dog-park", "museum", "park", "picnic-site", "playground", "public-bbq", "viewpoint"],
    configuredCategoryRadiiKm: {
      "public-bbq": 5,
      park: 5,
      "dog-park": 8,
      playground: 5,
      "picnic-site": 10,
      viewpoint: 20,
      museum: 15
    },
    configuredPerCategoryLimit: 10,
    configuredTotalPostcodeLimit: 30,
    includeUnreferencedPois: false,
    uniquePoisEmitted: 4,
    totalPostcodeReferences: 4
  };
}

function writeJson(filePath: string, data: unknown) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`);
}

function writeNdjson(filePath: string, rows: unknown[]) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, `${rows.map((row) => JSON.stringify(row)).join("\n")}\n`);
}

function readJson(filePath: string) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}
