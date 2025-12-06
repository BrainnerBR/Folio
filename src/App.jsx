// src/App.jsx
import "./App.css";
import Navbar from "./Components/Navbar";
import Landing from "./Pages/Landing";

import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./Components/ProtectedRoute";
import PublicRoute from "./Components/PublicRoute";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import Dashboard from "./Pages/Dashboard/Dashboard";
import PublicLayout from "./Layouts/PublicLayout";
import DashboardLayout from "./Layouts/DashboardLayout";

// Landing & Components imports
import ServicesSection from "./Components/ServicesSection";
import PricingSection from "./Components/PricingSection";

import { useAuth } from "./context/AuthContext";

function App() {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-bg text-text">
        <div className="text-xl font-semibold">Loading...</div>
      </div>
    );
  }

  return (
    <Routes>
      {/* Public Routes (Navbar + Content) */}
      <Route element={<PublicLayout />}>
        <Route
          path="/"
          element={
            <>
              <Landing />
            </>
          }
        />
        <Route path="/services" element={<ServicesSection />} />
        <Route path="/pricing" element={<PricingSection />} />

        {/* Auth Pages (Redirect if logged in) */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
      </Route>

      {/* Private Routes (Sidebar + Dashboard Content) */}
      <Route
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        {/* Add more private routes here, e.g., /dashboard/settings */}
      </Route>

      {/* 404 - Can use PublicLayout or a standalone page */}
      {/* For now we can leave it or add a NotFound page */}
    </Routes>
  );
}

export default App;
