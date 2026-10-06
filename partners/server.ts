import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Initialize Gemini API client on server-side
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

const PARTNER_KNOWLEDGE_CONTEXT = `
You are the NextSofthr AI Partner Matchmaker and Advisor.
NextSofthr is an all-in-one cloud HR, Payroll, Biometric Attendance, Leave, Recruitment, Shift Management, and Business Management platform helping businesses in Africa (Nigeria, Kenya, Ghana, South Africa, Rwanda, Egypt, etc.) and internationally manage their operations.
Brand Website: www.nextsofthr.org | WhatsApp/Phone: +2349158482622

NextSofthr Partner Program Details:
- 4 Recurring Commission Tiers:
  1. Bronze Partner (15% recurring): For independent HR specialists, solo recruiters, SME mentors, community business leads.
  2. Silver Partner (20% recurring): For active payroll consultants, certified accountants, tax advisors, boutique advisory practices.
  3. Gold Partner (30% recurring): For established accounting & audit firms, management consultancies, B2B software distributors, digital transformation leads. Unlocks dedicated partner success manager and joint marketing.
  4. Platinum Partner (40% recurring): For enterprise system integrators, large IT infrastructure companies, hardware distributors, and international BPO outsourcing providers.

- 24 Partner Categories Available:
  HR Consultants, HR Professionals, Payroll Consultants, Accountants, Accounting Firms, Tax Consultants, Audit Firms, Business Consultants, Management Consultants, Recruitment Agencies, IT Companies, Technology Companies, Software Resellers, IT Resellers, System Integrators, Business Advisors, Training & Consulting Firms, Outsourcing Companies, Professional Services Firms, Digital Transformation Consultants, Payroll Service Providers, Business Associations, SME Advisors, Independent Business Development Professionals.

Your Goal:
Help the user identify the single best partner category and partner tier for their business or background.
Explain why this category fits them, their expected commission percentage (15%, 20%, 30%, or 40%), and how NextSofthr empowers their clients.
Keep responses concise, welcoming, professional, and action-oriented (2 to 4 sentences).
At the very end of your response, ALWAYS include a JSON block formatted exactly like this:
\`\`\`json
{
  "category": "Exact Category Name matching one of the 24",
  "tier": "bronze" | "silver" | "gold" | "platinum",
  "reason": "1 short sentence reason",
  "followUp": "1 suggested question they can ask next"
}
\`\`\`
`;

