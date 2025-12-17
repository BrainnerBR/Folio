import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Navbar() {
  const { t } = useTranslation();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  return (
    <nav className="w-full fixed top-0 left-0 bg-navbar backdrop-blur-md shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 grid grid-cols-2 md:grid-cols-3 items-center">
        {/* Left - Logo */}
        <div className="justify-self-start">
          <Link
            to="/"
            className="text-2xl font-bold text-text cursor-pointer hover:text-primaryHover transition"
          >
            Folio<span className="text-primary">.</span>
          </Link>
        </div>

        {/* Center - Navigation links */}
        <div className="hidden md:flex gap-8 text-text/80 font-medium justify-self-center">
          <Link to="/" className="hover:text-primaryHover transition">
            {t('navbar.home')}
          </Link>
          <a href="#" className="hover:text-primaryHover transition">
            {t('navbar.pricing')}
          </a>
          <a href="#" className="hover:text-primaryHover transition">
            {t('navbar.templates')}
          </a>
        </div>

        {/* Right - Auth buttons */}
        <div className="flex items-center gap-4 justify-self-end">
          <LanguageSwitcher />
          {user ? (
            <>
              <Link
                to="/dashboard"
                className="text-text/80 hover:text-text font-medium transition"
              >
                {t('navbar.dashboard')}
              </Link>
              <button
                onClick={handleLogout}
                className="cursor-pointer bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition duration-150 ease-in-out"
              >
                {t('navbar.logout')}
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="cursor-pointer text-text/80 hover:text-text hover:bg-primary px-4 py-2 rounded-lg transition duration-150 ease-in-out"
              >
                {t('navbar.login')}
              </Link>

              <Link
                to="/register"
                className="cursor-pointer bg-primary hover:bg-primaryHover text-black px-4 py-2 rounded-lg transition duration-150 ease-in-out"
              >
                {t('navbar.signup')}
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
