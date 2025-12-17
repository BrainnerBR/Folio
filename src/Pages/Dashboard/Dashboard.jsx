import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { auth } from "../../Services/firebase";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import {
  Sparkles,
  ArrowRight,
  Zap,
  Lightbulb,
  TrendingUp,
  Presentation,
  Loader2,
  X,
} from "lucide-react";

import { templates } from "../../templates/templates";

export default function Dashboard() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [showAllIdeas, setShowAllIdeas] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error("Please describe your presentation idea.");
      return;
    }

    setIsGenerating(true);
    const toastId = toast.loading(
      "Generating presentation... This may take a moment."
    );

    try {
      if (!auth.currentUser) throw new Error("User not authenticated");

      const token = await auth.currentUser.getIdToken();

      const response = await fetch("http://localhost:5001/api/ai/generate", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ prompt }),
      });

      const text = await response.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch (e) {
        console.error("Respuesta no JSON del backend:", text);
        throw new Error("Invalid JSON response from server");
      }

      if (!response.ok || !data.success) {
        // Aprovechamos el campo "details" si viene
        const msg = data.error || "Failed to generate presentation";
        const extra = data.details ? ` (${data.details})` : "";
        throw new Error(msg + extra);
      }

      console.log("AI Generation Result:", data.data);

      toast.success("Presentation generated successfully!", { id: toastId });

      // Override theme if a template is selected
      let presentationData = data.data;
      if (selectedTemplate) {
        presentationData = {
          ...presentationData,
          theme: selectedTemplate.theme,
        };
      }

      // Navigate to presentation viewer with the generated data
      navigate("/presentation", {
        state: { presentation: presentationData },
      });
    } catch (error) {
      console.error("Generate error:", error);

      let errorMessage = error.message;
      if (
        errorMessage.includes("insufficient_quota") ||
        errorMessage.includes("quota")
      ) {
        errorMessage =
          "OpenAI credit quota exceeded. Please check your billing details.";
      }

      toast.error(errorMessage, { id: toastId });
    } finally {
      setIsGenerating(false);
    }
  };

  const allExamples = [
    {
      icon: <Zap size={20} className="text-blue-600" />,
      text: t('inspiration.startup.text'),
      desc: t('inspiration.startup.desc'),
      color: "bg-blue-50 border-blue-100 hover:border-blue-200",
    },
    {
      icon: <TrendingUp size={20} className="text-emerald-600" />,
      text: t('inspiration.marketing.text'),
      desc: t('inspiration.marketing.desc'),
      color: "bg-emerald-50 border-emerald-100 hover:border-emerald-200",
    },
    {
      icon: <Lightbulb size={20} className="text-amber-600" />,
      text: t('inspiration.business.text'),
      desc: t('inspiration.business.desc'),
      color: "bg-amber-50 border-amber-100 hover:border-amber-200",
    },
    {
      icon: <Presentation size={20} className="text-purple-600" />,
      text: t('inspiration.product.text'),
      desc: t('inspiration.product.desc'),
      color: "bg-purple-50 border-purple-100 hover:border-purple-200",
    },
    {
      icon: <Sparkles size={20} className="text-pink-600" />,
      text: t('inspiration.culture.text'),
      desc: t('inspiration.culture.desc'),
      color: "bg-pink-50 border-pink-100 hover:border-pink-200",
    },
    {
      icon: <TrendingUp size={20} className="text-indigo-600" />,
      text: t('inspiration.sales.text'),
      desc: t('inspiration.sales.desc'),
      color: "bg-indigo-50 border-indigo-100 hover:border-indigo-200",
    },
    {
      icon: <Lightbulb size={20} className="text-orange-600" />,
      text: t('inspiration.workshop.text'),
      desc: t('inspiration.workshop.desc'),
      color: "bg-orange-50 border-orange-100 hover:border-orange-200",
    },
    {
      icon: <Zap size={20} className="text-cyan-600" />,
      text: t('inspiration.tech.text'),
      desc: t('inspiration.tech.desc'),
      color: "bg-cyan-50 border-cyan-100 hover:border-cyan-200",
    },
    {
      icon: <Presentation size={20} className="text-rose-600" />,
      text: t('inspiration.review.text'),
      desc: t('inspiration.review.desc'),
      color: "bg-rose-50 border-rose-100 hover:border-rose-200",
    },
    {
      icon: <Sparkles size={20} className="text-teal-600" />,
      text: t('inspiration.portfolio.text'),
      desc: t('inspiration.portfolio.desc'),
      color: "bg-teal-50 border-teal-100 hover:border-teal-200",
    },
    {
      icon: <TrendingUp size={20} className="text-lime-600" />,
      text: t('inspiration.investment.text'),
      desc: t('inspiration.investment.desc'),
      color: "bg-lime-50 border-lime-100 hover:border-lime-200",
    },
    {
      icon: <Lightbulb size={20} className="text-violet-600" />,
      text: t('inspiration.training.text'),
      desc: t('inspiration.training.desc'),
      color: "bg-violet-50 border-violet-100 hover:border-violet-200",
    },
    {
      icon: <Zap size={20} className="text-fuchsia-600" />,
      text: t('inspiration.event.text'),
      desc: t('inspiration.event.desc'),
      color: "bg-fuchsia-50 border-fuchsia-100 hover:border-fuchsia-200",
    },
    {
      icon: <Presentation size={20} className="text-sky-600" />,
      text: t('inspiration.case.text'),
      desc: t('inspiration.case.desc'),
      color: "bg-sky-50 border-sky-100 hover:border-sky-200",
    },
    {
      icon: <Sparkles size={20} className="text-red-600" />,
      text: t('inspiration.brand.text'),
      desc: t('inspiration.brand.desc'),
      color: "bg-red-50 border-red-100 hover:border-red-200",
    },
  ];

  const examples = allExamples.slice(0, 3);

  return (
    <main className="flex-1 w-full h-full bg(--color-bg) overflow-y-auto">
      <div className="max-w-5xl mx-auto px-6 py-12 lg:px-12">
        {/* Header / Greeting */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="flex items-center gap-2 text-[color:var(--color-text-secondary)] mb-2 uppercase tracking-wider text-xs font-bold">
            <Sparkles size={14} className="text-[color:var(--color-primary)]" />
            <span>{t('dashboard.creative_assistant')}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[color:var(--color-text)] mb-3 leading-tight">
            {t('dashboard.greeting')}{" "}
            <span className="text-black">
              {user?.displayName?.split(" ")[0] || "Creator"}
            </span>
          </h1>
          <p className="text-xl text-[color:var(--color-text-secondary)] font-medium">
            {t('dashboard.subtitle')}
          </p>
        </motion.div>

        {/* Main Input Area */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative group z-10"
        >
          {/* Decorative glow */}
          <div className="absolute -inset-1 bg-gradient-to-r from-[color:var(--color-primary)] to-black-300 rounded-[2rem] blur opacity-25 group-hover:opacity-40 transition duration-700"></div>

          <div className="relative bg-white rounded-3xl p-8 shadow-xl shadow-black/5 border border-[color:var(--color-border-subtle)]">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 bg-yellow-50 rounded-xl text-[color:var(--color-primary-hover)] ring-1 ring-[color:var(--color-primary)]/20">
                <Presentation size={24} />
              </div>
              <h2 className="text-xl font-bold text-[color:var(--color-text)]">
                Presentation Generator
              </h2>
            </div>

            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={t('dashboard.input_placeholder')}
              className="w-full text-lg p-5 rounded-2xl bg-gray-50/50 border border-gray-100 
                         focus:bg-white focus:border-[color:var(--color-primary)] focus:ring-4 focus:ring-[color:var(--color-primary)]/10 
                         outline-none transition-all resize-none min-h-[160px] 
                         placeholder:text-gray-400 text-gray-800 font-medium leading-relaxed"
            />

            <div className="mt-8">
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                {t('dashboard.choose_template')}
              </label>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                <button
                   onClick={() => setSelectedTemplate(null)}
                   className={`relative rounded-xl border-2 p-3 text-left transition-all hover:border-[color:var(--color-primary)]
                     ${!selectedTemplate ? 'border-[color:var(--color-primary)] bg-[color:var(--color-primary)]/5 ring-1 ring-[color:var(--color-primary)]' : 'border-gray-100 hover:bg-gray-50'}
                   `}
                >
                  <div className="aspect-video rounded-lg bg-gray-100 border border-gray-200 mb-2 flex items-center justify-center">
                    <Sparkles size={16} className="text-gray-400" />
                  </div>
                  <span className="text-xs font-semibold block text-gray-700 leading-tight">
                    {t('dashboard.no_template')}
                  </span>
                </button>

                {templates.map((template) => (
                  <button
                    key={template.id}
                    onClick={() => setSelectedTemplate(template)}
                    className={`relative rounded-xl border-2 p-3 text-left transition-all hover:border-[color:var(--color-primary)]
                      ${selectedTemplate?.id === template.id ? 'border-[color:var(--color-primary)] bg-[color:var(--color-primary)]/5 ring-1 ring-[color:var(--color-primary)]' : 'border-gray-100 hover:bg-gray-50'}
                    `}
                  >
                    <div 
                      className="aspect-video rounded-lg bg-cover bg-center mb-2 border border-gray-100"
                      style={{ 
                         // Fallback background if preview is just a path
                         backgroundColor: template.theme.palette.background,
                         backgroundImage: template.theme.background.type === 'gradient' ? template.theme.background.value : 'none'
                      }} 
                    />
                    <span className="text-xs font-semibold block text-gray-700 leading-tight">
                      {t(`templates.${template.id}`)}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center mt-8 gap-4 pt-6 border-t border-gray-100">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Sparkles size={14} />
                <span>Powered by advanced AI</span>
              </div>

              <button
                onClick={handleGenerate}
                disabled={isGenerating}
                className="flex items-center gap-2 bg-[color:var(--color-primary)] text-black px-6 py-3 rounded-xl font-bold hover:bg-[color:var(--color-primary-hover)] transition shadow-lg shadow-yellow-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isGenerating ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    {t('dashboard.generating')}
                  </>
                ) : (
                  <>
                    {t('dashboard.generate_button')}
                    <ArrowRight size={20} />
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.div>

        {/* Suggestions / Inspirations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-[color:var(--color-text)]">
              {t('dashboard.inspiration_title')}
            </h3>
            <button
              onClick={() => setShowAllIdeas(true)}
              className="text-sm font-medium text-[color:var(--color-text-secondary)] hover:text-[color:var(--color-text)] transition-colors cursor-pointer"
            >
              {t('dashboard.view_all')}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {examples.map((ex, i) => (
              <motion.button
                key={i}
                type="button"
                onClick={() => setPrompt((prev) => ex.text + " - " + ex.desc)}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                whileTap={{ scale: 0.98 }}
                className={`flex flex-col gap-3 p-5 rounded-2xl border transition-all text-left bg-white/60 backdrop-blur-sm ${ex.color} hover:shadow-md cursor-pointer`}
              >
                <div className="flex justify-between items-start w-full">
                  <div className="p-2 bg-white rounded-lg shadow-sm ring-1 ring-black/5">
                    {ex.icon}
                  </div>
                </div>
                <div>
                  <span className="block font-bold text-[color:var(--color-text)] mb-1">
                    {ex.text}
                  </span>
                  <span className="block text-sm text-[color:var(--color-text-secondary)] leading-snug">
                    {ex.desc}
                  </span>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Modal for All Ideas */}
        {showAllIdeas && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowAllIdeas(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="bg-white rounded-3xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="sticky top-0 bg-white border-b border-gray-100 px-8 py-6 flex items-center justify-between z-10">
                <div>
                  <h2 className="text-2xl font-bold text-[color:var(--color-text)] mb-1">
                    {t('dashboard.all_ideas')}
                  </h2>
                  <p className="text-sm text-[color:var(--color-text-secondary)]">
                    {t('dashboard.click_to_use')}
                  </p>
                </div>
                <button
                  onClick={() => setShowAllIdeas(false)}
                  className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                >
                  <X size={24} className="text-gray-600" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-8 overflow-y-auto max-h-[calc(90vh-100px)]">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {allExamples.map((ex, i) => (
                    <motion.button
                      key={i}
                      type="button"
                      onClick={() => {
                        setPrompt(ex.text + " - " + ex.desc);
                        setShowAllIdeas(false);
                      }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      whileHover={{ y: -4, transition: { duration: 0.2 } }}
                      whileTap={{ scale: 0.98 }}
                      className={`flex flex-col gap-3 p-5 rounded-2xl border transition-all text-left bg-white/60 backdrop-blur-sm ${ex.color} hover:shadow-md cursor-pointer`}
                    >
                      <div className="flex justify-between items-start w-full">
                        <div className="p-2 bg-white rounded-lg shadow-sm ring-1 ring-black/5">
                          {ex.icon}
                        </div>
                      </div>
                      <div>
                        <span className="block font-bold text-[color:var(--color-text)] mb-1">
                          {ex.text}
                        </span>
                        <span className="block text-sm text-[color:var(--color-text-secondary)] leading-snug">
                          {ex.desc}
                        </span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </main>
  );
}
