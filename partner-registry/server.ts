import express from 'express';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { INITIAL_PARTNERS } from './src/data/partners';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = parseInt(process.env.PORT || '3000', 10);

app.use(express.json());

// Server-side Gemini client initialization
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build'
      }
    }
  });
}

// Compact partner data dictionary for AI prompt context
const partnerSummaries = INITIAL_PARTNERS.map(p => ({
  id: p.id,
  name: p.companyName,
  tagline: p.tagline,
  country: p.country,
  city: p.city,
  type: p.partnerType,
  level: p.partnerLevel,
  isVerified: p.isVerified,
  services: p.services,
  industries: p.industries,
  sizes: p.businessSizesServed,
  languages: p.languages,
  rating: p.rating,
  implementations: p.numberOfImplementations,
  certifications: p.certifications
}));

// AI Partner Match endpoint
app.post('/api/partner-match', async (req, res) => {
  try {
    const { requirements } = req.body;

    if (!requirements || typeof requirements !== 'string' || !requirements.trim()) {
      return res.status(400).json({ error: 'Requirements query is required.' });
    }

    if (!ai) {
      // Fallback response if GEMINI_API_KEY is not configured
      return res.status(503).json({ 
        error: 'Gemini API is not configured on the server. Please attach GEMINI_API_KEY in Secrets.' 
      });
    }

    const prompt = `
You are the NextSofthr AI Partner Advisor. Your job is to analyze client requirements and recommend the top 3 to 5 best-fit certified consulting partners from the NextSofthr Registry.

User's Requirements:
"${requirements}"

Available Registry Partners:
${JSON.stringify(partnerSummaries, null, 2)}

Instructions:
1. Carefully parse the user's intent: geographic location / country, industry domain, services needed (e.g. payroll compliance, HR strategy, ERP integration, shift scheduling), business size, and language requirements.
2. Select 3 to 5 partners that best fit these requirements. Prioritize 'Strategic Partner' and 'Premium Partner' (Top-Tier) and 'isVerified: true' if multiple partners qualify.
3. Compute a match score between 75 and 99 for each selected partner.
4. Provide a crisp, persuasive reason for each partner explaining why they are uniquely suited for this client's specific situation.
5. Provide actionable guidance and next steps.

Return ONLY a valid JSON object with this exact schema:
{
  "summary": "1-2 sentence overview of your understanding of their requirements",
  "extractedCriteria": {
    "targetLocation": "detected country/region or 'Pan-African / Global'",
    "primaryService": "detected service e.g. Payroll Compliance, System Integration, HR Strategy",
    "industry": "detected industry e.g. Manufacturing, Retail, Tech, Healthcare",
    "businessScale": "detected size e.g. Mid-Market, Enterprise, Small Business"
  },
  "recommendedPartners": [
    {
      "partnerId": "partner id matching one of the registry ids above (e.g. 'prt-01')",
      "matchScore": 96,
      "matchReason": "Detailed 1-2 sentence explanation of why this partner fits their exact needs",
      "highlightedStrengths": ["Strength 1", "Strength 2", "Strength 3"]
    }
  ],
  "consultantAdvice": "Professional implementation advice for the client before reaching out"
}
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json'
      }
    });

    const responseText = response.text;
    if (!responseText) {
      throw new Error('Empty response received from Gemini.');
    }

    let parsed;
    try {
      parsed = JSON.parse(responseText);
    } catch (parseErr) {
      // Clean potential markdown blocks
      const cleaned = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
      parsed = JSON.parse(cleaned);
    }

    return res.json(parsed);

  } catch (error: any) {
    console.error('Error generating partner match:', error);
    return res.status(500).json({ 
      error: error.message || 'Failed to analyze requirements and match partners.' 
    });
  }
});

// Middleware for Vite in development, static files in production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${port}`);
  });
}

startServer();
