"use client";

import { useEffect, useRef } from "react";
import type { Map } from "leaflet";

export function PostcodeMap({
  lat,
  lng,
  label
}: {
  lat: number;
  lng: number;
  label: string;
}) {
  const mapElement = useRef<HTMLDivElement>(null);
  const mapRef = useRef<Map | null>(null);
  const hasCoordinates = Number.isFinite(lat) && Number.isFinite(lng) && lat !== 0 && lng !== 0;

  useEffect(() => {
    let cancelled = false;

    async function mountMap() {
      if (!hasCoordinates || !mapElement.current || mapRef.current) return;
      const leaflet = await import("leaflet");
      if (cancelled || !mapElement.current) return;

      const map = leaflet.map(mapElement.current, {
        scrollWheelZoom: false,
        zoomControl: true
      }).setView([lat, lng], 13);

      leaflet
        .tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: "© OpenStreetMap contributors",
          maxZoom: 18
        })
        .addTo(map);

      leaflet
        .circleMarker([lat, lng], {
          color: "#E8472A",
          fillColor: "#E8472A",
          fillOpacity: 0.9,
          radius: 9,
          weight: 3
        })
        .addTo(map)
        .bindPopup(label);
      mapRef.current = map;
    }

    mountMap();

    return () => {
      cancelled = true;
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, [hasCoordinates, label, lat, lng]);

  if (!hasCoordinates) {
    return (
      <div className="grid h-[260px] place-items-center rounded-[14px] border border-border bg-ash p-6 text-center text-sm text-muted">
        Coordinates are not available for this record.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-[14px] border border-border">
      <div ref={mapElement} className="h-[260px]" />
      <p className="border-t border-border bg-white px-3 py-2 text-xs text-muted">
        Map tiles and attribution from OpenStreetMap contributors.
      </p>
    </div>
  );
}
