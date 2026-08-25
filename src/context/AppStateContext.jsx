import { createContext, useContext, useEffect, useMemo, useState, useCallback } from "react";
import { demoNotifications } from "../data/demo/properties";

const AppStateContext = createContext(null);

/**
 * Small app-wide UI state: favorites, notifications and toasts. Kept in one
 * provider so any screen can read/update them without prop-drilling.
 */
export function AppStateProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("roost_favorites") || "[]");
    } catch {
      return [];
    }
  });
  const [notifications, setNotifications] = useState(demoNotifications);
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    localStorage.setItem("roost_favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = useCallback((slug) => {
    setFavorites((prev) => (prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]));
  }, []);

  const markNotificationRead = useCallback((id) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, unread: false } : n)));
  }, []);

  const markAllRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  }, []);

  const pushToast = useCallback((toast) => {
    const id = Math.random().toString(36).slice(2);
    setToasts((prev) => [...prev, { id, type: "info", ...toast }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3800);
  }, []);

  const dismissToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const unreadCount = notifications.filter((n) => n.unread).length;

  const value = useMemo(
    () => ({ favorites, toggleFavorite, notifications, unreadCount, markNotificationRead, markAllRead, toasts, pushToast, dismissToast }),
    [favorites, notifications, unreadCount, toasts, toggleFavorite, markNotificationRead, markAllRead, pushToast, dismissToast]
  );

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}

export const useAppState = () => useContext(AppStateContext);
