import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FolderOpen,
  Plus,
  Search,
  FileText,
  Calendar,
  Trash2,
} from "lucide-react";
import { db } from "../../Services/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

export default function MyProjects() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPresentations = async () => {
      if (!user) return;

      try {
        const q = query(
          collection(db, "presentations"),
          where("userId", "==", user.uid),
          orderBy("createdAt", "desc")
        );

        const querySnapshot = await getDocs(q);
        const presentations = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setProjects(presentations);
      } catch (error) {
        console.error("Error fetching presentations:", error);
        toast.error("Failed to load presentations");
      } finally {
        setLoading(false);
      }
    };

    fetchPresentations();
  }, [user]);

  const handleViewPresentation = (presentation) => {
    navigate("/presentation", {
      state: {
        presentation: {
          ...presentation, // Pasamos todo el objeto, incluyendo id y theme
        },
      },
    });
  };

  const handleDeleteProject = async (e, projectId) => {
    e.stopPropagation(); // Evitar que se abra la presentación al hacer clic en borrar

    if (
      !window.confirm(
        t('projects.delete_confirm')
      )
    ) {
      return;
    }

    try {
      await deleteDoc(doc(db, "presentations", projectId));

      // Actualizar estado local
      setProjects(projects.filter((p) => p.id !== projectId));
      toast.success(t('projects.delete_success'));
    } catch (error) {
      console.error("Error deleting project:", error);
      toast.error(t('projects.delete_error'));
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return "Unknown date";
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <main className="flex-1 w-full h-full bg-[color:var(--color-bg)] overflow-y-auto p-6 lg:p-12">
        <div className="flex items-center justify-center h-[60vh]">
          <l-helix size="45" speed="2.5" color="#F3DE2C"></l-helix>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 w-full h-full bg-[color:var(--color-bg)] overflow-y-auto p-6 lg:p-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-[color:var(--color-text)]">
            {t('projects.title')}
          </h1>
          <p className="text-[color:var(--color-text-secondary)] mt-1">
            {projects.length}{" "}
            {t('projects.saved')}
          </p>
        </div>

        {projects.length > 0 && (
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2 bg-[color:var(--color-text)] text-white px-5 py-2.5 rounded-xl font-medium hover:bg-black/80 transition"
          >
            <Plus size={18} />
            {t('projects.new')}
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
              {t('projects.empty.title')}
            </h3>
            <p className="text-[color:var(--color-text-secondary)] max-w-sm mb-6">
              {t('projects.empty.desc')}
            </p>
            <button
              onClick={() => navigate("/dashboard")}
              className="flex items-center gap-2 bg-[color:var(--color-primary)] text-black px-6 py-3 rounded-xl font-bold hover:bg-[color:var(--color-primary-hover)] transition shadow-lg shadow-yellow-500/20"
            >
              <Plus size={20} />
              {t('projects.empty.create')}
            </button>
          </motion.div>
        ) : (
          // Projects Grid
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => handleViewPresentation(project)}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border border-gray-100 hover:border-[color:var(--color-primary)] group cursor-pointer relative"
              >
                <div className="absolute bottom-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={(e) => handleDeleteProject(e, project.id)}
                    className="p-2 bg-white/80 hover:bg-red-50 text-red-500 rounded-lg backdrop-blur-sm shadow-sm hover:shadow transition-all"
                    title="Delete Project"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-xl text-white">
                    <FileText size={24} />
                  </div>
                  <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                    {project.slideCount || 0} {t('projects.slides')}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 pr-8">
                  {project.title}
                </h3>

                {project.description && (
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {project.description}
                  </p>
                )}

                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Calendar size={14} />
                  <span>{formatDate(project.createdAt)}</span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
