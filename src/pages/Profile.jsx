import Icon from "../components/Icon.jsx";
import { Card } from "../components/ui.jsx";
import { user } from "../data/mock.js";

const info = [
  ["mail", "Email", user.email, "bg-sky-50 dark:bg-sky-500/10 text-sky-600 dark:text-sky-400"],
  ["mobile", "Phone", user.phone, "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"],
  ["building", "Company", user.company, "bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400"],
  ["pin", "Address", user.address, "bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400"],
];

export default function Profile() {
  return (
    <Card className="overflow-hidden">
      <div className="relative h-28 overflow-hidden bg-slate-900">
        <div className="absolute -left-10 -top-16 h-48 w-48 rounded-full bg-red-600/40 blur-3xl" />
        <div className="absolute -bottom-20 right-10 h-48 w-48 rounded-full bg-orange-500/30 blur-3xl" />
        <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: "radial-gradient(#fff 1px, transparent 1px)", backgroundSize: "14px 14px" }} />
      </div>

      <div className="flex flex-col items-center gap-4 px-6 pb-6 text-center sm:flex-row sm:items-end sm:text-left">
        <div className="relative -mt-12 shrink-0">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-orange-500 text-3xl font-bold text-white shadow-lg ring-4 ring-white dark:ring-slate-900">{user.initials}</div>
          <button title="Change photo" className="absolute bottom-0 right-0 rounded-full bg-white dark:bg-slate-900 p-1.5 text-slate-700 dark:text-slate-300 shadow ring-1 ring-slate-200 dark:ring-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/60">
            <Icon name="camera" className="h-3.5 w-3.5" />
          </button>
        </div>
        <div className="min-w-0 flex-1">
          <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">{user.name}</h1>
          <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">Client at <span className="font-semibold text-slate-700 dark:text-slate-300">{user.company}</span></p>
        </div>
        <div className="flex gap-2">
          <button className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-2 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60">
            <Icon name="lock" className="h-3.5 w-3.5" />
            Password
          </button>
          <button className="inline-flex items-center gap-1.5 rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800">
            <Icon name="edit" className="h-3.5 w-3.5" />
            Edit profile
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 divide-y divide-slate-100 dark:divide-slate-800 border-t border-slate-100 dark:border-slate-800 sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-y-0">
        {info.map(([icon, label, value, tone]) => (
          <div key={label} className="flex items-center gap-3 px-6 py-4">
            <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${tone}`}><Icon name={icon} className="h-4 w-4" /></div>
            <div className="min-w-0">
              <div className="text-xs text-slate-500 dark:text-slate-400">{label}</div>
              <div className="truncate text-sm font-semibold">{value}</div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
