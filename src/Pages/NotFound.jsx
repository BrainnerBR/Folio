import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, ArrowLeft, Ghost } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function NotFound() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-bg text-text p-4 overflow-hidden relative">
      {/* Abstract Background Elements */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10 text-center max-w-2xl px-6"
      >
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center mb-6"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="relative"
          >
            <Ghost
              size={120}
              className="text-primary opacity-90"
              strokeWidth={1.5}
            />
            {/* Simple shadow/glow underneath */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-20 h-4 bg-primary/30 blur-lg rounded-full" />
          </motion.div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-8xl md:text-9xl font-bold tracking-tighter mb-2"
        >
          404
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-2xl md:text-3xl font-semibold mb-4"
        >
          {t('not_found.title')}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-(--color-text-secondary) text-lg mb-8 max-w-md mx-auto"
        >
          {t('not_found.desc')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-6 py-3 rounded-xl border border-(--color-border-subtle) hover:bg-bg2 transition-colors font-medium cursor-pointer"
          >
            <ArrowLeft size={20} />
            {t('not_found.go_back')}
          </button>

          <Link
            to="/"
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-black font-semibold hover:bg-primaryHover transition-transform hover:scale-105 shadow-lg shadow-primary/20"
          >
            <Home size={20} />
            {t('not_found.back_home')}
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
