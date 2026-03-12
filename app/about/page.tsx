'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
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
  Database,
  Rocket
} from 'lucide-react';

export default function AboutPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

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
      title: 'Independent Builder',
      role: 'AI Product Manager & Full-Stack Developer',
      period: '2024 – Present',
      description: 'Built and launched Resume Tailor and Card Scout from concept to production. Responsible for product strategy, technical architecture, and user acquisition.',
      icon: Rocket,
      color: 'from-emerald-500 to-emerald-600'
    },
    {
      title: 'Previous Experience',
      role: 'Product Manager at Tech Companies',
      period: '2020 – 2024',
      description: 'Led product initiatives at growth-stage companies, focusing on user experience, data-driven decision making, and cross-functional collaboration.',
      icon: Briefcase,
      color: 'from-sky-500 to-sky-600'
    }
  ];

  return (
    <div className="mx-auto max-w-4xl px-4 pb-16 pt-12">
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <div className="flex items-center gap-3 mb-2">
          <motion.div
            initial={{ rotate: -180, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            transition={{ duration: 0.6, type: 'spring' }}
            className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 to-violet-500"
          >
            <User className="h-6 w-6 text-white" />
          </motion.div>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl text-slate-50">
            About
          </h1>
        </div>
      </motion.header>

      {/* Intro */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-12 rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900/80 to-slate-950/80 p-8 backdrop-blur"
      >
        <div className="space-y-4 text-base text-slate-300 leading-relaxed">
          <p>
            I am a product manager and builder focused on AI-powered consumer tools in
            careers and fintech. I use hands-on prototyping to de‑risk ideas and ship
            real value quickly.
          </p>
          <p>
            Resume Tailor and Card Scout started as scratch‑your‑own‑itch projects and
            evolved into full production apps that combine UX, data, and AI in
            opinionated ways.
          </p>
          <p>
            My approach is to identify real problems through personal experience, validate them with others, 
            then build and iterate rapidly to find product-market fit. I believe the best products come from 
            deep understanding of user pain points, not just technical capability.
          </p>
        </div>
      </motion.section>

      {/* Skills */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="mb-12"
      >
        <motion.div variants={itemVariants} className="mb-6">
          <h2 className="text-xl font-semibold text-slate-100 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-sky-400" />
            Skills
          </h2>
        </motion.div>
        <div className="grid gap-6 md:grid-cols-3">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.title}
              variants={itemVariants}
              whileHover={{ y: -4 }}
              className="group rounded-xl border border-slate-800 bg-slate-950/60 p-6 hover:border-sky-500/50 transition-all"
            >
              <div className="mb-4 flex items-center gap-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br ${skill.color}`}>
                  <skill.icon className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-sm font-semibold text-sky-300">
                  {skill.title}
                </h3>
              </div>
              <ul className="space-y-2.5 text-sm text-slate-300">
                {skill.items.map((item, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + idx * 0.05 }}
                    className="flex items-start gap-2"
                  >
                    <span className="mt-1.5 flex h-1.5 w-1.5 shrink-0 rounded-full bg-sky-400" />
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Experience */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="mb-12"
      >
        <motion.div variants={itemVariants} className="mb-6">
          <h2 className="text-xl font-semibold text-slate-100 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-violet-400" />
            Experience
          </h2>
        </motion.div>
        <div className="space-y-6">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.title}
              variants={itemVariants}
              whileHover={{ x: 4 }}
              className="group rounded-xl border border-slate-800 bg-slate-950/60 p-6 hover:border-sky-500/50 transition-all"
            >
              <div className="flex items-start gap-4">
                <div className={`mt-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${exp.color}`}>
                  <exp.icon className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 gap-2">
                    <h3 className="text-base font-semibold text-slate-100">
                      {exp.title}
                    </h3>
                    <span className="inline-flex items-center gap-2 text-sm text-slate-400">
                      <div className="h-1 w-1 rounded-full bg-sky-400" />
                      {exp.period}
                    </span>
                  </div>
                  <p className="text-sm text-sky-300 mb-3 font-medium">
                    {exp.role}
                  </p>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Resume & Contact */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900/50 via-slate-800/30 to-slate-950/50 p-8 text-center backdrop-blur"
      >
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-sky-500/10 via-violet-500/10 to-fuchsia-500/10 animate-gradient opacity-50" />
        
        <div className="relative">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-sky-500 to-violet-500 mb-4">
            <Sparkles className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-xl font-semibold text-slate-100 mb-2">
            Let's work together
          </h2>
          <p className="text-sm text-slate-300 mb-6 max-w-md mx-auto">
            I'm open to AI PM roles, product collaboration, and advisory opportunities.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/resume.pdf"
              className="group inline-flex items-center gap-2 rounded-full border border-slate-600 bg-slate-900/50 px-6 py-3 text-sm font-medium text-slate-300 backdrop-blur hover:border-slate-500 hover:text-slate-200 hover:bg-slate-800/50 transition-all"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Download className="h-4 w-4 group-hover:translate-y-0.5 transition-transform" />
              Download resume
            </a>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-500 to-violet-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-500/25 hover:shadow-xl hover:shadow-sky-500/40 hover:scale-105 transition-all"
            >
              <Mail className="h-4 w-4 group-hover:rotate-12 transition-transform" />
              Get in touch
            </Link>
          </div>
        </div>
      </motion.section>
    </div>
  );
}