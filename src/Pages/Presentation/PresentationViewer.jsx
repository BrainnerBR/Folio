import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  X,
  Home,
  Save,
  Maximize,
  Minimize,
  Palette,
  Trash2,
} from "lucide-react";
import { db } from "../../Services/firebase";
import {
  collection,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { useAuth } from "../../context/AuthContext";
import { toast } from "sonner";
import { applyTheme, getTheme, getThemeNames } from "./themes";
import { assignLayouts } from "./SlideRenderer";
import SlideRenderer from "./SlideRenderer";
import { useTranslation } from "react-i18next";

export default function PresentationViewer() {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const presentationData = location.state?.presentation;
  const containerRef = useRef(null);
  const slideContainerRef = useRef(null);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const [isPresentationMode, setIsPresentationMode] = useState(false);
  const [currentTheme, setCurrentTheme] = useState(
    presentationData?.theme || "modern-light"
  );
  const [showThemeSelector, setShowThemeSelector] = useState(false);

  // Usar el ID que viene en presentationData (si viene de mis proyectos)
  const [presentationId, setPresentationId] = useState(
    presentationData?.id || null
  );

  if (!presentationData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            {t('presentation.no_data')}
          </h2>
          <button
            onClick={() => navigate("/dashboard")}
            className="px-6 py-3 bg-[color:var(--color-primary)] text-black rounded-xl font-bold hover:bg-[color:var(--color-primary-hover)] transition"
          >
            {t('presentation.go_dashboard')}
          </button>
        </div>
      </div>
    );
  }

  const { title, description, slides: rawSlides } = presentationData;

  // Asignar layouts automáticamente si no los tienen
  const slides = assignLayouts(rawSlides);
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

  const enterPresentationMode = async () => {
    try {
      if (containerRef.current) {
        await containerRef.current.requestFullscreen();
        setIsPresentationMode(true);
      }
    } catch (error) {
      console.error("Error entering fullscreen:", error);
      toast.error("Could not enter presentation mode");
    }
  };

  const exitPresentationMode = async () => {
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      }
      setIsPresentationMode(false);
    } catch (error) {
      console.error("Error exiting fullscreen:", error);
    }
  };

  // Detectar cuando el usuario sale de pantalla completa con ESC
  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        setIsPresentationMode(false);
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  // Aplicar theme al contenedor de slides
  useEffect(() => {
    if (slideContainerRef.current) {
      applyTheme(slideContainerRef.current, currentTheme);
    }
  }, [currentTheme]);

  const handleKeyPress = (e) => {
    if (e.key === "ArrowRight") nextSlide();
    if (e.key === "ArrowLeft") prevSlide();
    if (e.key === "Escape") {
      if (isPresentationMode) {
        exitPresentationMode();
      } else {
        navigate("/dashboard");
      }
    }
  };

  const handleSavePresentation = async () => {
    if (!user) {
      toast.error("You must be logged in to save presentations");
      return;
    }

    setIsSaving(true);
    try {
      if (presentationId) {
        // Actualizar existente
        const docRef = doc(db, "presentations", presentationId);
        await updateDoc(docRef, {
          title: presentationData.title, // En caso de que se pueda editar el título después
          description: presentationData.description || "",
          slides: slides, // Guardar con layouts asignados
          theme: currentTheme,
          updatedAt: new Date(),
          slideCount: slides.length,
        });
        toast.success(t('presentation.update_success'));
      } else {
        // Crear nueva
        const docRef = await addDoc(collection(db, "presentations"), {
          userId: user.uid,
          title: presentationData.title,
          description: presentationData.description || "",
          slides: slides,
          theme: currentTheme,
          createdAt: new Date(),
          updatedAt: new Date(),
          slideCount: slides.length,
        });
        setPresentationId(docRef.id);
        toast.success(t('presentation.save_success'));
      }
    } catch (error) {
      console.error("Error saving presentation:", error);
      toast.error("Failed to save presentation");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeletePresentation = async () => {
    if (!presentationId) {
      toast.error("Cannot delete unsaved presentation");
      return;
    }

    if (
      !window.confirm(
        t('presentation.delete_confirm')
      )
    ) {
      return;
    }

    try {
      await deleteDoc(doc(db, "presentations", presentationId));
      toast.success(t('presentation.delete_success'));
      navigate("/dashboard");
    } catch (error) {
      console.error("Error deleting presentation:", error);
      toast.error("Failed to delete presentation");
    }
  };

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex flex-col"
      onKeyDown={handleKeyPress}
      tabIndex={0}
    >
      {/* Header */}
      <header
        className={`relative z-50 bg-black/30 backdrop-blur-sm border-b border-white/10 px-6 py-4 transition-opacity duration-300 ${
          isPresentationMode ? "opacity-0 hover:opacity-100" : ""
        }`}
      >
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

            {/* Theme Selector */}
            <div className="relative">
              <button
                onClick={() => setShowThemeSelector(!showThemeSelector)}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition font-semibold"
                title="Change theme"
              >
                <Palette size={20} />
                <span className="hidden sm:inline">{t('presentation.theme')}</span>
              </button>

              {/* Theme Dropdown */}
              {showThemeSelector && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden z-50 min-w-[200px] max-h-[60vh] overflow-y-auto"
                >
                  {getThemeNames().map((themeName) => {
                    const theme = getTheme(themeName);
                    return (
                      <button
                        key={themeName}
                        onClick={() => {
                          setCurrentTheme(themeName);
                          setShowThemeSelector(false);
                          toast.success(t('presentation.theme_changed', { theme: theme.name }));
                        }}
                        className={`w-full px-4 py-3 text-left hover:bg-gray-50 transition flex items-center justify-between ${
                          currentTheme === themeName ? "bg-indigo-50" : ""
                        }`}
                      >
                        <span className="font-medium text-gray-800">
                          {theme.name}
                        </span>
                        {currentTheme === themeName && (
                          <div className="w-2 h-2 rounded-full bg-indigo-600" />
                        )}
                      </button>
                    );
                  })}
                </motion.div>
              )}
            </div>

            <button
              onClick={
                isPresentationMode
                  ? exitPresentationMode
                  : enterPresentationMode
              }
              className="flex items-center gap-2 px-4 py-2 bg-[color:var(--color-primary)] hover:bg-[color:var(--color-primary-hover)] text-black rounded-lg transition font-semibold"
              title={
                isPresentationMode
                  ? "Exit presentation mode"
                  : "Enter presentation mode"
              }
            >
              {isPresentationMode ? (
                <Minimize size={20} />
              ) : (
                <Maximize size={20} />
              )}
              <span className="hidden sm:inline">
                {isPresentationMode ? t('presentation.exit_present') : t('presentation.present')}
              </span>
            </button>
            <button
              onClick={handleSavePresentation}
              disabled={isSaving}
              className="flex items-center gap-2 px-4 py-2 bg-[color:var(--color-primary)] hover:bg-[color:var(--color-primary-hover)] text-black rounded-lg transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              title="Save Presentation"
            >
              <Save size={20} />
              <span className="hidden sm:inline">
                {isSaving ? t('presentation.saving') : t('presentation.save')}
              </span>
            </button>
            {/* Mostrar botón de eliminar solo si existe ID y no estamos en modo presentación completa */}

            <button
              onClick={() => navigate("/dashboard")}
              className="p-2 hover:bg-white/10 rounded-lg transition text-white"
              title="Exit to Dashboard"
            >
              <X size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Slide Content */}
      <main className="flex-1 flex items-center justify-center p-8">
        <div ref={slideContainerRef} className="w-full max-w-6xl">
          <div
            className="rounded-3xl shadow-2xl overflow-hidden min-h-[600px] transition-all duration-500 ease-in-out"
            style={{
              background: "var(--theme-background-value)",
            }}
          >
            <SlideRenderer
              slide={slides[currentSlide]}
              index={currentSlide}
              theme={currentTheme}
              isActive={true}
            />
          </div>
        </div>
      </main>

      {/* Navigation Controls */}
      <footer
        className={`bg-black/30 backdrop-blur-sm border-t border-white/10 px-6 py-6 transition-opacity duration-300 ${
          isPresentationMode ? "opacity-0 hover:opacity-100" : ""
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition"
          >
            <Home size={20} />
            <span className="hidden sm:inline">{t('presentation.dashboard')}</span>
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
            {t('presentation.use_arrows')}
          </div>
        </div>
      </footer>
    </div>
  );
}
