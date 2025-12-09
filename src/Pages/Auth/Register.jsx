import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../Services/firebase";
import { toast } from "sonner";
import Footer from "../../Components/Footer";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // 1. Crear usuario en Auth
      const res = await register(form.email, form.password);
      const user = res.user;

      // 2. Asignar nombre completo
      const fullName = `${form.firstName} ${form.lastName}`;
      await updateProfile(user, { displayName: fullName });

      // 3. Guardar en Firestore
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        firstName: form.firstName,
        lastName: form.lastName,
        fullName,
        email: form.email,
        createdAt: new Date(),
      });

      // 4. Redirigir
      toast.success("Account created successfully!");
      navigate("/dashboard");
    } catch (err) {
      console.log(err);
      setError("Error al crear la cuenta. Verifica los datos.");
      toast.error("Error creating account.");
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-100px)] px-6">
        <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md border border-black/5">
          <h2 className="text-3xl font-bold text-center mb-6 text-text">
            Create Account
          </h2>

          {error && (
            <div className="text-red-500 text-center mb-4">{error}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex gap-4">
              <div className="w-1/2">
                <label className="block text-sm font-medium text-text/70 mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-xl border border-black/10 focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="John"
                  required
                />
              </div>

              <div className="w-1/2">
                <label className="block text-sm font-medium text-text/70 mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-xl border border-black/10 focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="Doe"
                  required
                />
              </div>
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
