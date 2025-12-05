import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-bg flex flex-col">
      <Navbar />
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
}
