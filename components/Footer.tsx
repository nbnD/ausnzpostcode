import Link from "next/link";
import Image from "next/image";
import { footerNav, siteConfig } from "@/lib/site";

export function Footer() {
  return (
    <footer className="bg-navy px-4 py-12 text-[#DDE8F5] sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 md:grid-cols-[2fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="inline-flex" aria-label="AusNZ Postcode home">
              <Image
                src="/logo.svg"
                alt="AusNZ Postcodes"
                width={210}
                height={70}
                className="h-14 w-auto rounded-md bg-white px-2 py-1.5"
              />
            </Link>
            <p className="mt-3 max-w-md text-sm leading-6 text-[#DDE8F5]">
              AusNZPostcode.com is a free postcode directory covering all of
              Australia and New Zealand. Search any suburb, locality, or postcode
              to find suburb details, LGA, electorate, remoteness classification,
              and an interactive map with no signup required.
            </p>
            <p className="mt-3 max-w-md text-xs leading-5 text-[#DDE8F5]">
              Australian data is sourced from the matthewproctor open dataset.
              New Zealand data is sourced from GeoNames.
            </p>
          </div>
          <FooterColumn title="Directory" links={footerNav.slice(0, 2)} />
          <FooterColumn title="Legal" links={footerNav.slice(2, 5)} />
          <FooterColumn title="Data" links={footerNav.slice(5)} />
        </div>
        <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-5 text-xs text-[#DDE8F5]">
          <p>© {new Date().getFullYear()} {siteConfig.name}. Static postcode directory.</p>
          <p>
            Developed by{" "}
            <a
              href="https://flutterjunction.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-white transition hover:underline"
            >
              Flutter Junction
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: Array<{ href: string; label: string }> }) {
  return (
    <nav aria-label={title}>
      <h4 className="mb-3 font-heading text-xs font-bold uppercase tracking-[0.08em] text-white">
        {title}
      </h4>
      <ul className="space-y-2">
        {links.map((item) => (
          <li key={item.href}>
            <Link href={item.href} className="text-sm text-[#DDE8F5] transition hover:text-white hover:underline">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
