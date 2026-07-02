import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const dataDir = path.join(root, "data");
const auPath = path.join(dataDir, "australian_postcodes.json");
const nzPath = path.join(dataDir, "newzealand_postcodes.json");

const stateNames = {
  ACT: "Australian Capital Territory",
  NSW: "New South Wales",
  NT: "Northern Territory",
  QLD: "Queensland",
  SA: "South Australia",
  TAS: "Tasmania",
  VIC: "Victoria",
  WA: "Western Australia"
};

const preferredHints = {
  au: ["2000 Sydney", "3000 Melbourne", "4000 Brisbane", "6000 Perth"],
  nz: ["1010 Auckland", "6011 Wellington", "8011 Christchurch", "9016 Dunedin"]
};

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function clean(value) {
  return String(value ?? "").trim();
}

function coordinate(value) {
  const number = Number(value);
  return Number.isFinite(number) ? Number(number.toFixed(6)) : 0;
}

function assertRecord(condition, message) {
  if (!condition) throw new Error(message);
}

function groupPostcodes(records, country, issues) {
  const grouped = new Map();

  for (const record of records) {
    const code = clean(record.postcode);
    const locality = clean(record.locality);
    const state = clean(record.state || record.region);
    const lat = coordinate(record.lat);
    const lng = coordinate(record.long ?? record.lng);

    assertRecord(/^\d{3,4}$/.test(code), `Invalid postcode "${code}" in ${country}`);
    assertRecord(locality, `Missing locality for ${country} ${code}`);
    assertRecord(state, `Missing state/region for ${country} ${code}`);
    if (lat === 0 || lng === 0) issues.missingCoordinates += 1;

    const key = `${country}:${code}`;
    const existing = grouped.get(key);
    const stateFull = country === "au" ? stateNames[state] ?? state : state;
    const type = clean(record.type) || (country === "au" ? "Delivery Area" : "Locality");

    if (!existing) {
      grouped.set(key, {
        code,
        locality,
        localities: [locality],
        localityCount: 1,
        state,
        stateFull,
        country,
        lga: clean(record.lga) || undefined,
        electorate: clean(record.electorate) || undefined,
        type,
        remoteness: clean(record.remoteness) || undefined,
        lat,
        lng
      });
      continue;
    }

    if (!existing.localities.includes(locality)) existing.localities.push(locality);
    existing.localityCount = existing.localities.length;
  }

  return [...grouped.values()].sort((a, b) => a.code.localeCompare(b.code));
}

function countLocalities(records) {
  return records.reduce((total, item) => total + (item.localityCount ?? item.localities?.length ?? 1), 0);
}

function regionSummaries(records, country) {
  const regions = new Map();

  for (const record of records) {
    const key = country === "au" ? record.state : record.stateFull;
    const existing = regions.get(key) ?? {
      abbr: country === "au" ? record.state : undefined,
      name: record.stateFull,
      island: country === "nz" ? "New Zealand" : undefined,
      count: 0
    };
    existing.count += 1;
    regions.set(key, existing);
  }

  return [...regions.values()].sort((a, b) => {
    if (country === "au") return a.abbr.localeCompare(b.abbr);
    return a.name.localeCompare(b.name);
  });
}

function popular(records, codes) {
  return codes.map((code) => records.find((item) => item.code === code)).filter(Boolean);
}

const issues = {
  missingCoordinates: 0
};

const au = groupPostcodes(readJson(auPath), "au", issues);
const nz = groupPostcodes(readJson(nzPath), "nz", issues);
const postcodes = [...au, ...nz];

const homepage = {
  stats: {
    auPostcodes: au.length,
    auLocalities: countLocalities(au),
    nzPostcodes: nz.length,
    nzLocalities: countLocalities(nz),
    countries: 2
  },
  auStates: regionSummaries(au, "au"),
  nzRegions: regionSummaries(nz, "nz"),
  popular: [
    ...popular(au, ["2000", "3000", "4000", "5000", "6000", "7000"]),
    ...popular(nz, ["1010", "6011", "8011", "9016", "3110", "7010"])
  ],
  hints: preferredHints
};

fs.writeFileSync(path.join(dataDir, "postcode_index.json"), `${JSON.stringify(postcodes)}\n`);
fs.writeFileSync(path.join(dataDir, "homepage_index.json"), `${JSON.stringify(homepage)}\n`);

console.log(
  JSON.stringify(
    {
      auRows: readJson(auPath).length,
      nzRows: readJson(nzPath).length,
      auPostcodes: au.length,
      nzPostcodes: nz.length,
      localities: homepage.stats.auLocalities + homepage.stats.nzLocalities,
      issues
    },
    null,
    2
  )
);
