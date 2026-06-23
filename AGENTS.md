# AGENTS.md

## Project
Build ausnzpostcode.com, a premium SEO-focused Australia and New Zealand postcode directory.

## Hard Rules
- Use only free and open-source libraries.
- No paid APIs.
- No Google Maps.
- Use OpenStreetMap + Leaflet only.
- Use Next.js static export.
- Must work on GitHub Pages.
- No backend, no database, no API routes.
- Generate static SEO pages from local JSON data.
- Do not fetch raw GitHub data at runtime.
- Store postcode data in /data.
- Keep design premium, mobile-first, clean, and fast.

## SEO Requirements
Every SEO page must include:
- unique title
- unique meta description
- canonical URL
- Open Graph tags
- Twitter card tags
- breadcrumbs
- FAQ section
- FAQ schema
- Breadcrumb schema
- Place schema
- internal links
- sitemap support

## UI Requirements
- Premium design
- Card-based layout
- Large homepage search
- Responsive mobile-first layout
- No ugly table-heavy design
- Minimal ads
- Fast loading

## UI Reference Rule
The uploaded HTML files define the approved visual direction. Do not replace them with a generic SaaS or plain default Tailwind layout.

## Verification
Before finishing any task:
- Run build
- Check static export
- Check no paid dependency was added
- Check mobile layout
- Check SEO metadata
