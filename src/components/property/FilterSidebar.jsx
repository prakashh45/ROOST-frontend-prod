import { SlidersHorizontal } from "../icons";

const GROUPS = [
  { title: "Price per night", options: ["Under ₹300", "₹300 – ₹500", "₹500+"] },
  { title: "Facilities", options: ["Air conditioning", "Wi-Fi", "Parking"] },
  { title: "Room policy", options: ["Women only", "Men only", "Co-living"] },
];

export default function FilterSidebar({ filters, onToggle }) {
  return (
    <aside className="card sticky top-20 h-fit p-5">
      <p className="mb-4 flex items-center gap-2 text-sm font-bold text-ink-900">
        <SlidersHorizontal size={15} /> Filter your stay
      </p>
      <div className="flex flex-col gap-5">
        {GROUPS.map(({ title, options }) => (
          <div key={title}>
            <b className="mb-2 block text-xs font-bold uppercase tracking-wide text-ink-500">{title}</b>
            <div className="flex flex-col gap-2">
              {options.map((opt) => (
                <label key={opt} className="flex items-center gap-2 text-sm text-ink-700">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-ink-300 text-brand-500 focus:ring-brand-300"
                    checked={filters?.includes(opt) || false}
                    onChange={() => onToggle?.(opt)}
                  />
                  {opt}
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}
