import { useEffect } from "react";
import Icon from "./Icon.jsx";

/* ---------- Layout bits ---------- */

export function Card({ className = "", children }) {
  return <div className={`rounded-2xl border border-slate-200/70 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm ${className}`}>{children}</div>;
}

export function PageHeader({ title, subtitle, actions }) {
  return (
    <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
      <div className="min-w-0">
        <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100">{title}</h1>
        {subtitle && <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">{subtitle}</p>}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </div>
  );
}

/* ---------- Buttons & inputs ---------- */

const btn = {
  primary: "bg-red-600 text-white shadow-md shadow-red-600/25 hover:bg-red-700",
  dark: "bg-slate-900 dark:bg-slate-800 text-white hover:bg-slate-800",
  outline: "border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60",
  ghost: "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800",
};

export function Button({ variant = "primary", icon, className = "", children, ...props }) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition disabled:opacity-60 ${btn[variant]} ${className}`}
      {...props}
    >
      {icon && <Icon name={icon} className="h-4 w-4" />}
      {children}
    </button>
  );
}

export const inputClass =
  "w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm text-slate-900 dark:text-slate-100 outline-none placeholder:text-slate-400 focus:border-red-500 focus:ring-2 focus:ring-red-100";

export function Field({ label, required, hint, children }) {
  return (
    <div>
      {label && (
        <label className="mb-1.5 block text-xs font-semibold text-slate-700 dark:text-slate-300">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      {children}
      {hint && <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">{hint}</p>}
    </div>
  );
}

export function Select({ children, className = "", ...props }) {
  return (
    <div className="relative">
      <select className={`${inputClass} appearance-none pr-9 ${className}`} {...props}>
        {children}
      </select>
      <Icon name="chevron" className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
    </div>
  );
}

export function SearchInput({ placeholder = "Search...", className = "", ...props }) {
  return (
    <div className={`relative ${className}`}>
      <Icon name="search" className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
      <input
        placeholder={placeholder}
        className="w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 py-1.5 pl-8 pr-3 text-xs outline-none placeholder:text-slate-400 focus:border-red-400 focus:bg-white focus:ring-2 focus:ring-red-100"
        {...props}
      />
    </div>
  );
}

/** Segmented tabs: options = [{ value, label, icon?, count? }] */
export function Segmented({ options, value, onChange, size = "sm" }) {
  const pad = size === "md" ? "px-4 py-2 text-sm" : "px-3 py-1.5 text-xs";
  return (
    <div className="inline-flex max-w-full overflow-x-auto rounded-lg bg-slate-100 dark:bg-slate-800 p-0.5 font-semibold">
      {options.map((o) => (
        <button
          key={o.value}
          onClick={() => onChange?.(o.value)}
          className={`inline-flex shrink-0 items-center gap-1.5 rounded-md transition ${pad} ${
            value === o.value ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-sm" : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          {o.icon && <Icon name={o.icon} className={`h-3.5 w-3.5 ${value === o.value ? "text-red-600 dark:text-red-400" : ""}`} />}
          {o.label}
          {o.count != null && <span className="text-slate-400 dark:text-slate-500">{o.count}</span>}
        </button>
      ))}
    </div>
  );
}

/* ---------- Badges ---------- */

const statusTone = {
  Active: "bg-emerald-100 dark:bg-emerald-500/15 text-emerald-700 dark:text-emerald-400",
  Enabled: "bg-emerald-100 dark:bg-emerald-500/15 text-emerald-700 dark:text-emerald-400",
  Completed: "bg-emerald-100 dark:bg-emerald-500/15 text-emerald-700 dark:text-emerald-400",
  Online: "bg-emerald-100 dark:bg-emerald-500/15 text-emerald-700 dark:text-emerald-400",
  Pending: "bg-amber-100 dark:bg-amber-500/15 text-amber-700 dark:text-amber-400",
  Answered: "bg-amber-100 dark:bg-amber-500/15 text-amber-700 dark:text-amber-400",
  Open: "bg-sky-100 dark:bg-sky-500/15 text-sky-700 dark:text-sky-400",
  Disabled: "bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400",
  Closed: "bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400",
  Expired: "bg-rose-100 dark:bg-rose-500/15 text-rose-700 dark:text-rose-400",
  Failed: "bg-rose-100 dark:bg-rose-500/15 text-rose-700 dark:text-rose-400",
};

export function StatusBadge({ status, size = "sm" }) {
  const s = size === "md" ? "px-2.5 py-0.5 text-[13px]" : "px-2 py-0.5 text-[11px]";
  return (
    <span className={`inline-flex items-center gap-1 whitespace-nowrap rounded-full font-semibold ${s} ${statusTone[status] || "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}

export function TypeBadge({ service }) {
  const voice = service === "Voice-VPN";
  return (
    <span className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[11px] font-semibold ${voice ? "bg-violet-50 dark:bg-violet-500/10 text-violet-700 dark:text-violet-400" : "bg-sky-50 dark:bg-sky-500/10 text-sky-700 dark:text-sky-400"}`}>
      <Icon name={voice ? "phone" : "shield"} className="h-3 w-3" />
      {voice ? "Voice" : "Remote"}
    </span>
  );
}

