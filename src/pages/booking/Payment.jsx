import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Payment() {
  const navigate = useNavigate();
  const location = useLocation();

  const booking = location.state?.booking || {
    propertyName: "Roost Hostel",
    roomName: "Room 101",
    bedCode: "101-A",
    price: 400,
    nights: 1,
  };

  const [method, setMethod] = useState("UPI");
  const [loading, setLoading] = useState(false);

  const total = booking.price * booking.nights;

  const handlePayment = async () => {
    setLoading(true);

    // Demo payment for now.
    // Real payment API will be connected later.
    setTimeout(() => {
      setLoading(false);

      navigate("/booking/success", {
        state: {
          booking: {
            ...booking,
            paymentMethod: method,
            totalAmount: total,
            paymentStatus: "PAID",
          },
        },
      });
    }, 1200);
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
              Secure payment
            </p>
          </div>

          <button
            onClick={() => navigate(-1)}
            className="rounded-lg border px-4 py-2 text-sm font-medium hover:bg-slate-50"
          >
            Back
          </button>
        </div>
      </header>

      {/* Main */}
      <main className="mx-auto max-w-6xl px-6 py-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
          {/* Payment */}
          <section className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900">
              Choose payment method
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Select how you want to pay for your booking.
            </p>

            {/* Methods */}
            <div className="mt-6 grid gap-3">
              {[
                {
                  id: "UPI",
                  title: "UPI",
                  subtitle: "Google Pay, PhonePe, Paytm",
                },
                {
                  id: "CARD",
                  title: "Debit / Credit Card",
                  subtitle: "Visa, Mastercard, RuPay",
                },
                {
                  id: "NET_BANKING",
                  title: "Net Banking",
                  subtitle: "All major banks",
                },
                {
                  id: "COD",
                  title: "Pay at property",
                  subtitle: "Pay when you arrive",
                },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setMethod(item.id)}
                  className={`flex items-center justify-between rounded-xl border p-4 text-left transition ${
                    method === item.id
                      ? "border-teal-600 bg-teal-50"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <div>
                    <p className="font-semibold text-slate-900">
                      {item.title}
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      {item.subtitle}
                    </p>
                  </div>

                  <div
                    className={`h-5 w-5 rounded-full border-2 ${
                      method === item.id
                        ? "border-teal-600 bg-teal-600"
                        : "border-slate-300"
                    }`}
                  />
                </button>
              ))}
            </div>

            {/* Demo Notice */}
            <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4">
              <p className="text-sm font-semibold text-amber-900">
                Demo payment
              </p>

              <p className="mt-1 text-xs text-amber-700">
                Payment gateway will be connected later.
                This button currently simulates a successful payment.
              </p>
            </div>

            {/* Pay Button */}
            <button
              onClick={handlePayment}
              disabled={loading}
              className="mt-6 w-full rounded-xl bg-teal-600 px-5 py-3 font-semibold text-white transition hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? "Processing payment..."
                : method === "COD"
                ? `Confirm booking • ₹${total}`
                : `Pay ₹${total}`}
            </button>
          </section>

          {/* Booking Summary */}
          <aside className="h-fit rounded-2xl bg-white p-6 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900">
              Booking summary
            </h3>

            <div className="mt-5 space-y-4">
              <div>
                <p className="text-xs text-slate-500">
                  Property
                </p>

                <p className="font-semibold text-slate-900">
                  {booking.propertyName}
                </p>
              </div>

              <div>
                <p className="text-xs text-slate-500">
                  Room
                </p>

                <p className="font-semibold text-slate-900">
                  {booking.roomName}
                </p>
              </div>

              <div>
                <p className="text-xs text-slate-500">
                  Bed
                </p>

                <p className="font-semibold text-slate-900">
                  {booking.bedCode}
                </p>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">
                    ₹{booking.price} × {booking.nights} night
                  </span>

                  <span className="font-medium">
                    ₹{total}
                  </span>
                </div>

                <div className="mt-3 flex justify-between text-lg font-bold">
                  <span>Total</span>

                  <span>₹{total}</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}