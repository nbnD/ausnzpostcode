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

  useEffect(() => {
    let cancelled = false;

    async function mountMap() {
      if (!mapElement.current || mapRef.current) return;
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
  }, [label, lat, lng]);

  return <div ref={mapElement} className="h-[260px] overflow-hidden rounded-[14px] border border-border" />;
}
