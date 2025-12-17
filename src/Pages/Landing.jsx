import ServicesSection from "../Components/ServicesSection";
import PricingSection from "../Components/PricingSection";
import Footer from "../Components/Footer";
import { motion } from "framer-motion";
import { useTranslation, Trans } from "react-i18next";

export default function Landing() {
  const { t } = useTranslation();
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative w-full h-screen flex items-center justify-center text-center overflow-hidden">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat brightness-50"
          style={{
            backgroundImage:
              "url('https://images.pexels.com/photos/8761523/pexels-photo-8761523.jpeg')",
          }}
        ></div>

        {/* Content */}
        <motion.div
           className="relative z-10 max-w-4xl px-6"
           variants={staggerContainer}
           initial="hidden"
           animate="visible"
        >
          <motion.h1 
            className="text-5xl md:text-7xl font-extrabold text-white drop-shadow-lg leading-tight"
            variants={fadeInUp}
          >
            <Trans i18nKey="landing.hero.title" />
          </motion.h1>

          <motion.p 
            className="text-white/90 mt-6 text-lg md:text-xl max-w-2xl mx-auto"
            variants={fadeInUp}
          >
            {t('landing.hero.subtitle')}
          </motion.p>

          <motion.div 
            className="mt-10 flex items-center justify-center gap-6"
            variants={fadeInUp}
          >
            <motion.button 
            to="/dashboard"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="cursor-pointer bg-primary hover:bg-primaryHover text-black px-8 py-4 rounded-xl text-lg font-semibold transition shadow-lg hover:shadow-primary/50"
            >
              {t('landing.hero.cta_start')}
            </motion.button>

            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="cursor-pointer bg-white/10 hover:bg-white/20 text-white border border-white/30 px-8 py-4 rounded-xl text-lg font-semibold transition backdrop-blur-md"
            >
              {t('landing.hero.cta_demo')}
            </motion.button>
          </motion.div>
        </motion.div>
      </section>
      <ServicesSection />
      <PricingSection />
      <Footer />
    </div>
  );
}
