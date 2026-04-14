'use client';

import { useRef, useMemo, Children, isValidElement, cloneElement, ReactNode } from 'react';
import { motion, useInView } from 'framer-motion';

interface RevealTextProps {
  children: ReactNode;
  /** Stagger delay between lines in seconds */
  stagger?: number;
  /** Starting opacity for unrevealed lines */
  dimOpacity?: number;
  className?: string;
}

/**
 * Line-by-line scroll reveal — splits children into block-level lines
 * and staggers them into view with a "reading guide" effect.
 *
 * Accepts:
 * - A string with \n delimiters
 * - Multiple React children (each becomes a "line")
 * - A single string split on sentence boundaries
 */
export function RevealText({
  children,
  stagger = 0.08,
  dimOpacity = 0.15,
  className = '',
}: RevealTextProps) {
  const lines = useMemo(() => splitIntoLines(children), [children]);

  return (
    <div className={className}>
      {lines.map((line, i) => (
        <RevealLine key={i} index={i} stagger={stagger} dimOpacity={dimOpacity}>
          {line}
        </RevealLine>
      ))}
    </div>
  );
}

function RevealLine({
  children,
  index,
  stagger,
  dimOpacity,
}: {
  children: ReactNode;
  index: number;
  stagger: number;
  dimOpacity: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10% 0px -10% 0px' });

  // Respect prefers-reduced-motion
  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <motion.div
      ref={ref}
      initial={prefersReduced ? false : { opacity: dimOpacity, y: 12 }}
      animate={
        prefersReduced
          ? { opacity: 1, y: 0 }
          : isInView
            ? { opacity: 1, y: 0 }
            : { opacity: dimOpacity, y: 12 }
      }
      transition={{
        duration: 0.55,
        delay: isInView ? index * stagger : 0,
        ease: 'easeOut',
      }}
    >
      {children}
    </motion.div>
  );
}

/** Split children into discrete "lines" for staggered reveal */
function splitIntoLines(children: ReactNode): ReactNode[] {
  // If it's a plain string, split on newlines or sentence boundaries
  if (typeof children === 'string') {
    const text = children.trim();
    // Try newlines first
    if (text.includes('\n')) {
      return text.split('\n').filter(Boolean).map(s => s.trim());
    }
    // Fall back to sentence splitting
    const sentences = text.match(/[^.!?]+[.!?]+\s*/g);
    if (sentences && sentences.length > 1) {
      return sentences.map(s => s.trim());
    }
    return [text];
  }

  // If multiple React children, each child becomes a line
  const arr = Children.toArray(children);
  if (arr.length > 1) return arr;

  // Single React child — return as-is
  return [children];
}
