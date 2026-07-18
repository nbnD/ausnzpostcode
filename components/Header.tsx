"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { mainNav } from "@/lib/site";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-[1000] border-b-2 border-navy2 bg-navy">
      <div className="mx-auto flex h-[60px] max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 font-heading text-lg font-extrabold tracking-normal text-white" aria-label="AusNZ Postcode home">
          <Image
            src="/logo.svg"
            alt="AusNZ Postcodes"
            width={180}
            height={60}
            className="h-10 w-auto rounded-sm bg-white px-1.5 py-1"
          />
        </Link>
        <nav aria-label="Primary navigation" className="hidden items-center gap-6 md:flex">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-ice transition hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <button
          type="button"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/15 bg-white/10 text-white transition hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-coral/40 md:hidden"
        >
          <span aria-hidden="true" className="flex flex-col gap-1.5">
            <span className={`block h-0.5 w-5 rounded bg-current transition ${open ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`block h-0.5 w-5 rounded bg-current transition ${open ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 w-5 rounded bg-current transition ${open ? "-translate-y-2 -rotate-45" : ""}`} />
          </span>
        </button>
      </div>
      <nav
        id="mobile-navigation"
        aria-label="Mobile navigation"
        className={`${open ? "block" : "hidden"} border-t border-white/10 bg-navy2 px-4 py-3 md:hidden`}
      >
        <div className="mx-auto grid max-w-6xl gap-1">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-3 text-sm font-semibold text-ice transition hover:bg-white/10 hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
