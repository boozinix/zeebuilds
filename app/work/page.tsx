'use client';

import Link from 'next/link';
import Image from 'next/image';
import { projects, projectPreviewHost } from '@/lib/projects';
import { ArrowRight, Briefcase, Filter } from 'lucide-react';
import { useState } from 'react';

function ProjectScreenshot({
  src,
  alt,
  host,
}: {
  src: string;
  alt: string;
  host: string;
}) {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);
  if (error) return null;
  return (
    <div className="border-b border-slate-800 bg-slate-900 px-4 pt-4 pb-0 sm:px-6 sm:pt-5">
      {/* Browser chrome */}
      <div className="flex items-center gap-1.5 mb-2.5 sm:mb-3">
        <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
        <div className="ml-2 flex-1 rounded-full bg-slate-800 px-3 py-1 text-[10px] text-slate-500 font-mono truncate">
          {host || '—'}
        </div>
      </div>
      {/* Screenshot */}
      <div className="relative h-40 w-full overflow-hidden rounded-t-lg sm:h-48">
        {!loaded && (
          <div className="absolute inset-0 bg-gradient-to-br from-sky-900/30 to-violet-900/30 animate-pulse rounded-t-lg" />
        )}
        <Image
          src={src}
          alt={alt}
          fill
          className={`object-cover object-top transition-all duration-500 group-hover:scale-[1.02] ${loaded ? 'opacity-100' : 'opacity-0'}`}
          sizes="(max-width: 1024px) 100vw, 50vw"
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
        />
        {/* Fade to card background */}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-b from-transparent to-slate-900" />
      </div>
    </div>
  );
}

