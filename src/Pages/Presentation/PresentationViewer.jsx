import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X, Home, Save } from "lucide-react";
import { db } from "../../Services/firebase";
import { collection, addDoc } from "firebase/firestore";
import { useAuth } from "../../context/AuthContext";
import { toast } from "sonner";

export default function PresentationViewer() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const presentationData = location.state?.presentation;

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isSaving, setIsSaving] = useState(false);

  if (!presentationData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            No presentation data found
          </h2>
          <button
            onClick={() => navigate("/dashboard")}
            className="px-6 py-3 bg-[color:var(--color-primary)] text-black rounded-xl font-bold hover:bg-[color:var(--color-primary-hover)] transition"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const { title, description, slides } = presentationData;
  const totalSlides = slides?.length || 0;

  const nextSlide = () => {
    if (currentSlide < totalSlides - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "ArrowRight") nextSlide();
    if (e.key === "ArrowLeft") prevSlide();
    if (e.key === "Escape") navigate("/dashboard");
  };

  const handleSavePresentation = async () => {
    if (!user) {
      toast.error("You must be logged in to save presentations");
      return;
    }

    setIsSaving(true);
    try {
      await addDoc(collection(db, "presentations"), {
        userId: user.uid,
        title: presentationData.title,
        description: presentationData.description || "",
        slides: presentationData.slides,
        createdAt: new Date(),
        slideCount: presentationData.slides.length,
      });

      toast.success("Presentation saved successfully!");
    } catch (error) {
      console.error("Error saving presentation:", error);
      toast.error("Failed to save presentation");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex flex-col"
      onKeyDown={handleKeyPress}
      tabIndex={0}
    >
      {/* Header */}
      <header className="bg-black/30 backdrop-blur-sm border-b border-white/10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">{title}</h1>
            {description && (
              <p className="text-sm text-gray-400 mt-1">{description}</p>
            )}
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-400">
              {currentSlide + 1} / {totalSlides}
            </span>
            <button
              onClick={handleSavePresentation}
              disabled={isSaving}
              className="flex items-center gap-2 px-4 py-2 bg-[color:var(--color-primary)] hover:bg-[color:var(--color-primary-hover)] text-black rounded-lg transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              title="Save Presentation"
            >
              <Save size={20} />
              <span className="hidden sm:inline">
                {isSaving ? "Saving..." : "Save"}
              </span>
            </button>
            <button
              onClick={() => navigate("/dashboard")}
              className="p-2 hover:bg-white/10 rounded-lg transition text-white"
              title="Exit Presentation"
            >
              <X size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Slide Content */}
      <main className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-5xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-3xl shadow-2xl p-12 min-h-[500px] flex flex-col justify-center"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                {slides[currentSlide]?.title}
              </h2>
              <div className="text-xl text-gray-700 leading-relaxed whitespace-pre-wrap">
                {slides[currentSlide]?.content}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Navigation Controls */}
      <footer className="bg-black/30 backdrop-blur-sm border-t border-white/10 px-6 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition"
          >
            <Home size={20} />
            <span className="hidden sm:inline">Dashboard</span>
          </button>

          <div className="flex items-center gap-4">
            <button
              onClick={prevSlide}
              disabled={currentSlide === 0}
              className="p-3 bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed text-white rounded-lg transition"
            >
              <ChevronLeft size={24} />
            </button>

            {/* Slide Indicators */}
            <div className="hidden md:flex items-center gap-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition ${
                    index === currentSlide
                      ? "bg-[color:var(--color-primary)] w-8"
                      : "bg-white/30 hover:bg-white/50"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              disabled={currentSlide === totalSlides - 1}
              className="p-3 bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed text-white rounded-lg transition"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          <div className="w-24 text-right text-sm text-gray-400">
            Use ← → keys
          </div>
        </div>
      </footer>
    </div>
  );
}
