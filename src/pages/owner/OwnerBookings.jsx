import { useMemo } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import ManageTable from "../../components/owner/ManageTable";
import { useApi } from "../../hooks/useApi";
import { useAppState } from "../../context/AppStateContext";
import { bookingApi } from "../../api/services";
import { demoBookings } from "../../data/demo/properties";
import { ownerNav } from "./nav";

export default function OwnerBookings() {
  const { pushToast } = useAppState();
  const { data: bookings, loading, error, setData } = useApi(
    () => bookingApi.ownerList(),
    demoBookings,
    { transform: (d) => (Array.isArray(d) ? d : d.bookings || demoBookings) }
  );

  const rows = useMemo(() => bookings.map((b) => ({
    id: b.code, cols: [b.code, b.guest, b.property, b.dates, b.status], raw: b,
  })), [bookings]);

  const confirm = (row) => {
    setData((prev) => prev.map((b) => (b.code === row.raw.code ? { ...b, status: "CONFIRMED" } : b)));
    pushToast({ type: "success", title: "Booking confirmed", message: row.raw.code });
  };

  return (
    <DashboardLayout nav={ownerNav} title="Bookings">
      <ManageTable
        title="All bookings" subtitle="Review, confirm and manage bookings across your properties."
        headers={["Booking", "Guest", "Property", "Stay", "Status"]}
        rows={rows} loading={loading} error={error} statusColumnIndex={4}
        onView={confirm}
        viewLabel="Confirm"
        emptyTitle="No bookings yet"
      />
    </DashboardLayout>
  );
}
