import { Modal, ModalHeader, ModalBody, ModalFooter, Button, StatusBadge, inputClass } from "../components/ui.jsx";

const label = "text-[11px] font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400";

export default function AccountDetailsModal({ router, onClose }) {
  if (!router) return null;
  const voice = router.service === "Voice-VPN";
  return (
    <Modal open onClose={onClose} size="lg">
      <ModalHeader
        icon="server"
        title={
          <span className="inline-flex items-center gap-2">
            <span className="font-mono">{router.id}</span> <StatusBadge status={router.status} />
          </span>
        }
        subtitle={`${router.service} · #${router.s_id}${router.added ? ` · Added ${router.added.slice(0, 16)}` : ""}`}
        onClose={onClose}
      />
      <ModalBody className="space-y-4">
        <div className="grid grid-cols-2 gap-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800 px-4 py-3 sm:grid-cols-4">
          <div>
            <div className={label}>Price</div>
            <div className="font-bold">{router.price} <span className="text-xs font-normal text-slate-500 dark:text-slate-400">BDT</span></div>
          </div>
          <div>
            <div className={label}>Duration</div>
            <div className="font-bold">{router.day} <span className="text-xs font-normal text-slate-500 dark:text-slate-400">days</span></div>
          </div>
          <div>
            <div className={label}>Expiry</div>
            <div className={`font-bold ${router.status === "Expired" ? "text-rose-600 dark:text-rose-400" : "text-emerald-600 dark:text-emerald-400"}`}>{router.exp}</div>
          </div>
          <div>
            <div className={label}>Local IP</div>
            <div className="font-mono text-sm font-semibold">{router.localIp ?? "—"}</div>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 rounded-lg bg-slate-50 dark:bg-slate-900 px-3 py-2">
          <span className={label}>Server address</span>
          <span className="truncate font-mono text-sm text-slate-800 dark:text-slate-200">{router.server}</span>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div>
            <label className={`${label} mb-1 block`}>Server name</label>
            <input className={inputClass} defaultValue={router.name} />
          </div>
          <div>
            <label className={`${label} mb-1 block`}>Password</label>
            <input className={`${inputClass} font-mono`} defaultValue={router.pass ?? ""} placeholder="••••••" />
          </div>
        </div>

        {voice ? (
          <p className="rounded-lg border border-dashed border-slate-200 dark:border-slate-800 px-3 py-2 text-xs text-slate-500 dark:text-slate-400">Voice VPN accounts don't use Winbox, API or Web ports.</p>
        ) : (
          <div className="grid grid-cols-3 gap-3">
            {[
              ["API", router.api, router.clientApi],
              ["Web", router.web, router.clientWeb],
              ["Winbox", router.win, router.clientWin],
            ].map(([type, server, client]) => (
              <div key={type}>
                <label className={`${label} mb-1 flex justify-between gap-1`}>
                  <span>{type} port</span>
                  <span className="font-mono normal-case text-slate-400 dark:text-slate-500">:{server}</span>
                </label>
                <input type="number" className={`${inputClass} font-mono`} defaultValue={client ?? ""} />
              </div>
            ))}
          </div>
        )}
      </ModalBody>
      <ModalFooter>
        <Button variant="outline" onClick={onClose}>Cancel</Button>
        <Button icon="check" onClick={onClose}>Save changes</Button>
      </ModalFooter>
    </Modal>
  );
}
