import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
// si querés más calidad, podés usar: gemini-1.5-pro

export const generatePresentation = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    // Seleccionar theme basado en el prompt
    const theme = selectThemeFromPrompt(prompt);

    const systemPrompt = `
You are a professional presentation generator. 
ALWAYS respond with a valid JSON object (and nothing else) containing:
- "title": String
- "description": String
- "theme": String (one of: "modern-light", "modern-dark", "minimal-light", "creative", "professional", "vibrant")
- "slides": Array of objects with:
  - "title": String
  - "content": String
  - "layout": String (one of: "cover-center", "title-bullets", "two-columns", "big-quote", "content-focus")

Layout Guidelines:
- Use "cover-center" for the first slide (title page) and conclusion slides
- Use "title-bullets" for lists and key points (separate items with newlines)
- Use "two-columns" for comparisons (separate columns with "||")
- Use "big-quote" for important quotes or statistics
- Use "content-focus" for general content and explanations

VERY IMPORTANT:
- Do NOT include markdown formatting like \`\`\`json or \`\`\`.
- Do NOT include any explanation, only the raw JSON.
- Make content engaging and professional.
- For "title-bullets" layout, separate each bullet point with a newline.
`;

    const result = await model.generateContent(
      `${systemPrompt}\n\nUser Prompt: ${prompt}`
    );

    const response = result.response;
    let text = response.text().trim();

    console.log("Gemini Raw Response BEFORE CLEAN:", text);

    // 1) Eliminar posibles bloques de código markdown
    text = text.replace(/```json/gi, "").replace(/```/g, "").trim();

    // 2) Como extra seguridad: cortar desde la primera { hasta la última }
    const firstBrace = text.indexOf("{");
    const lastBrace = text.lastIndexOf("}");
    if (firstBrace !== -1 && lastBrace !== -1) {
      text = text.substring(firstBrace, lastBrace + 1);
    }

    console.log("Gemini Cleaned Response:", text);

    let json;
    try {
      json = JSON.parse(text);
    } catch (parseError) {
      console.error("JSON parse error:", parseError);
      return res.status(500).json({
        error: "Error parsing AI response as JSON",
        raw: text, // esto te ayuda a depurar desde el frontend
      });
    }

    // Asegurar que el theme esté presente (fallback)
    if (!json.theme) {
      json.theme = theme;
    }

    return res.json({
      success: true,
      data: json,
    });
  } catch (error) {
    console.error("AI Generation Error:", error);
    return res.status(500).json({
      error: "Error generating presentation",
      details: error.message,
    });
  }
};

/**
 * Selecciona un theme apropiado basado en palabras clave del prompt
 */
function selectThemeFromPrompt(prompt) {
  const lowerPrompt = prompt.toLowerCase();

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

  for (const [themeName, keywords] of Object.entries(themeKeywords)) {
    if (keywords.some((keyword) => lowerPrompt.includes(keyword))) {
      return themeName;
    }
  }

  return "modern-light";
}
