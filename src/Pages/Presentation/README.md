# Sistema de Themes y Layouts para Presentaciones

Este documento describe el sistema completo de themes y layouts implementado para las presentaciones generadas por IA.

## 📋 Estructura del Sistema

### 1. **Themes** (`themes.js`)

Sistema de design tokens que define la apariencia visual de las presentaciones.

#### Themes Disponibles:

1. **modern-light** (Default)

   - Fondo: Blanco con gradiente azul-morado
   - Ideal para: Presentaciones generales, profesionales
   - Paleta: Azules y morados vibrantes

2. **modern-dark**

   - Fondo: Oscuro con gradiente azul oscuro-morado
   - Ideal para: Tech, innovación, presentaciones nocturnas
   - Paleta: Azules y morados claros sobre fondo oscuro

3. **minimal-light**

   - Fondo: Blanco minimalista
   - Ideal para: Presentaciones corporativas, elegantes
   - Paleta: Negro, grises, acento rojo

4. **creative**

   - Fondo: Rosa claro con gradiente cálido
   - Ideal para: Diseño, creatividad, arte
   - Paleta: Rosa, naranja, morado

5. **professional**

   - Fondo: Azul claro profesional
   - Ideal para: Negocios, corporativo, formal
   - Paleta: Azules profesionales, verde acento

6. **vibrant**
   - Fondo: Oscuro con gradiente multicolor
   - Ideal para: Startups, energía, dinamismo
   - Paleta: Rosa, morado, amarillo sobre oscuro

#### Design Tokens de cada Theme:

```javascript
{
  palette: {
    background,    // Color de fondo principal
    surface,       // Color de superficies/tarjetas
    primary,       // Color primario
    secondary,     // Color secundario
    accent,        // Color de acento
    text,          // Color de texto principal
    mutedText,     // Color de texto secundario
    border,        // Color de bordes
  },
  typography: {
    headingFont,   // Fuente para títulos
    bodyFont,      // Fuente para contenido
    headingWeight, // Peso de títulos
    bodyWeight,    // Peso de contenido
  },
  background: {
    type,          // 'solid' o 'gradient'
    value,         // Color o gradiente CSS
  },
  borderRadius,    // Radio de bordes
  shadowStyle,     // Estilo de sombras
}
```

### 2. **Layouts** (`layouts.jsx`)

Componentes reutilizables para diferentes tipos de slides.

#### Layouts Disponibles:

1. **cover-center**

   - Uso: Portadas, títulos principales, conclusiones
   - Características: Centrado, texto grande, opcional accent bar
   - Ideal para: Primera y última slide

2. **title-bullets**

   - Uso: Listas, puntos clave
   - Características: Título arriba, bullets con iconos
   - Formato: Separar items con saltos de línea

3. **two-columns**

   - Uso: Comparaciones, antes/después, pros/cons
   - Características: Dos columnas lado a lado
   - Formato: Separar columnas con `||`

4. **big-quote**

   - Uso: Citas importantes, estadísticas destacadas
   - Características: Texto grande centrado, comillas decorativas
   - Ideal para: Mensajes clave

5. **content-focus**
   - Uso: Contenido general, explicaciones
   - Características: Título + tarjeta de contenido
   - Default: Layout por defecto

### 3. **SlideRenderer** (`SlideRenderer.jsx`)

Motor que combina themes y layouts.

#### Funcionalidades:

- **Renderizado**: Combina el slide con su layout y theme
- **Sugerencia Automática**: Asigna layouts basándose en el contenido
- **Extensible**: Fácil agregar nuevos layouts

#### Lógica de Sugerencia:

```javascript
- Primera slide → cover-center
- Contiene bullets/listas → title-bullets
- Contiene comillas → big-quote
- Contiene "||" → two-columns
- Título con "conclusion" → cover-center
- Default → content-focus
```

## 🎨 Uso del Sistema

### En el Frontend (PresentationViewer)

```javascript
import { applyTheme, getTheme } from "./themes";
import SlideRenderer from "./SlideRenderer";
import { assignLayouts } from "./SlideRenderer";

// Aplicar theme
useEffect(() => {
  if (containerRef.current) {
    applyTheme(containerRef.current, currentTheme);
  }
}, [currentTheme]);

// Asignar layouts automáticamente
const slides = assignLayouts(rawSlides);

// Renderizar slide
<SlideRenderer
  slide={slides[currentSlide]}
  index={currentSlide}
  theme={currentTheme}
  isActive={true}
/>;
```

### En el Backend (aiController)

La IA ahora genera presentaciones con:

- **theme**: Seleccionado automáticamente basado en keywords del prompt
- **layout**: Sugerido para cada slide según su contenido

```javascript
{
  "title": "Mi Presentación",
  "description": "Descripción breve",
  "theme": "modern-dark",
  "slides": [
    {
      "title": "Título",
      "content": "Contenido",
      "layout": "cover-center"
    }
  ]
}
```

## 🔧 Personalización

### Agregar un Nuevo Theme:

1. Editar `themes.js`
2. Agregar nuevo objeto en `themes`:

```javascript
"mi-theme": {
  name: "Mi Theme",
  palette: { /* colores */ },
  typography: { /* fuentes */ },
  background: { /* fondo */ },
  borderRadius: "16px",
  shadowStyle: "0 10px 40px rgba(0, 0, 0, 0.1)",
}
```

3. Actualizar keywords en `selectThemeFromPrompt()`

### Agregar un Nuevo Layout:

1. Editar `layouts.jsx`
2. Crear nuevo componente:

```javascript
export function MiLayoutLayout({ title, content }) {
  return (
    <motion.div className="w-full h-full">{/* Tu diseño aquí */}</motion.div>
  );
}
```

3. Agregar al objeto `layouts`:

```javascript
export const layouts = {
  // ... otros layouts
  "mi-layout": MiLayoutLayout,
};
```

4. Actualizar `suggestLayout()` en `SlideRenderer.jsx`

## 🎯 Selección Automática de Themes

El sistema analiza el prompt del usuario y selecciona el theme más apropiado:

| Keywords                     | Theme Seleccionado |
| ---------------------------- | ------------------ |
| dark, tech, futuristic       | modern-dark        |
| minimal, clean, elegant      | minimal-light      |
| creative, artistic, colorful | creative           |
| professional, corporate      | professional       |
| vibrant, energetic, startup  | vibrant            |
| (default)                    | modern-light       |

## 📱 Características Adicionales

### Selector de Themes en Tiempo Real

Los usuarios pueden cambiar el theme durante la presentación:

- Botón "Tema" en el header
- Dropdown con todos los themes disponibles
- Cambio instantáneo sin recargar

### CSS Variables

Todos los layouts usan CSS variables del theme:

- `var(--theme-background)`
- `var(--theme-primary)`
- `var(--theme-text)`
- `var(--theme-headingFont)`
- etc.

Esto permite cambios de theme instantáneos y consistentes.

## 🚀 Próximas Mejoras

- [ ] Más themes predefinidos
- [ ] Editor visual de themes
- [ ] Más layouts (imagen-texto, grid, timeline)
- [ ] Animaciones personalizadas por theme
- [ ] Exportar presentación con theme guardado
- [ ] Temas personalizados por usuario

---

**Desarrollado para Folio** - Sistema de presentaciones con IA
