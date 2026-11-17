import { useState } from "react";
import Icon from "../components/Icon.jsx";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Segmented, Hint } from "../components/ui.jsx";

// Replace these generators with the real script your backend returns.
const remoteScript = (r) => `/interface sstp-client
add connect-to=${r.server} disabled=no name=SSTP-MHMR-VPN user=${r.id} password=${r.pass ?? "******"} verify-server-certificate=no`;

const voiceScript = (r, v) => `/ip firewall address-list
add address=192.12.31.0/24 list=WhatsApp+imo
add address=104.36.224.0/24 list=WhatsApp+imo
add address=5.150.156.0/24 list=WhatsApp+imo
add address=38.0.0.0/8 list=WhatsApp+imo
add address=m.imo.im list=WhatsApp+imo
add address=imo.im list=WhatsApp+imo${v === "v7" ? "\n/routing table\nadd disabled=no fib name=WhatsApp+imo" : ""}
/ip firewall mangle
add action=mark-routing chain=prerouting dst-address-list=WhatsApp+imo new-routing-mark=WhatsApp+imo
/interface l2tp-client
add connect-to=${r.server} disabled=no name=L2TP-MHMV user=${r.id}
/ip route
add ${v === "v7" ? "dst-address=0.0.0.0/0 routing-table" : "routing-mark"}=WhatsApp+imo gateway=10.50.70.1
/ip firewall nat
add chain=srcnat action=masquerade routing-mark=WhatsApp+imo`;

function Code({ text }) {
  return (
    <pre className="max-h-80 overflow-auto whitespace-pre-wrap break-all px-4 py-3 font-mono text-[12.5px] leading-relaxed text-slate-100">
      {text.split("\n").map((line, i) =>
        line.startsWith("/") ? (
          <div key={i} className="text-sky-400">{line}</div>
        ) : (
          <div key={i}>
            <span className="text-emerald-400">{line.split(" ")[0]}</span>{" "}
            {line
              .split(" ")
              .slice(1)
              .join(" ")
              .split(/(\S+=)/)
              .map((p, j) => (p.endsWith("=") ? <span key={j} className="text-slate-400">{p}</span> : <span key={j} className="text-amber-200">{p}</span>))}
          </div>
        )
      )}
    </pre>
  );
}

export default function RouterConfigModal({ router, onClose }) {
  const [version, setVersion] = useState("v6");
  const [copied, setCopied] = useState(false);
  if (!router) return null;

  const voice = router.service === "Voice-VPN";
  const script = voice ? voiceScript(router, version) : remoteScript(router);
  const copy = () => {
    navigator.clipboard?.writeText(script);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <Modal open onClose={onClose} size={voice ? "xl" : "lg"}>
      <ModalHeader icon="terminal" title="Router configuration" subtitle={voice ? "Voice VPN · WhatsApp + imo routing" : "Paste this into your MikroTik terminal."} onClose={onClose} />
      <ModalBody className="space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex flex-wrap gap-x-4 gap-y-1 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800 px-3 py-2 text-xs">
            <span><span className="text-slate-500 dark:text-slate-400">User </span><span className="font-mono font-semibold">{router.id}</span></span>
            <span><span className="text-slate-500 dark:text-slate-400">Server </span><span className="font-mono font-semibold">{router.server}</span></span>
            <span><span className="text-slate-500 dark:text-slate-400">Type </span><span className="font-semibold text-slate-900 dark:text-white">{voice ? "L2TP" : "SSTP"}</span></span>
          </div>
          {voice && (
            <div className="ml-auto">
              <Segmented value={version} onChange={setVersion} options={[{ value: "v6", label: "MikroTik v6.xx" }, { value: "v7", label: "MikroTik v7.xx" }]} />
            </div>
          )}
        </div>

        <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900">
          <div className="flex items-center justify-between border-b border-slate-800 px-4 py-2">
            <div className="flex items-center gap-2">
              <span className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
              </span>
              <span className="ml-2 text-[11px] font-semibold text-slate-400">terminal · RouterOS {voice ? version : "v6 & v7"}</span>
            </div>
            <button onClick={copy} className="inline-flex items-center gap-1.5 rounded-md bg-white/10 px-2.5 py-1 text-xs font-semibold text-white hover:bg-white/20">
              <Icon name={copied ? "check" : "copy"} className="h-3.5 w-3.5" />
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
          <Code text={script} />
        </div>

        <Hint>
          {voice
            ? "Check your RouterOS version in Winbox (System → Resources) and use the matching tab — v7 uses a routing table instead of routing-mark."
            : "Open Winbox → New Terminal, paste the command and press Enter."}
        </Hint>
      </ModalBody>
      <ModalFooter>
        <Button variant="outline" onClick={onClose}>Close</Button>
        <Button icon={copied ? "check" : "copy"} onClick={copy}>{copied ? "Copied" : "Copy command"}</Button>
      </ModalFooter>
    </Modal>
  );
}
