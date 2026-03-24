import { NextResponse } from "next/server";
import { getMockAiSuggestion } from "@/lib/mock/ai-responses";

export async function POST(request: Request) {
  const { prompt } = await request.json();

  if (!prompt) {
    return NextResponse.json(
      { error: "Prompt is required" },
      { status: 400 }
    );
  }

  // Simulate AI processing delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  const suggestion = getMockAiSuggestion(prompt);

  return NextResponse.json({ suggestion });
}
