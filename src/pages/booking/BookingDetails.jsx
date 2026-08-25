import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

export default function BookingDetails() {
  const navigate = useNavigate();
  const { code } = useParams();

  const [showQR, setShowQR] = useState(false);

  // Demo booking data
  // Later this will come from GET /api/v1/bookings/:code
  const booking = {
    bookingCode: code || "ROOST-2026-001",
    property: "Roost Hostel",
    location: "Satara, Maharashtra",
    room: "Room 101",
    bed: "101-A",
    position: "UPPER",
    checkIn: "25 Aug 2026",
    checkOut: "28 Aug 2026",
    nights: 3,
    guestName: "Prakash Patil",
    guestPhone: "********53",
    guestEmail: "prakash@example.com",
    amount: 1200,
    paymentMethod: "UPI",
    paymentStatus: "PAID",
    bookingStatus: "CONFIRMED",
  };

  const handleCancel = () => {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this booking?"
    );

    if (!confirmed) return;

    // Later:
    // PATCH /api/v1/bookings/:code/cancel

    alert("Demo: Booking cancellation API will be connected next.");
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Roost
            </h1>

            <p className="text-sm text-slate-500">
              Booking details
            </p>
          </div>

          <button
            onClick={() => navigate("/my-bookings")}
            className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            ← My Bookings
          </button>
        </div>
      </header>

      {/* Main */}
      <main className="mx-auto max-w-6xl px-6 py-8">
        {/* Title */}
        <div className="mb-6">
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-3xl font-bold text-slate-900">
              Booking Details
            </h2>

            <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">
              {booking.bookingStatus}
            </span>
          </div>

          <p className="mt-2 text-sm text-slate-500">
            Booking ID:{" "}
            <span className="font-semibold text-slate-700">
              {booking.bookingCode}
            </span>
          </p>
        </div>

        {/* Main grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left */}
          <div className="space-y-6 lg:col-span-2">
            {/* Property */}
            <section className="overflow-hidden rounded-2xl border bg-white shadow-sm">
              <div className="flex h-48 items-center justify-center bg-slate-200 text-slate-500">
                Property Image
              </div>

              <div className="p-6">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">
                      {booking.property}
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      📍 {booking.location}
                    </p>
                  </div>

                  <div className="rounded-xl bg-teal-50 px-4 py-2 text-center">
                    <p className="text-xs text-teal-600">
                      Total
                    </p>

                    <p className="text-xl font-bold text-teal-700">
                      ₹{booking.amount}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Stay details */}
            <section className="rounded-2xl border bg-white p-6 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900">
                Stay Details
              </h3>

              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <Info
                  label="Check-in"
                  value={booking.checkIn}
                />

                <Info
                  label="Check-out"
                  value={booking.checkOut}
                />

                <Info
                  label="Room"
                  value={booking.room}
                />

                <Info
                  label="Bed"
                  value={`${booking.bed} • ${booking.position}`}
                />

                <Info
                  label="Duration"
                  value={`${booking.nights} nights`}
                />

                <Info
                  label="Booking ID"
                  value={booking.bookingCode}
                />
              </div>
            </section>

            {/* Guest */}
            <section className="rounded-2xl border bg-white p-6 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900">
                Guest Information
              </h3>

              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <Info
                  label="Guest Name"
                  value={booking.guestName}
                />

                <Info
                  label="Phone"
                  value={booking.guestPhone}
                />

                <Info
                  label="Email"
                  value={booking.guestEmail}
                />
              </div>
            </section>

            {/* Payment */}
            <section className="rounded-2xl border bg-white p-6 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900">
                Payment
              </h3>

              <div className="mt-5 grid gap-5 sm:grid-cols-3">
                <Info
                  label="Amount"
                  value={`₹${booking.amount}`}
                />

                <Info
                  label="Method"
                  value={booking.paymentMethod}
                />

                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    Payment Status
                  </p>

                  <span className="mt-2 inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">
                    {booking.paymentStatus}
                  </span>
                </div>
              </div>
            </section>
          </div>

          {/* Right */}
          <aside className="space-y-6">
            {/* QR */}
            <section className="rounded-2xl border bg-white p-6 text-center shadow-sm">
              <h3 className="text-lg font-bold text-slate-900">
                Booking QR
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Show this QR at check-in
              </p>

              <div className="mx-auto mt-5 flex h-48 w-48 items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50">
                <div className="text-center">
                  <div className="text-5xl">▦</div>

                  <p className="mt-2 text-xs text-slate-400">
                    QR Preview
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowQR(true)}
                className="mt-5 w-full rounded-xl bg-teal-600 px-4 py-3 font-semibold text-white hover:bg-teal-700"
              >
                View QR
              </button>

              <button
                onClick={() =>
                  alert("Demo: QR download will be connected.")
                }
                className="mt-3 w-full rounded-xl border border-slate-300 px-4 py-3 font-semibold text-slate-700 hover:bg-slate-50"
              >
                Download QR
              </button>
            </section>

            {/* Status */}
            <section className="rounded-2xl border bg-white p-6 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900">
                Booking Status
              </h3>

              <div className="mt-5 space-y-4">
                <StatusItem
                  title="Booking Created"
                  description="Booking successfully created"
                  active
                />

                <StatusItem
                  title="Payment Completed"
                  description="Payment received successfully"
                  active
                />

                <StatusItem
                  title="Booking Confirmed"
                  description="Your bed is reserved"
                  active
                />

                <StatusItem
                  title="Check-in"
                  description="Pending"
                />
              </div>
            </section>

            {/* Cancel */}
            {booking.bookingStatus !== "CANCELLED" && (
              <button
                onClick={handleCancel}
                className="w-full rounded-xl border border-red-200 bg-white px-4 py-3 font-semibold text-red-600 hover:bg-red-50"
              >
                Cancel Booking
              </button>
            )}
          </aside>
        </div>
      </main>

      {/* QR Modal */}
      {showQR && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-5">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-slate-900">
                Booking QR
              </h3>

              <button
                onClick={() => setShowQR(false)}
                className="rounded-lg px-3 py-2 text-slate-500 hover:bg-slate-100"
              >
                ✕
              </button>
            </div>

            <div className="mt-6 flex flex-col items-center">
              <div className="flex h-64 w-64 items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50">
                <div className="text-center">
                  <div className="text-7xl">▦</div>

                  <p className="mt-3 text-sm font-semibold text-slate-700">
                    {booking.bookingCode}
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    QR will be generated from booking data
                  </p>
                </div>
              </div>

              <p className="mt-5 text-center text-sm text-slate-500">
                Owner can scan this QR to verify your booking.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* --------------------------------
   Small Components
-------------------------------- */

function Info({ label, value }) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
        {label}
      </p>

      <p className="mt-1 font-semibold text-slate-800">
        {value}
      </p>
    </div>
  );
}

function StatusItem({
  title,
  description,
  active = false,
}) {
  return (
    <div className="flex gap-3">
      <div
        className={`mt-1 h-3 w-3 rounded-full ${
          active
            ? "bg-teal-600"
            : "bg-slate-300"
        }`}
      />

      <div>
        <p className="text-sm font-semibold text-slate-800">
          {title}
        </p>

        <p className="text-xs text-slate-500">
          {description}
        </p>
      </div>
    </div>
  );
}