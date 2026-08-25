import StaticPage from "./StaticPage";
import { Check } from "../../components/icons";

const PLANS = [
  { name: "Guest", price: "Free", copy: "Search, book and manage stays.", features: ["Unlimited searches", "Instant booking", "Chat with hosts", "Favorites & notifications"] },
  { name: "Owner", price: "₹0 to list", copy: "Manage properties, rooms and bookings.", features: ["Property & bed management", "Booking dashboard", "QR access codes", "Analytics (demo)"], highlight: true },
  { name: "Enterprise", price: "Talk to us", copy: "Multi-property operators and networks.", features: ["Admin console", "Compliance tracking", "Priority support", "Custom integrations"] },
];

export default function Pricing() {
  return (
    <StaticPage eyebrow="PRICING" title="Simple pricing for every kind of host.">
      <div className="grid gap-5 sm:grid-cols-3">
        {PLANS.map((p) => (
          <article key={p.name} className={`card p-6 ${p.highlight ? "ring-2 ring-brand-400" : ""}`}>
            <b className="text-sm text-ink-500">{p.name}</b>
            <h3 className="mt-1 text-2xl font-extrabold text-ink-900">{p.price}</h3>
            <p className="mt-1 text-xs text-ink-500">{p.copy}</p>
            <ul className="mt-4 space-y-2">
              {p.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-xs text-ink-600"><Check size={13} className="text-emerald-500" /> {f}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </StaticPage>
  );
}
