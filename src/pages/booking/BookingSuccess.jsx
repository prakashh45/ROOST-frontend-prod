import { Link } from "react-router-dom";
import { Check } from "../../components/icons";
import BookingTicket from "../../components/booking/BookingTicket";
import Brand from "../../components/layout/Navbar";
import { useBooking } from "../../context/BookingContext";
import { QRCodeSVG } from "qrcode.react";

export default function BookingSuccess() {
  const { draft, nights } = useBooking();

  const bookingCode =
    draft.bookingResult?.code ||
    draft.bookingResult?.booking?.code ||
    "ROOST-BOOKING";

  const qrValue = JSON.stringify({
    type: "ROOST_BOOKING",
    bookingCode,
    propertyId: draft.property?.id,
    propertyName: draft.property?.name,
    bedId: draft.bed?.id,
    checkIn: draft.checkIn,
    checkOut: draft.checkOut,
  });

  return (
    <main className="grid min-h-screen place-items-center bg-grid bg-ink-50 px-4 py-10">
      <article className="card w-full max-w-xl p-8 text-center animate-fadeIn">

        <div className="mb-3 flex justify-center">
          <Brand />
        </div>

        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-100 text-emerald-600">
          <Check size={30} />
        </div>

        <h1 className="mt-4 text-2xl font-extrabold text-ink-900">
          You're booked!
        </h1>

        <p className="mt-1 text-sm text-ink-500">
          Your bed is reserved. Show this QR code at check-in.
        </p>

        {/* Booking Code */}
        <div className="mt-5 rounded-xl border border-ink-200 bg-ink-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">
            Booking code
          </p>

          <p className="mt-1 text-xl font-extrabold tracking-wider text-brand-600">
            {bookingCode}
          </p>
        </div>

        {/* QR Code */}
        <div className="mt-6 flex flex-col items-center">
          <div className="rounded-2xl border border-ink-200 bg-white p-5 shadow-sm">
            <QRCodeSVG
              value={qrValue}
              size={220}
              level="M"
              includeMargin
            />
          </div>

          <p className="mt-3 text-sm font-semibold text-ink-700">
            Scan this QR at check-in
          </p>

          <p className="mt-1 max-w-sm text-xs text-ink-400">
            Keep this QR code available on your phone when you arrive.
          </p>
        </div>

        {/* Booking Ticket */}
        <div className="mt-6 text-left">
          <BookingTicket
            draft={draft}
            nights={nights}
            code={bookingCode}
          />
        </div>

        {/* Navigation */}
        <div className="mt-5 flex flex-wrap justify-center gap-3">
          <Link to="/properties" className="btn-outline">
            Explore more
          </Link>

          <Link to="/my-bookings" className="btn-primary">
            My bookings
          </Link>
        </div>

      </article>
    </main>
  );
}