import { Project } from '@/lib/projects';
import Link from 'next/link';
import { Pill } from './Pill';

export const ProjectHeader = ({ project }: { project: Project }) => (
  <header className="mb-10">
    <Pill>{project.role}</Pill>
    <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
      {project.name}
    </h1>
    <p className="mt-3 max-w-2xl text-sm text-slate-300 sm:text-base">
      {project.tagline}
    </p>
    <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-slate-400">
      <span>{project.timeframe}</span>
      <span className="h-3 w-px bg-slate-700" />
      {project.stack.map(tech => (
        <span
          key={tech}
          className="rounded-full bg-slate-900 px-2 py-0.5 text-[11px]"
        >
          {tech}
        </span>
      ))}
    </div>
    <div className="mt-4 flex flex-wrap gap-3">
      {project.links.map(link => (
        <Link
          key={link.href}
          href={link.href}
          className="inline-flex items-center rounded-full border border-sky-500/50 bg-sky-500/10 px-3 py-1 text-xs font-medium text-sky-300 hover:border-sky-400 hover:bg-sky-500/20 transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          {link.label}
          <span className="ml-1">↗</span>
        </Link>
      ))}
    </div>
  </header>
);