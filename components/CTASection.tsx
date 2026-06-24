import Link from "next/link";

export function CTASection() {
  return (
    <section className="bg-white py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 text-sm leading-6 text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <h2 className="font-heading text-lg font-bold text-navy">Transparent data, static pages.</h2>
          <p className="mt-1">
            Source files are stored locally and the site stays compatible with GitHub Pages.
          </p>
        </div>
        <Link href="/data-sources" className="inline-flex rounded-lg bg-coral px-5 py-3 font-heading text-sm font-bold text-white shadow-coral transition hover:bg-[#d03d23]">
          View data sources
        </Link>
      </div>
    </section>
  );
}
