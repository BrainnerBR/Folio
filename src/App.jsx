import { Routes, Route } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import MainLayout from "./Layouts/MainLayout";
import AuthLayout from "./Layouts/AuthLayout";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import Home from "./Pages/Dashboard/Home";
import NotFound from "./Pages/NotFound";
import Landing from "./Pages/Landing";

export default function AppRouter() {
  const { user } = useAuth();

  return (
    <Routes>
      {/* Public routes */}
      {!user ? (
        <Route element={<AuthLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Route>
      ) : (
        /* Private routes */
        <Route element={<MainLayout />}></Route>
      )}

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
