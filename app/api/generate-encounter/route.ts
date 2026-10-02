import { OpenAI } from 'openai';
import { NextResponse } from 'next/server';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { difficulty = 'medium', partyLevel = 5 } = body;

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `You are a dark fantasy encounter generator for DM-DARKMINEX.
Generate subterranean creature encounters.
Return valid JSON only with this shape:
{"name":"...","type":"...","hp":number,"ac":number,"abilities":["..."],"loot":"...","threatLevel":"low|medium|high|extreme"}`,
        },
        {
          role: 'user',
          content: `Generate a ${difficulty} encounter suitable for level ${partyLevel} adventurers. Include 1-3 creatures.`,
        },
      ],
    });

    const raw = response.choices[0]?.message?.content || '{}';
    const encounter = JSON.parse(raw);

    return NextResponse.json({
      success: true,
      encounter: {
        difficulty,
        partyLevel,
        ...encounter,
      },
    });
  } catch (error: any) {
    console.error('Encounter generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate encounter', details: error.message },
      { status: 500 }
    );
  }
}
