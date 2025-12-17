import { getLayout } from "./layouts";
import { AnimatePresence } from "framer-motion";

/**
 * SlideRenderer - Motor que renderiza slides con el layout y theme apropiado
 * @param {object} props
 * @param {object} props.slide - Datos del slide { title, content, layout }
 * @param {number} props.index - Índice del slide
 * @param {string} props.theme - Nombre del theme activo
 * @param {boolean} props.isActive - Si el slide está activo
 */
export default function SlideRenderer({ slide, index, theme, isActive }) {
  // Obtener el layout component
  const layoutName = slide.layout || "content-focus";
  const LayoutComponent = getLayout(layoutName);

  // Determinar si hay un accent (para layouts que lo soporten)
  const hasAccent = index === 0; // Primera slide siempre tiene accent

  return (
    <AnimatePresence mode="wait">
      {isActive && (
        <div
          className="w-full h-full"
          style={{
            aspectRatio: "16 / 9",
            minHeight: "500px",
          }}
        >
          <LayoutComponent
            title={slide.title}
            content={slide.content}
            accent={hasAccent}
            index={index}
          />
        </div>
      )}
    </AnimatePresence>
  );
}

/**
 * Determina el layout apropiado basado en el contenido del slide
 * @param {object} slide - Slide con title y content
 * @param {number} index - Índice del slide
 * @returns {string} Nombre del layout
 */
export function suggestLayout(slide, index) {
  const { title, content } = slide;
  const contentLower = content?.toLowerCase() || "";
  const titleLower = title?.toLowerCase() || "";

  // Primera slide siempre es cover
  if (index === 0) {
    return "cover-center";
  }

  // Última slide puede ser cover o big-quote
  // (asumiendo que el índice es el último, esto se puede mejorar)
  if (titleLower.includes("conclusion") || titleLower.includes("thank")) {
    return "cover-center";
  }

  // Si tiene bullets o listas
  if (
    content?.includes("•") ||
    content?.includes("-") ||
    content?.split("\n").length > 3
  ) {
    return "title-bullets";
  }

  // Si parece una cita o estadística
  if (
    contentLower.includes('"') ||
    titleLower.includes("quote") ||
    content?.length < 150
  ) {
    return "big-quote";
  }

  // Si tiene separadores que sugieren dos columnas
  if (content?.includes("||") || content?.includes("\n\n")) {
    const parts = content.split(/\n\n|\|{2,}/);
    if (parts.length === 2) {
      return "two-columns";
    }
  }

  // Default: content-focus
  return "content-focus";
}

/**
 * Procesa un array de slides y asigna layouts automáticamente
 * @param {array} slides - Array de slides
 * @returns {array} Slides con layouts asignados
 */
export function assignLayouts(slides) {
  return slides.map((slide, index) => ({
    ...slide,
    layout: slide.layout || suggestLayout(slide, index),
  }));
}
