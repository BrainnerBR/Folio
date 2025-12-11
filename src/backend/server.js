import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Groq } from "groq-sdk";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '.env') });

const app = express();
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

app.post("/api/ai/generate", async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) return res.status(400).json({ success: false, error: "Prompt required" });

    const systemPrompt = `
You generate presentations.
Always output ONLY JSON with:
{
  "title": "",
  "description": "",
  "slides": [
    { "title": "", "content": "" }
  ]
}
No markdown, no commentary.
`;

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: prompt }
      ],
      temperature: 0.3,
    });

    let text = completion.choices[0].message.content.trim();
    text = text.replace(/```json/gi, "").replace(/```/g, "");

    const first = text.indexOf("{");
    const last = text.lastIndexOf("}");
    text = text.slice(first, last + 1);

    const json = JSON.parse(text);

    return res.json({ success: true, data: json });

  } catch (err) {
    console.error("🔥 GROQ ERROR:", err);
    res.status(500).json({
      success: false,
      error: "Error generating presentation",
      details: err.message
    });
  }
});

app.listen(5001, () => console.log("🚀 API listening on port 5001"));