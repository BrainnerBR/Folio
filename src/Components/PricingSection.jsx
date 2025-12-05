export default function PricingSection() {
  const plans = [
    {
      name: "Pro",
      price: "$19",
      period: "/month",
      description: "Perfect for creators, freelancers and students.",
      features: [
        "Unlimited Presentations",
        "AI Slide Generator",
        "Premium Templates Library",
        "Cloud Storage (10GB)",
        "Export to PDF/PPTX",
        "Basic Analytics",
      ],
      button: "Choose Plan",
    },
    {
      name: "Enterprise",
      price: "$49",
      period: "/month",
      description: "Designed for teams and businesses that need more power.",
      features: [
        "All Pro Features",
        "Advanced Custom Branding",
        "Prioritized AI Support",
        "AI Team Collaboration",
        "Admin Access & Controls",
        "API Access",
        "Unlimited Cloud Storage",
      ],
      button: "Choose Plan",
    },
  ];

  return (
    <section className="w-full bg-bg py-28 px-6">
      <div className="max-w-5xl mx-auto text-center mb-16">
        <h2 className="text-5xl font-extrabold text-text mb-4 leading-tight">
          Simple, Transparent Pricing
        </h2>
        <p className="text-lg text-text/70 max-w-2xl mx-auto">
          Choose the plan that fits your workflow. Upgrade anytime. Cancel
          whenever you want — no hidden fees.
        </p>
      </div>

      {/* PRICING CARDS */}
      <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`relative rounded-3xl bg-white shadow-lg border border-black/10 p-8
    hover:shadow-2xl transition duration-300 flex flex-col h-full
  `}
          >
            {/* Popular Badge */}
            {plan.popular && (
              <span className="absolute -top-3 right-6 bg-(--color-primary) text-black text-xs font-semibold px-3 py-1 rounded-full shadow">
                Popular
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
                {plan.features.map((feature, i) => (
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
                plan.popular
                  ? "bg-(--color-primary) hover:bg-(--color-primaryHover) border-transparent text-black"
                  : "bg-primary hover:bg-primaryHover border-black/10 text-black"
              }`}
            >
              {plan.button}
            </button>
          </div>
        ))}
      </div>

      {/* FOOTER TEXT BELOW */}
      <div className="text-center mt-10 text-text/70 text-sm">
        Need help choosing a plan?{" "}
        <a
          href="#"
          className="text-primaryHover hover:text-primary font-medium"
        >
          Contact us
        </a>
      </div>
    </section>
  );
}
