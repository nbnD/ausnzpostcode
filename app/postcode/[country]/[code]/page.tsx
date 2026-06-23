import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FaqList } from "@/components/FaqList";
import { PostcodeMap } from "@/components/PostcodeMap";
import { australiaStates, postcodes, type PostcodeRecord } from "@/data/postcodes";
import { createMetadata } from "@/lib/metadata";
import { breadcrumbSchema, faqSchema, placeSchema } from "@/lib/schema";

type PageParams = {
  country: "au" | "nz";
  code: string;
};

export function generateStaticParams(): PageParams[] {
  return postcodes.map((item) => ({
    country: item.country,
    code: item.code
  }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const { country, code } = await params;
  const postcode = findPostcode(country, code);

  if (!postcode) {
    return createMetadata({
      title: "Postcode Not Found",
      description: "Postcode detail page not found.",
      path: `/postcode/${country}/${code}`
    });
  }

  return createMetadata({
    title: `Postcode ${postcode.code} - ${postcode.locality} ${postcode.state}`,
    description: `Postcode ${postcode.code} covers ${postcode.locality} in ${postcode.stateFull}. Find details, map and nearby postcodes.`,
    path: `/postcode/${country}/${code}`
  });
}

export default async function PostcodePage({ params }: { params: Promise<PageParams> }) {
  const { country, code } = await params;
  const postcode = findPostcode(country, code);

  if (!postcode) {
    notFound();
  }

  const isNz = postcode.country === "nz";
  const countryName = isNz ? "New Zealand" : "Australia";
  const countryPath = isNz ? "/new-zealand" : "/australia";
  const faqs = buildFaqs(postcode);
  const schema = [
    breadcrumbSchema([
      { name: "Home", href: "/" },
      { name: countryName, href: countryPath },
      { name: postcode.state, href: `/search?q=${postcode.state}` },
      { name: postcode.code, href: `/postcode/${postcode.country}/${postcode.code}` }
    ]),
    faqSchema(faqs),
    placeSchema(
      `Postcode ${postcode.code} ${postcode.locality}`,
      `/postcode/${postcode.country}/${postcode.code}`,
      `${postcode.locality} postcode detail page.`
    )
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className="border-b border-border bg-white px-4 py-2.5 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: countryName, href: countryPath },
              { label: postcode.state, href: `/search?q=${postcode.state}` },
              { label: postcode.code, href: `/postcode/${postcode.country}/${postcode.code}` }
            ]}
          />
        </div>
      </div>
      <section className="bg-[linear-gradient(135deg,#0B2545_0%,#0d3060_100%)] px-4 py-8 sm:px-6">
        <div className="mx-auto flex max-w-6xl flex-wrap items-start justify-between gap-6">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.08em] text-sky">
              {countryName} · {postcode.stateFull}
            </p>
            <h1 className={`font-heading text-6xl font-extrabold leading-none tracking-normal ${isNz ? "text-[#4ADE80]" : "text-white"}`}>
              {postcode.code}
            </h1>
            <p className="mt-2 font-heading text-xl font-semibold text-[#C9D9EC]">{postcode.locality}</p>
            <p className="mt-1 text-sm text-sky">
              {postcode.stateFull} {isNz ? "· New Zealand" : `(${postcode.state}) · ${postcode.remoteness}`}
            </p>
          </div>
          <div className="flex flex-wrap gap-2 pt-2">
            <button className="rounded-lg bg-coral px-5 py-3 font-heading text-sm font-bold text-white">
              Copy {postcode.code}
            </button>
            <button className="rounded-lg border border-white/20 bg-white/10 px-5 py-3 font-heading text-sm font-semibold text-white">
              Share
            </button>
          </div>
        </div>
      </section>
      <main className="mx-auto grid max-w-6xl gap-6 px-4 py-7 sm:px-6 lg:grid-cols-[1fr_340px]">
        <section>
          <div className="mb-4 overflow-hidden rounded-[14px] border border-border bg-white">
            <h2 className="border-b border-border bg-ash px-5 py-3.5 font-heading text-xs font-bold uppercase tracking-[0.08em] text-navy">
              Postcode Details
            </h2>
            <dl className="divide-y divide-border text-sm">
              {[
                ["Postcode", postcode.code],
                ["Suburb / Locality", postcode.locality],
                ["State / Region", postcode.stateFull],
                ["Country", countryName],
                ["Type", postcode.type],
                ["LGA (Council)", postcode.lga],
                ["Electorate", postcode.electorate],
                ["Remoteness", postcode.remoteness],
                ["Coordinates", `${postcode.lat}, ${postcode.lng}`]
              ].filter(([, value]) => value).map(([label, value]) => (
                <div key={label} className="grid grid-cols-[44%_1fr] px-5 py-3">
                  <dt className="font-medium text-muted">{label}</dt>
                  <dd className="font-semibold text-text">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="mb-4 overflow-hidden rounded-[14px] border border-border bg-white">
            <h2 className="border-b border-border bg-ash px-5 py-3.5 font-heading text-xs font-bold uppercase tracking-[0.08em] text-navy">
              OpenStreetMap
            </h2>
            <div className="p-4">
              <PostcodeMap lat={postcode.lat} lng={postcode.lng} label={`${postcode.code} ${postcode.locality}`} />
            </div>
          </div>
          <div className="mb-4 overflow-hidden rounded-[14px] border border-border bg-white">
            <h2 className="border-b border-border bg-ash px-5 py-3.5 font-heading text-xs font-bold uppercase tracking-[0.08em] text-navy">
              Nearby Postcodes
            </h2>
            <div className="flex flex-wrap gap-2 p-5">
              {(postcode.nearby ?? postcodes.filter((item) => item.country === postcode.country && item.code !== postcode.code).slice(0, 6).map((item) => ({ code: item.code, name: item.locality }))).map((item) => (
                <Link key={item.code} href={`/search?q=${item.code}`} className="flex flex-col items-center rounded-lg border border-border bg-ash px-4 py-2 font-heading text-sm font-bold text-navy transition hover:border-coral hover:text-coral">
                  {item.code}
                  <small className="mt-0.5 font-sans text-xs font-normal text-muted">{item.name}</small>
                </Link>
              ))}
            </div>
          </div>
          <div className="overflow-hidden rounded-[14px] border border-border bg-white">
            <h2 className="border-b border-border bg-ash px-5 py-3.5 font-heading text-xs font-bold uppercase tracking-[0.08em] text-navy">
              Frequently Asked Questions
            </h2>
            <div className="p-4">
              <FaqList items={faqs} />
            </div>
          </div>
        </section>
        <aside className="hidden lg:block">
          <div className="mb-4 rounded-[14px] border border-border bg-white p-5">
            <h2 className="mb-3 font-heading text-xs font-bold uppercase tracking-[0.08em] text-navy">
              Search another postcode
            </h2>
            <input className="mb-2 w-full rounded-lg border border-border px-3 py-2 text-sm outline-none focus:border-coral" placeholder="e.g. 3000 or Melbourne" />
            <Link href="/search" className="block rounded-lg bg-coral px-4 py-2.5 text-center font-heading text-sm font-bold text-white">
              Search
            </Link>
          </div>
          <div className="rounded-[14px] border border-border bg-white p-5">
            <h2 className="mb-3 font-heading text-xs font-bold uppercase tracking-[0.08em] text-navy">
              Browse by State
            </h2>
            <div className="divide-y divide-border">
              {australiaStates.map((state) => (
                <Link key={state.abbr} href={`/search?q=${state.abbr}`} className="flex items-center justify-between py-2 text-sm text-text hover:text-coral">
                  {state.abbr}
                  <span className="text-xs text-muted">{state.count} postcodes</span>
                </Link>
              ))}
              <Link href="/search?country=nz" className="flex items-center justify-between py-2 text-sm text-text hover:text-coral">
                New Zealand
                <span className="text-xs text-muted">1,856</span>
              </Link>
            </div>
          </div>
        </aside>
      </main>
    </>
  );
}

function findPostcode(country: string, code: string) {
  return postcodes.find((item) => item.country === country && item.code === code);
}

function buildFaqs(postcode: PostcodeRecord) {
  if (postcode.country === "nz") {
    return [
      {
        question: `What suburb is postcode ${postcode.code}?`,
        answer: `Postcode ${postcode.code} covers ${postcode.locality} in the ${postcode.stateFull}.`
      },
      {
        question: `What region is postcode ${postcode.code} in?`,
        answer: `Postcode ${postcode.code} is in the ${postcode.stateFull} of New Zealand.`
      },
      {
        question: `How do I use postcode ${postcode.code}?`,
        answer: `Use ${postcode.code} as the postal code when addressing mail or forms for ${postcode.locality}.`
      }
    ];
  }

  return [
    {
      question: `What suburb is postcode ${postcode.code}?`,
      answer: `Postcode ${postcode.code} covers ${postcode.locality} in ${postcode.stateFull} (${postcode.state}).`
    },
    {
      question: `What LGA is postcode ${postcode.code} in?`,
      answer: `Postcode ${postcode.code} falls within ${postcode.lga ?? postcode.stateFull}.`
    },
    {
      question: `What state does postcode ${postcode.code} belong to?`,
      answer: `Postcode ${postcode.code} belongs to ${postcode.stateFull}, Australia.`
    }
  ];
}
