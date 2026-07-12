# AGENTS.md

## Project

Build `ausnzpostcode.com`, a premium SEO-focused Australia and New Zealand postcode, suburb, and locality directory.

The site must feel like a polished production product, not a college project, not a generic SaaS template, and not a cheap postcode clone.

---

## Core Goal

Create a fully static, SEO-optimised postcode directory that can be hosted on GitHub Pages with a custom domain.

The site should help users search and explore:

* Australian postcodes
* New Zealand postcodes
* Suburbs/localities
* States/territories/regions
* Nearby suburbs
* Nearby postcodes
* Map locations
* FAQ-based postcode information

---

## Hard Rules

* Use only free and open-source libraries.
* No paid APIs.
* No paid UI kits.
* No paid search providers.
* No paid map providers.
* No Google Maps.
* Use OpenStreetMap + Leaflet only.
* Use Next.js static export.
* Must work on GitHub Pages.
* No backend.
* No database.
* No server API routes.
* No runtime fetching from raw GitHub URLs.
* Generate static SEO pages from local JSON data.
* Store postcode data in `/data`.
* Keep the site fast, clean, mobile-first, and production-ready.

---

## Approved Tech Stack

Use:

* Next.js App Router
* TypeScript
* Tailwind CSS
* Leaflet
* OpenStreetMap
* Fuse.js for client-side search
* Lucide Icons
* GitHub Pages
* GitHub Actions

Do not add paid dependencies or SaaS-based features.

---

## Required Routes

### Core

* `/`
* `/au`
* `/nz`
* `/search`

### Australia

* `/au/postcode/[postcode]`
* `/au/suburb/[slug]`
* `/au/state/[state]`
* `/au/postcodes`
* `/au/suburbs`
* `/au/a-z`

### New Zealand

* `/nz/postcode/[postcode]`
* `/nz/locality/[slug]`
* `/nz/region/[region]`
* `/nz/postcodes`
* `/nz/localities`
* `/nz/a-z`

### Legal / Trust Pages

* `/about`
* `/contact`
* `/privacy-policy`
* `/terms`
* `/disclaimer`
* `/data-sources`

---

## SEO Requirements

Every SEO page must include:

* Unique title
* Unique meta description
* Canonical URL
* Open Graph tags
* Twitter/X card tags
* One clear H1
* Breadcrumbs
* Breadcrumb schema
* FAQ section
* FAQ schema
* Place schema where relevant
* Internal links
* Related pages
* Clean semantic HTML
* Mobile-friendly layout
* Sitemap support

Structured data must match visible page content.

Do not add FAQ schema unless the FAQ is visibly present on the page.

---

## Sitemap Requirements

Generate:

* `sitemap.xml`
* `sitemap-postcodes.xml`
* `sitemap-suburbs.xml`
* `sitemap-states.xml`
* `sitemap-nz.xml`

Include all generated static SEO pages.

---

## Robots Requirements

Create `robots.txt`.

Allow crawling of all public pages.

Reference the sitemap URL.

---

## UI / UX Requirements

The design must be premium, modern, and polished.

Use:

* Card-based layout
* Large search-first homepage
* Mobile-first responsive design
* Clean spacing
* Strong visual hierarchy
* Subtle shadows
* Rounded cards
* Premium dark navy header
* Deep gradient hero
* Coral primary CTA
* Green accent for New Zealand
* Professional footer
* Fast interactions

Avoid:

* Generic white SaaS layout
* Plain default Tailwind look
* Heavy tables as the main design
* Cluttered ad-heavy pages
* Cheap directory-style design
* Overly simple college-project UI

---

## Mandatory UI Reference

The uploaded HTML files define the approved visual direction:

* `index.html` = homepage visual reference
* `postcode.html` = postcode detail page visual reference
* `search.html` = search/results visual reference

The final Next.js UI must visually follow these references.

Match the following style closely:

* Navy sticky header
* AusNZPostcode logo style
* Australia/New Zealand country switcher
* Deep navy gradient hero
* Coral search button
* Large centered search box with shadow
* Search hint pills
* Stats bar
* State/region cards
* Popular postcode cards
* “How it works” cards
* FAQ accordion
* Dark premium footer
* Breadcrumb bar
* Detail page hero with large postcode number
* Postcode details card
* OpenStreetMap map section
* Nearby postcode pills
* Sidebar search widget
* Search results with filters, result cards, and pagination

Do not replace this with a generic layout.

Do not simplify it into plain white cards only.

The uploaded reference design is mandatory.

---

## Brand Colours

Use this colour system:

* Navy: `#0B2545`
* Navy 2: `#112d5e`
* Coral: `#E8472A`
* Green: `#2D6A4F`
* Ash background: `#F4F6F9`
* Border: `#E2E6ED`
* Text: `#1A1A2E`
* Muted text: `#6B7280`
* White: `#FFFFFF`

Australia accent: coral.

New Zealand accent: green.

---

## Typography

Use:

* `Sora` for headings, logo, labels, postcode numbers, and strong UI elements.
* `Inter` for body text, paragraphs, forms, and navigation.

Fonts must be loaded in a performant way.

---

## Homepage Requirements

Homepage must include:

* Premium navy navigation
* Australia/New Zealand country switcher
* Hero section
* Large postcode/suburb search
* Search hint pills
* Stats bar
* Browse by state/region
* Popular postcodes
* Popular suburbs/localities
* How it works section
* FAQ section
* Footer

The homepage must feel like a finished product landing page.

---

## Search Requirements

Search must support:

* Postcode search
* Suburb/locality search
* State/region search
* Country filter
* Australia/New Zealand toggle
* Autocomplete
* Keyboard-friendly interaction
* Mobile-friendly results
* Empty state
* No backend
* No paid search service

