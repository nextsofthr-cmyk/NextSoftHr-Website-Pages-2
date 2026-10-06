import 'dotenv/config';
import express from 'express';
import http from 'http';
import path from 'path';
import { fileURLToPath } from 'url';
import { WebSocketServer, WebSocket } from 'ws';
import { GoogleGenAI } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Initialize Google GenAI with required telemetry headers
const apiKey = process.env.GEMINI_API_KEY;
let aiClient: GoogleGenAI | null = null;
if (apiKey) {
  aiClient = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// NextSoftHR Training Academy Catalog Metadata for Gemini Grounding
const ACADEMY_CATALOG_SUMMARY = [
  {
    id: 'c1',
    title: 'HR Fundamentals: Core Principles & Modern Operations',
    category: 'HR Management',
    level: 'Beginner',
    format: 'Self-Paced',
    keywords: ['contracts', 'handbook', 'onboarding', 'grievances', 'policies', 'entry-level', 'new hr'],
  },
  {
    id: 'c2',
    title: 'Payroll Administration & End-to-End Processing',
    category: 'Payroll',
    level: 'Intermediate',
    format: 'Live Instructor-Led',
    keywords: ['gross-to-net', 'salary structures', 'pension', 'paye', 'reconciliation', 'processing', 'ghost workers'],
  },
  {
    id: 'c3',
    title: 'Payroll Compliance, Tax Law & Statutory Audit Defense',
    category: 'Payroll',
    level: 'Advanced',
    format: 'Live Instructor-Led',
    keywords: ['tax audit', 'sirs', 'firs', 'pencom', 'itf', 'nsitf', 'back-duty', 'form h1', 'finance act', 'penalties'],
  },
  {
    id: 'c4',
    title: 'Employee Relations & Labor Dispute Resolution',
    category: 'HR Management',
    level: 'Intermediate',
    format: 'Self-Paced',
    keywords: ['disputes', 'queries', 'fair hearing', 'termination', 'disciplinary', 'industrial court', 'unions'],
  },
  {
    id: 'c5',
    title: 'Performance Management & OKR Architecture',
    category: 'HR Management',
    level: 'Intermediate',
    format: 'Live Instructor-Led',
    keywords: ['okrs', 'kpis', 'appraisal', 'pip', 'scorecard', 'continuous feedback', 'underperformance'],
  },
  {
    id: 'c6',
    title: 'Recruitment & Modern Talent Acquisition',
    category: 'Talent Management',
    level: 'Beginner',
    format: 'Self-Paced',
    keywords: ['sourcing', 'star method', 'interviewing', 'headhunting', 'hiring', 'ats', 'employer branding'],
  },
  {
    id: 'c7',
    title: 'HR Analytics & People Dashboards Masterclass',
    category: 'HR Analytics',
    level: 'Advanced',
    format: 'Live Instructor-Led',
    keywords: ['metrics', 'dashboards', 'turnover', 'attrition', 'regression', 'board presentation', 'data-driven'],
  },
  {
    id: 'c8',
    title: 'AI for HR Professionals: Automation & Productivity',
    category: 'AI for HR',
    level: 'Beginner',
    format: 'Self-Paced',
    keywords: ['ai in hr', 'prompt engineering', 'policy drafting', 'cv screening', 'bias audit', 'automation', 'productivity'],
  },
  {
    id: 'c9',
    title: 'Workforce Planning & Capacity Management',
    category: 'Time & Attendance',
    level: 'Intermediate',
    format: 'Self-Paced',
    keywords: ['shift rotas', 'capacity forecasting', 'headcount', 'overtime', 'shrinkage', 'scheduling'],
  },
  {
    id: 'c10',
    title: 'Leadership & People Management Excellence',
    category: 'Leadership & Management',
    level: 'Intermediate',
    format: 'Live Instructor-Led',
    keywords: ['people management', 'delegation', 'team leadership', 'conflict', 'grow coaching', 'new manager'],
  },
  {
    id: 'c11',
    title: 'Time & Attendance Management: Policy & Tech Systems',
    category: 'Time & Attendance',
    level: 'Beginner',
    format: 'Self-Paced',
    keywords: ['biometric clock-in', 'attendance policy', 'lateness', 'leave administration', 'pto', 'timesheets'],
  },
  {
    id: 'c12',
    title: 'Strategic HR Management & Executive Advisory',
    category: 'HR Management',
    level: 'Advanced',
    format: 'Live Instructor-Led',
    keywords: ['boardroom', 'c-suite', 'succession planning', 'organization design', 'mergers', 'culture transformation'],
  },
];

// Fallback rule-based matching if Gemini API key is absent or unreachable
function getHeuristicRecommendation(query: string, role: string, goal: string) {
  const text = `${query} ${role} ${goal}`.toLowerCase();

  let matchedCourseIds = ['c1', 'c2'];
  let matchedPathId = 'hr-professional-path';

  if (text.includes('tax') || text.includes('audit') || text.includes('compliance') || text.includes('statutory') || text.includes('firs') || text.includes('paye')) {
    matchedCourseIds = ['c3', 'c2'];
    matchedPathId = 'payroll-professional-path';
  } else if (text.includes('payroll') || text.includes('salary') || text.includes('net') || text.includes('deduction')) {
    matchedCourseIds = ['c2', 'c3'];
    matchedPathId = 'payroll-professional-path';
  } else if (text.includes('ai') || text.includes('artificial') || text.includes('bot') || text.includes('automate') || text.includes('prompt')) {
    matchedCourseIds = ['c8', 'c7'];
    matchedPathId = 'future-hr-professional-path';
  } else if (text.includes('data') || text.includes('analytics') || text.includes('metric') || text.includes('dashboard')) {
    matchedCourseIds = ['c7', 'c8'];
    matchedPathId = 'future-hr-professional-path';
  } else if (text.includes('leader') || text.includes('manager') || text.includes('lead') || text.includes('coach') || text.includes('team')) {
    matchedCourseIds = ['c10', 'c5'];
    matchedPathId = 'hr-manager-path';
  } else if (text.includes('performance') || text.includes('okr') || text.includes('kpi') || text.includes('appraisal') || text.includes('pip')) {
    matchedCourseIds = ['c5', 'c10'];
    matchedPathId = 'hr-manager-path';
  } else if (text.includes('recruit') || text.includes('hire') || text.includes('talent') || text.includes('source')) {
    matchedCourseIds = ['c6', 'c1'];
    matchedPathId = 'hr-professional-path';
  } else if (text.includes('attendance') || text.includes('shift') || text.includes('leave') || text.includes('time')) {
    matchedCourseIds = ['c11', 'c9'];
    matchedPathId = 'hr-professional-path';
  } else if (text.includes('strategy') || text.includes('director') || text.includes('board') || text.includes('executive')) {
    matchedCourseIds = ['c12', 'c7'];
    matchedPathId = 'hr-manager-path';
  }

  const primary = ACADEMY_CATALOG_SUMMARY.find((c) => c.id === matchedCourseIds[0]) || ACADEMY_CATALOG_SUMMARY[0];
  const secondary = ACADEMY_CATALOG_SUMMARY.find((c) => c.id === matchedCourseIds[1]) || ACADEMY_CATALOG_SUMMARY[1];

  return {
    analysis: `Based on your profile as "${role || 'HR Professional'}" seeking "${goal || 'professional skill acceleration'}", we have analyzed our 12 academy tracks to match your practical workplace responsibilities.`,
    matchedCourseIds,
    primaryRecommendation: {
      courseId: primary.id,
      title: primary.title,
      why: `Directly bridges your operational needs in ${primary.category} with actionable toolkits, hands-on software labs, and verifiable certification.`,
    },
    secondaryRecommendation: {
      courseId: secondary.id,
      title: secondary.title,
      why: `Complements your primary track with advanced mastery in ${secondary.category} to broaden executive decision-making.`,
    },
    matchedPathId,
    estimatedWeeks: '4 to 6 weeks',
    keySkills: [
      'Practical statutory and operational execution without manual errors',
      'Defensible workplace documentation and standardized processes',
      'Certified credential with alphanumeric verification for career advancement',
    ],
    nextActionStep: `Enroll in the upcoming cohort for ${primary.title} or consult with an academy advisor.`,
  };
}

// AI Assistance for Training Selections API Endpoint
app.post('/api/ai-training-advisor', async (req, res) => {
  try {
    const {
      role = '',
      experienceLevel = '',
      goals = '',
      currentChallenges = '',
      organizationType = '',
      preferredFormat = '',
      freeformQuery = '',
    } = req.body;

    const userPrompt = `
Learner Diagnostic Profile:
- Current Role: ${role || 'Not specified'}
- Experience Level: ${experienceLevel || 'Not specified'}
- Career Goals / Objectives: ${goals || 'Not specified'}
- Current Workplace Challenges / Pain Points: ${currentChallenges || 'Not specified'}
- Organization Type: ${organizationType || 'Corporate Enterprise'}
- Preferred Learning Format: ${preferredFormat || 'Flexible'}
- Additional Query / Background: ${freeformQuery || 'None provided'}
`;

    if (aiClient) {
      const response = await aiClient.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: userPrompt,
        config: {
          responseMimeType: 'application/json',
          systemInstruction: `
You are the Chief Academic Advisor at NextSoftHR Training Academy (www.nextsofthr.org).
NextSoftHR is a global HR, payroll, and business management platform ("Powering People. Driving Businesses.").
Your mission is to provide intelligent, authoritative, practical, and highly personalized training recommendations for HR officers, payroll specialists, managers, business owners, and organizations.

Here is the exact NextSoftHR Training Academy Catalog of courses (IDs c1 through c12):
1. c1: HR Fundamentals: Core Principles & Modern Operations (Category: HR Management, Level: Beginner, Format: Self-Paced)
2. c2: Payroll Administration & End-to-End Processing (Category: Payroll, Level: Intermediate, Format: Live Instructor-Led)
3. c3: Payroll Compliance, Tax Law & Statutory Audit Defense (Category: Payroll, Level: Advanced, Format: Live Instructor-Led)
4. c4: Employee Relations & Labor Dispute Resolution (Category: HR Management, Level: Intermediate, Format: Self-Paced)
5. c5: Performance Management & OKR Architecture (Category: HR Management, Level: Intermediate, Format: Live Instructor-Led)
6. c6: Recruitment & Modern Talent Acquisition (Category: Talent Management, Level: Beginner, Format: Self-Paced)
7. c7: HR Analytics & People Dashboards Masterclass (Category: HR Analytics, Level: Advanced, Format: Live Instructor-Led)
8. c8: AI for HR Professionals: Automation & Productivity (Category: AI for HR, Level: Beginner, Format: Self-Paced)
9. c9: Workforce Planning & Capacity Management (Category: Time & Attendance, Level: Intermediate, Format: Self-Paced)
10. c10: Leadership & People Management Excellence (Category: Leadership & Management, Level: Intermediate, Format: Live Instructor-Led)
11. c11: Time & Attendance Management: Policy & Tech Systems (Category: Time & Attendance, Level: Beginner, Format: Self-Paced)
12. c12: Strategic HR Management & Executive Advisory (Category: HR Management, Level: Advanced, Format: Live Instructor-Led)

Available Learning Paths:
- "hr-professional-path": HR Fundamentals → HR Operations → Employee Relations → Performance Management → Strategic HR
- "payroll-professional-path": Payroll Fundamentals → Payroll Processing → Payroll Compliance → Payroll Reporting → Payroll Management
- "hr-manager-path": People Management → Leadership → Performance → Workforce Analytics → Strategic HR
- "future-hr-professional-path": Digital HR → HR Analytics → AI for HR → Workforce Intelligence → Strategic HR

Return a valid JSON object strictly matching this schema:
{
  "analysis": "A concise 2-3 sentence personalized diagnostic assessing their role, pain points, and career trajectory.",
  "matchedCourseIds": ["c2", "c3"],
  "primaryRecommendation": {
    "courseId": "c2",
    "title": "Course Title",
    "why": "Specific, practical reason why this course directly solves their workplace dilemma or career goal."
  },
  "secondaryRecommendation": {
    "courseId": "c3",
    "title": "Course Title",
    "why": "Why this complementary course accelerates their progression."
  },
  "matchedPathId": "payroll-professional-path",
  "estimatedWeeks": "4 to 6 weeks",
  "keySkills": [
    "Specific practical skill 1",
    "Specific practical skill 2",
    "Specific practical skill 3"
  ],
  "nextActionStep": "Clear, encouraging recommendation on what to enroll in next."
}
Only choose course IDs that exist in the catalog (c1 to c12). Only choose valid learning path IDs.
`,
        },
      });

      const responseText = response.text || '';
      try {
        const parsed = JSON.parse(responseText);
        return res.json({ success: true, recommendation: parsed, source: 'gemini' });
      } catch (parseErr) {
        console.warn('Gemini response JSON parse error, falling back to heuristic:', parseErr);
      }
    }

    // Heuristic fallback if AI client unavailable or output not JSON
    const fallback = getHeuristicRecommendation(
      `${currentChallenges} ${freeformQuery}`,
      role,
      goals
    );
    return res.json({ success: true, recommendation: fallback, source: 'heuristic' });
  } catch (error: any) {
    console.error('AI Training Advisor Error:', error);
    const fallback = getHeuristicRecommendation(
      req.body?.freeformQuery || 'training',
      req.body?.role || 'Professional',
      req.body?.goals || 'Career Growth'
    );
    return res.json({ success: true, recommendation: fallback, source: 'fallback' });
  }
});

