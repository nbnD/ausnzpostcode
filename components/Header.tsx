import Link from "next/link";
import { mainNav } from "@/lib/site";

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b-2 border-navy2 bg-navy">
      <div className="mx-auto flex h-[60px] max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 font-heading text-lg font-extrabold tracking-normal text-white" aria-label="AusNZ Postcode home">
          <span aria-hidden="true">AU NZ</span>
          AusNZ<span className="text-sky">Postcode</span>.com
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
      </div>
    </header>
  );
}
