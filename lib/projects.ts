// lib/projects.ts
export type ProjectId = 'resume-tailor' | 'card-scout';

export type Project = {
  id: ProjectId;
  name: string;
  tagline: string;
  role: string;
  timeframe: string;
  stack: string[];
  links: { label: string; href: string }[];
  problem: string;
  whyNow: string;
  solution: string;
  outcomes: string[];
  responsibilities: string[];
  architecture: {
    overview: string;
    bullets: string[];
  };
  metrics?: { value: string; label: string }[];
  description?: string;
};

export const projects: Record<ProjectId, Project> = {
  'resume-tailor': {
    id: 'resume-tailor',
    name: 'Resume Tailor',
    tagline: 'AI-powered resume tailoring for each job in under 30 seconds.',
    role: 'Product Manager & Solo Builder',
    timeframe: '2024 – Present',
    stack: ['Next.js', 'TypeScript', 'Vercel', 'OpenAI', 'Anthropic'],
    links: [
      { label: 'Live app', href: 'https://resume-tailor-psi.vercel.app/resume-tailor' },
      { label: 'GitHub', href: 'https://github.com/boozinix' }
    ],
    metrics: [
      { value: '500+', label: 'Resumes tailored' },
      { value: '90%', label: 'Time reduction' },
      { value: '4.8/5', label: 'User rating' }
    ],
    description: 'Resume Tailor transforms the tedious process of customizing resumes for each job application into a 30-second AI-powered workflow. By analyzing job descriptions and mapping requirements to existing experience, it generates targeted bullet points while maintaining the candidate\'s authentic voice and giving them full control over the final output.',
    problem:
      'Most job seekers send generic resumes that fail ATS filters and do not clearly align to the target role, costing them interviews.',
    whyNow:
      'With AI models good enough to do nuanced rewriting, it became possible to compress hours of manual tailoring into seconds while still sounding like the candidate.',
    solution:
      'Resume Tailor ingests a resume and a job description, identifies gaps and key themes, and rewrites bullet points with targeted keywords, while showing a diff so users keep control.',
    outcomes: [
      'Reduced tailoring time from 2–3 hours per role to under a minute.',
      'Enables users to confidently apply to 5–10x more roles per week.',
      'Improves alignment to job requirements via explicit keyword coverage and impact-focused bullet rewrites.'
    ],
    responsibilities: [
      'Identified problem through own job search and interviews with peers.',
      'Defined product scope, UX flow, and success criteria (time-to-first-tailored-resume).',
      'Implemented full-stack app, multi-model prompt strategy, and PDF/DOCX handling.',
      'Launched, iterated on copy and UX based on user feedback.'
    ],
    architecture: {
      overview:
        'The app is a server-first Next.js application using edge-friendly APIs to orchestrate multiple LLM calls and document parsing.',
      bullets: [
        'Upload & Parsing layer: extracts clean text from PDF / DOCX resumes and normalizes job descriptions.',
        'Analysis & Planning: LLM pass to map job requirements to existing bullets and identify gaps.',
        'Rewrite Engine: second LLM pass generates revised bullets and suggested new bullets per section.',
        'Diff Presentation: front-end computes inline diff between original and tailored text for transparency.',
        'Export: renders final version to downloadable DOCX/PDF for direct use in applications.'
      ]
    }
  },
  'card-scout': {
    id: 'card-scout',
    name: 'Card Scout',
    tagline: 'An intelligent engine to find the most valuable credit cards for your specific spending and goals.',
    role: 'Product Manager & Solo Builder',
    timeframe: '2024 – Present',
    stack: ['Next.js', 'TypeScript', 'Vercel', 'Playwright', 'Postgres', 'LLMs'],
    links: [
      { label: 'Live app', href: 'https://thecardscout.app' },
      { label: 'GitHub', href: 'https://github.com/boozinix' }
    ],
    metrics: [
      { value: '100+', label: 'Cards analyzed' },
      { value: '$2,500', label: 'Avg. annual value' },
      { value: '2 min', label: 'Research time' }
    ],
    description: 'Card Scout cuts through the complexity of 100+ credit cards to deliver personalized recommendations based on your actual spending patterns and financial goals. Using a structured database and intelligent calculators, it ranks cards by real expected value rather than flashy marketing bonuses, helping users maximize their rewards potential.',
    problem:
      'Consumers face analysis paralysis choosing among 100+ credit cards, often leaving thousands of dollars in rewards and benefits unused.',
    whyNow:
      'Issuers keep launching complex premium cards, while most comparison sites are affiliate-driven and generic, ignoring individual spending patterns.',
    solution:
      'Card Scout combines a 3-question preference quiz with a structured card database and calculators to rank cards based on real expected value, not just bonuses.',
    outcomes: [
      'Cuts research time from hours of blog reading to a 2-minute flow.',
      'Surfaces card combinations worth hundreds to thousands of dollars a year in net rewards for typical users.',
      'Makes tradeoffs transparent via value calculators and clear explanation of why each card is recommended.'
    ],
    responsibilities: [
      'Designed the core decision model and UX for quiz → recommendations.',
      'Built a web-crawler to keep card data (fees, multipliers, perks) fresh.',
      'Implemented calculators for net annual value and signup bonus planning.',
      'Continuously refined copy and ranking logic based on test users.'
    ],
    architecture: {
      overview:
        'Card Scout separates data collection, valuation logic, and the user-facing quiz into distinct layers, making it easy to extend to new issuers or geos.',
      bullets: [
        'Data Pipeline: Playwright-based crawler pulls card terms from issuer sites into a structured JSON/DB schema.',
        'Valuation Engine: pure TypeScript functions compute expected value from spend profile, multipliers, and perk valuations.',
        'Recommendation Engine: scores each card (and multi-card combos) against user goals and constraints.',
        'Front-end Quiz: 3-step flow collects priorities and constraints (spend, travel vs cashback, tolerance for annual fees).',
        'Results UI: ranks cards with explanation, key perks, and deep links to further calculators.'
      ]
    }
  }
};