// Server endpoint for floating AI partner assistant
app.post('/api/assistant/chat', async (req, res) => {
  const { message, history } = req.body;

  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Message is required' });
  }

  try {
    if (process.env.GEMINI_API_KEY) {
      try {
        const contents = [
          {
            role: 'user',
            parts: [
              {
                text: `${PARTNER_KNOWLEDGE_CONTEXT}\n\nUser Question:\n"${message}"\n\nProvide your expert partner recommendation.`
              }
            ]
          }
        ];

        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents
        });

        const responseText = response.text || '';
        
        // Parse structured JSON block from response if present
        let matchedData = null;
        const jsonMatch = responseText.match(/```json\s*([\s\S]*?)\s*```/);
        let cleanReply = responseText;

        if (jsonMatch && jsonMatch[1]) {
          try {
            matchedData = JSON.parse(jsonMatch[1]);
            cleanReply = responseText.replace(/```json[\s\S]*?```/, '').trim();
          } catch (e) {
            // ignore parsing error
          }
        }

        if (cleanReply) {
          return res.json({
            reply: cleanReply,
            category: matchedData?.category || 'HR Consultants',
            tier: matchedData?.tier || 'silver',
            reason: matchedData?.reason,
            followUp: matchedData?.followUp
          });
        }
      } catch (geminiError) {
        console.warn('Gemini API call failed, falling back to expert rules engine:', geminiError);
      }
    }

    // Heuristic Fallback Matcher
    const lower = message.toLowerCase();
    let category = 'HR Consultants';
    let tier: 'bronze' | 'silver' | 'gold' | 'platinum' = 'silver';
    let reason = 'High client alignment with workforce optimization and steady recurring revenue.';
    let reply = `Based on your profile, we recommend joining NextSofthr as a ${category}. You'll earn a recurring 20% commission on client subscriptions while providing them with automated leave, payroll, and workforce tools.`;
    let followUp = 'How does NextSofthr handle multi-currency payroll in African markets?';

    if (lower.includes('tax') || lower.includes('paye') || lower.includes('deduction')) {
      category = 'Tax Consultants';
      tier = 'silver';
      reason = 'NextSofthr automates statutory PAYE, pension, and remittance schedules.';
      reply = `As a Tax Consultant, NextSofthr enables you to deliver automated PAYE and statutory deduction compliance for client workforces, earning you 20% recurring commission on every active payroll account.`;
      followUp = 'Can I manage multiple client tax filings from one partner dashboard?';
    } else if (lower.includes('account') || lower.includes('cpa') || lower.includes('bookkeep') || lower.includes('audit')) {
      category = lower.includes('firm') ? 'Accounting Firms' : 'Accountants';
      tier = lower.includes('firm') ? 'gold' : 'silver';
      reason = 'Instant reconciliation with payroll general ledger exports and digital audit trails.';
      reply = `For accounting practices, partnering at the ${tier.toUpperCase()} tier allows you to bundle NextSofthr payroll automation with your monthly client retainers, unlocking up to ${tier === 'gold' ? '30%' : '20%'} recurring software revenue.`;
      followUp = 'Does NextSofthr integrate with QuickBooks or standard ERPs?';
    } else if (lower.includes('system') || lower.includes('integrat') || lower.includes('api') || lower.includes('cloud') || lower.includes('software company')) {
      category = 'System Integrators';
      tier = 'platinum';
      reason = 'Full REST API developer access, custom workflows, and enterprise scale.';
      reply = `As a System Integrator or enterprise tech provider, NextSofthr's Platinum Partner Tier delivers our highest 40% recurring commission, dedicated API developer sandboxes, and executive co-selling support for mid-market and enterprise rollouts.`;
      followUp = 'What developer APIs are exposed for custom HRIS integrations?';
    } else if (lower.includes('resell') || lower.includes('distribut') || lower.includes('it hardware') || lower.includes('biometric')) {
      category = 'Software Resellers';
      tier = 'gold';
      reason = 'High-margin recurring SaaS software catalog addition with biometric scanner bundle options.';
      reply = `As a Software or IT Reseller, adding NextSofthr to your commercial catalog qualifies you for our 30% Gold Partner revenue share, complete with co-branded sales kits and priority lead distribution.`;
      followUp = 'Do you offer co-branded sales materials and partner demo environments?';
    } else if (lower.includes('recruit') || lower.includes('staffing') || lower.includes('headhunt') || lower.includes('talent')) {
      category = 'Recruitment Agencies';
      tier = 'bronze';
      reason = 'Direct candidate pipeline placement into digital onboarding workflows.';
      reply = `For recruitment and staffing agencies, NextSofthr lets you seamlessly onboard placed candidates into client teams while earning 15% recurring software commission on every client you introduce.`;
      followUp = 'How does NextSofthr handle applicant tracking and digital onboarding?';
    } else if (lower.includes('bpo') || lower.includes('outsourc')) {
      category = 'Outsourcing Companies';
      tier = 'platinum';
      reason = 'Multi-tenant partitioned client portals and bulk workforce management.';
      reply = `NextSofthr powers BPO and outsourcing firms with enterprise multi-company partitions, dedicated SLAs, and our maximum 40% Platinum Partner margin.`;
      followUp = 'Can we manage multiple distinct client entities from one central console?';
    } else if (lower.includes('sme') || lower.includes('small business') || lower.includes('startup') || lower.includes('founder')) {
      category = 'SME Advisors';
      tier = 'bronze';
      reason = 'Helping early-stage businesses transition from manual spreadsheets to formal HR.';
      reply = `As an SME Advisor, you can help growing African and global businesses eliminate chaotic spreadsheets, establish formal leave policies, and earn 15% recurring revenue as their team expands.`;
      followUp = 'What is the minimum company size NextSofthr supports?';
    }

    return res.json({
      reply,
      category,
      tier,
      reason,
      followUp
    });
  } catch (error: any) {
    console.error('Error in /api/assistant/chat:', error);
    return res.status(500).json({ 
      error: 'Failed to process assistant request',
      fallback: 'NextSofthr partners can join across 24 professional categories earning up to 40% recurring commission. Tell us your business type or target clients to receive a tailored recommendation.'
    });
  }
});

// Serve frontend with Vite middlewares in dev or static files in production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`NextSofthr Applet Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
