"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { NearbyPoi, PoiCategory, PoiManifest } from "../lib/poi-data";
import {
  buildPoiSummary,
  displayPoiName,
  getPreviewPlaces,
  poiCategoryTitle,
  poiLabelFor,
  poiPreviewCategoryOrder
} from "../lib/poi-seo";

type NearbyPoiSectionProps = {
  postcode: string;
  locality: string;
  places: NearbyPoi[];
  counts: Partial<Record<PoiCategory, number>>;
  manifest: PoiManifest | null;
};

export function NearbyPoiSection({ postcode, locality, places, counts, manifest }: NearbyPoiSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<PoiCategory | "all">("all");
  const localPlaces = places.filter((place) => place.category !== "ev-charger");
  const localCounts = withoutEvChargers(counts);
  const categories = poiPreviewCategoryOrder.filter((category) => category !== "ev-charger" && (localCounts[category] ?? 0) > 0);
  const previews = useMemo(() => {
    if (selectedCategory === "all") return getPreviewPlaces(localPlaces, 6);
    return getPreviewPlaces(
      localPlaces.filter((place) => place.category === selectedCategory),
      10
    );
  }, [localPlaces, selectedCategory]);
  if (localPlaces.length === 0 || !manifest) return null;

  const summary = buildPoiSummary({ postcode, locality, counts: localCounts });
  const generatedDate = formatGeneratedDate(manifest.generatedAt);

  return (
    <section className="mb-4 overflow-hidden rounded-[14px] border border-border bg-white">
      <div className="border-b border-border bg-[linear-gradient(135deg,#0B2545_0%,#112d5e_100%)] px-5 py-4">
        <p className="text-xs font-bold uppercase tracking-[0.08em] text-sky">Nearby local places</p>
        <h2 className="mt-1 font-heading text-xl font-extrabold text-white">Nearby parks, BBQs and places to visit</h2>
      </div>
      <div className="p-5">
        <p className="text-sm leading-6 text-text">{summary}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setSelectedCategory("all")}
            aria-pressed={selectedCategory === "all"}
            className={filterButtonClass(selectedCategory === "all")}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setSelectedCategory(category)}
              aria-pressed={selectedCategory === category}
              className={filterButtonClass(selectedCategory === category)}
            >
              {localCounts[category]} {poiLabelFor(category, localCounts[category] ?? 0)}
            </button>
          ))}
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {previews.map((place) => (
            <a
              key={place.id}
              href={place.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-[12px] border border-border bg-ash p-4 transition hover:-translate-y-0.5 hover:border-coral hover:bg-white hover:shadow-[0_14px_34px_rgba(11,37,69,0.1)] focus:outline-none focus:ring-2 focus:ring-coral focus:ring-offset-2"
            >
              <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-coral">
                {poiCategoryTitle(place.category)}
              </span>
              <span className="mt-1 block font-heading text-sm font-extrabold text-navy group-hover:text-coral">
                {displayPoiName(place)}
              </span>
              <span className="mt-1 block text-xs text-muted">
                {place.distanceKm.toFixed(2)} km from this postcode centre · Open in Google Maps
              </span>
            </a>
          ))}
        </div>
        <div className="mt-5 rounded-[12px] border border-border bg-white p-4 text-xs leading-5 text-muted">
          <p>
            These nearby places are matched by distance from the postcode centre and may not describe postal delivery areas.
          </p>
          <p className="mt-2">
            Dataset generated {generatedDate}. Place data © OpenStreetMap contributors, available under the ODbL.
            OpenStreetMap coverage may be incomplete or vary by area.
          </p>
        </div>
      </div>
    </section>
  );
}

