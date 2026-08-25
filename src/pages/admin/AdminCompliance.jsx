import DashboardLayout from "../../components/layout/DashboardLayout";
import { adminNav } from "./nav";
import { ShieldCheck, Check } from "../../components/icons";

const CHECKS = [
  { label: "Fire safety certification", status: "Verified" },
  { label: "Business registration", status: "Verified" },
  { label: "Owner identity (KYC)", status: "Verified" },
  { label: "Property insurance", status: "Pending review" },
];

export default function AdminCompliance() {
  return (
    <DashboardLayout nav={adminNav} title="Compliance">
      <div className="mb-6">
        <h1 className="flex items-center gap-2 text-xl font-extrabold text-ink-900"><ShieldCheck size={20} className="text-brand-500" /> Compliance overview</h1>
        <p className="mt-1 text-sm text-ink-500">Company and partner-verification information, shown here the moment a service requires sign-in — same as the rest of the console.</p>
      </div>
      <div className="card divide-y divide-ink-50">
        {CHECKS.map((c) => (
          <div key={c.label} className="flex items-center justify-between p-4">
            <span className="text-sm font-medium text-ink-800">{c.label}</span>
            <span className={`flex items-center gap-1.5 text-xs font-bold ${c.status === "Verified" ? "text-emerald-600" : "text-amber-600"}`}>
              {c.status === "Verified" && <Check size={13} />} {c.status}
            </span>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
