import { LayoutDashboard, Building2, CalendarDays, ShieldCheck, Users } from "../../components/icons";

export const adminNav = [
  { label: "Overview", to: "/admin", icon: LayoutDashboard },
  { label: "Properties", to: "/admin/properties", icon: Building2 },
  { label: "Bookings", to: "/admin/bookings", icon: CalendarDays },
  { label: "Guests", to: "/admin/guests", icon: Users },
  { label: "Compliance", to: "/admin/compliance", icon: ShieldCheck },
];
