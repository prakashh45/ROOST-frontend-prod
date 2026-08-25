import { LayoutDashboard, Building2, BedDouble, CalendarDays, MessageCircle, QrCode } from "../../components/icons";

export const ownerNav = [
  { label: "Overview", to: "/owner", icon: LayoutDashboard },
  { label: "Properties", to: "/owner/properties", icon: Building2 },
  { label: "Rooms & beds", to: "/owner/rooms", icon: BedDouble },
  { label: "Bookings", to: "/owner/bookings", icon: CalendarDays },
  { label: "Chat", to: "/owner/chat", icon: MessageCircle },
  { label: "QR generator", to: "/owner/qr-generator", icon: QrCode },
];
