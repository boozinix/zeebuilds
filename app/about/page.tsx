'use client';

import Link from 'next/link';
import Image from 'next/image';
import { 
  User, 
  Lightbulb, 
  Code2, 
  Target, 
  Briefcase, 
  Download, 
  Mail,
  Sparkles,
  TrendingUp,
  Rocket
} from 'lucide-react';

export default function AboutPage() {
  const skills = [
    {
      title: 'Product',
      icon: Lightbulb,
      color: 'from-sky-500 to-sky-600',
      items: [
        'Problem discovery & validation',
        'Product strategy & roadmapping',
        'User research & feedback loops',
        'Metrics & success criteria',
        'Go-to-market planning'
      ]
    },
    {
      title: 'Technical',
      icon: Code2,
      color: 'from-violet-500 to-violet-600',
      items: [
        'TypeScript & Next.js',
        'AI/LLM integration (OpenAI, Anthropic)',
        'Web scraping & data pipelines',
        'Database design (Postgres, JSON)',
        'Deployment & DevOps (Vercel, AWS)'
      ]
    },
    {
      title: 'Domain',
      icon: Target,
      color: 'from-fuchsia-500 to-fuchsia-600',
      items: [
        'Fintech & rewards optimization',
        'Job search & career tools',
        'AI-powered workflows',
        'Consumer product strategy',
        'B2C growth & retention'
      ]
    }
  ];

  const experiences = [
    {
      title: 'AWS',
      role: 'Senior Partner Manager',
      period: 'May 2025 – Present',
      description: 'Led product strategy for AWS Marketplace partnerships, driving 157% revenue growth ($84M → $216M) and improving customer retention by 20% through a new License Switching feature.',
      icon: Briefcase,
      color: 'from-emerald-500 to-emerald-600',
      logo: '/aws.svg.png'
    },
    {
      title: 'Meta',
      role: 'Product Manager, Infrastructure & Data Centers',
      period: 'Jun 2024 – Apr 2025',
      description: 'Owned the Digital Twin platform for AI data centers — redesigned the UI (60% adoption increase), cut costs by $250M per region, and shipped two 0→1 tools including an ML-enabled alerting system.',
      icon: Briefcase,
      color: 'from-sky-500 to-sky-600',
      logo: '/meta.png'
    },
    {
      title: 'Zoox',
      role: 'Senior Technical Product Manager',
      period: 'Feb 2022 – Jun 2024',
      description: 'Built 0→1 robotaxi tools including remote diagnostics, autonomous braking, and a 3D rider visualization app, while cutting ML infrastructure costs by 25% across 200+ engineers.',
      icon: Briefcase,
      color: 'from-violet-500 to-violet-600',
      logo: '/zoox.png'
    },
    {
      title: 'Apple',
      role: 'Product Design Lead',
      period: 'May 2015 – Feb 2022',
      description: 'Led NPI programs for four iPhone generations and Vision Pro\'s 4K display testing line. Built Apple\'s first OLED chip-level testing platform, improving yield by 50% and securing $2M in investment.',
      icon: Rocket,
      color: 'from-fuchsia-500 to-fuchsia-600',
      logo: '/apple.png'
    }
  ];

  return (
    <div className="mx-auto max-w-4xl px-4 pb-12 pt-8 sm:pb-16 sm:pt-12">
      <header className="mb-8 sm:mb-12">
        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 to-violet-500 sm:h-12 sm:w-12">
            <User className="h-5 w-5 text-white sm:h-6 sm:w-6" />
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-50 sm:text-3xl sm:text-4xl">
            About
          </h1>
        </div>
      </header>

      {/* Narrative: who you are → what you've shipped → what's next */}
      <section className="mb-8 rounded-xl border border-slate-800 bg-gradient-to-br from-slate-900/80 to-slate-950/80 p-5 backdrop-blur sm:mb-12 sm:rounded-2xl sm:p-6 lg:p-8">
        <div className="space-y-3 text-sm text-slate-300 leading-relaxed sm:space-y-4 sm:text-base">
          <p>
            I'm obsessed with AI-powered consumer products that solve real problems—especially in careers and fintech. I'd rather de‑risk ideas by shipping than by deck. That means going from problem to prototype to production myself, so I can speak from experience when I lead product: I've felt the tradeoffs, the latency, and the joy of watching something work in users' hands.
          </p>
          <p>
            ApplyStudio and Card Scout are the proof. I identified both problems from my own experience, validated them with others, then built and launched the full stack—product, UX, and backend. I learned how fast you can iterate when you own the whole loop: discovery, hypothesis, build, ship, learn. That PM arc—problem, insight, decision, outcome—is what I care about, whether I'm building solo or with a team.
          </p>
          <p>
            I'm looking for my next AI PM role at a company that ships. I want to own a product or area where AI is central to the value proposition, and where I can combine product sense with hands-on building. I'm also open to product collaboration and advisory work for teams betting on AI-powered consumer or fintech products.
          </p>
        </div>
      </section>

      {/* Skills */}
      <section className="mb-8 sm:mb-12">
        <div className="mb-4 sm:mb-6">
          <h2 className="text-lg font-semibold text-slate-100 flex items-center gap-2 sm:text-xl">
            <Sparkles className="h-4 w-4 text-sky-400 sm:h-5 sm:w-5" />
            Skills
          </h2>
        </div>
        <div className="grid gap-4 sm:gap-6 md:grid-cols-3">
          {skills.map((skill) => (
            <div
              key={skill.title}
              className="group rounded-xl border border-slate-800 bg-slate-950/60 p-4 hover:border-sky-500/50 transition-all hover:-translate-y-1 sm:p-6"
            >
              <div className="mb-3 flex items-center gap-3 sm:mb-4">
                <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${skill.color} sm:h-10 sm:w-10`}>
                  <skill.icon className="h-4 w-4 text-white sm:h-5 sm:w-5" />
                </div>
                <h3 className="text-sm font-semibold text-sky-300">
                  {skill.title}
                </h3>
              </div>
              <ul className="space-y-2 text-xs text-slate-300 sm:space-y-2.5 sm:text-sm">
                {skill.items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="mt-1.5 flex h-1.5 w-1.5 shrink-0 rounded-full bg-sky-400" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Experience */}
      <section className="mb-8 sm:mb-12">
        <div className="mb-4 sm:mb-6">
          <h2 className="text-lg font-semibold text-slate-100 flex items-center gap-2 sm:text-xl">
            <TrendingUp className="h-4 w-4 text-violet-400 sm:h-5 sm:w-5" />
            Experience
          </h2>
        </div>
        <div className="space-y-4 sm:space-y-6">
          {experiences.map((exp) => (
            <div
              key={exp.title}
              className="group rounded-xl border border-slate-800 bg-slate-950/60 p-4 hover:border-sky-500/50 transition-all hover:translate-x-1 sm:p-6"
            >
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="relative mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-slate-800 sm:mt-1 sm:h-12 sm:w-12">
                  {'logo' in exp && exp.logo ? (
                    <Image
                      src={exp.logo}
                      alt={`${exp.title} logo`}
                      fill
                      className="object-contain p-1"
                      sizes="48px"
                    />
                  ) : (
                    <exp.icon className="h-5 w-5 text-white sm:h-6 sm:w-6" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:mb-2">
                    <h3 className="text-sm font-semibold text-slate-100 sm:text-base">
                      {exp.title}
                    </h3>
                    <span className="inline-flex items-center gap-2 text-xs text-slate-400 sm:text-sm">
                      <div className="h-1 w-1 shrink-0 rounded-full bg-sky-400" />
                      {exp.period}
                    </span>
                  </div>
                  <p className="text-xs text-sky-300 mb-2 font-medium sm:mb-3 sm:text-sm">
                    {exp.role}
                  </p>
                  <p className="text-xs text-slate-400 leading-relaxed sm:text-sm">
                    {exp.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Resume & Contact */}
      <section className="relative overflow-hidden rounded-xl border border-slate-800 bg-gradient-to-br from-slate-900/50 via-slate-800/30 to-slate-950/50 p-5 text-center backdrop-blur sm:rounded-2xl sm:p-6 lg:p-8">
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-sky-500/10 via-violet-500/10 to-fuchsia-500/10 animate-gradient opacity-50" />
        
        <div className="relative">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-sky-500 to-violet-500 mb-3 sm:mb-4 sm:h-16 sm:w-16">
            <Sparkles className="h-6 w-6 text-white sm:h-8 sm:w-8" />
          </div>
          <h2 className="text-lg font-semibold text-slate-100 mb-1 sm:mb-2 sm:text-xl">
            Let's work together
          </h2>
          <p className="text-xs text-slate-300 mb-4 max-w-md mx-auto sm:mb-6 sm:text-sm">
            Actively looking for full-time AI PM roles. Let's talk.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-4">
            <a
              href="/resume.pdf"
              className="group inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-slate-600 bg-slate-900/50 px-5 py-3 text-sm font-medium text-slate-300 backdrop-blur hover:border-slate-500 hover:text-slate-200 hover:bg-slate-800/50 active:scale-[0.98] transition-all sm:min-h-0 sm:px-6"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Download className="h-4 w-4 group-hover:translate-y-0.5 transition-transform" />
              Download resume
            </a>
            <Link
              href="/contact"
              className="group inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-gradient-to-r from-sky-500 to-violet-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-500/25 hover:shadow-xl hover:shadow-sky-500/40 active:scale-[0.98] transition-all sm:min-h-0 sm:px-6"
            >
              <Mail className="h-4 w-4 group-hover:rotate-12 transition-transform" />
              Open to AI PM roles — let's talk
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}