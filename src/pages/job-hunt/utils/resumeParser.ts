import { ParsedResumeProfile } from '../types';

export const SAMPLE_RESUMES: Record<string, ParsedResumeProfile> = {
  software_engineer: {
    fileName: 'Tunde_Adeleke_Senior_Software_Engineer_CV.pdf',
    fileSize: '1.4 MB',
    parsedAt: 'Just now',
    fullName: 'Tunde Adeleke',
    email: 'tunde.adeleke.dev@gmail.com',
    phone: '+234 803 789 4521',
    currentRole: 'Senior Backend & Distributed Systems Engineer',
    yearsOfExperience: '6+ years',
    extractedSkills: [
      'TypeScript',
      'Node.js',
      'Go',
      'PostgreSQL',
      'Redis',
      'Docker & Kubernetes',
      'Payment Gateways (ISO 8583)',
      'Distributed Reconciliation',
      'Kafka / RabbitMQ',
      'GraphQL & REST APIs',
      'Microservices Architecture',
      'CI/CD Pipelines'
    ],
    education: 'B.Sc. Computer Engineering - University of Lagos (First Class Honours)',
    summary: 'Senior Backend Systems Architect with 6+ years of experience engineering high-throughput fintech engines, payment processing pipelines, and zero-downtime microservices across West Africa.',
    confidenceScore: 98,
    pastCompanies: ['Paystack Financial', 'Interswitch Group', 'Flutterwave'],
    certifications: ['AWS Certified Solutions Architect', 'CKA Kubernetes Administrator'],
    verifiedSkills: [
      { name: 'TypeScript', verifiedAt: 'Verified by NextSoft Assessment', score: 96, type: 'assessment' },
      { name: 'PostgreSQL', verifiedAt: 'Verified by NextSoft Assessment', score: 92, type: 'assessment' },
      { name: 'Docker & Kubernetes', verifiedAt: 'Verified via CKA Certification', type: 'certification', certName: 'CKA Kubernetes Administrator', issuer: 'CNCF' }
    ],
    externalCertifications: [
      { id: 'cert-1', name: 'AWS Certified Solutions Architect - Professional', issuer: 'Amazon Web Services', issueDate: 'Jan 2024', credentialId: 'AWS-99281-NX', skillsVerified: ['AWS', 'Distributed Systems'], isVerified: true },
      { id: 'cert-2', name: 'Certified Kubernetes Administrator (CKA)', issuer: 'Linux Foundation / CNCF', issueDate: 'Nov 2023', credentialId: 'CKA-88129-KF', skillsVerified: ['Docker & Kubernetes'], isVerified: true }
    ]
  },
  hr_director: {
    fileName: 'Adaeze_Okonkwo_Senior_HRBP_Resume.pdf',
    fileSize: '1.2 MB',
    parsedAt: 'Just now',
    fullName: 'Adaeze Okonkwo',
    email: 'adaeze.okonkwo@talentleader.org',
    phone: '+234 812 345 6789',
    currentRole: 'Senior HR Business Partner & People Operations Lead',
    yearsOfExperience: '7+ years',
    extractedSkills: [
      'Strategic Workforce Planning',
      'CIPM Certified Member',
      'Nigerian Labour Act Compliance',
      'Performance Management',
      'Executive Talent Acquisition',
      'Employee Relations Investigations',
      'HRMS & Payroll Integration',
      'Compensation & Benefits Design',
      'Succession Architecture',
      'Cross-Cultural Team Leadership'
    ],
    education: 'Master of Science in Human Resource Management - University of Ibadan',
    summary: 'Strategic People & Culture executive with 7+ years orchestrating agile talent acquisition, performance ecosystems, and labor compliance frameworks for high-growth tech enterprises.',
    confidenceScore: 96,
    pastCompanies: ['NextSoftHR Internal Talent', 'Sterling Tech Group', 'Andela'],
    certifications: ['CIPM Chartered Member', 'SHRM Senior Certified Professional (SHRM-SCP)'],
    verifiedSkills: [
      { name: 'Nigerian Labour Act Compliance', verifiedAt: 'Verified by NextSoft Assessment', score: 98, type: 'assessment' },
      { name: 'Strategic Workforce Planning', verifiedAt: 'Verified via CIPM Credentials', type: 'certification', certName: 'CIPM Chartered Member', issuer: 'CIPM' },
      { name: 'Performance Management', verifiedAt: 'Verified via SHRM-SCP', type: 'certification', certName: 'SHRM-SCP', issuer: 'SHRM' }
    ],
    externalCertifications: [
      { id: 'cert-3', name: 'CIPM Chartered Member Certification', issuer: 'Chartered Institute of Personnel Management of Nigeria', issueDate: 'Mar 2022', credentialId: 'CIPM-NG-44021', skillsVerified: ['Nigerian Labour Act Compliance', 'Strategic Workforce Planning'], isVerified: true },
      { id: 'cert-4', name: 'SHRM Senior Certified Professional (SHRM-SCP)', issuer: 'Society for Human Resource Management', issueDate: 'Aug 2023', credentialId: 'SHRM-SCP-77319', skillsVerified: ['Performance Management'], isVerified: true }
    ]
  },
  product_manager: {
    fileName: 'Chukwudi_Nwachukwu_Product_Growth_Lead.pdf',
    fileSize: '1.6 MB',
    parsedAt: 'Just now',
    fullName: 'Chukwudi Nwachukwu',
    email: 'c.nwachukwu.pm@outlook.com',
    phone: '+234 802 987 6543',
    currentRole: 'Lead Product Manager & Growth Strategist',
    yearsOfExperience: '5+ years',
    extractedSkills: [
      'Product Strategy & Vision',
      'User Journey Mapping',
      'A/B Testing & Funnel Optimization',
      'SQL & Amplitude Analytics',
      'Fintech Product Operations',
      'Agile / Scrum Master',
      'Customer Discovery',
      'Stakeholder Alignment',
      'Go-To-Market (GTM) Strategy',
      'PRD Documentation'
    ],
    education: 'B.Sc. Economics & Business Administration - Covenant University',
    summary: 'Growth-obsessed Product Leader with 5+ years driving user adoption from 0 to 1M+ active users, optimizing checkout conversion funnels, and managing cross-functional product squads.',
    confidenceScore: 95,
    pastCompanies: ['Moniepoint Cloud', 'Opay Digital Services', 'PiggyVest'],
    certifications: ['Certified Scrum Product Owner (CSPO)', 'Reforge Growth Series Graduate']
  }
};