// --- NextSoftHR Live Chat Real-Time State & Infrastructure ---
interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: 'learner' | 'advisor' | 'system';
  channelId: string;
  text: string;
  timestamp: number;
  avatar?: string;
  badge?: string;
  suggestedCourse?: any;
}

const initialChatMessages: ChatMessage[] = [
  {
    id: 'msg-admissions-1',
    senderId: 'advisor-folashade',
    senderName: 'Dr. Folashade Adeyemi, FCA',
    senderRole: 'advisor',
    channelId: 'admissions',
    text: 'Welcome to the NextSoftHR Training Academy Live Desk! I am Dr. Folashade Adeyemi, Director of Academic Admissions. Ask any questions about upcoming cohort intakes, curriculum syllabi, or verifiable digital certifications.',
    timestamp: Date.now() - 3600000,
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
    badge: 'Admissions Dean',
    suggestedCourse: {
      id: 'c1',
      title: 'HR Fundamentals: Core Principles & Modern Operations',
      category: 'HR Management',
      priceUSD: 150,
      priceNGN: 125000,
      duration: '4 Weeks (20 Hours)',
      format: 'Self-Paced',
      level: 'Beginner',
    },
  },
  {
    id: 'msg-corporate-1',
    senderId: 'advisor-babatunde',
    senderName: 'Babatunde Adeleke, ACA',
    senderRole: 'advisor',
    channelId: 'corporate',
    text: 'Welcome! I am Babatunde Adeleke, Lead Enterprise Training Advisor. How can we assist with upskilling your payroll and HR teams? We offer bespoke cohort dates, software labs, and corporate invoicing in NGN or USD.',
    timestamp: Date.now() - 3600000,
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=150&q=80',
    badge: 'Enterprise Faculty',
    suggestedCourse: {
      id: 'c2',
      title: 'Payroll Administration & End-to-End Processing',
      category: 'Payroll',
      priceUSD: 160,
      priceNGN: 135000,
      duration: '4 Weeks (24 Hours)',
      format: 'Live Instructor-Led',
      level: 'Intermediate',
    },
  },
  {
    id: 'msg-faculty-1',
    senderId: 'advisor-nnamdi',
    senderName: 'Engr. Nnamdi Eze',
    senderRole: 'advisor',
    channelId: 'faculty',
    text: 'NextSoftHR Technical & Software Labs desk is online. Feel free to ask about our interactive payroll simulation exercises, AI for HR prompts, or attendance biometric integrations.',
    timestamp: Date.now() - 3600000,
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&q=80',
    badge: 'Tech & Labs Faculty',
    suggestedCourse: {
      id: 'c8',
      title: 'AI for HR Professionals: Automation & Productivity',
      category: 'AI for HR',
      priceUSD: 170,
      priceNGN: 145000,
      duration: '3 Weeks (18 Hours)',
      format: 'Self-Paced',
      level: 'Beginner',
    },
  },
  {
    id: 'msg-legal-1',
    senderId: 'advisor-kemi',
    senderName: 'Barrister Kemi Alabi',
    senderRole: 'advisor',
    channelId: 'legal',
    text: 'Greetings! I am Barrister Kemi Alabi, Senior Labor Attorney & Employment Dispute Lead. Inquire here regarding statutory audit defense, labor act arbitration, dismissal procedures, and union compliance.',
    timestamp: Date.now() - 3600000,
    avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=150&q=80',
    badge: 'Labor Law Dean',
    suggestedCourse: {
      id: 'c4',
      title: 'Employee Relations & Labor Dispute Resolution',
      category: 'HR Management',
      priceUSD: 140,
      priceNGN: 120000,
      duration: '3 Weeks (18 Hours)',
      format: 'Self-Paced',
      level: 'Intermediate',
    },
  },
];

