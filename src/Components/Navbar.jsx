import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="w-full fixed top-0 left-0 bg-navbar backdrop-blur-md shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Left - Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-text cursor-pointer hover:text-primaryHover transition"
        >
          Folio
        </Link>

        {/* Center - Navigation links */}
        <div className="hidden md:flex gap-8 text-text/80 font-medium">
          <Link to="/" className="hover:text-primaryHover transition">
            Home
          </Link>
          <a href="#" className="hover:text-primaryHover transition">
            Pricing
          </a>
          <a href="#" className="hover:text-primaryHover transition">
            Templates
          </a>
        </div>

        {/* Right - Auth buttons */}
        <div className="flex items-center gap-4">
          <Link
            to="/login"
            className="cursor-pointer text-text/80 hover:text-text hover:bg-primary px-4 py-2 rounded-lg transition duration-150 ease-in-out"
          >
            Log in
          </Link>

          <Link
            to="/register"
            className="cursor-pointer bg-primary hover:bg-primaryHover text-black px-4 py-2 rounded-lg transition duration-150 ease-in-out"
          >
            Sign up
          </Link>
        </div>
      </div>
    </nav>
  );
}
