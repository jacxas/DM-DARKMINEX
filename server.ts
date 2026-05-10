import express from 'express';
import { createServer as createViteServer } from 'vite';
import { OpenAI } from 'openai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function createServer() {
  const app = express();
  app.use(express.json());

  // AI Chat Endpoint
  app.post('/api/chat', async (req, res) => {
    try {
      const body = req.body;
      
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

      res.json({ reply: response.choices[0].message.content });
    } catch (error: any) {
      console.error('OpenAI Error:', error);
      res.status(500).json({ error: 'Failed to communicate with AI' });
    }
  });

  // Vite middleware integration
  let vite: any;
  if (process.env.NODE_ENV !== 'production') {
    vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
  }

  // Serve index.html for all other requests (SPA support)
  app.use('*', async (req, res) => {
    const url = req.originalUrl;
    try {
      let template: string;
      if (process.env.NODE_ENV !== 'production') {
        template = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8');
        template = await vite.transformIndexHtml(url, template);
      } else {
        template = fs.readFileSync(path.resolve(__dirname, 'dist', 'index.html'), 'utf-8');
      }
      res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
    } catch (e: any) {
      if (vite) vite.ssrFixStacktrace(e);
      res.status(500).end(e.stack);
    }
  });

  const PORT = 3000;
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://0.0.0.0:${PORT}`);
  });
}

createServer();
