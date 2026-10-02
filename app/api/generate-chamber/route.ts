import { OpenAI } from 'openai';
import { NextResponse } from 'next/server';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { depth = 1, mineType = 'dark' } = body;

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `You are a dark fantasy dungeon master AI for DM-DARKMINEX.
Generate vivid, atmospheric descriptions of underground mine chambers.
Include lighting conditions, hazards, sensory details, and ambiance.
Return valid JSON only with this shape:
{"description":"...","hazards":["..."],"loot_potential":"high|medium|low"}`,
        },
        {
          role: 'user',
          content: `Generate a chamber at depth ${depth} in a ${mineType} mine. Make it dark and atmospheric.`,
        },
      ],
    });

    const raw = response.choices[0]?.message?.content || '{}';
    const chamber = JSON.parse(raw);

    return NextResponse.json({
      success: true,
      chamber: {
        depth,
        mineType,
        ...chamber,
      },
    });
  } catch (error: any) {
    console.error('Chamber generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate chamber', details: error.message },
      { status: 500 }
    );
  }
}
