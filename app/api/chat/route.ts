import { OpenAI } from 'openai';
import { NextResponse } from 'next/server';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { 
          role: 'system', 
          content: `You are the DM DARKMINE AI crypto assistant. 
          Current Ecosystem Status:
          - Token: DM (Dark Matter)
          - Price: $0.00012 (+5.4% last 24h)
          - Market Cap: $12.45M
          - Volume: $850k (Increasing)
          - Recent Sentiment: Bullish due to DAO proposal #142.
          - Governance: Proposal #142 (Expand Mining Operations) is active. Goal: 15% hash rate increase. Estimated ROI: 22%.
          Provide concise, professional, and technical market movement summaries and governance analysis when asked.`
        },
        { 
          role: 'user', 
          content: body.message 
        }
      ],
    });

    return NextResponse.json({ reply: response.choices[0].message.content });
  } catch (error: any) {
    console.error('OpenAI Error:', error);
    return NextResponse.json({ error: 'Failed to communicate with AI' }, { status: 500 });
  }
}
