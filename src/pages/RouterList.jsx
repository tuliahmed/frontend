import { useState } from "react";
import Icon from "../components/Icon.jsx";
import { Card, Segmented, SearchInput, Select, StatusBadge, TypeBadge, ServerTag, Th, Pagination } from "../components/ui.jsx";
import { routers } from "../data/mock.js";
import RouterConfigModal from "../modals/RouterConfigModal.jsx";
import AccountDetailsModal from "../modals/AccountDetailsModal.jsx";
import BackupModal from "../modals/BackupModal.jsx";
import RenewModal from "../modals/RenewModal.jsx";
import RouterTransactionsModal from "../modals/RouterTransactionsModal.jsx";

const titles = { remote: "Remote Router List", voice: "Voice Router List", all: "All Routers" };

const actions = [
  ["config", "sliders", "Configuration script", "text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10"],
  ["transactions", "card", "Transactions", "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"],
  ["backup", "download", "Backup", "text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-500/10"],
  ["renew", "renew", "Renew", "text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-500/10"],
  ["edit", "edit", "Edit details", "text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-500/10"],
];

// A port value of null means "no port" (Voice-VPN). Show a dash for a single missing port.
const Port = ({ v }) => (v == null ? <span className="text-slate-300">—</span> : <span className="font-mono text-[13px] text-slate-700 dark:text-slate-300">{v}</span>);

export default function RouterList({ type }) {
  const [status, setStatus] = useState("All");
  const [kind, setKind] = useState("all");
  const [modal, setModal] = useState({ name: null, router: null });
  const open = (name, router) => setModal({ name, router });
  const close = () => setModal({ name: null, router: null });

  const service = type === "remote" ? "Remote-VPN" : type === "voice" ? "Voice-VPN" : kind === "remote" ? "Remote-VPN" : kind === "voice" ? "Voice-VPN" : null;
  const rows = routers.filter((r) => (!service || r.service === service) && (status === "All" || r.status === status));

  const showPorts = type !== "voice";
  const showType = type === "all";
  const showActions = type !== "all";
  const remoteCount = routers.filter((r) => r.service === "Remote-VPN").length;

  return (
    <>
      <Card>
        <div className="flex flex-wrap items-center gap-3 border-b border-slate-100 dark:border-slate-800 px-4 py-3">
          <h1 className="mr-1 text-lg font-bold tracking-tight text-slate-900 dark:text-white">{titles[type]}</h1>
          {type === "all" ? (
            <Segmented
              value={kind}
              onChange={setKind}
              options={[
                { value: "all", label: "All", count: routers.length },
                { value: "remote", label: "Remote", icon: "shield", count: remoteCount },
                { value: "voice", label: "Voice", icon: "phone", count: routers.length - remoteCount },
              ]}
            />
          ) : (
            <span className="rounded-full bg-slate-100 dark:bg-slate-800 px-2 py-0.5 text-xs font-semibold text-slate-500 dark:text-slate-400">{rows.length} routers</span>
          )}
          <div className="flex w-full flex-wrap items-center gap-2 sm:ml-auto sm:w-auto">
            <SearchInput placeholder="Search router, ID, server..." className="flex-1 sm:w-56 sm:flex-none" />
            <div className="w-32">
              <Select value={status} onChange={(e) => setStatus(e.target.value)} className="py-1.5 text-xs">
                {["All", "Enabled", "Disabled", "Expired"].map((s) => <option key={s}>{s}</option>)}
              </Select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full whitespace-nowrap text-sm">
            <thead className="bg-slate-50/70 dark:bg-slate-800/40">
              <tr>
                <Th className="pl-4">Router</Th>
                {showType && <Th>Type</Th>}
                {showPorts && (<><Th>Win</Th><Th>API</Th><Th>Web</Th></>)}
                <Th>Server</Th>
                <Th>Expiry</Th>
                <Th>Status</Th>
                {showActions && <th className="px-3 py-2.5 pr-4 text-right text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Action</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {rows.map((r) => {
                const noPorts = r.win == null && r.api == null && r.web == null;
                return (
                  <tr key={r.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/60">
                    <td className="px-3 py-2 pl-4">
                      <div className="font-semibold text-slate-900 dark:text-slate-100">{r.name}</div>
                      <div className="font-mono text-[11px] text-slate-400 dark:text-slate-500">{r.id}</div>
                    </td>
                    {showType && <td className="px-3 py-2"><TypeBadge service={r.service} /></td>}
                    {showPorts &&
                      (noPorts ? (
                        <td colSpan={3} className="px-3 py-2">
                          <span className="inline-flex rounded-md border border-dashed border-slate-200 dark:border-slate-800 px-2 py-0.5 text-[11px] text-slate-400 dark:text-slate-500">No ports · Voice VPN</span>
                        </td>
                      ) : (
                        <>
                          <td className="px-3 py-2"><Port v={r.win} /></td>
                          <td className="px-3 py-2"><Port v={r.api} /></td>
                          <td className="px-3 py-2"><Port v={r.web} /></td>
                        </>
                      ))}
                    <td className="px-3 py-2"><ServerTag host={r.server} /></td>
                    <td className={`px-3 py-2 font-semibold ${r.status === "Expired" ? "text-rose-600 dark:text-rose-400" : "text-emerald-600 dark:text-emerald-400"}`}>{r.exp}</td>
                    <td className="px-3 py-2">
                      <div className="flex items-center gap-1.5">
                        {!noPorts && (
                          <a href={`http://${r.server}:${r.web}`} target="_blank" rel="noreferrer" title="Open web" className="rounded-md p-1 text-slate-400 dark:text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white">
                            <Icon name="globe" className="h-3.5 w-3.5" />
                          </a>
                        )}
                        <StatusBadge status={r.status} />
                      </div>
                    </td>
                    {showActions && (
                      <td className="px-3 py-2 pr-4">
                        <div className="flex justify-end gap-0.5">
                          {actions.map(([key, icon, title, tone]) => (
                            <button key={key} title={title} onClick={() => open(key, r)} className={`rounded-md p-1.5 ${tone}`}>
                              <Icon name={icon} className="h-3.5 w-3.5" />
                            </button>
                          ))}
                        </div>
                      </td>
                    )}
                  </tr>
                );
              })}
              {rows.length === 0 && (
                <tr><td colSpan={10} className="px-4 py-10 text-center text-sm text-slate-500 dark:text-slate-400">No routers match this filter.</td></tr>
              )}
            </tbody>
          </table>
        </div>
        <Pagination page={1} pages={2} />
      </Card>

      <RouterConfigModal router={modal.name === "config" ? modal.router : null} onClose={close} />
      <RouterTransactionsModal router={modal.name === "transactions" ? modal.router : null} onClose={close} />
      <BackupModal router={modal.name === "backup" ? modal.router : null} onClose={close} />
      <RenewModal router={modal.name === "renew" ? modal.router : null} onClose={close} />
      <AccountDetailsModal router={modal.name === "edit" ? modal.router : null} onClose={close} />
    </>
  );
}
