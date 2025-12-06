import { Outlet } from "react-router-dom";
import Sidebar from "../Components/Sidebar";

export default function DashboardLayout() {
  return (
    <div className="flex min-h-screen bg-bg text-text">
      <Sidebar />
      <main className="flex-1 p-8 overflow-y-auto h-screen">
        <Outlet />
      </main>
    </div>
  );
}
