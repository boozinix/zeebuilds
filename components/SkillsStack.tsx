'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const SKILLS = [
  { word: 'STRATEGY', tooltip: '0→1 roadmaps' },
  { word: 'EXECUTION', tooltip: 'solo shipped' },
  { word: 'AI SYSTEMS', tooltip: 'multi-agent' },
  { word: 'GROWTH', tooltip: '157% revenue' },
  { word: 'SHIPPING', tooltip: '3 live products' },
] as const;

const prefersReduced =
  typeof globalThis !== 'undefined' && typeof globalThis.matchMedia === 'function'
    ? globalThis.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

export function SkillsStack() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px 0px' });

  return (
    <section ref={ref} className="mb-24 sm:mb-32 -mx-4 sm:mx-0">
      {/* Section label */}
      <div className="px-4 sm:px-0 mb-8">
        <span className="font-mono text-xs uppercase tracking-[0.22em] text-slate-500">
          What I build
        </span>
      </div>

      {/* Stacked words */}
      <div className="w-full">
        {SKILLS.map((skill, i) => (
          <SkillRow
            key={skill.word}
            word={skill.word}
            tooltip={skill.tooltip}
            index={i}
            isInView={isInView}
            isBright={i % 2 === 0}
          />
        ))}
      </div>
    </section>
  );
}

function SkillRow({
  word,
  tooltip,
  index,
  isInView,
  isBright,
}: {
  word: string;
  tooltip: string;
  index: number;
  isInView: boolean;
  isBright: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  const baseColor = isBright ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.2)';
  const activeColor = hovered ? 'rgba(255,255,255,1)' : baseColor;
  const glowShadow = hovered ? '0 0 40px rgba(124,58,237,0.4)' : 'none';

  return (
    <motion.div
      initial={prefersReduced ? false : { x: -30, opacity: 0 }}
      animate={
        prefersReduced || isInView
          ? { x: 0, opacity: 1 }
          : { x: -30, opacity: 0 }
      }
      transition={{
        duration: 0.6,
        delay: isInView ? index * 0.1 : 0,
        ease: 'easeOut',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex items-center justify-between px-4 sm:px-0 py-3 sm:py-4 cursor-default"
      style={{
        borderTop: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      <span
        className="font-display font-black leading-none select-none transition-all duration-300"
        style={{
          fontSize: 'clamp(48px, 12vw, 160px)',
          color: activeColor,
          textShadow: glowShadow,
        }}
      >
        {word}
      </span>

      {/* Tooltip on hover — right-aligned */}
      <motion.span
        initial={{ opacity: 0, x: -8 }}
        animate={hovered ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
        transition={{ duration: 0.2 }}
        className="font-mono text-xs text-purple-400 tracking-wide hidden sm:block"
      >
        {tooltip}
      </motion.span>
    </motion.div>
  );
}
