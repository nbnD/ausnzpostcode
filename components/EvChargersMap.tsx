"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { LatLngBoundsExpression, Map as LeafletMap, Marker } from "leaflet";
import { CountrySwitcher } from "@/components/CountrySwitcher";
import type { CountryCode } from "@/data/postcodes";
import { evStationDetailItems, evStationDetailLine, type EvMapStation } from "@/lib/ev-station-display";

type EvMapDataset = {
  schemaVersion: number;
  generatedAt: string;
  attribution: string;
  countries: Record<CountryCode, { label: string; count: number; stations: EvMapStation[] }>;
};

const countryBounds: Record<CountryCode, LatLngBoundsExpression> = {
  au: [
    [-44, 112],
    [-10, 154]
  ],
  nz: [
    [-47.5, 166],
    [-34, 179]
  ]
};

export function EvChargersMap() {
  const [country, setCountry] = useState<CountryCode>("au");
  const [dataset, setDataset] = useState<EvMapDataset | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [mapReady, setMapReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const mapElement = useRef<HTMLDivElement>(null);
  const mapRef = useRef<LeafletMap | null>(null);
  const markerRefs = useRef<Map<string, Marker>>(new Map());
  const listRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  useEffect(() => {
    let cancelled = false;
    fetch("/ev-chargers.json")
      .then((response) => {
        if (!response.ok) throw new Error("Unable to load EV charger map data.");
        return response.json() as Promise<EvMapDataset>;
      })
      .then((value) => {
        if (!cancelled) setDataset(value);
      })
      .catch(() => {
        if (!cancelled) setError("EV charger map data could not be loaded.");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const stations = useMemo(() => dataset?.countries[country]?.stations ?? [], [country, dataset]);
  const selectedStation = stations.find((station) => station.id === selectedId) ?? stations[0] ?? null;

  useEffect(() => {
    let cancelled = false;
    const markers = markerRefs.current;

    async function mountMap() {
      if (!mapElement.current || mapRef.current) return;
      const leaflet = await import("leaflet");
      if (cancelled || !mapElement.current) return;

      const map = leaflet.map(mapElement.current, {
        scrollWheelZoom: false,
        zoomControl: true
      });

      leaflet
        .tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: "© OpenStreetMap contributors",
          maxZoom: 18
        })
        .addTo(map);

      mapRef.current = map;
      setMapReady(true);
    }

    mountMap();

    return () => {
      cancelled = true;
      setMapReady(false);
      mapRef.current?.remove();
      mapRef.current = null;
      markers.clear();
    };
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function renderMarkers() {
      if (!mapReady || !mapRef.current || stations.length === 0) return;
      const leaflet = await import("leaflet");
      if (cancelled || !mapRef.current) return;

      markerRefs.current.forEach((marker) => marker.remove());
      markerRefs.current.clear();

      for (const station of stations) {
        const marker = leaflet
          .marker([station.lat, station.lng], {
            icon: pinIcon(leaflet, country === "au" ? "#E8472A" : "#2D6A4F", false),
            title: station.name ?? "EV charger"
          })
          .addTo(mapRef.current);

        marker.on("click", () => {
          setSelectedId(station.id);
        });
        markerRefs.current.set(station.id, marker);
      }

      mapRef.current.fitBounds(countryBounds[country], { padding: [22, 22] });
    }

    renderMarkers();

    return () => {
      cancelled = true;
    };
  }, [country, mapReady, stations]);

  useEffect(() => {
    if (!selectedId || !mapRef.current) return;
    let cancelled = false;

    async function updateSelectedMarker() {
      const leaflet = await import("leaflet");
      if (cancelled) return;

      const baseColor = country === "au" ? "#E8472A" : "#2D6A4F";
      markerRefs.current.forEach((marker, id) => {
        marker.setIcon(pinIcon(leaflet, id === selectedId ? "#0B2545" : baseColor, id === selectedId));
      });
    }

    updateSelectedMarker();

    const station = stations.find((item) => item.id === selectedId);
    if (station) {
      const currentZoom = mapRef.current.getZoom();
      mapRef.current.flyTo([station.lat, station.lng], Math.max(currentZoom, 13), {
        animate: true,
        duration: 0.85
      });
    }

    return () => {
      cancelled = true;
    };
  }, [country, selectedId, stations]);

  useEffect(() => {
    if (!selectedId) return;
    listRefs.current.get(selectedId)?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, [selectedId]);

  return (
    <section className="overflow-hidden rounded-[14px] border border-border bg-white shadow-[0_18px_50px_rgba(11,37,69,0.08)]">
      <CountrySwitcher country={country} onChange={(value) => {
        setCountry(value);
        setSelectedId(null);
      }} />
      <div className="grid min-h-[660px] lg:grid-cols-[360px_1fr]">
        <aside className="border-b border-border bg-white p-5 lg:border-b-0 lg:border-r">
          <p className="font-heading text-xs font-bold uppercase tracking-[0.12em] text-coralText">
            {dataset?.countries[country]?.label ?? "EV chargers"}
          </p>
          <h2 className="mt-2 font-heading text-2xl font-extrabold text-navy">
            {stations.length.toLocaleString()} indexed EV chargers
          </h2>
          <p className="mt-2 text-sm leading-6 text-muted">
            Select a charger from the list or map to view operator, ports and Google Maps directions where available.
          </p>
          {error ? <p className="mt-4 rounded-lg border border-coral/30 bg-coral/10 p-3 text-sm font-semibold text-coralText">{error}</p> : null}
          <div className="mt-5 max-h-[420px] space-y-2 overflow-y-auto pr-1">
            {stations.map((station) => (
              <button
                key={station.id}
                ref={(element) => {
                  if (element) {
                    listRefs.current.set(station.id, element);
                  } else {
                    listRefs.current.delete(station.id);
                  }
                }}
                type="button"
                onClick={() => setSelectedId(station.id)}
                className={`w-full rounded-[12px] border p-3 text-left transition focus:outline-none focus:ring-2 focus:ring-coral focus:ring-offset-2 ${
                  selectedStation?.id === station.id
                    ? "border-coral bg-coral/10"
                    : "border-border bg-ash hover:border-coral hover:bg-white"
                }`}
              >
                <span className="block font-heading text-sm font-extrabold text-navy">{station.name ?? "EV charger"}</span>
                <span className="mt-1 block text-xs leading-5 text-muted">{evStationDetailLine(station)}</span>
              </button>
            ))}
          </div>
        </aside>
        <div className="relative z-0 min-h-[520px]">
          <div ref={mapElement} className="relative z-0 h-full min-h-[520px]" />
          {selectedStation ? (
            <div className="absolute bottom-4 left-4 right-4 z-[400] rounded-[14px] border border-border bg-white/95 p-4 shadow-[0_18px_48px_rgba(11,37,69,0.22)] backdrop-blur md:left-auto md:w-[360px]">
              <p className="font-heading text-sm font-extrabold text-navy">{selectedStation.name ?? "EV charger"}</p>
              <StationDetailRows station={selectedStation} />
              <div className="mt-3 flex flex-wrap gap-2">
                <a
                  href={selectedStation.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg bg-coralButton px-3 py-2 font-heading text-xs font-bold text-white hover:bg-[#a92d1b]"
                >
                  Open in Google Maps
                </a>
                {selectedStation.postcode ? (
                  <a
                    href={`/${selectedStation.country}/postcode/${selectedStation.postcode}/`}
                    className="rounded-lg border border-border bg-ash px-3 py-2 font-heading text-xs font-bold text-navy hover:border-coral hover:bg-white hover:text-coralText"
                  >
                    Postcode {selectedStation.postcode}
                  </a>
                ) : null}
              </div>
            </div>
          ) : null}
        </div>
      </div>
      <p className="border-t border-border bg-white px-5 py-3 text-xs leading-5 text-muted">
        EV charger locations are for general planning only and do not show live availability. Map tiles and attribution from OpenStreetMap contributors.
      </p>
    </section>
  );
}

function StationDetailRows({ station }: { station: EvMapStation }) {
  const items = evStationDetailItems(station);
  if (items.length === 0) {
    return <p className="mt-2 text-xs leading-5 text-muted">Location details available on map.</p>;
  }

  return (
    <dl className="mt-3 grid grid-cols-[auto_1fr] gap-x-3 gap-y-1.5 text-xs leading-5">
      {items.map((item) => (
        <div key={item.label} className="contents">
          <dt className="font-heading font-bold text-navy">{item.label}</dt>
          <dd className="text-muted">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}

function pinIcon(leaflet: typeof import("leaflet"), color: string, selected: boolean) {
  const size = selected ? 34 : 24;
  const half = size / 2;
  const html = `<span style="
    position:absolute;
    left:50%;
    top:50%;
    width:${size}px;
    height:${size}px;
    border-radius:50% 50% 50% 0;
    background:${color};
    border:3px solid #fff;
    box-shadow:0 8px 18px rgba(11,37,69,0.28);
    transform:translate(-50%,-82%) rotate(-45deg);
  "><span style="
    position:absolute;
    left:50%;
    top:50%;
    width:${selected ? 10 : 7}px;
    height:${selected ? 10 : 7}px;
    border-radius:999px;
    background:#fff;
    transform:translate(-50%,-50%);
  "></span></span>`;

  return leaflet.divIcon({
    className: "ausnz-ev-pin",
    html,
    iconAnchor: [half, size],
    iconSize: [size, size]
  });
}
