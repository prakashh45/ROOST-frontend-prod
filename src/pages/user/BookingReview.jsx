import { useLocation, useNavigate } from "react-router-dom";

export default function BookingReview() {
  const navigate = useNavigate();
  const location = useLocation();

  const booking = location.state;

  if (!booking) {
    return (
      <div className="min-h-screen bg-slate-50">
        <header className="border-b bg-white">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                Roost
              </h1>

              <p className="text-sm text-slate-500">
                Booking review
              </p>
            </div>

            <button
              onClick={() => navigate("/user")}
              className="rounded-lg border px-4 py-2 text-sm font-medium"
            >
              Dashboard
            </button>
          </div>
        </header>

        <main className="mx-auto max-w-3xl px-6 py-16">
          <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900">
              Booking details not found
            </h2>

            <p className="mt-2 text-slate-500">
              Please start the booking process again.
            </p>

            <button
              onClick={() => navigate("/user")}
              className="mt-6 rounded-xl bg-teal-600 px-5 py-3 font-semibold text-white hover:bg-teal-700"
            >
              Back to dashboard
            </button>
          </div>
        </main>
      </div>
    );
  }

  const {
    propertyName,
    propertyId,
    bedId,
    bedCode,
    pricePerNight,
    nights,
    total,
    guest,
    checkIn,
    checkOut,
  } = booking;

  const handleConfirm = () => {
    /*
     * IMPORTANT:
     * Backend API will be connected in the next step.
     *
     * For now we keep the complete booking object
     * and move it to BookingSuccess.
     */

    console.log("CONFIRM BOOKING:", booking);

    navigate("/booking/success", {
      state: {
        ...booking,
        demo: true,
      },
    });
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
              Review your booking
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => navigate("/user")}
              className="rounded-lg border px-4 py-2 text-sm font-medium hover:bg-slate-50"
            >
              Dashboard
            </button>

            {/* Owner remains accessible */}
            <button
              onClick={() => navigate("/owner")}
              className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
            >
              Owner
            </button>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="mx-auto max-w-6xl px-6 py-10">
        {/* Page heading */}
        <div>
          <p className="text-sm font-semibold text-teal-600">
            STEP 2 OF 3
          </p>

          <h2 className="mt-1 text-3xl font-bold text-slate-900">
            Review your booking
          </h2>

          <p className="mt-2 text-slate-500">
            Please check all details before confirming.
          </p>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          {/* Left */}
          <div className="space-y-6 lg:col-span-2">
            {/* Property */}
            <section className="rounded-2xl bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-900">
                  Stay details
                </h3>

                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                  AVAILABLE
                </span>
              </div>

              <div className="mt-5 rounded-xl bg-slate-50 p-5">
                <h4 className="text-xl font-bold text-slate-900">
                  {propertyName}
                </h4>

                <p className="mt-1 text-sm text-slate-500">
                  Property ID: {propertyId}
                </p>

                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <div>
                    <p className="text-xs text-slate-500">
                      Bed
                    </p>

                    <p className="mt-1 font-semibold text-slate-900">
                      {bedCode}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-500">
                      Bed ID
                    </p>

                    <p className="mt-1 font-semibold text-slate-900">
                      {bedId}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-500">
                      Check-in
                    </p>

                    <p className="mt-1 font-semibold text-slate-900">
                      {checkIn}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-500">
                      Check-out
                    </p>

                    <p className="mt-1 font-semibold text-slate-900">
                      {checkOut}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Guest */}
            <section className="rounded-2xl bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-900">
                  Guest details
                </h3>

                <button
                  onClick={() =>
                    navigate(
                      `/booking/guest-details?propertyId=${propertyId}&bedId=${bedId}`
                    )
                  }
                  className="text-sm font-semibold text-teal-600 hover:text-teal-700"
                >
                  Edit
                </button>
              </div>

              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <div>
                  <p className="text-xs text-slate-500">
                    Full name
                  </p>

                  <p className="mt-1 font-semibold text-slate-900">
                    {guest?.fullName || "-"}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-500">
                    Phone
                  </p>

                  <p className="mt-1 font-semibold text-slate-900">
                    {guest?.phone || "-"}
                  </p>
                </div>

                <div className="sm:col-span-2">
                  <p className="text-xs text-slate-500">
                    Email
                  </p>

                  <p className="mt-1 font-semibold text-slate-900">
                    {guest?.email || "-"}
                  </p>
                </div>
              </div>
            </section>

            {/* Important information */}
            <section className="rounded-2xl border border-teal-100 bg-teal-50 p-6">
              <h3 className="font-bold text-teal-900">
                Before you confirm
              </h3>

              <ul className="mt-3 space-y-2 text-sm text-teal-800">
                <li>
                  ✓ Your selected bed will be reserved after
                  booking confirmation.
                </li>

                <li>
                  ✓ Your booking ID will be generated after
                  confirmation.
                </li>

                <li>
                  ✓ A QR code will be generated for your
                  booking.
                </li>

                <li>
                  ✓ The owner can scan the QR code to verify
                  your booking.
                </li>
              </ul>
            </section>
          </div>

          {/* Right summary */}
          <aside>
            <div className="sticky top-6 rounded-2xl bg-white p-6 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900">
                Price summary
              </h3>

              <div className="mt-6 space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm text-slate-500">
                    Price / night
                  </span>

                  <span className="font-semibold text-slate-900">
                    ₹{pricePerNight}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-sm text-slate-500">
                    Nights
                  </span>

                  <span className="font-semibold text-slate-900">
                    {nights}
                  </span>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-500">
                      Subtotal
                    </span>

                    <span className="font-semibold text-slate-900">
                      ₹{total}
                    </span>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">
                      Total
                    </span>

                    <span className="text-2xl font-bold text-teal-600">
                      ₹{total}
                    </span>
                  </div>
                </div>
              </div>

              {/* Confirm */}
              <button
                onClick={handleConfirm}
                className="mt-7 w-full rounded-xl bg-teal-600 px-5 py-3 font-semibold text-white hover:bg-teal-700"
              >
                Confirm booking
              </button>

              <button
                onClick={() =>
                  navigate(
                    `/booking/guest-details?propertyId=${propertyId}&bedId=${bedId}`
                  )
                }
                className="mt-3 w-full rounded-xl border px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Go back
              </button>

              <p className="mt-4 text-center text-xs text-slate-400">
                Secure booking • Roost
              </p>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}