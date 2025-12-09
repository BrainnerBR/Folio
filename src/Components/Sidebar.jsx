import { useNavigate, Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Sidebar() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  const navItems = [
    { label: "Dashboard", path: "/dashboard", icon: "📊" },
    { label: "My Projects", path: "/dashboard/projects", icon: "📁" },
    { label: "Settings", path: "/dashboard/settings", icon: "⚙️" },
  ];

  return (
    <aside className="w-64 bg-white border-r border-black/5 flex flex-col h-screen sticky top-0">
      {/* Logo */}
      <div className="p-6">
        <Link to="/dashboard" className="text-2xl font-bold text-text">
          Folio<span className="text-primary">.</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition duration-200 font-medium ${
                isActive
                  ? "bg-primary/10 text-text"
                  : "text-text/60 hover:bg-black/5 hover:text-text"
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-black/5">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 bg-red-200 text-red-700 hover:bg-red-300 font-medium py-3 rounded-xl transition cursor-pointer"
        >
          <span></span>
          Log out
        </button>
      </div>
    </aside>
  );
}
