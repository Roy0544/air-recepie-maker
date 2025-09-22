import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateText } from "ai";

const gemini = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
});

export async function POST(request) {
  try {
    const { prompt } = await request.json();
    const { text } = await generateText({
      model: gemini("gemini-2.5-flash"),
      prompt,
    });
    return Response.json({ text });
  } catch (error) {
    console.error("Error generating text:", error);
    return Response.json({ error: "Failed to generate text" }, { status: 500 });
  }
}
