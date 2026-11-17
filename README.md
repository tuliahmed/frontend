# MHM Soft · Client Portal (React + Tailwind template)

A responsive design template for the client portal. It covers every page and modal, but there's no backend yet: the data comes from `src/data/mock.js`.

## Run it

```bash
npm install
npm run dev            # local dev server
npm run build          # production build → dist/
npm run build:single   # one self-contained index.html (preview/sharing)
```

## Structure

```
src/
  App.jsx               routes
  layout/               AppLayout, Sidebar (drawer / icon rail / full), Topbar
  components/
    Icon.jsx            icon set — <Icon name="router" className="h-4 w-4" />
    ui.jsx              Card, Button, Field, Select, Segmented, StatusBadge,
                        TypeBadge, ServerTag, Th, Pagination, Modal (+Header/Body/Footer)…
  pages/                Dashboard, ConfigureRouter, RouterList (remote | voice | all),
                        Transactions, Balance, Profile, Pricing, SupportTickets,
                        TicketConversation, Documents, Login
  modals/               RenewModal, AccountDetailsModal, RouterConfigModal,
                        BackupModal, RouterTransactionsModal, ConfigVpnModal,
                        CreditModal, NewTicketModal
  data/mock.js          sample data — replace with API calls
```

## Routes

| Path | Page |
|---|---|
| `/` | Dashboard |
| `/configure-router` | Configure VPN (pending accounts → config modal) |
| `/remote-router-list` | Remote routers (ports + actions) |
| `/voice-router-list` | Voice routers (no port columns) |
| `/all-router` | All routers (Remote/Voice tabs, "No ports" for Voice rows) |
| `/transactions` | Transactions |
| `/balance` | Balance + Add credit modal |
| `/profile` | Profile |
| `/pricing` | Pricing (Remote / Voice tabs) |
| `/support`, `/support/:id` | Ticket list, conversation |
| `/documents` | Documentation tabs |
| `/login` | Sign in (outside the layout) |

## Breakpoints

- **Mobile (< 640px):** the sidebar is a slide-in drawer opened from the hamburger. Stat cards stack, tables scroll sideways, and modals open as bottom sheets.
- **Tablet (sm, 640px+):** icon-only sidebar rail and 4 stat cards per row.
- **Desktop (lg, 1024px+):** full sidebar with labels.

## Top bar features

- **Dark / light mode** — `src/hooks/useTheme.js` toggles the `dark` class on `<html>` and remembers the choice in `localStorage`; it falls back to the system setting. Tailwind runs in `darkMode: "class"`.
- **Notifications** — bell with an unread count and a dropdown list (`src/data/notifications.js`).
- **Profile menu** — avatar dropdown with profile, balance, transactions, tickets, a dark-mode switch and **Log out**.
- Both dropdowns use `src/components/Dropdown.jsx`, which closes on outside click or Escape.

## Notes

- **Voice-VPN rows** have `win`, `api` and `web` set to `null`. Tables then show "No ports · Voice VPN", and the edit and config modals switch to their Voice layout (L2TP script with v6/v7 tabs).
- **Theme:** red (`red-600`) is the accent on a slate base. To change it, search-and-replace `red-` with another Tailwind colour.
- **Logos:** the logo is a red "M" placeholder in `Sidebar.jsx` and `Login.jsx`, and the payment logos in `CreditModal.jsx` are text badges. Swap in your own image files.
- **Config scripts:** these are built in `RouterConfigModal.jsx`. Replace them with the script your backend returns.
