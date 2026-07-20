import type { CountryCode } from "@/data/postcodes";

type CountrySwitcherProps = {
  country: CountryCode;
  onChange: (country: CountryCode) => void;
};

export function CountrySwitcher({ country, onChange }: CountrySwitcherProps) {
  return (
    <div className="flex justify-center border-b border-white/10 bg-navy2">
      <button
        type="button"
        onClick={() => onChange("au")}
        className={`border-b-[3px] px-8 py-2.5 text-xs font-bold uppercase tracking-[0.06em] transition focus:outline-none focus:ring-2 focus:ring-coral/50 ${
          country === "au"
            ? "border-coral bg-coralButton text-white"
            : "border-transparent text-ice hover:text-white"
        }`}
        aria-pressed={country === "au"}
      >
        Australia
      </button>
      <button
        type="button"
        onClick={() => onChange("nz")}
        className={`border-b-[3px] px-8 py-2.5 text-xs font-bold uppercase tracking-[0.06em] transition focus:outline-none focus:ring-2 focus:ring-green/50 ${
          country === "nz"
            ? "border-[#4ADE80] bg-green text-white"
            : "border-transparent text-ice hover:text-white"
        }`}
        aria-pressed={country === "nz"}
      >
        New Zealand
      </button>
    </div>
  );
}
