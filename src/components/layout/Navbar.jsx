import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Menu, X, Bell, LogOut, User, LayoutDashboard } from "../icons";
import NotificationsPanel from "./NotificationsPanel";

export default function Brand({ className = "" }) {
  return (
    <Link to="/" className={`inline-flex items-center gap-1.5 text-lg font-extrabold tracking-tight text-ink-900 ${className}`}>
      <span className="grid h-7 w-7 place-items-center rounded-lg bg-brand-500 text-white">⌂</span>
      ROOST
    </Link>
  );
}

export function Navbar() {
  const { user, logout } = useAuth();
  const nav = useNavigate();
  const [open, setOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  const dashboardPath = user?.role === "OWNER" ? "/owner" : user?.role === "ADMIN" ? "/admin" : "/my-bookings";

  return (
    <nav className="sticky top-0 z-40 border-b border-ink-100 bg-white/90 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between">
        <Brand />
        <div className="hidden items-center gap-7 text-sm font-semibold text-ink-600 md:flex">
          <Link to="/properties" className="hover:text-brand-600">Find a bed</Link>
          <Link to="/about" className="hover:text-brand-600">About</Link>
          <Link to="/pricing" className="hover:text-brand-600">Pricing</Link>
          <Link to="/contact" className="hover:text-brand-600">Contact</Link>
        </div>

        <div className="flex items-center gap-2">
          {user ? (
            <>
              <div className="relative">
                <button
                  onClick={() => setNotifOpen((v) => !v)}
                  className="relative grid h-9 w-9 place-items-center rounded-full text-ink-500 hover:bg-ink-100"
                  aria-label="Notifications"
                >
                  <Bell size={18} />
                </button>
                {notifOpen && <NotificationsPanel onClose={() => setNotifOpen(false)} />}
              </div>
              <Link to={dashboardPath} className="btn-outline btn-sm hidden sm:inline-flex">
                <LayoutDashboard size={14} /> Console
              </Link>
              <button
                onClick={() => { logout(); nav("/"); }}
                className="grid h-9 w-9 place-items-center rounded-full bg-ink-900 text-xs font-bold text-white"
                title="Log out"
              >
                {user.name ? user.name.slice(0, 1).toUpperCase() : <User size={15} />}
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn-outline btn-sm">Sign in</Link>
              <Link to="/register" className="btn-primary btn-sm hidden sm:inline-flex">Get started</Link>
            </>
          )}
          <button className="grid h-9 w-9 place-items-center rounded-lg text-ink-600 hover:bg-ink-100 md:hidden" onClick={() => setOpen((v) => !v)}>
            {open ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-ink-100 bg-white px-4 py-3 md:hidden">
          <div className="flex flex-col gap-2 text-sm font-semibold text-ink-700">
            <Link to="/properties" onClick={() => setOpen(false)}>Find a bed</Link>
            <Link to="/about" onClick={() => setOpen(false)}>About</Link>
            <Link to="/pricing" onClick={() => setOpen(false)}>Pricing</Link>
            <Link to="/contact" onClick={() => setOpen(false)}>Contact</Link>
            {user && <Link to={dashboardPath} onClick={() => setOpen(false)}>Console</Link>}
          </div>
        </div>
      )}
    </nav>
  );
}
