import { useMemo } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import ManageTable from "../../components/owner/ManageTable";
import { useApi } from "../../hooks/useApi";
import { bookingApi } from "../../api/services";
import { demoBookings } from "../../data/demo/properties";
import { adminNav } from "./nav";

export default function AdminBookings() {
  const { data: bookings, loading, error } = useApi(
    () => bookingApi.list(),
    demoBookings,
    { transform: (d) => (Array.isArray(d) ? d : d.bookings || demoBookings) }
  );

  const rows = useMemo(() => bookings.map((b) => ({
    id: b.code, cols: [b.code, b.guest, b.property, b.dates, b.status], raw: b,
  })), [bookings]);

  return (
    <DashboardLayout nav={adminNav} title="Bookings">
      <ManageTable
        title="All bookings" subtitle="Platform-wide booking activity."
        headers={["Booking", "Guest", "Property", "Stay", "Status"]}
        rows={rows} loading={loading} error={error} statusColumnIndex={4}
        emptyTitle="No bookings on the network yet"
      />
    </DashboardLayout>
  );
}
