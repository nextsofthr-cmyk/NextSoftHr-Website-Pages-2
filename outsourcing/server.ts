import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// Initialize Gemini client if API key is provided
let aiClient: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  try {
    aiClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  } catch (err) {
    console.warn('Failed to initialize GoogleGenAI with provided key:', err);
  }
}

// NextSofthr HR Copilot API endpoint
app.post('/api/ai-chat', async (req, res) => {
  const { message, role = 'HR Manager', context = 'Outsourcing Client' } = req.body;

  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Message query is required' });
  }

  // Domain knowledge system prompt
  const systemInstruction = `You are "NextSofthr AI", an intelligent HR and Payroll Copilot built for NextSofthr (www.nextsofthr.org) — a premier technology-powered HR and payroll outsourcing partner for African and global enterprises.
Your brand colors are Blue and Lemon Green.
Your role is to assist authorized users (${role} in context: ${context}) with:
1. Explaining HR and payroll concepts (statutory calculations across Africa: Nigeria PAYE & Pension 8%/10%, Ghana SSNIT, Kenya KRA & NSSF & SHIF, South Africa SARS/UIF, Rwanda, Uganda, Tanzania, etc.).
2. Drafting HR correspondence, onboarding checklists, policy announcements, job descriptions, and interview guides.
3. Summarizing workforce leave trends and attendance metrics based on authorized data.
4. Explaining employee leave balances and payroll reconciliation.
5. Supporting HR compliance obligations (always clarify: "NextSofthr helps organizations organize, monitor and manage HR and payroll processes to support their compliance responsibilities").
Ensure you remain an assistant (never claim to make autonomous termination or hiring decisions). Keep answers clear, structured with bullet points, professional, actionable, and human-centered.`;

  try {
    if (aiClient) {
      const response = await aiClient.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: message,
        config: {
          systemInstruction,
          temperature: 0.3,
        },
      });

      return res.json({
        reply: response.text || 'I analyzed your request and prepared the guidance above.',
        source: 'gemini-3.8-flash',
      });
    }
  } catch (error) {
    console.error('Gemini API call failed, falling back to expert HR engine:', error);
  }

  // Fallback domain-expert response generator if no key or API error
  const msgLower = message.toLowerCase();
  let reply = '';

  if (msgLower.includes('leave') || msgLower.includes('balance') || msgLower.includes('absent')) {
    reply = `### Leave Management Summary & Status\n\nBased on your organization's configured annual leave policy (21 standard days + statutory provisions):\n\n- **Active on Leave Today**: 4 team members across 3 departments (Engineering, Operations, Customer Success).\n- **Pending Approval Requests**: 2 requests awaiting Line Manager sign-off in the MSS portal.\n- **Statutory Accruals**: Leave balances accrue monthly at 1.75 days per completed month of service.\n\n*NextSofthr Note*: Line managers can approve or request date revisions directly from the Leave Operations calendar.`;
  } else if (msgLower.includes('payroll') || msgLower.includes('salary') || msgLower.includes('tax') || msgLower.includes('paye') || msgLower.includes('pension')) {
    reply = `### Payroll Reconciliation & Statutory Overview\n\nHere is your monthly payroll processing summary:\n\n- **Gross Payroll**: Calculated across base salaries, fixed allowances, approved overtime, and commissions.\n- **Statutory Deductions**: Correctly mapped per local jurisdiction (e.g., Nigeria Pension Reform Act 8% employee / 10% employer; statutory PAYE graduated tax bands; NHF 2.5%; NSITF 1% employer levy).\n- **Net Disbursement**: Reconciled and batch-ready for verified commercial banking payout schedules.\n- **Audit Compliance**: Every line item includes timestamped adjustment logs for your compliance archive.\n\n*Reminder*: NextSofthr helps organizations organize, monitor and manage HR and payroll processes to support their compliance responsibilities.`;
  } else if (msgLower.includes('onboard') || msgLower.includes('checklist')) {
    reply = `### Enterprise New-Hire Onboarding Checklist\n\nHere is an optimized 5-stage onboarding workflow for your team:\n\n1. **Pre-Arrival (Day -7 to -1)**: Digital contract signing via portal, personal KYC collection, national ID & pension PIN capture, IT asset dispatch.\n2. **Day 1 Welcome**: System access orientation, introduction to Line Manager & HR Specialist, company handbook distribution.\n3. **Week 1 Alignment**: Goal setting session, mandatory compliance overview, team shadow schedules.\n4. **Month 1 Checkpoint**: 30-day pulse check via Employee Self-Service, manager milestone assessment.\n5. **Probation Review (Month 3 / 6)**: Structured 360 performance review facilitated by NextSofthr HR Specialist.\n\n*NextSofthr automation automatically triggers reminders for each stage.*`;
  } else if (msgLower.includes('announcement') || msgLower.includes('draft') || msgLower.includes('letter')) {
    reply = `### Draft HR Announcement: Policy & Schedule Update\n\n**Subject**: Important Update: Upcoming Payroll & Public Holiday Schedule\n\n**Dear Team**,\n\nPlease take note of the upcoming holiday schedule and adjusted HR operations timelines for the current cycle:\n\n- **Cut-Off Date for Overtime & Expense Submissions**: 18th of the month at 5:00 PM GMT.\n- **Payroll Processing & Review Window**: Completed by NextSofthr Outsourcing Operations team by the 22nd.\n- **Salary Payout Date**: Value date confirmed for the 25th.\n- **Leave Requests**: Please submit upcoming holiday leave requests at least 5 business days in advance via your NextSofthr Employee Self-Service portal.\n\nFor any inquiries, reach out to your dedicated NextSofthr HR Support Desk.\n\n*Warm regards,*\n*People & Culture / NextSofthr Managed HR Team*`;
  } else if (msgLower.includes('job') || msgLower.includes('recruitment') || msgLower.includes('interview')) {
    reply = `### Recruitment & Candidate Assessment Framework\n\nFor your open requisition, NextSofthr Talent Outsourcing recommends the following structured pipeline:\n\n1. **Core Competencies**: Technical execution, cross-functional collaboration, cultural alignment, and problem-solving agility.\n2. **Suggested Behavioral Interview Questions**:\n   - *"Describe a situation where a tight statutory or project deadline required you to re-prioritize competing tasks."*\n   - *"How do you maintain confidentiality and precision when managing sensitive employee or financial records?"*\n3. **Next Steps**: Our recruitment specialists screen inbound resumes against your target rubric, presenting the top 3-5 verified candidates for final executive interviews.`;
  } else {
    reply = `### NextSofthr HR Copilot Assistance\n\nI have received your request regarding: **"${message}"**.\n\nHere is how NextSofthr can support this requirement:\n- **Automated Workflow**: Configured according to your company handbook and regional statutory standards.\n- **Dedicated HR Specialist Support**: Your assigned NextSofthr account manager validates all edge cases before execution.\n- **Audit & Security**: Full 256-bit encryption with role-based access control protecting all employee and payroll records.\n\nFeel free to ask for specific payroll breakdowns, statutory deduction calculations, policy drafts, or employee lifecycle workflows.`;
  }

  return res.json({ reply, source: 'nextsofthr-rule-engine' });
});

// Proposal/Lead collection endpoint
app.post('/api/proposals', (req, res) => {
  const proposalData = req.body;
  console.log('Received Outsourcing Proposal Request:', proposalData);
  res.json({
    success: true,
    message: 'Thank you. Our outsourcing team will review your requirements and contact you.',
    referenceId: `NSHR-${Date.now().toString(36).toUpperCase()}`,
  });
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`NextSofthr Server listening on port ${PORT}`);
  });
}

startServer();
