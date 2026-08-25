import { useAppState } from "../../context/AppStateContext";

export default function NotificationsPanel({ onClose }) {
  const { notifications, markNotificationRead, markAllRead } = useAppState();

  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />
      <div className="absolute right-0 top-11 z-50 w-80 rounded-2xl border border-ink-100 bg-white p-2 shadow-pop">
        <div className="flex items-center justify-between px-3 py-2">
          <p className="text-sm font-bold text-ink-900">Notifications</p>
          <button onClick={markAllRead} className="text-xs font-semibold text-brand-600 hover:underline">Mark all read</button>
        </div>
        <div className="max-h-80 overflow-y-auto scrollbar-thin">
          {notifications.map((n) => (
            <button
              key={n.id}
              onClick={() => markNotificationRead(n.id)}
              className={`flex w-full flex-col items-start gap-0.5 rounded-xl px-3 py-2.5 text-left hover:bg-ink-50 ${n.unread ? "bg-brand-50/60" : ""}`}
            >
              <div className="flex w-full items-center gap-2">
                {n.unread && <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />}
                <span className="text-[13px] font-semibold text-ink-900">{n.title}</span>
              </div>
              <span className="text-xs text-ink-500">{n.body}</span>
              <span className="text-[11px] text-ink-400">{n.time}</span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
