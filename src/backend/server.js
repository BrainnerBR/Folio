import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { GoogleGenerativeAI } from "@google/generative-ai";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Cargar el archivo .env desde la carpeta backend
dotenv.config({ path: join(__dirname, ".env") });

const app = express();

app.use(cors());
app.use(express.json());

if (!process.env.GEMINI_API_KEY) {
  console.error("❌ Falta GEMINI_API_KEY en el .env");
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel(
  { model: "gemini-2.5-flash" },
  { apiVersion: "v1" }
);

app.post("/api/ai/generate", async (req, res) => {
  try {
    const { prompt } = req.body;

    console.log("📩 /api/ai/generate body:", req.body);

    if (!prompt) {
      return res
        .status(400)
        .json({ success: false, error: "Prompt is required" });
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

    let text = result.response.text().trim();

    console.log("🤖 Gemini Raw Response BEFORE CLEAN:\n", text);

    // Limpiar posibles bloques de código markdown
    text = text.replace(/```json/gi, "").replace(/```/g, "").trim();

    // Recortar solo desde el primer { hasta el último }
    const firstBrace = text.indexOf("{");
    const lastBrace = text.lastIndexOf("}");
    if (firstBrace !== -1 && lastBrace !== -1) {
      text = text.substring(firstBrace, lastBrace + 1);
    }

    console.log("🧽 Gemini Cleaned Response:\n", text);

    let json;
    try {
      json = JSON.parse(text);
    } catch (parseError) {
      console.error("❌ JSON parse error:", parseError);
      return res.status(500).json({
        success: false,
        error: "Error parsing AI response as JSON",
        details: parseError.message,
        raw: text,
      });
    }

    return res.json({
      success: true,
      data: json,
    });
  } catch (error) {
    console.error("🔥 AI Generation Error:", error);
    return res.status(500).json({
      success: false,
      error: "Error generating presentation",
      details: error.message,
    });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 API server running on http://localhost:${PORT}`);
});
