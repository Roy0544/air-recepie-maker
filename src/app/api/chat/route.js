import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { streamText, convertToModelMessages } from "ai";

const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
});

export const maxDuration = 30;

export async function POST(request) {
  try {
    const { messages } = await request.json();
    const result = await streamText({
      model: google("gemini-2.5-flash"),
      messages: [
        {
          role: "system",
          content:
            "you are a helpful recepie suggestion agent .keep respond with all informations like ingredients prep time procedure  and focus on ingredients which are easily available in local store ",
        },
        ...convertToModelMessages(messages),
      ],
    });
    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error("Error streaming chat:", error);
    return new Response("Failed to stream chat completion", { status: 500 });
  }
}
