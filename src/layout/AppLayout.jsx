import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar.jsx";
import Topbar from "./Topbar.jsx";

export default function AppLayout() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-slate-50 to-red-50/30 dark:from-slate-950 dark:via-slate-950 dark:to-red-950/20">
      {/* Mobile backdrop */}
      {open && <div onClick={() => setOpen(false)} className="fixed inset-0 z-30 bg-slate-900/40 sm:hidden" />}
      <Sidebar open={open} onClose={() => setOpen(false)} />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar onMenu={() => setOpen(true)} />
        <main key={pathname} className="flex-1 p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
