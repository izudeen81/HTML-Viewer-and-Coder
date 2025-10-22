
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export async function editHtmlCode(html: string, prompt: string): Promise<string> {
    const fullPrompt = `
You are an expert web developer specializing in HTML and modern CSS. A user has provided HTML code and a request to edit it.

Your task is to return ONLY the full, updated HTML code that incorporates the user's request. Do not add any explanations, introductions, markdown code fences like \`\`\`html, or any text other than the code itself. The output must be valid and complete HTML.

User's Edit Request: "${prompt}"

Original HTML Code:
---
${html}
---
`;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: fullPrompt,
        });

        const newCode = response.text.trim();
        
        // Basic validation to ensure we're getting something that looks like HTML
        if (!newCode.startsWith('<!DOCTYPE html>') && !newCode.startsWith('<html')) {
            console.warn("Gemini response did not start with a standard HTML tag. Using as-is.", newCode);
        }

        return newCode;
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw new Error("Failed to get a response from Gemini. Please check your API key and network connection.");
    }
}
