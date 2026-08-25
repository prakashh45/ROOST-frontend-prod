import DashboardLayout from "../../components/layout/DashboardLayout";
import ManageTable from "../../components/owner/ManageTable";
import { adminNav } from "./nav";

const demoGuests = [
  { id: "u1", name: "Rahul Sharma", email: "rahul@example.com", bookings: "3", status: "ACTIVE" },
  { id: "u2", name: "Sneha Kulkarni", email: "sneha@example.com", bookings: "1", status: "ACTIVE" },
  { id: "u3", name: "Amit Patil", email: "amit@example.com", bookings: "5", status: "ACTIVE" },
];

export default function AdminGuests() {
  const rows = demoGuests.map((g) => ({ id: g.id, cols: [g.name, g.email, g.bookings, g.status] }));
  return (
    <DashboardLayout nav={adminNav} title="Guests">
      <ManageTable
        title="Registered guests" subtitle="Demo data — guest directory endpoint isn't wired up yet."
        headers={["Name", "Email", "Bookings", "Status"]}
        rows={rows} loading={false} error="" statusColumnIndex={3}
        emptyTitle="No guests yet"
      />
    </DashboardLayout>
  );
}
