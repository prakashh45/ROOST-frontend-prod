import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Navbar } from "../../components/layout/Navbar";
import { Footer } from "../../components/layout/Footer";
import ApiNotice from "../../components/ui/ApiNotice";
import LoadingState from "../../components/ui/LoadingState";
import { useApi } from "../../hooks/useApi";
import { useBooking } from "../../context/BookingContext";
import { propertyApi } from "../../api/services";
import { demoBeds, demoProperties } from "../../data/demo/properties";
import { ChevronRight } from "../../components/icons";

const cls = (...v) => v.filter(Boolean).join(" ");

export default function BedAvailability() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { draft, setBed } = useBooking();
  const [selected, setSelected] = useState(null);

  const property = draft.property || demoProperties.find((p) => p.slug === slug) || demoProperties[0];

  const { data: beds, loading, error } = useApi(
    () => propertyApi.availability(slug, { checkIn: draft.checkIn || "2026-09-03", checkOut: draft.checkOut || "2026-09-10" }),
    demoBeds,
    {
      deps: [slug],
      transform: (d) => {
        const raw = d.rooms?.flatMap((r) => r.beds.map((b) => ({ ...b, roomNumber: r.number || r.name }))) || d.beds || [];
        if (!raw.length) return demoBeds;
        return raw.map((b) => ({
          id: b.code || b.bedCode || b.id,
          room: b.roomNumber || b.room || "Room",
          kind: b.position || b.kind || "BED",
          price: b.effectivePrice || b.price || 300,
          status: (b.status || "AVAILABLE").toUpperCase(),
        }));
      },
    }
  );

  const rooms = useMemo(() => [...new Set(beds.map((b) => b.room))], [beds]);

  const continueBooking = () => {
    setBed(selected);
    navigate(`/booking/guest-details`);
  };

  if (loading) return (<><Navbar /><LoadingState label="Loading bed availability…" /></>);

  return (
    <>
      <Navbar />
      <main className="container-page py-8 pb-28">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold text-ink-400">{property.name} / Availability</p>
            <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-ink-900">Choose your bed</h1>
            <p className="mt-1 text-sm text-ink-500">{draft.checkIn || "03 Sep"} — {draft.checkOut || "10 Sep"} · 1 guest</p>
          </div>
          <div className="flex flex-wrap gap-3 text-xs font-semibold text-ink-500">
            <Legend color="bg-emerald-500" label="Available" />
            <Legend color="bg-rose-400" label="Booked" />
            <Legend color="bg-ink-300" label="Maintenance" />
          </div>
        </div>

        <ApiNotice message={error} />

        {rooms.map((room) => (
          <article key={room} className="card mb-5 p-5">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-ink-900">{room}</h2>
                <p className="text-xs text-ink-500">Co-living · Air conditioned</p>
              </div>
              <span className="rounded-full bg-ink-100 px-2.5 py-1 text-xs font-semibold text-ink-600">
                {beds.filter((b) => b.room === room).length} beds
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
              {beds.filter((b) => b.room === room).map((b) => (
                <button
                  key={b.id}
                  disabled={b.status !== "AVAILABLE"}
                  onClick={() => setSelected(b)}
                  className={cls(
                    "rounded-xl border p-3 text-left transition disabled:cursor-not-allowed disabled:opacity-60",
                    b.status === "AVAILABLE" && "border-emerald-200 bg-emerald-50 hover:border-emerald-400",
                    b.status === "BOOKED" && "border-rose-100 bg-rose-50",
                    b.status === "MAINTENANCE" && "border-ink-200 bg-ink-100",
                    selected?.id === b.id && "ring-2 ring-brand-500"
                  )}
                >
                  <b className="block text-sm text-ink-900">{b.id}</b>
                  <small className="block text-[11px] text-ink-500">{b.kind}</small>
                  <strong className="mt-1 block text-xs font-bold text-ink-800">
                    {b.status === "AVAILABLE" ? `₹${b.price}/night` : b.status}
                  </strong>
                </button>
              ))}
            </div>
          </article>
        ))}
      </main>

      {selected && (
        <div className="fixed inset-x-0 bottom-0 z-30 border-t border-ink-100 bg-white/95 backdrop-blur">
          <div className="container-page flex items-center justify-between gap-4 py-3.5">
            <span className="text-sm"><b>Bed {selected.id}</b> selected · 7 nights</span>
            <button onClick={continueBooking} className="btn-primary">Continue <ChevronRight size={16} /></button>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}

function Legend({ color, label }) {
  return (
    <span className="flex items-center gap-1.5">
      <span className={`h-2.5 w-2.5 rounded-full ${color}`} /> {label}
    </span>
  );
}
