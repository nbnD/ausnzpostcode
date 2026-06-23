export type PostcodeRecord = {
  code: string;
  locality: string;
  state: string;
  stateFull: string;
  country: "au" | "nz";
  lga?: string;
  electorate?: string;
  type: "General" | "PO Box";
  remoteness?: string;
  lat: number;
  lng: number;
  nearby?: Array<{ code: string; name: string }>;
};

export const postcodes: PostcodeRecord[] = [
  {
    code: "2000",
    locality: "Sydney",
    state: "NSW",
    stateFull: "New South Wales",
    country: "au",
    lga: "City of Sydney",
    electorate: "Sydney",
    type: "General",
    remoteness: "Major Cities",
    lat: -33.8688,
    lng: 151.2093,
    nearby: [
      { code: "2001", name: "Sydney GPO" },
      { code: "2007", name: "Ultimo" },
      { code: "2008", name: "Darlington" },
      { code: "2009", name: "Pyrmont" },
      { code: "2010", name: "Surry Hills" },
      { code: "2060", name: "North Sydney" }
    ]
  },
  { code: "2007", locality: "Ultimo", state: "NSW", stateFull: "New South Wales", country: "au", lga: "City of Sydney", type: "General", remoteness: "Major Cities", lat: -33.883, lng: 151.2 },
  { code: "3000", locality: "Melbourne", state: "VIC", stateFull: "Victoria", country: "au", lga: "City of Melbourne", electorate: "Melbourne", type: "General", remoteness: "Major Cities", lat: -37.8136, lng: 144.9631 },
  { code: "3006", locality: "Southbank", state: "VIC", stateFull: "Victoria", country: "au", lga: "City of Melbourne", type: "General", remoteness: "Major Cities", lat: -37.8216, lng: 144.9646 },
  { code: "4000", locality: "Brisbane", state: "QLD", stateFull: "Queensland", country: "au", lga: "Brisbane City", electorate: "Brisbane Central", type: "General", remoteness: "Major Cities", lat: -27.4698, lng: 153.0251 },
  { code: "4101", locality: "South Brisbane", state: "QLD", stateFull: "Queensland", country: "au", lga: "Brisbane City", type: "General", remoteness: "Major Cities", lat: -27.4787, lng: 153.0215 },
  { code: "5000", locality: "Adelaide", state: "SA", stateFull: "South Australia", country: "au", lga: "Adelaide City Council", electorate: "Adelaide", type: "General", remoteness: "Major Cities", lat: -34.9285, lng: 138.6007 },
  { code: "6000", locality: "Perth", state: "WA", stateFull: "Western Australia", country: "au", lga: "City of Perth", electorate: "Perth", type: "General", remoteness: "Major Cities", lat: -31.9505, lng: 115.8605 },
  { code: "7000", locality: "Hobart", state: "TAS", stateFull: "Tasmania", country: "au", lga: "City of Hobart", electorate: "Clark", type: "General", remoteness: "Major Cities", lat: -42.8821, lng: 147.3272 },
  { code: "0800", locality: "Darwin", state: "NT", stateFull: "Northern Territory", country: "au", lga: "City of Darwin", electorate: "Darwin", type: "General", remoteness: "Major Cities", lat: -12.4634, lng: 130.8456 },
  { code: "2600", locality: "Canberra", state: "ACT", stateFull: "Australian Capital Territory", country: "au", lga: "City of Canberra", electorate: "Canberra", type: "General", remoteness: "Major Cities", lat: -35.2809, lng: 149.13 },
  { code: "0872", locality: "Alice Springs", state: "NT", stateFull: "Northern Territory", country: "au", lga: "Alice Springs Town Council", type: "General", remoteness: "Remote", lat: -23.698, lng: 133.8807 },
  { code: "1010", locality: "Auckland CBD", state: "Auckland", stateFull: "Auckland Region", country: "nz", type: "General", lat: -36.8485, lng: 174.7633 },
  { code: "1021", locality: "Parnell", state: "Auckland", stateFull: "Auckland Region", country: "nz", type: "General", lat: -36.857, lng: 174.782 },
  { code: "1050", locality: "Ponsonby", state: "Auckland", stateFull: "Auckland Region", country: "nz", type: "General", lat: -36.8575, lng: 174.746 },
  { code: "3010", locality: "Hamilton CBD", state: "Waikato", stateFull: "Waikato Region", country: "nz", type: "General", lat: -37.787, lng: 175.2793 },
  { code: "3110", locality: "Tauranga CBD", state: "Bay of Plenty", stateFull: "Bay of Plenty Region", country: "nz", type: "General", lat: -37.6878, lng: 176.1651 },
  { code: "6011", locality: "Wellington CBD", state: "Wellington", stateFull: "Wellington Region", country: "nz", type: "General", lat: -41.2924, lng: 174.7787 },
  { code: "8011", locality: "Christchurch CBD", state: "Canterbury", stateFull: "Canterbury Region", country: "nz", type: "General", lat: -43.5321, lng: 172.6362 },
  { code: "9010", locality: "Dunedin Central", state: "Otago", stateFull: "Otago Region", country: "nz", type: "General", lat: -45.8788, lng: 170.5028 }
];

export const australiaStates = [
  { abbr: "NSW", name: "New South Wales", count: "3,825" },
  { abbr: "VIC", name: "Victoria", count: "2,641" },
  { abbr: "QLD", name: "Queensland", count: "2,382" },
  { abbr: "WA", name: "Western Australia", count: "1,450" },
  { abbr: "SA", name: "South Australia", count: "832" },
  { abbr: "TAS", name: "Tasmania", count: "421" },
  { abbr: "ACT", name: "Australian Capital Territory", count: "148" },
  { abbr: "NT", name: "Northern Territory", count: "246" }
];

export const nzRegions = [
  { name: "Auckland", island: "North Island", count: "318" },
  { name: "Wellington", island: "North Island", count: "184" },
  { name: "Canterbury", island: "South Island", count: "261" },
  { name: "Waikato", island: "North Island", count: "215" },
  { name: "Bay of Plenty", island: "North Island", count: "142" },
  { name: "Otago", island: "South Island", count: "118" },
  { name: "Northland", island: "North Island", count: "96" },
  { name: "Southland", island: "South Island", count: "74" }
];
