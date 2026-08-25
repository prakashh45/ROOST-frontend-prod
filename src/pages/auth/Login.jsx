import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useAppState } from "../../context/AppStateContext";
import AuthLayout from "./AuthLayout";
import ErrorState from "../../components/ui/ErrorState";
import Button from "../../components/ui/Button";
import { Eye, EyeOff } from "../../components/icons";

export default function Login() {
  const { login } = useAuth();
  const { pushToast } = useAppState();
  const navigate = useNavigate();
  const location = useLocation();

  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [showPw, setShowPw] = useState(false);

  const notice = location.state?.notice;

  // =========================
  // NORMAL LOGIN
  // =========================
  const submit = async (e) => {
    e.preventDefault();

    setBusy(true);
    setError("");

    const values = Object.fromEntries(new FormData(e.currentTarget));

    try {
      const user = await login(values, false);

      pushToast({
        type: "success",
        title: "Welcome back",
        message: `Signed in as ${user.name || user.email}.`,
      });

      const role = String(user.role || "GUEST").toUpperCase();

      const dest =
        location.state?.from ||
        (role.includes("OWNER")
          ? "/owner"
          : role.includes("ADMIN")
            ? "/admin"
            : "/my-bookings");

      navigate(dest, { replace: true });
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Unable to sign in. Please check your details and try again."
      );
    } finally {
      setBusy(false);
    }
  };

  // =========================
  // DEMO OWNER LOGIN
  // =========================
  const demoOwnerLogin = async () => {
    setBusy(true);
    setError("");

    try {
      const user = await login(
        {
          email: "owner2@roost.com",
          password: "Owner@12345",
        },
        false
      );

      pushToast({
        type: "success",
        title: "Demo Owner Login",
        message: `Signed in as ${user.name || user.email}.`,
      });

      navigate("/owner", { replace: true });
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Demo owner login failed."
      );
    } finally {
      setBusy(false);
    }
  };

  return (
    <AuthLayout
      title="Welcome to ROOST"
      subtitle="Sign in to access your dashboard, bookings, or profile."
    >
      <form onSubmit={submit} className="flex flex-col gap-4">

        {/* =========================
            DEMO OWNER LOGIN
        ========================= */}
        <button
          type="button"
          onClick={demoOwnerLogin}
          disabled={busy}
          className="btn-primary w-full justify-center"
        >
          🚀 Demo Owner Login
        </button>

        {/* =========================
            SOCIAL LOGIN
        ========================= */}
        <button
          type="button"
          className="btn-outline justify-center"
        >
          G &nbsp; Continue with Google
        </button>

        <button
          type="button"
          className="btn-outline justify-center"
        >
          f &nbsp; Continue with Facebook
        </button>

        {/* =========================
            DIVIDER
        ========================= */}
        <div className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-wide text-ink-400">
          <span className="h-px flex-1 bg-ink-200" />

          or sign in with email

          <span className="h-px flex-1 bg-ink-200" />
        </div>

        {/* =========================
            NOTICE
        ========================= */}
        {notice && (
          <div className="rounded-lg border border-amber-200 bg-amber-50 px-3.5 py-2.5 text-xs font-medium text-amber-800">
            {notice}
          </div>
        )}

        {/* =========================
            ERROR
        ========================= */}
        {error && <ErrorState message={error} />}

        {/* =========================
            EMAIL
        ========================= */}
        <label className="field">
          <span className="label">Email address</span>

          <input
            required
            name="email"
            type="email"
            className="input"
            placeholder="you@example.com"
          />
        </label>

        {/* =========================
            PASSWORD
        ========================= */}
        <label className="field">
          <span className="label">Password</span>

          <div className="relative">
            <input
              required
              name="password"
              type={showPw ? "text" : "password"}
              minLength={6}
              className="input pr-10"
              placeholder="••••••••"
            />

            <button
              type="button"
              onClick={() => setShowPw((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-400"
            >
              {showPw ? (
                <EyeOff size={16} />
              ) : (
                <Eye size={16} />
              )}
            </button>
          </div>
        </label>

        {/* =========================
            FORGOT PASSWORD
        ========================= */}
        <div className="-mt-2 text-right">
          <Link
            to="/forgot-password"
            className="text-xs font-semibold text-brand-600 hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        {/* =========================
            NORMAL LOGIN
        ========================= */}
        <Button
          type="submit"
          loading={busy}
          className="justify-center"
        >
          {busy ? "Please wait…" : "Sign in"}
        </Button>

        {/* =========================
            REGISTER
        ========================= */}
        <p className="text-center text-sm text-ink-500">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-semibold text-brand-600 hover:underline"
          >
            Sign up
          </Link>
        </p>

        {/* =========================
            DEMO CREDENTIAL
        ========================= */}
        <p className="text-center text-xs text-ink-400">
          Demo Owner: owner2@roost.com
        </p>

      </form>
    </AuthLayout>
  );
}