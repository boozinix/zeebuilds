'use client';

import Link from 'next/link';
import { projects } from '@/lib/projects';
import { ArrowRight, Download, MapPin } from 'lucide-react';
import { useCounter } from '@/hooks/useCounter';
import { useRef } from 'react';
import { useInView } from 'framer-motion';
import { Reveal } from '@/components/Reveal';
import { RevealText } from '@/components/RevealText';
import { SkillsStack } from '@/components/SkillsStack';
import { ImageCarousel } from '@/components/ImageCarousel';
import { HeroTypewriter } from '@/components/HeroTypewriter';
import { HeroParallax } from '@/components/HeroParallax';
import { TiltCard } from '@/components/TiltCard';

/* ── Live pulse dot ────────────────────────────────────────────── */
function LiveDot() {
  return (
    <span aria-hidden="true" className="relative flex h-1.5 w-1.5 shrink-0">
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-purple-500 opacity-75" />
      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-purple-500" />
    </span>
  );
}

/* ── Metric card with counter animation ────────────────────────── */
function MetricCard({ num, prefix, suffix, label, context, sub, duration }: {
  num: number; prefix?: string; suffix?: string;
  label: string; context: string; sub: string; duration: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px 0px' });
  const count = useCounter(num, duration, isInView);

  return (
    <div ref={ref} className="rounded-xl border-2 border-slate-700/70 bg-slate-900/60 px-6 py-7">
      <p
        className="font-display font-black leading-none text-5xl sm:text-6xl mb-3"
        style={{
          background: 'linear-gradient(135deg, #7C3AED, #2563EB)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        {prefix}{count}{suffix}
      </p>
      <p className="font-semibold text-white text-base mb-0.5">{label}</p>
      <p className="font-mono text-xs text-purple-400 uppercase tracking-[0.12em] mb-1">{context}</p>
      <p className="font-mono text-xs text-slate-500">{sub}</p>
    </div>
  );
}

function MetricsSection() {
  return (
    <Reveal>
      <section className="mb-24 sm:mb-32">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <MetricCard num={157} suffix="%" label="Revenue Growth" context="GTM Strategy · AWS" sub="$84M → $216M" duration={1800} />
          <MetricCard num={250} prefix="$" suffix="M+" label="Cost Savings" context="Meta · Digital Twin" sub="Per-region infrastructure" duration={2000} />
          <MetricCard num={4} label="Live Products" context="Solo-built" sub="Full-stack. Real users. Paying customers." duration={800} />
        </div>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-sky-400 mr-2">Experience at</span>
          {['AWS', 'Meta', 'Zoox', 'Apple'].map(co => (
            <span key={co} className="font-display font-bold text-slate-500 text-sm tracking-tight hover:text-slate-300 transition-colors duration-200">
              {co}
            </span>
          ))}
        </div>
      </section>
    </Reveal>
  );
}

/* ── Page ──────────────────────────────────────────────────────── */
export default function HomePage() {
  const applyStudio  = projects['apply-studio'];
  const cardScout    = projects['card-scout'];
  const neuralMob    = projects['neural-mob'];
  const stockTracker = projects['stock-tracker'];

  return (
    <div className="mx-auto max-w-5xl px-4 pb-24 pt-16 sm:pt-24">

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative mb-24 sm:mb-32 text-center">
        <HeroParallax />

        {/* Badge + role subtitle */}
        <div className="relative z-10 animate-fade-up flex flex-col items-center gap-2 mb-8">
          <span className="inline-flex items-center border border-slate-600/60 text-slate-400 text-sm px-4 py-1.5 rounded-md">
            AI product portfolio
          </span>
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-slate-400">
            Senior AI Product Manager · Consumer · Infra · Fintech
          </p>
        </div>

        {/* Headline */}
        <h1 className="relative z-10 animate-fade-up-1 font-display font-black leading-[1.05] text-[clamp(2.2rem,6.5vw,5.5rem)] text-white mb-5">
          <HeroTypewriter />
        </h1>

        {/* Richer proof line */}
        <RevealText className="relative z-10 mx-auto max-w-2xl mb-4">
          <p className="text-slate-200 text-xl leading-relaxed sm:text-2xl font-medium">
            I ship AI products from{' '}
            <span className="text-white font-bold">zero → revenue</span>{' '}
            in weeks, not quarters.
          </p>
        </RevealText>

        <RevealText className="relative z-10 mx-auto max-w-xl mb-10">
          <p className="text-slate-400 text-base leading-relaxed">
            8 years shipping AI products at AWS, Meta, Zoox, and Apple — plus 4 live
            products, solo. Code, taste, and relentless follow-through.
          </p>
        </RevealText>

        {/* CTAs — Resume is primary for recruiters */}
        <div className="relative z-10 animate-fade-up-3 flex flex-wrap items-center justify-center gap-4">
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-md font-semibold text-white text-sm transition-opacity duration-200 hover:opacity-90"
            style={{ background: 'linear-gradient(135deg, #38bdf8, #a78bfa, #e879f9)' }}
          >
            <Download className="h-4 w-4" />
            Download 1-page resume (PDF)
          </a>
          <Link
            href="/work"
            className="inline-flex items-center gap-2 border-2 border-slate-500 text-slate-200 px-7 py-3 rounded-md font-semibold text-sm hover:border-slate-300 hover:text-white transition-all duration-200"
          >
            See my work <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* ── METRICS — with company context ───────────────────── */}
      <MetricsSection />

      {/* ── SKILLS STACK ────────────────────────────────────── */}
      <SkillsStack />

      {/* ── PROJECTS ─────────────────────────────────────────── */}
      <section className="mb-24 sm:mb-32">
        <Reveal>
          <div className="flex items-center justify-between mb-10">
            <span className="font-mono text-xs uppercase tracking-[0.22em] text-sky-400">Selected work</span>
            <Link
              href="/work"
              className="group font-mono text-xs uppercase tracking-[0.18em] text-sky-400 hover:text-purple-400 transition-colors duration-200 flex items-center gap-1.5"
            >
              All projects <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </Reveal>

        {/* ApplyStudio — featured horizontal card */}
        <Reveal delay={0.04}>
          <Link href="/work/apply-studio" className="group block mb-5">
            <TiltCard className="overflow-hidden rounded-xl border-2 border-slate-700/70 bg-slate-900/60 group-hover:border-violet-500/60 group-hover:-translate-y-2 transition-all duration-300">
              <div className="grid grid-cols-1 lg:grid-cols-[55%_45%]">
                <div className="h-60 sm:h-72 lg:h-[320px] border-b border-slate-800 lg:border-b-0 lg:border-r lg:border-slate-800">
                  <ImageCarousel
                    images={applyStudio.screenshots ?? [applyStudio.screenshot!]}
                    alt="ApplyStudio AI job application dashboard"
                    priority
                    sizes="(max-width: 1024px) 100vw, 55vw"
                  />
                </div>
                <div className="p-7 flex flex-col justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-2.5 mb-5">
                      <LiveDot />
                      <span className="font-mono text-xs uppercase tracking-[0.15em] text-slate-400">Live · 2026</span>
                      <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-violet-300 bg-violet-500/10 border border-violet-500/40 px-2.5 py-1 rounded-sm">
                        Career AI
                      </span>
                    </div>
                    <h3 className="font-display text-3xl font-black text-white group-hover:text-purple-400 transition-colors duration-300 mb-2">
                      {applyStudio.name}
                    </h3>

                    {/* Why it matters */}
                    <p className="text-slate-200 text-sm leading-relaxed mb-4 font-medium">
                      {applyStudio.whyItMatters}
                    </p>

                    <p className="text-slate-500 text-sm leading-relaxed mb-5">
                      7 AI tools in one platform — resume, cover letter, LinkedIn, job fit, and more. Results in under 30 seconds.
                    </p>

                    <div className="flex flex-wrap gap-2 mb-5">
                      {['GPT-5.1', 'Multi-agent AI', 'Next.js'].map(t => (
                        <span key={t} className="font-mono text-[10px] text-slate-400 border border-slate-600 px-2.5 py-1 rounded-sm">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Key result — consistent across all cards */}
                  <div className="pt-5 border-t border-slate-800">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-purple-400 text-sm font-bold shrink-0">→</span>
                      <p className="font-mono text-xs text-purple-300">{applyStudio.keyResult}</p>
                    </div>
                    <div className="flex items-center justify-end">
                      <span className="font-mono text-xs uppercase tracking-widest text-slate-500 group-hover:text-white transition-colors duration-200 flex items-center gap-1.5">
                        View case study <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </TiltCard>
          </Link>
        </Reveal>

        {/* Card Scout + Neural Mob + StockTracker */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <Reveal delay={0.06}>
            <Link href="/work/card-scout" className="group block h-full">
              <TiltCard className="overflow-hidden rounded-xl border-2 border-slate-700/70 bg-slate-900/60 group-hover:border-violet-500/60 group-hover:-translate-y-2 transition-all duration-300 h-full flex flex-col">
                <div className="h-48 border-b border-slate-800 shrink-0">
                  <ImageCarousel
                    images={cardScout.screenshots ?? [cardScout.screenshot!]}
                    alt="Card Scout AI credit card optimizer"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex flex-wrap items-center gap-2.5 mb-4">
                    <LiveDot />
                    <span className="font-mono text-xs uppercase tracking-[0.15em] text-slate-400">Live · 2026</span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-fuchsia-300 bg-fuchsia-500/10 border border-fuchsia-500/40 px-2.5 py-1 rounded-sm">
                      Fintech AI
                    </span>
                  </div>
                  <h3 className="font-display text-2xl font-black text-white group-hover:text-purple-400 transition-colors duration-300 mb-2">
                    {cardScout.name}
                  </h3>
                  <p className="text-slate-200 text-sm font-medium leading-relaxed mb-2">
                    {cardScout.whyItMatters}
                  </p>
                  <p className="text-slate-500 text-sm leading-relaxed mb-4">
                    100+ cards analyzed per session via multi-model AI (GPT-5, Claude, DeepSeek).
                  </p>
                  <div className="mt-auto pt-4 border-t border-slate-800">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-purple-400 text-sm font-bold shrink-0">→</span>
                      <p className="font-mono text-xs text-purple-300">{cardScout.keyResult}</p>
                    </div>
                    <div className="flex items-center justify-end">
                      <span className="font-mono text-xs uppercase tracking-widest text-slate-500 group-hover:text-white transition-colors flex items-center gap-1.5">
                        View case study <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </Link>
          </Reveal>

          <Reveal delay={0.1}>
            <Link href="/work/neural-mob" className="group block h-full">
              <TiltCard className="overflow-hidden rounded-xl border-2 border-slate-700/70 bg-slate-900/60 group-hover:border-violet-500/60 group-hover:-translate-y-2 transition-all duration-300 h-full flex flex-col">
                <div className="h-48 border-b border-slate-800 shrink-0">
                  <ImageCarousel
                    images={neuralMob.screenshots ?? [neuralMob.screenshot!]}
                    alt="Neural Mob multi-agent AI debate engine"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex flex-wrap items-center gap-2.5 mb-4">
                    <LiveDot />
                    <span className="font-mono text-xs uppercase tracking-[0.15em] text-slate-400">Live · 2026</span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-violet-300 bg-violet-500/10 border border-violet-500/40 px-2.5 py-1 rounded-sm">
                      Research AI
                    </span>
                  </div>
                  <h3 className="font-display text-2xl font-black text-white group-hover:text-purple-400 transition-colors duration-300 mb-2">
                    {neuralMob.name}
                  </h3>
                  <p className="text-slate-200 text-sm font-medium leading-relaxed mb-2">
                    {neuralMob.whyItMatters}
                  </p>
                  <p className="text-slate-500 text-sm leading-relaxed mb-4">
                    Adversarial multi-agent debate — N models argue, scoring agent picks the winner.
                  </p>
                  <div className="mt-auto pt-4 border-t border-slate-800">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-purple-400 text-sm font-bold shrink-0">→</span>
                      <p className="font-mono text-xs text-purple-300">{neuralMob.keyResult}</p>
                    </div>
                    <div className="flex items-center justify-end">
                      <span className="font-mono text-xs uppercase tracking-widest text-slate-500 group-hover:text-white transition-colors flex items-center gap-1.5">
                        View case study <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </Link>
          </Reveal>

          <Reveal delay={0.14}>
            <Link href="/work/stock-tracker" className="group block h-full">
              <TiltCard className="overflow-hidden rounded-xl border-2 border-slate-700/70 bg-slate-900/60 group-hover:border-violet-500/60 group-hover:-translate-y-2 transition-all duration-300 h-full flex flex-col">
                <div className="h-48 border-b border-slate-800 shrink-0">
                  <ImageCarousel
                    images={stockTracker.screenshots ?? [stockTracker.screenshot!]}
                    alt="StockTracker AI financial intelligence dashboard"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex flex-wrap items-center gap-2.5 mb-4">
                    <span aria-hidden="true" className="relative flex h-1.5 w-1.5 shrink-0">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-purple-500 opacity-75" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-purple-500" />
                    </span>
                    <span className="font-mono text-xs uppercase tracking-[0.15em] text-slate-400">Live · 2026</span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-emerald-300 bg-emerald-500/10 border border-emerald-500/40 px-2.5 py-1 rounded-sm">
                      Markets AI
                    </span>
                  </div>
                  <h3 className="font-display text-2xl font-black text-white group-hover:text-purple-400 transition-colors duration-300 mb-2">
                    {stockTracker.name}
                  </h3>
                  <p className="text-slate-200 text-sm font-medium leading-relaxed mb-2">
                    {stockTracker.whyItMatters}
                  </p>
                  <p className="text-slate-500 text-sm leading-relaxed mb-4">
                    20 live data sources synthesized by Claude + Kimi K2 — with credit billing and a full admin console.
                  </p>
                  <div className="mt-auto pt-4 border-t border-slate-800">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-purple-400 text-sm font-bold shrink-0">→</span>
                      <p className="font-mono text-xs text-purple-300">{stockTracker.keyResult}</p>
                    </div>
                    <div className="flex items-center justify-end">
                      <span className="font-mono text-xs uppercase tracking-widest text-slate-500 group-hover:text-white transition-colors flex items-center gap-1.5">
                        View case study <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── FOR RECRUITERS ───────────────────────────────────── */}
      <Reveal>
        <section className="mb-24 sm:mb-32 rounded-xl border-2 border-slate-700/60 bg-slate-900/40 px-7 py-8">
          <div className="flex items-center gap-2 mb-6">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-slate-400">For recruiters</span>
            <div className="flex-1 h-px bg-slate-800" />
          </div>
          <RevealText className="grid grid-cols-1 gap-6 sm:grid-cols-[1.3fr_1fr_1fr]">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-sky-400 font-bold mb-2">Target role</p>
              <p className="text-slate-200 text-sm leading-relaxed">Senior or Staff AI PM — where AI is core to the product, not a feature bolt-on.</p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-purple-400 mb-2">Best-fit problems</p>
              <p className="text-slate-200 text-sm leading-relaxed">LLM orchestration · AI-native consumer products · Search & ranking · Data infra at scale</p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-purple-400 mb-2">Location & timing</p>
              <p className="text-slate-200 text-sm leading-relaxed flex items-start gap-1.5">
                <MapPin className="h-3.5 w-3.5 mt-0.5 shrink-0 text-slate-500" />
                SF Bay Area · Open to remote · Available within 2–4 weeks
              </p>
            </div>
          </RevealText>
        </section>
      </Reveal>

      {/* ── STATUS ───────────────────────────────────────────── */}
      <Reveal>
        <p className="font-mono text-xs text-slate-500 border-t border-slate-800/40 pt-8">
          <span className="text-violet-500/60">●</span>{' '}
          Currently shipping: ApplyStudio v2 · Interview Coach · Agent memory
        </p>
      </Reveal>
    </div>
  );
}
