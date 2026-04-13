'use client';

import React, { useState } from 'react';
import { projects, ProjectId } from '@/lib/projects';
import Link from 'next/link';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { Reveal } from '@/components/Reveal';

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

/* ── Chapter accent colours ────────────────────────────────────── */
const CHAPTER_CONFIG = [
  { num: '01', label: 'The Problem',      accent: 'text-amber-400',   bar: 'bg-amber-400/50'   },
  { num: '02', label: 'Insight & Approach', accent: 'text-sky-400',   bar: 'bg-sky-400/50'     },
  { num: '03', label: 'What I Built',     accent: 'text-violet-400',  bar: 'bg-violet-400/50'  },
  { num: '04', label: 'Results',          accent: 'text-emerald-400', bar: 'bg-emerald-400/50' },
] as const;

export default function ProjectPage({ params }: ProjectPageProps) {
  const [slug, setSlug] = useState<string>('');

  React.useEffect(() => {
    params.then(p => setSlug(p.slug));
  }, [params]);

  const project = slug ? projects[slug as ProjectId] : null;

  /* Loading state */
  if (!slug) {
    return <div className="min-h-screen" />;
  }

  /* Not found */
  if (!project) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-20 text-center">
        <h1 className="font-display text-3xl text-zinc-50 mb-6">Project not found</h1>
        <Link href="/work" className="font-mono text-xs uppercase tracking-widest text-zinc-500 hover:text-sky-400 transition-colors">
          ← Back to work
        </Link>
      </div>
    );
  }

  /* Chapter content definitions */
  const chapters = [
    {
      ...CHAPTER_CONFIG[0],
      body:    project.problem,
      note:    project.whyNow ? `Why now — ${project.whyNow}` : null,
      bullets: null,
    },
    {
      ...CHAPTER_CONFIG[1],
      body:    project.solution,
      note:    null,
      bullets: project.responsibilities.slice(0, 3),
    },
    {
      ...CHAPTER_CONFIG[2],
      body:    project.architecture.overview,
      note:    null,
      bullets: project.architecture.bullets,
    },
    {
      ...CHAPTER_CONFIG[3],
      body:    null,
      note:    null,
      bullets: project.outcomes,
    },
  ];

  return (
    <div className="mx-auto max-w-3xl px-4 pb-24 pt-12 sm:pt-16">

      {/* ── BACK ─────────────────────────────────────────────── */}
      <Link
        href="/work"
        className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-slate-300 hover:text-sky-400 transition-colors duration-200 mb-14 min-h-[44px]"
      >
        <ArrowLeft className="h-3 w-3" />
        Work
      </Link>

      {/* ── HEADER ───────────────────────────────────────────── */}
      <Reveal>
        <div className="mb-12 sm:mb-16">
          <div className="flex items-center gap-2.5 mb-5">
            <span aria-hidden="true" className="relative flex h-2 w-2 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-sky-400" />
            </span>
            <span className="font-mono text-xs uppercase tracking-[0.18em] text-slate-300">
              Live · {project.timeframe} · {project.role}
            </span>
          </div>

          <h1 className="font-display font-black text-white mb-4 leading-tight text-[clamp(2.5rem,8vw,4.5rem)]">
            {project.name}
          </h1>

          <p className="text-zinc-300 leading-relaxed max-w-2xl text-base sm:text-lg lg:text-xl">
            {project.tagline}
          </p>

          <div className="flex flex-wrap gap-3 mt-7">
            {project.links.map(link => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.15em] border-2 border-slate-600 text-slate-200 px-4 py-2.5 rounded-md hover:border-sky-500/60 hover:text-sky-400 transition-all duration-200 min-h-[44px]"
              >
                <ExternalLink className="h-3 w-3" />
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </Reveal>

      {/* ── METRICS ──────────────────────────────────────────── */}
      {project.metrics && project.metrics.length > 0 && (
        <Reveal delay={0.05}>
          <div className="grid grid-cols-3 gap-px bg-slate-700/50 rounded-xl overflow-hidden mb-16 sm:mb-20">
            {project.metrics.map(metric => (
              <div key={metric.label} className="bg-slate-900 px-4 py-6 text-center sm:px-6 sm:py-8">
                <p className="font-display font-black text-sky-400 leading-none mb-2 text-2xl sm:text-4xl">
                  {metric.value}
                </p>
                <p className="font-mono text-xs uppercase tracking-[0.12em] text-slate-300 leading-tight mt-2">
                  {metric.label}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      )}

      {/* ── CHAPTERS ─────────────────────────────────────────── */}
      <div className="space-y-16 sm:space-y-20">
        {chapters.map((ch) => (
          <Reveal key={ch.num} delay={0.04}>
            <div>
              {/* Chapter heading */}
              <div className="flex items-center gap-3 mb-6">
                <span className={`font-mono text-xs uppercase tracking-[0.2em] shrink-0 font-medium ${ch.accent}`}>
                  {ch.num}
                </span>
                <div className="flex-1 h-px bg-slate-800" />
                <span className="font-mono text-xs uppercase tracking-[0.15em] text-slate-300 shrink-0">
                  {ch.label}
                </span>
              </div>

              {/* Body text */}
              {ch.body && (
                <p className="text-slate-200 leading-relaxed mb-5 text-base sm:text-lg">
                  {ch.body}
                </p>
              )}

              {/* Side note */}
              {ch.note && (
                <p className="text-slate-400 text-sm leading-relaxed mb-5 border-l-2 border-slate-700 pl-4 italic">
                  {ch.note}
                </p>
              )}

              {/* Bullets */}
              {ch.bullets && ch.bullets.length > 0 && (
                <ul className="space-y-3.5">
                  {ch.bullets.map((bullet, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className={`mt-[9px] h-px w-5 shrink-0 ${ch.bar}`} />
                      <span className="text-slate-300 text-sm leading-relaxed sm:text-base">
                        {bullet}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </Reveal>
        ))}
      </div>

      {/* ── TECH STACK ───────────────────────────────────────── */}
      <Reveal>
        <div className="mt-16 pt-12 border-t border-slate-800/60 sm:mt-20">
          <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-slate-400 mb-5">
            Tech stack
          </h2>
          <div className="flex flex-wrap gap-2">
            {project.stack.map(tech => (
              <span
                key={tech}
                className="font-mono text-xs text-slate-300 border border-slate-600 px-3 py-1.5 rounded-sm hover:border-sky-500/50 hover:text-sky-300 transition-all duration-200"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </Reveal>
    </div>
  );
}
