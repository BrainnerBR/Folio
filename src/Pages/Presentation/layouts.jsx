import { motion } from "framer-motion";

/**
 * Layout: Cover Center
 * Ideal para: Portada, título principal
 */
/**
 * Layout: Cover Center
 * Ideal para: Portada, título principal
 */
export function CoverCenterLayout({ title, content, accent }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
      className="w-full h-full flex flex-col items-center justify-center text-center px-16 py-12 relative overflow-hidden"
      // Fondo manejado por el contenedor padre, aquí solo centramos
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="max-w-4xl relative z-10"
      >
        <h1
          className="text-7xl mb-8 leading-tight drop-shadow-sm"
          style={{
            fontFamily: "var(--theme-headingFont)",
            fontWeight: "var(--theme-headingWeight)",
            color: "var(--theme-text)",
          }}
        >
          {title || "Sin título"}
        </h1>
        {content && (
          <p
            className="text-3xl leading-relaxed opacity-90"
            style={{
              fontFamily: "var(--theme-bodyFont)",
              fontWeight: "var(--theme-bodyWeight)",
              color: "var(--theme-mutedText)",
            }}
          >
            {content}
          </p>
        )}
        {accent && (
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-8 h-2 w-32 mx-auto rounded-full shadow-lg"
            style={{ backgroundColor: "var(--theme-primary)" }}
          />
        )}
      </motion.div>
    </motion.div>
  );
}

/**
 * Layout: Title + Bullets
 * Ideal para: Listas, puntos clave
 */
export function TitleBulletsLayout({ title, content }) {
  // Parsear el contenido más robustamente
  const bullets = (content || "")
    .split(/\n|•|-/)
    .map((item) => item.trim())
    .filter((item) => item.length > 0);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.4 }}
      className="w-full h-full flex flex-col px-20 py-16"
    >
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="text-5xl mb-12 drop-shadow-sm"
        style={{
          fontFamily: "var(--theme-headingFont)",
          fontWeight: "var(--theme-headingWeight)",
          color: "var(--theme-text)",
        }}
      >
        {title || "Puntos Clave"}
      </motion.h2>

      <div className="flex-1 flex flex-col justify-center">
        <div
          className="p-10 rounded-3xl backdrop-blur-sm space-y-6"
          style={{
            backgroundColor: "var(--theme-surface)",
            borderRadius: "var(--theme-border-radius)",
            boxShadow: "var(--theme-shadow)",
          }}
        >
          {bullets.length > 0 ? (
            bullets.map((bullet, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.1, duration: 0.4 }}
                className="flex items-start gap-6"
              >
                <div
                  className="w-3 h-3 rounded-full mt-3 shrink-0 shadow-sm"
                  style={{ backgroundColor: "var(--theme-primary)" }}
                />
                <p
                  className="text-3xl leading-relaxed"
                  style={{
                    fontFamily: "var(--theme-bodyFont)",
                    fontWeight: "var(--theme-bodyWeight)",
                    color: "var(--theme-text)",
                  }}
                >
                  {bullet}
                </p>
              </motion.div>
            ))
          ) : (
            <p className="text-xl opacity-50 italic">Sin contenido...</p>
          )}
        </div>
      </div>
    </motion.div>
  );
}

/**
 * Layout: Two Columns
 * Ideal para: Comparaciones, antes/después, pros/cons
 */
