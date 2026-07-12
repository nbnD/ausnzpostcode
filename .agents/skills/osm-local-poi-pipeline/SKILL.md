---
name: osm-local-poi-pipeline
description: >
  Design and implement the local OpenStreetMap POI extraction pipeline for
  AusNZ Postcode. Use this skill when working with large Australia and New
  Zealand OSM PBF files, offline extraction, POI category mapping, nearby
  postcode matching, compact JSON generation, validation, static Next.js
  integration, OpenStreetMap attribution, or POI data size controls.
---

# OSM Local POI Pipeline Skill

## 1. Purpose

Extend `ausnzpostcode.com` with nearby public places while preserving the
existing static Next.js and GitHub Pages architecture.

Large OpenStreetMap `.osm.pbf` files are local source inputs only.

They must never be:

- committed to Git
- pushed through Git LFS
- deployed to GitHub Pages
- included in release assets
- downloaded by website visitors
- parsed at runtime by the website

The pipeline must transform local PBF source files into compact generated JSON
that can be consumed during the Next.js static build.

## 2. Source file policy

Expected local source files:

```text
~/osm-sources/australia-latest.osm.pbf
~/osm-sources/new-zealand-latest.osm.pbf

```
The exact path may be configurable.

Repository rules:

*.osm.pbf
*.pbf
osm-sources/
data/intermediate/

Never delete, rename, overwrite, move, stage, or commit the source PBF files
without explicit user approval.

## 3. Architecture
Local PBF files
        ↓
osmium tag filtering
        ↓
streamable intermediate data
        ↓
Node.js normalisation
        ↓
nearby postcode matching
        ↓
compact per-postcode JSON
        ↓
Next.js static generation
        ↓
GitHub Pages

This repository remains:

fully static
backend-free
database-free
compatible with GitHub Pages
free of paid APIs

Do not create:

API routes
runtime databases
server rendering
browser-side PBF processing
browser requests to raw GitHub data
a separate data repository unless explicitly requested later

## 4. Phase 1 categories

Support only:

Canonical category	OpenStreetMap tag
public-bbq	amenity=bbq
park	leisure=park
dog-park	leisure=dog_park
playground	leisure=playground
picnic-site	tourism=picnic_site
viewpoint	tourism=viewpoint
museum	tourism=museum

Do not add these in Phase 1:

tourism=information
broad tourism=attraction
beaches
trails
schools
hospitals
libraries
toilets
EV chargers
gardens
recreation grounds

New categories require explicit approval.

## 5. Tooling

Use free and open-source tools only.

Preferred tools:

osmium-tool for PBF filtering and export
Node.js ES modules for normalisation and generation
existing postcode data from the project
existing Next.js static export pipeline
Leaflet and OpenStreetMap for maps

Prefer streaming or line-by-line processing.

Do not load a full national dataset into memory unless it is clearly safe and
measured.

## 6. Generated output

Store generated source data under:

data/generated/poi/
├── manifest.json
├── au/
│   ├── 2000.json
│   └── 2150.json
└── nz/
    ├── 1010.json
    └── 6011.json

Do not use public/poi/ by default.

Important POI text should be consumed during Next.js static generation so that
place names, counts, distances, attribution, and summaries appear in HTML.

Use client-side JavaScript only for interactive maps or optional UI behaviour.

## 7. POI record schema

Use stable source identifiers.

interface PoiRecord {
  id: string;
  source: "openstreetmap";
  osmType: "node" | "way" | "relation";
  osmId: string;

  name?: string;
  category:
    | "public-bbq"
    | "park"
    | "dog-park"
    | "playground"
    | "picnic-site"
    | "viewpoint"
    | "museum";

  lat: number;
  lng: number;
  distanceKm: number;

  sourcePostcode?: string;
  sourceSuburb?: string;
  website?: string;
  openingHours?: string;
  wheelchair?: string;
  access?: string;
}

Stable IDs must use:

osm:node:{id}
osm:way:{id}
osm:relation:{id}

Never use only the place name as an identifier.

Round coordinates consistently.

Omit null or empty fields in generated JSON.

## 8. Matching model

Phase 1 uses nearby matching from postcode centre coordinates.

Do not claim a POI is inside a postcode unless boundary-based containment is
implemented later.

Use wording such as:

nearby parks
BBQs near postcode 2150
places close to Parramatta
public facilities within the configured search radius

Do not use:

parks in postcode 2150
exact postcode containment
official postcode boundaries

unless supported by reliable boundary data.

## 9. Category radius rules

Radius must be configurable by category.

Starter values:

{
  "public-bbq": 5,
  "park": 5,
  "dog-park": 8,
  "playground": 5,
  "picnic-site": 10,
  "viewpoint": 20,
  "museum": 15
}

All distances must use a documented geographic calculation such as Haversine.

Store distance in kilometres.

Sort nearest places first.

