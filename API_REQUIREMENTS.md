# ROOST Backend — API Requirements

This document lists **every API call the frontend makes**, exactly as written in
`src/api/services.js`. Build the backend to match these routes, request
bodies, and response shapes, and the frontend will work with zero code
changes.

- **Base URL (current):** `http://13.51.13.251:5000/api/v1`
  (set in the frontend's `.env` as `VITE_API_BASE_URL` — update this file's
  base URL note if the EC2 public IP changes again; consider attaching an
  Elastic IP so it stops changing)
- **Auth:** every request automatically sends `Authorization: Bearer <token>`
  if a token is saved in the browser (from a previous login/register
  response). Endpoints marked 🔒 should require and validate this token.
- **Response convention:** the frontend calls `response.data` directly, and
  the shapes below reflect exactly what it reads off that object. Stick to
  these field names.
- **CORS:** must allow `http://localhost:5173` (dev) and your deployed
  frontend origin, with `credentials: true`.
- **Fallback behavior:** every screen falls back to demo data if a call
  fails, so nothing breaks while you build these one at a time — but real
  data will only appear once each route is live and shaped correctly.

---

## Auth

### `POST /auth/register`
Create a new account.

**Request body:**
```json
{
  "name": "Rahul Sharma",
  "email": "rahul@example.com",
  "phone": "9876543210",
  "password": "password123",
  "role": "GUEST"
}
```
`role` is `"GUEST"` or `"OWNER"` (sent by the registration form).

**Response (200/201):**
```json
{
  "token": "eyJhbGciOi...",
  "user": {
    "id": "u_123",
    "name": "Rahul Sharma",
    "email": "rahul@example.com",
    "role": "GUEST"
  }
}
```

---

### `POST /auth/login`
**Request body:**
```json
{ "email": "rahul@example.com", "password": "password123" }
```
**Response:** same shape as register above (`token` + `user`).

---

### `GET /auth/me` 🔒
Returns the currently logged-in user, used to restore a session on page
reload.

**Response:**
```json
{ "user": { "id": "u_123", "name": "Rahul Sharma", "email": "rahul@example.com", "role": "GUEST" } }
```
Return `401` if the token is missing/invalid — the frontend automatically
logs the user out on any `401`.

---

### `POST /auth/logout` 🔒
Invalidate the token server-side if you're tracking sessions. Any 200
response is fine; the frontend also clears its local token regardless.

---

## Properties

### `GET /properties?city=Bengaluru`
Public. `city` query param is optional (free-text filter).

**Response:**
```json
{
  "properties": [
    {
      "id": "p1",
      "slug": "roost-hostel",
      "name": "Roost Hostel",
      "city": "Koramangala, Bengaluru",
      "address": "4th Block, Koramangala, Bengaluru",
      "price": 300,
      "rating": "4.8",
      "reviews": 124,
      "tags": ["Co-living", "Wi-Fi", "AC"],
      "roomsCount": 6,
      "bedsCount": 28,
      "status": "ACTIVE"
    }
  ]
}
```
(A bare array `[ ... ]` is also accepted.)

---

### `GET /properties/:slug`
Public. Full detail for one property page.

**Response:**
```json
{
  "property": {
    "id": "p1",
    "slug": "roost-hostel",
    "name": "Roost Hostel",
    "city": "Koramangala, Bengaluru",
    "price": 300,
    "rating": "4.8",
    "reviews": 124,
    "description": "A calm, sociable base minutes from cafés...",
    "amenities": ["Fast Wi-Fi", "Air conditioning", "Hot water", "Parking", "24/7 security", "Laundry"],
    "tags": ["Co-living", "Wi-Fi", "AC"]
  }
}
```

---

### `POST /properties` 🔒 (OWNER/ADMIN)
Create a property.

**Request body:**
```json
{ "name": "Roost Hostel", "city": "Bengaluru", "price": 300 }
```
**Response:** the created property object (same shape as above).

---

### `PATCH /properties/:id` 🔒 (OWNER/ADMIN)
Partial update — any subset of property fields in the body.

### `DELETE /properties/:id` 🔒 (OWNER/ADMIN)
Removes a property.

---

