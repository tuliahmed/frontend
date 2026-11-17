import { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "../components/Icon.jsx";
import { Card, Button, SearchInput, Segmented, StatusBadge } from "../components/ui.jsx";
import { tickets } from "../data/mock.js";
import NewTicketModal from "../modals/NewTicketModal.jsx";

const priorityDot = { High: "bg-red-500", Medium: "bg-amber-500", Low: "bg-slate-300" };

export default function SupportTickets() {
  const [filter, setFilter] = useState("All");
  const [newOpen, setNewOpen] = useState(false);
  const rows = tickets.filter((t) => filter === "All" || t.status === filter);
  const count = (s) => tickets.filter((t) => t.status === s).length;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">Support tickets</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">We usually reply within a few hours.</p>
        </div>
        <Button icon="plus" className="rounded-full" onClick={() => setNewOpen(true)}>New ticket</Button>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {[
          ["inbox", "Open", count("Open"), "bg-sky-50 dark:bg-sky-500/10 text-sky-600 dark:text-sky-400"],
          ["clock", "Awaiting you", count("Answered"), "bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400"],
          ["done", "Closed", count("Closed"), "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400"],
        ].map(([icon, label, n, tone]) => (
          <div key={label} className="flex items-center gap-3 rounded-2xl border border-slate-200/70 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 py-3 shadow-sm sm:px-4">
            <div className={`hidden h-9 w-9 shrink-0 items-center justify-center rounded-xl sm:flex ${tone}`}><Icon name={icon} className="h-4 w-4" /></div>
            <div className="min-w-0">
              <div className="truncate text-xs text-slate-500 dark:text-slate-400">{label}</div>
              <div className="text-lg font-bold leading-tight">{n}</div>
            </div>
          </div>
        ))}
      </div>

      <Card>
        <div className="flex flex-wrap items-center gap-3 border-b border-slate-100 dark:border-slate-800 p-3">
          <Segmented value={filter} onChange={setFilter} options={["All", "Open", "Answered", "Closed"].map((v) => ({ value: v, label: v }))} />
          <SearchInput placeholder="Search tickets..." className="w-full sm:ml-auto sm:w-64" />
        </div>
        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {rows.map((t) => (
            <Link key={t.id} to={`/support/${t.id}`} className="flex items-center gap-4 px-4 py-3 transition hover:bg-slate-50 dark:hover:bg-slate-800/60">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 text-[11px] text-slate-400 dark:text-slate-500">
                  <span className="font-mono font-semibold text-slate-500 dark:text-slate-400">#{t.id}</span>
                  <span className={`h-1.5 w-1.5 rounded-full ${priorityDot[t.priority]}`} title={`${t.priority} priority`} />
                  <span>{t.department}</span>
                  <span className="ml-auto sm:hidden">{t.time}</span>
                </div>
                <div className="mt-0.5 flex items-center gap-2">
                  <span className={`truncate text-sm ${t.unread ? "font-bold" : "font-medium text-slate-700 dark:text-slate-300"}`}>{t.subject}</span>
                  {t.unread && <span className="rounded-full bg-red-600 px-1.5 text-[10px] font-bold leading-4 text-white">{t.unread}</span>}
                </div>
                <div className="mt-1 flex items-center gap-2 sm:hidden">
                  <StatusBadge status={t.status} />
                </div>
              </div>
              <span className="hidden font-mono text-[11px] text-slate-400 dark:text-slate-500 md:inline">{t.router}</span>
              <span className="hidden sm:inline"><StatusBadge status={t.status} /></span>
              <span className="hidden w-20 text-right text-xs text-slate-400 dark:text-slate-500 sm:inline">{t.time}</span>
              <Icon name="right" className="h-4 w-4 shrink-0 text-slate-300" />
            </Link>
          ))}
        </div>
      </Card>

      <NewTicketModal open={newOpen} onClose={() => setNewOpen(false)} />
    </div>
  );
}
