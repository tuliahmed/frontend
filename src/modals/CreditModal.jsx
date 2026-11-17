import { useState } from "react";
import Icon from "../components/Icon.jsx";
import { Modal, ModalHeader, ModalBody } from "../components/ui.jsx";
import { user, balance } from "../data/mock.js";

// Swap `badge` for <img src="/img/bkash.svg" /> etc. with your own logo files.
const methods = [
  { name: "bKash", badge: "bK", color: "bg-pink-600" },
  { name: "Nagad", badge: "Ng", color: "bg-orange-500" },
  { name: "Rocket", badge: "Rk", color: "bg-purple-600" },
];

export default function CreditModal({ open, onClose, initial = 500 }) {
  const [amount, setAmount] = useState(initial);
  const [method, setMethod] = useState("bKash");
  const value = Number(amount) || 0;

  return (
    <Modal open={open} onClose={onClose} size="sm">
      <ModalHeader icon="wallet" title="Add credit" subtitle={<>Current balance <span className="font-semibold text-slate-700 dark:text-slate-300">৳{balance.amount}</span></>} onClose={onClose} />
      <ModalBody className="space-y-5">
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-slate-700 dark:text-slate-300">Amount</label>
          <div className="flex items-center rounded-xl border border-slate-300 dark:border-slate-700 px-4 focus-within:border-red-500 focus-within:ring-2 focus-within:ring-red-100">
            <span className="text-2xl font-semibold text-slate-400 dark:text-slate-500">৳</span>
            <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className="w-full bg-transparent px-2 py-3 text-2xl font-bold text-slate-900 dark:text-slate-100 outline-none" />
            <span className="text-xs font-medium text-slate-400 dark:text-slate-500">BDT</span>
          </div>
          <div className="mt-2 flex gap-2">
            {[50, 100, 500, 1000].map((a) => (
              <button
                key={a}
                onClick={() => setAmount(a)}
                className={`flex-1 rounded-full border py-1.5 text-xs font-semibold transition ${value === a ? "border-red-500 bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400" : "border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60"}`}
              >
                +৳{a}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-semibold text-slate-700 dark:text-slate-300">Receipt email</label>
          <div className="relative">
            <Icon name="mail" className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
            <input type="email" defaultValue={user.email} className="w-full rounded-xl border border-slate-300 dark:border-slate-700 py-2.5 pl-9 pr-3 text-sm outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100" />
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-semibold text-slate-700 dark:text-slate-300">Payment method</label>
          <div className="grid grid-cols-3 gap-2">
            {methods.map((m) => {
              const sel = method === m.name;
              return (
                <button
                  key={m.name}
                  onClick={() => setMethod(m.name)}
                  className={`relative flex flex-col items-center gap-2 rounded-xl border py-3 transition ${sel ? "border-red-500 bg-red-50/60 ring-4 ring-red-100" : "border-slate-200 dark:border-slate-800 hover:border-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60"}`}
                >
                  <span className={`flex h-10 w-10 items-center justify-center rounded-xl text-xs font-extrabold text-white ${m.color}`}>{m.badge}</span>
                  <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">{m.name}</span>
                  {sel && (
                    <span className="absolute right-1.5 top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-white">
                      <Icon name="check" className="h-2.5 w-2.5" strokeWidth={3} />
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-1.5 rounded-xl bg-slate-50 dark:bg-slate-900 px-4 py-3 text-sm">
          <div className="flex justify-between text-slate-500 dark:text-slate-400"><span>Credit amount</span><span className="font-medium text-slate-900 dark:text-slate-100">৳{value.toLocaleString()}</span></div>
          <div className="flex justify-between text-slate-500 dark:text-slate-400"><span>New balance</span><span className="font-semibold text-emerald-600 dark:text-emerald-400">৳{(balance.amount + value).toLocaleString()}</span></div>
        </div>
      </ModalBody>
      <div className="border-t border-slate-100 dark:border-slate-800 px-5 py-4 sm:px-6">
        <button disabled={value < 50} className="w-full rounded-xl bg-red-600 py-3 text-sm font-semibold text-white shadow-md shadow-red-600/25 hover:bg-red-700 disabled:opacity-50">
          Pay ৳{value.toLocaleString()} with {method}
        </button>
        <p className="mt-2 flex items-center justify-center gap-1.5 text-[11px] text-slate-400 dark:text-slate-500">
          <Icon name="lock" className="h-3 w-3" />
          You'll be redirected to {method} to complete the payment
        </p>
      </div>
    </Modal>
  );
}
