
import { GoogleGenAI, Type } from "@google/genai";
import { DetectionResult } from "../types";

export async function classifyCropImage(base64Image: string): Promise<DetectionResult> {
  // Always create a new instance right before use to ensure latest key
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });
  
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: [
      {
        inlineData: {
          mimeType: 'image/jpeg',
          data: base64Image,
        },
      },
      {
        text: `Act as a senior plant pathologist. Analyze this leaf image.
        Identify the Crop and the specific Disease or state (Healthy).
        
        Return your findings in JSON format with these exact keys:
        - crop: Name of the plant (e.g., Tomato, Potato)
        - disease: Name of the disease or "Healthy"
        - confidence: 0 to 100
        - description: A brief medical-style description of the condition seen.
        - treatment: Array of immediate actions/fungicides/remedies.
        - preventiveMeasures: Array of long-term organic/cultural practices.
        
        Stick to the known taxonomy of the Plant Village Dataset.
        Be concise and professional.`
      }
    ],
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          crop: { type: Type.STRING },
          disease: { type: Type.STRING },
          confidence: { type: Type.NUMBER },
          description: { type: Type.STRING },
          treatment: { 
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          preventiveMeasures: { 
            type: Type.ARRAY,
            items: { type: Type.STRING }
          }
        },
        required: ["crop", "disease", "confidence", "description", "treatment", "preventiveMeasures"]
      }
    }
  });

  const jsonText = response.text.trim();
  return JSON.parse(jsonText);
}
