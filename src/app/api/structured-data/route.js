import { google } from "@ai-sdk/google";
import { streamObject } from "ai";
import { recepieSchema } from "./schema";

export async function POST(request) {
  try {
    const { dish } = await request.json();
    const result = streamObject({
      model: google("gemini-2.5-flash"),
      output: "object",
      schema: recepieSchema,
      prompt: `Generate a recepie for ${dish}`,
    });
    return result.toTextStreamResponse();
  } catch (error) {
    console.error("Error Geneating Recepie:", error);
    return new Response("Failed TO Geneate Recepie ", { status: 500 });
  }
}
