import { CheckCircle2, AlertTriangle, X, Sparkles } from "../icons";
import { useAppState } from "../../context/AppStateContext";

const ICONS = { success: CheckCircle2, error: AlertTriangle, info: Sparkles };
const STYLES = {
  success: "border-emerald-200 bg-emerald-50 text-emerald-800",
  error: "border-rose-200 bg-rose-50 text-rose-800",
  info: "border-brand-200 bg-brand-50 text-brand-800",
};

export default function Toasts() {
  const { toasts, dismissToast } = useAppState();
  if (!toasts.length) return null;
  return (
    <div className="fixed bottom-5 right-5 z-[60] flex w-[calc(100%-2.5rem)] max-w-sm flex-col gap-2">
      {toasts.map((t) => {
        const Icon = ICONS[t.type] || Sparkles;
        return (
          <div key={t.id} className={`flex items-start gap-2.5 rounded-xl border px-4 py-3 shadow-pop animate-fadeIn ${STYLES[t.type] || STYLES.info}`}>
            <Icon size={17} className="mt-0.5 shrink-0" />
            <div className="flex-1 text-sm">
              {t.title && <p className="font-semibold">{t.title}</p>}
              {t.message && <p className="text-[13px] opacity-90">{t.message}</p>}
            </div>
            <button onClick={() => dismissToast(t.id)} className="opacity-60 hover:opacity-100">
              <X size={14} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
