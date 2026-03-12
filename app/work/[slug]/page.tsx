'use client';

import React, { useState } from 'react';
import { notFound } from 'next/navigation';
import { projects, ProjectId } from '@/lib/projects';
import Link from 'next/link';
import { motion } from 'framer-motion';
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
      <div className="mx-auto max-w-6xl px-4 py-20 text-center">
        <h1 className="text-3xl font-bold text-slate-50 mb-4">Project not found</h1>
        <Link href="/work" className="text-sky-400 hover:text-sky-300">
          ← Back to work
        </Link>
      </div>
    );
  }

  if (!project) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mx-auto max-w-4xl px-4 pb-20 pt-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Link
          href="/work"
          className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-sky-400 transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to work
        </Link>

        {/* Header */}
        <div className="mb-12">
          <div className="mb-4 inline-flex items-center gap-3">
            <span className="rounded-full bg-emerald-500/10 px-4 py-1.5 text-sm text-emerald-400 font-medium border border-emerald-500/20">
              Live Product
            </span>
            <span className="text-slate-400">{project.role}</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold text-slate-50 mb-4">
            {project.name}
          </h1>

          <p className="text-xl text-slate-300 leading-relaxed">
            {project.tagline}
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            {project.links.map(link => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-500 to-violet-500 px-6 py-3 text-sm font-semibold text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all"
              >
                <ExternalLink className="h-4 w-4" />
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Metrics */}
        {project.metrics && (
          <div className="mb-12 grid gap-6 sm:grid-cols-3">
            {project.metrics.map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="rounded-xl border border-slate-800 bg-slate-900/50 p-6 text-center"
              >
                <div className="text-3xl font-bold text-sky-400 mb-2">
                  {metric.value}
                </div>
                <div className="text-sm text-slate-400">{metric.label}</div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Overview */}
        <div className="mb-12 rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950 p-8">
          <h2 className="text-2xl font-bold text-slate-50 mb-4 flex items-center gap-2">
            <Target className="h-6 w-6 text-sky-400" />
            Overview
          </h2>
          <p className="text-slate-300 leading-relaxed text-lg">
            {project.description}
          </p>
        </div>

        {/* Tech Stack */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-slate-50 mb-6 flex items-center gap-2">
            <Zap className="h-6 w-6 text-violet-400" />
            Tech Stack
          </h2>
          <div className="flex flex-wrap gap-3">
            {project.stack.map(tech => (
              <span
                key={tech}
                className="rounded-full bg-slate-800 px-4 py-2 text-sm font-medium text-slate-300 border border-slate-700 hover:border-sky-500/50 transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Key Features */}
        <div className="rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950 p-8">
          <h2 className="text-2xl font-bold text-slate-50 mb-6 flex items-center gap-2">
            <Users className="h-6 w-6 text-emerald-400" />
            Key Features
          </h2>
          <div className="space-y-4">
            {[
              'End-to-end product ownership from research to deployment',
              'User-centric design with iterative testing and refinement',
              'Scalable architecture supporting thousands of active users',
              'Production-grade implementation with modern tech stack'
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-3"
              >
                <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sky-500/10 border border-sky-500/20">
                  <div className="h-2 w-2 rounded-full bg-sky-400" />
                </div>
                <p className="text-slate-300">{feature}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}