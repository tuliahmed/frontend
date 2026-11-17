import { useEffect, useRef, useState } from "react";

/**
 * Small click-outside dropdown.
 * <Dropdown button={(open) => <button…/>}>{(close) => <menu…/>}</Dropdown>
 */
export default function Dropdown({ button, children, align = "right", panelClass = "w-64" }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e) => !ref.current?.contains(e.target) && setOpen(false);
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="relative" ref={ref}>
      <div onClick={() => setOpen((v) => !v)}>{button(open)}</div>
      {open && (
        <div
          className={`absolute z-50 mt-2 origin-top overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-200/60 dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/40 ${
            align === "right" ? "right-0" : "left-0"
          } ${panelClass}`}
        >
          {typeof children === "function" ? children(() => setOpen(false)) : children}
        </div>
      )}
    </div>
  );
}