let chatMessagesStore: ChatMessage[] = [...initialChatMessages];

interface ConnectedClient {
  ws: WebSocket;
  userId: string;
  userName: string;
  userRole: 'learner' | 'advisor';
  channelId: string;
}

const connectedClients = new Map<string, ConnectedClient>();

// Initialize WebSocket Server attached to the HTTP server on port 3000
const wss = new WebSocketServer({ server });

function broadcastPresence() {
  const activeUsersCount = connectedClients.size;
  const channelUsersCount: Record<string, number> = {
    admissions: 0,
    corporate: 0,
    faculty: 0,
  };

  for (const client of connectedClients.values()) {
    if (channelUsersCount[client.channelId] !== undefined) {
      channelUsersCount[client.channelId]++;
    } else {
      channelUsersCount[client.channelId] = 1;
    }
  }

  const payload = JSON.stringify({
    type: 'presence_update',
    payload: {
      activeUsersCount: Math.max(1, activeUsersCount),
      channelUsersCount,
    },
  });

  for (const client of connectedClients.values()) {
    if (client.ws.readyState === WebSocket.OPEN) {
      client.ws.send(payload);
    }
  }
}

function broadcastMessage(message: ChatMessage) {
  const payload = JSON.stringify({
    type: 'message_created',
    payload: message,
  });

  for (const client of connectedClients.values()) {
    if (client.ws.readyState === WebSocket.OPEN) {
      client.ws.send(payload);
    }
  }
}

