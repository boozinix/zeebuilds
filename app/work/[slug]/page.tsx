'use client';

import React, { useState } from 'react';
import { projects, ProjectId } from '@/lib/projects';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, Target, Zap, Users } from 'lucide-react';

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const [slug, setSlug] = useState<string>('');
  
  // Get slug from params
  React.useEffect(() => {
    params.then(p => setSlug(p.slug));
  }, [params]);

  const project = slug ? projects[slug as ProjectId] : null;

  if (slug && !project) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-12 text-center sm:py-20">
        <h1 className="text-2xl font-bold text-slate-50 mb-4 sm:text-3xl">Project not found</h1>
        <Link href="/work" className="inline-flex min-h-[44px] items-center justify-center text-sky-400 hover:text-sky-300 sm:min-h-0">
          ← Back to work
        </Link>
      </div>
    );
  }

  if (!project) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mx-auto max-w-4xl px-4 pb-12 pt-8 sm:pb-20 sm:pt-12">
      <div>
        <Link
          href="/work"
          className="inline-flex min-h-[44px] items-center gap-2 rounded-lg py-2 text-sm text-slate-400 hover:text-sky-400 transition-colors active:bg-slate-800/50 mb-6 sm:mb-8 sm:min-h-0 sm:py-0"
        >
          <ArrowLeft className="h-4 w-4 shrink-0" />
          Back to work
        </Link>

        {/* Header */}
        <div className="mb-8 sm:mb-12">
          <div className="mb-3 flex flex-wrap items-center gap-2 sm:mb-4 sm:gap-3">
            <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs text-emerald-400 font-medium border border-emerald-500/20 sm:px-4 sm:py-1.5 sm:text-sm">
              Live Product
            </span>
            <span className="text-sm text-slate-400 sm:text-base">{project.role}</span>
          </div>

          <h1 className="text-2xl font-bold text-slate-50 mb-3 sm:mb-4 sm:text-4xl sm:text-5xl">
            {project.name}
          </h1>

          <p className="text-base text-slate-300 leading-relaxed sm:text-lg lg:text-xl">
            {project.tagline}
          </p>

          <div className="mt-4 flex flex-wrap gap-2 sm:mt-6 sm:gap-3">
            {project.links.map(link => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-gradient-to-r from-sky-500 to-violet-500 px-5 py-3 text-sm font-semibold text-white shadow-lg hover:shadow-xl active:scale-[0.98] transition-all sm:min-h-0 sm:px-6"
              >
                <ExternalLink className="h-4 w-4" />
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Metrics */}
        {project.metrics && (
          <div className="mb-8 grid gap-4 sm:mb-12 sm:grid-cols-3 sm:gap-6">
            {project.metrics.map((metric) => (
              <div
                key={metric.label}
                className="rounded-xl border border-slate-800 bg-slate-900/50 p-4 text-center sm:p-6"
              >
                <div className="text-2xl font-bold text-sky-400 mb-1 sm:mb-2 sm:text-3xl">
                  {metric.value}
                </div>
                <div className="text-xs text-slate-400 sm:text-sm">{metric.label}</div>
              </div>
            ))}
          </div>
        )}

        {/* Overview */}
        <div className="mb-8 rounded-xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950 p-5 sm:mb-12 sm:rounded-2xl sm:p-6 lg:p-8">
          <h2 className="text-xl font-bold text-slate-50 mb-3 flex items-center gap-2 sm:mb-4 sm:text-2xl">
            <Target className="h-5 w-5 text-sky-400 sm:h-6 sm:w-6" />
            Overview
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed sm:text-base lg:text-lg">
            {project.description}
          </p>
        </div>

        {/* Tech Stack */}
        <div className="mb-8 sm:mb-12">
          <h2 className="text-xl font-bold text-slate-50 mb-4 flex items-center gap-2 sm:mb-6 sm:text-2xl">
            <Zap className="h-5 w-5 text-violet-400 sm:h-6 sm:w-6" />
            Tech Stack
          </h2>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {project.stack.map(tech => (
              <span
                key={tech}
                className="rounded-full bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-300 border border-slate-700 hover:border-sky-500/50 transition-colors sm:px-4 sm:py-2 sm:text-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Key Features */}
        <div className="rounded-xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950 p-5 sm:rounded-2xl sm:p-6 lg:p-8">
          <h2 className="text-xl font-bold text-slate-50 mb-4 flex items-center gap-2 sm:mb-6 sm:text-2xl">
            <Users className="h-5 w-5 text-emerald-400 sm:h-6 sm:w-6" />
            Key Features
          </h2>
          <div className="space-y-3 sm:space-y-4">
            {[
              'End-to-end product ownership from research to deployment',
              'User-centric design with iterative testing and refinement',
              'Scalable architecture supporting thousands of active users',
              'Production-grade implementation with modern tech stack'
            ].map((feature, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-sky-500/10 border border-sky-500/20 sm:h-6 sm:w-6">
                  <div className="h-1.5 w-1.5 rounded-full bg-sky-400 sm:h-2 sm:w-2" />
                </div>
                <p className="text-sm text-slate-300 sm:text-base">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}