export function TwoColumnsLayout({ title, content }) {
  const parts = (content || "").split(/\n\n|\|{2,}/);
  const leftContent = parts[0] || content || "";
  const rightContent = parts[1] || "";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full h-full flex flex-col px-20 py-16"
    >
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="text-5xl mb-12 drop-shadow-sm"
        style={{
          fontFamily: "var(--theme-headingFont)",
          fontWeight: "var(--theme-headingWeight)",
          color: "var(--theme-text)",
        }}
      >
        {title || "Comparación"}
      </motion.h2>

      <div className="flex-1 grid grid-cols-2 gap-12">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="p-8 rounded-3xl backdrop-blur-sm flex flex-col justify-center"
          style={{
            backgroundColor: "var(--theme-surface)",
            borderRadius: "var(--theme-border-radius)",
            boxShadow: "var(--theme-shadow)",
            border: "1px solid var(--theme-border)",
          }}
        >
          <p
            className="text-2xl leading-relaxed whitespace-pre-wrap"
            style={{
              fontFamily: "var(--theme-bodyFont)",
              fontWeight: "var(--theme-bodyWeight)",
              color: "var(--theme-text)",
            }}
          >
            {leftContent}
          </p>
        </motion.div>

        {rightContent && (
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="p-8 rounded-3xl backdrop-blur-sm flex flex-col justify-center"
            style={{
              backgroundColor: "var(--theme-surface)",
              borderRadius: "var(--theme-border-radius)",
              boxShadow: "var(--theme-shadow)",
              border: "1px solid var(--theme-border)",
            }}
          >
            <p
              className="text-2xl leading-relaxed whitespace-pre-wrap"
              style={{
                fontFamily: "var(--theme-bodyFont)",
                fontWeight: "var(--theme-bodyWeight)",
                color: "var(--theme-text)",
              }}
            >
              {rightContent}
            </p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

/**
 * Layout: Big Quote
 * Ideal para: Citas, estadísticas importantes, mensajes clave
 */
export function BigQuoteLayout({ title, content }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5 }}
      className="w-full h-full flex flex-col items-center justify-center px-20 py-16"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="max-w-5xl text-center relative p-12 rounded-3xl backdrop-blur-sm"
        style={{
          // Opcional: solo si se quiere resaltar mucho la cita con fondo
          backgroundColor: "var(--theme-surface)",
          boxShadow: "var(--theme-shadow)",
        }}
      >
        {/* Quote mark decorativo */}
        <div
          className="absolute -top-4 left-8 text-9xl opacity-20 font-serif"
          style={{ color: "var(--theme-primary)" }}
        >
          "
        </div>

        <blockquote
          className="text-5xl leading-tight mb-8 relative z-10"
          style={{
            fontFamily: "var(--theme-headingFont)",
            fontWeight: "var(--theme-headingWeight)",
            color: "var(--theme-text)",
          }}
        >
          {content || "Cita vacía..."}
        </blockquote>

        {title && (
          <cite
            className="text-3xl not-italic block mt-6"
            style={{
              fontFamily: "var(--theme-bodyFont)",
              fontWeight: "var(--theme-bodyWeight)",
              color: "var(--theme-mutedText)",
            }}
          >
            — {title}
          </cite>
        )}
      </motion.div>
    </motion.div>
  );
}

/**
 * Layout: Content Focus
 * Ideal para: Contenido general, explicaciones
 */
export function ContentFocusLayout({ title, content }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="w-full h-full flex flex-col px-20 py-16"
    >
      <motion.h2
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="text-5xl mb-10 drop-shadow-sm"
        style={{
          fontFamily: "var(--theme-headingFont)",
          fontWeight: "var(--theme-headingWeight)",
          color: "var(--theme-text)",
        }}
      >
        {title || "Información"}
      </motion.h2>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="flex-1 flex items-center"
      >
        <div
          className="w-full p-12 rounded-3xl backdrop-blur-sm overflow-y-auto max-h-[60vh] custom-scrollbar"
          style={{
            backgroundColor: "var(--theme-surface)",
            borderRadius: "var(--theme-border-radius)",
            boxShadow: "var(--theme-shadow)",
            border: "1px solid var(--theme-border)",
          }}
        >
          <p
            className="text-3xl leading-relaxed whitespace-pre-wrap"
            style={{
              fontFamily: "var(--theme-bodyFont)",
              fontWeight: "var(--theme-bodyWeight)",
              color: "var(--theme-text)",
            }}
          >
            {content || "No hay contenido para mostrar."}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

/**
 * Mapa de layouts disponibles
 */
export const layouts = {
  "cover-center": CoverCenterLayout,
  "title-bullets": TitleBulletsLayout,
  "two-columns": TwoColumnsLayout,
  "big-quote": BigQuoteLayout,
  "content-focus": ContentFocusLayout,
};

/**
 * Obtiene un layout por nombre
 * @param {string} layoutName - Nombre del layout
 * @returns {Component} Componente del layout
 */
export function getLayout(layoutName) {
  return layouts[layoutName] || ContentFocusLayout;
}
