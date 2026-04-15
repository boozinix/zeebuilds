'use client';

import { useEffect, useState } from 'react';

const PAIRS = [
  { left: 'AI Product Manager.', right: 'Solo Builder.' },
  { left: 'Haas MBA.', right: '8-Year PM.' },
];

// Ghost spans use the widest text across all pairs so layout never shifts
const GHOST_LEFT  = PAIRS.reduce((a, p) => (p.left.length  > a.length ? p.left  : a), '');
const GHOST_RIGHT = PAIRS.reduce((a, p) => (p.right.length > a.length ? p.right : a), '');

const TYPE_MS   = 38;   // ms per character (typing)
const DELETE_MS = 18;   // ms per character (deleting — faster)
const PAUSE_MS  = 15000; // ms to hold when both fully typed

/**
 * Dual typewriter — left phrase types L→R, right phrase types R→L.
 * Cycles through PAIRS: type pair, pause, delete, advance to next pair.
 * Ghost spans reserve the max text width so the layout never shifts.
 */
export function HeroTypewriter() {
  const [pairIndex, setPairIndex] = useState(0);
  const [step, setStep]           = useState(0);
  const [deleting, setDeleting]   = useState(false);
  const [paused, setPaused]       = useState(false);

  const pair = PAIRS[pairIndex];
  const maxSteps = Math.max(pair.left.length, pair.right.length);

  useEffect(() => {
    if (paused) {
      const t = setTimeout(() => { setPaused(false); setDeleting(true); }, PAUSE_MS);
      return () => clearTimeout(t);
    }
    if (!deleting) {
      if (step < maxSteps) {
        const t = setTimeout(() => setStep(s => s + 1), TYPE_MS);
        return () => clearTimeout(t);
      } else {
        setPaused(true);
      }
    } else {
      if (step > 0) {
        const t = setTimeout(() => setStep(s => s - 1), DELETE_MS);
        return () => clearTimeout(t);
      } else {
        setPairIndex(i => (i + 1) % PAIRS.length);
        setDeleting(false);
      }
    }
  }, [step, deleting, paused, maxSteps]);

  // Left: first N chars (grows →)
  const leftText  = pair.left.slice(0, Math.min(step, pair.left.length));
  // Right: last N chars (grows ←)
  const rightText = pair.right.slice(Math.max(0, pair.right.length - step));

  return (
    <>
      {/* ── LEFT PHRASE — types left→right ───────────────────── */}
      <span className="relative inline-block">
        {/* Ghost reserves max width — invisible but present in layout */}
        <span className="invisible select-none" aria-hidden="true">{GHOST_LEFT}</span>
        {/* Active layer — left-aligned, cursor trails the text */}
        <span className="absolute inset-0 flex items-center whitespace-nowrap">
          <span className="text-white">{leftText}</span>
          <span className="text-sky-300 opacity-70 animate-pulse select-none">|</span>
        </span>
      </span>

      {/* space between phrases */}
      <span aria-hidden="true">{' '}</span>

      {/* ── RIGHT PHRASE — types right→left ──────────────────── */}
      <span className="relative inline-block">
        {/* Ghost reserves max width */}
        <span className="invisible select-none" aria-hidden="true">{GHOST_RIGHT}</span>
        {/* Active layer — right-aligned, cursor leads the text on the left */}
        <span className="absolute inset-0 flex items-center justify-end whitespace-nowrap">
          <span className="text-fuchsia-300 opacity-70 animate-pulse select-none">|</span>
          <span
            style={{
              background: 'linear-gradient(90deg, #38bdf8, #a78bfa)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {rightText}
          </span>
        </span>
      </span>
    </>
  );
}