export function EvChargingSection({
  postcode,
  locality,
  places,
  manifest
}: {
  postcode: string;
  locality: string;
  places: NearbyPoi[];
  manifest: PoiManifest | null;
}) {
  const evChargers = getPreviewPlaces(
    places.filter((place) => place.category === "ev-charger"),
    10
  );

  if (evChargers.length === 0 || !manifest) return null;

  const generatedDate = formatGeneratedDate(manifest.generatedAt);
  const label = evChargers.length === 1 ? "EV charger" : "EV chargers";
  const includesAustralianPublicEvData = evChargers.some((place) => place.source === "australian-public-ev-chargers");

  return (
    <section className="mb-4 overflow-hidden rounded-[14px] border border-border bg-white">
      <div className="border-b border-border bg-[linear-gradient(135deg,#112d5e_0%,#2D6A4F_100%)] px-5 py-4">
        <p className="text-xs font-bold uppercase tracking-[0.08em] text-[#B7F7D0]">EV charging</p>
        <h2 className="mt-1 font-heading text-xl font-extrabold text-white">
          EV chargers near postcode {postcode}
        </h2>
      </div>
      <div className="p-5">
        <p className="text-sm leading-6 text-text">
          Around {locality} postcode {postcode}, this directory highlights {evChargers.length} nearby {label}, ranked by distance from the postcode centre.
        </p>
        <div className="mt-4">
          <Link
            href="/ev-chargers"
            className="inline-flex rounded-lg border border-green/25 bg-green/10 px-4 py-2 font-heading text-xs font-bold text-green transition hover:border-green hover:bg-white"
          >
            View all EV chargers on map
          </Link>
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {evChargers.map((place) => (
            <a
              key={place.id}
              href={place.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-[12px] border border-border bg-ash p-4 transition hover:-translate-y-0.5 hover:border-green hover:bg-white hover:shadow-[0_14px_34px_rgba(45,106,79,0.14)] focus:outline-none focus:ring-2 focus:ring-green focus:ring-offset-2"
            >
              <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-green">EV charger</span>
              <span className="mt-1 block font-heading text-sm font-extrabold text-navy group-hover:text-green">
                {displayPoiName(place)}
              </span>
              <span className="mt-1 block text-xs text-muted">
                {place.distanceKm.toFixed(2)} km from this postcode centre · Open in Google Maps
              </span>
              <EvChargerDetails place={place} />
            </a>
          ))}
        </div>
        <div className="mt-5 rounded-[12px] border border-border bg-white p-4 text-xs leading-5 text-muted">
          <p>
            EV charging locations are matched by distance from the postcode centre and may not describe postal delivery areas.
          </p>
          <p className="mt-2">
            Dataset generated {generatedDate}. Place data © OpenStreetMap contributors, available under the ODbL.
            {includesAustralianPublicEvData ? " EV charger details may include Australian public EV charging station data." : ""}
            Coverage may be incomplete or vary by area.
          </p>
        </div>
      </div>
    </section>
  );
}

function EvChargerDetails({ place }: { place: NearbyPoi }) {
  const details = [
    stringTag(place, "operator"),
    chargerTypeLabel(place),
    capacityLabel(place),
    portSummary(place),
    connectorSummary(place, "teslaConnectors", "Tesla"),
    connectorSummary(place, "type2Connectors", "Type 2"),
    connectorSummary(place, "j1772Connectors", "J1772")
  ].filter(Boolean);

  if (details.length === 0) return null;

  return <span className="mt-3 block text-xs font-semibold leading-5 text-navy">{details.join(" · ")}</span>;
}

function chargerTypeLabel(place: NearbyPoi) {
  const value = stringTag(place, "chargerType");
  if (!value) return undefined;
  return value.replace(/\bR\d\b/g, "").replace(/\s+/g, " ").trim();
}

function capacityLabel(place: NearbyPoi) {
  const value = stringTag(place, "chargerCapacities");
  if (!value) return undefined;
  if (/^\d+(\.\d+)?\s*kW$/i.test(value)) return value.replace(/\s*kW$/i, " kW");
  if (/^(AC|DC)$/i.test(value)) return value.toUpperCase();
  return undefined;
}

function portSummary(place: NearbyPoi) {
  const value = numberTag(place, "numberOfPlugs");
  if (!value) return undefined;
  return `${value} ${value === 1 ? "port" : "ports"}`;
}

function connectorSummary(place: NearbyPoi, key: string, label: string) {
  const value = numberTag(place, key);
  if (!value || value <= 0) return undefined;
  return `${value} ${label}`;
}

function stringTag(place: NearbyPoi, key: string) {
  const value = place.tags?.[key];
  if (typeof value === "string") {
    const cleaned = value.trim();
    return cleaned || undefined;
  }
  if (typeof value === "number") return String(value);
  return undefined;
}

function numberTag(place: NearbyPoi, key: string) {
  const value = place.tags?.[key];
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string") {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : undefined;
  }
  return undefined;
}

function withoutEvChargers(counts: Partial<Record<PoiCategory, number>>) {
  const localCounts: Partial<Record<PoiCategory, number>> = { ...counts };
  delete localCounts["ev-charger"];
  return localCounts;
}

function filterButtonClass(active: boolean) {
  const base =
    "rounded-full border px-3 py-1 text-xs font-semibold transition focus:outline-none focus:ring-2 focus:ring-coral focus:ring-offset-2";
  return active
    ? `${base} border-coral bg-coral text-white shadow-[0_8px_18px_rgba(232,71,42,0.22)]`
    : `${base} border-border bg-ash text-navy hover:border-coral hover:bg-white hover:text-coral`;
}

function formatGeneratedDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(date);
}
