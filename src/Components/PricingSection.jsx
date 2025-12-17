import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function PricingSection() {
  const { t } = useTranslation();

  const plans = [
    {
      name: t('pricing.plans.pro.name'),
      price: "$19",
      period: "/month",
      description: t('pricing.plans.pro.description'),
      features: t('pricing.plans.pro.features', { returnObjects: true }),
      button: t('pricing.button'),
    },
    {
      name: t('pricing.plans.enterprise.name'),
      price: "$49",
      period: "/month",
      description: t('pricing.plans.enterprise.description'),
      features: t('pricing.plans.enterprise.features', { returnObjects: true }),
      button: t('pricing.button'),
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, 
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <section className="w-full bg-bg py-28 px-6 overflow-hidden">
      <div className="max-w-5xl mx-auto text-center mb-16">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.6 }}
        >
          <h2 className="text-5xl font-extrabold text-text mb-4 leading-tight">
            {t('pricing.title')}
          </h2>
          <p className="text-lg text-text/70 max-w-2xl mx-auto">
            {t('pricing.subtitle')}
          </p>
        </motion.div>
      </div>

      {/* PRICING CARDS */}
      <motion.div 
        className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        {plans.map((plan, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            whileHover={{ y: -10, transition: { duration: 0.3 } }}
            className={`relative rounded-3xl bg-white shadow-lg border border-black/10 p-8
    hover:shadow-2xl transition-shadow duration-300 flex flex-col h-full
  `}
          >
            {/* Popular Badge */}
            {index === 0 && (
              <span className="absolute -top-3 right-6 bg-[color:var(--color-primary)] text-black text-xs font-semibold px-3 py-1 rounded-full shadow">
                {t('pricing.popular')}
              </span>
            )}

            {/* Content Wrapper */}
            <div className="flex-1 flex flex-col">
              {/* Name */}
              <h3 className="text-2xl font-bold text-text mb-2">{plan.name}</h3>

              {/* Price */}
              <div className="flex items-end gap-1 mb-4">
                <span className="text-5xl font-extrabold text-text">
                  {plan.price}
                </span>
                <span className="text-text/60 font-medium mb-1">
                  {plan.period}
                </span>
              </div>

              {/* Description */}
              <p className="text-text/60 mb-6">{plan.description}</p>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {Array.isArray(plan.features) && plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 text-text/80">
                    <span className="text-lg">✔️</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Button fixed bottom */}
            <button
              className={`w-full py-3 rounded-xl font-semibold border transition cursor-pointer mt-auto ${
                index === 0
                  ? "bg-[color:var(--color-primary)] hover:bg-[color:var(--color-primaryHover)] border-transparent text-black"
                  : "bg-primary hover:bg-primaryHover border-black/10 text-black"
              }`}
            >
              {plan.button}
            </button>
          </motion.div>
        ))}
      </motion.div>

      {/* FOOTER TEXT BELOW */}
      <motion.div 
        className="text-center mt-10 text-text/70 text-sm"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        {t('pricing.contact')}{" "}
        <a
          href="#"
          className="text-primaryHover hover:text-primary font-medium"
        >
          {t('pricing.contact_link')}
        </a>
      </motion.div>
    </section>
  );
}
