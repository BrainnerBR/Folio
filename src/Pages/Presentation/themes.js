// Sistema de Themes para Presentaciones
// Cada theme define design tokens que se aplican como CSS variables

export const themes = {
  "modern-light": {
    name: "Modern Light",
    palette: {
      background: "#F0F5FF",
      surface: "rgba(255, 255, 255, 0.85)", // Blanco translúcido
      primary: "#2563EB", // Azul vibrante
      secondary: "#7C3AED", // Violeta
      accent: "#059669", // Esmeralda
      text: "#111827", // Gris muy oscuro (casi negro)
      mutedText: "#4B5563", // Gris medio
      border: "rgba(229, 231, 235, 0.5)",
    },
    typography: {
      headingFont: "'Inter', system-ui, sans-serif",
      bodyFont: "'Inter', system-ui, sans-serif",
      headingWeight: "800",
      bodyWeight: "400",
    },
    background: {
      type: "gradient",
      value: "linear-gradient(135deg, #EFF6FF 0%, #F5F3FF 100%)", // Gradiente muy suave
    },
    borderRadius: "24px",
    shadowStyle: "0 20px 40px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.01)",
  },

  "modern-dark": {
    name: "Modern Dark",
    palette: {
      background: "#0F172A",
      surface: "rgba(30, 41, 59, 0.7)", // Azul oscuro translúcido
      primary: "#38BDF8", // Celeste brillante
      secondary: "#818CF8", // Indigo suave
      accent: "#34D399", // Menta
      text: "#F8FAFC", // Blanco hielo
      mutedText: "#94A3B8", // Gris azulado
      border: "rgba(51, 65, 85, 0.5)",
    },
    typography: {
      headingFont: "'Outfit', system-ui, sans-serif",
      bodyFont: "'Inter', system-ui, sans-serif",
      headingWeight: "700",
      bodyWeight: "300",
    },
    background: {
      type: "gradient",
      value: "radial-gradient(circle at top right, #1e1b4b, #0f172a)", // Radial sutil
    },
    borderRadius: "20px",
    shadowStyle: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
  },

  "minimal-light": {
    name: "Minimal",
    palette: {
      background: "#FFFFFF",
      surface: "#FFFFFF", // Solido para máximo minimalismo
      primary: "#171717", // Negro casi puro
      secondary: "#525252", // Gris oscuro
      accent: "#DC2626", // Rojo puro
      text: "#0A0A0A", // Negro
      mutedText: "#525252", // Gris oscuro
      border: "#E5E5E5",
    },
    typography: {
      headingFont: "'Playfair Display', serif",
      bodyFont: "'Lato', sans-serif",
      headingWeight: "600",
      bodyWeight: "400",
    },
    background: {
      type: "solid",
      value: "#FFFFFF",
    },
    borderRadius: "0px", // Bordes cuadrados
    shadowStyle: "none",
  },

  creative: {
    name: "Creative",
    palette: {
      background: "#FFF0F5",
      surface: "rgba(255, 255, 255, 0.9)",
      primary: "#DB2777", // Rosa fuerte
      secondary: "#F59E0B", // Ambar
      accent: "#7C3AED", // Violeta
      text: "#1F2937", // Gris oscuro
      mutedText: "#4B5563", // Gris medio
      border: "rgba(252, 231, 243, 0.8)",
    },
    typography: {
      headingFont: "'Poppins', sans-serif",
      bodyFont: "'DM Sans', sans-serif",
      headingWeight: "900",
      bodyWeight: "500",
    },
    background: {
      type: "gradient",
      value: "linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%)", // Gradiente sutil para no competir
    },
    borderRadius: "32px", // Muy redondeado
    shadowStyle: "8px 8px 0px rgba(0,0,0,0.1)", // Sombra dura pop
  },

  professional: {
    name: "Professional",
    palette: {
      background: "#F8FAFC",
      surface: "#FFFFFF",
      primary: "#0369A1", // Azul corporativo serio
      secondary: "#0F766E", // Teal
      accent: "#B45309", // Ocre
      text: "#0F172A", // Navy muy oscuro
      mutedText: "#475569", // Gris azulado
      border: "#E2E8F0",
    },
    typography: {
      headingFont: "'Roboto', sans-serif",
      bodyFont: "'Open Sans', sans-serif",
      headingWeight: "700",
      bodyWeight: "400",
    },
    background: {
      type: "solid",
      value: "#F8FAFC", // Solido limpio
    },
    borderRadius: "8px",
    shadowStyle: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
  },

  vibrant: {
    name: "Vibrant",
    palette: {
      background: "#111827",
      surface: "rgba(0, 0, 0, 0.6)", // Oscuro translúcido
      primary: "#F472B6", // Rosa neón
      secondary: "#A78BFA", // Violeta neón
      accent: "#FBBF24", // Amarillo neón
      text: "#FFFFFF",
      mutedText: "#D1D5DB",
      border: "rgba(255, 255, 255, 0.1)",
    },
    typography: {
      headingFont: "'Montserrat', sans-serif",
      bodyFont: "'Raleway', sans-serif",
      headingWeight: "900",
      bodyWeight: "500",
    },
    background: {
      type: "gradient",
      value: "linear-gradient(to right bottom, #4338ca, #be185d)", // Gradiente fuerte
    },
    borderRadius: "24px",
    shadowStyle: "0 0 30px rgba(190, 24, 93, 0.3)", // Glow
  },
};

