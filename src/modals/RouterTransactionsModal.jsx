import Icon from "../components/Icon.jsx";
import { Modal, ModalHeader, ModalBody, StatusBadge, SearchInput, Pagination } from "../components/ui.jsx";
import { transactions } from "../data/mock.js";

export default function RouterTransactionsModal({ router, onClose }) {
  if (!router) return null;
  const total = transactions.reduce((s, t) => s + t.amount, 0);
  return (
    <Modal open onClose={onClose} size="lg">
      <ModalHeader icon="card" title="Transactions" subtitle={<><span className="font-semibold text-slate-700 dark:text-slate-300">{router.name}</span> · <span className="font-mono">{router.id}</span></>} onClose={onClose} />
      <ModalBody className="space-y-4">
        <div className="grid grid-cols-3 divide-x divide-slate-200 dark:divide-slate-800 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800">
          {[["Payments", transactions.length], ["Total paid", `৳${total.toLocaleString()}`], ["Last", transactions[0].date]].map(([k, v]) => (
            <div key={k} className="px-4 py-2.5">
              <div className="text-[11px] font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">{k}</div>
              <div className="truncate text-base font-bold text-slate-900 dark:text-slate-100">{v}</div>
            </div>
          ))}
        </div>
        <SearchInput placeholder="Search transaction ID..." className="sm:max-w-[240px]" />
        <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
          <table className="w-full whitespace-nowrap text-sm">
            <thead className="bg-slate-50 dark:bg-slate-900">
              <tr className="text-left text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                <th className="px-3 py-2">Transaction ID</th>
                <th className="px-3 py-2">Amount</th>
                <th className="px-3 py-2">Method</th>
                <th className="px-3 py-2 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {transactions.map((t) => (
                <tr key={t.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/60">
                  <td className="px-3 py-2">
                    <span className="inline-flex items-center gap-1.5">
                      <span className="font-mono text-[13px] font-semibold">{t.id}</span>
                      <button title="Copy" className="rounded p-1 text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-600"><Icon name="copy" className="h-3 w-3" /></button>
                    </span>
                  </td>
                  <td className="px-3 py-2"><span className="font-semibold text-slate-900 dark:text-white">{t.amount}</span> <span className="text-xs text-slate-500 dark:text-slate-400">{t.currency}</span></td>
                  <td className="px-3 py-2"><span className="rounded-md bg-pink-50 dark:bg-pink-500/10 px-2 py-0.5 text-xs font-semibold text-pink-600 dark:text-pink-400">{t.method}</span></td>
                  <td className="px-3 py-2 text-right"><StatusBadge status={t.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ModalBody>
      <Pagination className="bg-slate-50 dark:bg-slate-900 px-6" />
    </Modal>
  );
}
