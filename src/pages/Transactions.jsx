import Icon from "../components/Icon.jsx";
import { Card, SearchInput, Select, StatusBadge, Th, Pagination } from "../components/ui.jsx";
import { transactions } from "../data/mock.js";

const methodTone = { bKash: "bg-pink-50 dark:bg-pink-500/10 text-pink-600 dark:text-pink-400", Nagad: "bg-orange-50 text-orange-600", Rocket: "bg-purple-50 text-purple-600" };

export default function Transactions() {
  return (
    <Card>
      <div className="flex flex-wrap items-center gap-3 border-b border-slate-100 dark:border-slate-800 px-4 py-3">
        <h1 className="mr-1 text-lg font-bold tracking-tight text-slate-900 dark:text-white">All Transactions</h1>
        <span className="rounded-full bg-slate-100 dark:bg-slate-800 px-2 py-0.5 text-xs font-semibold text-slate-500 dark:text-slate-400">{transactions.length} total</span>
        <div className="flex w-full flex-wrap items-center gap-2 sm:ml-auto sm:w-auto">
          <SearchInput placeholder="Search transaction ID..." className="flex-1 sm:w-56 sm:flex-none" />
          <div className="w-28">
            <Select className="py-1.5 text-xs"><option>10 / page</option><option>25 / page</option></Select>
          </div>
          <button className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-2.5 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60">
            <Icon name="download" className="h-3.5 w-3.5" />
            Export
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full whitespace-nowrap text-sm">
          <thead className="bg-slate-50/70 dark:bg-slate-800/40">
            <tr>
              <Th className="pl-4">Transaction ID</Th>
              <Th>Status</Th>
              <Th>Amount</Th>
              <Th>Method</Th>
              <Th className="pr-4">Time</Th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {transactions.map((t) => (
              <tr key={t.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/60">
                <td className="px-3 py-2 pl-4">
                  <span className="inline-flex items-center gap-1.5">
                    <span className="font-mono text-[13px] font-semibold">{t.id}</span>
                    <button title="Copy" className="rounded p-1 text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-600"><Icon name="copy" className="h-3 w-3" /></button>
                  </span>
                </td>
                <td className="px-3 py-2"><StatusBadge status={t.status} /></td>
                <td className="px-3 py-2"><span className="font-semibold text-slate-900 dark:text-white">{t.amount}</span> <span className="text-xs text-slate-500 dark:text-slate-400">{t.currency}</span></td>
                <td className="px-3 py-2">
                  <span className={`inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-xs font-semibold ${methodTone[t.method]}`}>
                    <span className="h-1.5 w-1.5 rounded-full bg-current" />
                    {t.method}
                  </span>
                </td>
                <td className="px-3 py-2 pr-4">{t.date} <span className="ml-1 text-xs text-slate-400 dark:text-slate-500">{t.time}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination />
    </Card>
  );
}
