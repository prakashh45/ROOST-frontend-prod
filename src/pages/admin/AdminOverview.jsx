import DashboardLayout from "../../components/layout/DashboardLayout";
import ApiNotice from "../../components/ui/ApiNotice";
import { useApi } from "../../hooks/useApi";
import { analyticsApi } from "../../api/services";
import { demoAnalytics } from "../../data/demo/properties";
import { adminNav } from "./nav";
import { TrendingUp } from "../../components/icons";

export default function AdminOverview() {
  const { data, error } = useApi(() => analyticsApi.adminSummary(), demoAnalytics.admin, {});

  return (
    <DashboardLayout nav={adminNav} title="Overview">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-extrabold text-ink-900">ROOST network</h1>
          <p className="mt-1 text-sm text-ink-500">Network-wide data across every property on the platform.</p>
        </div>
        <span className="rounded-full bg-ink-100 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-ink-500">Demo data</span>
      </div>

      <ApiNotice message={error} />

      <div className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {data.stats.map((s) => (
          <article key={s.label} className="card p-4">
            <small className="text-xs font-semibold text-ink-500">{s.label}</small>
            <b className="mt-1 block text-2xl font-extrabold text-ink-900">{s.value}</b>
          </article>
        ))}
      </div>

      <article className="card p-5">
        <h3 className="mb-4 flex items-center gap-2 text-sm font-bold text-ink-900"><TrendingUp size={15} className="text-brand-500" /> Platform growth (bookings / month)</h3>
        <div className="flex h-44 items-end gap-2">
          {data.growth.map((n, i) => (
            <div key={i} className="flex flex-1 flex-col items-center gap-1.5">
              <div className="w-full rounded-t-md bg-gradient-to-t from-emerald-500 to-emerald-300" style={{ height: `${n}%` }} />
              <span className="text-[10px] font-semibold text-ink-400">{data.growthLabels?.[i]}</span>
            </div>
          ))}
        </div>
      </article>
    </DashboardLayout>
  );
}
