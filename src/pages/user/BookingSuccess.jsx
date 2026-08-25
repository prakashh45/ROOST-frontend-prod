import { useLocation, useNavigate } from "react-router-dom";

export default function BookingSuccess() {
  const navigate = useNavigate();
  const location = useLocation();

  const booking = location.state?.booking || {
    propertyName: "Roost Hostel",
    roomName: "Room 101",
    bedCode: "101-A",
    totalAmount: 400,
    paymentMethod: "UPI",
    paymentStatus: "PAID",
    bookingCode: "ROOST-DEMO-001",
  };

  const bookingCode =
    booking.bookingCode ||
    booking.bookingId ||
    "ROOST-DEMO-001";

  // Demo QR URL for now.
  // Later this will come from backend after booking creation.
  const qrData = encodeURIComponent(
    JSON.stringify({
      bookingCode,
      bedCode: booking.bedCode,
    })
  );

  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${qrData}`;

  const handleDownloadQR = async () => {
    try {
      const response = await fetch(qrUrl);
      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = url;
      link.download = `${bookingCode}-QR.png`;

      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("QR DOWNLOAD ERROR:", error);
    }
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
              Booking confirmed
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
      <main className="mx-auto max-w-5xl px-6 py-10">
        {/* Success */}
        <section className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-teal-100">
            <span className="text-3xl text-teal-600">
              ✓
            </span>
          </div>

          <h2 className="mt-5 text-3xl font-bold text-slate-900">
            Booking confirmed!
          </h2>

          <p className="mt-2 text-slate-500">
            Your stay has been successfully booked.
          </p>
        </section>

        {/* Content */}
        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_360px]">
          {/* Booking Details */}
          <section className="rounded-2xl bg-white p-6 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900">
              Booking details
            </h3>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <div>
                <p className="text-xs text-slate-500">
                  Booking ID
                </p>

                <p className="mt-1 font-bold text-teal-600">
                  {bookingCode}
                </p>
              </div>

              <div>
                <p className="text-xs text-slate-500">
                  Property
                </p>

                <p className="mt-1 font-semibold text-slate-900">
                  {booking.propertyName}
                </p>
              </div>

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
                  Payment method
                </p>

                <p className="mt-1 font-semibold text-slate-900">
                  {booking.paymentMethod}
                </p>
              </div>

              <div>
                <p className="text-xs text-slate-500">
                  Payment status
                </p>

                <p className="mt-1 font-semibold text-teal-600">
                  {booking.paymentStatus || "PAID"}
                </p>
              </div>
            </div>

            <div className="mt-6 border-t pt-5">
              <div className="flex items-center justify-between">
                <span className="text-slate-500">
                  Total amount
                </span>

                <span className="text-2xl font-bold text-slate-900">
                  ₹{booking.totalAmount || 0}
                </span>
              </div>
            </div>

            {/* Important */}
            <div className="mt-6 rounded-xl border border-blue-200 bg-blue-50 p-4">
              <p className="font-semibold text-blue-900">
                Keep your booking QR
              </p>

              <p className="mt-1 text-sm text-blue-700">
                Show this QR code to the property owner
                during check-in.
              </p>
            </div>
          </section>

          {/* QR */}
          <section className="rounded-2xl bg-white p-6 text-center shadow-sm">
            <h3 className="text-xl font-bold text-slate-900">
              Your booking QR
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Scan this at check-in
            </p>

            <div className="mx-auto mt-6 flex w-fit rounded-2xl border bg-white p-4">
              <img
                src={qrUrl}
                alt="Booking QR code"
                className="h-56 w-56"
              />
            </div>

            <p className="mt-4 text-sm font-semibold text-slate-900">
              {bookingCode}
            </p>

            <button
              onClick={handleDownloadQR}
              className="mt-5 w-full rounded-xl border border-slate-300 px-5 py-3 font-semibold text-slate-700 hover:bg-slate-50"
            >
              Download QR
            </button>
          </section>
        </div>

        {/* Actions */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            onClick={() => navigate("/my-bookings")}
            className="rounded-xl bg-teal-600 px-6 py-3 font-semibold text-white hover:bg-teal-700"
          >
            View my bookings
          </button>

          <button
            onClick={() => navigate("/")}
            className="rounded-xl border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 hover:bg-slate-50"
          >
            Back to home
          </button>
        </div>
      </main>
    </div>
  );
}