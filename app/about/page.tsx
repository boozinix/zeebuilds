'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Download, Mail } from 'lucide-react';
import { Reveal } from '@/components/Reveal';

const experiences = [
  {
    year: '2025',
    company: 'AWS',
    role: 'Senior Partner Manager',
    period: 'May 2025 – Present',
    description:
      'Grew AWS Marketplace revenue 157% YoY ($84M → $216M) by launching CRM propensity-to-buy campaigns and a cash-back credits program. Improved customer retention 20% by shipping the License Switching feature end-to-end.',
    logo: '/aws.svg.png',
  },
  {
    year: '2024',
    company: 'Meta',
    role: 'PM, Infrastructure & Data Centers',
    period: 'Jun 2024 – Apr 2025',
    description:
      'Owned the Digital Twin platform for AI data center infrastructure. Redesigned the core UI (60% adoption increase), cut infrastructure costs by $250M per region, and shipped two 0→1 internal tools including an ML-enabled alerting system.',
    logo: '/meta.png',
  },
  {
    year: '2022',
    company: 'Zoox',
    role: 'Senior Technical Product Manager',
    period: 'Feb 2022 – Jun 2024',
    description:
      'Shipped autonomous emergency braking feature (40% ops cost reduction). Built 3D rider visualization app (30% trust increase). Cut ML infra costs 25% across 200+ engineers.',
    logo: '/zoox.png',
  },
  {
    year: '2015',
    company: 'Apple',
    role: 'Product Design Lead',
    period: 'May 2015 – Feb 2022',
    description:
      "Tech Lead across iPhone X, XS, 11, and 12. Built Apple's first OLED chip-level test platform (50% yield improvement), secured $2M in robotics investment, and led a cross-functional taskforce eliminating a defect that could have impacted 200K+ customers.",
    logo: '/apple.png',
  },
];