### `GET /properties/:slug/availability?checkIn=2026-09-03&checkOut=2026-09-10`
Public. Returns bed-level availability for the bed-selection screen.

**Response:**
```json
{
  "rooms": [
    {
      "number": "Room 101",
      "beds": [
        { "code": "101-A", "position": "UPPER", "effectivePrice": 300, "status": "AVAILABLE" },
        { "code": "101-B", "position": "LOWER", "effectivePrice": 350, "status": "AVAILABLE" },
        { "code": "101-C", "position": "UPPER", "effectivePrice": 300, "status": "BOOKED" },
        { "code": "101-D", "position": "LOWER", "effectivePrice": 350, "status": "MAINTENANCE" }
      ]
    }
  ]
}
```
`status` must be one of `AVAILABLE`, `BOOKED`, `MAINTENANCE` (used for badge
colors and to disable booked/maintenance beds in the UI).

---

### `GET /properties/mine` 🔒 (OWNER)
Returns only properties owned by the logged-in user, for the owner's
Property Management screen. Same array shape as `GET /properties`.

---

## Rooms

### `GET /properties/:propertyId/rooms` 🔒 (OWNER/ADMIN)
**Response:** `{ "rooms": [ { "id": "r101", "number": "Room 101", "type": "Co-living · AC", "bedsCount": 4, "status": "ACTIVE" } ] }`

### `POST /properties/:propertyId/rooms` 🔒 (OWNER)
**Request body:** `{ "number": "Room 103", "type": "Single · AC" }`

### `PATCH /rooms/:roomId` 🔒 (OWNER)
Partial update.

### `DELETE /rooms/:roomId` 🔒 (OWNER)

---

## Beds

### `GET /rooms/:roomId/beds` 🔒 (OWNER/ADMIN)
**Response:** `{ "beds": [ { "id": "101-A", "kind": "UPPER", "price": 300, "status": "AVAILABLE" } ] }`

### `POST /rooms/:roomId/beds` 🔒 (OWNER)
**Request body:**
```json
{ "id": "101-E", "kind": "UPPER", "price": 300, "status": "AVAILABLE" }
```

### `PATCH /beds/:bedId` 🔒 (OWNER)
Partial update — used to change price, kind, or status (e.g. mark
`MAINTENANCE`).

### `DELETE /beds/:bedId` 🔒 (OWNER)

---

## Bookings

### `POST /bookings` 🔒
Creates a booking — called from the final "Confirm booking" step.

**Request body:**
```json
{
  "propertyId": "p1",
  "bedId": "101-A",
  "checkIn": "2026-09-03",
  "checkOut": "2026-09-10",
  "guest": {
    "name": "Rahul Sharma",
    "email": "rahul@example.com",
    "phone": "9876543210",
    "arrival": "After 2:00 PM",
    "note": "Arriving by train, might be a little late."
  }
}
```

**Response:**
```json
{
  "code": "ROOST-1001",
  "booking": {
    "code": "ROOST-1001",
    "status": "PENDING",
    "amount": 2100
  }
}
```
`code` is shown to the user immediately on the success screen and used as
the booking reference everywhere else — make it human-readable and unique.

---

### `GET /bookings?...` 🔒
Returns the logged-in guest's own bookings ("My Bookings" screen).

**Response:**
```json
{
  "bookings": [
    {
      "code": "ROOST-1001",
      "guest": "Rahul Sharma",
      "property": "Roost Hostel",
      "room": "Room 101",
      "bed": "101-A",
      "dates": "03–10 Sep 2026",
      "checkIn": "2026-09-03",
      "checkOut": "2026-09-10",
      "status": "PENDING",
      "amount": "₹2,100"
    }
  ]
}
```
`status` should be one of `PENDING`, `CONFIRMED`, `CANCELLED` (drives badge
colors).

### `GET /bookings/:code` 🔒
Single booking detail, same shape as one item above.

### `PATCH /bookings/:code/:action` 🔒
`action` is a path segment like `confirm` or `cancel` (e.g.
`PATCH /bookings/ROOST-1001/confirm`). Body is optional. Return the updated
booking.

