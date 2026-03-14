'use client';

import Link from 'next/link';
import { projects } from '@/lib/projects';
import { Pill } from '@/components/Pill';
import { ArrowRight, Sparkles, Rocket, Mail, User } from 'lucide-react';

export default function HomePage() {
  const featuredProjects = [projects['resume-tailor'], projects['card-scout']];

  return (
    <div className="mx-auto max-w-6xl px-4 pb-20 pt-16">
      {/* Hero Section */}
      <section className="mb-20 text-center">
        <div>
          <Pill>AI product portfolio</Pill>
        </div>
        
        <h1 className="mt-6 text-balance text-5xl font-bold tracking-tight text-slate-50 sm:text-6xl lg:text-7xl">
          I build and ship{' '}
          <span className="bg-gradient-to-r from-sky-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent animate-gradient">
            AI-powered tools
          </span>{' '}
          for careers and finance.
        </h1>
        
        <p className="mt-6 mx-auto max-w-3xl text-lg text-slate-300 sm:text-xl leading-relaxed">
          I design and build consumer products end‑to‑end— from uncovering real
          problems to shipping production‑grade experiences. Below are two live
          applications I own.
        </p>
        
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/work"
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-500 to-violet-500 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-sky-500/25 hover:shadow-xl hover:shadow-sky-500/40 hover:scale-105 transition-all"
          >
            <Sparkles className="h-4 w-4" />
            View my work
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/about"
            className="inline-flex items-center gap-2 rounded-full border border-slate-600 bg-slate-900/50 px-6 py-3 text-base font-medium text-slate-300 backdrop-blur hover:border-slate-500 hover:text-slate-200 hover:bg-slate-800/50 transition-all"
          >
            <User className="h-4 w-4" />
            About me
          </Link>
        </div>
      </section>

      {/* Featured Projects */}
      <section id="projects" className="space-y-8">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 mb-3">
            <Rocket className="h-6 w-6 text-sky-400" />
            <h2 className="text-3xl font-bold text-slate-100">Featured projects</h2>
          </div>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Two live products that solve real problems for thousands of users
          </p>
        </div>
        
        <div className="grid gap-8 lg:grid-cols-2">
          {featuredProjects.map((project) => (
            <div
              key={project.id}
              className="transition-transform duration-300 hover:-translate-y-2"
            >
              <Link
                href={`/work/${project.id}`}
                className="group relative block overflow-hidden rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 p-8 shadow-xl shadow-black/20 hover:border-sky-500/50 transition-all"
              >
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-sky-500/5 to-violet-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                
                {/* Content */}
                <div className="relative">
                  <div className="mb-4 inline-flex items-center gap-3 text-sm text-slate-400">
                    <span className="relative">
                      <span className="absolute inset-0 animate-pulse rounded-full bg-emerald-500/20 blur-md"></span>
                      <span className="relative rounded-full bg-emerald-500/10 px-3 py-1 text-emerald-400 font-medium border border-emerald-500/20">
                        Live Product
                      </span>
                    </span>
                    <span className="text-slate-500">•</span>
                    <span>{project.role}</span>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-slate-50 mb-3 group-hover:text-sky-400 transition-colors">
                    {project.name}
                  </h3>
                  
                  <p className="text-base text-slate-300 mb-6 leading-relaxed">
                    {project.tagline}
                  </p>
                  
                  <div className="mb-6 flex flex-wrap gap-2">
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
      <section className="mt-20 relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900/50 via-slate-800/30 to-slate-950/50 p-12 text-center backdrop-blur">
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-sky-500/10 via-violet-500/10 to-fuchsia-500/10 animate-gradient opacity-50" />
        
        <div className="relative">
          <h2 className="text-3xl font-bold text-slate-100 mb-4">
            Ready to work together?
          </h2>
          <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
            I'm open to AI PM roles, product collaboration opportunities, and interesting conversations about building consumer products.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-500 to-violet-500 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-sky-500/25 hover:shadow-xl hover:shadow-sky-500/40 hover:scale-105 transition-all"
            >
              Get in touch
              <Mail className="h-4 w-4 group-hover:rotate-12 transition-transform" />
            </Link>
            <a
              href="mailto:zubair.nizami@yahoo.com"
              className="inline-flex items-center gap-2 rounded-full border border-slate-600 bg-slate-900/50 px-8 py-4 text-base font-medium text-slate-300 backdrop-blur hover:border-slate-500 hover:text-slate-200 hover:bg-slate-800/50 transition-all"
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