import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { streamText } from "ai";

const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
});

export async function POST(request) {
  try {
    const { prompt } = await request.json();
    const result = await streamText({
      model: google("gemini-2.5-flash"),
      prompt,
    });
    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error("Error streaming text:", error);
    // Return an error response
    return new Response("Failed to stream text", { status: 500 });
  }
}
