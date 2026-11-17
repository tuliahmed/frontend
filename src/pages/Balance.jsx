import { useState } from "react";
import Icon from "../components/Icon.jsx";
import { Card, Segmented } from "../components/ui.jsx";
import { balance, creditHistory } from "../data/mock.js";
import CreditModal from "../modals/CreditModal.jsx";

export default function Balance() {
  const [credit, setCredit] = useState(null);
  const [filter, setFilter] = useState("all");
  const rows = creditHistory.filter((h) => filter === "all" || (filter === "added" ? h.amount > 0 : h.amount < 0));

  return (
    <div className="space-y-4">
      <Card>
        <div className="flex flex-col gap-6 p-5 sm:p-6 md:flex-row md:items-center">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-red-600 text-white shadow-lg shadow-red-600/30">
              <Icon name="wallet" className="h-7 w-7" />
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">Available credit</div>
              <div className="text-4xl font-bold tracking-tight">৳{balance.amount}<span className="text-xl text-slate-300">.00</span></div>
              <div className="text-xs text-slate-400 dark:text-slate-500">Updated {balance.updated}</div>
            </div>
          </div>
          <div className="md:ml-auto md:w-[420px]">
            <div className="mb-2 text-xs font-semibold text-slate-600 dark:text-slate-400">Quick top-up</div>
            <div className="flex gap-2">
              {[50, 100, 500].map((a) => (
                <button key={a} onClick={() => setCredit(a)} className="flex-1 rounded-lg border border-slate-200 dark:border-slate-800 py-2 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:border-red-300 hover:bg-red-50 dark:hover:bg-red-500/10 hover:text-red-600">
                  +৳{a}
                </button>
              ))}
              <button onClick={() => setCredit(500)} className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 dark:bg-slate-800 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800">
                <Icon name="plus" className="h-4 w-4" />
                Custom
              </button>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 divide-y divide-slate-100 dark:divide-slate-800 border-t border-slate-100 dark:border-slate-800 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {[
            ["arrowDown", "Added this month", `৳${balance.addedThisMonth.toLocaleString()}`, "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10"],
            ["arrowUp", "Spent this month", `৳${balance.spentThisMonth.toLocaleString()}`, "text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-500/10"],
            ["calendar", "Next renewal", "bone · 22 Oct", "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10"],
          ].map(([icon, label, value, tone]) => (
            <div key={label} className="flex items-center gap-3 px-6 py-4">
              <span className={`flex h-9 w-9 items-center justify-center rounded-full ${tone}`}><Icon name={icon} className="h-4 w-4" /></span>
              <div>
                <div className="text-xs text-slate-500 dark:text-slate-400">{label}</div>
                <div className="text-sm font-bold">{value}</div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-amber-200 dark:border-amber-500/30 bg-amber-50 dark:bg-amber-500/10 px-5 py-3">
        <span className="text-sm text-amber-800 dark:text-amber-300">Your balance covers about <span className="font-semibold text-slate-900 dark:text-white">2 more monthly renewals</span>. Top up to avoid routers expiring.</span>
        <button onClick={() => setCredit(500)} className="ml-auto inline-flex items-center gap-1 text-sm font-semibold text-amber-900 hover:underline">
          Add credit <Icon name="arrow" className="h-3.5 w-3.5" />
        </button>
      </div>

      <Card>
        <div className="flex flex-wrap items-center gap-3 border-b border-slate-100 dark:border-slate-800 px-5 py-3">
          <h2 className="font-semibold text-slate-900 dark:text-white">Credit history</h2>
          <div className="ml-auto">
            <Segmented value={filter} onChange={setFilter} options={[{ value: "all", label: "All" }, { value: "added", label: "Added" }, { value: "spent", label: "Spent" }]} />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full whitespace-nowrap text-sm">
            <thead>
              <tr className="text-left text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                <th className="px-5 py-2.5">Date</th>
                <th className="px-3 py-2.5">Description</th>
                <th className="px-3 py-2.5 text-right">Amount</th>
                <th className="px-5 py-2.5 text-right">Balance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {rows.map((h) => {
                const added = h.amount > 0;
                return (
                  <tr key={h.ref + h.date} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/60">
                    <td className="px-5 py-3">
                      <div className="font-medium">{h.date}</div>
                      <div className="text-[11px] text-slate-400 dark:text-slate-500">{h.time}</div>
                    </td>
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-2.5">
                        <span className={`h-2 w-2 shrink-0 rounded-full ${added ? "bg-emerald-500" : "bg-rose-500"}`} />
                        <div>
                          <div className="font-medium">{h.desc}</div>
                          <div className="font-mono text-[11px] text-slate-400 dark:text-slate-500">{h.ref}</div>
                        </div>
                      </div>
                    </td>
                    <td className={`px-3 py-3 text-right font-semibold ${added ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}>{added ? "+" : "−"}৳{Math.abs(h.amount).toLocaleString()}</td>
                    <td className="px-5 py-3 text-right font-mono text-slate-600 dark:text-slate-400">৳{h.balance.toLocaleString()}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {credit != null && <CreditModal open onClose={() => setCredit(null)} initial={credit} />}
    </div>
  );
}
