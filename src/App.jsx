import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/layout/ProtectedRoute";
import Toasts from "./components/ui/Toasts";

// Public pages
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import About from "./pages/static/About";
import Pricing from "./pages/static/Pricing";
import Contact from "./pages/static/Contact";
import NotFound from "./pages/NotFound";

// Property pages
import PropertySearch from "./pages/properties/PropertySearch";
import PropertyDetails from "./pages/properties/PropertyDetails";
import BedAvailability from "./pages/properties/BedAvailability";

// Booking pages
import GuestDetails from "./pages/booking/GuestDetails";
import BookingReview from "./pages/booking/BookingReview";
import BookingSuccess from "./pages/booking/BookingSuccess";
import MyBookings from "./pages/booking/MyBookings";
import Payment from "./pages/booking/Payment";
import BookingDetails from "./pages/booking/BookingDetails";

// User
import UserDashboard from "./pages/user/UserDashboard";
import UserPropertyDetails from "./pages/user/UserPropertyDetails";

// Owner
import OwnerOverview from "./pages/owner/OwnerOverview";
import PropertyManagement from "./pages/owner/PropertyManagement";
import RoomBedManagement from "./pages/owner/RoomBedManagement";
import OwnerBookings from "./pages/owner/OwnerBookings";
import Chat from "./pages/owner/Chat";
import QRGenerator from "./pages/owner/QRGenerator";

// Admin
import AdminOverview from "./pages/admin/AdminOverview";
import AdminProperties from "./pages/admin/AdminProperties";
import AdminBookings from "./pages/admin/AdminBookings";
import AdminGuests from "./pages/admin/AdminGuests";
import AdminCompliance from "./pages/admin/AdminCompliance";

export default function App() {
  return (
    <>
      <Routes>

        {/* =====================================================
            PUBLIC
        ====================================================== */}

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/about" element={<About />} />

        <Route path="/pricing" element={<Pricing />} />

        <Route path="/contact" element={<Contact />} />


        {/* =====================================================
            PROPERTY DISCOVERY
        ====================================================== */}

        <Route
          path="/properties"
          element={<PropertySearch />}
        />

        <Route
          path="/properties/:slug"
          element={<PropertyDetails />}
        />

        <Route
          path="/properties/:slug/availability"
          element={
            <ProtectedRoute roles={["GUEST"]}>
              <BedAvailability />
            </ProtectedRoute>
          }
        />


        {/* =====================================================
            USER DASHBOARD
        ====================================================== */}

<Route
  path="/user"
  element={
    <ProtectedRoute roles={["GUEST", "OWNER", "ADMIN"]}>
      <UserDashboard />
    </ProtectedRoute>
  }
/>
       <Route
  path="/user/property/:id"
  element={
    <ProtectedRoute roles={["GUEST", "OWNER", "ADMIN"]}>
      <UserPropertyDetails />
    </ProtectedRoute>
  }
/>

        {/* =====================================================
            USER PROPERTY VIEW
            Dashboard → Property
        ====================================================== */}

        <Route
          path="/user/property/:id"
          element={
            <ProtectedRoute roles={["GUEST"]}>
              <PropertyDetails />
            </ProtectedRoute>
          }
        />


        {/* =====================================================
            BOOKING FLOW
        ====================================================== */}

        <Route
          path="/booking/guest-details"
          element={
            <ProtectedRoute roles={["GUEST"]}>
              <GuestDetails />
            </ProtectedRoute>
          }
        />
        <Route
  path="/booking/payment"
  element={
    <ProtectedRoute>
      <Payment />
    </ProtectedRoute>
  }
/>

        <Route
          path="/booking/review"
          element={
            <ProtectedRoute roles={["GUEST"]}>
              <BookingReview />
            </ProtectedRoute>
          }
        />

        <Route
  path="/booking/:code"
  element={
    <ProtectedRoute roles={["GUEST", "OWNER", "ADMIN"]}>
      <BookingDetails />
    </ProtectedRoute>
  }
/>

        

        <Route
          path="/my-bookings"
          element={
            <ProtectedRoute roles={["GUEST", "OWNER", "ADMIN"]}>
              <MyBookings />
            </ProtectedRoute>
          }
        />

        <Route
          path="/booking/success"
          element={
            <ProtectedRoute roles={["GUEST"]}>
              <BookingSuccess />
            </ProtectedRoute>
          }
        />


        {/* =====================================================
            OWNER
        ====================================================== */}

        <Route
          path="/owner"
          element={
            <ProtectedRoute roles={["OWNER", "ADMIN"]}>
              <OwnerOverview />
            </ProtectedRoute>
          }
        />

        <Route
          path="/owner/properties"
          element={
            <ProtectedRoute roles={["OWNER", "ADMIN"]}>
              <PropertyManagement />
            </ProtectedRoute>
          }
        />

        <Route
          path="/owner/rooms"
          element={
            <ProtectedRoute roles={["OWNER", "ADMIN"]}>
              <RoomBedManagement />
            </ProtectedRoute>
          }
        />

        <Route
          path="/owner/bookings"
          element={
            <ProtectedRoute roles={["OWNER", "ADMIN"]}>
              <OwnerBookings />
            </ProtectedRoute>
          }
        />

        <Route
          path="/owner/chat"
          element={
            <ProtectedRoute roles={["OWNER", "ADMIN"]}>
              <Chat />
            </ProtectedRoute>
          }
        />

        <Route
          path="/owner/qr-generator"
          element={
            <ProtectedRoute roles={["OWNER", "ADMIN"]}>
              <QRGenerator />
            </ProtectedRoute>
          }
        />


        {/* =====================================================
            ADMIN
        ====================================================== */}

        <Route
          path="/admin"
          element={
            <ProtectedRoute roles={["ADMIN"]}>
              <AdminOverview />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/properties"
          element={
            <ProtectedRoute roles={["ADMIN"]}>
              <AdminProperties />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/bookings"
          element={
            <ProtectedRoute roles={["ADMIN"]}>
              <AdminBookings />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/guests"
          element={
            <ProtectedRoute roles={["ADMIN"]}>
              <AdminGuests />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/compliance"
          element={
            <ProtectedRoute roles={["ADMIN"]}>
              <AdminCompliance />
            </ProtectedRoute>
          }
        />


        {/* =====================================================
            404
        ====================================================== */}

        <Route
          path="*"
          element={<NotFound />}
        />

      </Routes>

      <Toasts />
    </>
  );
}