import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const demoBookings = [
  {
    bookingCode: "ROOST-DEMO-001",
    propertyName: "Roost Hostel",
    location: "Satara, Maharashtra",
    roomName: "Room 101",
    bedCode: "101-A",
    checkIn: "2026-08-28",
    checkOut: "2026-08-29",
    totalAmount: 400,
    paymentMethod: "UPI",
    paymentStatus: "PAID",
    status: "CONFIRMED",
  },
];

export default function MyBookings() {
  const navigate = useNavigate();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState(null);

  useEffect(() => {
    // Demo data for now.
    // Backend API will be connected after the UI flow is completed.
    const timer = setTimeout(() => {
      setBookings(demoBookings);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const getStatusClass = (status) => {
    switch (status) {
      case "CONFIRMED":
        return "bg-green-100 text-green-700";

      case "PENDING":
        return "bg-yellow-100 text-yellow-700";

      case "CANCELLED":
        return "bg-red-100 text-red-700";

      case "REJECTED":
        return "bg-red-100 text-red-700";

      default:
        return "bg-slate-100 text-slate-600";
    }
  };

  const getPaymentClass = (status) => {
    if (status === "PAID") {
      return "text-green-600";
    }

    return "text-yellow-600";
  };

  const openQR = (booking) => {
    navigate("/booking/success", {
      state: {
        booking: {
          ...booking,
          bookingCode: booking.bookingCode,
        },
      },
    });
  };

  const cancelBooking = (booking) => {
    const confirmed = window.confirm(
      `Cancel booking ${booking.bookingCode}?`
    );

    if (!confirmed) return;

    // Demo cancellation for now.
    // Real PATCH API will be connected later.
    setBookings((prev) =>
      prev.map((item) =>
        item.bookingCode === booking.bookingCode
          ? {
              ...item,
              status: "CANCELLED",
            }
          : item
      )
    );
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Roost
            </h1>

            <p className="text-sm text-slate-500">
              My bookings
            </p>
          </div>

          <button
            onClick={() => navigate("/")}
            className="rounded-lg border px-4 py-2 text-sm font-medium hover:bg-slate-50"
          >
            Home
          </button>
        </div>
      </header>

      {/* Main */}
      <main className="mx-auto max-w-7xl px-6 py-10">
        {/* Title */}
        <section>
          <h2 className="text-3xl font-bold text-slate-900">
            My bookings
          </h2>

          <p className="mt-2 text-slate-500">
            Manage your stays and booking details.
          </p>
        </section>

        {/* Loading */}
        {loading && (
          <div className="mt-8 rounded-2xl bg-white p-10 text-center shadow-sm">
            <p className="text-slate-500">
              Loading your bookings...
            </p>
          </div>
        )}

        {/* Empty */}
        {!loading && bookings.length === 0 && (
          <div className="mt-8 rounded-2xl bg-white p-10 text-center shadow-sm">
            <div className="text-5xl">🛏️</div>

            <h3 className="mt-4 text-xl font-bold text-slate-900">
              No bookings yet
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Find a stay and make your first booking.
            </p>

            <button
              onClick={() => navigate("/properties")}
              className="mt-6 rounded-xl bg-teal-600 px-5 py-3 font-semibold text-white hover:bg-teal-700"
            >
              Find a stay
            </button>
          </div>
        )}

        {/* Bookings */}
        {!loading && bookings.length > 0 && (
          <div className="mt-8 grid gap-6">
            {bookings.map((booking) => (
              <article
                key={booking.bookingCode}
                className="overflow-hidden rounded-2xl bg-white shadow-sm"
              >
                {/* Top */}
                <div className="flex flex-col gap-4 border-b p-6 md:flex-row md:items-center md:justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="text-xl font-bold text-slate-900">
                        {booking.propertyName}
                      </h3>

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusClass(
                          booking.status
                        )}`}
                      >
                        {booking.status}
                      </span>
                    </div>

                    <p className="mt-1 text-sm text-slate-500">
                      {booking.location}
                    </p>
                  </div>

                  <div className="text-left md:text-right">
                    <p className="text-xs text-slate-500">
                      Booking ID
                    </p>

                    <p className="font-bold text-teal-600">
                      {booking.bookingCode}
                    </p>
                  </div>
                </div>

                {/* Details */}
                <div className="grid gap-6 p-6 sm:grid-cols-2 lg:grid-cols-4">
                  <div>
                    <p className="text-xs text-slate-500">
                      Room
                    </p>

                    <p className="mt-1 font-semibold text-slate-900">
                      {booking.roomName}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-500">
                      Bed
                    </p>

                    <p className="mt-1 font-semibold text-slate-900">
                      {booking.bedCode}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-500">
                      Check-in
                    </p>

                    <p className="mt-1 font-semibold text-slate-900">
                      {booking.checkIn}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-500">
                      Check-out
                    </p>

                    <p className="mt-1 font-semibold text-slate-900">
                      {booking.checkOut}
                    </p>
                  </div>
                </div>

                {/* Payment */}
                <div className="border-t bg-slate-50 px-6 py-5">
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="flex flex-wrap gap-8">
                      <div>
                        <p className="text-xs text-slate-500">
                          Amount
                        </p>

                        <p className="text-lg font-bold text-slate-900">
                          ₹{booking.totalAmount}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-slate-500">
                          Payment
                        </p>

                        <p className="font-semibold text-slate-900">
                          {booking.paymentMethod}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-slate-500">
                          Payment status
                        </p>

                        <p
                          className={`font-semibold ${getPaymentClass(
                            booking.paymentStatus
                          )}`}
                        >
                          {booking.paymentStatus}
                        </p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() =>
                          setSelectedBooking(booking)
                        }
                        className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
                      >
                        Details
                      </button>

                      {booking.status !== "CANCELLED" && (
                        <button
                          onClick={() => openQR(booking)}
                          className="rounded-xl bg-teal-600 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-700"
                        >
                          View QR
                        </button>
                      )}

                      {booking.status !== "CANCELLED" &&
                        booking.status !== "COMPLETED" && (
                          <button
                            onClick={() =>
                              cancelBooking(booking)
                            }
                            className="rounded-xl border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50"
                          >
                            Cancel
                          </button>
                        )}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>

      {/* Details Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-slate-900">
                Booking details
              </h3>

              <button
                onClick={() => setSelectedBooking(null)}
                className="rounded-lg px-3 py-2 text-slate-500 hover:bg-slate-100"
              >
                ✕
              </button>
            </div>

            <div className="mt-6 space-y-4">
              <div className="flex justify-between border-b pb-3">
                <span className="text-slate-500">
                  Booking ID
                </span>

                <span className="font-semibold">
                  {selectedBooking.bookingCode}
                </span>
              </div>

              <div className="flex justify-between border-b pb-3">
                <span className="text-slate-500">
                  Property
                </span>

                <span className="font-semibold">
                  {selectedBooking.propertyName}
                </span>
              </div>

              <div className="flex justify-between border-b pb-3">
                <span className="text-slate-500">
                  Room
                </span>

                <span className="font-semibold">
                  {selectedBooking.roomName}
                </span>
              </div>

              <div className="flex justify-between border-b pb-3">
                <span className="text-slate-500">
                  Bed
                </span>

                <span className="font-semibold">
                  {selectedBooking.bedCode}
                </span>
              </div>

              <div className="flex justify-between border-b pb-3">
                <span className="text-slate-500">
                  Stay
                </span>

                <span className="font-semibold">
                  {selectedBooking.checkIn} →{" "}
                  {selectedBooking.checkOut}
                </span>
              </div>

              <div className="flex justify-between border-b pb-3">
                <span className="text-slate-500">
                  Status
                </span>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusClass(
                    selectedBooking.status
                  )}`}
                >
                  {selectedBooking.status}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-500">
                  Total
                </span>

                <span className="text-lg font-bold">
                  ₹{selectedBooking.totalAmount}
                </span>
              </div>
            </div>

            <button
              onClick={() => setSelectedBooking(null)}
              className="mt-6 w-full rounded-xl bg-teal-600 px-5 py-3 font-semibold text-white hover:bg-teal-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}