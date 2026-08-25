import { Link } from "react-router-dom";

export function Footer() {
  return (
    <>
      <div className="border-t border-ink-100 bg-white py-8">
        <div className="container-page">
          <p className="text-center text-[11px] font-bold uppercase tracking-widest text-ink-400">
            Trusted by modern shared-living communities
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-ink-300">
            {["nook", "HABITAT", "STAYWELL", "commonroom", "HOSTELO"].map((b) => (
              <span key={b} className="text-lg font-extrabold tracking-tight">{b}</span>
            ))}
          </div>
        </div>
      </div>
      <footer className="border-t border-ink-100 bg-white py-6">
        <div className="container-page flex flex-col items-center justify-between gap-3 text-sm text-ink-500 sm:flex-row">
          <span>© 2026 ROOST. Better stays, together.</span>
          <span className="flex gap-4">
            <Link to="/privacy" className="hover:text-brand-600">Privacy</Link>
            <Link to="/terms" className="hover:text-brand-600">Terms</Link>
            <Link to="/contact" className="hover:text-brand-600">Help center</Link>
          </span>
        </div>
      </footer>
    </>
  );
}
