"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { formatCount, postcodePath, type PostcodeRecord } from "@/data/postcodes";

const PAGE_SIZE = 48;

export function RegionPostcodeGrid({ items }: { items: PostcodeRecord[] }) {
  const [page, setPage] = useState(1);
  const pageCount = Math.ceil(items.length / PAGE_SIZE);
  const currentItems = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return items.slice(start, start + PAGE_SIZE);
  }, [items, page]);

  if (!items.length) return null;

  return (
    <section>
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-heading text-xs font-bold uppercase tracking-[0.12em] text-coral">Postcode list</p>
          <h2 className="font-heading text-2xl font-extrabold text-navy">
            Browse postcodes
          </h2>
        </div>
        <p className="text-sm text-muted">
          Showing {formatCount((page - 1) * PAGE_SIZE + 1)}-{formatCount((page - 1) * PAGE_SIZE + currentItems.length)} of {formatCount(items.length)}
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {currentItems.map((item) => (
          <Link key={item.code} href={postcodePath(item)} className="card-surface p-4">
            <p className="font-heading text-2xl font-extrabold text-navy">{item.code}</p>
            <p className="mt-1 text-sm font-semibold text-text">{item.locality}</p>
            <p className="mt-1 text-xs text-muted">{item.stateFull}</p>
          </Link>
        ))}
      </div>

      {pageCount > 1 ? (
        <nav className="mt-6 flex flex-wrap items-center justify-center gap-2" aria-label="Postcode pagination">
          <button
            type="button"
            onClick={() => setPage((value) => Math.max(1, value - 1))}
            disabled={page === 1}
            className="rounded-lg border border-border bg-white px-4 py-2 font-heading text-sm font-bold text-navy transition hover:border-coral hover:text-coral disabled:cursor-not-allowed disabled:opacity-45"
          >
            Previous
          </button>
          {Array.from({ length: pageCount }, (_, index) => index + 1).map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setPage(value)}
              aria-current={page === value ? "page" : undefined}
              className={`grid h-10 min-w-10 place-items-center rounded-lg border px-3 font-heading text-sm font-bold transition ${
                page === value
                  ? "border-coral bg-coral text-white"
                  : "border-border bg-white text-navy hover:border-coral hover:text-coral"
              }`}
            >
              {value}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setPage((value) => Math.min(pageCount, value + 1))}
            disabled={page === pageCount}
            className="rounded-lg border border-border bg-white px-4 py-2 font-heading text-sm font-bold text-navy transition hover:border-coral hover:text-coral disabled:cursor-not-allowed disabled:opacity-45"
          >
            Next
          </button>
        </nav>
      ) : null}
    </section>
  );
}
