import { useRef, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import Button from "../../components/ui/Button";
import { useAppState } from "../../context/AppStateContext";
import { demoProperties } from "../../data/demo/properties";
import { ownerNav } from "./nav";
import { QrCode, Copy, Download } from "../../components/icons";

const TYPES = ["Property", "Room", "Bed", "Booking"];

export default function QRGenerator() {
  const { pushToast } = useAppState();
  const [type, setType] = useState("Property");
  const [target, setTarget] = useState("Roost Hostel");
  const [generated, setGenerated] = useState(false);
  const qrRef = useRef(null);

  const value = type === "Booking"
    ? `https://roost.example/booking/${target || "ROOST-1001"}`
    : `https://roost.example/${type.toLowerCase()}/${(target || "roost-hostel").toLowerCase().replace(/\s+/g, "-")}`;

  const download = () => {
    const canvas = qrRef.current?.querySelector("canvas");
    if (!canvas) return;
    const a = document.createElement("a");
    a.href = canvas.toDataURL("image/png");
    a.download = `roost-${type.toLowerCase()}-qr.png`;
    a.click();
    pushToast({ type: "success", title: "QR downloaded", message: a.download });
  };

  const copy = () => {
    navigator.clipboard.writeText(value);
    pushToast({ type: "info", title: "Link copied" });
  };

  return (
    <DashboardLayout nav={ownerNav} title="QR generator">
      <div className="mb-6">
        <h1 className="text-xl font-extrabold text-ink-900">Generate a QR code</h1>
        <p className="mt-1 text-sm text-ink-500">Create easy access points for your property, room, bed or booking.</p>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1.2fr_1fr]">
        <article className="card p-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="field">
              <span className="label">QR type</span>
              <select className="input" value={type} onChange={(e) => { setType(e.target.value); setGenerated(false); }}>
                {TYPES.map((t) => <option key={t}>{t}</option>)}
              </select>
            </label>
            <label className="field">
              <span className="label">Select property</span>
              <select className="input" onChange={(e) => setTarget(e.target.value)}>
                {demoProperties.map((p) => <option key={p.id}>{p.name}</option>)}
              </select>
            </label>
            <label className="field sm:col-span-2">
              <span className="label">{type === "Booking" ? "Booking code" : `Select ${type.toLowerCase()}`}</span>
              <input className="input" defaultValue={type === "Booking" ? "ROOST-1001" : "Room 101"} onChange={(e) => setTarget(e.target.value)} />
            </label>
          </div>
          <div className="mt-5 flex justify-end">
            <Button variant="teal" onClick={() => setGenerated(true)}>Generate QR</Button>
          </div>
        </article>

        <article className="card flex flex-col items-center gap-4 p-6 text-center">
          <div ref={qrRef} className="grid h-48 w-48 place-items-center rounded-2xl border border-dashed border-ink-200 bg-ink-50">
            {generated ? <QRCodeCanvas value={value} size={170} includeMargin /> : <QrCode size={56} className="text-ink-300" />}
          </div>
          <p className="max-w-[220px] break-all text-xs text-ink-500">
            {generated ? value : "Set your options, then generate a scannable code."}
          </p>
          {generated && (
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={copy}><Copy size={13} /> Copy link</Button>
              <Button size="sm" onClick={download}><Download size={13} /> Download PNG</Button>
            </div>
          )}
        </article>
      </div>
    </DashboardLayout>
  );
}
