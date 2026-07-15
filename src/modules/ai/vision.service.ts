import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export class VisionService {
  static async verifyOwnership(imageUrl: string, expected: { brainrot: string }) {
    const prompt = `
      Analyze this Roblox "Steal a Brainrot" screenshot.
      Verify if the item shown is "${expected.brainrot}".
      Detect if the image is edited or fake.
      Return JSON: { "isLegitimate": boolean, "confidence": float (0-1), "detectedBrainrot": string, "fraudFlags": string[] }
    `;

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [{ role: "user", content: [
          { type: "text", text: prompt },
          { type: "image_url", image_url: { url: imageUrl } }
        ]}],
        response_format: { type: "json_object" },
      });
      return JSON.parse(response.choices[0].message.content!);
    } catch (error) {
      console.error("AI Verification Error:", error);
      return { isLegitimate: false, confidence: 0, detectedBrainrot: "Error", fraudFlags: ["AI_API_ERROR"] };
    }
  }
}