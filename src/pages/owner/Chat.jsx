import { useEffect, useRef, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { useApi } from "../../hooks/useApi";
import { chatApi } from "../../api/services";
import { demoConversations } from "../../data/demo/properties";
import { ownerNav } from "./nav";
import { Send, Plus } from "../../components/icons";

const cls = (...v) => v.filter(Boolean).join(" ");

export default function Chat() {
  const { data: conversations, setData } = useApi(() => chatApi.conversations(), demoConversations, {
    transform: (d) => (Array.isArray(d) && d.length ? d : demoConversations),
  });
  const [activeId, setActiveId] = useState(demoConversations[0].id);
  const [text, setText] = useState("");
  const bottomRef = useRef(null);

  const active = conversations.find((c) => c.id === activeId) || conversations[0];

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [active?.messages?.length, activeId]);

  const send = () => {
    if (!text.trim()) return;
    setData((prev) => prev.map((c) => (c.id === activeId ? { ...c, messages: [...c.messages, { from: "me", text, time: "Now" }] } : c)));
    setText("");
    // Chat isn't backed by a live socket yet — simulate a guest reply so the
    // demo feels alive.
    setTimeout(() => {
      setData((prev) => prev.map((c) => (c.id === activeId ? { ...c, messages: [...c.messages, { from: "them", text: "Got it, thank you!", time: "Now" }] } : c)));
    }, 900);
  };

  return (
    <DashboardLayout nav={ownerNav} title="Chat">
      <div className="grid h-[calc(100vh-9rem)] overflow-hidden rounded-2xl border border-ink-100 bg-white shadow-card md:grid-cols-[280px_1fr]">
        <aside className="hidden flex-col overflow-y-auto border-r border-ink-100 md:flex">
          <div className="flex items-center justify-between border-b border-ink-100 p-4">
            <b className="text-sm text-ink-900">Conversations</b>
            <button className="text-ink-400 hover:text-brand-600"><Plus size={16} /></button>
          </div>
          {conversations.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveId(c.id)}
              className={cls("flex items-center gap-3 border-b border-ink-50 p-4 text-left hover:bg-ink-50", activeId === c.id && "bg-brand-50")}
            >
              <span className="relative grid h-9 w-9 shrink-0 place-items-center rounded-full bg-ink-900 text-xs font-bold text-white">
                {c.name[0]}
                {c.online && <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-emerald-500" />}
              </span>
              <span className="min-w-0">
                <b className="block truncate text-sm text-ink-900">{c.name}</b>
                <small className="block truncate text-xs text-ink-500">{c.topic}</small>
              </span>
            </button>
          ))}
        </aside>

        <article className="flex flex-col">
          <header className="flex items-center justify-between border-b border-ink-100 p-4">
            <div>
              <b className="text-sm text-ink-900">{active?.name}</b>
              <p className="text-xs text-ink-500">{active?.online ? "● Online" : "Offline"} · {active?.bookingCode}</p>
            </div>
            <span className="rounded-full bg-ink-100 px-2.5 py-1 text-[11px] font-semibold text-ink-600">{active?.propertyTag}</span>
          </header>
          <div className="flex-1 space-y-3 overflow-y-auto p-4 scrollbar-thin">
            {active?.messages.map((m, i) => (
              <p key={i} className={cls("max-w-[75%] rounded-2xl px-3.5 py-2.5 text-sm", m.from === "me" ? "ml-auto rounded-br-sm bg-brand-500 text-white" : "rounded-bl-sm bg-ink-100 text-ink-800")}>
                {m.text}
                <small className={cls("mt-1 block text-[10px]", m.from === "me" ? "text-brand-100" : "text-ink-400")}>{m.time}</small>
              </p>
            ))}
            <div ref={bottomRef} />
          </div>
          <div className="flex items-center gap-2 border-t border-ink-100 p-3">
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Type a message…"
              className="input"
            />
            <button onClick={send} className="btn-primary shrink-0"><Send size={15} /></button>
          </div>
        </article>
      </div>
    </DashboardLayout>
  );
}
