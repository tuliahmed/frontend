import { useState } from "react";
import Icon from "../components/Icon.jsx";
import { Card, Segmented } from "../components/ui.jsx";
import { pricing } from "../data/mock.js";

export default function Pricing() {
  const [tab, setTab] = useState("remote");
  const current = pricing[tab];

  return (
    <Card>
      <div className="flex flex-col items-center gap-4 border-b border-slate-100 dark:border-slate-800 px-4 py-8 text-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Simple, transparent pricing</h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Choose a plan for your router. Longer plans cost less per month.</p>
        </div>
        <Segmented
          size="md"
          value={tab}
          onChange={setTab}
          options={[{ value: "remote", label: "Remote VPN", icon: "shield" }, { value: "voice", label: "Voice VPN", icon: "phone" }]}
        />
      </div>

      {/* Always 3 in a row; scrolls sideways on narrow phones */}
      <div className="overflow-x-auto">
        <div className="mx-auto grid min-w-[720px] max-w-5xl grid-cols-3 gap-5 p-6 pt-8 sm:p-8">
          {current.plans.map((p) => (
            <div key={p.name} className={`relative flex flex-col rounded-2xl p-6 ${p.featured ? "border-2 border-red-600 bg-red-50/40 shadow-lg shadow-red-600/10" : "border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"}`}>
              {p.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-red-600 px-3 py-1 text-[11px] font-semibold text-white">Most popular</span>
              )}
              <h3 className="text-sm font-semibold">{p.name}</h3>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{p.desc}</p>
              <div className="mt-5 flex items-baseline gap-1">
                <span className="text-4xl font-bold tracking-tight">৳{p.price}</span>
                <span className="text-sm text-slate-500 dark:text-slate-400">/{p.period}</span>
              </div>
              <p className="mt-1 h-4 text-xs font-medium text-emerald-600 dark:text-emerald-400">{p.perMonth && `≈ ৳${p.perMonth} per month`}</p>
              <button className={`mt-5 w-full rounded-lg py-2.5 text-sm font-semibold transition ${p.featured ? "bg-red-600 text-white hover:bg-red-700" : "border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/60"}`}>
                Buy now
              </button>
              <ul className="mt-6 space-y-3 text-sm text-slate-600 dark:text-slate-400">
                {current.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <Icon name="check" className="h-4 w-4 shrink-0 text-red-600 dark:text-red-400" strokeWidth={2.5} />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
