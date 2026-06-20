import { NextRequest } from 'next/server';
import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY!,
});

export async function POST(request: NextRequest) {
  try {
    const { messages, persona } = await request.json();

    const systemPrompt = `You are ${persona}, a highly professional, empathetic, and knowledgeable expert. Provide detailed, structured, and helpful responses.`;

    const completion = await groq.chat.completions.create({
      messages: [
        { role: 'system', content: systemPrompt },
        ...messages
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.7,
      max_tokens: 1000,
    });

    const reply = completion.choices[0]?.message?.content || "Sorry, I couldn't generate a response.";

    return Response.json({ reply });

  } catch (error: any) {
    console.error("Error:", error.message);
    return Response.json({ reply: "Sorry, I'm having trouble connecting right now. Please try again." });
  }
}