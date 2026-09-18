/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Scheme } from './types';

export const SCHEMES: Scheme[] = [
  {
    id: 'pm-kisan',
    name: 'PM-Kisan Samman Nidhi',
    category: 'Agriculture',
    ministry: 'Ministry of Agriculture & Farmers Welfare',
    description: 'Direct income support of ₹6,000 per year to all landholding farmer families in three equal installments.',
    benefits: ['₹6,000 per year in three installments of ₹2,000 each'],
    eligibility: {
      occupations: ['Farmer'],
      gender: ['All'],
      caste: ['All'],
    },
    applicationUrl: 'https://pmkisan.gov.in/',
    tags: ['Income Support', 'Farmers', 'Direct Benefit Transfer']
  },
  {
    id: 'ayushman-bharat',
    name: 'Ayushman Bharat (PM-JAY)',
    category: 'Healthcare',
    ministry: 'Ministry of Health and Family Welfare',
    description: 'The world\'s largest health insurance scheme, providing ₹5 lakh per family per year for secondary and tertiary care hospitalization.',
    benefits: ['Cashless treatment up to ₹5 Lakh per year', 'Covers pre and post-hospitalization expenses'],
    eligibility: {
      isBPL: true,
      gender: ['All'],
      caste: ['All'],
    },
    applicationUrl: 'https://pmjay.gov.in/',
    tags: ['Health Insurance', 'BPL', 'Healthcare']
  },
  {
    id: 'ayushman-vaya-vandana',
    name: 'Ayushman Bharat Vaya Vandana Yojana',
    category: 'Healthcare',
    ministry: 'Ministry of Health and Family Welfare',
    description: 'Extended healthcare security for all senior citizens aged 70 and above, regardless of income.',
    benefits: ['₹5 Lakh health cover for seniors aged 70+', 'Vay Vandana Card for cashless treatment'],
    eligibility: {
      ageRange: [70, 120],
      gender: ['All'],
    },
    applicationUrl: 'https://dashboard.pmjay.gov.in/pmjayvvw/',
    tags: ['Senior Citizens', 'Healthcare', 'Insurance']
  },
  {
    id: 'pm-surya-ghar',
    name: 'PM Surya Ghar: Muft Bijli Yojana',
    category: 'Energy',
    ministry: 'Ministry of New and Renewable Energy',
    description: 'A rooftop solar scheme providing up to 300 units of free electricity every month to 1 crore households.',
    benefits: ['Subsidy up to ₹78,000 for rooftop solar', 'Free electricity up to 300 units/month'],
    eligibility: {
      gender: ['All'],
      caste: ['All'],
    },
    applicationUrl: 'https://pmsuryaghar.gov.in/',
    tags: ['Solar Energy', 'Sustainability', 'Electricity']
  },
  {
    id: 'sukanya-samriddhi',
    name: 'Sukanya Samriddhi Yojana',
    category: 'Financial Services',
    ministry: 'Ministry of Women and Child Development',
    description: 'A small savings scheme for the girl child to ensure her bright future and education expenses.',
    benefits: ['High interest rates (approx 8.2%)', 'Tax deduction under Section 80C'],
    eligibility: {
      ageRange: [0, 10],
      gender: ['Female'],
    },
    applicationUrl: 'https://nsiindia.gov.in/',
    tags: ['Savings', 'Girl Child', 'Education']
  },
  {
    id: 'pm-awas-yojana-rural',
    name: 'PM Awas Yojana (PMAY-G)',
    category: 'Housing',
    ministry: 'Ministry of Rural Development',
    description: 'Providing "Housing for All" in rural areas by assisting eligible households to construct pucca houses.',
    benefits: ['Financial assistance for house construction', 'Toilets under Swachh Bharat Mission'],
    eligibility: {
      isBPL: true,
      gender: ['All'],
    },
    applicationUrl: 'https://pmayg.nic.in/',
    tags: ['Housing', 'Rural Development', 'BPL']
  },
  {
    id: 'pm-mudra-yojana',
    name: 'PM Mudra Yojana (PMMY)',
    category: 'Business',
    ministry: 'Ministry of Finance',
    description: 'Provides loans up to ₹10 lakh to non-corporate, non-farm small/micro enterprises (Shishu, Kishore, and Tarun).',
    benefits: ['Collateral-free loans up to ₹10 Lakh', 'Financial support for small businesses'],
    eligibility: {
      occupations: ['Self-employed', 'Small Business Owner'],
      gender: ['All'],
    },
    applicationUrl: 'https://www.mudra.org.in/',
    tags: ['Business Loan', 'Entrepreneurship', 'MSME']
  },
  {
    id: 'pm-vishwakarma',
    name: 'PM Vishwakarma Yojana',
    category: 'Skill Development',
    ministry: 'Ministry of MSME',
    description: 'Supporting traditional artisans and craftspeople through skill upgradation, toolkit incentives, and credit support.',
    benefits: ['Stipend of ₹500/day during training', 'Toolkit incentive of ₹15,000'],
    eligibility: {
      occupations: ['Artisan', 'Craftsman'],
      gender: ['All'],
    },
    applicationUrl: 'https://pmvishwakarma.gov.in/',
    tags: ['Artisans', 'Skill Development', 'Credit']
  },
  {
    id: 'pm-vidya-lakshmi',
    name: 'PM Vidya Lakshmi Yojana',
    category: 'Education',
    ministry: 'Ministry of Finance',
    description: 'A unified portal for students seeking education loans and scholarships to pursue higher education.',
    benefits: ['Easy access to education loans', 'No collateral for loans up to ₹7.5 Lakh'],
    eligibility: {
      occupations: ['Student'],
      gender: ['All'],
    },
    applicationUrl: 'https://www.vidyalakshmi.co.in/',
    tags: ['Education Loan', 'Student', 'Scholarship']
  },
  {
    id: 'nps-vatsalya',
    name: 'NPS Vatsalya Yojana',
    category: 'Pension',
    ministry: 'Ministry of Finance',
    description: 'A pension scheme for minors where parents can open an account to secure their child\'s financial future.',
    benefits: ['Long-term wealth creation', 'Compounding benefits for retirement'],
    eligibility: {
      ageRange: [0, 18],
      gender: ['All'],
    },
    applicationUrl: 'https://enps.nsdl.com/',
    tags: ['Pension', 'Savings', 'Minors']
  },
  {
    id: 'mgnrega',
    name: 'MGNREGA',
    category: 'Employment',
    ministry: 'Ministry of Rural Development',
    description: 'Guarantees 100 days of wage employment in a financial year to every rural household.',
    benefits: ['Minimum wage employment', 'Unemployment allowance if work not provided'],
    eligibility: {
      occupations: ['Unemployed', 'Farmer'],
      gender: ['All'],
    },
    applicationUrl: 'https://nrega.nic.in/',
    tags: ['Employment', 'Rural', 'Manual Work']
  },
  {
    id: 'pm-jan-dhan',
    name: 'PM Jan Dhan Yojana',
    category: 'Financial Services',
    ministry: 'Ministry of Finance',
    description: 'National mission for financial inclusion to ensure access to banking accounts, insurance, and pension.',
    benefits: ['Zero balance account', 'Accident insurance cover of ₹2 Lakh'],
    eligibility: {
      ageRange: [10, 100],
      gender: ['All'],
    },
    applicationUrl: 'https://pmjdy.gov.in/',
    tags: ['Banking', 'Financial Inclusion', 'Insurance']
  },
  {
    id: 'mission-shakti',
    name: 'Mission Shakti',
    category: 'Women Empowerment',
    ministry: 'Ministry of Women and Child Development',
    description: 'An integrated women empowerment program for the safety, security, and empowerment of women.',
    benefits: ['Legal aid and counseling', 'Financial support for self-help groups'],
    eligibility: {
      gender: ['Female'],
    },
    applicationUrl: 'https://wcd.nic.in/schemes/mission-shakti',
    tags: ['Women', 'Safety', 'Empowerment']
  },
  {
    id: 'pm-udyogini',
    name: 'Udyogini Scheme',
    category: 'Business',
    ministry: 'Women and Child Development',
    description: 'Empowers illiterate and poor women to become self-reliant by providing financial assistance for entrepreneurship.',
    benefits: ['Interest-free loans', 'Skill development training'],
    eligibility: {
      gender: ['Female'],
      ageRange: [18, 55],
      maxIncome: 150000,
    },
    applicationUrl: 'https://wcd.karnataka.gov.in/',
    tags: ['Women Empowerment', 'Business', 'Training']
  },
  {
    id: 'karnataka-shakti',
    name: 'Shakti Scheme (Karnataka)',
    category: 'Transport',
    ministry: 'Government of Karnataka',
    description: 'Free travel for women and gender minorities in non-premium government buses across Karnataka.',
    benefits: ['Free bus travel in Karnataka state-run buses'],
    eligibility: {
      gender: ['Female'],
      states: ['Karnataka'],
    },
    applicationUrl: 'https://sevasindhu.karnataka.gov.in/',
    tags: ['Transport', 'Women', 'Karnataka']
  },
  {
    id: 'delhi-electricity',
    name: 'Delhi Zero Electricity Bill',
    category: 'Energy',
    ministry: 'Government of Delhi',
    description: 'Provides free electricity for consumers using up to 200 units per month.',
    benefits: ['100% subsidy for up to 200 units', '50% subsidy for 201-400 units'],
    eligibility: {
      states: ['Delhi'],
      gender: ['All'],
    },
    applicationUrl: 'https://edistrict.delhigovt.nic.in/',
    tags: ['Electricity', 'Subsidy', 'Delhi']
  },
  {
    id: 'maha-namo-shetkari',
    name: 'Namo Shetkari Mahasanman Nidhi',
    category: 'Agriculture',
    ministry: 'Government of Maharashtra',
    description: 'Additional financial support of ₹6,000 per year for farmers in Maharashtra, on top of PM-Kisan.',
    benefits: ['Additional ₹6,000 per year'],
    eligibility: {
      states: ['Maharashtra'],
      occupations: ['Farmer'],
    },
    applicationUrl: 'https://nsmn.maharashtra.gov.in/',
    tags: ['Farmers', 'Maharashtra', 'Income Support']
  },
  {
    id: 'pm-usp-scholarship',
    name: 'PM-USP Central Sector Scholarship',
    category: 'Education',
    ministry: 'Ministry of Education',
    description: 'Financial aid to meritorious students from economically weaker families for higher studies.',
    benefits: ['₹12,000/year for graduation', '₹20,000/year for post-graduation'],
    eligibility: {
      occupations: ['Student'],
      maxIncome: 450000,
      gender: ['All'],
    },
    applicationUrl: 'https://scholarships.gov.in/',
    tags: ['Scholarship', 'Education', 'Merit-based']
  },
  {
    id: 'stand-up-india',
    name: 'Stand-Up India Scheme',
    category: 'Business',
    ministry: 'Ministry of Finance',
    description: 'Facilitates bank loans between ₹10 lakh and ₹1 crore to at least one SC/ST and one woman borrower per bank branch.',
    benefits: ['Loans from ₹10 Lakh to ₹1 Crore', 'Support for greenfield enterprises'],
    eligibility: {
      gender: ['Female'],
      caste: ['SC', 'ST'],
      occupations: ['Entrepreneur'],
    },
    applicationUrl: 'https://www.standupmitra.in/',
    tags: ['Entrepreneurship', 'Women', 'SC/ST', 'Loans']
  },
  {
    id: 'pm-kaushal-vikas',
    name: 'PM Kaushal Vikas Yojana (PMKVY)',
    category: 'Skill Development',
    ministry: 'Ministry of Skill Development & Entrepreneurship',
    description: 'Enables Indian youth to take up industry-relevant skill training for better livelihoods.',
    benefits: ['Skill certification', 'Placement assistance', 'Monetary rewards'],
    eligibility: {
      ageRange: [15, 45],
      gender: ['All'],
    },
    applicationUrl: 'https://www.pmkvyofficial.org/',
    tags: ['Skill Development', 'Youth', 'Employment']
  },
  {
    id: 'pm-egp',
    name: 'PM Employment Generation Programme',
    category: 'Employment',
    ministry: 'Ministry of MSME',
    description: 'A credit-linked subsidy scheme for setting up new micro-enterprises and generating employment.',
    benefits: ['Subsidy of 15% to 35% on project cost', 'Loans up to ₹50 Lakh for manufacturing'],
    eligibility: {
      ageRange: [18, 100],
      gender: ['All'],
    },
    applicationUrl: 'https://www.kviconline.gov.in/pmegpeportal/',
    tags: ['Self-employment', 'MSME', 'Subsidy']
  },
  {
    id: 'pension-atal',
    name: 'Atal Pension Yojana (APY)',
    category: 'Pension',
    ministry: 'Ministry of Finance',
    description: 'Provides a guaranteed minimum pension of ₹1,000 to ₹5,000 per month starting from age 60.',
    benefits: ['Fixed monthly pension', 'Government co-contribution for certain periods'],
    eligibility: {
      ageRange: [18, 40],
      gender: ['All'],
    },
    applicationUrl: 'https://www.npscra.nsdl.co.in/scheme-details.php',
    tags: ['Pension', 'Unorganized Sector', 'Retirement']
  }
];