const COMMON_SKILL_KEYWORDS = [
  'JavaScript', 'TypeScript', 'Node.js', 'React', 'Vue', 'Python', 'Go', 'Java', 'C#',
  'PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'Docker', 'Kubernetes', 'AWS', 'GCP', 'Azure',
  'Git', 'CI/CD', 'REST', 'GraphQL', 'Microservices', 'System Architecture',
  'Human Resources', 'HRBP', 'Recruitment', 'Talent Acquisition', 'Payroll', 'CIPM', 'SHRM',
  'Employee Relations', 'Performance Management', 'Labor Compliance', 'Onboarding',
  'Product Management', 'Agile', 'Scrum', 'Analytics', 'SQL', 'A/B Testing', 'Growth Marketing',
  'Financial Modeling', 'Budgeting', 'Risk Management', 'Compliance', 'Audit'
];

/**
 * Mock NLP Parser: Simulates extracting named entities, contact tokens, 
 * skills taxonomies, and experience duration from an uploaded resume file.
 */
export async function parseResumeWithMockNlp(
  file: File,
  onProgress?: (step: string, percent: number) => void
): Promise<ParsedResumeProfile> {
  const steps = [
    { message: 'Reading document layout and byte stream...', percent: 20, delay: 350 },
    { message: 'Extracting contact tokens and entity headers...', percent: 45, delay: 400 },
    { message: 'Named Entity Recognition (NER) scanning skills taxonomies...', percent: 70, delay: 450 },
    { message: 'Analyzing chronological tenure and seniority metrics...', percent: 90, delay: 350 },
    { message: 'Structuring verified candidate profile schema...', percent: 100, delay: 250 }
  ];

  for (const step of steps) {
    if (onProgress) onProgress(step.message, step.percent);
    await new Promise(resolve => setTimeout(resolve, step.delay));
  }

  const nameFromFilename = file.name
    .replace(/\.[^/.]+$/, '')
    .replace(/[-_]/g, ' ')
    .replace(/\b(cv|resume|doc|pdf|docx|profile)\b/gi, '')
    .trim();

  const formattedName = nameFromFilename.length > 2 
    ? nameFromFilename.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ')
    : 'Babatunde Sowore';

  // Read file text if plain text / doc or generate realistic parsed NLP model
  const emailUsername = formattedName.toLowerCase().replace(/\s+/g, '.');
  const sizeMb = (file.size / (1024 * 1024)).toFixed(1);

  // Check if filename contains hints for role specialization
  const lower = file.name.toLowerCase();
  let role = 'Senior Specialist & Team Lead';
  let years = '5+ years';
  let skills = ['Team Leadership', 'Strategic Planning', 'Cross-Functional Collaboration', 'Data Analysis', 'Problem Solving'];
  let education = 'B.Sc. with Academic Distinction - Recognized University';

  if (lower.includes('soft') || lower.includes('dev') || lower.includes('eng') || lower.includes('tech') || lower.includes('code')) {
    role = 'Senior Software Engineer (Full Stack & Systems)';
    years = '6+ years';
    skills = ['TypeScript', 'Node.js', 'React', 'PostgreSQL', 'Docker', 'Distributed Systems', 'REST & GraphQL', 'CI/CD Pipelines'];
    education = 'B.Sc. Computer Science & Software Engineering';
  } else if (lower.includes('hr') || lower.includes('people') || lower.includes('talent') || lower.includes('recruit')) {
    role = 'Senior People Operations & Talent Partner';
    years = '6+ years';
    skills = ['Talent Acquisition', 'CIPM Frameworks', 'Employee Relations', 'Labour Act Compliance', 'HRMS Integration', 'Performance Management'];
    education = 'B.Sc. Human Resource Management & Organizational Psychology';
  } else if (lower.includes('prod') || lower.includes('pm') || lower.includes('growth')) {
    role = 'Product Operations & Growth Lead';
    years = '5+ years';
    skills = ['Product Strategy', 'Agile / Scrum', 'User Funnels', 'SQL Data Analytics', 'Roadmap Prioritization', 'Feature Discovery'];
    education = 'B.Sc. Business Information Technology & Systems';
  } else if (lower.includes('finance') || lower.includes('account') || lower.includes('analyst')) {
    role = 'Senior Financial & Business Analyst';
    years = '5+ years';
    skills = ['Financial Modeling', 'IFRS Standards', 'ERP Systems', 'Reconciliation', 'Auditing', 'Risk Assessment'];
    education = 'B.Sc. Accounting & ICAN Associate';
  }

  return {
    fileName: file.name,
    fileSize: `${sizeMb} MB`,
    parsedAt: 'Just now',
    fullName: formattedName || 'Babatunde Sowore',
    email: `${emailUsername}@example.com`,
    phone: '+234 803 ' + Math.floor(1000000 + Math.random() * 9000000).toString().substring(0, 7),
    currentRole: role,
    yearsOfExperience: years,
    extractedSkills: skills,
    education,
    summary: `Accomplished ${role} with ${years} of progressive experience driving operational excellence, high-impact deliverables, and collaborative team leadership across competitive enterprise environments.`,
    confidenceScore: Math.floor(94 + Math.random() * 5),
    pastCompanies: ['NextSoftHR Partner Network', 'Top Tier African Enterprise']
  };
}

/**
 * Generate role-specific cover note dynamically based on candidate profile and target job
 */
export function generateTailoredCoverNote(
  profile: ParsedResumeProfile,
  jobTitle: string,
  companyName: string
): string {
  const topSkills = profile.extractedSkills.slice(0, 4).join(', ');
  return `Dear Hiring Team at ${companyName},\n\nI am thrilled to apply for the ${jobTitle} position. With ${profile.yearsOfExperience} of professional experience and proven expertise in ${topSkills}, I have developed a strong track record of delivering measurable outcomes.\n\nMy background as a ${profile.currentRole} aligns closely with the objectives of ${companyName}. I look forward to discussing how my experience can contribute to your team's mission.\n\nWarm regards,\n${profile.fullName}`;
}
