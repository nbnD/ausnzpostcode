import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { DataDisclaimer } from "@/components/DataDisclaimer";
import { FaqList } from "@/components/FaqList";
import { JsonLd } from "@/components/JsonLd";
import { NearbyPoiSection } from "@/components/NearbyPoiSection";
import { PostcodeMap } from "@/components/PostcodeMap";
import { ShareActions } from "@/components/ShareActions";
import {
  countryName,
  countryRoot,
  getDisplayLocality,
  getLocalitiesForPostcode,
  getLocalitySummary,
  getNearbyPostcodes,
  getRegions,
  localityPath,
  postcodePath,
  statePath,
  type PostcodeRecord
} from "@/data/postcodes";
import { breadcrumbSchema, faqSchema, nearbyPoiItemListSchema, placeSchema } from "@/lib/schema";
import { siteConfig } from "@/lib/site";
import { getNearbyPoisForPostcode, getPoiCountsForPostcode, getPoiManifest } from "@/lib/poi-data";
import { getPreviewPlaces } from "@/lib/poi-seo";

export function buildPostcodeFaqs(postcode: PostcodeRecord) {
  const locality = getDisplayLocality(postcode);
  const summary = getLocalitySummary(postcode);
  const place = postcode.country === "nz" ? "New Zealand" : `${postcode.stateFull}, Australia`;

  return [
    {
      question: `What is postcode ${postcode.code}?`,
      answer: `Postcode ${postcode.code} is a ${postcode.country === "nz" ? "New Zealand" : "Australian"} postcode covering ${summary}.`
    },
    {
      question: `Which ${postcode.country === "nz" ? "localities are" : "suburbs are"} in postcode ${postcode.code}?`,
      answer: `Postcode ${postcode.code} includes ${summary}.`
    },
    {
      question: `Where is postcode ${postcode.code} located?`,
      answer: `${locality} postcode ${postcode.code} is located in ${place}.`
    },
    {
      question: `Is postcode ${postcode.code} information official?`,
      answer: "This page is an independent reference. For official delivery or address verification, check the relevant postal authority."
    }
  ];
}

