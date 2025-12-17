import { motion } from "framer-motion";
import { useTranslation, Trans } from "react-i18next";

export default function ServicesShowcase() {
  const { t } = useTranslation();

  const features = [
    {
      title: t('services.features.ai_gen.title'),
      desc: t('services.features.ai_gen.desc'),
      icon: "⚡",
    },
    {
      title: t('services.features.templates.title'),
      desc: t('services.features.templates.desc'),
      icon: "🎨",
    },
    {
      title: t('services.features.tools.title'),
      desc: t('services.features.tools.desc'),
      icon: "🛠️",
    },
    {
      title: t('services.features.export.title'),
      desc: t('services.features.export.desc'),
      icon: "📤",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Stagger effect for children
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <section className="w-full bg-bg py-28 px-6 overflow-hidden">
      <motion.div 
        className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
      >
        {/* LEFT — Big Title */}
        <motion.div variants={itemVariants}>
          <h1 className="text-5xl md:text-6xl font-bold text-text leading-tight mb-6">
            <Trans i18nKey="services.title" />
          </h1>
        </motion.div>

        {/* RIGHT — Small paragraph */}
        <motion.div className="flex items-center" variants={itemVariants}>
          <p className="text-lg text-text/70 max-w-md">
            {t('services.description')}
          </p>
        </motion.div>
      </motion.div>

      {/* CARDS */}
      <motion.div 
        className="mt-16 grid md:grid-cols-4 gap-6 max-w-6xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        {features.map((item, i) => (
          <motion.div
            key={i}
            variants={itemVariants}
            whileHover={{ y: -10, transition: { duration: 0.3 } }}
            className="bg-white rounded-2xl p-6 border border-black/10 shadow-md hover:shadow-xl transition-shadow duration-300"
          >
            <div className="text-4xl mb-4">{item.icon}</div>
            <h3 className="text-xl font-semibold text-text mb-2">
              {item.title}
            </h3>
            <p className="text-text/60 text-sm">{item.desc}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* BOTTOM DESCRIPTION */}
      <motion.p 
        className="text-center text-text/70 text-lg mt-12 max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        {t('services.bottom_text')}
      </motion.p>
    </section>
  );
}
