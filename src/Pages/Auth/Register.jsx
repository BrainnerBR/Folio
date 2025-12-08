import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { updateProfile } from "firebase/auth";
import { auth } from "../../Services/firebase";
import Footer from "../../Components/Footer";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.name.trim()) {
      setError("Por favor ingresa tu nombre completo.");
      return;
    }

    try {
      // Create user
      const userCredential = await register(form.email, form.password);

      // Update profile with name
      await updateProfile(userCredential.user, {
        displayName: form.name,
      });

      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setError(
        "Error al crear la cuenta. Revisa tus credenciales o intenta con otro correo."
      );
    }
  };

  return (
    <>
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-100px)] px-6">
      <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md border border-black/5">
        <h2 className="text-3xl font-bold text-center mb-6 text-text">
          Create Account
        </h2>

        {error && <div className="text-red-500 text-center mb-4">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text/70 mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-xl border border-black/10 focus:outline-none focus:ring-2 focus:ring-primary/50"
              placeholder="John Doe"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text/70 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-xl border border-black/10 focus:outline-none focus:ring-2 focus:ring-primary/50"
              placeholder="you@example.com"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text/70 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-xl border border-black/10 focus:outline-none focus:ring-2 focus:ring-primary/50"
              placeholder="••••••••"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-primary hover:bg-primaryHover text-black font-semibold py-3 rounded-xl transition cursor-pointer"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-4 text-center text-text/60 text-sm">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-primaryHover hover:underline font-semibold"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
    <Footer />
    </>
  );
}
