import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-text bg-bg">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl mb-8">Page not found</p>
      <Link
        to="/"
        className="px-6 py-3 bg-primary hover:bg-primaryHover text-black rounded-xl font-semibold transition"
      >
        Go Home
      </Link>
    </div>
  );
}