Use local generated search index data.

Fuse.js is allowed.

---

## Postcode Page Requirements

Each postcode page must include:

* Breadcrumbs
* Large postcode hero
* Country/state badge
* Overview section
* Postcode details card
* Suburbs/localities in this postcode
* Coordinates where available
* OpenStreetMap map
* Nearby postcodes
* Nearby suburbs/localities
* Related state/region links
* Social share buttons
* FAQ section
* Data source disclaimer
* JSON-LD schema

---

## Suburb / Locality Page Requirements

Each suburb/locality page must include:

* Breadcrumbs
* Large suburb/locality title
* Postcode
* State/region
* Country
* Coordinates where available
* OpenStreetMap map
* Nearby suburbs/localities
* Nearby postcodes
* Related links
* Social share buttons
* FAQ section
* Data source disclaimer
* JSON-LD schema

---

## Map Requirements

Use only:

* Leaflet
* OpenStreetMap tiles

Rules:

* Include visible OpenStreetMap attribution.
* Do not use Google Maps.
* Do not use paid map tiles.
* Do not bulk download or pre-cache tiles.
* Maps must be responsive.
* Maps should be lazy-loaded where possible.

---

## Social Sharing Requirements

Every postcode and suburb/locality page should include:

* Native Web Share API where supported
* Facebook share
* WhatsApp share
* X/Twitter share
* LinkedIn share
* Copy link button

Each page must include good Open Graph and Twitter/X metadata so shared links look professional.

---

## FAQ Requirements

Every postcode page should have postcode-specific FAQs.

Every suburb/locality page should have suburb/locality-specific FAQs.

Example postcode FAQs:

* What is postcode 2150?
* Which suburbs are in postcode 2150?
* What state is postcode 2150 in?
* Where is postcode 2150 located?
* How can I find nearby postcodes?

Example suburb FAQs:

* What is the postcode of Parramatta?
* Which state is Parramatta in?
* What suburbs are near Parramatta?
* Where is Parramatta located?
* Is this postcode information official?

FAQ content must be visible on the page if FAQ schema is included.

---

## Data Requirements

Use local data only.

Store datasets in:

* `/data/australian_postcodes.json`
* `/data/newzealand_postcodes.json`

Do not fetch raw GitHub data at runtime.

Create utilities to normalise data into:

* postcode groups
* suburb/locality groups
* state/region groups
* search index
* nearby locations

---

## Data Source Disclaimer

Include a visible disclaimer on relevant pages:

Postcode information is provided for general reference only. For official delivery or address verification, please check the relevant postal authority.

Include a `/data-sources` page explaining the datasets used.

Do not claim to be an official postal authority.

Do not claim the website is affiliated with Australia Post, NZ Post, or any government agency.

---

## Performance Requirements

Target:

* Lighthouse score 95+
* Mobile score 95+
* LCP under 2 seconds
* CLS under 0.1
* Minimal JavaScript
* Static HTML pages wherever possible
* Optimised assets
* Lazy-load maps

---

## Accessibility Requirements

Use:

* Semantic HTML
* Proper labels
* Keyboard accessible search
* Good colour contrast
* Focus states
* Accessible buttons
* Correct heading hierarchy

---

## Monetisation Rules

The site may support AdSense later.

Rules:

* Do not make pages ad-heavy.
* Maximum two ad placements per SEO page initially.
* Do not place ads above the main search box.
* Do not harm UX for short-term revenue.

---

## GitHub Pages Requirements

The site must support static export.

Use:

* `output: "export"`
* static-friendly routes
* no server-only features
* no API routes
* no dynamic runtime server rendering

The production build must output static files suitable for GitHub Pages.

---

## Verification Before Finishing Any Task

Before completing any task, check:

* Build passes
* Static export works
* No paid dependency was added
* No backend/API route was added
* No Google Maps dependency was added
* Pages are mobile responsive
* Metadata exists
* FAQ schema matches visible FAQ
* OpenStreetMap attribution is visible
* UI still follows the uploaded HTML reference
* Lighthouse-friendly structure is preserved

---

## Codex Behaviour Rules

When implementing:

* Prefer reusable components.
* Keep code clean and readable.
* Do not over-engineer.
* Do not introduce unnecessary dependencies.
* Do not silently change the product direction.
* Do not remove SEO features.
* Do not remove UI polish to simplify implementation.
* If a requirement conflicts with GitHub Pages static export, choose static export compatibility.

---

## Acceptance Standard

The result should look and feel like a professional public website ready for SEO indexing.

It should not look like:

* a basic student project
* a generic template
* a plain data table
* a half-finished MVP
* a cheap ad directory

It should feel like a premium, trustworthy postcode and locality discovery platform for Australia and New Zealand.

## Local POI Pipeline Skill

For tasks involving:

- Australia or New Zealand OSM PBF files
- offline POI extraction
- parks, BBQs, dog parks, playgrounds, picnic sites, viewpoints or museums
- nearby postcode matching
- generated POI JSON
- POI validation and size limits
- postcode-page POI integration
- OpenStreetMap attribution

read and follow:

`.agents/skills/osm-local-poi-pipeline/SKILL.md`

This skill takes priority over general implementation preferences for POI work.

## Local Discovery SEO and GEO Skill and getting referenced by AI tools

For tasks involving:

- postcode-page SEO
- GEO and answer-engine visibility
- metadata
- structured data
- internal linking
- factual local summaries
- indexability
- AI citation readiness
- editorial content

read and follow:

`.agents/skills/ausnz-local-discovery-seo-geo/SKILL.md`

For POI-related SEO or GEO work, use both this skill and:

`.agents/skills/osm-local-poi-pipeline/SKILL.md`
