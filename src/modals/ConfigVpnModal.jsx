import { useState } from "react";
import Icon from "../components/Icon.jsx";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Field, inputClass } from "../components/ui.jsx";
import { remoteServers, voiceServers } from "../data/mock.js";

const section = "mb-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500";

export default function ConfigVpnModal({ item, onClose }) {
  const [server, setServer] = useState(0);
  const [showPass, setShowPass] = useState(false);
  if (!item) return null;

  const voice = item.service === "Voice-VPN";
  const servers = voice ? voiceServers : remoteServers;

  return (
    <Modal open onClose={onClose} size="lg">
      <ModalHeader icon="settings" title={`Configure new ${voice ? "Voice" : "Remote"} VPN`} subtitle="Set up the account and server for your router." onClose={onClose} />
      <ModalBody className="space-y-5">
        <div>
          <div className={section}>Account</div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <Field label="Router name">
              <input className={inputClass} placeholder="e.g. office-router" />
            </Field>
            <Field label="Username">
              <div className="relative">
                <input className={`${inputClass} bg-slate-50 dark:bg-slate-900 pr-8 font-mono text-slate-600 dark:text-slate-400`} defaultValue={item.id} readOnly />
                <Icon name="lock" className="absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
              </div>
            </Field>
            <Field label="Password" required>
              <div className="relative">
                <input type={showPass ? "text" : "password"} className={`${inputClass} pr-9`} placeholder="Enter a password" />
                <button type="button" onClick={() => setShowPass((v) => !v)} className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-200">
                  <Icon name={showPass ? "eyeOff" : "eye"} className="h-4 w-4" />
                </button>
              </div>
            </Field>
          </div>
        </div>

        <div>
          <div className="mb-3 flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">Server</span>
            <span className="rounded-full bg-slate-100 dark:bg-slate-800 px-2 py-0.5 text-[11px] font-semibold text-slate-500 dark:text-slate-400">{servers.length} available</span>
          </div>
          <div className="grid max-h-56 grid-cols-2 gap-2 overflow-y-auto p-1 sm:grid-cols-3">
            {servers.map((sv, i) => {
              const sel = i === server;
              return (
                <button
                  key={sv.host}
                  onClick={() => setServer(i)}
                  className={`relative flex items-center gap-2.5 rounded-xl border p-2.5 text-left transition ${
                    sel ? "border-red-500 bg-red-50 dark:bg-red-500/10 ring-4 ring-red-100" : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60"
                  }`}
                >
                  <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-[10px] font-bold ${sel ? "bg-red-600 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"}`}>{sv.code}</span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-semibold text-slate-900 dark:text-slate-100">{sv.name}</span>
                    <span className="flex items-center gap-1 text-[11px] text-slate-500 dark:text-slate-400"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />Online</span>
                  </span>
                </button>
              );
            })}
          </div>
          <p className="mt-2 truncate font-mono text-xs text-slate-500 dark:text-slate-400">
            <span className="font-sans text-slate-400 dark:text-slate-500">Selected: </span>
            {servers[server].host}
          </p>
        </div>

        {!voice && (
          <div>
            <div className="mb-3 flex items-center justify-between">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">Router ports</span>
              <button className="text-xs font-semibold text-red-600 dark:text-red-400 hover:text-red-700">Use defaults</button>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[["Winbox port", "8291"], ["API port", "8728"], ["Web port", "80"]].map(([n, d]) => (
                <Field key={n} label={n}>
                  <input type="number" className={`${inputClass} font-mono`} placeholder={d} />
                </Field>
              ))}
            </div>
            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">Enter the ports your MikroTik actually uses. Leave blank to use the defaults shown.</p>
          </div>
        )}
      </ModalBody>
      <ModalFooter>
        <Button variant="outline" onClick={onClose}>Cancel</Button>
        <Button icon="check" onClick={onClose}>Save configuration</Button>
      </ModalFooter>
    </Modal>
  );
}
