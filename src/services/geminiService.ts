
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { GeminiMovieInsights } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("API_KEY environment variable not set. Gemini API calls will fail.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! }); // API_KEY can be undefined, but SDK expects string. Handled in component.

export async function getMovieInsights(movieTitle: string, movieYear: string): Promise<GeminiMovieInsights> {
  if (!API_KEY) {
    throw new Error("Gemini API key is not configured. Please set the API_KEY environment variable.");
  }

  const model = ai.models;

  const prompt = `Generate movie insights for '${movieTitle}' (${movieYear}). Provide the response as a valid JSON object with the following keys: "tagline" (a catchy one-liner), "funFact" (an interesting behind-the-scenes tidbit or piece of trivia, keep it concise), and "similarMovieSuggestion" (title of a thematically or stylistically similar movie). Ensure the JSON is well-formed. Example: {"tagline": "...", "funFact": "...", "similarMovieSuggestion": "..."}`;

  try {
    const response: GenerateContentResponse = await model.generateContent({
        model: "gemini-2.5-flash-preview-04-17", // Using the specified model
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            temperature: 0.7, // Add some creativity
        }
    });

    let jsonStr = response.text.trim();
    
    // Remove markdown fences if present
    const fenceRegex = /^```(\w*)?\s*\n?(.*?)\n?\s*```$/s;
    const match = jsonStr.match(fenceRegex);
    if (match && match[2]) {
      jsonStr = match[2].trim();
    }

    try {
      const parsedData = JSON.parse(jsonStr);
      // Basic validation of the parsed data structure
      if (parsedData && typeof parsedData.tagline === 'string' && typeof parsedData.funFact === 'string' && typeof parsedData.similarMovieSuggestion === 'string') {
        return parsedData as GeminiMovieInsights;
      } else {
        console.error("Parsed JSON does not match expected structure:", parsedData);
        throw new Error("Received malformed insights data from AI.");
      }
    } catch (e) {
      console.error("Failed to parse JSON response from Gemini:", e, "Raw response:", jsonStr);
      throw new Error("Failed to parse AI response. The AI might be feeling a bit abstract today.");
    }

  } catch (error: any) {
    console.error("Error calling Gemini API:", error);
    if (error.message && error.message.includes("API key not valid")) {
        throw new Error("Invalid Gemini API Key. Please check your configuration.");
    }
    throw new Error(error.message || "An unknown error occurred while fetching insights from Gemini.");
  }
}
