import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import Icon from "../components/Icon.jsx";

const routerLinks = [
  { to: "/t-shirt", label: "T-Shirt" },
  { to: "/shoes", label: "Shoes" },
  { to: "/pant", label: "Pant" },
];

const links = [
  // { to: "/handcrafts", icon: "doc", label: "Handcrafts" },
  { to: "/hand-tools", icon: "handcraft", label: "Hand Tools" },
  { to: "/power-tools", icon: "doc", label: "Power Tools" },
];


// Mobile: slide-in drawer. Tablet (sm): icon-only rail. Desktop (lg): full sidebar.
const item = (active) =>
  `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition sm:justify-center lg:justify-start ${
    active ? "bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-md shadow-red-600/25" : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
  }`;

const label = "sm:hidden lg:inline";

export default function Sidebar({ open, onClose }) {
  const { pathname } = useLocation();
  const inRouters = routerLinks.some((l) => pathname.startsWith(l.to));
  const [groupOpen, setGroupOpen] = useState(true);

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-40 flex h-screen w-64 shrink-0 flex-col border-r border-slate-200/70 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-5 transition-transform duration-200
        sm:sticky sm:top-0 sm:w-20 sm:translate-x-0 sm:px-3 lg:w-64 lg:px-4
        ${open ? "translate-x-0 shadow-2xl" : "-translate-x-full"}`}
    >
      {/* Logo — swap for <img src="/logo.svg" /> */}
      <div className="mb-7 flex items-center gap-3 px-2 sm:justify-center sm:px-0 lg:justify-start lg:px-2">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-600 text-base font-extrabold text-white shadow-lg shadow-red-600/30">HF</div>
        <div className="leading-tight sm:hidden lg:block">
          <div className="text-[15px] font-bold tracking-tight">HELFIGER</div>
          <div className="text-[9px] font-semibold tracking-[0.3em] text-slate-400 dark:text-slate-500"></div>
        </div>
        <button onClick={onClose} className="ml-auto rounded-lg p-1.5 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 sm:hidden" aria-label="Close menu">
          <Icon name="close" className="h-5 w-5" />
        </button>
      </div>

      <nav className="flex flex-1 flex-col gap-1 overflow-y-auto" onClick={(e) => e.target.closest("a") && onClose()}>
        <NavLink to="/" end title="Dashboard" className={({ isActive }) => item(isActive)}>
          <Icon name="dashboard" className="h-5 w-5 shrink-0" />
          <span className={label}>Handcrafts</span>
        </NavLink>

        {/* Router management group */}
        {/* <button
          onClick={() => setGroupOpen((v) => !v)}
          title="Router Management"
          className={`flex items-center gap-3 whitespace-nowrap rounded-xl px-3 py-2.5 text-left text-sm font-medium transition sm:justify-center lg:justify-start ${
            inRouters ? "text-red-600 dark:text-red-400" : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          <Icon name="fashion" className="h-5 w-5 shrink-0" />
          <span className={label}>Fashion</span>
          <Icon name="chevron" className={`ml-auto h-4 w-4 transition sm:hidden lg:block ${groupOpen ? "rotate-180" : ""}`} />
        </button> */}
        {/* {groupOpen && (
          <div className="ml-5 flex flex-col gap-0.5 border-l border-slate-200 dark:border-slate-800 pl-3 sm:ml-0 sm:border-0 sm:pl-0 lg:ml-5 lg:border-l lg:pl-3">
            {routerLinks.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                title={l.label}
                className={({ isActive }) =>
                  `rounded-lg px-3 py-2 text-sm transition sm:px-0 sm:text-center sm:text-[10px] lg:px-3 lg:text-left lg:text-sm ${
                    isActive ? "bg-red-50 dark:bg-red-500/10 font-semibold text-red-600 dark:text-red-400" : "text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
                  }`
                }
              >
                <span className="sm:hidden lg:inline">{l.label}</span>
                <span className="hidden sm:inline lg:hidden">{l.label.split(" ")[0]}</span>
              </NavLink>
            ))}
          </div>
        )} */}

        {links.map((l) => (
          <NavLink key={l.to} to={l.to} title={l.label} className={({ isActive }) => item(isActive)}>
            <Icon name={l.icon} className="h-5 w-5 shrink-0" />
            <span className={label}>{l.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="mb-3 hidden rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 p-4 text-white lg:block">
        <div className="text-sm font-semibold">Need help?</div>
        <p className="mt-1 text-xs text-slate-300">Our support team is available 24/7.</p>
        <NavLink to="/support" className="mt-3 block w-full rounded-lg bg-white/10 py-2 text-center text-xs font-semibold hover:bg-white/20">
          Open a ticket
        </NavLink>
      </div>
      <NavLink to="/login" title="Log out" className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-rose-50 dark:hover:bg-rose-500/10 hover:text-rose-600 sm:justify-center lg:justify-start">
        <Icon name="logout" className="h-5 w-5 shrink-0" />
        <span className={label}>Log out</span>
      </NavLink>
    </aside>
  );
}
