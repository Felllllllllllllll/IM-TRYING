import { GoogleGenAI, Type } from "@google/genai";
import { GeneratedContent } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateContent = async (
  topic: string,
  platform: string,
  format: string
): Promise<GeneratedContent> => {
  const model = "gemini-3-flash-preview";
  
  const systemInstruction = `Du är expert på social SEO och content marketing för år 2026.
Din uppgift är att skapa viralt och engagerande innehåll anpassat för specifika plattformar.
Tänk på att:
- Google Search 2026 prioriterar direkta svar och auktoritet.
- Instagram/TikTok 2026 handlar om autenticitet och snabba hooks.
- Använd modern svensk copywriting.
`;

  const prompt = `Skapa ett inlägg om ämnet: "${topic}".
Plattform: ${platform}
Format: ${format}

Generera:
1. En slagkraftig rubrik (title).
2. En brödtext (body) optimerad för formatet.
3. Relevanta hashtags (hashtags).
4. Tre konkreta tillväxttips (growth_tips) för att maximera räckvidden för just detta inlägg.`;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            body: { type: Type.STRING },
            hashtags: { type: Type.STRING },
            growth_tips: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          }
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as GeneratedContent;
    }
    throw new Error("No content generated");
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};