/**
 * Aplica un theme como CSS variables a un elemento
 * @param {HTMLElement} element - Elemento donde aplicar las variables
 * @param {string} themeName - Nombre del theme a aplicar
 */
export function applyTheme(element, themeName) {
  const theme = themes[themeName] || themes["modern-light"];

  // Aplicar colores de la paleta
  Object.entries(theme.palette).forEach(([key, value]) => {
    element.style.setProperty(`--theme-${key}`, value);
  });

  // Aplicar tipografía
  Object.entries(theme.typography).forEach(([key, value]) => {
    element.style.setProperty(`--theme-${key}`, value);
  });

  // Aplicar background
  element.style.setProperty(`--theme-background-type`, theme.background.type);
  element.style.setProperty(`--theme-background-value`, theme.background.value);

  // Aplicar otros estilos
  element.style.setProperty(`--theme-border-radius`, theme.borderRadius);
  element.style.setProperty(`--theme-shadow`, theme.shadowStyle);
}

/**
 * Obtiene el theme object por nombre
 * @param {string} themeName - Nombre del theme
 * @returns {object} Theme object
 */
export function getTheme(themeName) {
  return themes[themeName] || themes["modern-light"];
}

/**
 * Obtiene todos los nombres de themes disponibles
 * @returns {string[]} Array de nombres de themes
 */
export function getThemeNames() {
  return Object.keys(themes);
}

/**
 * Selecciona un theme apropiado basado en palabras clave del prompt
 * @param {string} prompt - Prompt del usuario
 * @returns {string} Nombre del theme seleccionado
 */
export function selectThemeFromPrompt(prompt) {
  const lowerPrompt = prompt.toLowerCase();

  // Keywords para cada theme
  const themeKeywords = {
    "modern-dark": [
      "dark",
      "night",
      "tech",
      "technology",
      "futuristic",
      "innovation",
      "digital",
    ],
    "minimal-light": [
      "minimal",
      "simple",
      "clean",
      "elegant",
      "professional",
      "corporate",
      "business",
    ],
    creative: [
      "creative",
      "artistic",
      "design",
      "colorful",
      "vibrant",
      "fun",
      "playful",
    ],
    professional: [
      "professional",
      "corporate",
      "business",
      "formal",
      "executive",
      "enterprise",
    ],
    vibrant: [
      "vibrant",
      "energetic",
      "dynamic",
      "bold",
      "exciting",
      "modern",
      "startup",
    ],
  };

  // Buscar coincidencias
  for (const [themeName, keywords] of Object.entries(themeKeywords)) {
    if (keywords.some((keyword) => lowerPrompt.includes(keyword))) {
      return themeName;
    }
  }

  // Default: modern-light
  return "modern-light";
}
