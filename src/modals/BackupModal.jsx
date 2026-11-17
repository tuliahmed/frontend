import Icon from "../components/Icon.jsx";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Hint } from "../components/ui.jsx";
import { backups } from "../data/mock.js";

export default function BackupModal({ router, onClose }) {
  if (!router) return null;
  return (
    <Modal open onClose={onClose} size="lg">
      <ModalHeader icon="archive" title="Router backup" subtitle={<><span className="font-semibold text-slate-700 dark:text-slate-300">{router.name}</span> · <span className="font-mono">{router.id}</span></>} onClose={onClose} />
      <ModalBody className="space-y-4">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {[
            ["file", "Binary backup", ".backup · full restore", "text-red-600 dark:text-red-400"],
            ["code", "Config export", ".rsc · readable script", "text-violet-600 dark:text-violet-400"],
          ].map(([icon, title, sub, tone]) => (
            <button key={title} className="group flex items-center gap-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800 p-3 text-left hover:border-red-300 hover:bg-red-50 dark:hover:bg-red-500/10">
              <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white dark:bg-slate-900 shadow-sm ${tone}`}>
                <Icon name={icon} className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">{title}</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">{sub}</div>
              </div>
              <Icon name="download" className="ml-auto h-4 w-4 text-slate-400 dark:text-slate-500 group-hover:text-red-600" />
            </button>
          ))}
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between gap-2">
            <span className="text-[11px] font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">Backup history</span>
            <span className="text-xs text-slate-400 dark:text-slate-500">Auto backup every Sunday, 02:00</span>
          </div>
          <div className="divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800">
            {backups.map((b) => (
              <div key={b.name} className="flex items-center gap-3 px-3 py-2 hover:bg-slate-50 dark:hover:bg-slate-800/60">
                <span className={`rounded px-1.5 py-0.5 text-[10px] font-bold uppercase ${b.type === "backup" ? "bg-red-50 dark:bg-red-500/10 text-red-700 dark:text-red-400" : "bg-violet-50 dark:bg-violet-500/10 text-violet-700 dark:text-violet-400"}`}>
                  {b.type === "backup" ? "BAK" : "RSC"}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="truncate font-mono text-[13px] font-semibold text-slate-900 dark:text-slate-100">{b.name}</span>
                    {b.latest && <span className="rounded-full bg-emerald-100 dark:bg-emerald-500/15 px-1.5 text-[10px] font-semibold leading-4 text-emerald-700 dark:text-emerald-400">Latest</span>}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">{b.date} · {b.size}</div>
                </div>
                <button title="Delete" className="rounded-md p-1.5 text-slate-400 dark:text-slate-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 hover:text-rose-600"><Icon name="trash" className="h-3.5 w-3.5" /></button>
                <button title="Download" className="rounded-md p-1.5 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10"><Icon name="download" className="h-3.5 w-3.5" /></button>
              </div>
            ))}
          </div>
        </div>
        <Hint>A .backup file only restores on the same router model. Use the .rsc export to move settings to a different device.</Hint>
      </ModalBody>
      <ModalFooter>
        <Button variant="outline" onClick={onClose}>Close</Button>
        <Button icon="plus">Create new backup</Button>
      </ModalFooter>
    </Modal>
  );
}
