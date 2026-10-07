export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  tags?: string[];
  highlight?: boolean;
}

export interface FAQCategory {
  id: string;
  title: string;
  shortDescription: string;
  iconName: string;
  badge?: string;
  ctaText?: string;
  ctaAction?: 'pricing' | 'support' | 'outsourcing' | 'demo' | 'ai';
  questions: FAQItem[];
}

export const FAQ_CATEGORIES: FAQCategory[] = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    shortDescription: 'Setup, account creation, multi-entity configurations & onboarding.',
    iconName: 'Rocket',
    questions: [
      {
        id: 'gs-1',
        question: 'What is NextSoftHR?',
        answer: 'NextSoftHR is an enterprise-grade global HR, payroll, workforce, and business management SaaS platform designed for micro, small, medium, and large multinational organizations. It consolidates employee profiles, statutory multi-country payroll, biometric attendance, talent acquisition, CRM, project tracking, and AI-driven HR intelligence into a unified, secure cloud environment.',
        tags: ['overview', 'platform', 'saas']
      },
      {
        id: 'gs-2',
        question: 'Who can use NextSoftHR?',
        answer: 'NextSoftHR is engineered for all organizational stakeholders: HR leaders, CFOs and payroll managers, operations directors, team managers, and individual employees. It caters to micro-businesses looking for structured automated payroll up to global enterprises managing thousands of distributed workers.',
        tags: ['users', 'roles', 'business size']
      },
      {
        id: 'gs-3',
        question: 'Is NextSoftHR suitable for small businesses?',
        answer: 'Yes. Small and growing businesses can adopt our streamlined starter packages with turnkey employee records, simplified statutory payroll, automated leave approvals, and employee self-service without requiring dedicated IT or enterprise implementation teams.',
        tags: ['small business', 'sme', 'starter']
      },
      {
        id: 'gs-4',
        question: 'Can large organizations use NextSoftHR?',
        answer: 'Absolutely. NextSoftHR scales to thousands of concurrent users with multi-entity support, custom approval hierarchies, audit-trail logging, single sign-on (SSO), granular role-based permissions, and localized tax engines for complex corporate structures.',
        tags: ['enterprise', 'scale', 'multinational']
      },
      {
        id: 'gs-5',
        question: 'How do I create a NextSoftHR account?',
        answer: 'You can create an account in minutes by clicking "Get Started" or "Start Free". Enter your work email, organization details, and preferred regional workspace to start an instant 14-day free trial without requiring a credit card.',
        tags: ['registration', 'account', 'sign up']
      },
      {
        id: 'gs-6',
        question: 'Can I request a product demonstration?',
        answer: 'Yes. Our HR and payroll specialists provide tailored 1-on-1 walkthroughs mapped to your company workflows, local statutory compliance requirements, and integration architecture. You can click "Book a Demo" anytime to schedule a session.',
        tags: ['demo', 'consultation', 'sales']
      },
      {
        id: 'gs-7',
        question: 'How quickly can my organization get started?',
        answer: 'Micro and small organizations typically go live within 24 to 48 hours using self-service wizards and sample import templates. Medium to enterprise rollouts with custom approval matrices, historical data migration, and third-party accounting integrations typically take between 1 to 3 weeks with our dedicated implementation team.',
        tags: ['go-live', 'timeline', 'implementation']
      },
      {
        id: 'gs-8',
        question: 'Can I import existing employee data?',
        answer: 'Yes. NextSoftHR includes an automated bulk data migration engine. You can upload CSV, Excel, or payroll export files with intelligent column matching for personal profiles, bank accounts, tax identifiers, contract dates, and starting leave balances.',
        tags: ['data import', 'migration', 'excel']
      },
      {
        id: 'gs-9',
        question: 'Does NextSoftHR support multiple companies?',
        answer: 'Yes. Our Multi-Entity Management module allows holding companies, conglomerates, and shared services to manage multiple independent subsidiaries under a single overarching parent portal while segregating tax identities, bank accounts, and payroll records.',
        tags: ['multi-company', 'subsidiaries', 'holding']
      },
      {
        id: 'gs-10',
        question: 'Can I manage multiple branches or locations?',
        answer: 'Yes. You can configure infinite branches, geographic territories, physical offices, warehouses, and remote hubs. Each branch can have its own working calendars, public holidays, shift rules, and localized management hierarchies.',
        tags: ['branches', 'locations', 'workspaces']
      },
      {
        id: 'gs-11',
        question: 'Does NextSoftHR work internationally?',
        answer: 'NextSoftHR operates across Africa, Europe, North America, the Middle East, and Asia-Pacific. We support multi-currency payroll, time zone normalization, localized statutory rules, and cross-border workforce coordination.',
        tags: ['international', 'global', 'cross-border', 'currency']
      }
    ]
  },
  {
    id: 'hr-management',
    title: 'HR Management',
    shortDescription: 'Core HR, employee records, document management & organizational structure.',
    iconName: 'Users',
    questions: [
      {
        id: 'hr-1',
        question: 'What HR functions does NextSoftHR provide?',
        answer: 'NextSoftHR covers the entire employee lifecycle: digital onboarding, comprehensive profile dossiers, document vaulting, organizational hierarchy mapping, performance reviews, employee policy distribution, disciplinary tracking, asset issuance, and automated offboarding.',
        tags: ['core hr', 'lifecycle', 'features']
      },
      {
        id: 'hr-2',
        question: 'Can I create and manage employee profiles?',
        answer: 'Yes. Each employee record houses contact details, emergency contacts, compensation history, contractual documents, equipment assignments, banking details, performance appraisals, and historical promotions with strict privacy controls.',
        tags: ['profiles', 'records', 'directory']
      },
      {
        id: 'hr-3',
        question: 'Can I manage employee documents?',
        answer: 'NextSoftHR features a secure encrypted document vault. HR teams can store contracts, IDs, educational certificates, visa permits, and compliance forms with automated expiration alerts and digital acknowledgment signing.',
        tags: ['documents', 'compliance', 'contracts']
      },
      {
        id: 'hr-4',
        question: 'Can I track employee lifecycle events?',
        answer: 'Yes. Automated timeline tracking records probation reviews, role changes, salary revisions, department transfers, disciplinary milestones, commendations, and exit interviews with historical audit stamps.',
        tags: ['lifecycle', 'milestones', 'promotions']
      },
      {
        id: 'hr-5',
        question: 'Can I manage departments and organizational structures?',
        answer: 'NextSoftHR renders dynamic interactive org charts, reporting lines, cost centers, and departmental hierarchies. Changes to management structures automatically update approval workflows across leave, expenses, and requisitions.',
        tags: ['org chart', 'hierarchy', 'departments']
      },
      {
        id: 'hr-6',
        question: 'Can I create employee policies?',
        answer: 'Yes. HR can publish handbooks, code of conduct updates, and health & safety manuals with mandatory employee digital acknowledgments, reading tracking, and version control.',
        tags: ['policies', 'handbooks', 'compliance']
      },
      {
        id: 'hr-7',
        question: 'Can managers manage their teams?',
        answer: 'Yes. Through Manager Self-Service (MSS), designated team leads and supervisors can view their direct reports’ attendance, approve leaves, review KPIs, log 1-on-1s, and initiate promotion recommendations within their authorized scope.',
        tags: ['managers', 'mss', 'team leads']
      },
      {
        id: 'hr-8',
        question: 'Does NextSoftHR support performance management?',
        answer: 'Yes. The platform includes customizable 360-degree reviews, quarterly evaluations, continuous feedback loops, peer reviews, rating matrices, and automated appraisal reminders.',
        tags: ['performance', 'reviews', 'appraisals']
      },
      {
        id: 'hr-9',
        question: 'Can I track employee goals and objectives?',
        answer: 'NextSoftHR features an integrated OKR and KPI tracker. Employees and managers can align quarterly targets with company objectives, log progress updates, and correlate achievement with annual bonus structures.',
        tags: ['okrs', 'kpis', 'goals']
      },
      {
        id: 'hr-10',
        question: 'Can I manage employee records centrally?',
        answer: 'Yes. Distributed offices, remote contractors, and branch personnel are managed in a centralized, cloud-hosted registry that eliminates fragmented spreadsheets while upholding data residency and access segmentation.',
        tags: ['centralized', 'cloud', 'data']
      }
    ]
  },
  {
    id: 'payroll',
    title: 'Payroll',
    shortDescription: 'Multi-country payroll processing, statutory tax formulas, deductions & payslips.',
    iconName: 'CreditCard',
    ctaText: 'View NextSoftHR Pricing',
    ctaAction: 'pricing',
    questions: [
      {
        id: 'pay-1',
        question: 'How does NextSoftHR payroll work?',
        answer: 'NextSoftHR provides a deterministic 4-step payroll workflow: Attendance & Leave synchronization, automated gross-to-net computation, administrative audit & multi-tier approval, and direct bank disbursement file generation with instantaneous digital payslip delivery.',
        tags: ['payroll', 'workflow', 'gross to net']
      },
      {
        id: 'pay-2',
        question: 'Can NextSoftHR automate payroll calculations?',
        answer: 'Yes. The calculation engine processes basic pay, hourly rates, overtime multipliers, allowances, recurring statutory deductions, pension contributions, health insurance, and voluntary savings automatically without manual formulas.',
        tags: ['automation', 'calculations', 'taxes']
      },
      {
        id: 'pay-3',
        question: 'Can I configure salary structures?',
        answer: 'Yes. Create custom grade levels, pay bands, consolidated packages, and executive compensation plans. Structures can be customized by job role, department, seniority, or country of employment.',
        tags: ['salary structure', 'pay grades', 'compensation']
      },
      {
        id: 'pay-4',
        question: 'Can I manage allowances and deductions?',
        answer: 'NextSoftHR supports both fixed and variable allowances (housing, transport, meal, utility, per diem) and flexible deductions (statutory taxes, pension, union dues, loan repayments, disciplinary deductions, or welfare funds).',
        tags: ['allowances', 'deductions', 'benefits']
      },
      {
        id: 'pay-5',
        question: 'Can I process bonuses and commissions?',
        answer: 'Yes. Administrators can run one-off or recurring performance bonuses, sales commission imports, 13th-month salary distributions, and year-end ex-gratia payments with custom tax withholding treatments.',
        tags: ['bonuses', 'commissions', 'incentives']
      },
      {
        id: 'pay-6',
        question: 'Can I manage statutory deductions?',
        answer: 'Yes. Pre-configured tax tables and contribution schedules are maintained for multiple jurisdictions (PAYE, Pension/Social Security, NHIF, Housing Levies, NSITF, ITF, and provincial taxes). Formulas are kept updated with latest gazetted fiscal laws.',
        tags: ['statutory', 'tax', 'compliance', 'pension']
      },
      {
        id: 'pay-7',
        question: 'Can I generate payroll reports?',
        answer: 'NextSoftHR generates over 35 enterprise payroll reports, including bank remittance schedules, statutory filing summaries, general ledger journal entries, variance audits, department cost allocation summaries, and year-to-date tax returns.',
        tags: ['reports', 'gl journal', 'remittance']
      },
      {
        id: 'pay-8',
        question: 'Can employees access their payslips?',
        answer: 'Yes. As soon as a payroll run is finalized, encrypted PDF payslips are published to each employee’s Self-Service portal and mobile app, with optional automated email delivery featuring password protection.',
        tags: ['payslips', 'ess', 'self-service']
      },
      {
        id: 'pay-9',
        question: 'Can payroll be processed for multiple branches?',
        answer: 'Yes. You can execute payroll per branch, entity, or cost center, or process an aggregate company-wide run with separated bank disbursement files and localized approvals.',
        tags: ['branches', 'multi-branch', 'disbursement']
      },
      {
        id: 'pay-10',
        question: 'Can payroll administrators control payroll approvals?',
        answer: 'Yes. The system enforces strict segregation of duties: payroll preparers, HR reviewers, finance auditors, and executive approvers can be assigned sequential sign-off gates prior to disbursement.',
        tags: ['approvals', 'controls', 'separation of duties']
      },
      {
        id: 'pay-11',
        question: 'Does NextSoftHR support payroll outsourcing?',
        answer: 'Yes. If your organization prefers complete hands-off payroll management, our certified in-house payroll specialists handle computation, statutory remittances, bank payouts, and employee query resolution through our Managed Payroll Outsourcing service.',
        tags: ['outsourcing', 'managed payroll', 'services']
      },
      {
        id: 'pay-12',
        question: 'Can payroll rules be configured for different countries?',
        answer: 'Yes. NextSoftHR includes localized fiscal rule-sets for different countries across Africa (Nigeria, Kenya, Ghana, South Africa, Rwanda, Egypt), the UK, UAE, and North America, with support for dual-currency contracts.',
        tags: ['international', 'multi-country', 'localization']
      }
    ]
  },
  {
    id: 'time-attendance',
    title: 'Time & Attendance',
    shortDescription: 'Shift scheduling, biometric clocks, geo-fenced mobile check-in & overtime.',
    iconName: 'Clock',
    questions: [
      {
        id: 'ta-1',
        question: 'Can NextSoftHR track employee attendance?',
        answer: 'Yes. NextSoftHR monitors real-time employee attendance across physical offices, job sites, and remote locations with live status indicators (Present, Late, Absent, On Leave, In Shift).',
        tags: ['attendance', 'monitoring', 'real-time']
      },
      {
        id: 'ta-2',
        question: 'Does NextSoftHR support clock-in and clock-out?',
        answer: 'Yes. Employees can record clock-ins and clock-outs using dedicated biometric devices, desktop web browsers, QR code scanning kiosks, or our native mobile applications.',
        tags: ['clock-in', 'clock-out', 'punching']
      },
      {
        id: 'ta-3',
        question: 'Can employees use mobile attendance?',
        answer: 'Yes. Our iOS and Android apps allow mobile check-in with GPS geo-fencing and optional biometric or selfie verification, preventing off-site punches and buddy clocking for field and remote staff.',
        tags: ['mobile', 'geo-fencing', 'gps']
      },
      {
        id: 'ta-4',
        question: 'Can I manage shifts?',
        answer: 'NextSoftHR includes an interactive visual drag-and-drop shift planner supporting rotating rosters, 24/7 continuous operations, night shifts, split shifts, and automated rest interval policies.',
        tags: ['shifts', 'rosters', 'scheduling']
      },
      {
        id: 'ta-5',
        question: 'Can I create multiple work schedules?',
        answer: 'Yes. Configure standard 9-to-5 schedules, flexible hours, 4-day workweeks, compressed schedules, and part-time employee matrices across distinct departments and job levels.',
        tags: ['schedules', 'work hours', 'flexibility']
      },
      {
        id: 'ta-6',
        question: 'Can managers monitor attendance?',
        answer: 'Team supervisors have access to a real-time team attendance dashboard that highlights lateness, early departures, unscheduled absences, and real-time headcounts.',
        tags: ['managers', 'supervisors', 'headcount']
      },
      {
        id: 'ta-7',
        question: 'Can attendance data feed into payroll?',
        answer: 'Yes. Verified timesheets, worked hours, unpaid absences, and authorized overtime sync directly into the payroll engine at the click of a button, eliminating manual calculations.',
        tags: ['payroll sync', 'timesheets', 'integration']
      },
      {
        id: 'ta-8',
        question: 'Can I manage overtime?',
        answer: 'NextSoftHR automates daily, weekend, and public holiday overtime calculations based on pre-defined multipliers (e.g. 1.5x, 2.0x) with mandatory manager pre-approval or post-shift sign-off.',
        tags: ['overtime', 'multipliers', 'approvals']
      },
      {
        id: 'ta-9',
        question: 'Can I track lateness and absenteeism?',
        answer: 'Yes. Configure grace periods (e.g., 10 minutes), automated email or push alerts to tardy employees, and automated payroll deductions for unauthorized absences.',
        tags: ['lateness', 'absenteeism', 'penalties']
      },
      {
        id: 'ta-10',
        question: 'Does NextSoftHR support multiple locations?',
        answer: 'Yes. Set up location-specific geo-fenced perimeters for dozens of job sites, branches, retail stores, or production facilities with centralized reporting.',
        tags: ['locations', 'branches', 'geo-fence']
      }
    ]
  },
  {
    id: 'leave-management',
    title: 'Leave Management',
    shortDescription: 'Online leave requests, automated accruals, holiday calendars & balance tracking.',
    iconName: 'CalendarCheck',
    questions: [
      {
        id: 'lm-1',
        question: 'Can employees request leave online?',
        answer: 'Yes. Employees can view available balances in real time, check team calendar conflicts, attach medical or travel documentation, and submit leave requests directly from web or mobile.',
        tags: ['leave request', 'self-service', 'online']
      },
      {
        id: 'lm-2',
        question: 'Can managers approve leave requests?',
        answer: 'Yes. Managers receive instant notifications via email and mobile push with 1-click approvals, conflict warnings (showing which team members are already away), and delegation tools.',
        tags: ['leave approval', 'managers', 'workflows']
      },
      {
        id: 'lm-3',
        question: 'Can I create different leave types?',
        answer: 'NextSoftHR supports limitless leave types: Annual Vacation, Sick Leave, Maternity/Paternity, Bereavement, Study/Exam Leave, Compensatory Off, Sabbatical, and Unpaid Leave.',
        tags: ['leave types', 'annual', 'sick', 'maternity']
      },
      {
        id: 'lm-4',
        question: 'Can leave balances be calculated automatically?',
        answer: 'Yes. The system automatically computes monthly or annual accruals, carry-over limits, forfeiture dates, proration for mid-year joiners, and tenure-based balance increments.',
        tags: ['accruals', 'calculations', 'carry-over']
      },
      {
        id: 'lm-5',
        question: 'Can employees view their leave balances?',
        answer: 'Employees have transparent, 24/7 visibility into accrued days, taken days, pending requests, and upcoming expiration deadlines on their dashboard.',
        tags: ['balances', 'transparency', 'ess']
      },
      {
        id: 'lm-6',
        question: 'Can I configure leave approval workflows?',
        answer: 'Yes. Configure single-step or multi-level approval hierarchies (e.g., Direct Manager → Department Head → HR Operations) with automated reminders and escalation timeouts.',
        tags: ['workflows', 'approval chains', 'escalation']
      },
      {
        id: 'lm-7',
        question: 'Can leave information integrate with payroll?',
        answer: 'Yes. Approved unpaid leaves automatically adjust gross pay in the corresponding payroll run, and leave encashment calculations sync automatically upon termination or year-end processing.',
        tags: ['payroll integration', 'deductions', 'encashment']
      },
      {
        id: 'lm-8',
        question: 'Can I manage public holidays?',
        answer: 'Yes. Maintain national, regional, and religious holiday calendars for each country and branch location. Public holidays automatically block workdays without deducting from annual leave balances.',
        tags: ['public holidays', 'calendars', 'localization']
      },
      {
        id: 'lm-9',
        question: 'Can I manage different leave policies for different employee groups?',
        answer: 'Yes. Assign distinct leave policies based on contract type (permanent vs. contract), seniority, executive grade, department, or geographic location.',
        tags: ['policies', 'employee groups', 'customization']
      }
    ]
  },
  {
    id: 'recruitment-talent',
    title: 'Recruitment & Talent',
    shortDescription: 'Applicant tracking, job openings, pipeline management & collaborative hiring.',
    iconName: 'UserCheck',
    questions: [
      {
        id: 'rt-1',
        question: 'Does NextSoftHR include recruitment management?',
        answer: 'Yes. NextSoftHR includes an integrated Applicant Tracking System (ATS) that handles job postings, candidate pipelines, interview scheduling, scorecard evaluations, and digital offer letters.',
        tags: ['recruitment', 'ats', 'talent']
      },
      {
        id: 'rt-2',
        question: 'Can I create job vacancies?',
        answer: 'Yes. HR can publish job listings with structured role requirements, salary ranges, department assignments, and embeddable application forms for your company career site.',
        tags: ['job vacancies', 'career portal', 'postings']
      },
      {
        id: 'rt-3',
        question: 'Can I manage candidates?',
        answer: 'Candidate profiles store resumes, portfolio links, screening answers, interview notes, email conversations, and team ratings in an easy-to-search central database.',
        tags: ['candidates', 'resumes', 'profiles']
      },
      {
        id: 'rt-4',
        question: 'Can I track applicants through recruitment stages?',
        answer: 'Yes. Use a visual Kanban recruitment pipeline to move applicants through stages: Sourced, Screening, Interview 1, Technical Assessment, Final Interview, Offer Sent, and Hired.',
        tags: ['pipeline', 'kanban', 'stages']
      },
      {
        id: 'rt-5',
        question: 'Can I schedule interviews?',
        answer: 'Yes. Integrate with Google Calendar and Microsoft Outlook to invite candidates, coordinate panel interviewer availability, and send video conference links (Google Meet, Zoom, Teams) automatically.',
        tags: ['interviews', 'calendar', 'scheduling']
      },
      {
        id: 'rt-6',
        question: 'Can recruitment teams collaborate on candidates?',
        answer: 'Hiring managers and panel interviewers can submit standardized feedback scorecards, share private notes, tag teammates, and vote on hiring decisions collaboratively.',
        tags: ['collaboration', 'scorecards', 'evaluations']
      },
      {
        id: 'rt-7',
        question: 'Can I maintain a talent pool?',
        answer: 'Yes. Archive promising candidates into categorized talent communities (e.g. Senior Engineers, Sales Leads, Operations) to quickly source for future vacancies.',
        tags: ['talent pool', 'database', 'sourcing']
      },
      {
        id: 'rt-8',
        question: 'Can I automate recruitment workflows?',
        answer: 'Automate candidate rejection emails, interview reminder notifications, status update SMS messages, and document collection workflows to deliver an exceptional applicant experience.',
        tags: ['automation', 'email triggers', 'workflows']
      },
      {
        id: 'rt-9',
        question: 'Can employees or managers participate in recruitment approvals?',
        answer: 'Yes. Department managers can initiate job requisitions, review candidate shortlists, approve offer terms, and collaborate seamlessly with HR recruiters.',
        tags: ['approvals', 'requisitions', 'hiring manager']
      }
    ]
  },
  {
    id: 'self-service',
    title: 'Employee & Manager Self-Service',
    shortDescription: 'Mobile app, personal profiles, leave requests, payslip access & approvals.',
    iconName: 'Smartphone',
    questions: [
      {
        id: 'ss-1',
        question: 'What is employee self-service?',
        answer: 'Employee Self-Service (ESS) empowers workers to independently handle daily HR activities—such as viewing payslips, requesting leaves, clocking in, updating contact details, and viewing team directories—without administrative back-and-forth.',
        tags: ['ess', 'self-service', 'empowerment']
      },
      {
        id: 'ss-2',
        question: 'What can employees access through self-service?',
        answer: 'Employees can access historical payslips, tax certificates, leave balances and requests, company policies, time and shift records, expense reimbursements, training materials, and company announcements.',
        tags: ['access', 'features', 'portal']
      },
      {
        id: 'ss-3',
        question: 'Can employees update their personal information?',
        answer: 'Yes. Staff can update addresses, emergency contacts, profile photos, and bank accounts, with optional HR verification workflows for sensitive modifications.',
        tags: ['personal details', 'profile', 'updates']
      },
      {
        id: 'ss-4',
        question: 'Can employees view payslips?',
        answer: 'Yes. Employees can view, download, and print current and past monthly payslips in secure, printable PDF format 24/7 on web or mobile.',
        tags: ['payslips', 'salary', 'downloads']
      },
      {
        id: 'ss-5',
        question: 'Can employees submit leave requests?',
        answer: 'Yes. Staff can select leave dates, check team vacation calendars, upload supporting documents (e.g., doctor’s notes), and track manager approval statuses in real time.',
        tags: ['leave submission', 'time off', 'requests']
      },
      {
        id: 'ss-6',
        question: 'Can employees view attendance information?',
        answer: 'Employees can view their punch history, total monthly worked hours, tracked overtime, shift assignments, and lateness records directly on their mobile or web dashboard.',
        tags: ['attendance logs', 'timesheets', 'punches']
      },
      {
        id: 'ss-7',
        question: 'Can managers approve employee requests?',
        answer: 'Yes. With Manager Self-Service (MSS), leaders receive consolidated action queues to approve leaves, overtime, expense claims, and shift swap requests with a single tap.',
        tags: ['mss', 'manager approvals', 'mobile']
      },
      {
        id: 'ss-8',
        question: 'Can managers access team information?',
        answer: 'Supervisors can view direct reports’ contact info, skills, project allocations, probation statuses, appraisal histories, and upcoming milestone dates.',
        tags: ['team directory', 'team management', 'insights']
      },
      {
        id: 'ss-9',
        question: 'Can managers view attendance and leave data?',
        answer: 'Managers have a consolidated team view showing who is in the office, who is working remotely, who is on leave, and who is scheduled for upcoming shifts.',
        tags: ['team calendar', 'shift coverage', 'visibility']
      },
      {
        id: 'ss-10',
        question: 'Is self-service available on mobile devices?',
        answer: 'Yes. NextSoftHR provides native, high-performance mobile apps for iOS and Android as well as an ultra-responsive progressive web interface for tablets and smartphones.',
        tags: ['ios', 'android', 'mobile app', 'pwa']
      }
    ]
  },
  {
    id: 'ai-assistant',
    title: 'AI HR Assistant',
    shortDescription: 'Intelligent workforce insights, policy Q&A, payroll assistance & analytics.',
    iconName: 'Sparkles',
    badge: 'Intelligent HR',
    ctaText: 'Ask NextSoftHR AI',
    ctaAction: 'ai',
    questions: [
      {
        id: 'ai-1',
        question: 'What is the NextSoftHR AI Assistant?',
        answer: 'The NextSoftHR AI Assistant is an intelligent corporate copilot built directly into the NextSoftHR ecosystem. It assists HR teams, finance directors, managers, and employees by providing instantaneous answers to policy queries, explaining payroll breakdowns, drafting job descriptions, summarizing workforce metrics, and flagging attendance anomalies.',
        highlight: true,
        tags: ['ai assistant', 'copilot', 'overview']
      },
      {
        id: 'ai-2',
        question: 'How can AI help HR teams?',
        answer: 'AI automates repetitive inquiries (reducing HR ticket volume by up to 60%), drafts employment letters and policy documents, summarizes employee review feedback, highlights retention risks, and accelerates applicant screening.',
        highlight: true,
        tags: ['hr efficiency', 'automation', 'productivity']
      },
      {
        id: 'ai-3',
        question: 'Can employees ask HR-related questions using AI?',
        answer: 'Yes. Employees can ask natural-language questions such as "How many annual leave days do I have left?", "Explain my pension deduction this month", or "What is our company bereavement policy?", getting instant, verified answers 24/7.',
        highlight: true,
        tags: ['employee query', 'policy answers', 'conversational']
      },
      {
        id: 'ai-4',
        question: 'Can managers use the AI assistant?',
        answer: 'Yes. Managers can ask the AI to draft performance review summaries, analyze team overtime trends, check shift coverage gaps, and generate meeting talking points based on team KPIs.',
        tags: ['manager copilot', 'insights', 'team leadership']
      },
      {
        id: 'ai-5',
        question: 'Can AI help explain HR policies?',
        answer: 'The AI assistant indexes your organization’s uploaded handbook and standard operating procedures to provide clear, citation-backed answers to employee questions in plain language.',
        tags: ['policy explanation', 'handbook', 'sop']
      },
      {
        id: 'ai-6',
        question: 'Can AI assist with payroll questions?',
        answer: 'Yes. The assistant can break down complex payslips, explaining net pay calculations, statutory tax bracket steps, health insurance contributions, and overtime rate formulas to employees with zero math confusion.',
        tags: ['payroll explanations', 'payslip breakdown', 'taxes']
      },
      {
        id: 'ai-7',
        question: 'Can AI help HR teams find employee information?',
        answer: 'Authorized administrators can use natural language search—such as "Show all certified accountants in the Lagos branch" or "List staff with work permits expiring within 60 days"—to retrieve instant structured dossiers.',
        tags: ['semantic search', 'employee lookup', 'records']
      },
      {
        id: 'ai-8',
        question: 'Can AI generate HR insights and summaries?',
        answer: 'Yes. NextSoftHR AI synthesizes organization-wide attendance trends, attrition velocity, headcount expansion rates, and gender diversity metrics into executive board-ready narrative summaries.',
        tags: ['analytics', 'insights', 'executive reports']
      },
      {
        id: 'ai-9',
        question: 'Can AI assist with recruitment?',
        answer: 'AI can generate tailored job specifications from role titles, produce candidate screening rubrics, summarize extensive applicant CVs, and draft interview evaluation questions.',
        tags: ['recruitment ai', 'job specs', 'screening']
      },
      {
        id: 'ai-10',
        question: 'Can AI help analyze workforce data?',
        answer: 'Yes. It analyzes historical flight risk signals, absenteeism patterns across departments, and compensation parity across equivalent roles to guide strategic decision-making.',
        tags: ['workforce analytics', 'attrition', 'flight risk']
      },
      {
        id: 'ai-11',
        question: 'Is access to AI controlled by user permissions?',
        answer: 'Strictly. The AI strictly respects role-based permissions (RBAC). An individual employee can only query their own data and public company policies; they can never access confidential peer salaries or company-wide executive records.',
        tags: ['permissions', 'rbac', 'privacy']
      },
      {
        id: 'ai-12',
        question: 'How does NextSoftHR protect data used by AI features?',
        answer: 'Customer data is processed inside isolated private tenant boundaries. NextSoftHR never uses client proprietary employee data, salaries, or personally identifiable information (PII) to train public foundation models.',
        tags: ['security', 'tenant isolation', 'no model training']
      }
    ]
  },
  {
    id: 'business-management',
    title: 'Business Management',
    shortDescription: 'CRM, project & task tracking, team workflows & multi-department synergy.',
    iconName: 'Briefcase',
    questions: [
      {
        id: 'bm-1',
        question: 'Does NextSoftHR include business management features?',
        answer: 'Yes. NextSoftHR unites HR operations with daily business execution, providing built-in CRM client tracking, task and project management, team document spaces, and company-wide workflow automation.',
        tags: ['business management', 'all-in-one', 'operations']
      },
      {
        id: 'bm-2',
        question: 'Does NextSoftHR include CRM functionality?',
        answer: 'Yes. Organizations can track customer accounts, manage sales pipelines, assign client account managers, store contracts, and log client communication histories alongside employee records.',
        tags: ['crm', 'clients', 'sales pipeline']
      },
      {
        id: 'bm-3',
        question: 'Can I manage projects and tasks?',
        answer: 'Teams can organize deliverables using Kanban boards, Gantt charts, and sprint lists with task dependencies, priority tags, subtask checklists, and file attachments.',
        tags: ['projects', 'tasks', 'kanban']
      },
      {
        id: 'bm-4',
        question: 'Can teams collaborate inside the platform?',
        answer: 'Yes. Employees can comment on tasks, tag colleagues with @mentions, share project files, publish team bulletins, and align on deliverables without switching to external tools.',
        tags: ['collaboration', 'teamwork', 'comments']
      },
      {
        id: 'bm-5',
        question: 'Can I manage business workflows?',
        answer: 'NextSoftHR includes a visual workflow engine for purchase requisitions, travel authorizations, asset handovers, contract approvals, and internal service requests with custom sign-off steps.',
        tags: ['workflows', 'approvals', 'processes']
      },
      {
        id: 'bm-6',
        question: 'Can I assign tasks to employees?',
        answer: 'Managers can assign tasks to individual contributors or cross-functional squads with automated deadline reminders, progress meters, and priority tags.',
        tags: ['task assignment', 'deadlines', 'accountability']
      },
      {
        id: 'bm-7',
        question: 'Can managers track team activities?',
        answer: 'Supervisors have access to project burndown charts, task completion ratios, resource allocation heatmaps, and team velocity metrics.',
        tags: ['activity tracking', 'manager oversight', 'productivity']
      },
      {
        id: 'bm-8',
        question: 'Can I manage multiple departments and business units?',
        answer: 'Yes. Configure distinct cost centers, operational divisions, product lines, and business units with independent project workspaces and consolidated roll-up reporting.',
        tags: ['departments', 'business units', 'cost centers']
      },
      {
        id: 'bm-9',
        question: 'Can HR and business data work together?',
        answer: 'Seamlessly. Employee availability from leave and shift records automatically informs project task scheduling, preventing deadlines from being assigned to staff who are out of the office.',
        tags: ['synergy', 'resource management', 'scheduling']
      }
    ]
  },
  {
    id: 'security-compliance',
    title: 'Security & Compliance',
    shortDescription: 'Enterprise encryption, SOC2/ISO readiness, role-based access & audit logs.',
    iconName: 'ShieldCheck',
    questions: [
      {
        id: 'sc-1',
        question: 'How secure is NextSoftHR?',
        answer: 'NextSoftHR enforces bank-grade security protocols: AES-256 encryption at rest, TLS 1.3 encryption in transit, multi-factor authentication (MFA), regular penetration audits, and SOC 2 Type II compliance architectures.',
        tags: ['security', 'encryption', 'tls', 'mfa']
      },
      {
        id: 'sc-2',
        question: 'How is employee information protected?',
        answer: 'All personally identifiable information (PII) and banking credentials are stored in compartmentalized databases with strict encryption and data tokenization. Access is governed by least-privilege principles.',
        tags: ['pii', 'data protection', 'privacy']
      },
      {
        id: 'sc-3',
        question: 'Can administrators control user permissions?',
        answer: 'Yes. Administrators can define granular permissions down to specific fields (e.g., allow a manager to see an employee’s phone number, but mask their base salary and home address).',
        tags: ['permissions', 'field-level security', 'admin']
      },
      {
        id: 'sc-4',
        question: 'Does NextSoftHR support role-based access?',
        answer: 'Yes. The system comes with pre-configured roles (Super Admin, HR Director, Payroll Officer, Team Lead, Employee) and allows creation of custom roles with bespoke read/write privileges.',
        tags: ['rbac', 'roles', 'access control']
      },
      {
        id: 'sc-5',
        question: 'Can I control access to payroll information?',
        answer: 'Payroll records are strictly isolated. Only credentialed payroll administrators and authorized executive approvers can view compensation structures and disburse salaries.',
        tags: ['payroll security', 'compensation isolation', 'confidentiality']
      },
      {
        id: 'sc-6',
        question: 'Are employee activities logged?',
        answer: 'NextSoftHR maintains an immutable audit trail recording every user login, record modification, data export, salary change, and approval action with IP addresses and timestamps.',
        tags: ['audit trail', 'logs', 'compliance']
      },
      {
        id: 'sc-7',
        question: 'How are backups handled?',
        answer: 'Automated encrypted snapshot backups are performed every hour across geographically redundant data centers, offering 99.99% availability and instant point-in-time disaster recovery.',
        tags: ['backups', 'redundancy', 'disaster recovery']
      },
      {
        id: 'sc-8',
        question: 'Does NextSoftHR support organizational compliance requirements?',
        answer: 'Yes. The platform supports GDPR, NDPR (Nigeria Data Protection Regulation), POPIA (South Africa), and local labor laws, including automated retention schedules and right-to-be-forgotten requests.',
        tags: ['gdpr', 'ndpr', 'popia', 'labor compliance']
      },
      {
        id: 'sc-9',
        question: 'Can different users have different access levels?',
        answer: 'Yes. Custom security profiles ensure that interns, full-time staff, external contractors, line managers, and executive leadership see only the information necessary for their specific roles.',
        tags: ['user levels', 'privileges', 'custom roles']
      },
      {
        id: 'sc-10',
        question: 'How does NextSoftHR protect sensitive payroll information?',
        answer: 'Payroll numbers are shielded behind secondary authentication gates, column-level masking, automated session timeouts, and restricted file download permissions.',
        tags: ['payroll protection', 'masking', 'data shielding']
      }
    ]
  },
  {
    id: 'integrations',
    title: 'Integrations',
    shortDescription: 'ERP, accounting software, biometric hardware, payment gateways & REST APIs.',
    iconName: 'Blocks',
    questions: [
      {
        id: 'int-1',
        question: 'Can NextSoftHR integrate with other business applications?',
        answer: 'Yes. NextSoftHR features an open integration hub with plug-and-play connectors for leading ERPs, accounting systems, biometric clocks, email suites, and cloud payment gateways.',
        tags: ['integrations', 'ecosystem', 'connectors']
      },
      {
        id: 'int-2',
        question: 'Can I connect payment systems?',
        answer: 'NextSoftHR integrates with international and regional payment rails (Flutterwave, Paystack, Stripe, Direct Bank ACH, SEPA, and SWIFT) for automated direct salary disbursement.',
        tags: ['payment gateways', 'salary disbursement', 'banking']
      },
      {
        id: 'int-3',
        question: 'Can NextSoftHR integrate with accounting systems?',
        answer: 'Yes. Automated general ledger mapping connects with QuickBooks, Xero, Sage, SAP, Microsoft Dynamics 365, and Zoho Books to post monthly payroll journal entries automatically.',
        tags: ['accounting', 'quickbooks', 'xero', 'sage']
      },
      {
        id: 'int-4',
        question: 'Can I integrate attendance devices?',
        answer: 'We support direct hardware integration with ZKTeco, Anviz, Suprema, and other biometric fingerprint, facial recognition, and RFID card scanners via local network sync or cloud API.',
        tags: ['biometric devices', 'zkteco', 'hardware']
      },
      {
        id: 'int-5',
        question: 'Can I connect third-party applications?',
        answer: 'Yes. Connect with communication tools like Slack, Microsoft Teams, and WhatsApp for leave request alerts, anniversary reminders, and team notifications.',
        tags: ['slack', 'teams', 'whatsapp', 'third-party']
      },
      {
        id: 'int-6',
        question: 'Does NextSoftHR provide APIs?',
        answer: 'NextSoftHR provides a comprehensive, documented RESTful API with webhooks, OAuth 2.0 authentication, and high-throughput endpoints for custom internal tool integration.',
        tags: ['rest api', 'webhooks', 'developer']
      },
      {
        id: 'int-7',
        question: 'Can I integrate payroll with other business systems?',
        answer: 'Yes. Link payroll data with your project costing software, CRM sales commissions, and ERP expense claims for consolidated financial reconciliation.',
        tags: ['payroll integration', 'costing', 'erp']
      },
      {
        id: 'int-8',
        question: 'Can I import and export business data?',
        answer: 'You have full data ownership. Export all reports, employee dossiers, audit logs, and transaction tables in XLSX, CSV, JSON, and PDF formats anytime.',
        tags: ['import export', 'data ownership', 'csv']
      }
    ]
  },
  {
    id: 'pricing-plans',
    title: 'Pricing & Plans',
    shortDescription: 'Transparent tiered subscription plans, per-user pricing & enterprise volume discounts.',
    iconName: 'BadgeDollarSign',
    ctaText: 'View NextSoftHR Pricing',
    ctaAction: 'pricing',
    questions: [
      {
        id: 'pr-1',
        question: 'How much does NextSoftHR cost?',
        answer: 'NextSoftHR offers simple, transparent per-employee per-month (PEPM) pricing with no hidden setup costs. Plans start at $2.50 per employee/month for Starter, $4.50 for Growth, and custom volume pricing for Enterprise organizations.',
        tags: ['pricing', 'pepm', 'cost']
      },
      {
        id: 'pr-2',
        question: 'Does NextSoftHR offer different plans?',
        answer: 'Yes. We offer four distinct tiers: Starter (for micro/small teams needing Core HR and essential payroll), Growth (adding attendance, leave, and ATS), Scale (including AI Assistant, advanced analytics, and CRM), and Enterprise (custom multi-entity, SSO, dedicated SLA).',
        tags: ['plans', 'tiers', 'packages']
      },
      {
        id: 'pr-3',
        question: 'Is there a free trial?',
        answer: 'Yes! We provide a 14-day fully-featured free trial with no credit card required. You can test live employee records, payroll calculation simulations, and mobile app features immediately.',
        tags: ['free trial', '14 days', 'no credit card']
      },
      {
        id: 'pr-4',
        question: 'Can I upgrade my plan?',
        answer: 'You can upgrade your subscription at any time from your administrator billing settings. New features unlock immediately with prorated billing.',
        tags: ['upgrade', 'scaling', 'billing']
      },
      {
        id: 'pr-5',
        question: 'Can I downgrade my plan?',
        answer: 'Yes. You can downgrade or adjust your plan tier at the end of your current monthly or annual billing cycle with zero penalty fees.',
        tags: ['downgrade', 'flexibility', 'contracts']
      },
      {
        id: 'pr-6',
        question: 'Are payroll features included in all plans?',
        answer: 'Core statutory payroll calculations and payslip generation are available from the Starter tier onward, with advanced multi-branch and dual-currency payroll available in Growth and Enterprise tiers.',
        tags: ['payroll inclusion', 'plans', 'features']
      },
      {
        id: 'pr-7',
        question: 'Are HR features included in all plans?',
        answer: 'Yes. Core HR (employee database, digital document storage, organizational charts, and company policy distribution) is included across all subscription plans.',
        tags: ['core hr', 'included features', 'all plans']
      },
      {
        id: 'pr-8',
        question: 'Is AI included in NextSoftHR plans?',
        answer: 'Standard AI Assistant queries are included in Scale and Enterprise plans. Starter and Growth plans can activate the AI Assistant as an affordable per-seat add-on.',
        tags: ['ai pricing', 'add-on', 'included']
      },
      {
        id: 'pr-9',
        question: 'Are there additional charges for extra employees?',
        answer: 'Your subscription automatically adjusts based on active employee headcount. When you onboard new staff, they are simply billed at your plan’s standard per-employee rate.',
        tags: ['headcount', 'scaling', 'billing']
      },
      {
        id: 'pr-10',
        question: 'Do you offer enterprise pricing?',
        answer: 'Yes. For organizations with over 250 employees, we provide custom volume discounts, bespoke migration services, tailored SLAs, and dedicated customer success managers.',
        tags: ['enterprise pricing', 'discounts', 'volume']
      },
      {
        id: 'pr-11',
        question: 'Do you offer custom plans for large organizations?',
        answer: 'Yes. We construct custom hybrid packages combining software modules with managed payroll and HR outsourcing services for multinational enterprises.',
        tags: ['custom plans', 'hybrid', 'multinational']
      }
    ]
  },
  {
    id: 'implementation-support',
    title: 'Implementation & Support',
    shortDescription: 'Data onboarding, staff training, 24/7 technical support & dedicated managers.',
    iconName: 'Headphones',
    ctaText: 'Talk to Our Support Team',
    ctaAction: 'support',
    questions: [
      {
        id: 'is-1',
        question: 'How long does implementation take?',
        answer: 'Self-serve setup for small teams takes under 48 hours. Enterprise deployments with custom statutory rules, biometric sync, and data cleansing typically conclude within 2 to 3 weeks.',
        tags: ['timeline', 'implementation', 'onboarding']
      },
      {
        id: 'is-2',
        question: 'Do you provide onboarding assistance?',
        answer: 'Yes. Every client is assigned a dedicated Implementation Specialist who assists with organizational configuration, data auditing, and test payroll parallel runs.',
        tags: ['onboarding', 'assistance', 'specialist']
      },
      {
        id: 'is-3',
        question: 'Can NextSoftHR migrate existing employee data?',
        answer: 'Our migration team handles historical records, compensation profiles, open leave balances, and tax histories from legacy spreadsheets or legacy HR software with zero data loss.',
        tags: ['data migration', 'spreadsheet import', 'transition']
      },
      {
        id: 'is-4',
        question: 'Is training available?',
        answer: 'We provide comprehensive live video training sessions for HR administrators, payroll managers, department heads, and employees, backed by our on-demand NextSoftHR Academy video portal.',
        tags: ['training', 'webinars', 'academy']
      },
      {
        id: 'is-5',
        question: 'Do you provide customer support?',
        answer: 'Yes. Our global support team provides round-the-clock live chat, email assistance, and phone support with average response times of under 5 minutes.',
        tags: ['customer support', '24/7', 'live chat']
      },
      {
        id: 'is-6',
        question: 'Can I contact support from inside the platform?',
        answer: 'Yes. An integrated in-app Help Widget allows you to chat live with human support agents, search knowledge articles, or submit support tickets directly from any page.',
        tags: ['in-app support', 'help widget', 'ticketing']
      },
      {
        id: 'is-7',
        question: 'Do you provide implementation services?',
        answer: 'Yes. We offer white-glove implementation services for organizations needing complex custom workflows, multi-company consolidation, or tailored API development.',
        tags: ['white glove', 'implementation services', 'custom']
      },
      {
        id: 'is-8',
        question: 'Can you help configure payroll?',
        answer: 'Our certified payroll consultants work with your finance team to set up exact salary allowances, tax bands, pension rates, and custom deduction formulas.',
        tags: ['payroll setup', 'consulting', 'statutory']
      },
      {
        id: 'is-9',
        question: 'Can you help configure HR workflows?',
        answer: 'Yes. We configure customized approval chains for leaves, performance reviews, travel requisitions, and recruitment approvals to mirror your internal governance.',
        tags: ['workflow configuration', 'approval matrix', 'governance']
      },
      {
        id: 'is-10',
        question: 'Is technical support available internationally?',
        answer: 'Yes. We maintain multi-lingual support teams spanning time zones in Africa, Europe, North America, and Asia, ensuring prompt assistance wherever you operate.',
        tags: ['international support', 'time zones', 'global']
      }
    ]
  },
  {
    id: 'outsourcing-services',
    title: 'Outsourcing Services',
    shortDescription: 'Managed payroll processing, HR compliance, statutory remittances & consulting.',
    iconName: 'Building2',
    ctaText: 'Request an Outsourcing Consultation',
    ctaAction: 'outsourcing',
    questions: [
      {
        id: 'os-1',
        question: 'Does NextSoftHR offer HR outsourcing?',
        answer: 'Yes. NextSoftHR provides comprehensive HR Outsourcing (HRO) services. Our team of certified HR practitioners can manage employee relations, policy formulation, disciplinary procedures, performance appraisals, and regulatory compliance on your behalf.',
        tags: ['hr outsourcing', 'hro', 'managed hr']
      },
      {
        id: 'os-2',
        question: 'Does NextSoftHR offer payroll outsourcing?',
        answer: 'Yes. Our Managed Payroll Outsourcing service takes total responsibility for monthly payroll computations, statutory tax filings, bank disbursement scheduling, pension compliance, and payslip distribution.',
        tags: ['payroll outsourcing', 'managed payroll', 'disbursements']
      },
      {
        id: 'os-3',
        question: 'Can you manage payroll processing on behalf of businesses?',
        answer: 'Yes. You simply send us monthly variable inputs (overtime, bonuses, new hires, exits), and our payroll experts verify numbers, calculate withholdings, generate audit reports, and execute disbursement.',
        tags: ['full management', 'hands-off payroll', 'compliance']
      },
      {
        id: 'os-4',
        question: 'Can you support outsourced HR administration?',
        answer: 'Our HR specialists handle employee record audits, contract drafting, health insurance enrollments, regulatory labor filings, and employee query resolution.',
        tags: ['hr administration', 'benefits', 'compliance']
      },
      {
        id: 'os-5',
        question: 'Can businesses combine HR software with outsourcing services?',
        answer: 'Yes! This hybrid model is one of NextSoftHR’s most popular offerings. Your team enjoys our self-service mobile app and attendance tracking, while our experts manage the complex backend payroll and compliance.',
        tags: ['hybrid', 'software plus services', 'managed platform']
      },
      {
        id: 'os-6',
        question: 'Can outsourcing be customized?',
        answer: 'Every outsourcing package is modular. You can outsource only payroll, only regulatory statutory filings, or complete end-to-end HR and recruitment operations.',
        tags: ['customizable', 'modular', 'tailored']
      },
      {
        id: 'os-7',
        question: 'Can NextSoftHR support businesses with multiple locations?',
        answer: 'Yes. We support multi-branch and cross-border businesses, ensuring unified compliance across diverse federal, state, and provincial tax jurisdictions.',
        tags: ['multi-location', 'cross-border', 'multi-state']
      },
      {
        id: 'os-8',
        question: 'How do I request an outsourcing consultation?',
        answer: 'Click "Request an Outsourcing Consultation" to connect directly with a senior HR & payroll advisor who will evaluate your workforce needs and prepare a custom proposal.',
        tags: ['consultation', 'advisory', 'quote']
      }
    ]
  }
];

export const POPULAR_SEARCH_TERMS = [
  'How does payroll work?',
  'Can I manage multiple companies?',
  'Does NextSoftHR support employee self-service?',
  'AI Assistant',
  'Statutory tax deductions',
  'Mobile attendance & GPS'
];

export const INTEGRATION_PARTNERS = [
  { name: 'QuickBooks', category: 'Accounting', icon: 'FileSpreadsheet' },
  { name: 'Xero', category: 'Accounting', icon: 'Calculator' },
  { name: 'Sage', category: 'ERP & Finance', icon: 'Briefcase' },
  { name: 'ZKTeco', category: 'Biometrics', icon: 'Fingerprint' },
  { name: 'Slack', category: 'Collaboration', icon: 'MessageSquare' },
  { name: 'Microsoft 365', category: 'Enterprise Suite', icon: 'Layers' },
  { name: 'Google Workspace', category: 'Calendar & Mail', icon: 'Mail' },
  { name: 'Paystack', category: 'Payments', icon: 'CreditCard' },
  { name: 'Flutterwave', category: 'Payments', icon: 'Wallet' },
  { name: 'Stripe', category: 'Global Billing', icon: 'DollarSign' }
];
