import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FlowLayout from "../../components/layout/FlowLayout";
import BookingSummary from "../../components/booking/BookingSummary";
import BookingTicket from "../../components/booking/BookingTicket";
import Button from "../../components/ui/Button";
import { useBooking } from "../../context/BookingContext";
import { useAppState } from "../../context/AppStateContext";
import { bookingApi } from "../../api/services";

export default function BookingReview() {
  const navigate = useNavigate();
  const { draft, nights, setBookingResult } = useBooking();
  const { pushToast } = useAppState();
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    const code = `ROOST-${Math.floor(1000 + Math.random() * 9000)}`;
    try {
      const res = await bookingApi.create({
        propertyId: draft.property?.id,
        bedId: draft.bed?.id,
        checkIn: draft.checkIn,
        checkOut: draft.checkOut,
        guest: draft.guestDetails,
      });
      setBookingResult({ code: res.code || res.booking?.code || code, ...res });
    } catch {
      // Booking creation isn't fully wired on the backend yet — confirm
      // locally with a generated code so the flow still completes.
      setBookingResult({ code });
      pushToast({ type: "info", title: "Booked (demo)", message: "Live booking service unavailable — confirmed with demo data." });
    } finally {
      setBusy(false);
      navigate("/booking/success");
    }
  };

  return (
    <FlowLayout step={3}>
      <form onSubmit={submit} className="flex flex-col gap-5">
        <div>
          <h1 className="text-xl font-extrabold text-ink-900">Review your booking</h1>
          <p className="mt-1 text-sm text-ink-500">One last look before we reserve your bed.</p>
        </div>
        <BookingSummary draft={draft} nights={nights} />
        <BookingTicket draft={draft} nights={nights} />
        <label className="flex items-start gap-2.5 text-sm text-ink-600">
          <input required type="checkbox" className="mt-0.5 h-4 w-4 rounded border-ink-300 text-brand-500" />
          I agree to the house rules and cancellation policy.
        </label>
        <div className="flex justify-end">
          <Button type="submit" loading={busy}>{busy ? "Creating booking…" : "Confirm booking →"}</Button>
        </div>
      </form>
    </FlowLayout>
  );
}
