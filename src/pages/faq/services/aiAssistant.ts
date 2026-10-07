import { FAQ_CATEGORIES } from '../data/faqData';

export interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  category?: string;
  suggestedQuestions?: string[];
}

export async function askNextSoftHRAssistant(userQuery: string): Promise<string> {
  const query = userQuery.toLowerCase().trim();

  // Search through all questions and answers in the dataset for relevant context
  let bestMatch: { score: number; answer: string; question: string; category: string } | null = null;

  for (const cat of FAQ_CATEGORIES) {
    for (const item of cat.questions) {
      let score = 0;
      const qLower = item.question.toLowerCase();
      const aLower = item.answer.toLowerCase();

      // Check full phrase match
      if (qLower.includes(query)) score += 50;
      if (aLower.includes(query)) score += 20;

      // Check individual keywords
      const words = query.split(/\s+/).filter(w => w.length > 2);
      for (const word of words) {
        if (qLower.includes(word)) score += 10;
        if (aLower.includes(word)) score += 4;
        if (item.tags?.some(t => t.toLowerCase().includes(word))) score += 8;
      }

      if (!bestMatch || score > bestMatch.score) {
        bestMatch = { score, answer: item.answer, question: item.question, category: cat.title };
      }
    }
  }

  // Artificial slight delay for realistic typing feedback
  await new Promise(resolve => setTimeout(resolve, 350));

  if (bestMatch && bestMatch.score >= 12) {
    return `${bestMatch.answer}\n\n*Related to ${bestMatch.category} — feel free to ask follow-up questions about configuration or scheduling a live demo.*`;
  }

  // Intelligent domain fallback responses
  if (query.includes('price') || query.includes('cost') || query.includes('fee') || query.includes('tier')) {
    return 'NextSoftHR plans start at just $2.50 per employee/month for our Starter package, with Growth ($4.50 PEPM), Scale, and customized Enterprise tiers available. All subscriptions include a 14-day free trial without a credit card.';
  }

  if (query.includes('demo') || query.includes('trial') || query.includes('start')) {
    return 'You can start a 14-day free trial immediately by clicking "Get Started" in the top bar, or click "Book a Demo" to schedule a personalized session with one of our global HR and payroll specialists.';
  }

  if (query.includes('outsourc') || query.includes('manage payroll')) {
    return 'NextSoftHR offers both HR Outsourcing and Managed Payroll Outsourcing. Our certified specialists can handle everything from statutory compliance to monthly bank disbursements on your behalf. Click "Request an Outsourcing Consultation" to speak with our advisory team.';
  }

  if (query.includes('contact') || query.includes('support') || query.includes('phone') || query.includes('email')) {
    return 'Our support team is available 24/7 via live chat, support ticket, and email at support@nextsofthr.org. We maintain dedicated regional teams across Africa, Europe, North America, and Asia.';
  }

  return `NextSoftHR provides a comprehensive, unified platform for HR, automated payroll, time & attendance, leave management, recruitment, and business workflows. For specific guidance on "${userQuery}", our support specialists and solution architects are available for a live demonstration or instant consultation.`;
}
