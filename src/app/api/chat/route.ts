import OpenAI from "openai";
import { NextResponse, NextRequest } from "next/server";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ reply: "No messages provided." }, { status: 400 });
    }

    const chatMessages = [
      {
        role: "system",
        content:
          "You are BoringFin Assistant — a friendly, witty personal finance AI. Keep answers short, clear, and engaging.",
      },
      ...messages,
    ];

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: chatMessages,
    });

    const reply = completion.choices[0].message.content;

    return NextResponse.json({ reply });
  } catch (error: any) {
    console.error("Error in /api/chat:", error);
    return NextResponse.json(
      { error: "Error generating response. Check server logs." },
      { status: 500 }
    );
  }
}
