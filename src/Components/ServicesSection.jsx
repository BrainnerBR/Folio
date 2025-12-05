export default function ServicesShowcase() {
  const features = [
    {
      title: "AI Presentation Generator",
      desc: "Generate full slide decks instantly with just a prompt.",
      icon: "⚡",
    },
    {
      title: "Smart Templates",
      desc: "Choose modern layouts optimized for clarity and impact.",
      icon: "🎨",
    },
    {
      title: "Fast Editing Tools",
      desc: "Modify text, colors, and structure with intuitive controls.",
      icon: "🛠️",
    },
    {
      title: "Export to PDF / PPTX",
      desc: "Download your presentation in professional formats.",
      icon: "📤",
    },
  ];

  return (
    <section className="w-full bg-bg py-28 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16">
        {/* LEFT — Big Title */}
        <div>
          <h1 className="text-5xl md:text-6xl font-bold text-text leading-tight mb-6">
            Transform Your Workflow <br /> With Intelligent Creation
          </h1>
        </div>

        {/* RIGHT — Small paragraph */}
        <div className="flex items-center">
          <p className="text-lg text-text/70 max-w-md">
            Our AI-powered tools simplify your creative process with modern
            presentation design, optimized structure, and automated visual
            balance — all crafted to save time and elevate results.
          </p>
        </div>
      </div>

      {/* CARDS */}
      <div className="mt-16 grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {features.map((item, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl p-6 border border-black/10 shadow-md hover:shadow-xl transition duration-300"
          >
            <div className="text-4xl mb-4">{item.icon}</div>
            <h3 className="text-xl font-semibold text-text mb-2">
              {item.title}
            </h3>
            <p className="text-text/60 text-sm">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* BOTTOM DESCRIPTION */}
      <p className="text-center text-text/70 text-lg mt-12 max-w-3xl mx-auto">
        We make your creative work faster, clearer, and visually stronger — so
        you can focus on building ideas, not formatting slides.
      </p>
    </section>
  );
}
