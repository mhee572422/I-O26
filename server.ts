import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const PORT = 3000;

// Initialize Gemini client on the server side
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

async function startServer() {
  const app = express();

  // Parse request bodies
  app.use(express.json());

  // API Routes FIRST
  app.post("/api/leaderboard", async (req, res) => {
    try {
      const { score, totalQuestions, username } = req.body;

      const parsedScore = parseInt(score, 10) || 0;
      const parsedTotal = parseInt(totalQuestions, 10) || 12;
      const nameToUse = username ? username.trim().substring(0, 20) : "You";

      const prompt = `Generate a simulated global leaderboard for the 'Google I/O 2026 Pop Quiz'.
The current user is named '${nameToUse}' and scored ${parsedScore} out of ${parsedTotal}.
Generate exactly 8 leaderboard entries in ranking order from highest score to lowest, inserting the current user at their mathematically correct rank position (resolving ties appropriately by matching their score).
For each entry, generate:
- rank: number (continuous starting from 1)
- name: string (use cool simulated developer/AI names like 'Agent_Alpha', 'TPU_Tamer', 'ZeroShotHero', 'DeepLearningDiva', 'KernelPanicker', 'Gemini_Giga', etc. For the current user's entry, use exactly '${nameToUse}')
- score: number (integer. Simulated players should have scores <= ${parsedTotal}. Ensure the current user's entry has score exactly ${parsedScore})
- status: string (a short, humorous 4-8 word caption. E.g. 'Overclocked on TPU v5e', 'Stuck in local minima', 'Quantizing my prompt weights', 'Forgot to import React', etc. For the current user, make it a personalized status matching their score)
- isCurrentUser: boolean (true for the current user's entry, false otherwise)

Generate the results exactly matching this format.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              leaderboard: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    rank: { type: Type.INTEGER },
                    name: { type: Type.STRING },
                    score: { type: Type.INTEGER },
                    status: { type: Type.STRING },
                    isCurrentUser: { type: Type.BOOLEAN }
                  },
                  required: ["rank", "name", "score", "status", "isCurrentUser"]
                }
              }
            },
            required: ["leaderboard"]
          }
        }
      });

      const textOutput = response?.text;
      if (!textOutput) {
        throw new Error("No response from Gemini");
      }

      const result = JSON.parse(textOutput.trim());
      res.json(result);
    } catch (error: any) {
      console.error("Leaderboard generation failed, returning rich fallback:", error);
      
      // Elegant fallback leaderboard
      const userScore = parseInt(req.body?.score, 10) || 0;
      const total = parseInt(req.body?.totalQuestions, 10) || 12;
      const nameToUse = req.body?.username || "You";

      const fallbackList = [
        { rank: 1, name: "Agent_Alpha", score: Math.round(total * 0.95), status: "Overclocked on TPU v6", isCurrentUser: false },
        { rank: 2, name: "TPU_Tamer", score: Math.round(total * 0.85), status: "Quantizing prompt weights", isCurrentUser: false },
        { rank: 3, name: nameToUse, score: userScore, status: "Compiling neural pathways", isCurrentUser: true },
        { rank: 4, name: "ZeroShotHero", score: Math.round(total * 0.75), status: "Hallucinating in web sandbox", isCurrentUser: false },
        { rank: 5, name: "KernelPanicker", score: Math.round(total * 0.6), status: "Forgot to npm install", isCurrentUser: false },
        { rank: 6, name: "Gemini_Giga", score: Math.round(total * 0.55), status: "Writing 10x code at once", isCurrentUser: false },
        { rank: 7, name: "Sarah_io26", score: Math.round(total * 0.45), status: "Taking selfies with Android", isCurrentUser: false },
        { rank: 8, name: "BytePhilosopher", score: Math.round(total * 0.35), status: "Stuck in local minima", isCurrentUser: false }
      ].sort((a, b) => b.score - a.score);

      // Re-assign ranks based on correct sorted score
      fallbackList.forEach((entry, idx) => {
        entry.rank = idx + 1;
      });

      res.json({ leaderboard: fallbackList });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