export default function WorkPage() {
  const allProjects = Object.values(projects);
  const [activeFilter, setActiveFilter] = useState<string>('All Projects');

  const categories = ['All Projects', 'AI Tools', 'Fintech', 'Career Tools'];

  const filteredProjects = activeFilter === 'All Projects' 
    ? allProjects 
    : allProjects.filter(project => {
        if (activeFilter === 'AI Tools')
          return project.id === 'apply-studio' || project.id === 'neural-mob';
        if (activeFilter === 'Fintech') return project.id === 'card-scout';
        if (activeFilter === 'Career Tools') return project.id === 'apply-studio';
        return true;
      });

  return (
    <div className="mx-auto max-w-6xl px-4 pb-12 pt-8 sm:pb-20 sm:pt-16">
      <header className="mb-10 text-center sm:mb-16">
        <div className="inline-flex flex-wrap items-center justify-center gap-2 sm:gap-3 sm:mb-6">
          <span className="work-icon-spin inline-flex">
            <Briefcase className="h-8 w-8 text-sky-400 sm:h-10 sm:w-10" />
          </span>
          <h1 className="text-3xl font-bold tracking-tight text-slate-50 sm:text-5xl sm:text-6xl">
            My <span className="bg-gradient-to-r from-sky-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent animate-gradient">Work</span>
          </h1>
        </div>
        <p className="mx-auto max-w-3xl px-1 text-base text-slate-300 sm:px-0 sm:text-lg sm:text-xl leading-relaxed">
          Three live products. Built solo. Each started with a real problem I had — and ended with something people actually use.
        </p>
      </header>

      {/* Filter Pills */}
      <div className="mb-8 flex flex-wrap justify-center gap-2 sm:mb-12 sm:gap-3">
        <div className="inline-flex w-full items-center justify-center gap-2 text-sm text-slate-400 sm:w-auto sm:justify-start">
          <Filter className="h-4 w-4 shrink-0" />
          <span className="hidden sm:inline">Filter:</span>
        </div>
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setActiveFilter(category)}
            className={`relative min-h-[44px] rounded-full px-4 py-2.5 text-sm font-semibold transition-all backdrop-blur hover:scale-105 active:scale-95 sm:min-h-0 ${
              activeFilter === category
                ? 'bg-gradient-to-r from-sky-500/20 to-violet-500/20 border border-sky-500/40 text-sky-300 shadow-lg shadow-sky-500/20'
                : 'border border-slate-700 bg-slate-900/50 text-slate-400 hover:border-slate-600 hover:text-slate-300 hover:bg-slate-800/50'
            }`}
          >
            {category}
            {activeFilter === category && (
              <span className="absolute inset-0 rounded-full bg-gradient-to-r from-sky-500/10 to-violet-500/10 -z-10" />
            )}
          </button>
        ))}
      </div>

      {/* Project Grid */}
      <div className="grid gap-6 sm:gap-8 md:grid-cols-2 xl:grid-cols-3 lg:gap-10">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="transition-transform duration-300 hover:-translate-y-2 active:translate-y-0"
          >
            <Link
              href={`/work/${project.id}`}
              className="group relative block h-full overflow-hidden rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 shadow-xl shadow-black/20 hover:border-sky-500/50 transition-all sm:rounded-3xl"
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-sky-500/5 to-violet-500/5 opacity-0 group-hover:opacity-100 transition-opacity z-10" />

              {/* Screenshot preview */}
              {project.screenshot && (
                <ProjectScreenshot
                  src={project.screenshot}
                  alt={`${project.name} screenshot`}
                  host={projectPreviewHost(project)}
                />
              )}

              {/* Content */}
              <div className="relative p-5 sm:p-6 lg:p-8">
                {/* Header */}
                <div className="mb-3 flex flex-wrap items-center justify-between gap-2 sm:mb-4">
                  <div className="inline-flex items-center gap-2 text-[13px]">
                    <span className="relative">
                      <span className="absolute inset-0 animate-pulse rounded-full bg-emerald-500/20 blur-md"></span>
                      <span className="relative rounded-full bg-emerald-500/10 px-2.5 py-1 text-emerald-400 font-medium border border-emerald-500/20">
                        Live • {project.timeframe.split(' – ')[0]}
                      </span>
                    </span>
                  </div>
                  <span className="text-[13px] text-slate-500 font-medium">
                    {project.role}
                  </span>
                </div>
                
                {/* Title */}
                <h3 className="text-xl font-bold text-slate-50 mb-1.5 group-hover:text-sky-400 transition-colors sm:mb-2 sm:text-2xl">
                  {project.name}
                </h3>
                
                {/* Tagline */}
                <p className="text-sm text-slate-300 mb-3 leading-relaxed line-clamp-2">
                  {project.tagline}
                </p>
                
                {/* Problem Statement */}
                <div className="mb-4 rounded-lg bg-slate-800/30 border border-slate-700/50 p-3">
                  <div className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold mb-1">
                    Problem
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                    {project.problem}
                  </p>
                </div>
                
                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {project.stack.slice(0, 4).map(tech => (
                    <span
                      key={tech}
                      className="rounded-full bg-slate-900 px-2.5 py-1 text-[11px] font-medium text-slate-400 border border-slate-800"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.stack.length > 4 && (
                    <span className="rounded-full bg-slate-900 px-2.5 py-1 text-[11px] font-medium text-slate-500 border border-slate-800">
                      +{project.stack.length - 4}
                    </span>
                  )}
                </div>
                
                {/* Footer */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800/50 sm:pt-4">
                  <span className="inline-flex items-center gap-2 text-xs font-semibold text-sky-400">
                    View case study
                    <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    {project.links.map(link => (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-[36px] items-center gap-1 rounded-lg py-1.5 text-xs text-slate-500 hover:text-sky-400 transition-colors active:bg-slate-800/50 sm:min-h-0 sm:py-0"
                      >
                        {link.label}
                        <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              </Link>
            </div>
          ))}
      </div>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <div className="text-center py-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-800/50 mb-4">
            <Briefcase className="h-8 w-8 text-slate-600" />
          </div>
          <h3 className="text-xl font-semibold text-slate-400 mb-2">No projects found</h3>
          <p className="text-slate-500 text-sm">Try selecting a different filter</p>
        </div>
      )}
    </div>
  );
}