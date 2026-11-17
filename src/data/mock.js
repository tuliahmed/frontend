// Sample data shaped like your API responses. Replace with real fetch calls.

export const user = {
  name: "Client",
  initials: "C",
  email: "example@gmail.com",
  phone: "013...",
  company: "BHS",
  address: "Dhaka 1207, Bangladesh",
};

export const balance = { amount: 500, updated: "22 Sep 2026, 08:31", addedThisMonth: 1200, spentThisMonth: 700 };

export const remoteServers = [
  { code: "BD", name: "Bangladesh", host: "serverbd.mhmsoftvpn.com" },
  { code: "UAE", name: "UAE", host: "serveruae.mhmsoftvpn.com" },
  { code: "S6", name: "Server 6", host: "server6.mhmsoftvpn.com" },
];

export const voiceServers = Array.from({ length: 9 }, (_, i) => ({
  code: `S${i + 1}`,
  name: `Server ${i + 1}`,
  host: `server${i + 1}.mhmsoftvpn.com`,
}));

// Remote-VPN rows have ports. Voice-VPN rows come back with win/api/web = null.
export const routers = [
  { s_id: 1539, name: "bone", id: "MHM_R26839402", service: "Remote-VPN", win: 50106, api: 55106, web: 60106, clientWin: 20, clientApi: 20, clientWeb: 20, server: "serverbd.mhmsoftvpn.com", localIp: "172.16.64.35", pass: "123456", price: 180, day: 30, exp: "22/10/2026", status: "Enabled", added: "2026-09-21 18:03:49" },
  { s_id: 1512, name: "bone", id: "MHM_R11041154", service: "Remote-VPN", win: 50103, api: 55103, web: 60103, server: "serverbd.mhmsoftvpn.com", price: 180, day: 30, exp: "08/12/2034", status: "Enabled" },
  { s_id: 1498, name: "test4", id: "MHM_R06108045", service: "Remote-VPN", win: 50294, api: 55294, web: 60294, server: "serveruae.mhmsoftvpn.com", price: 180, day: 30, exp: "21/10/2026", status: "Enabled" },
  { s_id: 1497, name: "test", id: "MHM_R65396192", service: "Remote-VPN", win: 50293, api: 55293, web: 60293, server: "serveruae.mhmsoftvpn.com", price: 180, day: 30, exp: "21/10/2026", status: "Enabled" },
  { s_id: 1450, name: "test2", id: "MHM_R96826803", service: "Remote-VPN", win: 50074, api: 55074, web: 60074, server: "serverbd.mhmsoftvpn.com", price: 180, day: 30, exp: "21/10/2026", status: "Disabled" },
  { s_id: 1411, name: "NTA", id: "MHM_R26330814", service: "Remote-VPN", win: 50008, api: 55008, web: 60008, server: "serverbd.mhmsoftvpn.com", price: 1500, day: 365, exp: "10/02/2027", status: "Enabled" },
  { s_id: 1390, name: "test", id: "MHM_R02473571", service: "Remote-VPN", win: 50073, api: 55073, web: 60073, server: "serverbd.mhmsoftvpn.com", price: 180, day: 30, exp: "10/11/2025", status: "Expired" },
  { s_id: 1377, name: "windows", id: "MHM_R80891037", service: "Remote-VPN", win: 50046, api: 55046, web: 60046, server: "serverbd.mhmsoftvpn.com", price: 180, day: 30, exp: "31/07/2025", status: "Expired" },
  { s_id: 1301, name: "RB", id: "MHM_R61384833", service: "Remote-VPN", win: 50000, api: 55000, web: 60000, server: "serveruae.mhmsoftvpn.com", price: 180, day: 30, exp: "18/06/2026", status: "Expired" },
  { s_id: 1290, name: "PCV", id: "MHM_R37637547", service: "Remote-VPN", win: 50001, api: 55001, web: 60001, server: "serverbd.mhmsoftvpn.com", price: 180, day: 30, exp: "11/01/2027", status: "Disabled" },
  { s_id: 1201, name: "testvpn", id: "MHM_V94363399", service: "Voice-VPN", win: null, api: null, web: null, server: "server4.mhmsoftvpn.com", price: 900, day: 30, exp: "03/08/2025", status: "Expired" },
  { s_id: 1188, name: "Server101", id: "MHM_V67291433", service: "Voice-VPN", win: null, api: null, web: null, server: "server2.mhmsoftvpn.com", price: 900, day: 30, exp: "01/08/2025", status: "Expired" },
  { s_id: 1172, name: "office-voice", id: "MHM_V55120087", service: "Voice-VPN", win: null, api: null, web: null, server: "server6.mhmsoftvpn.com", price: 900, day: 30, exp: "14/11/2026", status: "Enabled" },
];