// Generate contextual academy response for learners asking questions
async function triggerAdvisorAutoResponse(channelId: string, userText: string, learnerName: string) {
  const lower = userText.toLowerCase();

  let advisorName = 'Dr. Folashade Adeyemi, FCA';
  let advisorBadge = 'Admissions Dean';
  let advisorAvatar = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80';
  let replyText = '';

  if (channelId === 'corporate') {
    advisorName = 'Babatunde Adeleke, ACA';
    advisorBadge = 'Enterprise Faculty';
    advisorAvatar = 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=150&q=80';
  } else if (channelId === 'faculty') {
    advisorName = 'Engr. Nnamdi Eze';
    advisorBadge = 'Tech & Labs Faculty';
    advisorAvatar = 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&q=80';
  } else if (channelId === 'legal') {
    advisorName = 'Barrister Kemi Alabi';
    advisorBadge = 'Labor Law Dean';
    advisorAvatar = 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=150&q=80';
  }

  // Determine if a course should be suggested based on query keywords
  let suggestedCourse: any = undefined;
  if (lower.includes('tax') || lower.includes('audit') || lower.includes('firs') || lower.includes('sirs') || lower.includes('statutory')) {
    suggestedCourse = {
      id: 'c3',
      title: 'Payroll Compliance, Tax Law & Statutory Audit Defense',
      category: 'Payroll',
      priceUSD: 210,
      priceNGN: 175000,
      duration: '5 Weeks (30 Hours)',
      format: 'Live Instructor-Led',
      level: 'Advanced',
    };
  } else if (lower.includes('payroll') || lower.includes('salary') || lower.includes('payslip') || lower.includes('pension')) {
    suggestedCourse = {
      id: 'c2',
      title: 'Payroll Administration & End-to-End Processing',
      category: 'Payroll',
      priceUSD: 160,
      priceNGN: 135000,
      duration: '4 Weeks (24 Hours)',
      format: 'Live Instructor-Led',
      level: 'Intermediate',
    };
  } else if (lower.includes('dispute') || lower.includes('labor') || lower.includes('union') || lower.includes('dismiss') || lower.includes('court') || lower.includes('contract')) {
    suggestedCourse = {
      id: 'c4',
      title: 'Employee Relations & Labor Dispute Resolution',
      category: 'HR Management',
      priceUSD: 140,
      priceNGN: 120000,
      duration: '3 Weeks (18 Hours)',
      format: 'Self-Paced',
      level: 'Intermediate',
    };
  } else if (lower.includes('analytics') || lower.includes('dashboard') || lower.includes('metric') || lower.includes('data')) {
    suggestedCourse = {
      id: 'c7',
      title: 'HR Analytics & People Dashboards Masterclass',
      category: 'HR Analytics',
      priceUSD: 230,
      priceNGN: 185000,
      duration: '6 Weeks (36 Hours)',
      format: 'Live Instructor-Led',
      level: 'Advanced',
    };
  } else if (lower.includes('ai') || lower.includes('prompt') || lower.includes('automation') || lower.includes('tech')) {
    suggestedCourse = {
      id: 'c8',
      title: 'AI for HR Professionals: Automation & Productivity',
      category: 'AI for HR',
      priceUSD: 170,
      priceNGN: 145000,
      duration: '3 Weeks (18 Hours)',
      format: 'Self-Paced',
      level: 'Beginner',
    };
  } else if (lower.includes('fundamental') || lower.includes('beginner') || lower.includes('start') || lower.includes('new to hr')) {
    suggestedCourse = {
      id: 'c1',
      title: 'HR Fundamentals: Core Principles & Modern Operations',
      category: 'HR Management',
      priceUSD: 150,
      priceNGN: 125000,
      duration: '4 Weeks (20 Hours)',
      format: 'Self-Paced',
      level: 'Beginner',
    };
  }

  if (aiClient) {
    try {
      const prompt = `
A learner named "${learnerName || 'Learner'}" just asked in the NextSoftHR Training Academy live chat (${channelId} channel):
"${userText}"

You are replying as ${advisorName} (${advisorBadge}) from NextSoftHR Training Academy (www.nextsofthr.org, phone: +234 915 848 2622).
NextSoftHR offers accredited HR and payroll training courses (like HR Fundamentals, Payroll Administration, Tax Law Compliance, AI in HR, Leadership, and HR Analytics).
Certificates of completion are digitally verifiable with unique IDs.
Pricing is available in NGN (e.g. ₦120,000 - ₦185,000) and USD ($150 - $250). Corporate training for teams is fully customized.

Write a friendly, authoritative, practical response in 2 to 3 sentences addressing their specific question directly. Invite them to enroll or speak directly with our team.
`;
      const aiRes = await aiClient.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
      });

      if (aiRes.text) {
        replyText = aiRes.text.trim();
      }
    } catch (err) {
      console.warn('Gemini chat auto-reply error, fallback heuristic used:', err);
    }
  }

  if (!replyText) {
    if (lower.includes('cost') || lower.includes('price') || lower.includes('fee') || lower.includes('naira') || lower.includes('how much')) {
      replyText = `Our individual training courses range from ₦120,000 to ₦185,000 (approx. $150 - $250 USD) depending on whether it is self-paced or instructor-led with hands-on software labs. We also offer corporate group volume rates and split installment plans!`;
    } else if (lower.includes('when') || lower.includes('cohort') || lower.includes('date') || lower.includes('start')) {
      replyText = `Our next executive live cohorts commence on the first Saturday of next month, with flexible weekend morning and weekday evening schedules. Self-paced online courses can be started immediately upon enrollment.`;
    } else if (lower.includes('certificate') || lower.includes('accredit') || lower.includes('cipm')) {
      replyText = `Yes! All graduates receive a verifiable digital Certificate of Completion with a unique verification code and QR code that can be shared on LinkedIn or authenticated by employers at www.nextsofthr.org/verify.`;
    } else if (lower.includes('corporate') || lower.includes('team') || lower.includes('company') || lower.includes('business')) {
      replyText = `For corporate teams, we customize the curriculum to your company's actual payroll schedules and HR handbook, with on-site or virtual delivery. You can click 'Corporate Training' on the page to submit a group request or call us at +234 915 848 2622.`;
    } else {
      replyText = `Thank you for reaching out, ${learnerName}! I have noted your inquiry. You can register directly through the course catalog, or let me know if you would like me to recommend a specific learning track tailored to your role.`;
    }
  }

  // Save and broadcast advisor message
  const advisorMsg: ChatMessage = {
    id: `msg-advisor-${Date.now()}`,
    senderId: `advisor-${advisorName.toLowerCase().replace(/[^a-z0-9]/g, '')}`,
    senderName: advisorName,
    senderRole: 'advisor',
    channelId,
    text: replyText,
    timestamp: Date.now(),
    avatar: advisorAvatar,
    badge: advisorBadge,
    suggestedCourse,
  };

  chatMessagesStore.push(advisorMsg);
  // Keep store capped at 200 items in memory
  if (chatMessagesStore.length > 200) {
    chatMessagesStore = chatMessagesStore.slice(-200);
  }

  broadcastMessage(advisorMsg);
}