const skills = [
  'Problem discovery & validation',
  'Product strategy & roadmapping',
  'Consumer AI product strategy',
  'B2C growth & retention',
  'Multi-agent AI orchestration',
  'LLM APIs — OpenAI, Anthropic, Gemini',
  'AI dev tooling — Cursor, Claude, Codex',
  'TypeScript & Next.js',
  'Fintech & rewards optimization',
  'Vercel & AWS deployment',
  'Web scraping & data pipelines',
  'Postgres & database design',
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 pb-24 pt-16 sm:pt-24">

      {/* ── OPENING THESIS ───────────────────────────────────── */}
      <Reveal>
        <header className="mb-20 sm:mb-28">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-slate-500 mb-8">
            About
          </p>

          <h1 className="font-display font-black text-white leading-[1.05] text-balance text-[clamp(2rem,5vw,3.75rem)]">
            I've shipped AI products at four of the world's most demanding companies —
            <span className="text-sky-400"> and built three live consumer tools alone.</span>
          </h1>

          <div className="mt-10 space-y-5 max-w-2xl text-slate-300 leading-relaxed text-base sm:text-lg">
            <p>
              I'm a Senior AI Product Manager with a decade of experience at Apple,
              Zoox, Meta, and AWS. I don't just roadmap AI features — I write the
              prompts, build the pipelines, debug the edge cases, and talk to users.
            </p>
            <p>
              ApplyStudio, Card Scout, and Neural Mob aren't portfolio decoration.
              They have real users, real feedback loops, and real technical decisions
              I made and owned. That full-loop ownership — problem, insight, build,
              ship, learn — is what I bring to any AI PM role.
            </p>
          </div>
        </header>
      </Reveal>

      {/* ── EXPERIENCE TIMELINE ──────────────────────────────── */}
      <section className="mb-20 sm:mb-28">
        <Reveal>
          <h2 className="font-mono text-xs uppercase tracking-[0.22em] text-slate-500 mb-10">
            Experience
          </h2>
        </Reveal>

        <div className="divide-y divide-slate-800/50">
          {experiences.map((exp, i) => (
            <Reveal key={exp.company} delay={i * 0.04}>
              <div className="group grid grid-cols-[3rem_1fr] sm:grid-cols-[4rem_1fr] gap-4 sm:gap-8 py-8 hover:bg-slate-800/30 transition-colors duration-200 -mx-4 px-4 rounded">

                {/* Year */}
                <div className="pt-1 shrink-0">
                  <span className="font-mono text-xs text-slate-400">{exp.year}</span>
                </div>

                {/* Content */}
                <div>
                  <div className="flex items-start gap-3 mb-3">
                    {/* Logo */}
                    <div className="relative h-8 w-8 shrink-0 rounded bg-zinc-900 border border-slate-700 overflow-hidden mt-0.5">
                      <Image
                        src={exp.logo}
                        alt={`${exp.company} logo`}
                        fill
                        className="object-contain p-1"
                        sizes="32px"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-1">
                        <h3 className="font-display text-xl font-bold text-white group-hover:text-violet-400 transition-colors duration-200 sm:text-2xl">
                          {exp.company}
                        </h3>
                        <span className="font-mono text-xs text-slate-400 shrink-0">
                          {exp.period}
                        </span>
                      </div>
                      <p className="font-mono text-xs uppercase tracking-[0.15em] text-slate-500 mb-3">
                        {exp.role}
                      </p>
                      <p className="text-slate-300 text-sm leading-relaxed sm:text-base">
                        {exp.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── EDUCATION ────────────────────────────────────────── */}
      <section className="mb-20 sm:mb-28">
        <Reveal>
          <h2 className="font-mono text-xs uppercase tracking-[0.22em] text-slate-500 mb-10">
            Education
          </h2>
        </Reveal>

        <div className="divide-y divide-slate-800/50">
          <Reveal>
            <div className="group grid grid-cols-[3rem_1fr] sm:grid-cols-[4rem_1fr] gap-4 sm:gap-8 py-8 -mx-4 px-4 rounded">
              <div className="pt-1 shrink-0">
                <span className="font-mono text-xs text-slate-400">2020</span>
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-white sm:text-2xl">
                  UC Berkeley, Haas School of Business
                </h3>
                <p className="font-mono text-xs uppercase tracking-[0.15em] text-slate-500 mt-1">
                  MBA
                </p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.04}>
            <div className="group grid grid-cols-[3rem_1fr] sm:grid-cols-[4rem_1fr] gap-4 sm:gap-8 py-8 -mx-4 px-4 rounded">
              <div className="pt-1 shrink-0">
                <span className="font-mono text-xs text-slate-400">2015</span>
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-white sm:text-2xl">
                  University of Illinois Urbana-Champaign
                </h3>
                <p className="font-mono text-xs uppercase tracking-[0.15em] text-slate-500 mt-1">
                  MS, Mechanical Engineering
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── SKILLS ───────────────────────────────────────────── */}
      <section className="mb-20 sm:mb-28">
        <Reveal>
          <h2 className="font-mono text-xs uppercase tracking-[0.22em] text-slate-500 mb-6">
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {skills.map(skill => (
              <span
                key={skill}
                className="font-mono text-xs uppercase tracking-[0.1em] text-slate-300 border border-slate-700 px-3 py-1.5 rounded-sm hover:border-sky-500/50 hover:text-sky-300 transition-all duration-200 cursor-default"
              >
                {skill}
              </span>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <Reveal>
        <div className="border-t border-slate-700/50 pt-12">
          <h2 className="font-display text-2xl font-bold text-white mb-3 sm:text-3xl">
            Looking for my next role.
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed mb-8 max-w-md">
            Actively interviewing for Senior/Staff AI PM roles. Open to SF Bay Area or remote.
            Available within 2–4 weeks.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-white text-slate-950 px-6 py-3 rounded-md font-semibold text-sm hover:bg-slate-100 transition-colors duration-200 min-h-[48px]"
            >
              <Mail className="h-4 w-4" />
              Get in touch
            </Link>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 font-mono text-xs uppercase tracking-[0.15em] text-slate-300 border-2 border-slate-600 px-5 py-3 rounded-md hover:border-slate-400 hover:text-white transition-all duration-200 min-h-[48px]"
            >
              <Download className="h-3.5 w-3.5" />
              Resume PDF
            </a>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
