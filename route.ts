import OpenAI from "openai";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ error: "The site owner needs to add OPENAI_API_KEY in the deployment settings." }, { status: 503 });
    }
    const body = await request.json();
    const messages = body.messages;
    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "Please send a message." }, { status: 400 });
    }
    if (messages.length > 40) {
      return NextResponse.json({ error: "This conversation is too long. Start a new chat." }, { status: 400 });
    }
    const clean = messages
      .filter((m: any) => ["user", "assistant"].includes(m?.role) && typeof m?.content === "string")
      .map((m: any) => ({ role: m.role as "user" | "assistant", content: m.content.slice(0, 12000) }));

    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are kations only+, a friendly, capable, creative AI assistant. Be helpful, clear, and adapt to the user's language. Use readable formatting when useful." },
        ...clean
      ],
      temperature: 0.7,
      max_tokens: 1600
    });
    return NextResponse.json({ reply: completion.choices[0]?.message?.content || "I couldn't create a reply. Please try again." });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json({ error: "AI service error. Check the API key, billing, and server logs." }, { status: 500 });
  }
}
