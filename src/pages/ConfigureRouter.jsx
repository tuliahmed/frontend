import { useState } from "react";
import Icon from "../components/Icon.jsx";
import { Card, Segmented, SearchInput, StatusBadge } from "../components/ui.jsx";
import { pendingConfigs } from "../data/mock.js";
import ConfigVpnModal from "../modals/ConfigVpnModal.jsx";

export default function ConfigureRouter() {
  const [tab, setTab] = useState("remote");
  const [item, setItem] = useState(null);
  const rows = pendingConfigs[tab];

  return (
    <>
      <Card>
        <div className="flex flex-wrap items-center gap-3 border-b border-slate-100 dark:border-slate-800 px-4 py-3">
          <h1 className="mr-2 text-lg font-bold tracking-tight text-slate-900 dark:text-white">Configure VPN</h1>
          <Segmented
            value={tab}
            onChange={setTab}
            options={[
              { value: "remote", label: "Remote VPN", icon: "shield", count: pendingConfigs.remote.length },
              { value: "voice", label: "Voice VPN", icon: "phone", count: pendingConfigs.voice.length },
            ]}
          />
          <SearchInput className="w-full sm:ml-auto sm:w-56" />
        </div>

        {rows.length === 0 ? (
          <div className="flex flex-col items-center gap-2 px-4 py-12 text-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"><Icon name="check" className="h-6 w-6" /></span>
            <div className="font-semibold text-slate-900 dark:text-white">All set</div>
            <p className="text-sm text-slate-500 dark:text-slate-400">No {tab} VPN accounts are waiting to be configured.</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {rows.map((r, i) => (
              <div key={r.id} className="flex flex-wrap items-center gap-3 px-4 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-800/60">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-500 dark:text-slate-400">{i + 1}</span>
                <Icon name="server" className="h-4 w-4 shrink-0 text-red-600 dark:text-red-400" />
                <span className="font-mono text-sm font-semibold">{r.id}</span>
                <span className="rounded-md bg-sky-50 dark:bg-sky-500/10 px-2 py-0.5 text-[11px] font-semibold text-sky-700 dark:text-sky-400">{r.service}</span>
                <StatusBadge status={r.status} />
                <button onClick={() => setItem(r)} className="ml-auto inline-flex items-center gap-1.5 rounded-lg bg-slate-900 dark:bg-slate-800 px-3 py-1.5 text-xs font-semibold text-white hover:bg-slate-800">
                  <Icon name="settings" className="h-3.5 w-3.5" />
                  Configure
                </button>
              </div>
            ))}
          </div>
        )}
      </Card>
      <ConfigVpnModal item={item} onClose={() => setItem(null)} />
    </>
  );
}
