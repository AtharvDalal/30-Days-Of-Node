import { configDotenv } from "dotenv";
import express from "express";
import cors from "cors";
import { GoogleGenerativeAI } from "@google/generative-ai";

configDotenv();

const app = express();

app.use(cors());
app.use(express.json());
const genAI = new GoogleGenerativeAI("process.env.API_KEY");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

app.post("/generate", async (req, res) => {
  const { language } = req.body;

  if (!language) {
    return res.status(400).json({ error: "Language is required" });
  }

  try {
    const prompt = `Generate a .gitignore file for a ${language} project.`;
    const result = await model.generateContent(prompt);
    const response = await result.response.text();

    res.json({ language, gitignore: response });
  } catch (error) {
    console.error("Error generating .gitignore:", error);
    res.status(500).json({ error: "AI generation failed" });
  }
});
const PORT = 8000;
app.listen(PORT, () => console.log("server runnning on port 8000"));
