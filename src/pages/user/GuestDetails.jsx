import { useLocation, useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";

const demoProperties = [
  {
    id: 1,
    name: "Roost Hostel",
    location: "Satara, Maharashtra",
    beds: [
      {
        id: 1,
        code: "101-A",
        position: "UPPER",
        price: 400,
        status: "AVAILABLE",
      },
      {
        id: 2,
        code: "101-B",
        position: "LOWER",
        price: 400,
        status: "BOOKED",
      },
      {
        id: 3,
        code: "102-A",
        position: "UPPER",
        price: 450,
        status: "AVAILABLE",
      },
      {
        id: 4,
        code: "102-B",
        position: "LOWER",
        price: 450,
        status: "MAINTENANCE",
      },
    ],
  },
  {
    id: 2,
    name: "City Stay",
    location: "Pune, Maharashtra",
    beds: [
      {
        id: 5,
        code: "201-A",
        position: "UPPER",
        price: 500,
        status: "AVAILABLE",
      },
      {
        id: 6,
        code: "201-B",
        position: "LOWER",
        price: 500,
        status: "AVAILABLE",
      },
    ],
  },
];

export default function GuestDetails() {
  const navigate = useNavigate();
  const location = useLocation();

  const query = new URLSearchParams(location.search);

  const propertyId = query.get("propertyId");
  const bedId = query.get("bedId");

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    checkIn: "",
    checkOut: "",
  });

  const [error, setError] = useState("");

  const property = useMemo(
    () =>
      demoProperties.find(
        (item) => String(item.id) === String(propertyId)
      ),
    [propertyId]
  );

  const bed = useMemo(
    () =>
      property?.beds.find(
        (item) => String(item.id) === String(bedId)
      ),
    [property, bedId]
  );

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
  };

  const calculateNights = () => {
    if (!form.checkIn || !form.checkOut) return 0;

    const start = new Date(form.checkIn);
    const end = new Date(form.checkOut);

    const difference = end.getTime() - start.getTime();

    if (difference <= 0) return 0;

    return Math.ceil(
      difference / (1000 * 60 * 60 * 24)
    );
  };

  const nights = calculateNights();

  const total = bed
    ? nights * Number(bed.price)
    : 0;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!property || !bed) {
      setError("Selected property or bed was not found.");
      return;
    }

    if (bed.status !== "AVAILABLE") {
      setError("This bed is no longer available.");
      return;
    }

    if (
      !form.fullName ||
      !form.phone ||
      !form.email ||
      !form.checkIn ||
      !form.checkOut
    ) {
      setError("Please fill all required fields.");
      return;
    }

    if (nights <= 0) {
      setError(
        "Check-out date must be after check-in date."
      );
      return;
    }

    /*
     * Temporary booking state.
     *
     * Later we will replace this with the real
     * POST /api/v1/bookings API.
     */
    const bookingData = {
      propertyId: property.id,
      propertyName: property.name,
      bedId: bed.id,
      bedCode: bed.code,
      pricePerNight: Number(bed.price),
      nights,
      total,
      guest: {
        fullName: form.fullName,
        phone: form.phone,
        email: form.email,
      },
      checkIn: form.checkIn,
      checkOut: form.checkOut,
    };

    console.log(
      "BOOKING DETAILS:",
      bookingData
    );

    navigate("/booking/review", {
      state: bookingData,
    });
  };

  if (!property || !bed) {
    return (
      <div className="min-h-screen bg-slate-50">
        <header className="border-b bg-white">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                Roost
              </h1>

              <p className="text-sm text-slate-500">
                Booking
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
              Booking information not found
            </h2>

            <p className="mt-2 text-slate-500">
              Please select a bed again.
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
              Complete your booking
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => navigate("/user")}
              className="rounded-lg border px-4 py-2 text-sm font-medium hover:bg-slate-50"
            >
              Dashboard
            </button>

            {/* Owner access remains available */}
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
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Form */}
          <section className="lg:col-span-2">
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  Guest details
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Enter your details to continue.
                </p>
              </div>

              <form
                onSubmit={handleSubmit}
                className="mt-8 space-y-5"
              >
                {/* Full name */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Full name
                  </label>

                  <input
                    required
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="w-full rounded-xl border px-4 py-3 outline-none focus:border-teal-500"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Phone number
                  </label>

                  <input
                    required
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                    className="w-full rounded-xl border px-4 py-3 outline-none focus:border-teal-500"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Email address
                  </label>

                  <input
                    required
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="w-full rounded-xl border px-4 py-3 outline-none focus:border-teal-500"
                  />
                </div>

                {/* Dates */}
                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Check-in
                    </label>

                    <input
                      required
                      name="checkIn"
                      type="date"
                      value={form.checkIn}
                      onChange={handleChange}
                      min={
                        new Date()
                          .toISOString()
                          .split("T")[0]
                      }
                      className="w-full rounded-xl border px-4 py-3 outline-none focus:border-teal-500"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Check-out
                    </label>

                    <input
                      required
                      name="checkOut"
                      type="date"
                      value={form.checkOut}
                      onChange={handleChange}
                      min={form.checkIn || undefined}
                      className="w-full rounded-xl border px-4 py-3 outline-none focus:border-teal-500"
                    />
                  </div>
                </div>

                {/* Error */}
                {error && (
                  <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {error}
                  </div>
                )}

                {/* Submit */}
                <div className="flex justify-end gap-3 pt-3">
                  <button
                    type="button"
                    onClick={() =>
                      navigate(
                        `/user/property/${property.id}`
                      )
                    }
                    className="rounded-xl border px-5 py-3 text-sm font-semibold hover:bg-slate-50"
                  >
                    Back
                  </button>

                  <button
                    type="submit"
                    className="rounded-xl bg-teal-600 px-6 py-3 text-sm font-semibold text-white hover:bg-teal-700"
                  >
                    Continue to review
                  </button>
                </div>
              </form>
            </div>
          </section>

          {/* Booking summary */}
          <aside>
            <div className="sticky top-6 rounded-2xl bg-white p-6 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900">
                Booking summary
              </h3>

              <div className="mt-5 rounded-xl bg-slate-50 p-4">
                <p className="font-bold text-slate-900">
                  {property.name}
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  📍 {property.location}
                </p>
              </div>

              <div className="mt-5 space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm text-slate-500">
                    Bed
                  </span>

                  <span className="text-sm font-semibold text-slate-900">
                    {bed.code}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-sm text-slate-500">
                    Position
                  </span>

                  <span className="text-sm font-semibold text-slate-900">
                    {bed.position}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-sm text-slate-500">
                    Price / night
                  </span>

                  <span className="text-sm font-semibold text-slate-900">
                    ₹{bed.price}
                  </span>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-500">
                      Nights
                    </span>

                    <span className="text-sm font-semibold text-slate-900">
                      {nights || "-"}
                    </span>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-900">
                      Total
                    </span>

                    <span className="text-2xl font-bold text-teal-600">
                      ₹{total || 0}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}