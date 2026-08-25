import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useAppState } from "../../context/AppStateContext";
import AuthLayout from "./AuthLayout";
import ErrorState from "../../components/ui/ErrorState";
import Button from "../../components/ui/Button";

export default function Register() {
  const { login } = useAuth();
  const { pushToast } = useAppState();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [role, setRole] = useState("GUEST");

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    const values = { ...Object.fromEntries(new FormData(e.currentTarget)), role };
    try {
      const user = await login(values, true);
      pushToast({ type: "success", title: "Account created", message: "Welcome to ROOST!" });
      navigate(role === "OWNER" ? "/owner" : "/my-bookings", { replace: true });
    } catch (err) {
      setError(err?.response?.data?.message || "Unable to create your account. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <AuthLayout title="Create your ROOST account" subtitle="Start finding a better way to stay.">
      <form onSubmit={submit} className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-2 rounded-lg bg-ink-100 p-1">
          {["GUEST", "OWNER"].map((r) => (
            <button type="button" key={r} onClick={() => setRole(r)} className={`rounded-md py-2 text-sm font-bold transition ${role === r ? "bg-white text-brand-600 shadow-sm" : "text-ink-500"}`}>
              {r === "GUEST" ? "I'm a guest" : "I'm an owner"}
            </button>
          ))}
        </div>

        {error && <ErrorState message={error} />}

        <label className="field">
          <span className="label">Full name</span>
          <input required name="name" className="input" placeholder="Your full name" />
        </label>
        <label className="field">
          <span className="label">Email address</span>
          <input required name="email" type="email" className="input" placeholder="you@example.com" />
        </label>
        <label className="field">
          <span className="label">Phone number</span>
          <input name="phone" className="input" placeholder="10-digit Indian number" pattern="[6-9][0-9]{9}" />
        </label>
        <label className="field">
          <span className="label">Password</span>
          <input required name="password" type="password" minLength={6} className="input" placeholder="••••••••" />
        </label>

        <Button type="submit" loading={busy} className="justify-center">{busy ? "Creating account…" : "Create account"}</Button>
        <p className="text-center text-sm text-ink-500">
          Already have an account? <Link to="/login" className="font-semibold text-brand-600 hover:underline">Sign in</Link>
        </p>
      </form>
    </AuthLayout>
  );
}
