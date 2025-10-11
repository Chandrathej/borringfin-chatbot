import OpenAI from "openai";
import { NextResponse } from "next/server";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  const { message } = await req.json();

  try {
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are BoringFin Assistant — a friendly, witty personal finance AI. Keep answers short, clear, and engaging." },
        { role: "user", content: message },
      ],
    });

    const reply = completion.choices[0].message.content;
    return NextResponse.json({ reply });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: "Error generating response." }, { status: 500 });
  }
}
