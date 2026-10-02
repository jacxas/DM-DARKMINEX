import { OpenAI } from 'openai';
import { NextResponse } from 'next/server';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { rarity = 'common', depth = 1 } = body;

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `You are a dark fantasy loot generator for DM-DARKMINEX.
Generate rare materials, crystals, and artifacts with mechanical effects.
Return valid JSON only with this shape:
{"name":"...","type":"ore|crystal|artifact","rarity":"...","value":number,"effect":"...","weight":"..."}`,
        },
        {
          role: 'user',
          content: `Generate a ${rarity} treasure or ore found at depth ${depth} in a dark mine. Include mystical properties.`,
        },
      ],
    });

    const raw = response.choices[0]?.message?.content || '{}';
    const treasure = JSON.parse(raw);

    return NextResponse.json({
      success: true,
      treasure: {
        depth,
        rarity,
        ...treasure,
      },
    });
  } catch (error: any) {
    console.error('Treasure generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate treasure', details: error.message },
      { status: 500 }
    );
  }
}