wss.on('connection', (ws: WebSocket) => {
  const connectionId = `conn-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

  // Default client info before explicit join
  const clientInfo: ConnectedClient = {
    ws,
    userId: `user-${Date.now().toString().slice(-4)}`,
    userName: 'Learner',
    userRole: 'learner',
    channelId: 'admissions',
  };
  connectedClients.set(connectionId, clientInfo);

  // Send initial state to newly connected client
  ws.send(
    JSON.stringify({
      type: 'init',
      payload: {
        messages: chatMessagesStore,
        activeUsersCount: Math.max(1, connectedClients.size),
      },
    })
  );

  broadcastPresence();

  ws.on('message', async (data: string) => {
    try {
      const parsed = JSON.parse(data.toString());
      const { type, payload } = parsed;

      if (type === 'join') {
        if (payload.userId) clientInfo.userId = payload.userId;
        if (payload.userName) clientInfo.userName = payload.userName;
        if (payload.userRole) clientInfo.userRole = payload.userRole;
        if (payload.channelId) clientInfo.channelId = payload.channelId;
        broadcastPresence();
      } else if (type === 'switch_channel') {
        if (payload.channelId) {
          clientInfo.channelId = payload.channelId;
          broadcastPresence();
        }
      } else if (type === 'send_message') {
        const text = (payload.text || '').trim();
        if (!text) return;

        const newMsg: ChatMessage = {
          id: `msg-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
          senderId: payload.senderId || clientInfo.userId,
          senderName: payload.senderName || clientInfo.userName,
          senderRole: payload.senderRole || clientInfo.userRole,
          channelId: payload.channelId || clientInfo.channelId,
          text,
          timestamp: Date.now(),
          avatar: payload.avatar,
        };

        chatMessagesStore.push(newMsg);
        if (chatMessagesStore.length > 200) {
          chatMessagesStore = chatMessagesStore.slice(-200);
        }

        // Broadcast to all clients in real-time
        broadcastMessage(newMsg);

        // If message is from a learner, simulate intelligent advisor response after brief realistic delay
        if (newMsg.senderRole === 'learner') {
          setTimeout(() => {
            triggerAdvisorAutoResponse(newMsg.channelId, newMsg.text, newMsg.senderName);
          }, 900);
        }
      } else if (type === 'typing') {
        // Relay typing indicators
        const typingPayload = JSON.stringify({
          type: 'typing_update',
          payload: {
            userId: clientInfo.userId,
            userName: clientInfo.userName,
            channelId: payload.channelId || clientInfo.channelId,
            isTyping: !!payload.isTyping,
          },
        });

        for (const [id, client] of connectedClients.entries()) {
          if (id !== connectionId && client.ws.readyState === WebSocket.OPEN) {
            client.ws.send(typingPayload);
          }
        }
      }
    } catch (err) {
      console.error('Error handling WebSocket message:', err);
    }
  });

  ws.on('close', () => {
    connectedClients.delete(connectionId);
    broadcastPresence();
  });

  ws.on('error', (err) => {
    console.warn('WebSocket error on client:', err);
    connectedClients.delete(connectionId);
  });
});

