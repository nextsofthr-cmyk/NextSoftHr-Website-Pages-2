import { Partner } from '../types';

export const INITIAL_PARTNERS: Partner[] = [
  {
    id: 'prt-01',
    companyName: 'NextHR Solutions Ltd',
    tagline: 'Premier HR transformation & enterprise payroll systems across West Africa',
    logo: 'https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=160&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&auto=format&fit=crop&q=80',
    description: 'NextHR Solutions is an enterprise HR technology consultancy headquartered in Victoria Island, Lagos. We specialize in end-to-end NextSofthr rollouts, automated payroll compliance with Nigerian tax regulations (PAYE, Pension, NHF, NSITF), shift management for manufacturing plants, and employee self-service migration.',
    country: 'Nigeria',
    countryCode: 'NG',
    city: 'Lagos',
    address: 'Plot 14 Admiralty Way, Lekki Phase 1, Lagos, Nigeria',
    latitude: 6.4474,
    longitude: 3.4735,
    website: 'https://www.nexthrsolutions.example.ng',
    email: 'info@nexthrsolutions.example.ng',
    phone: '+234 803 245 8890',
    partnerType: 'Implementation Partner',
    partnerLevel: 'Strategic Partner',
    isVerified: true,
    isFeatured: true,
    services: [
      'HR Implementation',
      'Payroll Implementation',
      'Employee Training',
      'Data Migration',
      'System Integration',
      'Compliance Support',
      'HR Consulting'
    ],
    industries: [
      'Manufacturing',
      'Financial Services',
      'Retail',
      'Logistics',
      'Hospitality'
    ],
    businessSizesServed: ['Medium Business', 'Large Enterprise', 'Multinational'],
    countriesServed: ['Nigeria', 'Ghana', 'Benin', 'United Kingdom'],
    languages: ['English', 'Yoruba', 'French'],
    yearsExperience: 10,
    numberOfImplementations: 48,
    clientCount: 65,
    certifications: [
      'NextSofthr Certified Enterprise Master',
      'CIPM Certified HR Practitioner',
      'ISO 27001 Data Security Certified'
    ],
    caseStudies: [
      {
        title: 'Automated 1,800-Staff Payroll for Flour Mills Group',
        clientName: 'Premier Mills PLC',
        industry: 'Manufacturing',
        country: 'Nigeria',
        challenge: 'Manual spreadsheets caused 4-day payroll processing cycles, calculation discrepancies, and delayed statutory tax remittances.',
        solution: 'Implemented NextSofthr Multi-Branch Payroll with biometric time-clock integration and direct bank portal connectivity.',
        result: 'Payroll run reduced from 4 days to 45 minutes with 100% tax and pension compliance accuracy.',
        metric: '92% processing time saved'
      }
    ],
    testimonials: [
      {
        quote: 'NextHR Solutions transitioned our 1,200 staff across 4 factories to NextSofthr in under six weeks. Flawless execution and superb local support.',
        author: 'Babajide Alabi',
        role: 'VP People & Culture',
        company: 'Apex FMCG Nigeria'
      }
    ],
    registrationDate: '2023-01-15',
    rating: 4.9,
    reviewCount: 38
  },
  {
    id: 'prt-02',
    companyName: 'AfriPay Systems Consulting',
    tagline: 'East Africa’s foremost automated payroll & statutory compliance experts',
    logo: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=160&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&auto=format&fit=crop&q=80',
    description: 'Based in Westlands, Nairobi, AfriPay Systems provides specialized NextSofthr payroll implementation, KRA iTax integration, NSSF/NHIF statutory compliance, and shift rostering for agricultural estates, tech companies, and retail chains across Kenya and East Africa.',
    country: 'Kenya',
    countryCode: 'KE',
    city: 'Nairobi',
    address: 'The Promenade, General Mathenge Drive, Westlands, Nairobi',
    latitude: -1.2587,
    longitude: 36.8041,
    website: 'https://www.afripayconsulting.example.ke',
    email: 'hello@afripayconsulting.example.ke',
    phone: '+254 722 984 112',
    partnerType: 'Payroll Specialist',
    partnerLevel: 'Premium Partner',
    isVerified: true,
    isFeatured: true,
    services: [
      'Payroll Implementation',
      'Payroll Consulting',
      'Compliance Support',
      'Data Migration',
      'Technical Support',
      'Employee Training'
    ],
    industries: [
      'Agriculture',
      'Technology',
      'Retail',
      'Healthcare',
      'NGOs'
    ],
    businessSizesServed: ['Small Business', 'Medium Business', 'Large Enterprise'],
    countriesServed: ['Kenya', 'Uganda', 'Tanzania', 'Rwanda'],
    languages: ['English', 'Swahili'],
    yearsExperience: 8,
    numberOfImplementations: 39,
    clientCount: 52,
    certifications: [
      'NextSofthr Certified Payroll Architect',
      'ICPAK Certified Accountant Partner'
    ],
    caseStudies: [
      {
        title: '3,200 Seasonal Worker Shift & Payroll Automation',
        clientName: 'Rift Horticultural Exports',
        industry: 'Agriculture',
        country: 'Kenya',
        challenge: 'Seasonal turnover and variable piece-rate wage calculation led to frequent wage disputes and union grievances.',
        solution: 'Deployed NextSofthr Shift & Scheduling with QR badge mobile check-in and automated piece-rate payroll calculator.',
        result: 'Zero payroll computation errors and cut biometric verification queue times by 75%.',
        metric: '75% faster check-in speed'
      }
    ],
    testimonials: [
      {
        quote: 'AfriPay solved our cross-border tax challenges between our Kenya, Uganda, and Rwanda offices inside NextSofthr within a single month.',
        author: 'Wanjiru Mwangi',
        role: 'Chief Financial Officer',
        company: 'Kilima AgroTech'
      }
    ],
    registrationDate: '2023-03-22',
    rating: 4.9,
    reviewCount: 29
  },
  {
    id: 'prt-03',
    companyName: 'Accra People & Tech Advisory',
    tagline: 'Strategic HR consulting & modern workplace digital transformation',
    logo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=160&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=1200&auto=format&fit=crop&q=80',
    description: 'Accra People & Tech Advisory is Ghana’s leading HR technology consulting boutique. We help high-growth African companies align human capital management with NextSofthr’s cloud platform, from performance appraisals and recruitment workflows to Ghana SSNIT and GRA tax compliance.',
    country: 'Ghana',
    countryCode: 'GH',
    city: 'Accra',
    address: 'Stanbic Heights, Airport City, Accra, Ghana',
    latitude: 5.6037,
    longitude: -0.187,
    website: 'https://www.accrapeopletech.example.gh',
    email: 'partners@accrapeopletech.example.gh',
    phone: '+233 24 456 7890',
    partnerType: 'HR Consultant',
    partnerLevel: 'Premium Partner',
    isVerified: true,
    isFeatured: true,
    services: [
      'HR Implementation',
      'HR Consulting',
      'Performance Management',
      'Recruitment',
      'Employee Training',
      'Business Process Consulting'
    ],
    industries: [
      'Financial Services',
      'Professional Services',
      'Education',
      'Technology',
      'E-commerce'
    ],
    businessSizesServed: ['Small Business', 'Medium Business', 'Large Enterprise'],
    countriesServed: ['Ghana', 'Nigeria', 'Côte d\'Ivoire'],
    languages: ['English', 'Twi', 'French'],
    yearsExperience: 9,
    numberOfImplementations: 34,
    clientCount: 47,
    certifications: [
      'NextSofthr Senior Implementation Specialist',
      'SHRM-SCP Senior Certified Professional'
    ],
    caseStudies: [
      {
        title: 'Modernizing HR Appraisal & Attendance for Multi-Campus University',
        clientName: 'West African Academic Network',
        industry: 'Education',
        country: 'Ghana',
        challenge: 'Decentralized staff records across 3 regional campuses hindered objective academic promotions and leaves.',
        solution: 'Implemented NextSofthr Centralized Employee Self-Service, 360-degree appraisals, and automated leave balance calculator.',
        result: 'Appraisal completion rose from 54% to 98% within first quarterly cycle.',
        metric: '98% appraisal completion'
      }
    ],
    testimonials: [
      {
        quote: 'The level of care and deep understanding of Ghanaian employment laws made our NextSofthr transition completely frictionless.',
        author: 'Kwame Osei-Mensah',
        role: 'Director of Corporate Services',
        company: 'GoldKey Capital'
      }
    ],
    registrationDate: '2023-04-10',
    rating: 4.8,
    reviewCount: 24
  },
  {
    id: 'prt-04',
    companyName: 'Kigali Cloud Dynamics',
    tagline: 'Smart SaaS implementation, system integration & AI workflow consulting',
    logo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=160&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&auto=format&fit=crop&q=80',
    description: 'Based in Kigali Innovation City, Kigali Cloud Dynamics is an agile technology partner helping modern enterprises across Rwanda and the Great Lakes region deploy NextSofthr with custom ERP integrations, API automations, and AI-powered payroll audits.',
    country: 'Rwanda',
    countryCode: 'RW',
    city: 'Kigali',
    address: 'Norrsken House, KN 78 St, Kigali, Rwanda',
    latitude: -1.9441,
    longitude: 30.0619,
    website: 'https://www.kigalicloud.example.rw',
    email: 'contact@kigalicloud.example.rw',
    phone: '+250 788 123 456',
    partnerType: 'Technology Partner',
    partnerLevel: 'Professional Partner',
    isVerified: true,
    isFeatured: true,
    services: [
      'System Integration',
      'Customization',
      'Data Migration',
      'Technical Support',
      'HR Implementation',
      'Payroll Implementation'
    ],
    industries: [
      'Technology',
      'Financial Services',
      'Government',
      'Healthcare',
      'Hospitality'
    ],
    businessSizesServed: ['Small Business', 'Medium Business', 'Large Enterprise'],
    countriesServed: ['Rwanda', 'Uganda', 'DR Congo', 'Burundi'],
    languages: ['English', 'French', 'Kinyarwanda'],
    yearsExperience: 6,
    numberOfImplementations: 26,
    clientCount: 38,
    certifications: [
      'NextSofthr Certified Cloud Integrator',
      'AWS Certified Solutions Architect'
    ],
    caseStudies: [
      {
        title: 'Syncing NextSofthr with National Health Registry Staff Database',
        clientName: 'Great Lakes Medical Group',
        industry: 'Healthcare',
        country: 'Rwanda',
        challenge: 'Doctor rotations across 8 clinic networks caused scheduling conflicts and delayed on-call allowances.',
        solution: 'Configured NextSofthr Shift & Scheduling with instant SMS alerts and on-call allowance automations.',
        result: 'Roster conflicts dropped to zero and shift coverage hit 99.4%.',
        metric: '99.4% roster fulfillment'
      }
    ],
    testimonials: [
      {
        quote: 'Kigali Cloud Dynamics delivered an ultra-fast deployment for our 350-person team with deep customization for Rwandan RSSB and RRA statutory filings.',
        author: 'Diane Uwase',
        role: 'COO',
        company: 'Vanguard Health Systems'
      }
    ],
    registrationDate: '2023-06-18',
    rating: 4.8,
    reviewCount: 19
  },
  {
    id: 'prt-05',
    companyName: 'Ubuntu HCM Solutions',
    tagline: 'South Africa’s premier enterprise workforce management & compliance partner',
    logo: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=160&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?w=1200&auto=format&fit=crop&q=80',
    description: 'Operating out of Sandton, Johannesburg, Ubuntu HCM Solutions delivers high-level NextSofthr deployments tailored for South African BCEA, SARS PAYE, UIF, SDL, and EE reporting requirements. Serving mid-to-large corporates and multinational branch offices.',
    country: 'South Africa',
    countryCode: 'ZA',
    city: 'Johannesburg',
    address: 'Rivonia Road, Sandton, Johannesburg, 2196, South Africa',
    latitude: -26.1076,
    longitude: 28.0567,
    website: 'https://www.ubuntuhcm.example.co.za',
    email: 'info@ubuntuhcm.example.co.za',
    phone: '+27 11 883 4000',
    partnerType: 'Implementation Partner',
    partnerLevel: 'Strategic Partner',
    isVerified: true,
    isFeatured: true,
    services: [
      'HR Implementation',
      'Payroll Implementation',
      'Compliance Support',
      'Business Process Consulting',
      'System Integration',
      'Data Migration'
    ],
    industries: [
      'Financial Services',
      'Retail',
      'Manufacturing',
      'Real Estate',
      'Logistics'
    ],
    businessSizesServed: ['Medium Business', 'Large Enterprise', 'Multinational'],
    countriesServed: ['South Africa', 'Namibia', 'Botswana', 'Zimbabwe'],
    languages: ['English', 'Afrikaans', 'Zulu'],
    yearsExperience: 12,
    numberOfImplementations: 62,
    clientCount: 84,
    certifications: [
      'NextSofthr Global Strategic Partner of the Year',
      'SAPA Certified Payroll Professional',
      'SABPP Master HR Practitioner'
    ],
    caseStudies: [
      {
        title: 'Consolidating 9 Retail Brands into a Single Multi-Company NextSofthr Tenant',
        clientName: 'Southern Retail Consortium',
        industry: 'Retail',
        country: 'South Africa',
        challenge: 'Nine acquired subsidiaries ran disconnected legacy on-prem systems, making group-level headcount and overtime analytics impossible.',
        solution: 'Built a unified NextSofthr Multi-Company architecture with role-based branch manager permissions and consolidated executive dashboards.',
        result: 'Consolidated month-end group reporting from 3 weeks to 1 click.',
        metric: '100% unified visibility'
      }
    ],
    testimonials: [
      {
        quote: 'Ubuntu HCM is undeniably the gold standard for enterprise NextSofthr implementations in Southern Africa.',
        author: 'Hendrik Van Zyl',
        role: 'Chief People Officer',
        company: 'Southern Retail Consortium'
      }
    ],
    registrationDate: '2022-11-04',
    rating: 5.0,
    reviewCount: 45
  },
  {
    id: 'prt-06',
    companyName: 'NileTech Business Consulting',
    tagline: 'North African enterprise HR digitization & multilingual workforce systems',
    logo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=1200&auto=format&fit=crop&q=80',
    description: 'Headquartered in New Cairo, NileTech helps enterprises across Egypt and the MENA region deploy NextSofthr with Arabic/English localization, Egyptian Social Insurance Law compliance, and automated attendance integrations for hospitality and real estate groups.',
    country: 'Egypt',
    countryCode: 'EG',
    city: 'Cairo',
    address: 'Smart Village, Building B12, New Cairo, Egypt',
    latitude: 30.0771,
    longitude: 31.0205,
    website: 'https://www.niletechconsulting.example.eg',
    email: 'inquiries@niletechconsulting.example.eg',
    phone: '+20 2 3539 7700',
    partnerType: 'Business Consultant',
    partnerLevel: 'Professional Partner',
    isVerified: true,
    isFeatured: false,
    services: [
      'HR Implementation',
      'Payroll Consulting',
      'Employee Training',
      'Customization',
      'Technical Support'
    ],
    industries: [
      'Hospitality',
      'Real Estate',
      'Construction',
      'Manufacturing',
      'Healthcare'
    ],
    businessSizesServed: ['Medium Business', 'Large Enterprise'],
    countriesServed: ['Egypt', 'UAE', 'Saudi Arabia'],
    languages: ['Arabic', 'English'],
    yearsExperience: 7,
    numberOfImplementations: 28,
    clientCount: 41,
    certifications: [
      'NextSofthr Certified MENA Implementer',
      'PMP Certified Project Management'
    ],
    caseStudies: [
      {
        title: 'Automating Rotational Shifts for 5 Luxury Red Sea Resorts',
        clientName: 'Nile Star Hospitality',
        industry: 'Hospitality',
        country: 'Egypt',
        challenge: 'High staff seasonality and 24/7 service shifts created scheduling chaos and delayed overtime calculations.',
        solution: 'Configured NextSofthr Mobile Self-Service allowing hotel staff to trade shifts and track overtime in real time.',
        result: 'Shift absenteeism dropped by 34% and manager scheduling hours fell by 60%.',
        metric: '34% reduced absenteeism'
      }
    ],
    testimonials: [
      {
        quote: 'NileTech translated our complex Egyptian labor and union rules into automated NextSofthr policies without a single hitch.',
        author: 'Tarek Mansour',
        role: 'HR Director',
        company: 'Nile Star Hospitality'
      }
    ],
    registrationDate: '2023-05-14',
    rating: 4.7,
    reviewCount: 21
  },
  {
    id: 'prt-07',
    companyName: 'Crown HR Global Advisory',
    tagline: 'Bridging UK & European headquarters with African subsidiaries & global teams',
    logo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=160&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&auto=format&fit=crop&q=80',
    description: 'Based in London with liaison partners in Lagos and Nairobi, Crown HR Advisory helps UK and multinational corporations run distributed global workforces, expatriate payrolls, and multi-currency payroll consolidations on NextSofthr.',
    country: 'United Kingdom',
    countryCode: 'GB',
    city: 'London',
    address: '100 Bishopsgate, City of London, EC2N 4AG, UK',
    latitude: 51.5155,
    longitude: -0.0818,
    website: 'https://www.crownhradvisory.example.co.uk',
    email: 'uk@crownhradvisory.example.co.uk',
    phone: '+44 20 7946 0912',
    partnerType: 'Implementation Partner',
    partnerLevel: 'Strategic Partner',
    isVerified: true,
    isFeatured: true,
    services: [
      'HR Implementation',
      'Payroll Outsourcing',
      'System Integration',
      'Data Migration',
      'Compliance Support',
      'Business Process Consulting'
    ],
    industries: [
      'Financial Services',
      'Technology',
      'Professional Services',
      'NGOs',
      'Logistics'
    ],
    businessSizesServed: ['Medium Business', 'Large Enterprise', 'Multinational'],
    countriesServed: ['United Kingdom', 'Nigeria', 'Kenya', 'South Africa', 'Ghana'],
    languages: ['English', 'French'],
    yearsExperience: 14,
    numberOfImplementations: 55,
    clientCount: 78,
    certifications: [
      'NextSofthr Global Strategic Enterprise Partner',
      'CIPD Chartered Fellow',
      'GDPR & Cross-Border Data Compliance Specialist'
    ],
    caseStudies: [
      {
        title: 'Multi-Country Remuneration for London Tech Hub with Lagos & Nairobi Dev Centers',
        clientName: 'AeroCloud FinTech',
        industry: 'Technology',
        country: 'United Kingdom',
        challenge: 'Managing 280 engineers across 3 time zones with USD, GBP, and NGN multi-currency salary disbursements.',
        solution: 'Deployed NextSofthr Multi-Currency Global Tenant with local statutory tax tables for UK PAYE, Nigeria PAYE, and Kenya PAYE.',
        result: 'Unified payroll ledger into central NetSuite ERP and cut multi-country payroll preparation from 8 days to 1 day.',
        metric: '87% faster payroll closing'
      }
    ],
    testimonials: [
      {
        quote: 'Crown HR gave us the exact bridge we needed between London governance and on-the-ground African employment compliance.',
        author: 'Alistair Vance',
        role: 'Chief Operating Officer',
        company: 'AeroCloud FinTech'
      }
    ],
    registrationDate: '2022-09-12',
    rating: 4.9,
    reviewCount: 31
  },
  {
    id: 'prt-08',
    companyName: 'Diaspora Tech Partners LLC',
    tagline: 'Connecting North American diaspora founders & enterprises with African tech talent',
    logo: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=160&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&auto=format&fit=crop&q=80',
    description: 'Headquartered in Atlanta, GA with active operations across the US and Canada, Diaspora Tech Partners assists North American companies hiring remote talent and operating branches in Africa with NextSofthr workforce management, contractor payments, and HR compliance.',
    country: 'United States',
    countryCode: 'US',
    city: 'Atlanta',
    address: 'Peachtree Center, 225 Peachtree St NE, Atlanta, GA 30303',
    latitude: 33.759,
    longitude: -84.3879,
    website: 'https://www.diasporatech.example.com',
    email: 'partners@diasporatech.example.com',
    phone: '+1 404 555 0199',
    partnerType: 'Software Consultant',
    partnerLevel: 'Premium Partner',
    isVerified: true,
    isFeatured: false,
    services: [
      'HR Implementation',
      'System Integration',
      'Customization',
      'Technical Support',
      'HR Outsourcing'
    ],
    industries: [
      'Technology',
      'E-commerce',
      'Professional Services',
      'Healthcare'
    ],
    businessSizesServed: ['Small Business', 'Medium Business', 'Large Enterprise'],
    countriesServed: ['United States', 'Canada', 'Nigeria', 'Ghana', 'Kenya'],
    languages: ['English'],
    yearsExperience: 7,
    numberOfImplementations: 31,
    clientCount: 44,
    certifications: [
      'NextSofthr Certified Cloud Solutions Consultant',
      'SHRM Certified Partner'
    ],
    caseStudies: [
      {
        title: 'Remote Workforce Compliance & Equipment Tracking for US HealthTech',
        clientName: 'MedPulse Health US',
        industry: 'Healthcare',
        country: 'United States',
        challenge: 'Managing remote clinicians and software developers in Nigeria, Kenya, and Canada without violating state/provincial laws.',
        solution: 'Implemented NextSofthr Global Self-Service and Asset Tracking module to maintain audit trails for 140 remote staff.',
        result: 'Zero tax penalties and automated onboarding turnaround shortened to 24 hours.',
        metric: '24-hour onboarding SLA'
      }
    ],
    testimonials: [
      {
        quote: 'Diaspora Tech Partners gave us instant peace of mind managing our rapidly growing engineering hub in Lagos from our Atlanta headquarters.',
        author: 'Marcus Adebayo',
        role: 'Co-Founder & CEO',
        company: 'MedPulse Health'
      }
    ],
    registrationDate: '2023-02-19',
    rating: 4.8,
    reviewCount: 22
  },
  {
    id: 'prt-09',
    companyName: 'Gulf & Africa Gateway Consultants',
    tagline: 'Dubai-Africa corporate expansion, talent mobility & payroll structuring',
    logo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200&auto=format&fit=crop&q=80',
    description: 'Based in Dubai Internet City, Gulf & Africa Gateway supports businesses expanding between the GCC and sub-Saharan Africa. We configure NextSofthr to manage UAE WPS (Wages Protection System) payroll alongside multi-country African operations.',
    country: 'UAE',
    countryCode: 'AE',
    city: 'Dubai',
    address: 'Building 3, Dubai Internet City, Dubai, United Arab Emirates',
    latitude: 25.0975,
    longitude: 55.1583,
    website: 'https://www.gulfafricagateway.example.ae',
    email: 'info@gulfafricagateway.example.ae',
    phone: '+971 4 391 0000',
    partnerType: 'Business Consultant',
    partnerLevel: 'Professional Partner',
    isVerified: true,
    isFeatured: false,
    services: [
      'Payroll Implementation',
      'HR Consulting',
      'Compliance Support',
      'Data Migration',
      'System Integration'
    ],
    industries: [
      'Logistics',
      'Wholesale',
      'Retail',
      'Financial Services',
      'Real Estate'
    ],
    businessSizesServed: ['Medium Business', 'Large Enterprise', 'Multinational'],
    countriesServed: ['UAE', 'Nigeria', 'Kenya', 'Tanzania', 'Egypt'],
    languages: ['English', 'Arabic', 'Hindi'],
    yearsExperience: 9,
    numberOfImplementations: 30,
    clientCount: 46,
    certifications: [
      'NextSofthr Certified Regional Consultant',
      'UAE Ministry of Human Resources Registered Advisory'
    ],
    caseStudies: [
      {
        title: 'Maritime Logistics Dual Payroll (Dubai WPS & Mombasa Ports)',
        clientName: 'Oceanic Freight Logistics',
        industry: 'Logistics',
        country: 'UAE',
        challenge: 'Marine crew and shore teams were compensated through two unaligned systems with high currency conversion leakages.',
        solution: 'Configured NextSofthr Multi-Branch Payroll syncing UAE WPS SIF files and Kenyan KRA deductions simultaneously.',
        result: 'Cut payroll operational overheads by $45,000 annually and removed dual entry.',
        metric: '$45k annual cost savings'
      }
    ],
    testimonials: [
      {
        quote: 'Their deep grasp of both UAE free-zone labor rules and East African payroll makes them unique in the market.',
        author: 'Sultan Al-Nuaimi',
        role: 'Managing Director',
        company: 'Oceanic Freight'
      }
    ],
    registrationDate: '2023-07-08',
    rating: 4.8,
    reviewCount: 18
  },
  {
    id: 'prt-10',
    companyName: 'Abidjan RH & Systèmes Conseil',
    tagline: 'Francophone West Africa HCM transformation & OHADA compliance',
    logo: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=160&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=1200&auto=format&fit=crop&q=80',
    description: 'Based in Plateau, Abidjan, our advisory specializes in French-language NextSofthr deployments across Côte d\'Ivoire, Senegal, Cameroon, and Mali. Full alignment with OHADA labor codes, CNPS social security, and local union conventions.',
    country: 'Côte d\'Ivoire',
    countryCode: 'CI',
    city: 'Abidjan',
    address: 'Immeuble CCIA, Avenue Jean-Paul II, Plateau, Abidjan',
    latitude: 5.3261,
    longitude: -4.0197,
    website: 'https://www.abidjanrh.example.ci',
    email: 'contact@abidjanrh.example.ci',
    phone: '+225 27 20 21 00 00',
    partnerType: 'HR Consultant',
    partnerLevel: 'Professional Partner',
    isVerified: true,
    isFeatured: false,
    services: [
      'HR Implementation',
      'Payroll Consulting',
      'Compliance Support',
      'Employee Training',
      'Recruitment'
    ],
    industries: [
      'Agriculture',
      'Manufacturing',
      'Financial Services',
      'Hospitality',
      'Logistics'
    ],
    businessSizesServed: ['Small Business', 'Medium Business', 'Large Enterprise'],
    countriesServed: ['Côte d\'Ivoire', 'Senegal', 'Cameroon', 'Burkina Faso'],
    languages: ['French', 'English'],
    yearsExperience: 8,
    numberOfImplementations: 25,
    clientCount: 36,
    certifications: [
      'NextSofthr Certified Francophone Consultant',
      'OHADA Employment Law Specialist'
    ],
    caseStudies: [
      {
        title: 'Cocoa Processing Cooperative Digital HR Deployment',
        clientName: 'Coopérative Ivoirienne du Cacao',
        industry: 'Agriculture',
        country: 'Côte d\'Ivoire',
        challenge: 'Paper payroll led to delays during the harvest peak season when temporary worker counts quadrupled.',
        solution: 'Implemented NextSofthr French interface with mobile tablet attendance recording at 6 collection warehouses.',
        result: 'Same-day wage distribution and 100% CNPS social contribution compliance.',
        metric: '100% on-time wages'
      }
    ],
    testimonials: [
      {
        quote: 'NextSofthr in French implemented by Abidjan RH has elevated our management standards to international levels.',
        author: 'Amadou Koné',
        role: 'Directeur Général',
        company: 'Agri-Ivoire Holdings'
      }
    ],
    registrationDate: '2023-05-30',
    rating: 4.8,
    reviewCount: 16
  },
  {
    id: 'prt-11',
    companyName: 'Senegal Tech & Capital Humain',
    tagline: 'Empowering Senegalese businesses with digital HR & IPRES payroll automation',
    logo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=160&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&auto=format&fit=crop&q=80',
    description: 'Headquartered in Almadies, Dakar, Senegal Tech & Capital Humain assists technology startups, telecom operators, and financial institutions with NextSofthr setup, CSS/IPRES declarations, and bilingual team onboarding.',
    country: 'Senegal',
    countryCode: 'SN',
    city: 'Dakar',
    address: 'Route des Almadies, Zone 12, Dakar, Senegal',
    latitude: 14.7397,
    longitude: -17.5109,
    website: 'https://www.senegalcapitalhumain.example.sn',
    email: 'info@senegalcapitalhumain.example.sn',
    phone: '+221 33 820 4545',
    partnerType: 'Implementation Partner',
    partnerLevel: 'Certified Partner',
    isVerified: true,
    isFeatured: false,
    services: [
      'HR Implementation',
      'Employee Training',
      'Payroll Consulting',
      'Data Migration'
    ],
    industries: [
      'Technology',
      'Financial Services',
      'Retail',
      'NGOs'
    ],
    businessSizesServed: ['Micro Business', 'Small Business', 'Medium Business'],
    countriesServed: ['Senegal', 'Mali', 'Guinea'],
    languages: ['French', 'Wolof', 'English'],
    yearsExperience: 5,
    numberOfImplementations: 19,
    clientCount: 29,
    certifications: ['NextSofthr Certified Partner Practitioner'],
    caseStudies: [
      {
        title: 'FinTech Hub Scaling from 20 to 180 Employees',
        clientName: 'Teranga Mobile Money',
        industry: 'Financial Services',
        country: 'Senegal',
        challenge: 'Rapid growth created onboarding bottlenecks and inconsistent probation reviews.',
        solution: 'Deployed NextSofthr automated recruitment pipeline and 30-60-90 day milestone reviews.',
        result: 'Cut new hire ramp-up time by 40% and improved employee retention.',
        metric: '40% faster onboarding'
      }
    ],
    testimonials: [
      {
        quote: 'Their local presence in Dakar and instant support via phone and on-site visits made our transition smooth.',
        author: 'Fatou Diop',
        role: 'Head of Talent',
        company: 'Teranga Mobile Money'
      }
    ],
    registrationDate: '2023-08-14',
    rating: 4.7,
    reviewCount: 14
  },
  {
    id: 'prt-12',
    companyName: 'Douala Business & Payroll Advisory',
    tagline: 'Central African business management & CNPS payroll specialists',
    logo: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=160&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200&auto=format&fit=crop&q=80',
    description: 'Based in Akwa, Douala, our firm helps businesses across Cameroon, Gabon, and Central Africa implement NextSofthr for industrial shift scheduling, transport fleet personnel management, and CEMAC tax compliance.',
    country: 'Cameroon',
    countryCode: 'CM',
    city: 'Douala',
    address: 'Boulevard de la Liberté, Akwa, Douala, Cameroun',
    latitude: 4.0511,
    longitude: 9.7679,
    website: 'https://www.doualapayroll.example.cm',
    email: 'contact@doualapayroll.example.cm',
    phone: '+237 233 42 18 90',
    partnerType: 'Accounting Firm',
    partnerLevel: 'Certified Partner',
    isVerified: true,
    isFeatured: false,
    services: [
      'Payroll Implementation',
      'HR Consulting',
      'Compliance Support',
      'Employee Training'
    ],
    industries: [
      'Transportation',
      'Manufacturing',
      'Wholesale',
      'Construction'
    ],
    businessSizesServed: ['Small Business', 'Medium Business'],
    countriesServed: ['Cameroon', 'Gabon', 'Chad'],
    languages: ['French', 'English'],
    yearsExperience: 6,
    numberOfImplementations: 18,
    clientCount: 26,
    certifications: ['NextSofthr Certified Accounting & Payroll Partner'],
    caseStudies: [
      {
        title: 'Port Fleet Driver Roster & Overtime Overhaul',
        clientName: 'CamTrans Logistics',
        industry: 'Transportation',
        country: 'Cameroon',
        challenge: 'Tracking variable cross-border route allowances and trip bonuses was prone to ledger errors.',
        solution: 'Used NextSofthr Expense & Allowance Engine with mobile receipt uploads.',
        result: 'Reduced allowance reconciliation from 12 days to under 2 hours.',
        metric: '95% faster reconciliations'
      }
    ],
    testimonials: [
      {
        quote: 'A competent, responsive team that knows Central African business realities inside out.',
        author: 'Jean-Marc Eto\'o',
        role: 'Administrative Director',
        company: 'CamTrans Logistics'
      }
    ],
    registrationDate: '2023-09-01',
    rating: 4.6,
    reviewCount: 11
  },
  {
    id: 'prt-13',
    companyName: 'Atlas Talent & Systems Casablanca',
    tagline: 'Moroccan business process consulting, CNSS compliance & enterprise SaaS',
    logo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=160&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1497215842964-222b430dc094?w=1200&auto=format&fit=crop&q=80',
    description: 'Located in Casablanca Finance City, Atlas Talent deploys NextSofthr for call centers, manufacturing plants, and offshoring firms with full integration into Moroccan CNSS, CIMR, and AMO tax systems.',
    country: 'Morocco',
    countryCode: 'MA',
    city: 'Casablanca',
    address: 'Tour CFC, Casablanca Finance City, Casablanca, Morocco',
    latitude: 33.5731,
    longitude: -7.5898,
    website: 'https://www.atlastalent.example.ma',
    email: 'contact@atlastalent.example.ma',
    phone: '+212 522 99 88 77',
    partnerType: 'System Integrator',
    partnerLevel: 'Professional Partner',
    isVerified: true,
    isFeatured: false,
    services: [
      'System Integration',
      'HR Implementation',
      'Customization',
      'Payroll Consulting'
    ],
    industries: [
      'Technology',
      'Retail',
      'Manufacturing',
      'Financial Services'
    ],
    businessSizesServed: ['Medium Business', 'Large Enterprise', 'Multinational'],
    countriesServed: ['Morocco', 'Tunisia', 'France'],
    languages: ['French', 'Arabic', 'English'],
    yearsExperience: 8,
    numberOfImplementations: 29,
    clientCount: 39,
    certifications: ['NextSofthr Certified Senior Integrator'],
    caseStudies: [
      {
        title: 'BPO Center Attendance Integration for 750 Agents',
        clientName: 'Maghreb Call Solutions',
        industry: 'Technology',
        country: 'Morocco',
        challenge: 'Integration between telephony status and break recording was manual and prone to manipulation.',
        solution: 'Connected telephony API directly into NextSofthr Shift & Attendance microservices.',
        result: 'Saved 18 hours of administrative collation every weekly pay cycle.',
        metric: '18 hours saved weekly'
      }
    ],
    testimonials: [
      {
        quote: 'Atlas Talent provides the highest degree of technical competence for our Casablanca contact center.',
        author: 'Mehdi Benjelloun',
        role: 'Operations Director',
        company: 'Maghreb Call Solutions'
      }
    ],
    registrationDate: '2023-03-05',
    rating: 4.8,
    reviewCount: 20
  },
  {
    id: 'prt-14',
    companyName: 'Kampala HR & IT Synergy Ltd',
    tagline: 'Uganda’s leading human capital advisory & automated payroll consultancy',
    logo: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=160&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&auto=format&fit=crop&q=80',
    description: 'Located in Kololo, Kampala, Kampala HR & IT Synergy provides tailored NextSofthr implementation, URA PAYE and NSSF compliance, and employee training for manufacturing, hospitality, and NGO sectors in Uganda.',
    country: 'Uganda',
    countryCode: 'UG',
    city: 'Kampala',
    address: 'Lugogo Bypass, Kololo, Kampala, Uganda',
    latitude: 0.3344,
    longitude: 32.6053,
    website: 'https://www.kampalasynergy.example.ug',
    email: 'info@kampalasynergy.example.ug',
    phone: '+256 414 670 990',
    partnerType: 'Implementation Partner',
    partnerLevel: 'Certified Partner',
    isVerified: true,
    isFeatured: false,
    services: [
      'HR Implementation',
      'Payroll Implementation',
      'Employee Training',
      'Compliance Support',
      'Technical Support'
    ],
    industries: [
      'NGOs',
      'Hospitality',
      'Education',
      'Agriculture',
      'Manufacturing'
    ],
    businessSizesServed: ['Small Business', 'Medium Business', 'Large Enterprise'],
    countriesServed: ['Uganda', 'South Sudan', 'Kenya'],
    languages: ['English', 'Luganda', 'Swahili'],
    yearsExperience: 7,
    numberOfImplementations: 24,
    clientCount: 35,
    certifications: ['NextSofthr Certified Implementation Partner'],
    caseStudies: [
      {
        title: 'Countrywide NGO Field Staff Timesheet & Per Diem Tracking',
        clientName: 'East Africa Community Trust',
        industry: 'NGOs',
        country: 'Uganda',
        challenge: 'Paper expense claims from 14 remote district offices delayed staff reimbursements by up to 2 months.',
        solution: 'Deployed NextSofthr offline-friendly mobile app for field per diem filing and digital approvals.',
        result: 'Reimbursement processing time collapsed from 60 days to 48 hours.',
        metric: '48hr per diem turnaround'
      }
    ],
    testimonials: [
      {
        quote: 'Our staff across 14 remote districts in Uganda can now check pay slips and submit leaves directly on their phones.',
        author: 'Grace Namutebi',
        role: 'Country Director',
        company: 'East Africa Community Trust'
      }
    ],
    registrationDate: '2023-04-28',
    rating: 4.7,
    reviewCount: 17
  },
  {
    id: 'prt-15',
    companyName: 'Dar es Salaam Enterprise Partners',
    tagline: 'Tanzanian business digitization, TRA tax compliance & workforce management',
    logo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&auto=format&fit=crop&q=80',
    description: 'Based in Masaki, Dar es Salaam, we help Tanzanian enterprises seamlessly adopt NextSofthr with TRA tax integration, NSSF/WCF compliance, and Swahili-localized employee self-service portals.',
    country: 'Tanzania',
    countryCode: 'TZ',
    city: 'Dar es Salaam',
    address: 'Peninsula House, Toure Drive, Masaki, Dar es Salaam, Tanzania',
    latitude: -6.7554,
    longitude: 39.2783,
    website: 'https://www.darenterprise.example.tz',
    email: 'partners@darenterprise.example.tz',
    phone: '+255 22 260 1199',
    partnerType: 'Implementation Partner',
    partnerLevel: 'Certified Partner',
    isVerified: true,
    isFeatured: false,
    services: [
      'HR Implementation',
      'Payroll Implementation',
      'Compliance Support',
      'Data Migration'
    ],
    industries: [
      'Logistics',
      'Hospitality',
      'Wholesale',
      'Manufacturing'
    ],
    businessSizesServed: ['Small Business', 'Medium Business', 'Large Enterprise'],
    countriesServed: ['Tanzania', 'Rwanda', 'Burundi'],
    languages: ['Swahili', 'English'],
    yearsExperience: 6,
    numberOfImplementations: 21,
    clientCount: 30,
    certifications: ['NextSofthr Certified Regional Specialist'],
    caseStudies: [
      {
        title: 'Logistics Fleet Driver Roster & Overtime Standardization',
        clientName: 'Kilimanjaro Haulage Ltd',
        industry: 'Logistics',
        country: 'Tanzania',
        challenge: 'Inconsistent tracking of transit rest hours and statutory WCF injury insurance filings.',
        solution: 'Implemented NextSofthr Shift Management with automated statutory filing calculators.',
        result: 'Eliminated TRA compliance penalties and reduced overtime disputes by 90%.',
        metric: '90% fewer overtime disputes'
      }
    ],
    testimonials: [
      {
        quote: 'Their deep understanding of Tanzanian labor laws made our NextSofthr rollout an unqualified success.',
        author: 'Juma Mwinyi',
        role: 'Chief HR Officer',
        company: 'Kilimanjaro Haulage'
      }
    ],
    registrationDate: '2023-07-20',
    rating: 4.7,
    reviewCount: 15
  },
  {
    id: 'prt-16',
    companyName: 'Calgary & Toronto People Solutions',
    tagline: 'Canadian-African enterprise exchange & international employee mobility',
    logo: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=160&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&auto=format&fit=crop&q=80',
    description: 'Serving Canadian companies with branch offices, energy ventures, and remote tech hubs in Africa. We ensure Canadian CRA compliance and provincial standards align with NextSofthr overseas workforce records.',
    country: 'Canada',
    countryCode: 'CA',
    city: 'Toronto',
    address: 'Bay Adelaide Centre, 333 Bay St, Toronto, ON M5H 2R2',
    latitude: 43.6503,
    longitude: -79.3807,
    website: 'https://www.canadaintlpeople.example.ca',
    email: 'toronto@canadaintlpeople.example.ca',
    phone: '+1 416 555 0188',
    partnerType: 'Software Consultant',
    partnerLevel: 'Professional Partner',
    isVerified: true,
    isFeatured: false,
    services: [
      'System Integration',
      'HR Implementation',
      'Data Migration',
      'Technical Support'
    ],
    industries: [
      'Technology',
      'Financial Services',
      'Construction',
      'Agriculture'
    ],
    businessSizesServed: ['Small Business', 'Medium Business', 'Large Enterprise'],
    countriesServed: ['Canada', 'Nigeria', 'Kenya', 'Ghana'],
    languages: ['English', 'French'],
    yearsExperience: 8,
    numberOfImplementations: 27,
    clientCount: 37,
    certifications: ['NextSofthr Certified Global Integrator'],
    caseStudies: [
      {
        title: 'Global Tech Contractor Onboarding for Toronto SaaS firm',
        clientName: 'Hyperion Analytics Corp',
        industry: 'Technology',
        country: 'Canada',
        challenge: 'Onboarding 70 software contractors in Nigeria and Kenya while maintaining Canadian IP security standards.',
        solution: 'Deployed NextSofthr automated e-sign NDA workflows and automated monthly contractor invoicing.',
        result: 'Contractor onboarding turnaround reduced from 14 days to 4 hours.',
        metric: '4-hour contractor setup'
      }
    ],
    testimonials: [
      {
        quote: 'NextSofthr plus Toronto People Solutions enabled us to scale our African engineering team without administrative headaches.',
        author: 'Elena Rostova',
        role: 'VP Talent',
        company: 'Hyperion Analytics'
      }
    ],
    registrationDate: '2023-01-30',
    rating: 4.8,
    reviewCount: 16
  },
  {
    id: 'prt-17',
    companyName: 'Bengaluru Tech Integrators Pvt Ltd',
    tagline: 'Enterprise ERP, NextSofthr custom connectors & API engineering',
    logo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=160&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&auto=format&fit=crop&q=80',
    description: 'Based in Electronic City, Bengaluru, we build deep enterprise connectors between NextSofthr and SAP, Oracle, NetSuite, and custom legacy ERP systems for large multinationals operating in Africa and Asia.',
    country: 'India',
    countryCode: 'IN',
    city: 'Bengaluru',
    address: 'Infosys Drive, Electronic City Phase 1, Bengaluru, Karnataka 560100',
    latitude: 12.8399,
    longitude: 77.677,
    website: 'https://www.bengalurutech.example.in',
    email: 'info@bengalurutech.example.in',
    phone: '+91 80 4123 4567',
    partnerType: 'System Integrator',
    partnerLevel: 'Professional Partner',
    isVerified: true,
    isFeatured: false,
    services: [
      'System Integration',
      'Customization',
      'Technical Support',
      'Data Migration'
    ],
    industries: [
      'Technology',
      'Manufacturing',
      'Retail',
      'Healthcare'
    ],
    businessSizesServed: ['Large Enterprise', 'Multinational'],
    countriesServed: ['India', 'Nigeria', 'Kenya', 'UAE', 'United Kingdom'],
    languages: ['English', 'Hindi'],
    yearsExperience: 11,
    numberOfImplementations: 42,
    clientCount: 56,
    certifications: [
      'NextSofthr Certified API Architect',
      'Oracle Platinum Integration Partner'
    ],
    caseStudies: [
      {
        title: 'Two-Way NextSofthr to SAP ERP Ledger Sync for Multi-Plant Conglomerate',
        clientName: 'Indo-African Industrial Corp',
        industry: 'Manufacturing',
        country: 'India',
        challenge: 'Manual double entry of payroll journals from African plants into Indian corporate headquarters SAP ledger.',
        solution: 'Engineered an automated middleware connector syncing NextSofthr payroll line items to SAP GL in real-time.',
        result: 'Eliminated manual reconciliation errors and closed group accounts 6 days earlier every month.',
        metric: '6 days faster monthly close'
      }
    ],
    testimonials: [
      {
        quote: 'Flawless API architecture and lightning-fast turnaround. They made NextSofthr speak directly to our SAP core.',
        author: 'Rajiv Sharma',
        role: 'Chief Technology Officer',
        company: 'Indo-African Industrial Corp'
      }
    ],
    registrationDate: '2023-02-11',
    rating: 4.8,
    reviewCount: 23
  },
  {
    id: 'prt-18',
    companyName: 'Port Harcourt Energy & HR Advisory',
    tagline: 'Offshore, oil & gas crew management & specialized shift scheduling',
    logo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&auto=format&fit=crop&q=80',
    description: 'Based in Trans-Amadi, Port Harcourt, we specialize in 28/28 offshore rotational crew scheduling, maritime safety cert tracking, hazard allowance computations, and NUPENG/PENGASSAN collective bargaining alignment on NextSofthr.',
    country: 'Nigeria',
    countryCode: 'NG',
    city: 'Port Harcourt',
    address: 'Plot 8 Trans-Amadi Industrial Layout, Port Harcourt, Rivers State, Nigeria',
    latitude: 4.8156,
    longitude: 7.0498,
    website: 'https://www.phenergyhr.example.ng',
    email: 'info@phenergyhr.example.ng',
    phone: '+234 84 461 2233',
    partnerType: 'HR Technology Consultant',
    partnerLevel: 'Premium Partner',
    isVerified: true,
    isFeatured: false,
    services: [
      'HR Implementation',
      'Shift & Scheduling',
      'Payroll Implementation',
      'Compliance Support',
      'Technical Support'
    ],
    industries: [
      'Logistics',
      'Manufacturing',
      'Construction',
      'Transportation'
    ],
    businessSizesServed: ['Medium Business', 'Large Enterprise', 'Multinational'],
    countriesServed: ['Nigeria', 'Ghana', 'Angola'],
    languages: ['English'],
    yearsExperience: 9,
    numberOfImplementations: 33,
    clientCount: 43,
    certifications: [
      'NextSofthr Certified Industrial Specialist',
      'NUPENG Labor Compliance Advisor'
    ],
    caseStudies: [
      {
        title: 'Offshore 28/28 Rotation Crew Rostering for 600 Marine Personnel',
        clientName: 'Niger Delta Offshore Logistics',
        industry: 'Logistics',
        country: 'Nigeria',
        challenge: 'Crew change logistics caused missed helicopter flights and expired BOSIET offshore safety certificates.',
        solution: 'Built automated NextSofthr certification expiration triggers and automated rotational shift schedules.',
        result: 'Reduced certificate non-compliance to 0% and saved over $120,000 in flight rescheduling penalties.',
        metric: '0% cert compliance lapses'
      }
    ],
    testimonials: [
      {
        quote: 'For industrial shift work and heavy oilfield compliance, Port Harcourt Energy & HR Advisory has no peer.',
        author: 'Tari Biu',
        role: 'Director of Human Resources',
        company: 'Niger Delta Offshore Logistics'
      }
    ],
    registrationDate: '2023-04-14',
    rating: 4.9,
    reviewCount: 26
  }
];

export const MOCK_PARTNERS = INITIAL_PARTNERS;
