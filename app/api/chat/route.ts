import { NextRequest } from 'next/server';
import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: "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",
});

export async function POST(request: NextRequest) {
  try {
    const { messages, persona } = await request.json();

    const systemPrompt = `You are ${persona}, a highly experienced, empathetic, and professional expert.
    You give detailed, structured, and actionable advice. 
    Use real-world context and think step-by-step.
    Always maintain a professional tone. 
    For medical, financial, or legal topics, clearly remind the user this is AI assistance and they should consult a licensed professional for official advice.`;

    const completion = await groq.chat.completions.create({
      messages: [
        { role: 'system', content: systemPrompt },
        ...messages
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.65,
      max_tokens: 1200,
    });

    const reply = completion.choices[0]?.message?.content || "I apologize, I couldn't generate a response.";

    return Response.json({ reply });

  } catch (error: any) {
    console.error(error);
    return Response.json({ reply: "Sorry, I'm experiencing technical difficulties. Please try again." });
  }
}