export const pendingConfigs = {
  remote: [
    { id: "MHM_R19923231", service: "Remote-VPN", status: "Pending" },
    { id: "MHM_R26150614", service: "Remote-VPN", status: "Pending" },
  ],
  voice: [],
};

export const transactions = [
  { id: "DIKOOHCOSA", status: "Completed", amount: 500, currency: "BDT", method: "bKash", date: "2026-09-20", time: "12:35:24" },
  { id: "BJG4HTP58K", status: "Completed", amount: 700, currency: "BDT", method: "bKash", date: "2026-09-02", time: "08:32:17" },
  { id: "BJG2HHE0T0", status: "Completed", amount: 180, currency: "BDT", method: "Nagad", date: "2024-10-15", time: "21:58:05" },
];

export const creditHistory = [
  { date: "22 Sep 2026", time: "08:31", desc: "Credit added via bKash", ref: "DIKOOHCOSA", amount: 500, balance: 500 },
  { date: "21 Sep 2026", time: "18:03", desc: "Renewal — bone (30 days)", ref: "MHM_R26839402", amount: -180, balance: 0 },
  { date: "10 Sep 2026", time: "14:20", desc: "Renewal — test4 (30 days)", ref: "MHM_R06108045", amount: -520, balance: 180 },
  { date: "02 Sep 2026", time: "09:12", desc: "Credit added via bKash", ref: "BJG4HTP58K", amount: 700, balance: 700 },
];

export const pricing = {
  remote: {
    label: "Remote VPN",
    features: ["WinBox port", "API port", "Web port", "24/7 support", "Email support"],
    plans: [
      { name: "Basic", desc: "Pay monthly, cancel anytime", price: "180", period: "month" },
      { name: "Premium", desc: "Three months at a lower rate", price: "500", period: "3 months", perMonth: "167" },
      { name: "Business", desc: "Best price for the whole year", price: "1,500", period: "year", perMonth: "125", featured: true },
    ],
  },
  voice: {
    label: "Voice VPN",
    features: ["IMO, Viber, WhatsApp, Messenger", "Dubai, Qatar, Saudi Arabia servers", "Free installation", "Ultrafast connect", "24/7 support", "Email support"],
    plans: [
      { name: "Basic", desc: "Pay monthly, cancel anytime", price: "900", period: "month" },
      { name: "Premium", desc: "Three months at a lower rate", price: "2,500", period: "3 months", perMonth: "833" },
      { name: "Business", desc: "Best price for the whole year", price: "9,000", period: "year", perMonth: "750", featured: true },
    ],
  },
};

export const tickets = [
  { id: 1042, subject: "Can't connect to router via Winbox", router: "MHM_R26839402", department: "Technical", status: "Answered", priority: "High", time: "10 min ago", unread: 2 },
  { id: 1039, subject: "Voice VPN not working for IMO", router: "MHM_V94363399", department: "Technical", status: "Open", priority: "Medium", time: "3 h ago" },
  { id: 1031, subject: "Payment done but router still expired", router: "MHM_R02473571", department: "Billing", status: "Open", priority: "High", time: "Yesterday" },
  { id: 1020, subject: "How to change API port?", router: "MHM_R06108045", department: "General", status: "Closed", priority: "Low", time: "12 Sep" },
  { id: 1008, subject: "Auto backup not running", router: "MHM_R11041154", department: "Technical", status: "Closed", priority: "Low", time: "02 Sep" },
];

export const ticketMessages = [
  { from: "me", name: "You", time: "11:02", text: "Hi, since this morning I can't connect to my router through Winbox using serverbd.mhmsoftvpn.com:50106. It just times out.", file: { name: "winbox-error.png", size: "184 KB" } },
  { from: "agent", name: "Rakib", time: "11:20", text: "Hi Emamul, thanks for reaching out. The SSTP interface on your router shows as disconnected on our side. Could you check that the MHMSOFT interface is enabled in Winbox → Interfaces?" },
  { from: "system", text: "Status changed to Answered" },
  { from: "me", name: "You", time: "11:24", text: "It was disabled after a reboot. Enabled it now — should I re-run the config script?" },
  { from: "agent", name: "Rakib", time: "11:31", text: "No need — it's connected again on our end. Please try Winbox now and let us know if it works." },
];

export const backups = [
  { name: "bone_2026-09-21.backup", type: "backup", date: "21 Sep 2026, 18:05", size: "412 KB", latest: true },
  { name: "bone_2026-09-21.rsc", type: "export", date: "21 Sep 2026, 18:05", size: "38 KB", latest: true },
  { name: "bone_2026-09-14.backup", type: "backup", date: "14 Sep 2026, 02:00", size: "409 KB" },
  { name: "bone_2026-09-07.backup", type: "backup", date: "07 Sep 2026, 02:00", size: "405 KB" },
];
