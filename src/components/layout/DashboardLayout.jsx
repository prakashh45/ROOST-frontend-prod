import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useAppState } from "../../context/AppStateContext";
import Brand from "./Navbar";
import NotificationsPanel from "./NotificationsPanel";
import { Bell, Menu, X, LogOut } from "../icons";

export default function DashboardLayout({ nav, title, children }) {
  const { pathname } = useLocation();
  const { user, logout } = useAuth();
  const { unreadCount } = useAppState();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  const active = nav.find((item) => item.to === pathname)?.label || title;

  return (
    <div className="min-h-screen bg-[#faf8f5] md:grid md:grid-cols-[240px_1fr]">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 transform border-r border-ink-100 bg-white p-5 transition-transform md:static md:w-auto md:translate-x-0 ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="mb-8 flex items-center justify-between">
          <Brand />
          <button className="md:hidden text-ink-400" onClick={() => setMobileOpen(false)}><X size={18} /></button>
        </div>
        <p className="mb-2 px-2 text-[11px] font-bold uppercase tracking-widest text-ink-400">Workspace</p>
        <nav className="mb-6 flex flex-col gap-1">
          {nav.map(({ label, to, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-semibold transition ${
                pathname === to ? "bg-brand-50 text-brand-700" : "text-ink-600 hover:bg-ink-100"
              }`}
            >
              <Icon size={17} /> {label}
            </Link>
          ))}
        </nav>
        <p className="mb-2 px-2 text-[11px] font-bold uppercase tracking-widest text-ink-400">Account</p>
        <button onClick={() => { logout(); navigate("/"); }} className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-semibold text-ink-600 hover:bg-ink-100">
          <LogOut size={16} /> Log out
        </button>
      </aside>

      {mobileOpen && <div className="fixed inset-0 z-30 bg-ink-900/30 md:hidden" onClick={() => setMobileOpen(false)} />}

      {/* Main */}
      <main className="min-w-0">
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-ink-100 bg-white/90 px-5 backdrop-blur">
          <div className="flex items-center gap-3">
            <button className="text-ink-500 md:hidden" onClick={() => setMobileOpen(true)}><Menu size={20} /></button>
            <b className="text-base font-bold text-ink-900">{active}</b>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <button onClick={() => setNotifOpen((v) => !v)} className="relative grid h-9 w-9 place-items-center rounded-full text-ink-500 hover:bg-ink-100">
                <Bell size={18} />
                {unreadCount > 0 && <span className="absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-rose-500 px-1 text-[10px] font-bold text-white">{unreadCount}</span>}
              </button>
              {notifOpen && <NotificationsPanel onClose={() => setNotifOpen(false)} />}
            </div>
            <span className="grid h-9 w-9 place-items-center rounded-full bg-ink-900 text-xs font-bold text-white">
              {user?.name ? user.name.slice(0, 2).toUpperCase() : "U"}
            </span>
          </div>
        </header>
        <div className="p-5 md:p-8">{children}</div>
      </main>
    </div>
  );
}
