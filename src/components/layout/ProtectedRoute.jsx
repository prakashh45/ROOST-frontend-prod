import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import LoadingState from "../ui/LoadingState";

export default function ProtectedRoute({ children, roles }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <LoadingState label="Checking your session…" />;
  }

  // Not logged in
  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
        state={{
          from: location.pathname,
          notice: "Please sign in to access this service.",
        }}
      />
    );
  }

  // User has wrong role
  if (roles && !roles.includes(user.role)) {
    let fallback;

    if (user.role === "OWNER") {
      fallback = "/owner";
    } else if (user.role === "ADMIN") {
      fallback = "/admin";
    } else {
      // GUEST / USER
      fallback = "/user/dashboard";
    }

    return <Navigate to={fallback} replace />;
  }

  return children;
}