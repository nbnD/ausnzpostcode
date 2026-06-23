# AusNZ Postcode

A premium SEO-focused postcode and locality directory for Australia and New Zealand.

Built with Next.js static export and hosted on GitHub Pages.

No paid APIs. No backend. No database.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Static export for GitHub Pages
- Local JSON data in `data/`

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

The build writes a static export to `out/`.

For GitHub Pages deployment, the workflow runs:

```bash
GITHUB_PAGES=true npm run build
```
