'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { projects, Project } from '@/lib/projects';
import { ArrowRight, Briefcase } from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import { ImageCarousel } from '@/components/ImageCarousel';

const allProjects = Object.values(projects);
const categories = ['All', 'AI Tools', 'Fintech', 'Career Tools'] as const;

function filterProjects(list: Project[], filter: string): Project[] {
  if (filter === 'All') return list;
  if (filter === 'AI Tools')    return list.filter(p => p.id === 'apply-studio' || p.id === 'neural-mob');
  if (filter === 'Fintech')     return list.filter(p => p.id === 'card-scout');
  if (filter === 'Career Tools') return list.filter(p => p.id === 'apply-studio');
  return list;
}

/* ── Thumbnail used in catalog rows ───────────────────────────── */
function RowThumb({ src, alt }: { src: string; alt: string }) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError]   = useState(false);
  if (error) return <div className="h-full w-full bg-zinc-900 rounded-sm" />;
  return (
    <div className="relative h-full w-full overflow-hidden rounded-sm">
      {!loaded && <div className="absolute inset-0 bg-zinc-900 animate-pulse" />}
      <Image
        src={src}
        alt={alt}
        fill
        className={`object-cover object-top transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        sizes="80px"
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
      />
    </div>
  );
}

/* ── Featured hero image ───────────────────────────────────────── */
function FeaturedImage({ src, alt }: { src: string; alt: string }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className="relative h-full w-full overflow-hidden">
      {!loaded && <div className="absolute inset-0 bg-zinc-900" />}
      <Image
        src={src}
        alt={alt}
        fill
        className={`object-cover object-top transition-all duration-700 group-hover:scale-[1.03] ${loaded ? 'opacity-100' : 'opacity-0'}`}
        sizes="100vw"
        priority
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}

/* ── Page ──────────────────────────────────────────────────────── */
export default function WorkPage() {
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const filtered  = filterProjects(allProjects, activeFilter);
  const featured  = allProjects[0]; // ApplyStudio

  return (
    <div className="mx-auto max-w-6xl px-4 pb-24 pt-16 sm:pt-24">

      {/* ── HEADER ───────────────────────────────────────────── */}
      <Reveal>
        <div className="flex items-center justify-between mb-14 sm:mb-20">
          <h1 className="font-display font-black leading-none text-[clamp(2.5rem,8vw,5rem)] flex items-center gap-3 sm:gap-4">
            <Briefcase
              className="h-[0.85em] w-[0.85em] shrink-0"
              style={{ color: '#38bdf8' }}
              strokeWidth={2.5}
            />
            <span className="text-white">My</span>{' '}
            <span
              style={{
                background: 'linear-gradient(90deg, #38bdf8, #a78bfa)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Work
            </span>
          </h1>
          <span className="font-mono text-slate-600 text-base sm:text-xl shrink-0">
            /{allProjects.length.toString().padStart(2, '0')}
          </span>
        </div>
      </Reveal>

      {/* ── FEATURED HERO ────────────────────────────────────── */}
      <Reveal delay={0.05}>
        <Link href={`/work/${featured.id}`} className="group block mb-16">
          <div className="relative h-[42vh] min-h-[260px] max-h-[480px] overflow-hidden rounded-xl border-2 border-slate-700/70 group-hover:border-violet-500/60 group-hover:-translate-y-1 transition-all duration-300">
            {(featured.screenshots ?? [featured.screenshot]).filter(Boolean).length > 0 && (
              <ImageCarousel
                images={(featured.screenshots ?? [featured.screenshot!])}
                alt={`${featured.name} screenshot`}
                priority
                sizes="100vw"
              />
            )}
            {/* Dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

            {/* Featured badge */}
            <div className="absolute top-4 left-4">
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-zinc-400 bg-zinc-950/70 backdrop-blur-sm border border-zinc-700/50 px-3 py-1 rounded-sm">
                Featured
              </span>
            </div>

            {/* Content overlay */}
            <div className="absolute bottom-0 left-0 p-6 sm:p-8">
              <div className="flex items-center gap-2 mb-3">
                <span aria-hidden="true" className="relative flex h-1.5 w-1.5 shrink-0">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-60" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-sky-400" />
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-400">
                  Live · {featured.timeframe}
                </span>
              </div>
              <h2 className="font-display text-3xl font-black text-white group-hover:text-sky-400 transition-colors duration-300 sm:text-5xl">
                {featured.name}
              </h2>
              <p className="text-zinc-300 mt-2 text-sm max-w-lg sm:text-base leading-relaxed">
                {featured.tagline}
              </p>
              <span className="inline-flex items-center gap-2 mt-5 font-mono text-[10px] uppercase tracking-widest text-zinc-400 group-hover:text-sky-400 transition-colors duration-200">
                View case study <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform duration-200" />
              </span>
            </div>
          </div>
        </Link>
      </Reveal>

      {/* ── FILTER ───────────────────────────────────────────── */}
      <Reveal delay={0.08}>
        <div className="flex items-center gap-1.5 sm:gap-2 mb-2 border-b border-slate-800/60 pb-5 overflow-x-auto">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-slate-500 shrink-0 mr-2">
            Filter
          </span>
          {categories.map(cat => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveFilter(cat)}
              className={`font-mono text-xs uppercase tracking-[0.12em] px-4 py-2 rounded-md transition-all duration-200 shrink-0 min-h-[44px] ${
                activeFilter === cat
                  ? 'text-sky-300 bg-sky-500/15 border-2 border-sky-500/50'
                  : 'text-slate-300 hover:text-white border-2 border-slate-700 hover:border-slate-500'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </Reveal>

      {/* ── CATALOG ROWS ─────────────────────────────────────── */}
      <div className="divide-y divide-slate-800/50">
        {filtered.map((project, i) => (
          <Reveal key={project.id} delay={i * 0.04}>
            <Link
              href={`/work/${project.id}`}
              className="group flex items-center gap-4 sm:gap-6 py-6 sm:py-7 hover:bg-slate-800/30 transition-all duration-200 -mx-4 px-4 rounded-lg"
            >
              {/* Number */}
              <span className="font-mono text-xs text-slate-600 w-7 shrink-0 tabular-nums">
                {String(i + 1).padStart(2, '0')}
              </span>

              {/* Thumbnail */}
              {project.screenshot && (
                <div className="hidden sm:block relative h-11 w-[72px] shrink-0 rounded-sm border border-slate-700 overflow-hidden">
                  <RowThumb src={project.screenshot} alt={project.name} />
                </div>
              )}

              {/* Name */}
              <h3 className="font-display text-xl sm:text-2xl text-slate-100 group-hover:text-sky-400 transition-colors duration-200 flex-1 min-w-0 truncate">
                {project.name}
              </h3>

              {/* Tagline — desktop only */}
              <p className="hidden lg:block text-slate-400 text-sm flex-1 min-w-0 line-clamp-1">
                {project.tagline}
              </p>

              {/* Year */}
              <span className="font-mono text-xs uppercase tracking-widest text-slate-500 shrink-0 hidden sm:block">
                {project.timeframe.split(' – ')[0]}
              </span>

              {/* Arrow */}
              <ArrowRight className="h-4 w-4 text-slate-600 group-hover:text-sky-400 group-hover:translate-x-1 transition-all duration-200 shrink-0" />
            </Link>
          </Reveal>
        ))}
      </div>

      {/* ── EMPTY STATE ──────────────────────────────────────── */}
      {filtered.length === 0 && (
        <div className="py-20 text-center">
          <p className="font-mono text-xs text-zinc-600 uppercase tracking-widest">
            No projects match this filter.
          </p>
        </div>
      )}
    </div>
  );
}
