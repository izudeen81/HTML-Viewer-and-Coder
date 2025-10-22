import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

// Fail early if the API key is not configured.
if (!API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

/**
 * Defines the types of errors that can be specifically handled from the Gemini service.
 * - `SAFETY`: The response was blocked by content safety filters.
 * - `API_KEY`: The provided API key is invalid.
 * - `NETWORK`: A network error occurred while contacting the API.
 * - `UNKNOWN`: A generic or unexpected error occurred.
 */
export type GeminiErrorType = 'SAFETY' | 'API_KEY' | 'NETWORK' | 'UNKNOWN';

/**
 * Custom error class for wrapping errors from the Gemini API.
 * This allows for more specific error handling in the UI.
 */
export class GeminiError extends Error {
    public type: GeminiErrorType;

    /**
     * @param {string} message - The error message.
     * @param {GeminiErrorType} type - The type of the error.
     */
    constructor(message: string, type: GeminiErrorType) {
        super(message);
        this.name = 'GeminiError';
        this.type = type;
    }
}


/**
 * Sends the current HTML code and a user prompt to the Gemini API to get an updated version.
 * @param {string} html - The original HTML code.
 * @param {string} prompt - The user's instruction for how to edit the HTML.
 * @returns {Promise<string>} The full, updated HTML code returned by Gemini.
 * @throws {GeminiError} Throws a custom GeminiError for specific, handleable error cases.
 */
export async function editHtmlCode(html: string, prompt: string): Promise<string> {
    // Construct a detailed prompt to guide the Gemini model.
    // This structured prompt ensures the model understands its role and the expected output format.
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

        // The API might not throw an error for safety blocks, so we check the finishReason.
        if (response.candidates?.[0]?.finishReason === 'SAFETY') {
            throw new GeminiError(
               'The response was blocked due to safety concerns. Please adjust your prompt.',
               'SAFETY'
            );
        }
        
        const newCode = response.text.trim();
        
        if (!newCode) {
             throw new GeminiError(
               'Gemini returned an empty response. This could be due to a content filter or an issue with the prompt.',
               'UNKNOWN'
            );
        }
        
        // A basic validation to check if the response seems like valid HTML.
        // This helps catch cases where the model might return an explanation instead of code.
        if (!newCode.startsWith('<!DOCTYPE html>') && !newCode.startsWith('<html')) {
            console.warn("Gemini response did not start with a standard HTML tag. Using as-is.", newCode);
        }

        return newCode;
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        
        // Re-throw our custom errors so they can be caught by the UI.
        if (error instanceof GeminiError) {
            throw error;
        }

        // Check for specific error messages to provide better user feedback.
        if (error instanceof Error) {
            if (error.message.includes('API key not valid')) {
                throw new GeminiError(
                    'Your API key is not valid. Please ensure it is configured correctly.',
                    'API_KEY'
                );
            }
        }
        
        // For all other errors, assume a network issue.
        throw new GeminiError(
            'Failed to contact the Gemini API. Please check your network connection.',
            'NETWORK'
        );
    }
}
