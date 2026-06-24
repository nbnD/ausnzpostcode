"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { australiaStates, getDisplayLocality, getLocalitySummary, postcodes } from "@/data/postcodes";

type CountryFilter = "au" | "nz" | "all";
type TypeFilter = string;

const perPage = 8;

export function SearchResults() {
  const [query, setQuery] = useState("");
  const [country, setCountry] = useState<CountryFilter>("au");
  const [type, setType] = useState<TypeFilter>("all");
  const [sort, setSort] = useState("code");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return postcodes
      .filter((item) => country === "all" || item.country === country)
      .filter((item) => type === "all" || item.type === type)
      .filter((item) =>
        !q
          ? true
          : [
              item.code,
              item.locality,
              item.state,
              item.stateFull,
              item.lga ?? "",
              ...(item.localities ?? [])
            ].some((value) =>
              value.toLowerCase().includes(q)
            )
      )
      .sort((a, b) => {
        if (sort === "suburb") return a.locality.localeCompare(b.locality);
        if (sort === "state") return a.state.localeCompare(b.state);
        return a.code.localeCompare(b.code);
      });
  }, [country, query, sort, type]);

  const pages = Math.max(1, Math.ceil(filtered.length / perPage));
  const pageItems = filtered.slice((page - 1) * perPage, page * perPage);
  const typeOptions = Array.from(
    new Set(
      postcodes
        .filter((item) => country === "all" || item.country === country)
        .map((item) => item.type)
    )
  ).sort();
  const stateCounts = australiaStates.map((state) => ({
    ...state,
    total: filtered.filter((item) => item.state === state.abbr).length
  }));

  function setCountryFilter(value: CountryFilter) {
    setCountry(value);
    setPage(1);
  }

  return (
    <>
      <section className="border-b border-navy2 bg-navy px-4 py-5 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="flex gap-2">
            <input
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setPage(1);
              }}
              placeholder="Search postcode or suburb..."
              className="min-w-0 flex-1 rounded-lg border-0 bg-white px-4 py-3 text-sm text-text outline-none focus:ring-4 focus:ring-coral/30"
            />
            <button className="rounded-lg bg-coral px-5 font-heading text-sm font-bold text-white transition hover:bg-[#d03d23]">
              Search
            </button>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {[
              ["au", "Australia"],
              ["nz", "New Zealand"],
              ["all", "Both"]
            ].map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() => setCountryFilter(value as CountryFilter)}
                className={`rounded-full border px-3.5 py-1.5 text-xs font-bold transition ${
                  country === value
                    ? value === "nz"
                      ? "border-[#4ADE80] bg-[#4ADE80]/15 text-[#4ADE80]"
                      : value === "au"
                        ? "border-coral bg-coral/20 text-coral"
                        : "border-sky bg-sky/20 text-sky"
                    : "border-white/20 text-ice hover:border-white/50 hover:text-white"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </section>
      <main className="mx-auto grid max-w-6xl gap-6 px-4 py-7 sm:px-6 md:grid-cols-[220px_1fr]">
        <aside className="hidden md:block">
          <div className="mb-4 rounded-xl border border-border bg-white p-5">
            <h2 className="mb-3 font-heading text-xs font-bold uppercase tracking-[0.08em] text-navy">
              State / Region
            </h2>
            <div className="space-y-1">
              {stateCounts.map((state) => (
                <button
                  key={state.abbr}
                  type="button"
                  onClick={() => {
                    setQuery(state.abbr);
                    setPage(1);
                  }}
                  className="flex w-full items-center justify-between border-b border-border py-2 text-left text-sm text-text last:border-b-0 hover:text-coral"
                >
                  <span>{state.abbr}</span>
                  <span className="rounded-full bg-ash px-2 py-0.5 text-xs text-muted">{state.total}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="rounded-xl border border-border bg-white p-5">
            <h2 className="mb-3 font-heading text-xs font-bold uppercase tracking-[0.08em] text-navy">
              Type
            </h2>
            {(["all", ...typeOptions] as TypeFilter[]).slice(0, 7).map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => {
                  setType(value);
                  setPage(1);
                }}
                className={`flex w-full items-center justify-between border-b border-border py-2 text-left text-sm last:border-b-0 ${
                  type === value ? "font-semibold text-coral" : "text-text hover:text-coral"
                }`}
              >
                <span>{value === "all" ? "All types" : value}</span>
                <span className="rounded-full bg-ash px-2 py-0.5 text-xs text-muted">
                  {value === "all" ? filtered.length : filtered.filter((item) => item.type === value).length}
                </span>
              </button>
            ))}
          </div>
        </aside>
        <section>
          <div className="mb-4 flex items-center justify-between gap-4">
            <p className="font-heading text-sm font-bold text-navy">
              {filtered.length} <span className="font-normal text-muted">results</span>
            </p>
            <select
              value={sort}
              onChange={(event) => setSort(event.target.value)}
              className="rounded-md border border-border bg-white px-3 py-2 text-xs text-text outline-none"
              aria-label="Sort results"
            >
              <option value="code">Sort: Postcode</option>
              <option value="suburb">Sort: Suburb A-Z</option>
              <option value="state">Sort: State</option>
            </select>
          </div>
          <div className="space-y-2.5">
            {pageItems.map((item) => (
              <Link
                key={`${item.country}-${item.code}-${item.locality}`}
                href={`/postcode/${item.country}/${item.code}`}
                className={`flex items-center gap-4 rounded-xl border border-border bg-white p-5 text-text transition hover:translate-x-1 ${
                  item.country === "nz"
                    ? "hover:border-green hover:shadow-[0_4px_16px_rgba(45,106,79,0.10)]"
                    : "hover:border-coral hover:shadow-coral"
                }`}
              >
                <span className={`min-w-16 font-heading text-2xl font-extrabold ${item.country === "nz" ? "text-green" : "text-navy"}`}>
                  {item.code}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-bold">{getDisplayLocality(item)}</span>
                  <span className="mt-0.5 block text-xs text-muted">{getLocalitySummary(item)}</span>
                  <span className="mt-1 flex flex-wrap gap-1.5">
                    <span className="rounded bg-[#EEF2FF] px-2 py-0.5 text-xs font-semibold text-navy2">{item.state}</span>
                    {item.lga ? <span className="rounded bg-[#FFF7ED] px-2 py-0.5 text-xs font-semibold text-[#92400E]">{item.lga}</span> : null}
                    <span className="rounded bg-[#F0FDF4] px-2 py-0.5 text-xs font-semibold text-green">{item.type}</span>
                    {item.remoteness ? <span className="rounded bg-ash px-2 py-0.5 text-xs font-semibold text-muted">{item.remoteness}</span> : null}
                  </span>
                </span>
                <span className="text-xl text-muted">›</span>
              </Link>
            ))}
          </div>
          <div className="mt-6 flex justify-center gap-1.5">
            {Array.from({ length: pages }, (_, index) => index + 1).map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => setPage(value)}
                className={`grid h-9 w-9 place-items-center rounded-lg border font-heading text-xs font-bold ${
                  page === value
                    ? "border-coral bg-coral text-white"
                    : "border-border bg-white text-text hover:border-coral hover:text-coral"
                }`}
              >
                {value}
              </button>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
