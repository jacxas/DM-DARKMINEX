import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export interface Chamber {
  id: string;
  name: string;
  description: string;
  lighting: string;
  hazards: string[];
  imagePrompt: string;
}

export interface Encounter {
  id: string;
  title: string;
  description: string;
  creatures: string[];
  challengeLevel: 'Low' | 'Medium' | 'High' | 'Extreme';
}

export interface Loot {
  name: string;
  rarity: string;
  effect: string;
  value: string;
}

export const generateChamber = async (): Promise<Chamber> => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: "Generate a unique, dark mine chamber for a D&D game. Include a evocative name, a sensory description, lighting conditions, hazards, and a detailed image prompt for a dark fantasy setting.",
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          description: { type: Type.STRING },
          lighting: { type: Type.STRING },
          hazards: { type: Type.ARRAY, items: { type: Type.STRING } },
          imagePrompt: { type: Type.STRING }
        },
        required: ["name", "description", "lighting", "hazards", "imagePrompt"]
      }
    }
  });

  const data = JSON.parse(response.text);
  return { ...data, id: Date.now().toString() };
};

export const generateEncounter = async (intensity: string): Promise<Encounter> => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Generate a dark fantasy mine encounter of ${intensity} intensity. Include a title, evocative description, list of creatures, and challenge level.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          description: { type: Type.STRING },
          creatures: { type: Type.ARRAY, items: { type: Type.STRING } },
          challengeLevel: { type: Type.STRING, enum: ['Low', 'Medium', 'High', 'Extreme'] }
        },
        required: ["title", "description", "creatures", "challengeLevel"]
      }
    }
  });

  const data = JSON.parse(response.text);
  return { ...data, id: Date.now().toString() };
};

export const generateLoot = async (): Promise<Loot> => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: "Generate a piece of dark fantasy mining loot (ore, crystal, or artifact). Include name, rarity, magical/mechanical effect, and gold value.",
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          rarity: { type: Type.STRING },
          effect: { type: Type.STRING },
          value: { type: Type.STRING }
        },
        required: ["name", "rarity", "effect", "value"]
      }
    }
  });

  return JSON.parse(response.text);
};
