import { useNavigate, useParams } from "react-router-dom";
import { useMemo } from "react";

const demoProperties = [
  {
    id: 1,
    name: "Roost Hostel",
    location: "Satara, Maharashtra",
    description:
      "Comfortable and affordable hostel stay with clean rooms and flexible bed options.",
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
    description:
      "Affordable city accommodation suitable for students and working professionals.",
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

export default function UserPropertyDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const property = useMemo(
    () =>
      demoProperties.find(
        (item) => String(item.id) === String(id)
      ),
    [id]
  );

  if (!property) {
    return (
      <div className="min-h-screen bg-slate-50">
        <header className="border-b bg-white">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
            <h1 className="text-2xl font-bold text-slate-900">
              Roost
            </h1>

            <button
              onClick={() => navigate("/user")}
              className="rounded-lg border px-4 py-2 text-sm font-medium"
            >
              Back
            </button>
          </div>
        </header>

        <main className="mx-auto max-w-7xl px-6 py-16">
          <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900">
              Property not found
            </h2>

            <p className="mt-2 text-slate-500">
              The property you are looking for does not exist.
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

  const availableBeds = property.beds.filter(
    (bed) => bed.status === "AVAILABLE"
  );

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
              Find your perfect stay
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/user")}
              className="rounded-lg border px-4 py-2 text-sm font-medium hover:bg-slate-50"
            >
              Dashboard
            </button>

            {/* Owner should remain accessible */}
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
      <main className="mx-auto max-w-7xl px-6 py-10">
        {/* Property information */}
        <section className="overflow-hidden rounded-2xl bg-white shadow-sm">
          <div className="flex h-64 items-center justify-center bg-slate-200 text-slate-500">
            Property image
          </div>

          <div className="p-6">
            <div className="flex flex-col justify-between gap-4 md:flex-row">
              <div>
                <h2 className="text-3xl font-bold text-slate-900">
                  {property.name}
                </h2>

                <p className="mt-2 text-slate-500">
                  📍 {property.location}
                </p>

                <p className="mt-4 max-w-2xl text-slate-600">
                  {property.description}
                </p>
              </div>

              <div className="rounded-xl bg-teal-50 px-6 py-4 text-center">
                <p className="text-2xl font-bold text-teal-700">
                  {availableBeds.length}
                </p>

                <p className="text-sm text-slate-600">
                  Beds available
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Beds */}
        <section className="mt-10">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-slate-900">
                Available beds
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Select a bed to continue your booking.
              </p>
            </div>

            <span className="text-sm text-slate-500">
              {property.beds.length} total beds
            </span>
          </div>

          <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {property.beds.map((bed) => {
              const available = bed.status === "AVAILABLE";

              return (
                <div
                  key={bed.id}
                  className="rounded-2xl bg-white p-5 shadow-sm"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-lg font-bold text-slate-900">
                        {bed.code}
                      </h4>

                      <p className="mt-1 text-sm text-slate-500">
                        {bed.position} bed
                      </p>
                    </div>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        bed.status === "AVAILABLE"
                          ? "bg-emerald-100 text-emerald-700"
                          : bed.status === "BOOKED"
                          ? "bg-red-100 text-red-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {bed.status}
                    </span>
                  </div>

                  <div className="mt-5 flex items-end justify-between">
                    <div>
                      <p className="text-xl font-bold text-slate-900">
                        ₹{bed.price}
                      </p>

                      <p className="text-xs text-slate-500">
                        per night
                      </p>
                    </div>

                    <button
                      disabled={!available}
                      onClick={() =>
                        navigate(
                          `/booking/guest-details?propertyId=${property.id}&bedId=${bed.id}`
                        )
                      }
                      className={`rounded-xl px-4 py-2 text-sm font-semibold ${
                        available
                          ? "bg-teal-600 text-white hover:bg-teal-700"
                          : "cursor-not-allowed bg-slate-100 text-slate-400"
                      }`}
                    >
                      {available
                        ? "Book this bed"
                        : bed.status === "BOOKED"
                        ? "Booked"
                        : "Unavailable"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Empty state */}
        {availableBeds.length === 0 && (
          <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-6 text-center">
            <h3 className="font-semibold text-amber-800">
              No beds available
            </h3>

            <p className="mt-1 text-sm text-amber-700">
              Please check another property.
            </p>

            <button
              onClick={() => navigate("/user")}
              className="mt-4 rounded-xl bg-teal-600 px-5 py-2 text-sm font-semibold text-white"
            >
              Browse properties
            </button>
          </div>
        )}
      </main>
    </div>
  );
}