import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { auth } from "../../Services/firebase";
import { motion } from "framer-motion";
import { toast } from "sonner";
import {
  Sparkles,
  ArrowRight,
  Zap,
  Lightbulb,
  TrendingUp,
  Presentation,
  Loader2,
} from "lucide-react";

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

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

      const response = await fetch("http://localhost:5000/api/ai/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ prompt }),
      });

      const text = await response.text(); // <- leemos como texto primero

      let data;
      try {
        data = JSON.parse(text);
      } catch (e) {
        console.error("Respuesta no JSON del backend:", text);
        throw new Error("Invalid JSON response from server");
      }

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to generate presentation");
      }

      console.log("AI Generation Result:", data.data);

      toast.success("Presentation generated successfully!", { id: toastId });

      // Navigate to presentation viewer with the generated data
      navigate("/presentation", {
        state: { presentation: data.data },
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

  const examples = [
    {
      icon: <Zap size={20} className="text-blue-600" />,
      text: "Startup Pitch Deck",
      desc: "Classic investor structure",
      color: "bg-blue-50 border-blue-100 hover:border-blue-200",
    },
    {
      icon: <TrendingUp size={20} className="text-emerald-600" />,
      text: "Marketing Report",
      desc: "Monthly KPI & strategy analysis",
      color: "bg-emerald-50 border-emerald-100 hover:border-emerald-200",
    },
    {
      icon: <Lightbulb size={20} className="text-amber-600" />,
      text: "Business Proposal",
      desc: "Client service offer",
      color: "bg-amber-50 border-amber-100 hover:border-amber-200",
    },
  ];

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
            <span>Creative Assistant</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[color:var(--color-text)] mb-3 leading-tight">
            Hello,{" "}
            <span className="text-black">
              {user?.displayName?.split(" ")[0] || "Creator"}
            </span>
          </h1>
          <p className="text-xl text-[color:var(--color-text-secondary)] font-medium">
            What story shall we create today?
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
              placeholder="Describe your idea here. Ex: A modern presentation for a sustainable clothing brand seeking investment..."
              className="w-full text-lg p-5 rounded-2xl bg-gray-50/50 border border-gray-100 
                         focus:bg-white focus:border-[color:var(--color-primary)] focus:ring-4 focus:ring-[color:var(--color-primary)]/10 
                         outline-none transition-all resize-none min-h-[160px] 
                         placeholder:text-gray-400 text-gray-800 font-medium leading-relaxed"
            />

            <div className="flex flex-col md:flex-row justify-between items-center mt-6 gap-4">
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
                    Generating...
                  </>
                ) : (
                  <>
                    Generate
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
              Quick Inspiration
            </h3>
            <button className="text-sm font-medium text-[color:var(--color-text-secondary)] hover:text-[color:var(--color-text)] transition-colors cursor-pointer">
              View all
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
      </div>
    </main>
  );
}