### `GET /bookings/owner?...` 🔒 (OWNER/ADMIN)
Same shape as `GET /bookings`, but scoped to every booking across the
owner's properties (used on the Owner Bookings and Admin Bookings screens).

---

## Chat

### `GET /chat/conversations` 🔒
**Response:**
```json
{
  "conversations": [
    {
      "id": "c1",
      "name": "Rahul Sharma",
      "topic": "Late check-in query",
      "online": true,
      "propertyTag": "Roost Hostel",
      "bookingCode": "ROOST-1001",
      "messages": [
        { "from": "them", "text": "Hi, is late check-in available?", "time": "10:32 AM" },
        { "from": "me", "text": "Yes, that's fine.", "time": "10:34 AM" }
      ]
    }
  ]
}
```
`from` is `"me"` (the logged-in owner) or `"them"` (the guest).

### `GET /chat/conversations/:conversationId/messages` 🔒
Returns the message list for one conversation (array shape as `messages`
above).

### `POST /chat/conversations/:conversationId/messages` 🔒
**Request body:** `{ "text": "Sure, I'll let the host team know." }`
**Response:** the created message object.

*(Note: this is currently a simple REST poll/send pattern. If you want live
delivery later, a WebSocket/Socket.IO layer can be added — the frontend chat
screen would need a small update to subscribe, just tell me when it's ready
and I'll wire it in.)*

---

## Notifications

### `GET /notifications` 🔒
**Response:**
```json
{
  "notifications": [
    { "id": "n1", "title": "New booking received", "body": "Rahul Sharma booked Bed 101-A.", "time": "2m ago", "unread": true, "type": "booking" }
  ]
}
```

### `PATCH /notifications/:id/read` 🔒
Marks one notification as read. Any 200 response is fine.

---

## Analytics

### `GET /analytics/owner-summary` 🔒 (OWNER)
Powers the Owner Dashboard's stat cards and occupancy chart.

**Response:**
```json
{
  "stats": [
    { "label": "Total properties", "value": "04" },
    { "label": "Available beds", "value": "32" },
    { "label": "Bookings today", "value": "12" },
    { "label": "Monthly revenue", "value": "₹1.8L" }
  ],
  "occupancy": [55, 72, 48, 84, 68, 93, 75],
  "occupancyLabels": ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
}
```
`occupancy` values are 0–100 (rendered as bar-chart heights).

### `GET /analytics/admin-summary` 🔒 (ADMIN)
Same idea, network-wide:
```json
{
  "stats": [
    { "label": "Verified properties", "value": "128" },
    { "label": "Active guests", "value": "8,420" },
    { "label": "Bookings this month", "value": "2,814" },
    { "label": "Platform GMV", "value": "₹42.8L" }
  ],
  "growth": [30, 42, 38, 55, 61, 58, 70, 78, 74, 85, 91, 96],
  "growthLabels": ["J","F","M","A","M","J","J","A","S","O","N","D"]
}
```

---

## Favorites

### `GET /favorites` 🔒
**Response:** `{ "favorites": ["roost-hostel", "grand-horizon"] }` (array of property slugs).

### `POST /favorites` 🔒
**Request body:** `{ "propertyId": "p1" }`

### `DELETE /favorites/:propertyId` 🔒

---

## Health

### `GET /health`
Already implemented in your `app.js` ✅ — matches what the frontend expects:
```json
{ "success": true, "status": "ok", "ts": "2026-08-24T06:25:41.257Z" }
```
No changes needed here.

---

## Build priority (suggested order)

1. **Auth** (`register`, `login`, `me`) — unlocks everything else, since most
   screens are behind login.
2. **Properties** (`list`, `get`, `availability`) — powers Home, Search,
   Details, and Bed Availability.
3. **Bookings** (`create`, `list`) — completes the guest booking flow
   end-to-end.
4. **Owner: properties/rooms/beds CRUD** — powers the Owner console
   management screens.
5. **Owner/Admin bookings + analytics** — dashboards.
6. **Notifications, favorites, chat** — nice-to-have polish; the frontend
   already looks and works fine on demo data for these in the meantime.

Ship each route incrementally — as soon as one goes live and matches the
shape above, that screen automatically switches from demo data to your real
data with no frontend changes required.
