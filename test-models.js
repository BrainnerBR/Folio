
import dotenv from "dotenv";
dotenv.config({ path: "src/backend/.env" });

const apiKey = process.env.GEMINI_API_KEY;

async function checkModels() {
  const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;
  console.log("Fetching models from:", url.replace(apiKey, "HIDDEN_KEY"));
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log("Status:", response.status);
    if (data.error) {
        console.error("API Error:", data.error);
    } else {
        console.log("Available Models:");
        if (data.models) {
            data.models.forEach(m => console.log("- " + m.name));
        } else {
            console.log("No models found in response:", data);
        }
    }
  } catch (error) {
    console.error("Fetch error:", error);
  }
}

checkModels();
