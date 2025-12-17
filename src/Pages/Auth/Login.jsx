import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../../Components/Footer";
import { useTranslation } from "react-i18next";

export default function Login() {
  const { t } = useTranslation();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
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
      await login(form.email, form.password);
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setError(t('auth.login.error'));
    }
  };

  return (
    <>
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-100px)] px-6">
      <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md border border-black/5">
        <h2 className="text-3xl font-bold text-center mb-6 text-text">
          {t('auth.login.title')}
        </h2>

        {error && <div className="text-red-500 text-center mb-4">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text/70 mb-1">
              {t('auth.email')}
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-xl border border-black/10 focus:outline-none focus:ring-2 focus:ring-primary/50"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text/70 mb-1">
              {t('auth.password')}
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-xl border border-black/10 focus:outline-none focus:ring-2 focus:ring-primary/50"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-primary hover:bg-primaryHover text-black font-semibold py-3 rounded-xl transition cursor-pointer"
          >
            {t('auth.login.submit')}
          </button>
        </form>
        <p className="mt-4 text-center text-text/60 text-sm">
          {t('auth.login.no_account')}{" "}
          <Link
            to="/register"
            className="text-primaryHover hover:underline font-semibold"
          >
            {t('auth.signup')}
          </Link>
        </p>
      </div>
    </div>

      <Footer />
    </>
  );
}
