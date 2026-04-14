'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { Linkedin, Github, Download } from 'lucide-react';

const LINKS = [
  { icon: Linkedin, href: 'https://linkedin.com/in/zubairnizami', label: 'LinkedIn' },
  { icon: Github, href: 'https://github.com/boozinix', label: 'GitHub' },
  { icon: Download, href: '/resume.pdf', label: 'Resume' },
] as const;

export function SocialRail() {
  const { scrollY } = useScroll();
  // Show after scrolling past ~100vh (approx 800px)
  const opacity = useTransform(scrollY, [600, 800], [0, 1]);
  const x = useTransform(scrollY, [600, 800], [-20, 0]);

  return (
    <motion.div
      style={{ opacity, x }}
      className="fixed left-6 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col items-center gap-0"
    >
      {/* Top line */}
      <div className="w-px h-10 bg-white/10 mb-4" />

      {/* Icons */}
      <div className="flex flex-col items-center gap-5">
        {LINKS.map(({ icon: Icon, href, label }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="group relative text-white/40 hover:text-white transition-all duration-200"
          >
            <Icon className="h-5 w-5 group-hover:drop-shadow-[0_0_8px_rgba(124,58,237,0.6)]" />
            {/* Tooltip */}
            <span className="absolute left-8 top-1/2 -translate-y-1/2 font-mono text-[10px] uppercase tracking-wider text-white/0 group-hover:text-white/70 transition-all duration-200 whitespace-nowrap pointer-events-none">
              {label}
            </span>
          </a>
        ))}
      </div>

      {/* Bottom line */}
      <div className="w-px h-10 bg-white/10 mt-4" />
    </motion.div>
  );
}
