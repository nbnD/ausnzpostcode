import type { CountryCode } from "@/data/postcodes";

export type EvMapStation = {
  id: string;
  country: CountryCode;
  source?: string;
  name?: string;
  lat: number;
  lng: number;
  operator?: string;
  chargerType?: string;
  capacity?: string;
  ports?: number;
  connectors?: {
    tesla?: number;
    type2?: number;
    j1772?: number;
  };
  postcode?: string;
  suburb?: string;
  googleMapsUrl: string;
};

export function evStationDetailItems(station: EvMapStation) {
  return [
    detail("Operator", station.operator),
    detail("Charging type", station.chargerType),
    detail("Power", station.capacity),
    detail("Ports", station.ports ? `${station.ports} ${station.ports === 1 ? "port" : "ports"}` : undefined),
    detail("Tesla", connectorValue(station.connectors?.tesla)),
    detail("Type 2", connectorValue(station.connectors?.type2)),
    detail("J1772", connectorValue(station.connectors?.j1772)),
    detail("Suburb / locality", station.suburb),
    detail("Postcode", station.postcode)
  ].filter((item): item is { label: string; value: string } => Boolean(item));
}

export function evStationDetailLine(station: EvMapStation) {
  const values = evStationDetailItems(station).map((item) => {
    if (["Tesla", "Type 2", "J1772"].includes(item.label)) return `${item.value} ${item.label}`;
    if (item.label === "Postcode") return `postcode ${item.value}`;
    return item.value;
  });
  return values.join(" · ") || "Location details available on map.";
}

function detail(label: string, value: string | undefined) {
  const cleaned = value?.trim();
  return cleaned ? { label, value: cleaned } : undefined;
}

function connectorValue(value: number | undefined) {
  return value && value > 0 ? String(value) : undefined;
}
