"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { CountrySwitcher } from "@/components/CountrySwitcher";
import { formatCount, getDisplayLocality, homepageData, postcodes, postcodePath } from "@/data/postcodes";

type Country = "au" | "nz";

export function SearchHero() {
  const [country, setCountry] = useState<Country>("au");
  const [query, setQuery] = useState("");
  const normalizedQuery = query.trim().toLowerCase();

  const results = useMemo(() => {
    const scoped = postcodes.filter((item) => item.country === country);
    if (!normalizedQuery) {
      return scoped.slice(0, 5);
    }

    return scoped
      .filter((item) =>
        [item.code, item.locality, item.state, ...(item.localities ?? [])].some((value) =>
          value.toLowerCase().includes(normalizedQuery)
        )
      )
      .slice(0, 5);
  }, [country, normalizedQuery]);

  const countryWord = country === "au" ? "Australian" : "New Zealand";
  const countrySub =
    country === "au"
      ? `Australia's ${formatCount(homepageData.stats.auPostcodes)} postcodes and ${formatCount(homepageData.stats.auLocalities)} localities`
      : `New Zealand's ${formatCount(homepageData.stats.nzPostcodes)} postcodes and ${formatCount(homepageData.stats.nzLocalities)} localities`;

  return (
    <>
      <CountrySwitcher country={country} onChange={setCountry} />
      <section className="relative overflow-hidden bg-[linear-gradient(160deg,#0B2545_0%,#0d3060_60%,#0f3d7a_100%)] px-4 py-16 text-center sm:px-6 lg:py-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_700px_400px_at_60%_0%,rgba(232,71,42,0.10)_0%,transparent_70%),radial-gradient(ellipse_500px_300px_at_20%_100%,rgba(45,106,79,0.13)_0%,transparent_70%)]" />
        <div className="relative mx-auto max-w-4xl">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.12em] text-sky">
            Free · Accurate · Static-first
          </p>
          <h1
            className="font-heading text-4xl font-extrabold leading-tight tracking-normal text-white sm:text-5xl"
            aria-label={`Find any ${countryWord} postcode instantly`}
          >
            Find any{" "}
            <span className={country === "au" ? "text-coral" : "text-[#4ADE80]"}>{countryWord}</span>
            {" "}
            <br />
            postcode instantly
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-ice sm:text-lg">
            Search by postcode, suburb, or locality across {countrySub}. Built as a fast,
            premium static directory with clear source attribution.
          </p>
          <div className="relative mx-auto mt-10 max-w-2xl">
            <label htmlFor="homepage-search" className="sr-only">
              Search postcodes or places
            </label>
            <div className="flex overflow-hidden rounded-xl bg-white shadow-search">
              <input
                type="search"
                id="homepage-search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={country === "au" ? "Enter postcode or suburb... e.g. 2000 or Sydney" : "Enter postcode or suburb... e.g. 1010 or Auckland"}
                className="min-w-0 flex-1 border-0 bg-transparent px-5 py-5 text-base text-text outline-none placeholder:text-gray-400"
              />
              <Link
                href={`/search?q=${encodeURIComponent(query)}`}
                className="grid place-items-center bg-coral px-5 font-heading text-sm font-bold text-white transition hover:bg-[#d03d23] sm:px-7"
              >
                Search
              </Link>
            </div>
            {query ? (
              <div className="absolute left-0 right-0 top-[calc(100%+6px)] z-20 overflow-hidden rounded-[10px] border border-border bg-white text-left shadow-premium">
                {results.map((item) => (
                  <Link key={`${item.country}-${item.code}-${item.locality}`} href={postcodePath(item)} className="flex items-center gap-3 border-b border-border px-4 py-3 last:border-b-0 hover:bg-ash">
                    <span className={`min-w-14 rounded-md px-2 py-1 text-center font-heading text-sm font-extrabold ${item.country === "nz" ? "bg-green/10 text-green" : "bg-[#EEF2FF] text-navy"}`}>
                      {item.code}
                    </span>
                    <span className="flex-1">
                      <span className="block text-sm font-semibold text-text">{getDisplayLocality(item)}</span>
                      <span className="block text-xs text-muted">{item.state}</span>
                    </span>
                    <span className="text-sm text-muted">{item.country.toUpperCase()}</span>
                  </Link>
                ))}
              </div>
            ) : null}
          </div>
          <div className="mt-4 flex flex-wrap justify-center gap-2.5">
            {homepageData.hints[country].map((hint) => (
              <button
                key={hint}
                type="button"
                onClick={() => setQuery(hint.split(" ")[0])}
                className="rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-xs font-semibold text-[#C9D9EC] transition hover:bg-white/20 hover:text-white"
              >
                {hint}
              </button>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
