import { Link, useParams } from "react-router-dom";
import Icon from "../components/Icon.jsx";
import { Card, StatusBadge, Avatar } from "../components/ui.jsx";
import { tickets, ticketMessages, routers } from "../data/mock.js";

export default function TicketConversation() {
  const { id } = useParams();
  const t = tickets.find((x) => String(x.id) === id) ?? tickets[0];
  const router = routers.find((r) => r.id === t.router);

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <Link to="/support" className="inline-flex items-center gap-1 rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 py-1.5 text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60">
          <Icon name="left" className="h-4 w-4" />
          All tickets
        </Link>
        <div className="order-last flex w-full min-w-0 flex-wrap items-center gap-2 sm:order-none sm:w-auto sm:flex-1">
          <h1 className="text-lg font-bold tracking-tight sm:truncate">{t.subject}</h1>
          <StatusBadge status={t.status} />
        </div>
        <button className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-slate-900 dark:bg-slate-800 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 sm:ml-0">
          <Icon name="check" className="h-3.5 w-3.5" />
          Mark solved
        </button>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_300px]">
        {/* Chat: fixed height, messages scroll, typing bar pinned */}
        <Card className="flex h-[calc(100vh-11rem)] min-h-[460px] flex-col overflow-hidden">
          <div className="min-h-0 flex-1 space-y-5 overflow-y-auto bg-slate-50/60 dark:bg-slate-800/40 px-4 py-5 sm:px-6">
            <div className="flex items-center gap-3 text-[11px] font-medium text-slate-400 dark:text-slate-500">
              <span className="h-px flex-1 bg-slate-200 dark:bg-slate-700" />Today<span className="h-px flex-1 bg-slate-200 dark:bg-slate-700" />
            </div>
            {ticketMessages.map((m, i) => {
              if (m.from === "system")
                return (
                  <div key={i} className="flex justify-center">
                    <span className="rounded-full bg-slate-100 dark:bg-slate-800 px-3 py-1 text-[11px] font-medium text-slate-500 dark:text-slate-400">{m.text}</span>
                  </div>
                );
              const mine = m.from === "me";
              return (
                <div key={i} className={`flex gap-3 ${mine ? "flex-row-reverse" : ""}`}>
                  <Avatar initials={mine ? "EH" : "RK"} dark={!mine} className="h-8 w-8 text-[11px]" />
                  <div className={`flex max-w-[80%] flex-col ${mine ? "items-end" : ""}`}>
                    <div className="mb-1 flex items-center gap-1.5 text-[11px] text-slate-400 dark:text-slate-500">
                      <span className="font-semibold text-slate-600 dark:text-slate-400">{m.name}</span>
                      {!mine && <span className="rounded bg-slate-900 dark:bg-slate-800 px-1 text-[9px] font-bold uppercase text-white">Staff</span>}· {m.time}
                    </div>
                    <div className={`rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${mine ? "rounded-tr-md bg-red-600 text-white" : "rounded-tl-md border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 shadow-sm"}`}>
                      {m.text}
                    </div>
                    {m.file && (
                      <div className="mt-2 flex items-center gap-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-2 pr-3 shadow-sm">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400"><Icon name="image" className="h-4 w-4" /></div>
                        <div>
                          <div className="text-xs font-semibold">{m.file.name}</div>
                          <div className="text-[11px] text-slate-400 dark:text-slate-500">{m.file.size}</div>
                        </div>
                        <button className="ml-2 rounded-md p-1.5 text-slate-400 dark:text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-700 dark:hover:text-slate-200"><Icon name="download" className="h-3.5 w-3.5" /></button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
            <div className="flex items-center gap-2 pl-11 text-[11px] text-slate-400 dark:text-slate-500">
              <span className="flex gap-0.5">
                {[0, 150, 300].map((d) => <span key={d} className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400" style={{ animationDelay: `${d}ms` }} />)}
              </span>
              Rakib is typing…
            </div>
          </div>

          <div className="shrink-0 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-3">
            <div className="flex items-end gap-2">
              <button title="Attach file" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-800">
                <Icon name="clip" className="h-5 w-5" />
              </button>
              <div className="flex min-w-0 flex-1 items-end rounded-3xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 px-4 py-2.5 focus-within:border-red-400 focus-within:bg-white focus-within:ring-2 focus-within:ring-red-100">
                <textarea rows={1} placeholder="Type a message…" className="max-h-32 w-full resize-none bg-transparent text-sm leading-6 outline-none placeholder:text-slate-400" />
              </div>
              <button title="Send" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-red-600 text-white shadow-md shadow-red-600/30 hover:bg-red-700">
                <Icon name="send" className="h-[18px] w-[18px]" />
              </button>
            </div>
            <p className="mt-1.5 hidden pl-14 text-[11px] text-slate-400 dark:text-slate-500 sm:block">Enter to send · Shift + Enter for a new line</p>
          </div>
        </Card>

        <aside className="space-y-4">
          <Card className="p-4">
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">Details</h3>
            <dl className="space-y-2.5 text-sm">
              {[["Ticket", `#${t.id}`], ["Department", t.department], ["Priority", t.priority], ["Last reply", t.time]].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-3">
                  <dt className="text-slate-500 dark:text-slate-400">{k}</dt>
                  <dd className="text-right font-semibold">{v}</dd>
                </div>
              ))}
            </dl>
          </Card>
          {router && (
            <Card className="p-4">
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">Linked router</h3>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400"><Icon name="router" className="h-5 w-5" /></div>
                <div className="min-w-0">
                  <div className="font-semibold text-slate-900 dark:text-white">{router.name}</div>
                  <div className="truncate font-mono text-xs text-slate-500 dark:text-slate-400">{router.id}</div>
                </div>
                <span className="ml-auto"><StatusBadge status={router.status} /></span>
              </div>
              <div className="mt-3 truncate rounded-lg bg-slate-50 dark:bg-slate-900 px-3 py-2 font-mono text-[11px] text-slate-600 dark:text-slate-400">{router.server}</div>
            </Card>
          )}
          <Card className="p-4">
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">Assigned to</h3>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Avatar initials="RK" dark />
                <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-slate-900" />
              </div>
              <div>
                <div className="text-sm font-semibold">Rakib</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">Support team · Online</div>
              </div>
            </div>
          </Card>
        </aside>
      </div>
    </div>
  );
}
