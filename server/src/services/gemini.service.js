import { GoogleGenAI } from "@google/genai";
import { generateFallbackCode } from "./fallbackAI.service.js";
import { buildPrompt } from "../utils/promptBuilder.js";

console.log("KEY =", process.env.GEMINI_API_KEY);

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

export const generateCode = async (prompt) => {

  try {

    const fullPrompt = buildPrompt(prompt);

    console.log("========== FINAL PROMPT ==========");
    console.log(fullPrompt);
    console.log("==================================");

    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: fullPrompt,
    });

    return result.text;

  }
  catch (err) {

  console.log("========== GEMINI ERROR ==========");

  console.error(err);

  console.log("Message:", err.message);
  console.log("Status:", err.status);
  console.log("Name:", err.name);

  if (err.error) {
    console.log("Error Object:", err.error);
  }

  if (err.response) {
    console.log("Response:", err.response);
  }

  if (err.cause) {
    console.log("Cause:", err.cause);
  }

  console.log("Stack:");
  console.log(err.stack);

  console.log("=================================");

  return generateFallbackCode(prompt);
}
};