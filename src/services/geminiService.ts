import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export interface ExtractedEntities {
  dates: string[];
  parties: string[];
  amounts: string[];
  clauses: {
    type: string;
    summary: string;
  }[];
  confidence: number;
}

export async function extractContractEntities(text: string): Promise<ExtractedEntities> {
  const prompt = `Extract structured legal entities from the following contract text. 
Focus on: 
1. Dates (Execution dates, expiration dates, notice periods).
2. Party Names (Entities, individuals).
3. Dollar Amounts (Contract value, penalties, fees).
4. Termination Clauses (Summary of key termination rights).

Text:
${text}`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          dates: { type: Type.ARRAY, items: { type: Type.STRING } },
          parties: { type: Type.ARRAY, items: { type: Type.STRING } },
          amounts: { type: Type.ARRAY, items: { type: Type.STRING } },
          clauses: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                type: { type: Type.STRING },
                summary: { type: Type.STRING },
              },
              required: ["type", "summary"],
            },
          },
          confidence: { type: Type.NUMBER },
        },
        required: ["dates", "parties", "amounts", "clauses", "confidence"],
      },
    },
  });

  try {
    return JSON.parse(response.text || "{}") as ExtractedEntities;
  } catch (e) {
    console.error("Failed to parse Gemini response", e);
    throw new Error("Failed to process document analysis.");
  }
}