export function PostcodeDetailPage({ postcode }: { postcode: PostcodeRecord }) {
  const isNz = postcode.country === "nz";
  const country = countryName(postcode.country);
  const root = countryRoot(postcode.country);
  const path = postcodePath(postcode);
  const locality = getDisplayLocality(postcode);
  const summary = getLocalitySummary(postcode);
  const faqs = buildPostcodeFaqs(postcode);
  const hasCoordinates = Number.isFinite(postcode.lat) && Number.isFinite(postcode.lng) && postcode.lat !== 0 && postcode.lng !== 0;
  const mapLabel = encodeURIComponent(`Postcode ${postcode.code} ${locality}`);
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${postcode.lat},${postcode.lng}`;
  const appleMapsUrl = `https://maps.apple.com/?ll=${postcode.lat},${postcode.lng}&q=${mapLabel}`;
  const poiManifest = getPoiManifest();
  const nearbyPois = getNearbyPoisForPostcode(postcode.country, postcode.code);
  const poiCounts = getPoiCountsForPostcode(postcode.country, postcode.code);
  const poiPreviewPlaces = getPreviewPlaces(nearbyPois, 6);
  const postcodeLocalities = getLocalitiesForPostcode(postcode.country, postcode.code);
  const browseLabel = isNz ? "localities" : "suburbs";
  const schema = [
    breadcrumbSchema([
      { name: "Home", href: "/" },
      { name: country, href: root },
      { name: postcode.stateFull, href: statePath(postcode.country, postcode.state) },
      { name: postcode.code, href: path }
    ]),
    faqSchema(faqs),
    placeSchema(`Postcode ${postcode.code} ${locality}`, path, `${summary} in ${postcode.stateFull}.`),
    ...(poiPreviewPlaces.length > 0
      ? [
          nearbyPoiItemListSchema({
            name: `Nearby OpenStreetMap places for postcode ${postcode.code}`,
            path,
            places: poiPreviewPlaces
          })
        ]
      : [])
  ];

  return (
    <>
      <JsonLd data={schema} />
      <div className="border-b border-border bg-white px-4 py-2.5 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: country, href: root },
              { label: postcode.stateFull, href: statePath(postcode.country, postcode.state) },
              { label: postcode.code, href: path }
            ]}
          />
        </div>
      </div>
      <section className="bg-[linear-gradient(135deg,#0B2545_0%,#0d3060_100%)] px-4 py-9 sm:px-6">
        <div className="mx-auto flex max-w-6xl flex-wrap items-start justify-between gap-6">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.08em] text-sky">
              {country} · {postcode.stateFull}
            </p>
            <h1 className={`font-heading text-6xl font-extrabold leading-none tracking-normal ${isNz ? "text-[#4ADE80]" : "text-white"}`}>
              {postcode.code}
            </h1>
            <p className="mt-2 font-heading text-xl font-semibold text-[#C9D9EC]">{locality}</p>
            <p className="mt-1 max-w-2xl text-sm text-ice">{summary}</p>
            <p className="mt-1 text-sm text-sky">
              {postcode.stateFull} {isNz ? "· New Zealand" : `(${postcode.state}) · ${postcode.remoteness ?? postcode.type}`}
            </p>
          </div>
          <ShareActions title={`Postcode ${postcode.code} ${locality}`} url={`${siteConfig.url}${path}`} />
        </div>
      </section>
      <main className="mx-auto grid max-w-6xl gap-6 px-4 py-7 sm:px-6 lg:grid-cols-[1fr_340px]">
        <section>
          <div className="mb-4 overflow-hidden rounded-[14px] border border-border bg-white">
            <h2 className="border-b border-border bg-ash px-5 py-3.5 font-heading text-xs font-bold uppercase tracking-[0.08em] text-navy">
              Postcode overview
            </h2>
            <div className="space-y-4 p-5 text-sm leading-6 text-text">
              <p>
                Postcode <strong>{postcode.code}</strong> is used for {summary} in {postcode.stateFull}, {country}.
                Use this page to compare the postcode details, map position, nearby postcodes, related {browseLabel}, and nearby public places matched from the postcode centre.
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                <Link href={statePath(postcode.country, postcode.state)} className="rounded-xl border border-border bg-ash p-4 transition hover:border-coral hover:bg-white">
                  <span className="block font-heading text-sm font-extrabold text-navy">Browse {postcode.stateFull}</span>
                  <span className="mt-1 block text-xs text-muted">See more postcodes in this {isNz ? "region" : "state or territory"}.</span>
                </Link>
                <Link href={`${root}/${browseLabel}`} className="rounded-xl border border-border bg-ash p-4 transition hover:border-coral hover:bg-white">
                  <span className="block font-heading text-sm font-extrabold text-navy">Browse {country} {browseLabel}</span>
                  <span className="mt-1 block text-xs text-muted">Use the A-Z directory for related locality pages.</span>
                </Link>
              </div>
            </div>
          </div>
          <div className="mb-4 overflow-hidden rounded-[14px] border border-border bg-white">
            <h2 className="border-b border-border bg-ash px-5 py-3.5 font-heading text-xs font-bold uppercase tracking-[0.08em] text-navy">
              Postcode details
            </h2>
            <dl className="divide-y divide-border text-sm">
              {[
                ["Postcode", postcode.code],
                [isNz ? "Localities" : "Suburbs / Localities", summary],
                ["State / Region", postcode.stateFull],
                ["Country", country],
                ["Type", postcode.type],
                ["LGA (Council)", postcode.lga],
                ["Electorate", postcode.electorate],
                ["Remoteness", postcode.remoteness],
                ["Coordinates", postcode.lat && postcode.lng ? `${postcode.lat}, ${postcode.lng}` : undefined]
              ].filter(([, value]) => value).map(([label, value]) => (
                <div key={label} className="grid gap-2 px-5 py-3 sm:grid-cols-[38%_1fr]">
                  <dt className="font-medium text-muted">{label}</dt>
                  <dd className="font-semibold text-text">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
          {postcodeLocalities.length > 0 ? (
            <div className="mb-4 overflow-hidden rounded-[14px] border border-border bg-white">
              <h2 className="border-b border-border bg-ash px-5 py-3.5 font-heading text-xs font-bold uppercase tracking-[0.08em] text-navy">
                {isNz ? "Localities" : "Suburbs and localities"} in postcode {postcode.code}
              </h2>
              <div className="flex flex-wrap gap-2 p-5">
                {postcodeLocalities.slice(0, 24).map((item) => (
                  <Link
                    key={item.slug}
                    href={localityPath(item)}
                    className="rounded-lg border border-border bg-ash px-4 py-2 font-heading text-sm font-bold text-navy transition hover:border-coral hover:bg-white hover:text-coral"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          ) : null}
          <div className="mb-4 overflow-hidden rounded-[14px] border border-border bg-white">
            <h2 className="border-b border-border bg-ash px-5 py-3.5 font-heading text-xs font-bold uppercase tracking-[0.08em] text-navy">
              OpenStreetMap location
            </h2>
            <div className="p-4">
              <PostcodeMap lat={postcode.lat} lng={postcode.lng} label={`${postcode.code} ${locality}`} />
              {hasCoordinates ? (
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <a
                    href={googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 rounded-[14px] border border-border bg-white p-3 shadow-[0_10px_30px_rgba(11,37,69,0.08)] transition hover:-translate-y-0.5 hover:border-coral hover:shadow-[0_16px_38px_rgba(232,71,42,0.16)] focus:outline-none focus:ring-2 focus:ring-coral focus:ring-offset-2"
                    aria-label={`Open postcode ${postcode.code} in Google Maps`}
                  >
                    <span className="grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-xl bg-[linear-gradient(135deg,#4285F4_0%,#34A853_45%,#FBBC05_68%,#EA4335_100%)] shadow-inner">
                      <span className="rounded-full bg-white px-2 py-1 font-heading text-xs font-extrabold text-[#1A73E8]">G</span>
                    </span>
                    <span>
                      <span className="block font-heading text-sm font-extrabold text-navy group-hover:text-coral">
                        Open with Google Maps
                      </span>
                      <span className="mt-0.5 block text-xs text-muted">View directions and nearby places</span>
                    </span>
                  </a>
                  <a
                    href={appleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 rounded-[14px] border border-border bg-white p-3 shadow-[0_10px_30px_rgba(11,37,69,0.08)] transition hover:-translate-y-0.5 hover:border-green hover:shadow-[0_16px_38px_rgba(45,106,79,0.16)] focus:outline-none focus:ring-2 focus:ring-green focus:ring-offset-2"
                    aria-label={`Open postcode ${postcode.code} in Apple Maps`}
                  >
                    <span className="grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-xl bg-[linear-gradient(135deg,#F7FAFF_0%,#D7ECFF_38%,#78D4A7_70%,#FF6B6B_100%)] shadow-inner">
                      <span className="rounded-full bg-white px-2 py-1 font-heading text-xs font-extrabold text-green">A</span>
                    </span>
                    <span>
                      <span className="block font-heading text-sm font-extrabold text-navy group-hover:text-green">
                        Open with Apple Maps
                      </span>
                      <span className="mt-0.5 block text-xs text-muted">Open this postcode location on iOS or Mac</span>
                    </span>
                  </a>
                </div>
              ) : null}
            </div>
          </div>
          <div className="mb-4 overflow-hidden rounded-[14px] border border-border bg-white">
            <h2 className="border-b border-border bg-ash px-5 py-3.5 font-heading text-xs font-bold uppercase tracking-[0.08em] text-navy">
              Nearby postcodes
            </h2>
            <div className="flex flex-wrap gap-2 p-5">
              {getNearbyPostcodes(postcode).map((item) => (
                <Link key={item.code} href={postcodePath(item)} className="flex flex-col items-center rounded-lg border border-border bg-ash px-4 py-2 font-heading text-sm font-bold text-navy transition hover:border-coral hover:text-coral">
                  {item.code}
                  <small className="mt-0.5 font-sans text-xs font-normal text-muted">{getDisplayLocality(item)}</small>
                </Link>
              ))}
            </div>
          </div>
          <NearbyPoiSection postcode={postcode.code} locality={locality} places={nearbyPois} counts={poiCounts} manifest={poiManifest} />
          <div className="mb-4">
            <DataDisclaimer />
          </div>
          <div className="overflow-hidden rounded-[14px] border border-border bg-white">
            <h2 className="border-b border-border bg-ash px-5 py-3.5 font-heading text-xs font-bold uppercase tracking-[0.08em] text-navy">
              Frequently asked questions
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
            <Link href="/search" className="block rounded-lg bg-coral px-4 py-2.5 text-center font-heading text-sm font-bold text-white">
              Open search
            </Link>
          </div>
          <div className="rounded-[14px] border border-border bg-white p-5">
            <h2 className="mb-3 font-heading text-xs font-bold uppercase tracking-[0.08em] text-navy">
              Browse {isNz ? "regions" : "states"}
            </h2>
            <div className="divide-y divide-border">
              {getRegions(postcode.country).map((region) => (
                <Link key={region.name} href={statePath(postcode.country, region.abbr ?? region.name)} className="flex items-center justify-between py-2 text-sm text-text hover:text-coral">
                  {region.abbr ?? region.name}
                  <span className="text-xs text-muted">{region.count}</span>
                </Link>
              ))}
            </div>
          </div>
          <div className="mt-4 rounded-[14px] border border-border bg-white p-5">
            <h2 className="mb-3 font-heading text-xs font-bold uppercase tracking-[0.08em] text-navy">
              Related pages
            </h2>
            <div className="space-y-2 text-sm">
              <Link href={`${root}/postcodes`} className="block font-semibold text-text hover:text-coral">
                {country} postcodes
              </Link>
              <Link href={`${root}/${browseLabel}`} className="block font-semibold text-text hover:text-coral">
                {country} {browseLabel}
              </Link>
              <Link href={`${root}/a-z`} className="block font-semibold text-text hover:text-coral">
                {country} A-Z directory
              </Link>
              <Link href="/search" className="block font-semibold text-text hover:text-coral">
                Search all postcodes
              </Link>
            </div>
          </div>
        </aside>
      </main>
    </>
  );
}
