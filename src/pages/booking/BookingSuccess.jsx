import { Link } from "react-router-dom";
import { Check } from "../../components/icons";
import BookingTicket from "../../components/booking/BookingTicket";
import Brand from "../../components/layout/Navbar";
import { useBooking } from "../../context/BookingContext";

export default function BookingSuccess() {
  const { draft, nights } = useBooking();

  return (
    <main className="grid min-h-screen place-items-center bg-grid bg-ink-50 px-4 py-10">
      <article className="card w-full max-w-xl p-8 text-center animate-fadeIn">
        <div className="mb-3 flex justify-center"><Brand /></div>
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-100 text-emerald-600">
          <Check size={30} />
        </div>
        <h1 className="mt-4 text-2xl font-extrabold text-ink-900">You're booked!</h1>
        <p className="mt-1 text-sm text-ink-500">Your bed is reserved. We've sent confirmation to your email.</p>
        <div className="mt-6 text-left">
          <BookingTicket draft={draft} nights={nights} code={draft.bookingResult?.code} />
        </div>
        <div className="mt-2 flex flex-wrap justify-center gap-3">
          <Link to="/properties" className="btn-outline">Explore more</Link>
          <Link to="/my-bookings" className="btn-primary">My bookings</Link>
        </div>
      </article>
    </main>
  );
}
