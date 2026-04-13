// lib/projects.ts
export type ProjectId = 'apply-studio' | 'card-scout' | 'neural-mob';

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
  screenshot?: string;
  screenshots?: string[];   // multiple images for the carousel; falls back to [screenshot]
  impact?: string;
  whyItMatters?: string;    // recruiter-facing one-liner on outcome
  keyResult?: string;       // consistent impact line surfaced on cards
};

/** Hostname for mock browser chrome on work cards (from live URL). */
export function projectPreviewHost(project: Project): string {
  const link =
    project.links.find((l) => /live|app|site/i.test(l.label)) ?? project.links[0];
  if (!link?.href) return '';
  try {
    return new URL(link.href).hostname.replace(/^www\./, '');
  } catch {
    return '';
  }
}

export const projects: Record<ProjectId, Project> = {
  'apply-studio': {
    id: 'apply-studio',
    name: 'ApplyStudio',
    tagline: 'AI job application platform — from job post to tailored resume in under 90 seconds.',
    role: 'Product Manager & Solo Builder',
    timeframe: '2026 – Present',
    stack: [
      'Next.js',
      'TypeScript',
      'Vercel',
      'Multi-agent AI',
      'LLM APIs (OpenAI, Anthropic, Google Gemini)',
      'GPT-5.1'
    ],
    links: [
      { label: 'Live app', href: 'https://applystudio.net' },
      { label: 'GitHub', href: 'https://github.com/boozinix' }
    ],
    screenshot: '/screenshots/apply-studio.jpg',
    screenshots: [
      '/screenshots/apply-studio.jpg',
      '/screenshots/apply-studio-1.jpg',
      '/screenshots/apply-studio-2.jpg',
      '/screenshots/apply-studio-3.jpg',
      '/screenshots/apply-studio-4.jpg',
      '/screenshots/apply-studio-5.jpg',
    ],
    impact: '20+ tailored resumes in under an hour',
    whyItMatters: 'Cuts time-to-apply by 80% — job seekers go from hours of manual work to a tailored application in 90 seconds.',
    keyResult: 'Users generate 20+ tailored resumes per hour on average',
    metrics: [
      { value: '20+', label: 'Jobs processed simultaneously' },
      { value: '<90s', label: 'Per-application time' },
      { value: 'Real-time', label: 'ATS fit scoring' }
    ],
    description:
      'ApplyStudio is a full-stack job application platform that replaces hours of manual work with a multi-agent AI workflow wired to leading LLM APIs (OpenAI, Anthropic, Google Gemini). It scrapes job postings, tailors resumes bullet-by-bullet, generates cover letters and application answers, and scores ATS fit across 20+ simultaneous jobs — giving candidates full control over every output.',
    problem:
      'Modern job applications require keyword-matched resumes, tailored cover letters, and custom answers for every role. Doing this manually takes 2–4 hours per application. Most candidates either apply generically and lose, or spend days on a handful of jobs. Neither approach works at the velocity today\'s market demands.',
    whyNow:
      'GPT-5.1 and multi-agent orchestration make it possible to parallelize complex rewriting tasks across dozens of job postings at once, compressing what used to take days into minutes.',
    solution:
      'The real bottleneck isn\'t writing quality — it\'s throughput. A well-structured prompt pipeline can parallelize tailoring across 20+ jobs simultaneously without losing the candidate\'s authentic voice. The key insight: treat the resume as a structured data object, not a document, and let AI operate on fields — not prose.',
    outcomes: [
      '20+ tailored applications generated in under one hour.',
      'Per-application time reduced from ~3 hours to under 90 seconds.',
      'ATS keyword coverage surfaced before submission.',
      'Built and shipped solo in under 6 weeks.'
    ],
    responsibilities: [
      'Built in-house web scraper extracting job descriptions, requirements, and application questions.',
      'Designed multi-agent AI workflow across OpenAI, Anthropic, and Google Gemini (including GPT-5.1) for resume tailoring with bullet-by-bullet accept/edit/reject UI.',
      'Implemented cover letter generation and application question answering at scale.',
      'Built real-time job fit scoring engine combining ATS keyword matching, skill gap analysis, and ranking algorithms.',
      'Owned full product lifecycle: problem discovery, UX design, full-stack development, and iterative launch.'
    ],
    architecture: {
      overview:
        'ApplyStudio ingests job postings via an in-house scraper that outperforms third-party tools on difficult sites. It then runs parallel AI agents per job — one for resume tailoring, one for cover letter generation, one for custom application Q&A. Everything surfaces in a bullet-by-bullet accept/edit/reject UI that keeps the user in control of their voice while eliminating the manual grind. ATS fit scores are surfaced in real-time so users can fix gaps before submitting.',
      bullets: [
        'Scraping Layer: in-house crawler outperforms commercial solutions on difficult job sites, extracting descriptions, requirements, and application questions.',
        'Multi-agent AI Orchestration: agents backed by OpenAI, Anthropic, and Google Gemini (including GPT-5.1) run in parallel — one per job — for resume tailoring, cover letters, and application Q&A.',
        'Bullet-by-Bullet UI: accept/edit/reject interface gives users granular control over every AI-rewritten resume bullet.',
        'ATS Scoring Engine: real-time keyword matching, skill gap analysis, and ranking across 20+ jobs simultaneously.',
        'Local Persistence: draft state and preferences are persisted locally to support non-linear application workflows.'
      ]
    }
  },
  'neural-mob': {
    id: 'neural-mob',
    name: 'Neural Mob',
    tagline: 'Multi-agent AI debate engine — adversarial reasoning that surfaces better answers than any single model alone.',
    role: 'Product Manager & Solo Builder',
    timeframe: '2026 – Present',
    stack: ['Next.js', 'TypeScript', 'Vercel', 'Multi-agent AI', 'GPT-5', 'Claude'],
    links: [{ label: 'Live site', href: 'https://neuralmob.xyz/' }],
    screenshot: '/screenshots/neural-mob.jpg',
    screenshots: ['/screenshots/neural-mob.jpg'],
    impact: 'Multi-agent adversarial reasoning engine',
    whyItMatters: 'Proves the core AI PM skill — multi-agent orchestration, scoring non-deterministic outputs, building trust through transparency.',
    keyResult: 'N agents debate in parallel; scored reasoning surfaces the strongest answer',
    metrics: [
      { value: 'N agents', label: 'Parallel model debate' },
      { value: 'Scored', label: 'Reasoning traces ranked' },
      { value: 'Live', label: 'Production deployed' }
    ],
    description:
      'A multi-agent AI debate engine — multiple models argue a question, score each other, and surface the strongest answer.',
    problem:
      'Single AI models optimize for plausibility, not correctness. When one model answers a hard question, there\'s no forcing function — no alternative framing, no adversarial pressure. The result is confident-sounding answers that can be subtly wrong. The insight: structured disagreement produces better outputs than consensus.',
    whyNow:
      'Multi-agent debate is a known research technique, but it\'s rarely productized in a way that\'s transparent to the user. The tools now exist to route queries to multiple models in parallel, collect structured outputs, and score reasoning quality at production speed.',
    solution:
      'Multi-agent debate is a known research technique, but it\'s rarely productized in a way that\'s transparent to the user. The core mechanic: route a query to N agents with different system prompts and model priors, collect structured outputs, run a scoring pass that evaluates reasoning quality (not just fluency), and surface the ranked results with reasoning traces visible. Think of it as a debate club — bring three smart people with different priors into a room, let them argue, keep the winner.',
    outcomes: [
      'Neural Mob demonstrates the core skill of multi-agent AI product design: defining agent roles, handling failure modes, scoring non-deterministic outputs, and presenting complex AI behavior in a way that feels trustworthy.',
      'Built and deployed solo.'
    ],
    responsibilities: [
      'Defined agent roles, system prompts, and model assignments for parallel debate routing.',
      'Implemented scoring agent that evaluates reasoning quality — penalizing hedging, rewarding specificity.',
      'Built result surface with full attribution and reasoning traces so users can understand why a response won.',
      'Deployed and iterated on performance and reliability of non-deterministic multi-model outputs.'
    ],
    architecture: {
      overview:
        'Neural Mob is a multi-agent orchestration layer built on Next.js and TypeScript. A user submits a question or prompt. The system routes it to multiple AI agents (each with distinct instructions and model assignments) in parallel. Each agent produces a structured response with a reasoning trace. A scoring agent evaluates outputs against a rubric — penalizing hedging, rewarding specificity — and ranks them. The winning response is surfaced with full attribution, so the user can trace why it won.',
      bullets: [
        'Agent Router: distributes each query to N agents with distinct system prompts and model assignments simultaneously.',
        'Structured Output Layer: each agent returns a response plus a reasoning trace in a consistent schema.',
        'Scoring Agent: evaluates all responses against a rubric — penalizes vagueness, rewards specificity and evidence.',
        'Result Surface: ranked responses with visible attribution and reasoning traces for user transparency.',
        'Failure Handling: graceful degradation when individual agents time out or return malformed outputs.'
      ]
    }
  },
  'card-scout': {
    id: 'card-scout',
    name: 'Card Scout',
    tagline: 'AI-powered credit card optimization — real math on your real spending, not affiliate rankings.',
    role: 'Product Manager & Solo Builder',
    timeframe: '2026 – Present',
    stack: ['Next.js', 'TypeScript', 'Vercel', 'GPT-5', 'Claude', 'DeepSeek', 'Postgres'],
    links: [
      { label: 'Live app', href: 'https://thecardscout.app' },
      { label: 'GitHub', href: 'https://github.com/boozinix/the-card-scout' }
    ],
    screenshot: '/screenshots/card-scout.jpg',
    screenshots: [
      '/screenshots/card-scout.jpg',
      '/screenshots/card-scout-1.jpg',
      '/screenshots/card-scout-2.jpg',
      '/screenshots/card-scout-3.jpg',
      '/screenshots/card-scout-4.jpg',
    ],
    impact: 'Surfaces $2,500+ in annual rewards per user',
    whyItMatters: 'Surfaces $2,500+ in unclaimed rewards per session — real personalized math, not affiliate-ranked noise.',
    keyResult: 'Average session surfaces $2,500+ in net annual card value',
    metrics: [
      { value: '100+', label: 'Cards analyzed' },
      { value: '$2,500+', label: 'Avg. annual value surfaced' },
      { value: '2 min', label: 'Research time' }
    ],
    description: 'Card Scout cuts through the complexity of 100+ credit cards using multi-model AI orchestration (GPT-5, Claude, DeepSeek) and automated data ingestion pipelines with bank-specific crawlers. A guided workflow UX with autocomplete and local persistence delivers personalized recommendations ranked by real expected value — not affiliate-driven marketing bonuses.',
    problem:
      'The average American leaves $1,500–$3,000 in credit card rewards unclaimed every year — not from lack of interest, but from information asymmetry. Most comparison sites are revenue-optimized for the banks, not the user. They surface the cards with the highest affiliate payouts, not the highest actual value for a given spending profile. The result: most people are holding the wrong cards.',
    whyNow:
      'Multi-model LLM orchestration now makes it possible to combine structured valuation logic with AI reasoning to personalize recommendations at a level no static comparison site can match.',
    solution:
      'Reward optimization is a valuation problem, not a search problem. The right approach: collect a spend profile, model expected annual value across 100+ cards, then layer multi-model AI reasoning to handle nuance (e.g., travel card vs. cashback tradeoffs, sign-on bonus timing, category caps). The math has to be transparent and auditable — users don\'t trust black boxes with their money.',
    outcomes: [
      'Research time reduced from hours to under 2 minutes.',
      'Average session surfaces $2,500+ in net annual value.',
      '100+ cards analyzed per session.',
      'Multi-model AI ensures recommendations hold up under different reasoning approaches. Built and shipped solo.'
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
        'Card Scout collects your spending profile through a guided quiz, runs a TypeScript valuation engine that computes expected annual value per card and per card combination, then uses multi-model AI orchestration (GPT-5, Claude, DeepSeek) for recommendation reasoning. Bank-specific Playwright crawlers keep card data, APRs, and bonus structures fresh automatically — no stale affiliate data. Results are surfaced as a ranked list with transparent earnings breakdowns, not just a winner card.',
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
