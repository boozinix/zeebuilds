// lib/projects.ts
export type ProjectId = 'apply-studio' | 'card-scout';

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
  'apply-studio': {
    id: 'apply-studio',
    name: 'ApplyStudio',
    tagline: 'AI-powered job application platform: resume tailoring, cover letters, ATS scoring — across 20+ jobs at once.',
    role: 'Product Manager & Solo Builder',
    timeframe: '2024 – Present',
    stack: ['Next.js', 'TypeScript', 'Vercel', 'GPT-5.1', 'Multi-agent AI'],
    links: [
      { label: 'Live app', href: 'https://applystudio.app' },
      { label: 'GitHub', href: 'https://github.com/boozinix' }
    ],
    metrics: [
      { value: '20+', label: 'Jobs processed simultaneously' },
      { value: '20%', label: 'Faster than ScrapingBee' },
      { value: 'Real-time', label: 'ATS fit scoring' }
    ],
    description: 'ApplyStudio is a full-stack job application platform that replaces hours of manual work with a multi-agent AI workflow. It scrapes job postings, tailors resumes bullet-by-bullet, generates cover letters and application answers, and scores ATS fit across 20+ simultaneous jobs — giving candidates full control over every output.',
    problem:
      'Job seekers spend hours per application customizing resumes, writing cover letters, and answering application questions — all manually, for each role — while still missing ATS keywords that filter them out.',
    whyNow:
      'GPT-5.1 and multi-agent orchestration make it possible to parallelize complex rewriting tasks across dozens of job postings at once, compressing what used to take days into minutes.',
    solution:
      'ApplyStudio built an in-house job scraper outperforming commercial solutions, then layered a multi-agent AI workflow for resume tailoring (bullet-by-bullet accept/edit/reject UI), cover letter generation, application Q&A, and comprehensive ATS scoring — all running in parallel across 20+ jobs.',
    outcomes: [
      'Scraped job descriptions more accurately than ScrapingBee (20% improvement on difficult sites).',
      'Enabled candidates to process 20+ simultaneous job postings with full AI-tailored applications.',
      'Reduced per-application work from hours to minutes while maintaining candidate voice and control.',
      'Real-time ATS fit scoring surfaces high-fit opportunities and surfaces skill gaps proactively.'
    ],
    responsibilities: [
      'Built in-house web scraper extracting job descriptions, requirements, and application questions.',
      'Designed multi-agent AI workflow using GPT-5.1 for resume tailoring with bullet-by-bullet accept/edit/reject UI.',
      'Implemented cover letter generation and application question answering at scale.',
      'Built real-time job fit scoring engine combining ATS keyword matching, skill gap analysis, and ranking algorithms.',
      'Owned full product lifecycle: problem discovery, UX design, full-stack development, and iterative launch.'
    ],
    architecture: {
      overview:
        'ApplyStudio separates job ingestion, AI orchestration, and user review into distinct layers — enabling parallel processing across dozens of jobs while keeping the human in control of every output.',
      bullets: [
        'Scraping Layer: in-house crawler outperforms commercial solutions on difficult job sites, extracting descriptions, requirements, and application questions.',
        'Multi-agent AI Orchestration: GPT-5.1 agents run in parallel — one per job — for resume tailoring, cover letters, and application Q&A.',
        'Bullet-by-Bullet UI: accept/edit/reject interface gives users granular control over every AI-rewritten resume bullet.',
        'ATS Scoring Engine: real-time keyword matching, skill gap analysis, and ranking across 20+ jobs simultaneously.',
        'Local Persistence: draft state and preferences are persisted locally to support non-linear application workflows.'
      ]
    }
  },
  'card-scout': {
    id: 'card-scout',
    name: 'Card Scout',
    tagline: 'AI-assisted credit card discovery with multi-model recommendations and automated data ingestion.',
    role: 'Product Manager & Solo Builder',
    timeframe: '2024 – Present',
    stack: ['Next.js', 'TypeScript', 'Vercel', 'GPT-5', 'Claude', 'DeepSeek', 'Postgres'],
    links: [
      { label: 'Live app', href: 'https://thecardscout.app' },
      { label: 'GitHub', href: 'https://github.com/boozinix' }
    ],
    metrics: [
      { value: '100+', label: 'Cards analyzed' },
      { value: '$2,500', label: 'Avg. annual value' },
      { value: '2 min', label: 'Research time' }
    ],
    description: 'Card Scout cuts through the complexity of 100+ credit cards using multi-model AI orchestration (GPT-5, Claude, DeepSeek) and automated data ingestion pipelines with bank-specific crawlers. A guided workflow UX with autocomplete and local persistence delivers personalized recommendations ranked by real expected value — not affiliate-driven marketing bonuses.',
    problem:
      'Consumers face analysis paralysis choosing among 100+ credit cards, leaving thousands of dollars in rewards unused — while most comparison sites are affiliate-driven and ignore individual spending patterns.',
    whyNow:
      'Multi-model LLM orchestration now makes it possible to combine structured valuation logic with AI reasoning to personalize recommendations at a level no static comparison site can match.',
    solution:
      'Card Scout combines multi-model AI orchestration (GPT-5, Claude, DeepSeek) with automated data ingestion using bank-specific crawlers, a guided quiz UX, and a valuation engine that ranks cards by real expected annual value for your specific spending profile.',
    outcomes: [
      'Cuts card research time from hours to under 2 minutes.',
      'Surfaces card combinations worth hundreds to thousands of dollars annually in net rewards.',
      'Multi-model orchestration improves recommendation quality by leveraging model-specific strengths.',
      'SEO-optimized architecture for issuer rules, transfer partners, and calculator pages drives organic discovery.'
    ],
    responsibilities: [
      'Built automated data ingestion pipelines using bank-specific crawlers with validation scripts to keep card data fresh.',
      'Implemented multi-model orchestration (GPT-5, Claude, DeepSeek) for recommendation quality.',
      'Designed guided workflow UX with autocomplete, local persistence, and mobile-first principles.',
      'Built valuation engine computing expected annual value from spend profile, multipliers, and perk valuations.',
      'Implemented SEO-optimized architecture for issuer rules, transfer partners, and calculator pages.'
    ],
    architecture: {
      overview:
        'Card Scout separates data ingestion, valuation logic, multi-model AI orchestration, and the user-facing quiz into distinct layers — making it easy to extend to new issuers or geographies.',
      bullets: [
        'Data Pipeline: bank-specific Playwright crawlers with validation scripts pull card terms into a structured Postgres schema.',
        'Multi-model Orchestration: GPT-5, Claude, and DeepSeek used in combination for recommendation reasoning and explanation.',
        'Valuation Engine: pure TypeScript functions compute expected annual value from spend profile, multipliers, and perk valuations.',
        'Guided Quiz UX: autocomplete-enabled flow collects priorities and constraints with local persistence for non-linear sessions.',
        'SEO Architecture: dedicated pages for issuer rules, transfer partners, and calculators optimized for organic discovery.'
      ]
    }
  }
};