export function ServerTag({ host }) {
  const code = host.startsWith("serverbd") ? "BD" : host.startsWith("serveruae") ? "UAE" : null;
  return (
    <span className="inline-flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
      {code && (
        <span className={`rounded px-1.5 py-0.5 text-[10px] font-bold ${code === "BD" ? "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400" : "bg-sky-50 dark:bg-sky-500/10 text-sky-700 dark:text-sky-400"}`}>{code}</span>
      )}
      <span className="font-mono text-[12px]">{host}</span>
    </span>
  );
}

/* ---------- Table helpers ---------- */

export function Th({ children, className = "", sort = true }) {
  return (
    <th className={`px-3 py-2.5 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 ${className}`}>
      <span className="inline-flex items-center gap-1">
        {children}
        {sort && <Icon name="sort" className="h-3 w-3 text-slate-300" />}
      </span>
    </th>
  );
}

export function Pagination({ page = 1, pages = 1, className = "" }) {
  return (
    <div className={`flex items-center justify-between border-t border-slate-100 dark:border-slate-800 px-4 py-2.5 text-xs text-slate-500 dark:text-slate-400 ${className}`}>
      <span>
        Page <span className="font-semibold text-slate-900 dark:text-slate-100">{page}</span> of <span className="font-semibold text-slate-900 dark:text-slate-100">{pages}</span>
      </span>
      <div className="flex items-center gap-1">
        {["first", "left"].map((k) => (
          <button key={k} disabled={page === 1} className="rounded-md border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-1.5 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60 disabled:text-slate-300">
            <Icon name={k} className="h-3.5 w-3.5" />
          </button>
        ))}
        {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
          <button key={n} className={`h-7 w-7 rounded-md text-xs font-semibold ${n === page ? "bg-red-600 text-white" : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"}`}>
            {n}
          </button>
        ))}
        {["right", "last"].map((k) => (
          <button key={k} disabled={page === pages} className="rounded-md border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-1.5 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60 disabled:text-slate-300">
            <Icon name={k} className="h-3.5 w-3.5" />
          </button>
        ))}
      </div>
    </div>
  );
}

/* ---------- Modal ---------- */

export function Modal({ open, onClose, size = "md", children }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose?.();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;
  const width = { sm: "sm:max-w-md", md: "sm:max-w-lg", lg: "sm:max-w-2xl", xl: "sm:max-w-3xl" }[size];

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/50 sm:items-center sm:p-4"
      onMouseDown={(e) => e.target === e.currentTarget && onClose?.()}
      role="dialog"
      aria-modal="true"
    >
      <div className={`flex max-h-[92vh] w-full flex-col overflow-hidden rounded-t-2xl bg-white dark:bg-slate-900 shadow-2xl sm:rounded-2xl ${width}`}>{children}</div>
    </div>
  );
}

export function ModalHeader({ icon, title, subtitle, onClose }) {
  return (
    <div className="flex items-center gap-3 border-b border-slate-200 dark:border-slate-800 px-5 py-4 sm:px-6">
      {icon && (
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400">
          <Icon name={icon} className="h-5 w-5" />
        </div>
      )}
      <div className="min-w-0 flex-1">
        <h2 className="truncate text-lg font-bold leading-tight text-slate-900 dark:text-slate-100">{title}</h2>
        {subtitle && <div className="truncate text-sm text-slate-500 dark:text-slate-400">{subtitle}</div>}
      </div>
      <button onClick={onClose} className="rounded-lg p-1.5 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800" aria-label="Close">
        <Icon name="close" className="h-[18px] w-[18px]" />
      </button>
    </div>
  );
}

export function ModalBody({ className = "", children }) {
  return <div className={`min-h-0 flex-1 overflow-y-auto p-5 sm:p-6 ${className}`}>{children}</div>;
}

export function ModalFooter({ children, className = "" }) {
  return <div className={`flex flex-col-reverse gap-2 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 px-5 py-3 sm:flex-row sm:justify-end sm:px-6 ${className}`}>{children}</div>;
}

export function InfoPanel({ icon, label, title, value, unit }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800 p-4">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white dark:bg-slate-900 text-red-600 dark:text-red-400 shadow-sm">
        <Icon name={icon} className="h-[18px] w-[18px]" />
      </div>
      <div className="min-w-0">
        <div className="text-[11px] font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">{label}</div>
        <div className="text-[15px] font-medium text-slate-900 dark:text-slate-100">{title}</div>
      </div>
      <div className="ml-auto whitespace-nowrap">
        <span className="text-[26px] font-extrabold text-slate-900 dark:text-slate-100">{value}</span>
        {unit && <span className="ml-1 text-sm text-slate-500 dark:text-slate-400">{unit}</span>}
      </div>
    </div>
  );
}

export function Hint({ children, tone = "info" }) {
  const t = tone === "warn" ? "border-amber-200 dark:border-amber-500/30 bg-amber-50 dark:bg-amber-500/10 text-amber-800 dark:text-amber-300" : "border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-400";
  return (
    <div className={`flex gap-2 rounded-lg border px-3 py-2 text-xs ${t}`}>
      <Icon name="info" className="mt-0.5 h-3.5 w-3.5 shrink-0" />
      <div>{children}</div>
    </div>
  );
}

export function Avatar({ initials, className = "h-9 w-9 text-xs", dark }) {
  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-full font-bold text-white ${
        dark ? "bg-slate-900 dark:bg-slate-800" : "bg-gradient-to-br from-red-500 to-orange-500"
      } ${className}`}
    >
      {initials}
    </div>
  );
}
