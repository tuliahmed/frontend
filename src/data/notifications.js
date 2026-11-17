export const notifications = [
  { id: 1, type: "alert", title: "Router offline", text: "bone (MHM_R26839402) disconnected", time: "2 min ago", unread: true },
  { id: 2, type: "headset", title: "Support replied", text: "Rakib answered ticket #1042", time: "18 min ago", unread: true },
  { id: 3, type: "calendar", title: "Expiring soon", text: "test4 expires in 7 days", time: "3 h ago", unread: true },
  { id: 4, type: "wallet", title: "Credit added", text: "৳500 added via bKash", time: "Yesterday" },
  { id: 5, type: "archive", title: "Backup completed", text: "Weekly backup for 6 routers", time: "21 Sep" },
];

export const notificationTone = {
  alert: "bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400",
  headset: "bg-sky-50 text-sky-600 dark:bg-sky-500/10 dark:text-sky-400",
  calendar: "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400",
  wallet: "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400",
  archive: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300",
};
