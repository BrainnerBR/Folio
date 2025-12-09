import { useState } from "react";
import { motion } from "framer-motion";
import { FolderOpen, Plus, Search } from "lucide-react";

export default function MyProjects() {
  // Simulating state. In a real app, this would come from a backend/context
  const [projects, setProjects] = useState([]);

  return (
    <main className="flex-1 w-full h-full bg-[color:var(--color-bg)] overflow-y-auto p-6 lg:p-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-[color:var(--color-text)]">
            My Projects
          </h1>
          <p className="text-[color:var(--color-text-secondary)] mt-1">
            Manage and organize your work
          </p>
        </div>

        {projects.length > 0 && (
          <button className="flex items-center gap-2 bg-[color:var(--color-text)] text-white px-5 py-2.5 rounded-xl font-medium hover:bg-black/80 transition">
            <Plus size={18} />
            New Project
          </button>
        )}
      </div>

      {/* Content */}
      <div className="min-h-[400px]">
        {projects.length === 0 ? (
          // Empty State
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center h-[60vh] text-center border-2 border-dashed border-[color:var(--color-border-subtle)] rounded-3xl bg-white/50"
          >
            <div className="p-4 bg-gray-100 rounded-full mb-4 text-gray-400">
              <FolderOpen size={48} strokeWidth={1.5} />
            </div>
            <h3 className="text-xl font-bold text-[color:var(--color-text)] mb-2">
              No projects yet
            </h3>
            <p className="text-[color:var(--color-text-secondary)] max-w-sm mb-6">
              It looks like you haven't created any projects yet. Start by
              creating your first presentation or document.
            </p>
            <button
              onClick={() => {}} // Hook up creation logic later
              className="flex items-center gap-2 bg-[color:var(--color-primary)] text-black px-6 py-3 rounded-xl font-bold hover:bg-[color:var(--color-primary-hover)] transition shadow-lg shadow-yellow-500/20"
            >
              <Plus size={20} />
              Create New Project
            </button>
          </motion.div>
        ) : (
          // Projects Grid (Hidden for now as user specifically asked for empty state handling first)
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Project cards would go here */}
          </div>
        )}
      </div>
    </main>
  );
}
