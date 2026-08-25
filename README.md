# ROOST — Hostel / PG Booking Frontend

Production-quality React + Vite + Tailwind frontend for ROOST, a bed-booking
platform for hostels, PGs and co-living spaces.

## Stack
- React 18 + React Router 6
- Vite 5
- Tailwind CSS 3
- Axios (API layer with graceful demo-data fallback)
- lucide-react (icons), qrcode.react (QR codes)

## Getting started
```bash
npm install
cp .env.example .env   # set VITE_API_BASE_URL if different
npm run dev             # http://localhost:5173
```

## Build
```bash
npm run build            # outputs to dist/
npm run preview          # preview the production build locally
```

## Project structure
```
src/
  api/            axios client + grouped service calls (auth, properties, rooms, beds, bookings, chat, notifications, analytics, favorites)
  context/        AuthContext (session + role), AppStateContext (favorites/notifications/toasts), BookingContext (multi-step booking draft)
  hooks/          useApi — fetch-with-graceful-fallback-to-demo-data hook used by every data screen
  components/
    layout/       Navbar, Footer, ProtectedRoute, DashboardLayout (owner/admin sidebar shell), FlowLayout (booking steps)
    ui/           Button, Badge, Modal, LoadingState, EmptyState, ErrorState, ApiNotice, Toasts
    property/     PropertyCard, FilterSidebar
    booking/      BookingSummary, BookingTicket
    owner/        ManageTable (shared data-table used by property/room/booking + admin management screens)
    icons/        single re-export point for lucide-react icons
  data/demo/      realistic demo data used as a safety net wherever a backend endpoint isn't ready yet
  pages/          one file per screen, grouped by area (auth, properties, booking, owner, admin, static)
```

## How the API integration works
Every screen that needs data uses the `useApi` hook:
```js
const { data, loading, error } = useApi(() => propertyApi.list(), demoProperties, { transform: ... });
```
- It calls the real endpoint first (`VITE_API_BASE_URL` + path from `src/api/services.js`).
- If the call fails (endpoint not built yet, network error, timeout), it falls back to clean demo data and shows a small, non-scary blue notice (`ApiNotice`) instead of breaking the page.
- As backend endpoints go live, nothing in the UI needs to change — the real data simply starts flowing in.

To point at a different backend, edit `.env`:
```
VITE_API_BASE_URL=http://16.192.175.38:5000/api/v1
```

## Role-based access (AWS-console style)
Marketing pages (`/`, `/properties`, `/about`, `/pricing`, `/contact`) are public.
The moment a "service" is opened — availability, booking flow, my bookings,
the owner console, or the admin console — `ProtectedRoute` checks the
session and role:
- Not signed in → redirected to `/login`, then sent back to the page they wanted.
- Signed in but wrong role → redirected to the console that matches their role.

Change access rules in `src/App.jsx` by adjusting the `roles` prop passed to each `ProtectedRoute`.

## Adding a new screen
1. Add a page component under `src/pages/<area>/YourPage.jsx`.
2. Add its route in `src/App.jsx` (wrap in `<ProtectedRoute>` if it should require sign-in).
3. If it needs owner/admin sidebar nav, add an entry to `src/pages/owner/nav.js` or `src/pages/admin/nav.js`.
4. If it needs data, add a service function in `src/api/services.js` and demo data in `src/data/demo/properties.js`, then wire it with `useApi`.

## Deployment (GitHub Actions → EC2 → Nginx)
- `.github/workflows/deploy.yml` builds the app and rsyncs `dist/` to
  `/var/www/roost-frontend` on the EC2 instance, then reloads Nginx.
- `nginx.roost.conf` is an example server block with SPA fallback
  (`try_files $uri /index.html`) so React Router routes work on refresh.
- Required GitHub secrets: `VITE_API_BASE_URL`, `EC2_HOST`, `EC2_USER`, `EC2_SSH_KEY`.
