import { useNavigate } from "react-router-dom";
import FlowLayout from "../../components/layout/FlowLayout";
import BookingSummary from "../../components/booking/BookingSummary";
import Button from "../../components/ui/Button";
import { useBooking } from "../../context/BookingContext";
import { ChevronRight } from "../../components/icons";

export default function GuestDetails() {
  const navigate = useNavigate();
  const { draft, setGuestDetails, nights } = useBooking();

  const submit = (e) => {
    e.preventDefault();
    const values = Object.fromEntries(new FormData(e.currentTarget));
    setGuestDetails(values);
    navigate("/booking/review");
  };

  return (
    <FlowLayout step={2}>
      <form onSubmit={submit} className="flex flex-col gap-5">
        <div>
          <h1 className="text-xl font-extrabold text-ink-900">Tell us about your stay</h1>
          <p className="mt-1 text-sm text-ink-500">These details help your host prepare for your arrival.</p>
        </div>
        <BookingSummary draft={draft} nights={nights} />
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="field"><span className="label">Full name</span><input required name="name" className="input" defaultValue="Rahul Sharma" /></label>
          <label className="field"><span className="label">Email address</span><input required type="email" name="email" className="input" defaultValue="rahul@example.com" /></label>
          <label className="field"><span className="label">Phone number</span><input required name="phone" pattern="[6-9][0-9]{9}" className="input" placeholder="10-digit Indian number" /></label>
          <label className="field"><span className="label">Arrival time</span><select name="arrival" className="input"><option>After 2:00 PM</option><option>After 6:00 PM</option><option>Late check-in (after 10 PM)</option></select></label>
          <label className="field sm:col-span-2"><span className="label">Note to host (optional)</span><textarea name="note" rows={3} className="input" placeholder="Anything your host should know?" /></label>
        </div>
        <div className="flex justify-end">
          <Button type="submit">Continue to review <ChevronRight size={16} /></Button>
        </div>
      </form>
    </FlowLayout>
  );
}
