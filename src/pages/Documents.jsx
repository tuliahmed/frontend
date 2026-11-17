import { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "../components/Icon.jsx";

const tabs = [
  ["start", "Getting started", "rocket"],
  ["features", "Key features", "star"],
  ["faq", "FAQ", "help"],
  ["support", "Support", "headset"],
];

/* ---------- Content ---------- */

const steps = [
  {
    title: "Account setup",
    text: "Create an account, verify your email, and log in to access the MHMSOFT dashboard.",
  },
  {
    title: "Adding a router",
    text: 'Go to the "Routers" section and click "Add Router". Fill in the details, choose a package and submit. By default your router is set up with these ports:',
    ports: [["Winbox", "8291"], ["API", "8728"], ["Web", "80"]],
    note: 'If your MikroTik uses different ports, open "Router List", click "Edit" and update them.',
  },
  {
    title: "Setting up MHMSOFT configuration",
    list: [
      'Go to the "Routers" section.',
      'Click "Router Configuration" and copy the configuration script.',
      'Log in to your MikroTik with Winbox, open the terminal and paste the script. A new interface named "MHMSOFT" will appear under "Interfaces" — check its status to confirm the connection.',
    ],
    warn: "The script also creates a user for bandwidth monitoring and automatic backups. If this user is deleted, both features stop working.",
  },
  {
    title: "Changing ports",
    list: ['Go to the "Routers" section.', 'Click "Edit" next to the router you want to update.', "Enter the new Winbox, WebFig or API ports."],
    note: "Make sure the ports match the settings on your MikroTik router.",
  },
  {
    title: "Enabling auto backup",
    list: ['Go to the "Routers" section and click "Edit".', 'Scroll to the "Auto Backup" option and enable it.'],
    note: 'The SSH port must be set to 22222. Download the latest backup from "Router List" with "Download Backup".',
  },
  {
    title: "Enabling offline alerts",
    list: ['Go to the "Routers" section and click "Edit" next to your router.', 'Enable the "Offline Alert" option.'],
    note: "You'll get an email as soon as the router goes offline.",
  },
  {
    title: "Bandwidth monitoring",
    text: 'Enter the interface you want to monitor (for example ether1 or wlan1) on the "Router Edit" page. The configuration script creates the user that collects bandwidth data — don\'t delete it.',
  },
];

const features = [
  ["shield", "Remote router access", "Reach your MikroTik through WinBox, WebFig and API without a public IP — even behind NAT. Connect with your server address and assigned port, shown in your router details.", "bg-sky-50 dark:bg-sky-500/10 text-sky-600 dark:text-sky-400"],
  ["archive", "Auto backup", "Scheduled backups of your router configuration over SSH (port 22222). Download the latest backup any time from the Router List.", "bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400"],
  ["chart", "Bandwidth monitoring", "Pick any interface on the Router Edit page and track its bandwidth in real time. The configuration script creates the user that collects this data.", "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"],
  ["bell", "Offline alerts", "Get an email the moment a router disconnects. Alerts can be turned off per router from the Router Edit page.", "bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400"],
  ["terminal", "Configuration script", 'Copy the script from "Router Configuration", paste it into the MikroTik terminal, and the interface and access are set up for you.', "bg-violet-50 dark:bg-violet-500/10 text-violet-600 dark:text-violet-400"],
];

const faqs = [
  ["What happens if my router goes offline?", "You'll receive an email about the disconnection — keep the email in your profile up to date. When the router comes back online it reconnects automatically and you're notified again."],
  ["I can't connect to my MikroTik router remotely. What should I do?", "Check that the Winbox, WebFig and API ports saved in your dashboard match the ports configured on your MikroTik. Wrong ports prevent the connection."],
  ["I removed the service user from my router and backups stopped. What now?", 'The configuration script creates a dedicated user for bandwidth data and backups. Re-run the configuration script from the "Router Configuration" page to restore it.'],
  ["How do I monitor bandwidth on a specific interface?", 'Open the "Router Edit" page and enter the interface name exactly as it appears on your MikroTik. Tracking starts once it\'s saved.'],
  ["How do I enable automatic backups?", 'Turn on "Auto Backup" on the "Router Edit" page. The router\'s SSH port must be 22222. Download the latest backup from the "Router List".'],
  ["I can't establish a connection. What should I check?", null, ["Your Winbox, WebFig and API ports are configured correctly.", "The configuration script ran successfully in the router terminal.", "Your internet connection and router are working."]],
  ["Can I disable offline alerts for a specific router?", 'Yes. Turn off "Offline Alert" on that router\'s "Router Edit" page and you won\'t get emails for it.'],
];

/* ---------- Tab views ---------- */

function GettingStarted() {
  return (
    <ol className="relative space-y-3">
      {steps.map((s, i) => (
        <li key={s.title} className="relative flex gap-4">
          {i < steps.length - 1 && <span className="absolute left-4 top-10 h-[calc(100%-1.5rem)] w-px bg-slate-200 dark:bg-slate-700" />}
          <span className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-900 text-sm font-bold text-white">{i + 1}</span>
          <div className="min-w-0 flex-1 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4">
            <h3 className="font-semibold text-slate-900 dark:text-slate-100">{s.title}</h3>
            {s.text && <p className="mt-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{s.text}</p>}

            {s.ports && (
              <div className="mt-3 flex flex-wrap gap-2">
                {s.ports.map(([n, p]) => (
                  <span key={n} className="inline-flex overflow-hidden rounded-lg border border-slate-200 dark:border-slate-800 text-xs font-semibold">
                    <span className="bg-slate-50 dark:bg-slate-900 px-2.5 py-1.5 text-slate-500 dark:text-slate-400">{n}</span>
                    <span className="bg-white dark:bg-slate-900 px-2.5 py-1.5 font-mono text-slate-900 dark:text-slate-100">{p}</span>
                  </span>
                ))}
              </div>
            )}

            {s.list && (
              <ol className="mt-2 space-y-1.5">
                {s.list.map((item, j) => (
                  <li key={j} className="flex gap-2.5 text-sm text-slate-600 dark:text-slate-400">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-red-50 dark:bg-red-500/10 text-[11px] font-bold text-red-600 dark:text-red-400">{j + 1}</span>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ol>
            )}

            {s.note && <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">{s.note}</p>}

            {s.warn && (
              <div className="mt-3 flex gap-2 rounded-lg border border-amber-200 dark:border-amber-500/30 bg-amber-50 dark:bg-amber-500/10 px-3 py-2 text-xs text-amber-800 dark:text-amber-300">
                <Icon name="info" className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                {s.warn}
              </div>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}

function KeyFeatures() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      {features.map(([icon, title, text, tone]) => (
        <div key={title} className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 transition hover:-translate-y-0.5 hover:shadow-md">
          <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${tone}`}>
            <Icon name={icon} className="h-5 w-5" />
          </div>
          <h3 className="mt-4 font-semibold text-slate-900 dark:text-slate-100">{title}</h3>
          <p className="mt-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{text}</p>
        </div>
      ))}
    </div>
  );
}

function Faq() {
  return (
    <div className="divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
      {faqs.map(([q, a, list], i) => (
        <details key={q} className="group" open={i === 0}>
          <summary className="flex cursor-pointer list-none items-center gap-3 px-5 py-4 hover:bg-slate-50 dark:hover:bg-slate-800/60 [&::-webkit-details-marker]:hidden">
            <span className="flex-1 text-sm font-semibold text-slate-900 dark:text-slate-100">{q}</span>
            <Icon name="chevron" className="h-4 w-4 shrink-0 text-slate-400 dark:text-slate-500 transition group-open:rotate-180" />
          </summary>
          <div className="px-5 pb-4 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
            {a && <p>{a}</p>}
            {list && (
              <>
                <p>Make sure that:</p>
                <ul className="mt-2 space-y-1.5">
                  {list.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-red-500" />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-2">If it still doesn't work, contact support with the error details.</p>
              </>
            )}
          </div>
        </details>
      ))}
    </div>
  );
}

function Support() {
  return (
    <div className="relative overflow-hidden rounded-xl bg-slate-900 p-6 text-white sm:p-8">
      <div className="absolute -right-10 -top-16 h-48 w-48 rounded-full bg-red-600/40 blur-3xl" />
      <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/10">
          <Icon name="headset" className="h-6 w-6" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold">Need help?</h3>
          <p className="mt-1 max-w-2xl text-sm leading-relaxed text-slate-300">
            If the guide and FAQ didn't solve it, open a support ticket from your dashboard. Our team will get back to you and help sort it out.
          </p>
        </div>
        <Link to="/support" className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-white dark:bg-slate-900 px-5 py-2.5 text-sm font-semibold text-slate-900 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800">
          Open a ticket
          <Icon name="arrow" className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}

/* ---------- Page ---------- */

export default function Documents() {
  const [tab, setTab] = useState("start");

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-slate-200/70 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-sm sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Documentation</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">Everything you need to set up and manage your routers.</p>
          </div>
          <div className="flex w-full overflow-x-auto rounded-xl bg-slate-100 dark:bg-slate-800 p-1 sm:w-auto">
            {tabs.map(([key, label, icon]) => (
              <button
                key={key}
                onClick={() => setTab(key)}
                className={`inline-flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold transition ${
                  tab === key ? "bg-white dark:bg-slate-900 text-red-600 dark:text-red-400 shadow-sm" : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                <Icon name={icon} className="h-4 w-4" />
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {tab === "start" && <GettingStarted />}
      {tab === "features" && <KeyFeatures />}
      {tab === "faq" && <Faq />}
      {tab === "support" && <Support />}
    </div>
  );
}
