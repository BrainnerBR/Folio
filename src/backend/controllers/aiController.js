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

    const systemPrompt = `
You are a professional presentation generator. 
ALWAYS respond with a valid JSON object (and nothing else) containing:
- "title": String
- "description": String
- "slides": Array of objects with "title" and "content"

VERY IMPORTANT:
- Do NOT include markdown formatting like \`\`\`json or \`\`\`.
- Do NOT include any explanation, only the raw JSON.
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
