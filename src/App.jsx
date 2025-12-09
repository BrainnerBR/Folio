// src/App.jsx
import "./App.css";
import Landing from "./Pages/Landing";

import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./Components/ProtectedRoute";
import PublicRoute from "./Components/PublicRoute";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import Dashboard from "./Pages/Dashboard/Dashboard";
import MyProjects from "./Pages/Projects/MyProjects";
import settings from "./Pages/Settings/Settings";
import NotFound from "./Pages/NotFound";
import PresentationViewer from "./Pages/Presentation/PresentationViewer";
import PublicLayout from "./Layouts/PublicLayout";
import DashboardLayout from "./Layouts/DashboardLayout";

// Landing & Components imports
import ServicesSection from "./Components/ServicesSection";
import PricingSection from "./Components/PricingSection";

import { helix } from "ldrs";
import { useAuth } from "./context/AuthContext";
import Settings from "./Pages/Settings/Settings";
import { Toaster } from "sonner";

// Register the loader
helix.register();

function App() {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-white text-black z-50 fixed inset-0">
        <l-helix size="45" speed="2.5" color="#F3DE2C"></l-helix>
      </div>
    );
  }

  return (
    <>
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
          <Route path="/dashboard/projects" element={<MyProjects />} />
          <Route path="/dashboard/settings" element={<Settings />} />
          <Route path="/presentation" element={<PresentationViewer />} />
        </Route>

        {/* 404 Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster richColors position="top-center" />
    </>
  );
}

export default App;
