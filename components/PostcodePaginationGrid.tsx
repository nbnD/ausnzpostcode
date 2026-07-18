"use client";

import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import { postcodePath, type PostcodeRecord } from "@/data/postcodes";

const PAGE_SIZE = 80;

export function PostcodePaginationGrid({ items }: { items: PostcodeRecord[] }) {
  const [page, setPage] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const totalPages = Math.max(1, Math.ceil(items.length / PAGE_SIZE));
  const visibleItems = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return items.slice(start, start + PAGE_SIZE);
  }, [items, page]);
  function goToPage(nextPage: number) {
    const safePage = Math.min(Math.max(nextPage, 1), totalPages);
    setPage(safePage);
    containerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  const paginationControls = totalPages > 1 ? (
    <>
      <button
        type="button"
        onClick={() => goToPage(page - 1)}
        disabled={page === 1}
        className="rounded-lg border border-border bg-ash px-3 py-2 text-xs font-bold text-navy transition hover:border-coral hover:bg-white hover:text-coral disabled:cursor-not-allowed disabled:opacity-45"
      >
        Previous
      </button>
      <span className="rounded-lg bg-navy px-3 py-2 font-heading text-xs font-extrabold text-white">
        Page {page} of {totalPages}
      </span>
      <button
        type="button"
        onClick={() => goToPage(page + 1)}
        disabled={page === totalPages}
        className="rounded-lg border border-border bg-ash px-3 py-2 text-xs font-bold text-navy transition hover:border-coral hover:bg-white hover:text-coral disabled:cursor-not-allowed disabled:opacity-45"
      >
        Next
      </button>
    </>
  ) : null;

  return (
    <div ref={containerRef}>
      {totalPages > 1 ? (
        <nav className="mb-4 flex flex-wrap items-center justify-center gap-2 rounded-[14px] border border-border bg-white px-4 py-3 shadow-[0_10px_30px_rgba(11,37,69,0.06)]" aria-label="Postcode pagination">
          {paginationControls}
        </nav>
      ) : null}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {visibleItems.map((item) => (
          <Link key={item.code} href={postcodePath(item)} className="card-surface p-4">
            <p className="font-heading text-2xl font-extrabold text-navy">{item.code}</p>
            <p className="mt-1 text-sm font-semibold text-text">{item.locality}</p>
            <p className="mt-1 text-xs text-muted">{item.stateFull}</p>
          </Link>
        ))}
      </div>
      {totalPages > 1 ? (
        <nav className="mt-6 flex flex-wrap items-center justify-center gap-2 rounded-[14px] border border-border bg-white px-4 py-3 shadow-[0_10px_30px_rgba(11,37,69,0.06)]" aria-label="Postcode pagination">
          {paginationControls}
        </nav>
      ) : null}
    </div>
  );
}