// REST Fallback API endpoints for chat
app.get('/api/chat/messages', (req, res) => {
  const channelId = req.query.channelId as string;
  if (channelId) {
    const filtered = chatMessagesStore.filter((m) => m.channelId === channelId);
    return res.json({ success: true, messages: filtered });
  }
  return res.json({ success: true, messages: chatMessagesStore });
});

app.post('/api/chat/clear', (req, res) => {
  const channelId = req.body?.channelId as string;
  if (channelId) {
    chatMessagesStore = chatMessagesStore.filter((m) => m.channelId !== channelId);
    const defaults = initialChatMessages.filter((m) => m.channelId === channelId);
    chatMessagesStore.push(...defaults);
  } else {
    chatMessagesStore = [...initialChatMessages];
  }
  return res.json({ success: true, messages: chatMessagesStore });
});

app.post('/api/chat/send', (req, res) => {
  const { senderId, senderName, senderRole, channelId, text, avatar } = req.body;
  if (!text || !text.trim()) {
    return res.status(400).json({ success: false, error: 'Text is required' });
  }

  const newMsg: ChatMessage = {
    id: `msg-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    senderId: senderId || 'learner-guest',
    senderName: senderName || 'Learner',
    senderRole: senderRole || 'learner',
    channelId: channelId || 'admissions',
    text: text.trim(),
    timestamp: Date.now(),
    avatar,
  };

  chatMessagesStore.push(newMsg);
  broadcastMessage(newMsg);

  if (newMsg.senderRole === 'learner') {
    setTimeout(() => {
      triggerAdvisorAutoResponse(newMsg.channelId, newMsg.text, newMsg.senderName);
    }, 900);
  }

  return res.json({ success: true, message: newMsg });
});

// Configure Vite middleware in development or static serving in production
if (process.env.NODE_ENV !== 'production') {
  const { createServer: createViteServer } = await import('vite');
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

server.listen(PORT, () => {
  console.log(`NextSoftHR Training Academy server running on port ${PORT} (with WebSockets attached)`);
});

