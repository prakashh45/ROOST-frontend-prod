export default function BookingTicket({ draft, nights, code }) {
  const property = draft?.property;
  const bed = draft?.bed;
  const total = bed ? (bed.price || bed.effectivePrice || 300) * nights : 2100;

  const rows = [
    ["Booking code", code || "ROOST-1004"],
    ["Property", property?.name || "Roost Hostel"],
    ["Room & bed", `${bed?.room || "Room 101"} · ${bed?.id || "101-A"}`],
    ["Check-in", draft?.checkIn || "03 Sep 2026"],
    ["Check-out", draft?.checkOut || "10 Sep 2026"],
    ["Total paid", `₹${total}`],
  ];

  return (
    <div className="mb-6 divide-y divide-dashed divide-ink-200 rounded-xl border border-ink-100 bg-white px-4">
      {rows.map(([label, value]) => (
        <div key={label} className="flex items-center justify-between py-2.5 text-sm">
          <span className="text-ink-500">{label}</span>
          <b className="text-ink-900">{value}</b>
        </div>
      ))}
    </div>
  );
}
