'use client';

import Link from 'next/link';
import { projects } from '@/lib/projects';
import { Pill } from '@/components/Pill';
import { ArrowRight, Sparkles, Rocket, Mail, User } from 'lucide-react';

export default function HomePage() {
  const featuredProjects = [projects['resume-tailor'], projects['card-scout']];

  return (
    <div className="mx-auto max-w-6xl px-4 pb-12 pt-8 sm:pb-20 sm:pt-16">
      {/* Hero Section */}
      <section className="relative mb-12 text-center sm:mb-20 overflow-hidden rounded-2xl">
        {/* Subtle gradient background shift */}
        <div className="hero-gradient-bg absolute inset-0 -z-10 rounded-2xl" aria-hidden />
        <div className="animate-shimmer-in">
          <Pill>AI product portfolio</Pill>
        </div>
        
        <h1 className="mt-4 text-balance text-3xl font-bold tracking-tight text-slate-50 sm:mt-6 sm:text-5xl lg:text-6xl lg:text-7xl animate-shimmer-in-delay-1">
          I build and ship{' '}
          <span className="bg-gradient-to-r from-sky-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent animate-gradient">
            AI-powered tools
          </span>{' '}
          for careers and finance.
        </h1>
        
        <p className="mt-4 mx-auto max-w-3xl text-base text-slate-300 sm:mt-6 sm:text-lg sm:text-xl leading-relaxed animate-shimmer-in-delay-2">
          I design and build consumer products end‑to‑end— from uncovering real
          problems to shipping production‑grade experiences. Below are two live
          applications I own.
        </p>
        
        <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-4 animate-shimmer-in-delay-3">
          <Link
            href="/work"
            className="group inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-gradient-to-r from-sky-500 to-violet-500 px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-sky-500/25 hover:shadow-xl hover:shadow-sky-500/40 active:scale-[0.98] transition-all sm:min-h-0"
          >
            <Sparkles className="h-4 w-4" />
            View my work
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/about"
            className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-slate-600 bg-slate-900/50 px-6 py-3.5 text-base font-medium text-slate-300 backdrop-blur hover:border-slate-500 hover:text-slate-200 hover:bg-slate-800/50 active:scale-[0.98] transition-all sm:min-h-0"
          >
            <User className="h-4 w-4" />
            About me
          </Link>
        </div>
      </section>

      {/* Featured Projects */}
      <section id="projects" className="space-y-6 sm:space-y-8">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 mb-2 sm:mb-3">
            <Rocket className="h-5 w-5 text-sky-400 sm:h-6 sm:w-6" />
            <h2 className="text-2xl font-bold text-slate-100 sm:text-3xl">Featured projects</h2>
          </div>
          <p className="text-sm text-slate-400 max-w-2xl mx-auto sm:text-base">
            Two live products that solve real problems for thousands of users
          </p>
        </div>
        
        <div className="grid gap-6 lg:gap-8 lg:grid-cols-2">
          {featuredProjects.map((project) => (
            <div
              key={project.id}
              className="transition-transform duration-300 hover:-translate-y-2 active:translate-y-0"
            >
              <Link
                href={`/work/${project.id}`}
                className="group relative block overflow-hidden rounded-xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 p-5 shadow-xl shadow-black/20 hover:border-sky-500/50 transition-all sm:rounded-2xl sm:p-6 lg:p-8"
              >
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-sky-500/5 to-violet-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                
                {/* Content */}
                <div className="relative">
                  <div className="mb-3 inline-flex flex-wrap items-center gap-2 text-xs text-slate-400 sm:mb-4 sm:gap-3 sm:text-sm">
                    <span className="relative">
                      <span className="absolute inset-0 animate-pulse rounded-full bg-emerald-500/20 blur-md"></span>
                      <span className="relative rounded-full bg-emerald-500/10 px-3 py-1 text-emerald-400 font-medium border border-emerald-500/20">
                        Live Product
                      </span>
                    </span>
                    <span className="text-slate-500">•</span>
                    <span>{project.role}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-slate-50 mb-2 group-hover:text-sky-400 transition-colors sm:mb-3 sm:text-2xl">
                    {project.name}
                  </h3>
                  
                  <p className="text-sm text-slate-300 mb-4 leading-relaxed sm:mb-6 sm:text-base">
                    {project.tagline}
                  </p>
                  
                  <div className="mb-4 flex flex-wrap gap-1.5 sm:mb-6 sm:gap-2">
                    {project.stack.slice(0, 4).map(tech => (
                      <span
                        key={tech}
                        className="rounded-full bg-slate-800 px-3 py-1 text-xs font-medium text-slate-300 border border-slate-700"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.stack.length > 4 && (
                      <span className="rounded-full bg-slate-800 px-3 py-1 text-xs font-medium text-slate-400 border border-slate-700">
                        +{project.stack.length - 4} more
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-2 text-sm font-medium text-sky-400">
                      View case study
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <div className="flex gap-2">
                      {project.links.slice(0, 1).map(link => (
                        <span key={link.href} className="text-xs text-slate-500 flex items-center gap-1">
                          {link.label}
                          <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="mt-12 relative overflow-hidden rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900/50 via-slate-800/30 to-slate-950/50 p-6 text-center backdrop-blur sm:mt-20 sm:rounded-3xl sm:p-8 lg:p-12">
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-sky-500/10 via-violet-500/10 to-fuchsia-500/10 animate-gradient opacity-50" />
        
        <div className="relative">
          <h2 className="text-2xl font-bold text-slate-100 mb-3 sm:mb-4 sm:text-3xl">
            Ready to work together?
          </h2>
          <p className="text-sm text-slate-300 mb-6 max-w-2xl mx-auto sm:text-base sm:mb-8 lg:text-lg">
            Actively looking for full-time AI PM roles. Let's talk.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-4">
            <Link
              href="/contact"
              className="group inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-gradient-to-r from-sky-500 to-violet-500 px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-sky-500/25 hover:shadow-xl hover:shadow-sky-500/40 active:scale-[0.98] transition-all sm:min-h-0 sm:px-8 sm:py-4"
            >
              Open to AI PM roles — let's talk
              <Mail className="h-4 w-4 group-hover:rotate-12 transition-transform" />
            </Link>
            <a
              href="mailto:zubair.nizami@yahoo.com"
              className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-slate-600 bg-slate-900/50 px-6 py-3.5 text-base font-medium text-slate-300 backdrop-blur hover:border-slate-500 hover:text-slate-200 hover:bg-slate-800/50 active:scale-[0.98] transition-all sm:min-h-0 sm:px-8 sm:py-4"
            >
              Email me
              <Mail className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}