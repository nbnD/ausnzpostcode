import Link from "next/link";
import { footerNav, siteConfig } from "@/lib/site";

export function Footer() {
  return (
    <footer className="bg-navy px-4 py-12 text-ice sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 md:grid-cols-[2fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="inline-flex font-heading text-lg font-extrabold text-white">
              AusNZ<span className="text-sky">Postcode</span>.com
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-6 text-[#7B93B0]">
            Static postcode pages for Australia and New Zealand, designed for fast browsing,
            transparent source attribution, and clear local context.
            </p>
          </div>
          <FooterColumn title="Directory" links={footerNav.slice(0, 2)} />
          <FooterColumn title="Legal" links={footerNav.slice(2, 5)} />
          <FooterColumn title="Data" links={footerNav.slice(5)} />
        </div>
        <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-5 text-xs text-[#4B6278]">
          <p>© {new Date().getFullYear()} {siteConfig.name}. Static postcode directory.</p>
          <p>Open data posture · OpenStreetMap compatible</p>
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
            <Link href={item.href} className="text-sm text-[#7B93B0] transition hover:text-white">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
