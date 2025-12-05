export default function Landing() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative w-full h-screen flex items-center justify-center text-center">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat brightness-50"
          style={{
            backgroundImage:
              "url('https://images.pexels.com/photos/8761523/pexels-photo-8761523.jpeg')",
          }}
        ></div>

        {/* Content */}
        <div className="relative z-10 max-w-3xl px-6">
          <h1 className="text-5xl md:text-7xl font-extrabold text-white drop-shadow-lg">
            Create Beautiful Presentations in Minutes
          </h1>

          <p className="text-white/90 mt-6 text-lg md:text-xl">
            Folio transforms your ideas into professional slides using AI. Fast,
            customizable and stunning.
          </p>

          <div className="mt-10 flex items-center justify-center gap-6">
            <button className="cursor-pointer bg-primary hover:bg-primaryHover text-black px-6 py-3 rounded-xl text-lg transition duration-300 ease-in-out">
              Get Started
            </button>

            <button className="cursor-pointer bg-white/80 hover:bg-white text-gray-900 px-6 py-3 rounded-xl text-lg transition duration-300 ease-in-out backdrop-blur-sm">
              Watch Demo
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