## 10. Per-postcode limits

For Phase 1:

maximum 10 records per category
maximum 30 records total per postcode
named records should rank before unnamed records when distances are similar
duplicate OSM IDs must not appear twice in one postcode file

Unnamed records are allowed for useful public facilities such as BBQs and
playgrounds.

Use neutral fallback labels only:

Public BBQ location
Playground
Park

Do not invent nearby street, suburb, park, or landmark names.

## 11. Size controls

Generate a manifest containing:

schema version
generated date
countries
source
licence
attribution
total postcode files
total POI records
total generated bytes
counts by country
counts by category
largest postcode file
source PBF filenames or versions when known

Starting validation thresholds:

maximum 50 KB per postcode JSON file
maximum 250 MB total generated POI output

Fail validation when thresholds are exceeded.

Do not silently truncate output beyond configured limits.

Report truncation counts and reasons.

## 12. Data quality rules

Validate:

valid OSM source IDs
valid categories
finite coordinates
coordinates within reasonable AU/NZ bounds
non-negative distance
correct country output path
unique POI IDs per file
maximum counts per category
maximum counts per postcode
correct manifest totals
valid JSON
deterministic sorting
output-size thresholds

A failed validation must not replace the last valid generated dataset.

Write to a temporary location first, validate, then replace atomically.

## 13. OpenStreetMap attribution

Every relevant UI section must visibly show:

Place data © OpenStreetMap contributors, available under the ODbL.

The site’s data-sources page must explain:

OpenStreetMap as the source
ODbL licence
extraction method
generated date
data limitations
that information may be incomplete
how users can report corrections

Never imply affiliation with OpenStreetMap, Australia Post, NZ Post, or a
government agency.

## 14. Website integration

Add POI information to existing postcode pages first.

Recommended section:

Nearby parks, BBQs and places to visit

Show only categories with available records.

Each item may include:

name
category
distance
map marker
OpenStreetMap source link

Do not create thousands of separate POI pages in Phase 1.

Do not create category pages until:

data quality is verified
generated size is measured
postcode-page enrichment is indexed successfully
thin-page rules are defined

## 15. SEO and GEO  and AI giving reference to this site rules

Important content must exist in static HTML:

category counts
place names
distances
direct factual summary
source
update date
attribution
disclaimer

Do not rely only on client-side fetched JSON.

Generated wording must use real data only.

Acceptable:

Postcode 2150 currently has 4 mapped public BBQ locations and 8 parks within
the configured nearby search radius.

Unacceptable:

Parramatta has the best and most beautiful BBQ locations in Australia.

Do not invent:

quality
popularity
safety
suitability
opening hours
accessibility
ratings
entry fees

## 16. Repository changes

Keep all POI pipeline logic organised under clear folders, for example:

scripts/poi/
├── extract-poi.sh
├── normalise-poi.mjs
├── match-nearby-postcodes.mjs
├── generate-poi-json.mjs
└── validate-poi-data.mjs

config/
├── poi-categories.json
├── poi-radius.json
└── poi-pipeline.json

data/
├── intermediate/
└── generated/
    └── poi/

tests/
└── poi/

Do not create unnecessary micro-folders or excessive abstractions.

## 17. Implementation phases
Phase 1 — Architecture

Create:

configs 
script locations
types
package script placeholders
test structure
documentation
ignore rules

Do not process the national PBF yet.

### Phase 2 — Small extract

Create a small regional test extract and validate the filtering pipeline.

Do not run both national files repeatedly while debugging.

#### Phase 3 — Normalisation

Implement:

OSM tag mapping
stable IDs
representative coordinates
selected source fields
streaming output
### Phase 4 — Nearby matching

Implement:

postcode-centre matching
category radii
distance calculation
category and total limits
deterministic sorting
### Phase 5 — Generation and validation

Generate:

per-postcode files
manifest
validation report

Enforce file and total-size thresholds.

### Phase 6 — Website integration

Render POI summaries and records into existing static postcode pages.

### Phase 7 — National build

Run Australia and New Zealand only after the small extract pipeline passes.

## 18. Codex behaviour

Before changing code:

Read AGENTS.md.
Read this skill.
Inspect relevant existing files.
Explain the smallest safe implementation plan.
Identify assumptions.
Avoid unrelated changes.

After implementation:

List modified files.
Show commands run.
Show tests and build results.
Report generated record counts and sizes where applicable.
Report untested parts.
Do not commit or push unless explicitly requested.
Do not process full national PBF files unless explicitly requested.
## 19. Definition of done

A POI pipeline task is complete only when:

raw PBF files remain outside Git
no raw PBF is deployed
generated data is validated
size limits pass
output is deterministic
static build compatibility is preserved
important POI content is in HTML
maps remain optional client-side enhancements
OSM attribution is visible
no unsupported claims are generated
existing postcode functionality remains intact

---